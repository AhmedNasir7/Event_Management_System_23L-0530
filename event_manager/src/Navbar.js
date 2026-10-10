import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./slices/authSlice";
function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state) => state);
    const name = selector.auth.user.username;
    const isAuth = selector.auth.isAuth;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    return (
        isAuth ?
            <div className="flex justify-between w-screen h-fit bg-emerald-950 py-5 px-10 border rounded-xl">
                <h3 className="text-center text-xl font-bold text-green-200">{name}</h3>
                <button onClick={handleLogout} className="px-5 bg-green-400 rounded-full py-3 px-10 text-black hover:bg-blue-400 hover:px-12 cursor-pointer transition-all duration-300">Logout</button>
            </div>
            : null
    )
}

export default Navbar;
