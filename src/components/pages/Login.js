import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import { LoginContext } from '../../App';
import Loader from '../layout/Layout';

function Login() {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const [loading, setLoading] = useState(false)
    // const  setLoggedIn = useContext(LoginContext);
    const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);

    useEffect(() => {
        const auth = localStorage.getItem("token")

        if (auth) {
            navigate("/")
        }

    }, [])

    // const auth = getAuth();
    const handleLogin = (e) => {
        e.preventDefault();
        const user = localStorage.getItem("user")
        console.log(loggedIn)
        const loggeduser = JSON.parse(user)
        if (!user) {
            alert("Please Register Your Self Then Login")

        } else if (input.email === loggeduser.email && input.password === loggeduser.password) {
            localStorage.setItem("token", JSON.stringify(input));
            setLoggedIn(true);
            console.log("Sign-in successfully");
            navigate("/task");
            console.log(loggedIn)
        } else {
            alert("Invalid Email OR password")
            setInput({ email: "", password: "" })
        }
    }


    return (
        <div className='login-parent my-3 '>
            {loading && (<Loader />)}

            <div className="row justify-content-center py-3">

                <div className="col-md-4 z1">
                    <div className="login-form">
                        <h2>Login</h2>
                        <hr />
                        <input
                            className='form-control my-2'
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email"
                            required
                        />

                         {/* <br/> */}
                        <input
                            className='form-control my-2'
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                            required
                        />
                       
                        <button className=' btnA my-3' onClick={handleLogin}>LOGIN</button>
                       

                        <hr />
                        <Link to='/register'>Click Here to Register</Link>

                    </div>
                </div>
                <div className="col-md-5 z1">
                    <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_gjmecwii.json"
                        background="transparent"
                        speed="1"
                        // style="width: 300px; height: 300px;"
                        loop
                        autoplay>

                    </lottie-player>
                </div>
            </div>

            <div className="login-bottom "></div>


        </div>
    )
}

export default Login