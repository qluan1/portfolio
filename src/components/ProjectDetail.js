import React from 'react';

export default ProjectDetail;

function ProjectDetail(props) {
    let projImg = null;
    if (
        props.project.image !== null &&
        props.project.image !== undefined
    ){    
        try {
            let img = require('../assets/img/' + props.project.image).default;
            projImg = (
                <img
                    src = {img}
                    alt = {props.project.title + '-image'}
                />
            )
        } catch (e) {
            console.log(e);
        }
    }
    let githubLink = null;
    if (
        props.project.githubLink !== null &&
        props.project.githubLink !== undefined
    ) {
        githubLink = (
            <a
                href = {props.project.githubLink}
            >
                Github Page
            </a>
        );
    }

    let demoLink = null;
    if (
        props.project.demo !== null &&
        props.project.demo !== undefined
    ) {
        demoLink = (
            <a
                href = {props.project.demo}
            >
                Demo Page
            </a>
        );
    }   

    return (
        <div
            className = 'project-detail-background'
            id = 'project-detail-background'
        >
            <div
                className = 'project-detail'
            >
                <div
                    className = 'project-title'
                >
                    {props.project.title}
                </div>
                <div
                    className = 'project-links'
                >
                    {githubLink}
                    {demoLink}
                </div>
                <div
                    className = 'project-image-container'
                >
                    {projImg}
                </div>
                <div
                    className = 'project-description'
                >
                    {props.project.description}
                </div>

            </div>
        </div>
    );
}