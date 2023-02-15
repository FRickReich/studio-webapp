import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {  
    Dashboard, Users, Blog, Login, NotFound
} from './Admin/Views';

import { Home } from './Web/Views';
import { AuthProvider } from "./userContext";

import "./App.scss";

function App() {
    return (
        <div className="app">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route exact path="/dashboard/" element={<Dashboard />} />
                        <Route exact path="/dashboard/login/" element={<Login />} />
                        <Route exact path="/dashboard/users/" element={<Users />} />
                        <Route exact path="/dashboard/blog/" element={<Blog />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}
export default App;