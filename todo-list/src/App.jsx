// 1. Add Task (Basic)
// User input me text likhe → button click → list me task add ho.
// Logic:
// input ka text useState me store
// Add click → list me push
// Input empty

import React from 'react';
import {useState} from 'react';

import {useEffect} from 'react';

function App() {


  const [list,setList] = useState([]);

  const [editIndex,setEditIndex] = useState(null);
  
  const [task,setTask]= useState("")

  const [count,setCount]= useState(0)

  const [done,setDone]= useState(0)


  useEffect(()=>{
      const arr = JSON.parse(localStorage.getItem('todos'));
      if(arr){
        setList(arr);
        setCount(arr.length);
        let cnt = 0;
        for(let i = 0;i<arr.length;i++){
          if(arr[i].completed)cnt++;
        }
        setDone(cnt);
      }
  },[]);


  useEffect(()=>{
      const save = JSON.stringify(list);
      localStorage.setItem('todos',save);
  },[list,done,count]);

  const addTask = ()=>{
     
    if(task.trim()==="")return;
    

    const newTask = {
      text : task,
      completed : false,
     
    }


    setList([...list,newTask]);
    setTask("");
    setCount(count+1)
    
  }

  

  const deleteTask = (id) => {
    const newList = list.filter((item,index)=> index!=id);
    setList(newList);
    setCount(count-1)
  }


  const clearAll = () => {
    setList([]);
    setDone(0)
    setCount(0)
  }


 const toggleComplete=(itm,id)=>{
      if(itm.completed==false)
        setDone(done+1)
      else
        setDone(done-1)
     
      const updated_list= list.map((item,index)=>{
        if(id===index)
        {
          return  {...item, completed:!item.completed}
        }
        return item;
      })
      setList(updated_list)

 }

 const saveTask = ()=>{
   const updated_list = list.map((item,index)=>{
    if(index===editIndex){
      return {...item,text:task};
    }
    return item;
   })
    setList(updated_list)
    setTask("");
    setEditIndex(null);
   
 }

 const editTask=(tsk,id)=>{

   setTask(tsk.text)
   setEditIndex(id);
 }

 

  return (
    <>
    <h2>Add Task</h2>
    <p>Total:{count}|| Completed:{done} || Pending:{count-done}</p>
    <input type="text"
           placeholder="Enter task "
           value={task}
           onChange={(e)=>setTask(e.target.value)} />

   {(editIndex === null)?
       <button onClick={addTask}>Add</button>
    :
       <button onClick={saveTask}>Save</button>
  }

    <h2>total task pending {count}</h2>
   
    <ul>
      {
       
       list.map((item,index) => (
         <li key={index}>
         <input type="checkbox" checked={item.completed} onChange={()=>{toggleComplete(item,index)}}/>
         <span style={{
           textDecoration:(item.completed)?"line-through":"none"
          }}>{item.text}
         </span>
          <button onClick={()=>{editTask(item,index) }}>🖊️</button>
          {editIndex === index && <span> (editing...) </span>}
          <button onClick={()=>{deleteTask(index)}}>❌</button>   
         
         </li>
        )
       )
    }
    </ul>
    <button onClick={clearAll}>Clear All</button>
   
    </>
  )
}

export default App
