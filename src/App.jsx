import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './contents/landingpage/Landingpage';
import Sell from './sell/Sell';
import Dreamehome from './dreamehome/Dreamehome';
import Myspace from './myspace/Myspace';



import Layout from './Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/dreamhome" element={<Dreamehome />} />
          <Route path="/myspace" element={<Myspace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
