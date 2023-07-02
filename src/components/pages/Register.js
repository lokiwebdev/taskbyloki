import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../layout/Loader";
// import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const auth = getAuth();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/login");
  };

  return (
    <div className="register-parent my-3">
      {loading && <Loader />}

      <div className="row justify-content-center py-3">

        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            // style="width: 300px; height: 300px;"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="col-md-4 z1">
          <form onSubmit={handleSubmit}>
            <div className="register-form">
              <h2>Register</h2>
              <hr />
              <input
                type="text"
                className="form-control my-2"
                placeholder="Name"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
              <input
                type="text"
                className="form-control my-2"
                placeholder="email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
              <input
                type="password"
                className="form-control my-2"
                placeholder="password"
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
              <input
                className="form-check-input my-2"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
               {" "}
              <label className="form-check-label" for="invalidCheck">
                I Agree to terms and conditions
              </label>
              <br />
              <button className="btnA my-3" type="submit">
                REGISTER
              </button>

              <hr />
              {/* <Link activeStyle={{ color:'green', fontWeight: 'bold'}} to="/login">Click Here to Login</Link> */}
              <Link to="/login">
                Already Registered? Login
              </Link>
            </div>
          </form>
        </div>

      </div>
      <div className="register-bottom "></div>

    </div>
  );
};

export default Register;
