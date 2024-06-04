import React, { useContext, useState } from "react";
import Context from "../../context/context";
import styles from "./table.module.css";

const Table = () => {
	const { cities, getCities } = useContext(Context);
	const [currentPage, setCurrentPage] = useState(1);
	const [entriesPerPage, setEntriesPerPage] = useState(5);
	const [inputValue, setInputValue] = useState(entriesPerPage);

	const handleEntriesChange = (event) => {
		const value = event.target.value;
		setInputValue(value);

		if (value === "") {
			return;
		}

		const numberValue = Number(value);

		if (numberValue >= 5 && numberValue <= 10) {
			setEntriesPerPage(numberValue);
			localStorage.setItem("limit", numberValue);
			setCurrentPage(1);
			getCities(null, 1, numberValue);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			const newPage = currentPage - 1;
			setCurrentPage(newPage);
			getCities(null, newPage, entriesPerPage);
		}
	};

	const handleNextPage = () => {
		const newPage = currentPage + 1;
		setCurrentPage(newPage);
		getCities(null, newPage, entriesPerPage);
	};

	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th align="left" colSpan="2">
							No.
						</th>
						<th align="left" colSpan="5">
							Place Name
						</th>
						<th align="left" colSpan="5">
							Country
						</th>
					</tr>
				</thead>
				<tbody>
					{cities === null ? (
						<tr>
							<td colSpan="3">Start Searching...</td>
						</tr>
					) : cities && cities.length === 0 ? (
						<tr>
							<td colSpan="3">No records found.</td>
						</tr>
					) : (
						cities.map((city, idx) => (
							<tr key={city.id}>
								<td align="left" colSpan="2">
									{idx + 1 + (currentPage - 1) * entriesPerPage}
								</td>
								<td align="left" colSpan="5">
									{city.name}
								</td>
								<td align="left" colSpan="5">
									<img
										src={`https://flagsapi.com/${city.countryCode}/shiny/64.png`}
									/>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{cities && cities.length ? (
				<div className={styles.paginationBox}>
					<div>
						<button onClick={handlePreviousPage} disabled={currentPage === 1}>
							Previous
						</button>
						<span> Page {currentPage} </span>
						<button
							onClick={handleNextPage}
							disabled={cities?.length < entriesPerPage}
						>
							Next
						</button>
					</div>
					<div>
						<label>
							Entries per page :
							<input
								type="number"
								value={inputValue}
								onChange={handleEntriesChange}
								min="5"
								max="10"
							/>
						</label>
						{inputValue > 10 || inputValue < 5 ? (
							<p>Entries should be between 5 and 10</p>
						) : (
							""
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Table;
