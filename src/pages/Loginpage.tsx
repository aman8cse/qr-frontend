import React, {useState} from 'react'
import {Navigate} from "react-router-dom"
import axios from 'axios'

const Loginpage = () => {

    const [college_id, setcollegeId] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [
        selectedValue,
        setSelectedValue,
    ] = useState("student");
    
    const handleRadioChange = (value) => {
        setSelectedValue(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("https://qr-backend-b3pj.onrender.com/auth/login", {
                college_id,
                password
            });
            localStorage.setItem("token", res.data.token);
            setRedirect(true);
        } catch (err) {
            console.log(err);
            alert("Invalid UserID password combination");
        }
    }

  return (
    <div className="container">
        { (redirect && (selectedValue == "student")) ? <Navigate to='/student-dashboard'/> : null }
        { (redirect && (selectedValue == "teacher")) ? <Navigate to='/teacher-dashboard'/> : null }
        <h1>Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
        <div className="user-type">
            <label>
                <input className="option" 
                    type="radio" 
                    name="user-type" 
                    value="student" 
                    checked={selectedValue ==="student"}
                    onChange={() => handleRadioChange("student")}
                     /> Student
            </label>
            <label>
                <input className="option" 
                    type="radio" 
                    name="user-type" 
                    value="teacher"
                    checked={selectedValue ==="teacher"}
                    onChange={() => handleRadioChange("teacher")}
                    /> Teacher
            </label>
        </div>
        <div className="login-form">
                <input type="text" id="college_id" placeholder="college ID" onChange={(e) => setcollegeId(e.target.value)} />
                <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />              
                <input type="submit" />
        </div>
        </form>
    </div>
  )
}

export default Loginpage;