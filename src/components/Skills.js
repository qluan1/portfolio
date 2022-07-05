import React, { useState, useEffect, useRef } from 'react';
import Sphere from './Sphere';

export default Skills;

const mySkills = [
    'HTML',
    'CSS',
    'Javascript',
    'Python',
    'C',
    'SQL',
    'Git',
    'Django',
    'React',
    'Webpack',
    'GNU/MPFR',
    'Lapack'
]

const whatIDo = (
    <p>
        {
            'I have created many projects with my solid understanding of HTML, '+
            'CSS, and Javascript. ' +
            'I aim to keep creating responsive websites that are '
        }
        <span>{'interactive'}</span>
        {', '}
        <span>{'fast'}</span>
        {', and '}
        <span>{'easy to use'}</span>
        {'.'}        
    </p>
);

const whatIUse = (
    <p>
        {'My past projects utilized modern web technologies such as '} 
        <span>{'ReactJS'}</span>
        {', '}
        <span>{'NodeJS'}</span>
        {', and '}
        <span>{'Webpack'}</span>
        {', and I followed best practices developing them. '}
        {'If you are interested, please continue scrolling to my  '}
        <a href = '#'>Portfolio</a>
        {' section.'}
    </p>
);  



function Skills() {
    let [dimension, setDimension] = useState(0);
    const sectionRef = useRef(null);
    const handleResize = () => {
        if (sectionRef.current.clientWidth != dimension) {
            setDimension(sectionRef.current.clientWidth);
        }
    };

    useEffect( () => {
        setDimension(sectionRef.current.clientWidth);
        window.addEventListener('resize', handleResize);
        return (()=> {
            window.removeEventListener('resize', handleResize);
        });
    },[]);

    return (
        <div
            className = 'content-section'
            id = 'skills'
            key = {dimension}
        >
            <div
                className = 'skills-intro'
            >
                <h1>
                    {'Experience and Skills'}
                </h1>

                {whatIDo}
                {whatIUse}
            </div>

            <div
                className = 'skills-present'
                ref = {sectionRef}
            >
                <Sphere
                    dim = {dimension}
                    skills = {mySkills}
                />
            </div>
        </div>
    );
}