import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineMail } from "react-icons/md";
import ParticleSimulation  from './components/ParticleSimulation';

import {Navbar} from './components/Navbar';
import { useEffect, useState } from 'react';


const FormNParticles = ({ particles, setParticles }) => {


  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupSelect01">Particles</label>
      <select className="form-select" id="inputGroupSelect01" value={particles} onChange={e => setParticles(parseFloat(e.target.value))}>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
      {/* Restart threejs */}
    </div>
  );
};

function App() {

  const [particles, setParticles] = useState(100);

  return (
    <div className="App" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <ParticleSimulation particleCount={particles} />

      <Navbar />
      <header className="App-header">

        
        <div className='container font-monospace'>
        {/* alpha 0.5 */}
        <div className="card text-white m-5 p-3 rounded-3" style={{  backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>
          <div className="card-header"><h1>Jesús Oroya</h1></div>
          <div className="card-body">
          <h5>
          Hi! I’m a physicist and simulation developer. 
          </h5>

          <div className="text-end">
          <a href="mailto:djoroya@gmail.com">
          < MdOutlineMail />
          </a>
          </div>
          </div>
        </div>

        </div>


      </header>

    </div>
  );
}

export default App;
