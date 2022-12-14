import React, { useEffect, useState } from "react";
import { Container, Card, Form, Dropdown, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import icon from "../Assets/logo/Icon.svg";
import user from "../Assets/img/Ellipse 1.svg";
import bill from "../Assets/img/bill 1.svg";
import logout from "../Assets/img/logout 1.svg";
import Clip from "../Assets/img/Clip.svg";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { API } from "../Config/Api";
import { useMutation } from "react-query";

export default function Pay () {
  const title = 'Add Pay';
  document.title = 'Co Ways | ' + title;

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [trans] = useState([])
  const id = state.user.id
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    const getTransaction = async (e) => {
      const response = await API.get("/transaction-id")
      setTransaction(response.data.data);
    };
    getTransaction();
  }, []);


  const checkAuth = () => {
    if (state.isLogin === "false") {
      navigate("/")
    } else if (state.isLogin == "user") {
      navigate("/home")
    }
  }

  checkAuth();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-4vZOaNa01asv4lzL";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
 }, [])

  const getTransaction =  async () => {
    try {
      //get all transactions
      const response = await API.get("/transactions")
      const respID = response?.data.data.filter((item) => item.user.id === id) 
      
    } catch (error) {      
    }
  }

  useEffect(() => {
    getTransaction()
  }, [state])

    const [form, setForm] = useState({
        account_number: "",
        proof_transfer: "",        
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });        
    };

    const handleSubmit = useMutation(async (e) => {
      try {
          e.preventDefault()
  
          const formData = new FormData()
          formData.set("proof_transfer", form.proof_transfer[0], form.proof_transfer[0].name);
          formData.set("account_number", form.account_number);         
          
          const response = await API.post("/create-transaction", formData);
          const token = response.data.data.token

          window.snap.pay(token, {
            onSuccess: function (result) {
              /* You may add your own implementation here */              
              navigate("/home");
            },
            onPending: function (result) {
              /* You may add your own implementation here */              
               navigate("/home");
            },
            onError: function (result) {
              /* You may add your own implementation here */
              navigate("/404")              
            },
            onClose: function () {
              /* You may add your own implementation here */
              alert("you closed the popup without finishing the payment");
            },
          });

    alert("Informasi Pembayarn berhasil di kirim")    
  } catch (error) {    
  }
}); 

const Logout = () => {  
  dispatch({
      type: "LOGOUT"
  })
  navigate("/")
};

    return (        
            <div>
                <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid" style={{marginLeft: "100px" }} >
                     <a class="navbar-brand" href="/Home"><img src={icon} alt="..." /></a>
                     <Dropdown>
                     <DropdownToggle variant="bg-dark" id="dropdown-basic"><img src={user} alt="..." ></img></DropdownToggle>
                     <DropdownMenu variant="dark">
                        <DropdownItem><img src={bill} alt="..." width="30" onClick={() => navigate("/pay")}/> Pay</DropdownItem>
                        <Dropdown.Divider />
                        <DropdownItem><img src={logout} alt="..." onClick={Logout} /> Log Out</DropdownItem>
                     </DropdownMenu>
                     </Dropdown>
                </div>
            </nav>
            </div>
            <Container className="col-md-9 mx-auto" style={{marginTop: "50px"}}>
            {transaction == undefined ? (
                <Card style={{ width: '60rem' }} className="text-center">                    
                        <Card.Body>
                            <Card.Title style={{ color: "#03F387", fontSize: "50px" }} >Premium</Card.Title>                        
                            <Card.Text style={{ color: "white", fontSize: "15px" , marginTop: "30px", marginBottom: "30px" }} >
                            <p>Bayar sekarang dan nikmati streaming music yang kekinian dari <a style={{fontWeight: "bold"}}>Co</a><a style={{color: "#03F387"}} > Ways</a></p>
                            <p style={{fontWeight: "bold"}}><a>Co</a><a style={{color: "#03F387"}} > Ways</a> : 0981312323</p>
                            </Card.Text>
                    <center>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className="mb-3 border border-light border-3 border-opacity-25%" controlId="formBasicPassword" style={{width: "50%", borderRadius: "5px"}} >                        
                        <Form.Control name="account_number" onChange={handleChange} type="number" placeholder="Input your account number" style={{backgroundColor: "black", color: "#03F387" }} />
                    </Form.Group>
                    <div className='rounded px-3 cursor-pointer border border-light border-3 border-opacity-50%' style={{width:"50%", backgroundColor: "black"}}>
                    <Form.Label className='d-flex pt-2 cursor-pointer' for="file"><p className='mt-1 me-auto' style={{color: "#03F387"}}>Attach Proof of Transfer</p><img style={{height: "25px"}} src={Clip} alt="clip" />
                        <Form.Control name="proof_transfer" className='cursor-pointer' id='file' style={{width:"20%", opacity: "100%"}} type="file" placeholder="proof_transfer" hidden onChange={handleChange}/>
                    </Form.Label>
                    </div>
                    <Button type="submit" style={{width: "50%", marginTop: "20px", color: "black", fontWeight: "bold" , backgroundColor: "#03F387"}}>Send</Button>
                    </Form>
                    </center>                    
                    </Card.Body>
                </Card>
                ) : (
                <div style={{textAlign: "center"}} >
                  {" "}
                  <h1 style={{color: "#03F387"}}>Selamat Akun Kamu sudah PREMIUM !</h1>
                  <br />
                  <br />
                  <p style={{color: "white"}}>
                    Nikmati streaming music yang kekinian dari {" "}
                  <b className='text-main'>CO</b>{" "}
                  <b style={{color: "#03F387"}}>WAYS</b>
                 </p>
                 <p style={{color: "white", textAlign: "center"}}>
                    Sisa waktu <b className='text-main'>{transaction.remaining_active} Hari</b>
                </p>
              </div>
                )}
          </Container>
        </div>
       
    )
}