import React, {useState} from "react";

const Search = () => {

	const [task, setTask] = useState("")

	const [tasks, setTasks] = useState([])
	
	const write = (event) => {
		setTask(event.target.value)
	}

	const addTask = () => {
		setTasks([...tasks, task])
	}

	const deleteTask = (taskDelete) => {
		setTasks(tasks.filter(element => element != taskDelete))
	}




	return (
			<div className="text-center mt-5">
				<h3 className="me-5">To-Do-List</h3>
				<input placeholder="Nueva Tarea" 
				onChange={write} 
				onKeyUp={e => e.keyCode == 13 && addTask()} />
				<button onClick={addTask}>Añadir</button>
				{task ?
				<ul>
					{
						tasks.map((element, index) => {
							return <li className="li mt-2" key={index}>{element} 
							<button onClick={
								() => {
									deleteTask(element)
								}
							} >X</button></li>
						})
					}
				</ul>
				: <li className="li me-5 mt-2">No hay tarea, añadir tarea</li>}
			</div>
    )
}

export default Search;