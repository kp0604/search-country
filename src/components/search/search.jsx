import React, { useContext, useState } from "react";
import Context from "../../context/context";
import styles from "./search.module.css";

const search = () => {
	const { cities, getCities } = useContext(Context);

	const [query, setQuery] = useState("");

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.ctrlKey && event.key === "/") {
			event.preventDefault();
			getCities(query);
		}
	};

	return (
		<div class={styles.container}>
			<input
				className={styles.input}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder="Search places..."
			/>
			<div class={styles.hint}>Ctrl + /</div>
		</div>
	);
};

export default search;
