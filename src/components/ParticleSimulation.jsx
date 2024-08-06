import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// GUI
import { GUI } from 'dat.gui'


// Parámetros del potencial Lennard-Jones

var type_interaction = 'molecular dynamics'; // Tipo de interacción: 'gaussian' o 'lennard-jones'

const sigma_r = 2; // Desviación estándar de la distribución gaussiana

const calculateGaussianEnergy= (r) => {
  return 10 * Math.exp(-r * r/sigma_r**2) 
};

const calculateGaussianForce = (r) => {
  return -10 * Math.exp(-r * r/sigma_r**2) * r / sigma_r**2;
}
const calculateGravityForce = (r0) => {
  const r = r0 - 4
  return 3.5 * Math.exp(-r * r/sigma_r**2) * r / sigma_r**2;
}

const calculateForce = (r) => {
  if (type_interaction === 'molecular dynamics') {
    return calculateGaussianForce(r);
  } else if (type_interaction === 'gravity') {
    return calculateGravityForce(r);
  }
  return 0;
};


const lims = 30;

const ParticleSimulation = ({particleCount}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 50;
    controls.maxDistance = 500;

    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const previousPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);



    for (let i = 0; i < particleCount; i++) {
      const x = 2 * lims * (Math.random() - 0.5);
      const y = 2 * lims * (Math.random() - 0.5);
      const z = 2 * lims * (Math.random() - 0.5);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      previousPositions[i * 3] = x - (Math.random() - 0.5) * 0.01; // Inicialización con un pequeño cambio
      previousPositions[i * 3 + 1] = y - (Math.random() - 0.5) * 0.01;
      previousPositions[i * 3 + 2] = z - (Math.random() - 0.5) * 0.01;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//    const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/ball.png');

    const material = new THREE.PointsMaterial({
      size: 35, 
      vertexColors: true, 
      sizeAttenuation: false, 
      alphaTest: 0.5, 
      transparent: true, 
      map: texture
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    // Cubo contenedor
    const geometry = new THREE.BoxGeometry(2 * lims, 2 * lims, 2 * lims);
    const materialCube = new THREE.MeshBasicMaterial({
      color: "blue", 
      wireframe: false, 
      transparent: true, 
      opacity: 0.2
    });
    const materialWireframe = new THREE.MeshBasicMaterial({
      color: "blue", 
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    const cube = new THREE.Mesh(geometry, materialCube);
    const wireframe = new THREE.Mesh(geometry, materialWireframe);
    // scene.add(cube);

    const line_cube_1 = new THREE.Line(geometry, materialWireframe);
    scene.add(line_cube_1);
    // scene.add(wireframe);

    camera.position.z = 100;

    const computeForces = () => {
      const accelerations = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[j * 3 + 0] - positions[i * 3 + 0];
          const dy = positions[j * 3 + 1] - positions[i * 3 + 1];
          const dz = positions[j * 3 + 2] - positions[i * 3 + 2];
          const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (r < 2 * sigma_r) {
            // const force = calculateGaussianForce(r);
            const force = calculateForce(r);
            const fx = force * (dx / r);
            const fy = force * (dy / r);
            const fz = force * (dz / r);

            accelerations[i * 3]     += fx;
            accelerations[i * 3 + 1] += fy;
            accelerations[i * 3 + 2] += fz;
            accelerations[j * 3]     -= fx;
            accelerations[j * 3 + 1] -= fy;
            accelerations[j * 3 + 2] -= fz;
          }
        }

        const vx = positions[i * 3] - previousPositions[i * 3];
        const vy = positions[i * 3 + 1] - previousPositions[i * 3 + 1];
        const vz = positions[i * 3 + 2] - previousPositions[i * 3 + 2];
        // camera vector 
        const downVector = new THREE.Vector3(0, -1, 0); // El eje Y negativo representa 'abajo'

        downVector.applyQuaternion(camera.quaternion); // Aplica la rotación de la cámara al vector
        downVector.normalize();

        // if type_interaction === 'gravity' g = 0 if type_interaction === 'gaussian' g = 0.01
        const g = type_interaction === 'gravity' ? 0 : 0.01;
        
        accelerations[i * 3 + 0] += g * downVector.x;
        accelerations[i * 3 + 1] += g * downVector.y;
        accelerations[i * 3 + 2] += g * downVector.z;

        // 
        const rpos = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2);
        // atracción al origen
        const force = type_interaction === 'gravity' ? 0.0068 : 0;
        accelerations[i * 3]     -= force * positions[i * 3] / rpos;
        accelerations[i * 3 + 1] -= force * positions[i * 3 + 1] / rpos;
        accelerations[i * 3 + 2] -= force * positions[i * 3 + 2] / rpos;
        // friction
        const friction = type_interaction === 'gravity' ? 0.01 : 0.01;
        accelerations[i * 3]     -= friction * vx;
        accelerations[i * 3 + 1] -= friction * vy;
        accelerations[i * 3 + 2] -= friction * vz;
        // noise 
        const noise = type_interaction === 'gravity' ? 0.001 : 0.1;
        accelerations[i * 3]     += noise * (Math.random() - 0.5);
        accelerations[i * 3 + 1] += noise * (Math.random() - 0.5);
        accelerations[i * 3 + 2] += noise * (Math.random() - 0.5);

        }

      // maximimun acceleration
      const maxAcc = 1;
      for (let i = 0; i < particleCount; i++) {
        const acc = Math.sqrt(accelerations[i * 3] ** 2 + accelerations[i * 3 + 1] ** 2 + accelerations[i * 3 + 2] ** 2);
        if (acc > maxAcc) {
          accelerations[i * 3]     *= maxAcc / acc;
          accelerations[i * 3 + 1] *= maxAcc / acc;
          accelerations[i * 3 + 2] *= maxAcc / acc;
        }
      }

      return accelerations;
    };

    const gui = new GUI();
    // position of gui in middle right
    gui.domElement.style.position = 'relative';
    gui.domElement.style.top = '0.5';
    gui.domElement.style.right = '0';

    
    // add boolean controller to switch between gaussian and gravity
    gui.add({type_interaction: 'molecular dynamics'}, 'type_interaction', ['molecular dynamics', 'gravity']).onChange((value) => {
      type_interaction = value;
    });


    const animate = () => {
      requestAnimationFrame(animate);
      
      const accelerations = computeForces();

      for (let i = 0; i < particleCount; i++) {
        const newX = 2 * positions[i * 3] - previousPositions[i * 3] + accelerations[i * 3];
        const newY = 2 * positions[i * 3 + 1] - previousPositions[i * 3 + 1] + accelerations[i * 3 + 1];
        const newZ = 2 * positions[i * 3 + 2] - previousPositions[i * 3 + 2] + accelerations[i * 3 + 2];

        previousPositions[i * 3] = positions[i * 3];
        previousPositions[i * 3 + 1] = positions[i * 3 + 1];
        previousPositions[i * 3 + 2] = positions[i * 3 + 2];

        positions[i * 3] = newX;
        positions[i * 3 + 1] = newY;
        positions[i * 3 + 2] = newZ;

        if (positions[i * 3] < -lims || positions[i * 3] > lims) {
          positions[i * 3] = Math.max(-lims, Math.min(lims, positions[i * 3]));
          previousPositions[i * 3] = positions[i * 3];
        }
        if (positions[i * 3 + 1] < -lims || positions[i * 3 + 1] > lims) {
          positions[i * 3 + 1] = Math.max(-lims, Math.min(lims, positions[i * 3 + 1]));
          previousPositions[i * 3 + 1] = positions[i * 3 + 1];
        }
        if (positions[i * 3 + 2] < -lims || positions[i * 3 + 2] > lims) {
          positions[i * 3 + 2] = Math.max(-lims, Math.min(lims, positions[i * 3 + 2]));
          previousPositions[i * 3 + 2] = positions[i * 3 + 2];
        }
      }

      particles.attributes.position.needsUpdate = true;
      controls.update(); // Actualiza los controles
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      containerRef.current.removeChild(renderer.domElement);
      controls.dispose(); // Limpia los controles al desmontar el componente
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
  // relative in container
  // return <div ref={containerRef} style={{ position: 'relative', width: '50%', height: '50%' }} />;
  // absolute in container
  return <div ref={containerRef} style={{ position: 'absolute', top: "5%", left: 0, width: '80%', height: '100%' }} />;
};

export default ParticleSimulation;
