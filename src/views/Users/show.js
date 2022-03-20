import {useEffect, useState} from "react";
import api from "../../api";
import {set} from "../../cookies";
import NavigationBar from "../../components/NavigationBar";
import {useNavigate} from "react-router-dom";


export default function(){

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        let getUsers = async () => {
            try{

                let response = await api.get("/api/users");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setUsers(response.data.data);

            }catch(error){
                console.log(error.message);
            }
        }

        getUsers();

    }, []);


    let user_components = users.map(user => {
        return (<tr key={user.id} >
            <td>
                {user.first + " " + user.middle + " " + user.last}
            </td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>{user.role === "administrator" ? "Administrator" : "Ordinary User"}</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-sm btn-success" >View</button>
                    <button className="btn btn-sm btn-warning" onClick={() => {navigate("/user/edit/" + user.id);}}>Edit</button>
                    <button className="btn btn-sm btn-danger" >Delete</button>
                </div>
            </td>
        </tr>);
    });

    return (
        <div className="container mt-5">
            <NavigationBar />

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-success" onClick={() => {navigate("/user/add")}}>Add User</button>
            </div>

            <table className="table table-hover main_orange">
                <thead className="main_red">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Privilege</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                {user_components}
                </tbody>
            </table>


        </div>
    );

}