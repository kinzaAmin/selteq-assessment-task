import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [droppableId, setDroppableId] = useState("tasks"); // Set a default droppable ID

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
		setTasks(savedTasks);
		if (savedTasks.length > 0) {
			setDroppableId("tasks-populated"); // Update droppable ID once tasks are loaded
		}
	}, []);

	const handleAddTask = (newTask) => {
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
		setDroppableId("tasks-populated"); // Update droppable ID when new tasks are added
	};

	const handleDeleteTask = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
		if (updatedTasks.length === 0) {
			setDroppableId("tasks"); // Reset droppable ID if no tasks are present
		}
	};

	const handleEditTask = (editedTask) => {
		const updatedTasks = tasks.map((task) =>
			task.id === editedTask.id ? editedTask : task,
		);
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;

		const { source, destination } = result;
		const updatedTasks = [...tasks];
		const [removed] = updatedTasks.splice(source.index, 1);
		updatedTasks.splice(destination.index, 0, removed);

		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	return (
		<>
			<TaskForm onAdd={handleAddTask} />
			<DragDropContext onDragEnd={onDragEnd}>
				<table style={{ marginTop: "5%", width: "90%", marginLeft: "5%" }}>
					<thead>
						<tr
							style={{
								display: "flex ",
								justifyContent: "space-between",
							}}>
							<th> Task Title</th>
							<th>Actions</th>
						</tr>
					</thead>
					{tasks.length > 0 && (
						<Droppable droppableId={droppableId}>
							{(provided) => (
								<tbody ref={provided.innerRef} {...provided.droppableProps}>
									{tasks.map((task, index) => (
										<Draggable
											key={task.id}
											draggableId={task.id}
											index={index}>
											{(provided) => (
												<tr
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<td>
														<Task
															task={task}
															onDelete={handleDeleteTask}
															onEdit={handleEditTask}
														/>
													</td>
												</tr>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</tbody>
							)}
						</Droppable>
					)}
				</table>
			</DragDropContext>
		</>
	);
};

export default TaskList;
