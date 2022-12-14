import React, { useContext, useState } from "react";
import "../../style/beranda.css";
import icon from "../../Assets//logo/Icon.svg"
import logo from "../../Assets/img/Vector.svg";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { UserContext } from "../../Context/UserContext";
import { API } from "../../Config/Api";

const HomeLogin = ({setIsLogin, setUserRole,}) => {
    let navigate = useNavigate();

    const title = 'Login';
    document.title = 'Co Ways | ' + title;

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState();
    const [form, setForm] = useState({
        email: "",
        password: "",        
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            
            const response = await API.post('/login', form);
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data
                });

                if (response.data.data.status === "admin") {
                    navigate("/trans")
                } else {
                    navigate("/home")
                }
            }
        } catch (error) {
            const alert = (<Alert variant="danger" className="py-1">Failed !</Alert>)
            setMessage(alert)            
        }
    });
       

    return (
       <div className="body">
        <nav class="navbar justify-content-center">
            <div class="container-fluid" style={{marginLeft: "180px" }} >
                 <a class="navbar-brand" href="/home"><img src={icon} alt="..."/></a>
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
                        <button style={{backgroundColor: "#03F387", color: "black"}} type="submit" class="btn btn-success" onClick={() => navigate("/")}>Register</button>
                    </div>                   
                </div>
                 <div class="col-4">
                    <div style={{marginTop: "180px"}}>
                        <h1 style={{color: "#03F387"}}>Login</h1>
                    </div>
                    {message && message}
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div class="mb-3">                        
                        <input name="email" type="email" class="form-control" id="email" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div class="mb-3">                        
                        <input name="password" type="password" class="form-control" id="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div class="mb-3">                        
                        <button type="submit" class="form-control" style={{backgroundColor: "#03F387" }} >                        
                            Login                             
                        </button>                       
                    </div>                    
                    </form>
                </div>
            </div>
       </div>
    )
};

export default HomeLogin;

