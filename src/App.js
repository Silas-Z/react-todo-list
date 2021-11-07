import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

//定义过滤方法
const FILTER_MAP = {
  All: () => { return true },
  Activated: (item) => { return !item.completed },
  Completed: (item) => { return item.completed }
};
console.log('FILTER_MAP', FILTER_MAP);

const FILTER_NAME = Object.keys(FILTER_MAP)
console.log('FILTER_NAME', FILTER_NAME);


function App(props) {

  //初始化状态
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');


  //过滤按钮
  const filterButton = FILTER_NAME.map((item) => {
    return (
      <FilterButton
        name={item}
        isPressed={item === filter}
        handleFilter={handleFilter}
        key={item}
      />
    )

  })

  //处理filter button 事件
  function handleFilter(value) {
    setFilter(value)
    
  }
  //show task lists
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));



  //添加任务
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);


  }

  const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';  //判断任务数量，是否需要添加 's'
  const headingText = `${taskList.length} ${tasksNoun} remaining`; //任务列表的标题

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  //编辑任务
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(newName, id) {
    console.log('newName:', newName, 'id:', id);

    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">

        {filterButton}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

        {taskList}

      </ul>
    </div>
  );
}



export default App;
