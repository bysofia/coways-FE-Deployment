import { Dropdown, Carousel, Container, Card} from "react-bootstrap";
import icon from "../Assets/logo/Icon.svg";
import user from "../Assets/img/Ellipse 1.svg";
import bill from "../Assets/img/bill 1.svg";
import logout from "../Assets/img/logout 1.svg";
import CarouselSection from "../components/Carousel/Carousel";
import "../style/beranda.moduls.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { API } from "../Config/Api";
import { useEffect } from "react";
import Audio from "../components/Modal/Audio";
import { useQuery } from "react-query";

export default function Home() {
  const title = "Co Ways Everywhere";
  document.title = "Co Ways | " + title;

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  
 let { data: musics, refetch } = useQuery("musicCache", async () => {
  const response = await API.get("/musics")
  return response.data.data
 })

 const [audioShow, setAudioShow] = useState(false);
 const handleClose = () => setAudioShow(false);
 const handleShow = () => setAudioShow(true);
 const [dataAudio, setDataAudio] = useState();
 const [transaction, setTransaction] = useState();

 const handleMusicDetail = (data) => {
  setDataAudio(data)
  handleShow()
 }

 useEffect(() => {  
  if (state.user.status == "customer") {
    const getTransaction = async (e) => {
      const response = await API.get("/transaction-id");
      setTransaction(response.data.data);
    };
    getTransaction();
  }
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
                <div class="container" style={{marginLeft: "100px" }} >
                     <a class="navbar-brand" href="/Home"><img src={icon} alt="..." /></a>
                     <Dropdown>
                     <DropdownToggle variant="bg-dark" id="dropdown-basic"><img src={user} alt="..." ></img></DropdownToggle>
                     <DropdownMenu variant="dark">
                        <DropdownItem>
                          <img src={bill} alt="..." width="30" onClick={() => navigate("/pay")}/> Pay</DropdownItem>
                        <Dropdown.Divider />
                        <DropdownItem><img src={logout} alt="..." onClick={Logout}/> Log Out</DropdownItem>
                     </DropdownMenu>
                     </Dropdown>
                </div>
            </nav>
            </div>   
   <CarouselSection />
    <Container>
    <div className="d-flex">
        <div class="row row-cols-4 gap-3 justify-content-center">
        {musics?.map((music) => (
          <Card 
          style={{ width: "12rem" }} 
          className="mt-5 card-mp3"           
          onClick={transaction == undefined ? () => navigate("/pay") : () => {handleShow(true); handleMusicDetail(music)}}                        
          >
            <Card.Img
              variant="top"
              src={music.thumbnail}
              className="pt-1"
            />
            <Card.Body>
              <Card.Title className="text-white d-flex justify-content-between">
                <p>{music.title}</p>
                <p className="fs-6">{music.year}</p>
              </Card.Title>
              <Card.Text>
                <p className="title-mp3">{music.singer.name}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}        
        <Audio show={audioShow} onHide={handleClose} dataAudio={dataAudio} />        
        </div>
       </div> 
      <div>
     </div>                        
     </Container>         
    </div>
  );
};
