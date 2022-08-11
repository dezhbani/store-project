import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Bar from './Bar';
import panelitem from './dashboard.item';

//Styles
import style from "./Dashboard.module.css";
import Item from './Item';
import Items from './Items';

const Dashboard = () => {
    return (
        <div className={style.mainContainer}>
            <Bar />
            <Routes>
            <Route path="/111" element={<Item/>}/>
            <Route path="/dashboard/home" element={<Items/>}/>
            </Routes>
        </div>
    );
};

export default Dashboard;