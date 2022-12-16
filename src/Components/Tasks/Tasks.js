import React, { useEffect, useRef, useState } from 'react'
import './Tasks.css'
import { db } from '../../Firebase'
import { addDoc, collection, doc, getDoc,deleteDoc , getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import AddTask from '../Addtask/AddTask';
import ForwardTaskStatus from '../TaskStatus/TaskStatus';


function Tasks({ttype}) {

        const [Task, setTask] = useState([])

    const getTasks =()=>{
        if (ttype === "other") {

            const getAllTask = query(collection(db, "Notes"),orderBy("created_on","asc"));


                onSnapshot(getAllTask,(allTAskquerySnapshot)=>{
                        
                const allTask = [];
                allTAskquerySnapshot.forEach((doc) => {
                    console.log("All tasks are ", doc.data())
                    const tid = { id: doc.id };
                    allTask.push({ ...doc.data(), ...tid })
                });
                setTask(allTask)
                })
        }else{
            const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)  ; 


            const getAllTask = query(collection(db, "Tasks"),orderBy("created_on","asc"),orderBy("status","asc"),where("created_on",">=",oneDayAgo));


                onSnapshot(getAllTask,(allTAskquerySnapshot)=>{
                        
                const allTask = [];
                allTAskquerySnapshot.forEach((doc) => {
                    console.log("All tasks are ", doc.data())
                    const tid = { id: doc.id };
                    allTask.push({ ...doc.data(), ...tid })
                });
                setTask(allTask)
                })
            
        }
        
        
    }

   

                const [show, setshow] = useState(false)
                const [id, setid] = useState("")
                const [search, setsearch] = useState("")
                

                const openmodal =(tid)=>{
                    setshow(true)
                    setid(tid)
                }

                const close =()=>{
                    setshow(false)
                    console.log(show)
                }

                    const showref = useRef(); 

                useEffect(()=>{
                    getTasks();
                    document.addEventListener("mousedown", (e) => {
                        if (!showref.current.contains(e.target)) {
                            setshow(false)
                            setid("")
                            console.log("cloded")

                        };
                      })
                },[ttype])

  return (
    <>



    {ttype=== "college" ? <>
    <div className='tasks'>
        <h1>College Tasks</h1>
        <input type="text" placeholder='Search' style={{ borderRadius: "6px", border: "1px solid rgba(0, 0, 0, 0.08)",padding:"10px",width:"80%" }} onChange={(e)=>{setsearch(e.target.value)}} />


        <div className="task-container" >
            {Task.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())).map((t)=>{
                return<>
                        {t.type === "college" ? 
                <>
                 <div className="task" onClick={()=>openmodal(t.id)} style={{cursor:"pointer"}}>
            {t.status ===true ? <><div className="status">Done</div></>: <div className="status" style={{background:"#ff3737"}} >Pending</div>}
                <p id="title">Created on : {new Date(t.created_on.seconds * 1000).toLocaleDateString("en-US")}</p>
                <p id="title">Completed on : {new Date(t.completed_on.seconds * 1000).toLocaleDateString("en-US")}</p>
                <p id="title">Title : {t.title}</p>
                <div id="link"> <a href={t.links}>{t.links}</a> </div>
                <p id="note">Notes : {t.notes} </p>

            </div>
                </>: null}
                </>
            })}
        


        </div>
            
    </div>
    </> :null}

    {ttype=== "programming" ? <>
    <div className='tasks'>
        <h1>Programming Tasks</h1>
        <input type="text" placeholder='Search' style={{ borderRadius: "6px", border: "1px solid rgba(0, 0, 0, 0.08)",padding:"10px",width:"80%" }} onChange={(e)=>{setsearch(e.target.value)}} />


        <div className="task-container">
            {Task.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())).map((t)=>{
                return<>{t.type === "programming" ? 
                <>
                 <div className="task"  onClick={()=>openmodal(t.id)} style={{cursor:"pointer"}}>
            {t.status ===true ? <><div className="status">Done</div></>: <div className="status" style={{background:"#ff3737"}} >Pending</div>}
                <p id="title">Created on : {new Date(t.created_on.seconds * 1000).toLocaleDateString("en-US")}</p>
                <p id="title">Completed on : {new Date(t.completed_on.seconds * 1000).toLocaleDateString("en-US")}</p>
                <p id="title">Title : {t.title}</p>
                <div id="link"> <a href={t.links}>{t.links}</a> </div>
                <p id="note">Notes : {t.notes}  </p>

            </div>
                </>: null}
                       
                </>
            })}
        

           

        </div>
            
    </div>
    </> :null}

    {ttype=== "other" ? <>
    <div className='tasks'>
   
        <h1>Notes</h1>
        <div className="addTask">
                  <button><AddTask addnote={true}/></button>
                </div>
        <input type="text" placeholder='Search' style={{ borderRadius: "6px", border: "1px solid rgba(0, 0, 0, 0.08)",padding:"10px",width:"80%" }} onChange={(e)=>{setsearch(e.target.value)}} />

        <div className="task-container">
            {Task.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())).map((t)=>{
                return<>
                       
                <>
                 <div className="task" >
                <p id="title">Created on : {new Date(t.created_on.seconds * 1000).toLocaleDateString("en-US")}</p>
                <p id="title">Title : {t.title}</p>
                <div id="link"> <a href={t.links}>{t.links}</a> </div>
                <p id="note" style={{background:"#dddd",padding:"5px",width:"90%",margin:"10px auto",borderRadius:"6px"}} > {t.notes}  </p>

            </div>
                </>
                </>
            })}
        


        </div>
            
    </div>
    </> :null}

    {show === true ? <div ref={showref}><ForwardTaskStatus id={id} ref={showref} close={close} /> </div>: null}

    </>
    
  )
}

export default Tasks