import React, {useState, useEffect} from "react";

const Search = () => {

	const url = "https://assets.breatheco.de/apis/fake/todos/user/salchichasss"

	const [task, setTask] = useState("")

	const [tasks, setTasks] = useState([])
	
    useEffect(() => {
		getData()
	},[])

	const write = (event) => {
		setTask(event.target.value)
	}

	const addTask = () => {
		setTasks([...tasks, task])
	}

	const deleteTask = (taskDelete) => {
		setTasks(tasks.filter(element => element != taskDelete))
	}

	const getData = async () => {
		await fetch(url)
		.then (resp => {
			
			if(!resp.ok )
				throw new Error("User don't exist")
				

			console.log(resp.status)
			
			return resp.json()
		
		})
		.then (data => {
			setTasks([...data])

		})
		.catch (error => {
			console.log("hola")
			console.log(error)
			//createUser()
		})
	}

	const createUser = async () => {
		await fetch(url, {
			method: "POST",
			body: JSON.stringify(tasks), 
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then (resp => {
			if (!resp.ok)
				throw new Error ("Error creating the user")
		    
				return resp.json()
		})
		.then (data => {
			getData()
		})
		.catch (error => {
			alert(error)
		})
	}

	return (
			<div className="text-center mt-5">
				<h3 className="me-5">To-Do-List</h3>
				<input placeholder="Nueva Tarea" 
				onChange={write} 
				onKeyUp={e => e.keyCode == 13 && addTask()} />
				<button onClick={addTask}>Añadir</button>
				{tasks ?
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
				: ""}
				 {tasks.length != 0 ? <div className="label"><label>{tasks.length} item left</label></div> : <div>No hay tareas, añadir tareas</div>}
			</div>
    )
}

export default Search;