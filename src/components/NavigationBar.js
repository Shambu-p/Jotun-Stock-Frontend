import {useNavigate} from "react-router-dom";


export default function (){

    const navigate = useNavigate();

    // window.navigator.o
    return (
        <div className="mb-3">
            <div className="d-flex justify-content-center mb-3">
                <img className="logo_image" src={window.location.origin + "/image/jotun_logo.png"} alt="image"/> <br/>
            </div>
            <div className="d-flex justify-content-between p-2 rounded shadow-sm main_orange">
                <span className="navbar-brand">
                    Jotun IT Stock Management
                </span>
                <ul className="nav">
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={() => {navigate("/categories");}}>Categories</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={() => {navigate("/departments");}}>Departments</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={() => {navigate("/");}}>Devices</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={() => {navigate("/users");}}>Users</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={() => {navigate("/receives");}}>Receives</button>
                    </li>
                </ul>
            </div>
        </div>
    );
    
}