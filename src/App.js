import "./App.css";
import TaskList from "./Components/TaskList";
import DigitalClock from "./Components/DigitalClock";

function App() {
	return (
		<div className='App'>
			<h1 style={{ textAlign: "center" }}>
				Task1: To-Do list with complete crud and Drag&Drop{" "}
			</h1>
			<TaskList />

			<DigitalClock />
		</div>
	);
}

export default App;
