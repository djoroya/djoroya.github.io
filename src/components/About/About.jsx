import React from 'react';
import "./Timeline.css";
import { ColorsTimeline } from './Timeline';

export const About = ({setPage}) => {
    return (
      <div>
        <div className="container font-monospace">
          <div className="card text-white m-5 p-3 rounded-3" style={{  backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>
            <div className="card-header"><h1>About me</h1></div>
            <div className="card-body">
              <p>
                I am a physicist and simulation developer. I have experience in the development of simulations in the field of physics and engineering. I am passionate about the development of simulations and the use of technology to solve problems in different areas. 
              </p>
            </div>
          </div>
          <ColorsTimeline />

        </div>
      </div>
    );
  }