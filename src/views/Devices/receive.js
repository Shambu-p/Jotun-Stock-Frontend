import {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";


export default function(){

    const [device, setDevice] = useState({});
    const [inputs, setInputs] = useState({

    });
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

    let amountOnChange = async (event) => {

        let inp = inputs;
        inp.amount = event.target.value;
        setInputs(inp);

    }

    const receiveDevice = async (event) => {

        event.preventDefault();

        try{

            let data = new FormData();
            data.append("device", device.id);
            data.append("amount", inputs.amount);
            let response = await api.post("/api/receive/new", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }

            navigate("/device/view/" + device.id);
            event.target.reset();

        }catch(error){
            console.log(error.message);
        }

    };

    return (
        <div className="container mt-5">

            <NavigationBar/>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-primary mr-2" onClick={() => {navigate("/device/view/" + params.device_id);}}>view</button>
                <button className="btn btn-sm btn-warning mr-2" onClick={() => {navigate("/device/edit/" + params.device_id);}}>Edit</button>
                <button className="btn btn-sm btn-danger mr-2" >Delete</button>
            </div>
            <div className="d-flex justify-content-center">
                <form onSubmit={receiveDevice} className="mb-3 p-3 rounded main_orange col-8">
                    <h5 className="card-title">{device.name}</h5>
                    <h6 className="card-subtitle mb-3">{device.type}</h6>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control main_orange" onChange={amountOnChange} placeholder="Amount Received"/>
                        <div className="input-group-append">
                            <span className="input-group-text main_red">Amount</span>
                        </div>
                    </div>
                    <button className="btn btn-bock btn-success">Receive</button>
                </form>
            </div>
        </div>
    );
}