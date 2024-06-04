import axios from "axios";
import React, { useState } from "react";
import Context from "./context";

const Provider = ({ children }) => {
	const [cities, setCities] = useState(null);
	const [lastSearch, setLastSearch] = useState("");

	const getCities = async (query, page = 1, limit) => {
		if (query) {
			setLastSearch(query);
		}

		console.log("g", query, lastSearch);

		try {
			let limitQuery = limit
				? limit
				: localStorage.getItem("limit")
				? localStorage.getItem("limit")
				: 5;
			if (query || lastSearch) {
				const options = {
					method: "GET",
					url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
					params: {
						countryIds: "IN",
						offset: (page - 1) * limitQuery,
						limit: limitQuery,
						namePrefix: query ? query : lastSearch,
					},
					headers: {
						"x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
						"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
					},
				};

				const response = await axios.request(options);
				console.log(response.data);
				setCities(response.data.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Context.Provider value={{ cities, getCities }}>
			{children}
		</Context.Provider>
	);
};

export { Provider };
