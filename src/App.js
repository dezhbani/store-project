import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './admin/components/Dashboard';
import style from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <Routes>
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Routes>
      </div>
    );
  }
}

export default App;