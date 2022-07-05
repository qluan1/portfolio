import React, { useState, useRef, useEffect } from 'react';
import { getViewport, getPixelRate, initializeHiPPICanvasProps } from './utils';
export default Sphere;

const ROTATE_PARA = 7;
const ROTATE_COUNTER = 50;

function Sphere(props){
    const maxFontSize = 30;
    const minFontSize = 15;

    const canvasRef = useRef(null); 
    const skillsAngleRef = useRef(null);
    skillsAngleRef.current = parseSkills(props.skills);
    
    const timerRef = useRef(null);
    const selfRotationTimerRef = useRef(null);
    const gotoTimerRef = useRef(null);

    const requestIDRef = useRef(null);
    const mousePosRef = useRef(null);
    mousePosRef.current = {x: 0, y:0};

    const activeSkillRef = useRef(null);
    activeSkillRef.current = null;


    const handleShpereRotation = handleMouseRotation.bind(
        null, 
        timerRef, 
        canvasRef,
        skillsAngleRef, 
        mousePosRef
    );

    const handleMouseMove = ((e)=> {
        mousePosRef.current.x = e.clientX; 
        mousePosRef.current.y = e.clientY;
    });

    // initialize canvas
    useEffect(() => {
        let dim = props.dim;
        canvasRef.current.style.width = dim+'px';
        canvasRef.current.style.height = dim+'px';
        let pr = getPixelRate();
        let ctx = initializeHiPPICanvasProps(canvasRef.current, dim, dim, pr);
        ctx.clearRect(0, 0, dim, dim);

        const render = () => {
            drawSkills(
                ctx, 
                skillsAngleRef, 
                activeSkillRef,
                dim, 
                'RGB(46, 146, 122)', 
                maxFontSize, 
                minFontSize
            );
            requestIDRef.current = requestAnimationFrame(render);
        };
        render();

        clearTimeout(selfRotationTimerRef.current);
        selfRotationTimerRef.current = setTimeout(
            handleSelfRotation.bind(
                null, 
                selfRotationTimerRef, 
                skillsAngleRef, 
                {theta: 0.001}
            ),
            30
        );
        
        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(requestIDRef.current);
            document.body.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timerRef.current);
            clearTimeout(selfRotationTimerRef.current);
        };
    }, []);

    return (
        <div
            className = 'sphere-container'
        >
            <canvas
                ref = {canvasRef}
                onMouseEnter = {
                    () => {
                        clearTimeout(selfRotationTimerRef.current);
                        clearTimeout(timerRef.current);
                        handleShpereRotation();
                    }
                }
            ></canvas>

            <div className = 'buttons-container'>
                {props.skills.map((s)=> {
                    let options = {
                        skillName: s, 
                        selfRotationTimerRef: selfRotationTimerRef, 
                        timerRef: timerRef, 
                        gotoTimerRef: gotoTimerRef,
                        skillsAngleRef: skillsAngleRef,
                        activeSkillRef: activeSkillRef
                    }
                    return skillToButton(options);
                })}
            </div>
        </div>

    );
}

function handleMouseRotation(timerRef, canvasRef, skillsAngleRef, mousePosRef) {
    const maxIntensity = 0.04;
    let direction = {theta: 0, omega: 0};

    (function checkRotate() {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(checkRotate, 20);
        if (
            continueRotate(direction)
        ) {
            rotate(skillsAngleRef, direction);
        }
    })();


    function continueRotate(direction) {
        let vpX = mousePosRef.current.x;
        let vpY = mousePosRef.current.y;
        let bdb = canvasRef.current.getBoundingClientRect();

        if (
            vpX < bdb.left ||
            vpX > bdb.right ||
            vpY < bdb.top ||
            vpY > bdb.bottom
        ) {
            direction.theta = direction.theta/1.2;
            direction.omega = direction.omega/1.2;
        } else {
            let dim = (bdb.right - bdb.left)/2;
            let midX = (bdb.left + bdb.right)/2;
            let midY = (bdb.top + bdb.bottom)/2;
            direction.theta = (
                maxIntensity * (midX - vpX) / dim
            );
            direction.omega = (
                maxIntensity * (midY - vpY) / dim
            );
        }

        if(
            Math.abs(direction.theta) < 0.0001 &&
            Math.abs(direction.omega) < 0.0001
        ){
            direction.theta = 0;
            direction.omega = 0;
            return false;
        }

        return true;
    }
}

function handleSelfRotation(selfRotationTimerRef, skillsAngleRef, direction) {
    clearTimeout(selfRotationTimerRef.current);
    rotate(skillsAngleRef, direction);
    selfRotationTimerRef.current = setTimeout(
        handleSelfRotation.bind(null, selfRotationTimerRef, skillsAngleRef, direction)
    );
}


function rotate(skillsAngleRef, direction) {
    skillsAngleRef.current.forEach((s) => {
        //handle rotation omega
        if (
            direction.omega !== undefined && 
            typeof(direction.omega) === typeof(1) &&
            direction.omega !== 0
        ) {
            let [theta, phi] = rotationOmega(s.theta, s.phi, direction.omega);
            s.theta = theta;
            s.phi = phi;
        }
        //handle rotation theta
        if (direction.theta !== undefined && 
            typeof(direction.theta) === typeof(1)
        ){
            s.theta += direction.theta;
            if (s.theta > 2*Math.PI) {
                let n = Math.floor(s.theta/ (2*Math.PI));
                s.theta -= 2*n*Math.PI;
            }
            if (s.theta < -2*Math.PI) {
                let n = Math.floor((-1*s.theta)/ (2*Math.PI));
                s.theta += 2*n*Math.PI;
            }
        }
    });
}

function rotateWithCounter(gotoTimerRef, skillsAngleRef, item, direction, counter) {
    clearTimeout(gotoTimerRef.current);
    if (
        counter === 0 ||
        skillsAngleRef === null ||
        skillsAngleRef === undefined ||
        direction === null ||
        direction === undefined
    ) {
        return;
    }
    rotate(skillsAngleRef, direction);
    let [rotTheta, rotOmega] = getCenteringRotation(item.theta, item.phi);
    gotoTimerRef.current = setTimeout(rotateWithCounter.bind(
        null, 
        gotoTimerRef,
        skillsAngleRef, 
        item, 
        {theta: rotTheta/ROTATE_PARA, omega: rotOmega/ROTATE_PARA}, 
        counter-1), 
        20
    );
}



function parseSkills(skills) {
    let len = skills.length;
    let thetaCount = Math.floor(Math.sqrt(len));
    let thetaStep = 2 * Math.PI / thetaCount;
    let phiCount = Math.ceil(len/thetaCount);
    let phiStep = Math.PI / phiCount;

    let res = [];
    for (let i = 0; i < len; i++){
        let skill = skills[i];
        let obj = {};
        obj.name = skill;
        obj.theta = thetaStep * (Math.floor(i/phiCount) + 0.5);
        obj.phi = phiStep * (i%phiCount + 0.5);
        res.push(obj);
    }
    return res;
}

function drawSkills(
    ctx, 
    skillsAngleRef, 
    activeSkillRef, 
    dim, 
    color, 
    maxFontSize, 
    minFontSize
) {
    ctx.clearRect(0, 0, dim, dim);
    let center = {
        x: dim/2,
        y: dim/2
    };

    let radius = 0.4*dim;
    let skillsArray = [];
    for (let skill of skillsAngleRef.current) {
        let obj = {};
        [obj.x, obj.y, obj.z] = getCoord(skill.theta, skill.phi, radius);
        obj.curFontSize = (
            maxFontSize - (maxFontSize-minFontSize)*(0.5-(obj.z/radius))
        );
        obj.nameWidth = ctx.measureText(skill.name).width;
        obj.name = skill.name;
        skillsArray.push(obj);

    }
    skillsArray.sort((a, b) => a.z - b.z);
    for (let obj of skillsArray) {
        ctx.font = obj.curFontSize + 'px ' + 'Verdana';
        ctx.fillStyle = (
            (obj.name === activeSkillRef.current)?
            'rgb(255, 191, 0)':
            color
        );
        ctx.fillText(
            obj.name, 
            Math.round(center.x+obj.x-obj.nameWidth/2),
            Math.round(center.y-obj.y+obj.curFontSize/2)
        );
    }
}


function getCoord (theta, phi, radius) {
    let y = Math.cos(phi) * radius;
    let radiusProj = Math.abs(Math.sin(phi))*radius;
    let x = Math.cos(theta) * radiusProj;
    let z = Math.sin(theta) * radiusProj;
    return [x, y, z];
}

function rotationOmega (theta, phi, omega) {
    let [x, y, z] = getCoord(theta, phi, 1);
    let newZ = Math.cos(omega)*z - Math.sin(omega)*y;
    let newY = Math.sin(omega)*z + Math.cos(omega)*y;
    let proj = Math.sqrt(newZ * newZ + x * x);
    let newPhi = (
        (newY > 0)?
        Math.asin(proj):
        Math.PI - Math.asin(proj)
    );
    let newTheta = (
        (newZ > 0)?
        Math.acos(x/proj):
        -1*Math.acos(x/proj)
    );
    return [newTheta, newPhi];
}

function getCenteringRotation(theta, phi) {
    // return the rotation needed for 
    // get point with (phi, theta, radius) coordinates
    // to (-0.5PI, 0.5PI, radius)

    let rotTheta = 0.5*Math.PI - theta;
    let rotOmega = -0.5*Math.PI + phi ;
    return [rotTheta, rotOmega];
}

function skillToButton(options) {
    let { 
        skillName, 
        selfRotationTimerRef, 
        timerRef, 
        gotoTimerRef,
        skillsAngleRef,
        activeSkillRef, 
    } = options;
    const clickHandler = () => {
        let preActiveButton = document.querySelector(
            '.buttons-container button.is-active'
        );
        
        if (preActiveButton !== null) {
            preActiveButton.classList.remove('is-active');
            activeSkillRef.current = null;
        }
        let activeButton = document.getElementById('skill-'+skillName);
        if (
            activeButton !== null &&
            activeButton !== preActiveButton
        ) {
            activeButton.classList.add('is-active');
            activeSkillRef.current = skillName;
        }

        clearTimeout(selfRotationTimerRef.current);
        clearTimeout(timerRef.current);
        clearTimeout(gotoTimerRef.current);
        let item = null;
        for (let skill of skillsAngleRef.current) {
            if (skill.name === skillName) {
                item = skill;
                break;
            }
        }
        if (item === null) return;
        let [rotTheta, rotOmega] = getCenteringRotation(item.theta, item.phi);
        rotateWithCounter(
            gotoTimerRef,
            skillsAngleRef, 
            item, 
            {theta: rotTheta/ROTATE_PARA, omega: rotOmega/ROTATE_PARA}, 
            ROTATE_COUNTER
        );
    }
    return (
        <button
            className = 'button-skill'
            id = { 'skill-'+skillName }
            key = {'skill-'+skillName }
            onClick = {clickHandler}
        >
            {skillName}
        </button>
    );

}