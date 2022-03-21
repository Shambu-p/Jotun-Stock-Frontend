import {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";


export default function(){

    const [device, setDevice] = useState({});
    const [categories, setCategories] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        type: "",
        amount: 0
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
                setInputs({
                    name: response.data.data.name,
                    amount: response.data.data.amount,
                    type: response.data.data.type
                });

            }catch(error){
                console.log(error.message);
            }
        }

        let getCategories = async () => {
            try{

                let response = await api.get("/api/categories");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setCategories(response.data.data);

                // let inpt = inputs;
                // inpt.type = response.data.data[0].name;
                // setInputs(inpt);

            }catch(error){
                console.log(error.message);
            }
        }

        getCategories();
        getDevice();
    }, [])

    let nameOnChange = async (event) => {

        let inp = inputs;
        inp.name = event.target.value;
        setInputs(inp);

    }

    let typeOnChange = async (event) => {

        let inp = inputs;
        inp.type = event.target.value;
        setInputs(inp);

    }

    let amountOnChange = async (event) => {

        let inp = inputs;
        inp.amount = event.target.value;
        setInputs(inp);

    }

    const editDevice = async (event) => {

        event.preventDefault();

        try{

            let data = new FormData();
            data.append("id", device.id);
            data.append("name", inputs.name);
            data.append("type", inputs.type);
            data.append("amount", inputs.amount);
            let response = await api.post("/api/devices/edit", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }

            navigate("/");
            event.target.reset();

        }catch(error){
            console.log(error.message);
        }

    };

    let category_option = categories.map(category => {
        return (<option value={category.name} className="main_orange">{category.name}</option>);
    });

    let main_component = !device.name ? (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">Loading...</h3>
            </div>
        </div>
    ) : (
        <form onSubmit={editDevice} style={{width: "50%"}} className="card main_orange">
            <div className="card-body">

                <div className="input-group mb-3">
                    <input type="text" onChange={nameOnChange} className="form-control main_orange" placeholder={device.name}/>
                    <div className="input-group-append">
                        <span className="input-group-text main_red">Name</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <select title="Category" onChange={typeOnChange} className="form-control main_orange">
                        {category_option}
                    </select>
                    <div className="input-group-append">
                        <span className="input-group-text main_red">Type</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <input type="number" className="form-control main_orange" placeholder={device.amount} onChange={amountOnChange} />
                    <div className="input-group-append">
                        <span className="input-group-text main_red">Amount</span>
                    </div>
                </div>

                <button className="btn btn-primary btn-block main_blue">Edit</button>

            </div>
        </form>
    );

    return (
        <div className="container mt-5">

            <NavigationBar/>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-sm btn-primary mr-2" onClick={() => {navigate("/device/view/" + params.device_id);}}>View</button>
                <button className="btn btn-sm btn-success mr-2" onClick={() => {navigate("/device/receive/" + params.device_id);}}>New Receive</button>
                <button className="btn btn-sm btn-danger mr-2" >Delete</button>
            </div>
            <div className="d-flex justify-content-center">
                {main_component}
            </div>

        </div>
    );
}