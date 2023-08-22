import "../Styles/Login.css";
import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SignOut() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const userInputRef = useRef({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setData(storedUsers);
    }
  }, []);

  const getdata = (e) => {
    const { value, name } = e.target;
    userInputRef.current[name] = value;
  };

  const addData = (e) => {
    e.preventDefault();

    const { name, email, password } = userInputRef.current;

    if (name === "") {
      toast.error("Name field is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password field is required", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("Password should be greater than five characters", {
        position: "top-center",
      });
    } else {
      // console.log("Data added successfully");
      const newData = { name, email, password };
      setData((prevData) => [...prevData, newData]);
      localStorage.setItem("users", JSON.stringify([...data, newData]));
      navigate("/log-in");
    }
  };

  return (
    <div className="login-conatiner">
      <div className="login-left">
        <img className="login-logo" src="./logo.png" alt="" />
        <img className="login-img" src="./KishoreKumar.png" alt="" />
        <h2>All Your Music.</h2>
        <h3>Anytime, anywhere.</h3>
      </div>
      <div className="login-right">
        <section className=" login-right-container">
          <div className="left_data mt-3 p-3" style={{ width: "70%" }}>
            <h1 className="text-center h1-tag col-lg-12">
              Welcome to JioSaavn.
            </h1>
            <Form className="form-container">
              <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Enter Your Full Name"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-8"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Set Password"
                />
              </Form.Group>

              <Button
                variant="primary"
                className="col-lg-8 submit-button button-signIn"
                onClick={addData}
                style={{
                  background: "rgb(67, 185, 127)",
                  borderRadius: "15px",
                }}
                type="submit"
              >
                Continue
              </Button>
            </Form>
            <p className="mt-3 ">
              Already Have an Account{" "}
              <span>
                <NavLink to="/log-in">Sign In</NavLink>
              </span>{" "}
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignOut;
