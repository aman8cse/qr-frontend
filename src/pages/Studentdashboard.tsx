import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Html5QrcodeScanner} from "html5-qrcode"

import "../css/student-dashboard.css"
import Attendance from '../../../server/models/Attendance';

const Studentdashboard = () => {
    const [student, setStudent] = useState<any>(null);
    const [subject, setSubject] = useState("");
    const [attendences, setAttendances] = useState<any>([]);

    useEffect(() => {
        getData();

        function onScanSuccess(decodedText, decodedResult) {
            punchAttendance(decodedText)
          }
          
          function onScanFailure(error) {
            // console.warn(`Code scan error = ${error}`);
          }
          
          let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
          html5QrcodeScanner.render(onScanSuccess, onScanFailure);


          const punchAttendance = async (decodedText) => {
            try {
                const res = await axios.post("https://qr-backend-b3pj.onrender.com/attendance/punch-in", {
                    user_token: localStorage.getItem("token"),
                    attendance_token: decodedText
                });
                console.log(res.data.message)
                alert(res.data.message)
            } catch (err) {
                alert(err.response.data.message);
            }
          }
// err.response.data.message
    }, []);

    const getData = async() => {
        try {
            const res = await axios.post("https://qr-backend-b3pj.onrender.com/attendance/get-student-attendance", {
                user_token: localStorage.getItem("token")
            })
            console.log(res.data);
            setStudent(res.data.student);
            setSubject(res.data.student[0]);
            setAttendances(res.data.attendances);
        } catch (err) {
            alert(err.message);
        }
    }

  return (
    <div className="dashboard-container">
        <h1 id="teacher-name">Welcome, {student && student.username}<span id="userDisplay"></span></h1>
        <div id="reader"></div>
        <div className="details">
            <div className="classes-block">
                <h2>Classes</h2>
                <ul id="classes-list">
                {student && student.subjects.map(sub => (
                    <li key={sub} className={subject == sub ? "active" : "inactive"}><button onClick={() => {
                        setSubject(sub)
                    }} className='button-none'>{sub}</button></li>
                ))}
            </ul> 
            </div>
            <div className="attendance-block">
                <h2>Student Attendance</h2>
                <table id="attendance-table">
                    <thead>
                        <tr>
                            <th colSpan={attendences.length}>Date</th>
                        </tr>
                        <tr>
                            {attendences.map((att, index) => {
                                const yymmdd = att.date.split("T")[0];
                                const month = yymmdd.split("-")[1];
                                const date = yymmdd.split("-")[2];
                                if(att.subject !== subject) return;
                                return (
                                    <th key={index}>{date}/{month}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {attendences.map(att => {
                            if(att.subject !== subject) return;
                            if(att.students.find(s => s === student.college_id)) {
                                return ( <th key={att._id}>P</th> );
                            } else { 
                                return ( <th key={att._id}>A</th> );
                            }
                        })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Studentdashboard