import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import timelineElements from './data.json';
// icon  job 
import { MdWork } from 'react-icons/md';

export const ColorsTimeline = () => {


    return (
        <>
            <h1 className='p-3'>Jobs Experience</h1>
            <VerticalTimeline    lineColor = {'gray'} >
                {timelineElements.map((element, key) => {
                    return (
                        <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                            key={key}
                            date={element.date}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            iconStyle={{ background: 'rgb(33, 150, 143)', color: '#00000' }}
                            icon={<MdWork />}
                        >
                            <h3 className="vertical-timeline-element-title mb-2" style={{ color: 'black', fontWeight: 'bold',borderBottom: '1px solid black' }}
                            >{element.title}</h3>
                            <h6 className="vertical-timeline-element-subtitle" >
                                {element.enterprice}</h6>
                            <p>{element.topics && element.topics.map((tag, key) => {
                                return (
                                    <span key={key} className="badge bg-primary m-1">{tag}</span>
                                );
                            }
                            )}</p>
                            {element.technology && element.technology.map((tag, key) => {
                                return (
                                    <span key={key} className="badge bg-primary m-1">{tag}</span>
                                );
                            })}

                            <p>{element.content}</p>
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </>

    );
}
