import {useEffect, useState} from "react";
import api from "../../api";
import {set} from "../../cookies";
import NavigationBar from "../../components/NavigationBar";
import {useNavigate} from "react-router-dom";


export default function(){

    const [receives, setReceives] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        let getReceives = async () => {
            try{

                let response = await api.get("/api/receives");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setReceives(response.data.data);

            }catch(error){
                console.log(error.message);
            }
        }

        getReceives();

    }, []);


    /*
    <td>{receive.role === "administrator" ? "Administrator" : "Ordinary User"}</td>
            <td>
                <div className="btn-group">
                    <button className="btn btn-sm btn-success" >View</button>
                    <button className="btn btn-sm btn-warning" onClick={() => {navigate("/user/edit/" + receive.id);}}>Edit</button>
                    <button className="btn btn-sm btn-danger" >Delete</button>
                </div>
            </td>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-success" onClick={() => {navigate("/user/add")}}>Add User</button>
            </div>
     */

    let receive_components = receives.map(receive => {
        return (<tr key={receive.id}>
            <td>{receive.device_name}</td>
            <td>{receive.device_type}</td>
            <td>{receive.Receive_amount}</td>
            <td>{new Date(parseInt(receive.Receive_date) * 1000).toUTCString()}</td>
        </tr>);
    });

    return (
        <div className="container mt-5">
            <NavigationBar />

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary btn-sm ml-2">Receives</button>
                <button className="btn btn-primary btn-sm ml-2">Usage</button>
                <button className="btn btn-primary btn-sm ml-2">Borrow</button>
            </div>

            <table className="table table-hover main_orange">
                <thead className="main_red">
                <tr>
                    <th scope="col">Device</th>
                    <th scope="col">Device Type</th>
                    <th scope="col">Received Amount</th>
                    <th scope="col">Received Date</th>
                </tr>
                </thead>
                <tbody>
                {receive_components}
                </tbody>
            </table>


        </div>
    );

}