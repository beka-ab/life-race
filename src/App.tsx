import "./App.css";
import Garage from "./components/car/Car";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Winners from "./components/winners/Winners";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Garage />} />
          <Route path="/winner" element={<Winners />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
