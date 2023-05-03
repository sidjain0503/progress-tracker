import React, { useEffect, useState } from 'react'
import './App.css'
import AddTask from './Components/Addtask/AddTask'
import Header from './Components/Header/Header'
import { motion } from "framer-motion";

import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where, writeBatch } from "firebase/firestore";
import { db } from './Firebase';
import Tasks from './Components/Tasks/Tasks';

function Home() {
  const [Task, setTask] = useState([])

  const getTasks = () => {
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);

    const getAllTask = query(collection(db, "Tasks"),orderBy("created_on","asc"),orderBy("status","asc"),where("created_on",">=",oneDayAgo));



    onSnapshot(getAllTask, (allTAskquerySnapshot) => {

      const allTask = [];
      allTAskquerySnapshot.forEach((doc) => {
        console.log("All tasks are ", doc.data())
        const tid = { id: doc.id };
        allTask.push({ ...doc.data(), ...tid })
      });
      setTask(allTask)
    })
  }


  useEffect(() => {
    getTasks();
  },[])

  const percentage = Math.round(((Task.filter((task) => task.status === true).length) / (Task.length)) * 100);


  return (
    <motion.div 
    animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -150 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    className='home'>
      <div className="tasks_progress">
        <div className="task_num">
          <strong>Task Assigned</strong>
          <span>{Task.length}</span>
        </div>
        <div className="task_num">
          <strong>Task Completed</strong>
          <span>{(Task.filter((task) => task.status === true).length)}</span>
        </div>
      </div>
      <div className="percentage">
        <span style={{color:"white",fontWeight:"bold"}}>Percentage of tasks completed today</span><strong>{percentage}%</strong>
      </div>
      {/* <div className="graph">
      </div> */}

      <div className="addTask">
        <button><AddTask /></button>
      </div>

      <Tasks ttype={"programming"}/>

    </motion.div>
  )
}

export default Home