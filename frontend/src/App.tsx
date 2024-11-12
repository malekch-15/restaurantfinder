import './App.css'
import Home from "./components/Home.tsx";
import Details from "./components/Details.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurant/:id" element={<Details />} />
                </Routes>
            </Router>
        </>
    );
}