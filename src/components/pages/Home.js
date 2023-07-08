import React from "react";
import { NavLink } from "react-router-dom";
// import Typical from 'react-typical'

const Home = () => {
  return (
    <>
      <section id="header">
        <div className="col-md-11  ">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6  ">
              <h1>
                We Welcome's You In
                <strong className="brand-name"> React App</strong>
              </h1>
              <h2 className="my-3">
                Here You Can Find The Task Which Wass Given By You To Evaluate My Skill Set Much More Efficiently.
              </h2>
             
              <div className="my-4">
                <NavLink to="/task" className="btnA">
                  Check It Now
                </NavLink>
              </div>
            </div>

            <div className="col-md-5 ">
              <lottie-player
                // src="https://assets8.lottiefiles.com/packages/lf20_rnnlxazi.json"
                src="https://assets3.lottiefiles.com/packages/lf20_XyoSty.json"
                background="transparent"
                speed="1"
                // style="width: 300px; height: 300px;"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
