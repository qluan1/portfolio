import React from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import SidebarToggle from './components/SidebarToggle';
import './App.css'

function App () {

    return (
        <div id = "app">
            <Sidebar/>
            <Content/>
            <SidebarToggle/>
        </div>
    );
}

export default App;