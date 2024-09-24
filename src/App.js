import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootBeerDetails from "./Pages/DetailsPage";
import RootBeers from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootBeers />} />
        <Route path="/drinks/:drinkId" element={<RootBeerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
