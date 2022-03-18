import React, {useEffect, useState} from "react";
import api from "../../api";
import NavigationBar from "../../components/NavigationBar";


export default function (){

    const [departments, setDepartments] = useState([]);
    const [inputs, setInputs] = useState({
        name: ""
    });

    useEffect(function(){

        let getDepartments = async () => {
            try{

                let response = await api.get("/api/departments");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setDepartments(response.data.data);

            }catch(error){
                console.log(error.message);
            }
        };

        getDepartments();

    }, []);

    let nameOnChange = (event) => {

        let inp = inputs;
        inp.name = event.target.value;
        setInputs(inp);

    }

    const submitForm = async (event) => {
        event.preventDefault();

        try{

            let data = new FormData();
            data.append("name", inputs.name);
            let response = await api.post("/api/departments/add", data);

            if(response.data.header.error){
                console.log(response.data.header.message);
                return;
            }

            setDepartments([...departments, response.data.data]);
            event.target.reset();

        }catch(error){
            console.log(error.message);
        }

    };


    let comp = departments.map(department => {
        return <li className="list-group-item">{department.name}</li>
    });

    return (
        <div className="container mt-4">
            <NavigationBar/>
            <div className="p-2" >

                <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item active">Departments</li>
                            {comp}
                        </ul>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">

                        <form onSubmit={submitForm} className="input-group">
                            <input type="text" onChange={nameOnChange} className="form-control" placeholder="Department Name" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="submit">
                                    Add
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    );

}