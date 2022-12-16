import React, { useState } from 'react'
import Modal from 'react-modal';
import './Addtask.css'
import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { async } from '@firebase/util';
// import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
// import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
// import moment from 'moment'
// import Calander from './Calander';
// import calander from './calander.png'/
import { db } from '../../Firebase';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "280px",
        height: "70%",
        boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px"

    },
};

const element = document.getElementById("dashboard-tab")

Modal.setAppElement(element);




function AddTask({ addnote }) {

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



    const INITIAL_STATE = {
        created_on: Timestamp.fromDate(new Date()),
        completed_on: "",
    };

    const mentor_id = localStorage.getItem('user')
    const navigate = useNavigate();
    const [Showsubject, setShowsubject] = useState(false)
    const [Tasks, setTasks] = useState(INITIAL_STATE)
    const { Title, Task, Assignedat, End_date } = Tasks;



    // Add a new document with a generated id. store tasks 
    const [select, setselect] = useState("programming")


    const AddTasks = async (e) => {
        e.preventDefault();
        console.log("clicked")
        // setTasks({...Tasks})

        console.log(Tasks)
        console.log(select)

        if (addnote === true) {
            const docRef = await addDoc(collection(db, "Notes"), { ...Tasks, status: false, type: "notes" });

            if (docRef.id) {
                console.log("Document written with ID: ", docRef.id);
            }

            closeModal();
            toast.success("Task Added Sucessfully ")

        } else {

            const docRef = await addDoc(collection(db, "Tasks"), { ...Tasks, status: false, type: select });

            if (docRef.id) {
                console.log("Document written with ID: ", docRef.id);
            }

            closeModal();
            toast.success("Task Added Sucessfully ")
        }




    }

    const changeInput = (e) => {
        const { value, name } = e.target;
        setTasks({ ...Tasks, [name]: value });

    }

    return (
        <div >
            <button style={{ width: "100%", background: "transparent", height: "100%", border: "none", fontFamily: "Manrope", cursor: "pointer" }} onClick={openModal}>
                <span style={{ color: 'black', fontSize: '18px' }}>Add Task</span>
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
                    <strong>Create a New Task </strong>
                </div>

                <form action="" className="task-form">

                    {addnote === true ? <>
                        <div className="modal-input">
                            <label htmlFor="assigned">Type of task</label>
                            <select name="type" id="" style={{ padding: '10px', background: "rgba(0, 0, 0, 0.04)", borderRadius: "6px", border: 'none' }} onChange={(e) => { setselect(e.target.value); console.log(select) }} >
                                <option value="notes">Notes</option>
                            </select>
                        </div>
                    </> : <>
                        <div className="modal-input">
                            <label htmlFor="assigned">Type of task</label>
                            <select name="type" id="" style={{ padding: '10px', background: "rgba(0, 0, 0, 0.04)", borderRadius: "6px", border: 'none' }} onChange={(e) => { setselect(e.target.value); console.log(select) }} >
                                <option value="programming" >Programming</option>
                                <option value="college">College</option>
                            </select>
                        </div>
                    </>}

                    <div className="modal-input">
                        <label htmlFor="assigned">Topic Name</label>
                        <input type="text" name="title" id="" onChange={changeInput} />
                    </div>
                    {!addnote === true ? <>

                    <div className="modal-input">
                        <label htmlFor="assigned">Topic link</label>
                        <input type="text" name="links" id="" onChange={changeInput} />
                    </div>
                    </>
                    : 
                    null}

                    {addnote === true ? <>
                        <div className="modal-input">
                            <label htmlFor="assigned">Note</label>
                            <textarea name="notes" id="" cols="30" rows="10" onChange={changeInput}></textarea>
                        </div></> : <>
                        <div className="modal-input">
                            <label htmlFor="assigned">Note/Bookmark</label>
                            <input type="text" name="notes" id="" onChange={changeInput} />
                        </div>
                    </>}


                    {addnote === true ? <button onClick={AddTasks}>Add Note</button> : <button onClick={AddTasks}>Create Task</button>}



                </form>


            </Modal>

        </div >
    )
}

export default AddTask