import React, { useState, useEffect } from "react";

const DigitalClock = () => {
	const [time, setTime] = useState(new Date());
	const [bgColor, setBgColor] = useState("#fff");
	const [textColor, setTextColor] = useState("#000");

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const colorChangeInterval = setInterval(() => {
			const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
				16,
			)}`;
			setBgColor(randomColor);
			// Ensure contrasting text color
			setTextColor(getContrastingColor(randomColor));
		}, 10000);

		return () => clearInterval(colorChangeInterval);
	}, []);

	// Function to get contrasting color
	const getContrastingColor = (hexColor) => {
		const r = parseInt(hexColor.substr(1, 2), 16);
		const g = parseInt(hexColor.substr(3, 2), 16);
		const b = parseInt(hexColor.substr(5, 2), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness >= 128 ? "#000" : "#fff";
	};

	return (
		<div style={{ marginTop: "3%" }}>
			<h1 style={{ textAlign: "center" }}> Task2: Digital Clock</h1>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					// height: "100vh",
				}}>
				<div
					style={{
						backgroundColor: bgColor,
						color: textColor,
						padding: "20px",
						borderRadius: "10px",
						marginTop: "2%",
					}}>
					<h2>{time.toLocaleTimeString()}</h2>
				</div>
			</div>

			{/* <div style={{ backgroundColor: bgColor, color: textColor }}>
				<h2>{time.toLocaleTimeString()}</h2>
			</div> */}
		</div>
	);
};

export default DigitalClock;
