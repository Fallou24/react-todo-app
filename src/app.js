import React, { useEffect, useState } from 'react';
import Alert from './pages/Alert';
import List from './pages/List';

const App = () => {
    const getLocalStorage=function () {
        let list;
        if (localStorage.getItem("list")) {
            list=JSON.parse(localStorage.getItem("list"))
            return list
        }
        else{
            return []
        }
    }
    const [name,setName] = useState("");
    const [list,setList]=useState(getLocalStorage())
    const [isEditing,setIsEditing]=useState(false);
    const [editId,setEditId] = useState(null)
    const [alert,setAlert]=useState({show:false,msg:"",type:""});
   
    const clearAlert = function () {
        setTimeout(()=>{
            setAlert({show:false,msg:"",type:""})
        },3000)
    }
    const handleSubmit = function (e) {
        e.preventDefault();
        if (!name) {
            setAlert({show:true,msg:"Please Enter a value",type:"danger"})
            clearAlert()
        }
       
        else{
            let newItem={id:new Date().getTime().toString(),title:name}
            setList([...list,{...newItem}])
            setName("")
            setAlert({...alert,show:true,msg:"Item added to the list",type:"succes"})
            clearAlert()
        }
    }
    const handleChange = function (e) {
       setName(e.target.value)
    }
    const clearList=function () {
        setList([])
        setAlert({show:true,msg:"Empty List !",type:"danger"})
        clearAlert()
    }
    const removeItem=function (id) {
        setAlert({show:true,msg:"Item removed !",type:"danger"})
        clearAlert();
        setList(list.filter(item=>{
            return item.id !== id
        }))
    }
    const editItem=function (id) {
       let a=list.find(value=>{
            return value.id===id;
        })
        setName(a.title)
        setIsEditing(true)
        setEditId(id)
    }
    const handleEdit=function (e) {
        e.preventDefault();
        setAlert({show:true,msg:"Value Changed",type:"succes"})
            clearAlert()
        setList(list.map(item=>{
            if (item.id===editId) {
                return {...item,title:name}
            }
            return item
        }))
        setEditId("")
        setName("")
        setIsEditing(false)
    }
    useEffect(()=>{
        localStorage.setItem("list",JSON.stringify(list))
    },[list])

    return (
        <div className='container'>
            {alert.show && <Alert alert={alert} />}
            <h1>Grocery Bud</h1>
            <form onSubmit={ isEditing ? handleEdit : handleSubmit}>
                <input type="text" onChange={handleChange} value={name} />
                <button className='submit'>{isEditing ? "Edit" : "Submit"}</button>
            </form>
            <List list={list} removeItem={removeItem} editItem={editItem} />
            {list.length>0 && <button className='clear' onClick={clearList}>Clear items</button>}
        </div>
    );
};

export default App;