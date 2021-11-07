import React, { useState } from "react";

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  //显示编辑状态
  const handleEditing = (props) => {
    setEditing(true)


  }
  //取消编辑
  const handleCancel = (props) => {
    setEditing(false)


  }

  //更新名字的状态
  const handleChange = (e) => {
    setNewName(e.target.value)
    console.log(newName);

  }
  //调用props的保存方法
  const handleSaveNewName = (e) => {
    e.preventDefault();

    if(newName === ''){alert("Name can't be empty") }
    else{
    console.log('newName',newName,'propsID',props.id);
    props.editTask(newName, props.id)
    setEditing(false)}
  }

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className="todo-text" type="text" onChange={handleChange} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={handleCancel}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleSaveNewName}>
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={handleEditing}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  //console.log('props', props, 'this', this);
  return (
    <li className="todo">

      {isEditing ? editingTemplate : viewTemplate}
    </li >
  )
}