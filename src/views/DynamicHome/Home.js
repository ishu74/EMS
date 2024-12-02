import React from "react";
import "../../../src/App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homepage">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="content-container text-center">
        <h1 className="display-4 text-light">Welcome to the Employee Management System</h1>
        <p className="lead text-light">
          Streamlining your workspace
        </p>
       
        <Link to="/login">
        {/* <button className="btn btn-primary mt-4" >Login</button> */}
        </Link>

      </div>
    </div>
  );
}

export default Home;
