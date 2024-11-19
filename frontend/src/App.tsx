import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function login() {
   const host:string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

   window.open(host + "/oauth2/authorization/github", "_self");
}

// useEffect(() => {
//     getUser()
// }, []);

function getUser() {
    axios.get("/api/user/me")
        .then((response) => {console.log(response.data)})
        .catch(error => console.log(error));
}


export default function App() {
    return (
        <>
            <button onClick={login}>login</button>
            <button onClick={getUser}>Me</button>

            <h2>IAm LoggedIN</h2>

        </>
    );
}