import { Outlet } from "react-router-dom";
// import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Loading from './components/Loading';
import React, { useState, useEffect } from 'react';
import Footer from "./screens/Footer";


const App = () => {
const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);
    
      if (isLoading) {
        return <Loading />;
      }
  if(Outlet){
    
  }
  else{
    return <Loading/>;
  }
  return (
    <>
   
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer/>
    </>
  );
};

export default App;
