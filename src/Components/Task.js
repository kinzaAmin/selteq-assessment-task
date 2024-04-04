// Task.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Task = ({ task, onDelete, onEdit }) => {
	const [editing, setEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleEditChange = (e) => {
		setEditedTitle(e.target.value);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		const editedTask = { ...task, title: editedTitle };
		onEdit(editedTask);
		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<form onSubmit={handleEditSubmit}>
					<div
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
						}}>
						<input
							type='text'
							value={editedTitle}
							onChange={handleEditChange}
							style={{ padding: "0", width: "60%" }}
						/>

						<div
							style={{
								display: "flex",

								justifyContent: "end",
							}}>
							<button class='btn btn-success' type='submit'>
								Update
							</button>
							<button
								style={{ marginLeft: "6%" }}
								type='button'
								class='btn btn-danger'
								onClick={() => setEditing(false)}>
								Cancel
							</button>
						</div>
					</div>
				</form>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
					}}>
					<span>{task.title}</span>
					<div style={{ display: "flex" }}>
						<button
							type='button'
							class='btn btn-danger'
							onClick={() => onDelete(task.id)}>
							Delete
						</button>
						<button
							style={{ marginLeft: "6%" }}
							type='button'
							class='btn btn-primary'
							onClick={() => setEditing(true)}>
							Edit
						</button>
						{/* <button onClick={() => onDelete(task.id)}>Delete</button> */}
						{/* <button onClick={() => setEditing(true)}>Edit</button> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default Task;
