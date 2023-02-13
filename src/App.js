import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import Reset from "./Reset";
// import Dashboard from "./Dashboard";

import { Login, Register, Reset, Dashboard } from './Views';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;