import React, { useEffect, useRef, useState } from 'react';
import { getViewport } from './utils';
import './Portfolio.css';
import ProjectDetail from './ProjectDetail';

export default Portfolio;

const portfolioDescription = (
    'A small gallery of my selected recent projects. ' +
    'I am interested in a wide range of topics ' + 
    'and recently especially Single Page Applications. ' +
    'More exciting projects are coming soon. '
);


const myProjects = [
    {
        name: 'Text-Annotation-Tool',
        githubLink: 'https://github.com/qluan1/text-annotation-tool/',
        demo: 'https://qluan1.github.io/text-annotation-tool/',
        coverImg: 'text-annotation-tool-thumb.jpg',
        img: 'text-annotation-tool.gif',
        description: (
            'Text-Annotation-Tool is '+
            'a user-friendly single-page application for assisting text annotations. '+
            'This application has the following features: '+
            '(a) Adding/removing annotation labels with intuitive mouse inputs. '+
            '(b) Making annotation review easier by providing a clean and clear presentation. '+
            '(c) All datas are processed and stored locally. '
        )
    },
    {
        name: 'Todo-List-App',
        githubLink: 'https://github.com/qluan1/todo-list-app/',
        demo: 'https://qluan1.github.io/todo-list-app/',
        coverImg: 'todo-list-app-thumb.jpg',
        img: 'todo-list-app.jpg',
        description: (
            'A todo-list app that stores data on your browser, and supports '+
            'due date/time, priority, projects, and todo item editing, '+
            'in addition to standard todo list functionalities.'
        )
    },
    {
        name: 'Fast-Multipole-Method',
        githubLink: 'https://github.com/qluan1/fast_multipole_method',
        demo: null,
        coverImg: 'fast-multipole-method-thumb.jpg',
        img: 'fast-multipole-method.jpg',
        description: (
            'This is an implementation of Fast Multipole Method in C '+ 
            'that supports multi-precision floating point computation. '+
            'The program supports two different Kernels, (1) K(x, y) = 1/(x-y), ' +
            'and (2) K(x, y) = log|x-y|. '
        )
    }
];


const githubAd = (
    <p>
        {'Interested to see more? Please visit my '}
        <a
            href = 'https://github.com/qluan1/'
        >
            Github
        </a>
        {' page.'}
    </p>
);

const customWidth = 30;


function Portfolio (props) {
    const portOffsetYRef = useRef(null);
    const scrollOffsetYRef = useRef(null);
    scrollOffsetYRef.current = 0;

    let [currentProject, setCurrentProject] = useState({});

    const handleScroll = (e) => {
        scrollOffsetYRef.current = window.scrollY;
    };

    const handleResize = (e) => {
        let projects = document.querySelector('.projects');
        if (projects !== null) {
            portOffsetYRef.current = projects.offsetTop;
        }
    }

    const addVisible = (id) => {
        if (id === myProjects.length) {
            let projects = document.querySelector('.projects');
            if (projects !== null) {
                projects.classList.add('visible'); 
                // a flag for all projects become visible
            }
            return;
        }
        let proj = document.getElementById(myProjects[id].name);
        if (proj === null) {
            return;
        }
        proj.classList.add('visible');
        setTimeout(addVisible.bind(null, id+1), 300);
    };

    // const removeVisible = () => {
    //     myProjects.forEach((proj) => {
    //         let p = document.getElementById(proj.name);
    //         p.classList.remove('visible');
    //     });
    //     let projects = document.querySelector('.projects');
    //     if (projects !== null) {
    //         projects.classList.remove('visible'); 
    //         // a flag for all projects become visible
    //     }
    // }

    const showProjects = () => {
        let [vpw, vph] = getViewport();
        let projects = document.querySelector('.projects');
        if (document.body.classList.contains('fixed')) {
            return;
        }
        if (
            vph + scrollOffsetYRef.current - customWidth > portOffsetYRef.current &&
            !projects.classList.contains('visible')
        ) {
            addVisible(0);
            return;
        }
        // if (
        //     scrollOffsetYRef.current === 0 &&
        //     projects.classList.contains('visible')
        // ) {
        //     removeVisible();
        // }
    };

    

    const popProjectDetail = () => {    
        const projDet = document.getElementById('project-detail-background');
        if (projDet === null) return;
        projDet.style.display = 'flex';
        document.body.classList.add('fixed');
        document.removeEventListener('click', closeProjectDetail);
        document.addEventListener('click', closeProjectDetail);
    };

    const closeProjectDetail = (event) => {
        const projDet = document.getElementById('project-detail-background');
        if (projDet === null) return;
        if (event.target === projDet) {
            document.removeEventListener('click', closeProjectDetail);
            document.body.classList.remove('fixed');
            projDet.style.display = 'none';
        }
    }


    useEffect(() => {
        portOffsetYRef.current = 0;
        let projects = document.querySelector('.projects');
        if (projects !== null) {
            portOffsetYRef.current = projects.offsetTop;
        }
        document.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        let intervalHandle = setInterval(showProjects, 100);

        return (
            () => {
                document.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
                clearInterval(intervalHandle);
            }
        );
    }, []);

    return (
        <div
            className = 'content-section'
            id = 'portfolio'
        >
            <h1>
                {'My Portfolio'}
            </h1>
            <div className = 'port-desc'>
                <p>
                    {portfolioDescription}
                </p>
                <br/>
                {githubAd}
            </div>
            <div
                className = 'projects'
            >
                {myProjects.map(projectToElement.bind(null, setCurrentProject, popProjectDetail))}
            </div>
            <ProjectDetail
                project = {currentProject}
            />
        </div>
    );
}


function projectToElement (setProj, popProjDetail, proj) {
    const projThumb = require('../assets/img/' + proj.coverImg).default;
    return (
        <div
            className= 'project centering'
            id = {proj.name}
            key = {proj.name}
        >   
            <img
                src = {projThumb}
            />
            <div
                className = 'view-project centering'
                onClick = {(e) => {
                    let curProj = {};
                    curProj.title = proj.name;
                    curProj.image = proj.img;
                    curProj.description = proj.description;
                    curProj.demo = proj.demo;
                    curProj.githubLink = proj.githubLink;
                    setProj(curProj);
                    popProjDetail();
                    e.stopPropagation();
                }}
            >
                <p>
                    {proj.name}
                </p>

            </div>

        </div>
    );
}