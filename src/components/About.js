import React from 'react';

function About () {
    return (
        <div
            className = 'content-section'
            id = 'about'
        >
            <div className = 'about-title'>
                <p>{'Web Developer And Problem Solver'}</p>
            </div>

            <div className = 'about-paragraph'>
                <p >
                    {'I am an aspiring web developer currently living in Bellevue, WA. '+
                    'I enjoy building websites with rich interactive features, '+
                    'and solving pratical/theoretical problems is my passion. '+
                    'I am looking for Front-End Development job opportunities.'}
                </p>
            </div>

        </div>
    );
}

export default About;