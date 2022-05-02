import './App.css';
import {useState} from "react";

function App() {

    const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const initialState = [
        {id: Math.random(), weekday: week[0], name: 'Wake up', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[1], name: 'Work', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[2], name: 'React', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[3], name: 'English', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[4], name: 'Game', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[5], name: 'Sleep', done: true, doneDone: true, doneDelete: true},
        {id: Math.random(), weekday: week[6], name: 'Run', done: true, doneDone: true, doneDelete: true},
    ]
    const [task, setTask] = useState(initialState)
    const [addNewTask, setAddNewTask] = useState([])
    const [updateTask, setUpdateTask] = useState([])
    const addTask = () => {
        const newTask = [...task, {id: Math.random(), weekday: week[0], name: addNewTask, done: true}]
        setTask(newTask)
        setAddNewTask([])
    }
    const del = (taskId) => {
        const newTask = task.filter(el => el.id !== taskId)
        setTask(newTask)
    }
    const openUpdate = (taskId) => {
        const newTask = task.map(el => el.id === taskId ? {...el, done: !el.done} : el)
        setAddNewTask([])
        setTask(newTask)
    }
    const saveUpdate = (taskId) => {
        const newTask = task.map(el => el.id === taskId ? {...el, name: updateTask, done: !el.done} : el)
        setTask(newTask)
        setUpdateTask([])
    }
    const moveTask = (taskId, value) => {
        const newTask = task.map(el => el.id === taskId ? {...el, weekday: week[week.indexOf(el.weekday) + value]} : el)
        setTask(newTask)
    }
    const doneTask = (taskId) => {
        const newTask = task.map(el => el.id === taskId ? {...el, doneDone: !el.doneDone} : el)
        setTask(newTask)
    }
    const openDelete = (taskId) => {
      const newTask = task.map(el => el.id === taskId ? {...el, doneDelete: !el.doneDelete} : el)
        setTask(newTask)
    }

    return (
        <div className="App">
            <input placeholder='add new task' value={addNewTask} onChange={event => setAddNewTask(event.target.value)}/>
            <button onClick={addTask}>add task</button>
            {week.map(day =>
                <div key={day}>
                    <h2>{day}</h2>
                    {task.filter(days => days.weekday === day).map(days =>
                        <div>
                            <button disabled={days.weekday === 'monday'} onClick={() => moveTask(days.id, -1)}>up</button>
                             {days.doneDone ?
                                    <div>
                                        {days.name}
                                        <button onClick={() => doneTask(days.id)}>done</button>
                                    </div>
                                    :
                                    <div>
                                        is ready your task
                                        <button onClick={() => doneTask(days.id)}>ready</button>
                                    </div>
                            }
                            {days.done ?
                                <div>
                                    <button onClick={() => openUpdate(days.id)}>update</button>
                                    {days.doneDelete ?
                                        <button onClick={() => openDelete(days.id)}>delete</button>
                                        :
                                        <div>
                                            <label htmlFor="5">ARE YOU SURE?</label>
                                            <button onClick={() => del(days.id)}>delete</button>
                                            OR
                                            <button onClick={() => openDelete(days.id)}>cancel</button>
                                        </div>

                                    }
                                </div>
                                :
                                <div>
                                    <input value={updateTask} onChange={event => setUpdateTask(event.target.value)}/>
                                    <button onClick={() => saveUpdate(days.id)}>save</button>
                                    <button onClick={() => openUpdate(days.id)}>cancel</button>
                                </div>
                            }
                            <button disabled={days.weekday === 'sunday'} onClick={() => moveTask(days.id, 1)}>down</button>
                        </div>)}
                    <hr/>
                </div>
            )}
        </div>
    );
}

export default App;
