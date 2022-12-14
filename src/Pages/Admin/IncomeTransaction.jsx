import React, { useEffect, useState } from "react";
import { Container, Table, Dropdown  } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";
import icon from "../../Assets/logo/Icon.svg";
import user from "../../Assets/img/Ellipse 1.svg";
import addMusic from "../../Assets/img/add-music.svg";
import addArtis from "../../Assets/img/add-artis.svg";
import logout from "../../Assets/img/logout 1.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { API } from "../../Config/Api";

export default function IncomeTransaction() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [income, setIncome] = useState();

  useEffect(() => {
    const getIncom = async (e) => {
      const response = await API.get("/transactions");
      setIncome(response.data.data);
    };
    getIncom(); 
  }, []);

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
                        <DropdownItem><img src={addMusic} width="30" alt="addmusic" onClick={() => navigate("/add-music")}/> Add Music</DropdownItem>{''}
                        <DropdownItem><img src={addArtis} width="29" alt="addartis" onClick={() => navigate("/add-artis")}/> Add Artis</DropdownItem>{''}
                        <Dropdown.Divider />
                        <DropdownItem><img src={logout} alt="..." onClick={Logout} />Log Out</DropdownItem>
                     </DropdownMenu>
                     </Dropdown>
                </div>
            </nav>
            </div>
      <Container>
      <h2 className="mt-5" style={{color: "white", fontSize: "20px"}}>Income Transaction</h2>
      <Table className="border border-2 my-5" bordered hover responsive>
        <thead style={{ backgroundColor: "black", color: "#03F387" }}>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Proof of Transfer</th>
            <th>Remaining Active</th>
            <th>Status User</th>            
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        {income?.map((item, index) => (
        <tbody key={item.id} style={{ backgroundColor: "black", color: "#03F387" }}>        
          <tr>
            <td>{index + 1}</td>
            <td>{item.user.name}</td>
            <td>{item.prrof_transfer}</td>
            <td>{item.remaining_active}</td>
            <td>{item.subscription}</td>
            <td>{item.status}</td>            
          </tr>       
        </tbody>
        ))}
      </Table>
    </Container>
    </div>
    )
}