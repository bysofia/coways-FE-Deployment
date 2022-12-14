import React, { useState } from "react";
import "../../style/beranda.css";
import icon from "../../Assets//logo/Icon.svg"
import logo from "../../Assets/img/Vector.svg";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../Config/Api";
import { Error, Success } from "../Support/toast";

const HomeRegister = () => {
let navigate = useNavigate();

const title = 'Register';
document.title = 'Co Ways | ' + title;

const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
   });

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
};
   
const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault();

        // Configuration Content-type
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Data body
        const body = JSON.stringify(form);

        // Insert data user to database
        const response = await API.post('/register', body, config);
        Success({ message: `Register Success, Please Login !` })
        navigate("/login")
        // Handling response here
    } catch (error) {
        Error({ message: `Register Failed !` })
    }
});
    
    return (
       <div className="body">
        <nav class="navbar justify-content-center">
            <div class="container-fluid" style={{marginLeft: "180px" }} >
                 <a class="navbar-brand" href="/home"><img src={icon} alt="..." /></a>
             </div>
        </nav>
            <div class="row justify-content-center">
                <div class="col-4">
                    <div style={{marginTop: "180px"}} >
                        <h1 style={{color: "#03F387"}}>Listening is</h1>
                        <p style={{color: "#03F387", fontSize: "50px"}}><img src={logo} width="80px" alt="..." />Everything</p>
                        <p style={{color: "white"}}>pay and access millions of songs</p>
                    </div>
                    <div>
                        <button style={{backgroundColor: "#03F387", color: "black"}} type="submit" class="btn btn-success" onClick={() => navigate("/login")}>Login</button>
                    </div>                   
                </div>
                 <div class="col-4">
                    <div style={{marginTop: "180px"}}>
                        <h1 style={{color: "#03F387"}}>Register</h1>
                    </div>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>                                      
                    <div class="mb-3">                        
                        <input name="email" type="email" class="form-control" id="email" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div class="mb-3">                        
                        <input name="password" type="password" class="form-control" id="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div class="mb-3">                        
                        <input name="name" type="text" class="form-control" id="fullName" placeholder="Full Name" onChange={handleChange} />
                    </div>
                    <div class="mb-3">                        
                        <button style={{backgroundColor: "#03F387"}} type="sumbit" class="form-control">
                            Register 
                        </button>                       
                    </div>
                    </form>
                </div>
            </div>
       </div>
    )
};

export default HomeRegister;

