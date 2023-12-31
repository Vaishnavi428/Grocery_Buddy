
import { useEffect, useState } from 'react';
import './App.css';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return(list = JSON.parse(localStorage.getItem("list")))
  }else{
    return [];
  }
}

function App() {

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""})
  console.log(name);



const handleSubmit = (e) =>{
  //add items
  e.preventDefault();
  if(!name){
    console.log('No user Found');
    showAlert(true, 'danger', 'please enter a value')
  }else if(name && isEditing){
    setList(
      list.map((item) => {
        if(item.id == editId){
          return {...item, title:name};
        }
        return item;
      })
    );
    setName('')
    setEditId(null)
    setIsEditing(false)
    showAlert(true, 'success', 'value changed');
  }else{
    showAlert(true, 'success', 'items added to the list')
    const newItem = {id:new Date().getTime().toString(), title:name}
    setList([...list, newItem]);
    setName("");
  }
};
const showAlert = (show =false, type='', msg='') => {
  setAlert({show,type, msg});
}
const clearList =() =>{
  //logic to clear all of the items
  showAlert(true, 'danger', 'empty list');
  setList([]);
}
const editItem = (id) => {
  //logic to edit button
  const specificItem = list.find((item)=> item.id ===id)
  setIsEditing(true);
  setEditId(id);
  setName(specificItem.title)

}
const removeItem = (id) => {
  //logic to remove item
  showAlert(true, 'danger', 'item is removed')
  setList(list.filter(item => item.id !== id))
}
  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className='grocery-form'>
        {alert.show && <Alert {...alert} removeAlert = {showAlert} />}
      <h3>Grocery Buddy</h3>
      <div className="form-control">
        <input
        onChange={(e) => setName(e.target.value)} 
        className="grocery"
        type = 'text'
        placeholder="e.g. eggs"/>
        <button type="submit" className="submit-btn">{" "}
        {isEditing ? "edit" : "submit "}</button>
        
      </div>
      </form>
      
        {list.length > 0 && (
          <div className='grocery-container'>
          <List items={list} editItem={editItem} removeItem={removeItem}/>
          <button onClick={clearList} className='clear-btn'>clear items</button>
          </div>
        )}
      
    </section>
  );
}

export default App;
