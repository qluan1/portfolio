import React from 'react';
import About from './About';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Contact from './Contact';
import './Content.css';

function Content (){
    return (
        <div id = "content">
            <About/>
            <Skills/>
            <Portfolio/>
            <Contact/>
        </div>
    );
}

export default Content;