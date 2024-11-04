import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const elements = [
  { id: '1', data: { label: '1970' }, position: { x: 50, y: 100 }, style: { background: '#B0BEC5', color: '#fff' } },
  { id: '2', data: { label: '1980' }, position: { x: 200, y: 100 }, style: { background: '#009688', color: '#fff' } },
  { id: '3', data: { label: '1990' }, position: { x: 350, y: 100 }, style: { background: '#F44336', color: '#fff' } },
  { id: '4', data: { label: '2000' }, position: { x: 500, y: 100 }, style: { background: '#FF9800', color: '#fff' } },
  { id: '5', data: { label: '2010' }, position: { x: 650, y: 100 }, style: { background: '#2196F3', color: '#fff' } },
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#B0BEC5' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#009688' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#F44336' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#FF9800' } },
];

const Timeline = () => (
  <div style={{ height: '300px', width: '100%' }}>
    <ReactFlow elements={elements} style={{ background: '#F0F0F0' }}>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  </div>
);

export default Timeline;
