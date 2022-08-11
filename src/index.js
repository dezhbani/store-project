import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/components/Dashboard';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
<App/>
<Dashboard/>
</BrowserRouter>
)


