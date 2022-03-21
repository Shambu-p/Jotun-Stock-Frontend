import {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";


export default function(){

    const [device, setDevice] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let getDevice = async () => {
            try{

                let data = new FormData();
                data.append("id", params.device_id);
                let response = await api.post("/api/device", data);
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setDevice(response.data.data);

            }catch(error){
                console.log(error.message);
            }
        }

        getDevice();

    }, [])

    // const editDevice = async (event) => {
    //
    //     event.preventDefault();
    //
    //     try{
    //
    //         let data = new FormData();
    //         data.append("id", device.id);
    //         data.append("name", inputs.name);
    //         data.append("type", inputs.type);
    //         data.append("amount", inputs.amount);
    //         let response = await api.post("/api/devices/edit", data);
    //
    //         if(response.data.header.error === "true"){
    //             console.log(response.data.header.message);
    //             return;
    //         }
    //
    //         navigate("/");
    //         event.target.reset();
    //
    //     }catch(error){
    //         console.log(error.message);
    //     }
    //
    // };

    return (
        <div className="container mt-5">

            <NavigationBar/>
            <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-success mr-2" onClick={() => {navigate("/device/receive/" + device.id);}}>New Receive</button>
                <button className="btn btn-sm btn-warning mr-2" onClick={() => {navigate("/device/edit/" + device.id);}}>Edit</button>
                <button className="btn btn-sm btn-danger mr-2" >Delete</button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 p-3 rounded main_orange">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item main_orange"><b>Name: </b> {device.name}</li>
                        <li className="list-group-item main_orange"><b>Device Type: </b> {device.type}</li>
                        <li className="list-group-item main_orange"><b>Available Amount: </b> {device.amount}</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}