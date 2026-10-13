import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [username, SetUsername] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username == "" || email == "" || password == "") {
            alert("Please fill all the fields")
        }
        else {
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            alert("User Registered Successfully")
            navigate("/");
        }
    }
    return (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-10 bg-emerald-100">
            <h1 className="text-center text-3xl font-bold text-green-900">Event Management System</h1>
            <div className="Login bg-emerald-950 mx-auto my-10 rounded-2xl py-10 h-fit w-[60vw]" >
                <h1 className="text-center text-3xl font-bold text-green-400">Register for Events!</h1>
                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="bg-white w-[50%] my-5 rounded-xl px-5 py-2" onChange={(e) => SetUsername(e.target.value)} />
                    <input type="email" placeholder="Email" className="bg-white w-[50%] my-5 rounded-xl px-5 py-2" onChange={(e) => SetEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="bg-white w-[50%] my-5 rounded-xl px-5 py-2" onChange={(e) => SetPassword(e.target.value)} />
                    <button type="submit" className="w-[50%] my-10 bg-green-400 rounded-full py-3 px-10 text-black hover:bg-blue-400 hover:px-12 cursor-pointer transition-all duration-300">Register</button>
                    <p className="text-white">Already have an account?</p><Link to="/" className="text-blue-300 underline">Login</Link>
                </form>
            </div >
        </div>
    );
}

export default Register;
