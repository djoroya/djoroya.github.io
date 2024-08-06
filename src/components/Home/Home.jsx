
import ParticleSimulation  from './ParticleSimulation';
import { useState } from 'react';


export const Home = ({setPage}) => {
    const [particles, setParticles] = useState(100);

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