import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineMail } from "react-icons/md";
import ParticleSimulation  from './components/ParticleSimulation';

import {Navbar} from './components/Navbar';

function App() {


  return (
    <div className="App" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <ParticleSimulation />

      <Navbar />
      <header className="App-header">


        <div className='container small'> 
        {/* alpha 0.5 */}
        <div className="card text-white bg-secondary m-5 p-3 rounded-3" style={{  opacity: 0.9 }}>
          <div className="card-header">Jesús Oroya</div>
          <div className="card-body">
          Hi! I’m a software developer specializing in mathematical modeling and numerical simulation. I currently work at Advanced Material Simulation, where I focus on material modeling.

          Throughout my career, I’ve developed a range of mathematical models, including control systems, crop growth models, heat exchange models, and Diesel reforming for hydrogen production, solid fuel cells, indoor pedestrian positioning systems, and more. 

          If you’re interested in learning more about my work in modeling, simulation, or related technologies, feel free to reach out! 
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
