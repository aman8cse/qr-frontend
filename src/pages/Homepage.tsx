import React from 'react'
import {Link} from 'react-router-dom'

import "../css/homepage.css"

const Homepage = () => {
  return (
<>
        <header> 
            <div className="logo">MyAttendance</div>
            <nav>
                <a>Home</a>
                <a>Features</a>
                <a>Pricing</a>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>

        <section className="hero">
            <h1>Manage Attendance with Ease</h1>
            <p>Efficiency, Discipline, and Punctuality at your fingertips.</p>
            <Link to="/login"><button>Get Started</button></Link>
        </section>

        <section className="features">
            <div className="feature">
                <h2>Easy Clock In/Out</h2>
                <p>Seamlessly record your attendance with just a click.</p>
            </div>
            <div className="feature">
                <h2>Comprehensive Reports</h2>
                <p>Get detailed insights on attendance patterns.</p>
            </div>
            <div className="feature">
                <h2>Leave Management</h2>
                <p>Effortlessly manage and track leave requests.</p>
            </div>
        </section>

        <footer >
            <p>&copy; 2024 MyAttendance Made by AMAN, SHREYANSHxSHREYANSH, PRATEEK. All rights reserved.</p>
            <p>"Discipline is the bridge between goals and accomplishment. Embrace it."</p>
        </footer>
</>
  )
}

export default Homepage