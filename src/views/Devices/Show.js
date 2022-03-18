import {useEffect, useState} from "react";
import api from "../../api";
import {set} from "../../cookies";
import NavigationBar from "../../components/NavigationBar";
import {useNavigate} from "react-router-dom";


export default function(){

    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        let getDevices = async () => {
            try{

                let response = await api.get("/api/devices");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setDevices(response.data.data);

            }catch(error){
                console.log(error.message);
            }
        }

        getDevices();

    }, []);


    let device_components = devices.length == 0 ? (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Loading Devices ....</h5>
            </div>
        </div>
    ) : devices.map(device => {
        return (<div key={device.id} className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{device.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{device.type}</h6>
                <p>
                    Available: <b className="text-success">{device.amount}</b>
                </p>

                <button className="btn btn-sm btn-primary mr-2">Request</button>
                <button className="btn btn-sm btn-success mr-2" >View</button>
                <button className="btn btn-sm btn-warning mr-2" onClick={() => {navigate("/device/edit/" + device.id);}}>Edit</button>
                <button className="btn btn-sm btn-danger mr-2" >Delete</button>
            </div>
        </div>);
    });

    return (
        <div className="container mt-5">
            <NavigationBar />
            <div className="d-flex justify-content-center">
                <div className="col-10">
                    <button className="btn btn-lg btn-success btn-block mb-3" onClick={() => {navigate("/device/add")}}>Add Device</button>
                    {device_components}
                </div>
            </div>
        </div>
    );

}