import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";

import { MdOutlineMail } from "react-icons/md";
import ParticleSimulation from './components/ParticleSimulation';

import { Navbar } from './components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { About } from './components/About/About';

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
  const [page, setPage] = useState('home');


  const Home_simulation = () => {
    return (
      <div className="App">
        <ParticleSimulation particleCount={particles} />


        <div className='container font-monospace d-flex justify-content-center'>
          {/* alpha 0.5 */}
          <div className="card text-white m-3 p-3 rounded-3"
            style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)', width: "28rem" }}>
            <div className="card-header"><h1>Jesús Oroya</h1></div>
            <div className="card-body">
              <h5>
                Physicist and simulation developer.
              </h5>
              {/* view more */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-center ">
                <button className="btn btn-primary"
                  onClick={() => setPage('about')}>About me</button>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }





  const Content = () => {
    if (page === 'home') {
      return <Home_simulation />;
    }
    if (page === 'about') {
      return <About setPage={setPage} />;
    }
  }
  return (
    <div>
      <Navbar setPage={setPage} />
      <Content />
    </div>

  );
}

export default App;
