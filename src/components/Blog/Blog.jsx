import React from 'react';
import { Link } from 'react-router-dom';
import post from './post.json';

export const Blog = () => {
  return (
    <div>
      <div className="container font-monospace">
        <div className="card text-white m-5 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>
          <div className="card-header"><h1>Blog</h1></div>
          <div className="card-body">
            <p>
              In this section I will write about the development of simulations and the use of technology to solve problems in different areas.
            </p>
          </div>
        </div>
        {post.map((p, index) => (
          <div key={index} className="card text-white m-5 p-3 rounded-3" style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>
            <div className="card-title">
              <h1>{p.name}</h1>
            </div>
            <div className="card-body">
              <p>{p.content}</p>
              <Link to={`/blog/${index}`} className="btn btn-primary">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
