import React from 'react'

const StudentTr = ({student, attendance, currBatch}) => {
  return (
    <tr>
        <th>{student.username}</th>
        {attendance.map(att => {
            if(att.batch !== currBatch) return;
            if(att.students.find(id => id == student.college_id)) {
                return (<th key={att._id}>P</th>)
            } else {
                return (<th key={att._id}>A</th>)
            }
        })}
    </tr>
  )
}

export default StudentTr