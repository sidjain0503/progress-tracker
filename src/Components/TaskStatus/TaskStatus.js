import React, { useState } from 'react'
import Modal from 'react-modal';
// import './AssignTask.css'
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { addDoc, collection, doc, getDocs, query, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "25%",
        maxWidth:'70%',
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);


   

function TaskStatus({id,close}, ref) {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal(e) {
        // references are now sync'd and can be accessed.
        e.preventDefault()
        console.log("modal open")
    }

    function closeModal() {
        setIsOpen(false);
    }

    const navigate = useNavigate();

    const checkStatus =async()=>{
        const taskRef = doc(db, "Tasks", id);
      await updateDoc(taskRef, {
        status:true,
        completed_on: Timestamp.fromDate(new Date())
      });
        
      console.log("Done")
      toast.success("Task completed")
    
      }

      useEffect(()=>{
        openModal();
        console.log(id)
        
    },[])

  

    return (
        <div id='assignTask' >
            <button className='task_btn' onClick={openModal}>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <button onClick={closeModal} className='modal-close-btn'>✖</button>
                <div className='modal-top'>

                </div>
        
                    <h2 style={{fontFamily:"manrope",fontSize:"20px"}}> Task Completed !!! </h2>        

                        <button onClick={()=>{checkStatus();closeModal(); close(); }} style={{padding:"2%",background:"#07bc0c",color:"#ffff",fontFamily:"Manrope",fontSize:"16px",border:"none",borderRadius:"4px",cursor:"pointer"}} ref={ref} >Mark Done</button>           

            </Modal>

        </div >
    )
}

const ForwardTaskStatus = React.forwardRef(TaskStatus)

export default ForwardTaskStatus