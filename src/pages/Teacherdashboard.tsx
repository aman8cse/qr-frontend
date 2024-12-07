import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import { socket } from '../socket';
import QRCode from "react-qr-code";
import { DownloadTableExcel } from 'react-export-table-to-excel'

import StudentTr from '../components/StudentTr';

const Teacherdashboard = () => {

    const [teacher, setTeacher] = useState<any>(null);
    const [currBatch, setCurrBatch] = useState("")
    const [token, setToken] = useState("");
    const [students, setStudents] = useState<any>([]);
    const [attendance, setAttendance] = useState<any>([]);
    const [showQR, setShowQR] = useState(false);
    const [timer, setTimer] = useState(0);
    
    const timerId = useRef<any>(null);
    const tableRef = useRef<any>(null);
    
    
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.post("https://qr-backend-b3pj.onrender.com/attendance/get", {
                    token: localStorage.getItem("token")
                })
                setTeacher(res.data.user);
                setStudents(res.data.student_list);
                setCurrBatch(res.data.user.batches[0]);
                setAttendance(res.data.attendance_data);
                startConnection(res.data.user.batches[0], res.data.user.subjects[0]);
                console.log(res)
            } catch (err) {
                alert(err.message)
                console.log(err.message);
            }
        }
        getData();
        
        
        timerId.current = setTimeout(() => {
            setShowQR(true);
        }, 2000);




        function onConnect() {
            console.log("connection established");
        }
    
        function onDisconnect() {
            console.log("connection ended");
        }

        function onToken(_token) {
            console.log(_token);
            if(_token.timer) setTimer(_token.timer);
            setToken(_token.token);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('token', onToken);

        return () => {
            clearTimeout(timerId.current);

            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('token', onToken);
            // socket.off('start-session');
        };
    }, [])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(showQR) {
                setTimer(prevInt => {
                    if(prevInt == 0) {
                        return 20
                    } else {
                        return  prevInt - 1
                    }
                });
            }
        }, 1000)
        
        return () => {
            clearInterval(interval);
        }
    }, [showQR])
    

    const startConnection = async (__batch, __subject) => {
        socket.emit("start-session", { 
            _batch: __batch,
            _subject: __subject
         })
    }

    const leaveRoom = async () => {
        socket.emit("leave");
    }



  return (
    <div className="dashboard-container">
    <h1 id="teacher-name">Welcome, <span id="userDisplay">{teacher && teacher.username}</span></h1>
    <h2>{teacher && teacher.subjects[0]}</h2>
    {token != "" && showQR && <QRCode value={token} />}
    {showQR && <p>Valid For: {timer}s</p>}
    <div className="details">
        <div className="classes-block">
            <h2>Classes</h2>
            <ul id="classes-list">
                {teacher && teacher.batches.map(b => (
                    <li key={b} className={currBatch == b ? "active" : "inactive"}><button onClick={() => {
                        setCurrBatch(b)
                        leaveRoom()
                        startConnection(b, teacher.subjects[0])
                    }} className='button-none'>{b}</button></li>
                ))}
            </ul> 
        </div>
        <div className="attendance-block">
            <h2>Student Attendance</h2>
            
            <DownloadTableExcel
                    filename="attendance table"
                    sheet={currBatch}
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>
            </DownloadTableExcel>

            <table id="attendance-table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        {/* <th colSpan={attendance.length}>Date</th> */}
                        {attendance.map(at => {
                            const yymmdd = at.date.split("T")[0];
                            const month = yymmdd.split("-")[1];
                            const date = yymmdd.split("-")[2];
                            if(at.batch !== currBatch) return;
                            return <th key={at._id}>{date}/{month}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {students.map(st => {
                        if(st.batches[0] == currBatch) {
                            return (
                                <StudentTr key={st.college_id} 
                                    student={st}
                                    attendance={attendance} 
                                    currBatch={currBatch}
                                    />
                            )

                        }
                    })}
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default Teacherdashboard