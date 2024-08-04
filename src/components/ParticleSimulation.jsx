// src/ParticleSimulation.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Parámetros del potencial Lennard-Jones
const epsilon = 1;  // Profundidad del potencial
const sigma = 1;    // Distancia a la cual el potencial es cero

const calculateLJForce = (r) => {
  const r6 = Math.pow(r, 6);
  const r12 = r6 * r6;
  return 24 * epsilon * (2 * Math.pow(sigma, 12) / r12 - Math.pow(sigma, 6) / r6) / r;
};

const ParticleSimulation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3); // Para los colores

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 100 - 50;
      positions[i * 3 + 1] = Math.random() * 100 - 50;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      // Colores aleatorios
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');

    const material = new THREE.PointsMaterial({ size: 10, vertexColors: true , sizeAttenuation: false, alphaTest: 0.5, transparent: true, map: texture });
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 100;

    const computeForces = () => {
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[j * 3] - positions[i * 3];
          const dy = positions[j * 3 + 1] - positions[i * 3 + 1];
          const dz = positions[j * 3 + 2] - positions[i * 3 + 2];
          const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (r < 2 * sigma) {
            const force = calculateLJForce(r);
            const fx = force * (dx / r);
            const fy = force * (dy / r);
            const fz = force * (dz / r);
            velocities[i * 3] += fx;
            velocities[i * 3 + 1] += fy;
            velocities[i * 3 + 2] += fz;
            velocities[j * 3] -= fx;
            velocities[j * 3 + 1] -= fy;
            velocities[j * 3 + 2] -= fz;
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      computeForces();

      // Actualiza posiciones según las velocidades
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Rebotar en los bordes
        if (positions[i * 3]     < -50 || positions[i * 3]     > 50) velocities[i * 3] *= -1;
        if (positions[i * 3 + 1] < -50 || positions[i * 3 + 1] > 50) velocities[i * 3 + 1] *= -1;
        if (positions[i * 3 + 2] < -50 || positions[i * 3 + 2] > 50) velocities[i * 3 + 2] *= -1;
      }

      particles.attributes.position.needsUpdate = true;
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
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ParticleSimulation;
