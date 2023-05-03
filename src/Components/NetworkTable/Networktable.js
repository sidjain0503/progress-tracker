import React from 'react'
import './networktable.css'

function Networktable() {
  return (
    <div className="assigned-task-tab">
    <table className='task-table'>
        <tr className='table-head'>
            <th>SNo.</th>
            <th>Name </th>
            <th>Company </th>
            <th>Social Handle </th>
            <th> Brief</th>
            <th>Status </th>
        </tr>
{/* 
        {AllMentee.filter((m)=>m.name.toLowerCase().includes(queries.toLowerCase())).map((m,index)=>{
            return <>
            
            <tr>
            <td>{index+1}. </td>
            <td>{m.name} </td>
            <td>{m.preparing_for}</td>
            <td>{m.subscription_days} </td>
            <td>{m.mentor_name} </td>

            <td><div className="mentees_btn">
                        <button onClick={() =>createChat(m.id,m.name)}>Chat</button>
                        {type === "mentor" ? <button><AssignTask mentee_id={m.id} menteeName={m.name} preparing_for={m.preparing_for}/></button> : null}
                        <button onClick={() => navigate(`/dashboard/profile/mentee/${m.id}`)}>Profile</button>
                    </div></td>
        </tr>
            </>
        })} */}



    </table>

</div>


    

  )
}

export default Networktable