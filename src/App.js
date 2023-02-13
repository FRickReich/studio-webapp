import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {  
    Dashboard, Users,
} from './Admin/Views';

import { Home } from './Web/Views';

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/dashboard/users" element={<Users />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;