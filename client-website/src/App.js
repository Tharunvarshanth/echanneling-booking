import React from 'react';
import {
  BrowserRouter as Router,

} from 'react-router-dom'
import './App.css';
import {RouterConfig} from "./app/navigation/RouterConfig";
import {NavMenu} from "./app/components/NavMenu";
import Footer from "./app/components/Footer";


function App() {



  return (
   <Router>
     <NavMenu/>
     <RouterConfig/>
     <Footer/>
   </Router>
  );
}

export default App;
