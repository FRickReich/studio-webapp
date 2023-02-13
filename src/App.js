import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { 
    Login, 
    Register, 
    Reset, 
    Dashboard,
    Home
} from './Views';

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
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