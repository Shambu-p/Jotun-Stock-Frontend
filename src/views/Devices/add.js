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

        let getCategories = async () => {
            try{

                let response = await api.get("/api/categories");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setCategories(response.data.data);

                let inpt = inputs;
                inpt.type = response.data.data[0].name;
                setInputs(inpt);

            }catch(error){
                console.log(error.message);
            }
        }

        getCategories();

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

    let addDevice = async (event) => {

        event.preventDefault();

        try{

            let data = new FormData();
            data.append("name", inputs.name);
            data.append("type", inputs.type);
            data.append("amount", inputs.amount);
            let response = await api.post("/api/devices/add", data);

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

    return (
        <div className="container mt-5">

            <NavigationBar/>
            <button className="btn btn-lg btn-primary btn-block mb-3" onClick={() => {navigate("/")}}>Back To Device</button>
            <div className="d-flex justify-content-center">
                <form onSubmit={addDevice} style={{width: "50%"}} className="card main_orange">
                    <div className="card-body">

                        <div className="input-group mb-3">
                            <input type="text" onChange={nameOnChange} className="form-control main_orange" placeholder="Name"/>
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
                            <input type="number" className="form-control main_orange" onChange={amountOnChange} placeholder="Amount"/>
                            <div className="input-group-append">
                                <span className="input-group-text main_red">Amount</span>
                            </div>
                        </div>

                        <button className="btn btn-success btn-block" type={"submit"}>Add Device</button>

                    </div>
                </form>
            </div>

        </div>
    );
}