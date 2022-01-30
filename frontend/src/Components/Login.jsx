import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from "@material-ui/core"
import {
    toast,
    ToastContainer,
  } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirm: ""
  });

  const notify = () => toast.error("🦄 Passwords don't match", {
    theme: "colored"
  });

  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormdData) => {
        return {
            ...prevFormdData,
            [name]: value
          };
    });
  }
  console.log(formData);
  function handleSubmit(event) {
    event.preventDefault();
    if (formData.password === formData.confirm) {
        axios.post('http://localhost:4000/login', {
                  email: formData.email,
                  password: formData.password
              });

        navigate("/notes");
    } else {
    //   console.log("Passwords do not match");
        notify();
      return; //because i dont want run "Thanks.." if password not match
    }
  }
  return (
    <div className="form-container-register">
        <ToastContainer />

      <form className="form-register" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          className="form--input-register"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="form--input-register"
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="form--input-register"
          value={formData.confirm}
          onChange={handleChange}
          name="confirm"
        />
        <div className="form--marketing-register"><p><a onClick={() => navigate('/')}>Don't have account? Sign up</a></p></div>

        <button className="form--submit-register">Log in</button>
      </form>
    </div>
  );
}