import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../src/slices/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username == localStorage.getItem("username") && password == localStorage.getItem("password")) {
            dispatch(login({ user: { username: username, email: localStorage.getItem("email"), password: password }, isAuth: true }));
            navigate("/events");
        }
        else {
            alert("User Not Found")
        }
    }
    return (
        <div className="Login bg-emerald-950 mx-10 my-10 rounded-2xl py-10" >
            <h1 className="text-center text-3xl font-bold text-green-400">Login for Events!</h1>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" className="bg-white w-50 my-5 rounded-xl px-5 py-2" onChange={(e) => SetUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="bg-white w-50 my-5 rounded-xl px-5 py-2" onChange={(e) => SetPassword(e.target.value)} />
                <button type="submit" className="w-50 my-10 bg-green-400 rounded-full py-3 px-10 text-black hover:bg-blue-400 hover:px-12 cursor-pointer transition-all duration-300">Login</button>
                <p className="text-white">Dont have an account?</p><Link to="/register" className="text-blue-300 underline">Register</Link>
            </form>
        </div >
    );
}

export default Login;
