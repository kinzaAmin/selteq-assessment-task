// TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
	const [title, setTitle] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		const newTask = { id: Date.now().toString(), title };
		onAdd(newTask);
		setTitle("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				marginTop: "3%",
				marginLeft: "30%",
				width: "60%",
			}}>
			<input
				type='text'
				placeholder='Enter task'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				style={{ width: "50%" }}
			/>
			<button
				type='submit'
				class='btn btn-outline-secondary'
				style={{ marginLeft: "5%" }}>
				Add Task
			</button>
		</form>
	);
};

export default TaskForm;
