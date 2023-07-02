import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    msg: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    alert(
      `My name is ${data.fullname}.My mobile number is ${data.phone} and email is ${data.email}, Here is what i whant to say : ${data.msg} `
    );

    navigate("/");
  };

  return (
    <div className="my-5 container">
      <section className="container ">
        <div className="col">
          <p className="h1 fw-bold text-primary" >
            Contact Me
          </p>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quidem voluptas officia officiis vero quibusdam ab maiores,
            quasi tenetur corporis sapiente veniam, ipsa expedita alias
            amet unde eum quas laboriosam voluptate provident.
          </p>
        </div>
      </section>

      <div className="my-5 row col-md-12 justify-content-around align-items-center ">
        <div className="col-md-5 m-2 ">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_twijbubv.json"
            background="transparent"
            speed="1"
            // style="width: 300px; height: 300px;"
            loop
            autoplay
          ></lottie-player>
        </div>

        <form className="form col-md-5 m-2 " onSubmit={formSubmit}>
          <h1 style={{ fontSize: 30 }}>Contact Me</h1>
          <p style={{ fontSize: 20 }}>Enter Your Details </p>

          <div className="mb-1">
            <label htmlFor="name" className="px-3 h5">
              Name*:
            </label>
            <input
              type="text"
              id="name"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-1">
            <label className="px-3 h5">Phone:</label>
            <input
              type="number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Your mobile number"
            />
          </div>

          <div className="mb-1">
            <label className="px-3 h5">Email*:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mt-3">
            <label className="px-1 h5">Message*</label>
            <textarea
              rows="3"
              name="msg"
              value={data.msg}
              onChange={handleChange}
              placeholder="Enter Your Message Here"
              required
            />
          </div>

          {/* <button className="btnAbtn-outline-primary" type="submit">Submit form</button> */}
          <button className="btnA my-4" type="submit">
            Submit form
          </button>
        </form>
      </div>

    </div>
  );
};

export default Contact;
