import "./App.css";
import Search from "./components/search/search";
import Table from "./components/table/table";
import { Provider } from "./context/provider";

function App() {
	return (
		<Provider>
			<div className="container">
				<Search />
				<Table />
			</div>
		</Provider>
	);
}

export default App;
