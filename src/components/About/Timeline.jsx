import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import timelineElements from './data.json';
// icon  job 
import { MdWork } from 'react-icons/md';
// atom
import { FaLaptopCode } from 'react-icons/fa';
import { PiCodeBold } from "react-icons/pi";
import { RiSignalTowerFill } from "react-icons/ri";
import { IoLogoElectron } from "react-icons/io5";
import { TbMathFunction } from "react-icons/tb";
import { GiGreenhouse } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
// Switch 
import Switch from '@mui/material/Switch';
const FaIcon = ({ icon }) => {

    if (icon === 'FaLaptopCode') return <FaLaptopCode />;
    if (icon === 'University of Deusto [Mobily Team]') return <RiSignalTowerFill />;
    if (icon === 'Accenture') return <PiCodeBold />;
    if (icon === 'SIMUNE Atomistics') return <IoLogoElectron />;
    if (icon === 'Chair of Computational Mathematics') return <TbMathFunction />;
    if (icon === 'University of Deusto [Energy Team]') return <GiGreenhouse />;
    if (icon === 'Advanced Material Simulation') return <GiMaterialsScience />;
    return <MdWork />;
};


const Tags = ({ element, setContent, setTitle, showMore, setShowMore
 }) => {
    return (
        <>
        <div className='pt-2'>
            {element.topics && element.topics.map((tag, key) => {
            return (
                <span key={key} className="badge bg-primary m-1">{tag}</span>
            );
            })}
        </div>
        <div>
        {element.technology && element.technology.map((tag, key) => {
            return (
                <span key={key} className="badge bg-danger m-1">{tag}</span>
            );
        })}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end">
                            <button className="btn btn-info mt-4 p-2 badge "
                            style={{ width: '5rem' }}
                            onClick={() => { setContent(element.content); 
                                             setTitle(element.title);
                                             setShowMore(!showMore); }}>more...</button>
                            </div>
        </>
    );
}


export const ColorsTimeline = () => {

    const [showMore, setShowMore] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [showsimple, setShowSimple] = useState(false);
    return (
        <>
            {/* Switch simple or not */}

            
    
            <div className="d-grid d-md-flex">
                <h1 className=''>Jobs Experience</h1>
                <Switch checked={showsimple} onChange={() => setShowSimple(!showsimple)} />
                <p className='pt-2'>Minimalist</p>

            </div>
            <hr />
            <VerticalTimeline    lineColor = {'gray'} >
                {timelineElements.map((element, key) => {
                    return (
                        <VerticalTimelineElement
                        className="vertical-timeline-element--work m-1"
                            key={key}
                            date={element.date}
                            contentArrowStyle={{ borderRight: '10px solid  rgb(33, 80, 143)' }}
                            iconStyle={{ background: 'rgb(33, 80, 143)', color: '#ffffff' }}
                            icon={<FaIcon icon={element.enterprice} />}
                        >
                            <h3 className="vertical-timeline-element-title mb-2" style={{ color: 'black', fontWeight: 'bold',borderBottom: '1px solid black' }}
                            >{element.title}</h3>
                            <p className="vertical-timeline-element-subtitle" style={{ color: 'rgb(33, 80, 143)', fontWeight: 'bold' }}>
                                {element.enterprice}</p>
                            
                            {!showsimple && <Tags element={element} setContent={setContent} setTitle={setTitle} showMore={showMore} setShowMore={setShowMore} />}


                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
            <hr />
            <Dialog  open={showMore} onClose={() => setShowMore(!showMore)}>
                    <div className="card" >
                        <div className="card-header"><h1>{title}</h1></div>
                        <div className="card-body">
                            <p>
                                {content}
                            </p>
                        </div>
                    </div>
            </Dialog>
        </>

    );
}
