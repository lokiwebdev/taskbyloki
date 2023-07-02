import React, { useState, useContext, useEffect } from "react";
// import { NavDropdown } from 'react-bootstrap'
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { LoginContext, loggedIn } from "../../App";
import logo from "../assets/lion.png"

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  // const [loggedIn, setLoggedIn] = useContext(LoginContext);
  // const loggedInApp = useContext(LoginContext);
  const auth = localStorage.token ? true : false;
  const loggeduser = JSON.parse(localStorage.getItem("user"));

  const [loggedInNav, setLoggedInNav] = useState(
    localStorage.token ? true : false
  );
  let navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    localStorage.token ? setLoggedInNav(true) : setLoggedInNav(false);
  }, [localStorage.length]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await localStorage.removeItem('token');
      console.log("Signed-out successfully");
      // localStorage.clear()
      setLoggedInNav(false);
      navigate("/login");
    } catch {
      alert("Error!");
      console.log("error in signOut");
    }
  };

  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar navbar-expand-lg navbar-light  ">
          <div className="container">
            <Link className="logo " to="/">
              <img src={logo} alt="logo" className="logoImg mb-2" />
              <h2>
                <span>R</span>eact
                <span>A</span>pp
              </h2>
            </Link>

            <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {loggedInNav ? (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/task">
                        Task
                      </NavLink>
                    </li>

                  
                    <div className="btn-group">
                      <NavLink
                        type="button"
                        className="btnAdropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {loggeduser.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/profile" className="dropdown-item">
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            LogOut
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <NavLink className="dropdown-item">
                            {loggeduser.email}
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </ul>
                ) : (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/task">
                        Task
                      </NavLink>
                    </li>
                   
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </ul>
                )}

                <div className="social-links">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
