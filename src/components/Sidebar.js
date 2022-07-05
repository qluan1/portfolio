import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <aside id = "sidebar">
            <h3>Qi L.</h3>

            <nav className = "menu">
                <a href="#" className= "menu-item">About</a>
                <a href="#" className= "menu-item">Skills</a>
                <a href="#" className= "menu-item">Portfolio</a>
                <a href="#" className= "menu-item">Contact</a>
                <a href="#" className= "menu-item">Papers</a>
            </nav>

        </aside>
    );
}


export default Sidebar;