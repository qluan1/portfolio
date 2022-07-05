import React, {useEffect, useRef} from 'react';
import './SidebarToggle.css';

function SidebarToggle() {
    const toggleRef = useRef(null);
    const handleToggle = () => {
        toggleRef.current.classList.toggle('is-active');
        let sidebar = document.getElementById('sidebar');
        if (sidebar === null) return;
        sidebar.classList.toggle('is-active');
    }

    useEffect(()=> {
        toggleRef.current.addEventListener('click', handleToggle);
        return (
            ()=>{
                toggleRef.current.removeEventListener('click', handleToggle);
            }
        );
    }, []);
    return (
        <div id = "sidebar-toggle" ref = {toggleRef}>
            <div className="hamburger">
                <span></span>
            </div>
        </div>
    );
}

export default SidebarToggle;