import "../Styles/Login.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setUserInput(() => {
      return {
        ...userInput,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("users");
    // console.log(getuserArr);

    const { email, password } = userInput;
    if (email === "") {
      toast.error("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("Please enter valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password field is required", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("Password length should be greater five", {
        position: "top-center",
      });
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((ele) => {
          return ele.email === email && ele.password === password;
        });

        if (userlogin.length === 0) {
          toast.error("Invalid Details", {
            position: "top-center",
          });
        } else {
          // console.log("user login succesfulyy");

          localStorage.setItem("user_login", JSON.stringify(userlogin));

          navigate("/");
        }
      }
    }
  };

  return (
    <div className="login-conatiner">
      <div className="login-left">
        <img className="login-logo" src="./logo.png" alt="" />
        <img className="login-img" src="./Badshah.png" alt="" />
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
                Log in
              </Button>
            </Form>
            <p className="mt-3 ">
              Go to{" "}
              <span>
                <NavLink to="/sign-out">Sign Up</NavLink>
              </span>{" "}
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
