import {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";


export default function(){

    const [departments, setDepartments] = useState([]);
    const [user, setUser] = useState({});
    const [inputs, setInputs] = useState({
        first: "",
        last: "",
        middle: "",
        role: "",
        email: "",
        department: "",
        old_pass: "",
        new_pass: "",
        conf_pass: ""
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        let getDepartments = async () => {
            try{

                let response = await api.get("/api/departments");
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setDepartments(response.data.data);

                // let inpt = inputs;
                // inpt.department = response.data.data[0].name;
                // setInputs(inpt);

            }catch(error){
                console.log(error.message);
            }
        }

        let getUser = async () => {
            try{

                let data = new FormData();
                data.append("id", params.user_id);
                let response = await api.post("/api/user/view", data);
                if(response.data.header.error){
                    console.log(response.data.header.message);
                    return;
                }

                setUser(response.data.data);

                setInputs({
                    first: response.data.data.first,
                    last: response.data.data.last,
                    middle: response.data.data.middle,
                    role: response.data.data.role,
                    email: response.data.data.email,
                    department: response.data.data.department,
                    old_pass: "",
                    new_pass: "",
                    conf_pass: ""
                })

            }catch(error){
                console.log(error.message);
            }
        };

        getUser();
        getDepartments();

    }, []);

    let firstOnChange = async (event) => {

        let inp = inputs;
        inp.first = event.target.value;
        setInputs(inp);

    };

    let middleOnChange = async (event) => {

        let inp = inputs;
        inp.middle = event.target.value;
        setInputs(inp);

    };

    let lastOnChange = async (event) => {

        let inp = inputs;
        inp.last = event.target.value;
        setInputs(inp);

    };

    let roleOnChange = async (event) => {

        let inp = inputs;
        inp.role = event.target.value;
        setInputs(inp);

    };

    let departmentOnChange = async (event) => {

        let inp = inputs;
        inp.department = event.target.value;
        setInputs(inp);

    };

    let emailOnChange = async (event) => {

        let inp = inputs;
        inp.email = event.target.value;
        setInputs(inp);

    };

    let editUser = async (event) => {

        event.preventDefault();

        try{

            let data = new FormData();
            data.append("user_id", params.user_id);
            data.append("first", inputs.first);
            data.append("middle", inputs.middle);
            data.append("last", inputs.last);
            data.append("email", inputs.email);
            data.append("role", inputs.role);
            data.append("department", inputs.department);
            let response = await api.post("/api/users/edit", data);

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

    let changePassword = async (event) => {

        event.preventDefault();

        try{

            let data = new FormData();
            data.append("user_id", params.user_id);
            data.append("old_pass", inputs.old_pass);
            data.append("new_pass", inputs.new_pass);
            data.append("conf_pass", inputs.conf_pass);
            let response = await api.post("/api/users/change_password", data);

            if(response.data.header.error === "true"){
                console.log(response.data.header.message);
                return;
            }

            navigate("/users");
            event.target.reset();

        }catch(error){
            console.log(error.message);
        }

    };

    let department_option = departments.map(category => {
        return (<option className="main_orange" value={category.name}>{category.name}</option>);
    });

    return (
        <div className="container mt-5">

            <NavigationBar/>

            <div className="mb-3 p-3 rounded main_orange">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item main_orange"><b>Name: </b> {user.first + " " + user.middle + " " + user.last}</li>
                    <li className="list-group-item main_orange"><b>E-main: </b> {user.email}</li>
                    <li className="list-group-item main_orange"><b>Department: </b> {user.department}</li>
                    <li className="list-group-item main_orange"><b>Role: </b> {user.role === "administrator" ? "Administrator" : "Ordinary User"}</li>
                </ul>
            </div>

            <div className="row mb-3">
                <div className="col-8">
                    <form onSubmit={editUser} className="rounded main_orange">
                        <div className="card-body">

                            <h5 className="card-title mb-5">Edit User</h5>

                            <div className="input-group mb-3">
                                <input type="text" onChange={firstOnChange} className="form-control main_orange" placeholder={user.first}/>
                                <input type="text" onChange={middleOnChange} className="form-control main_orange" placeholder={user.middle}/>
                                <input type="text" onChange={lastOnChange} className="form-control main_orange" placeholder={user.last}/>
                            </div>

                            <div className="input-group mb-3">
                                <select title="Department" onChange={departmentOnChange} className="form-control main_orange">
                                    {department_option}
                                </select>
                                <div className="input-group-append">
                                    <span className="input-group-text main_red">Department</span>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="email" className="form-control main_orange" onChange={emailOnChange} placeholder={user.email}/>
                                <div className="input-group-append">
                                    <span className="input-group-text main_red">Email</span>
                                </div>
                            </div>

                            <button className="btn btn-success btn-block" type={"submit"}>Change</button>

                        </div>
                    </form>
                </div>
                <div className="col">
                    <form onSubmit={changePassword} className="rounded main_orange">
                        <div className="card-body">

                            <h5 className="card-title mb-5">Change Password</h5>

                            <div className="input-group mb-3">
                                <input type="password" className="form-control main_orange" onChange={emailOnChange} placeholder="Old Password"/>
                                <div className="input-group-append">
                                    <span className="input-group-text main_red">Old Password</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control main_orange" onChange={emailOnChange} placeholder="New Password"/>
                                <div className="input-group-append">
                                    <span className="input-group-text main_red">New Password</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control main_orange" onChange={emailOnChange} placeholder="Confirm Password"/>
                                <div className="input-group-append">
                                    <span className="input-group-text main_red">Confirm Password</span>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div className="card mb-3 main_orange">
                <div className="card-body">

                    <h5 className="card-title mb-3">Change Privilege</h5>

                    <div className="input-group">
                        <select title="Privilege" onChange={roleOnChange} className="form-control main_orange">
                            <option value="administrator" className="main_orange">Administrator</option>
                            <option value="user" className="main_orange">Ordinary User</option>
                        </select>
                        <div className="input-group-append">
                            <span className="input-group-text main_red">Privilege</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}