import React, { useContext, useEffect, useState } from "react";
import '../../style/style.css';
import icon from "../../Assets/logo/Icon.svg";
import { Container, Dropdown } from "react-bootstrap";
import user from "../../Assets/img/Ellipse 1.svg";
import addMusic from "../../Assets/img/add-music.svg";
import addArtis from "../../Assets/img/add-artis.svg";
import logout from "../../Assets/img/logout 1.svg";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";
import Clip from "../../Assets/img/Clip.svg";
import { UserContext } from "../../Context/UserContext";
import { API } from "../../Config/Api";
import { useMutation } from "react-query";

export default function AddMusic () {
  const title = "Add Music";
  document.title = "Co Ways | " + title;

  const [state, dispatch] = useContext(UserContext);  
  
  const navigate = useNavigate();

  const [singer, setSinger] = useState([]);

  const getSingerID = async () => {
    try {
      const response = await API.get(`/singers`);
      setSinger(response.data.data);
    } catch (error) {      
    }
  };

  useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate("/")
    } else {
      getSingerID()
    }
  }, []);

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    year: "",
    singer_id: "",
    music_file: "" ,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    })
  };  

  const Logout = () => {    
    dispatch({
        type: "LOGOUT"
    })
    navigate("/")
};

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("singer_id", form.singer_id);
      formData.set("music_file", form.music_file[0], form.music_file[0].name);      

      const response = await API.post("/music", formData);

      alert("Music berhasil di tambahkan");      
    } catch (error) {      
    }
  });

    return (
        <div>
            <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid" style={{marginLeft: "100px" }} >
                     <a class="navbar-brand" href="/Home"><img src={icon} alt="..." /></a>
                     <Dropdown>
                     <DropdownToggle variant="bg-dark" id="dropdown-basic"><img src={user} alt="..."></img></DropdownToggle>
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
        <div className="d-flex flex-column justify-content-center add">
          <p>Add Music</p>          
          <form className="form-section" onSubmit={(e) => handleSubmit.mutate(e)} >
            <div className="d-flex align-items-center">
              <input
                className="form-add-1"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                type="file"
                name="thumbnail"
                className="customFile"
                id="thumbnail"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="upload" className="customFile ps-4" for="thumbnail">
                Attach Thumbnail
                <span>
                  <img src={Clip} className="me-2" alt="attach"/>
                </span>
              </label>
            </div>
            <input
              className="form-add"
              type="number"
              name="year"
              onChange={handleChange}
              placeholder="Year"
            />
          
            <select
              onChange={handleChange}
              className="form-select form-select-lg mb-3"
              aria-label="form-select-lg" name="singer_id"
              >
              <option selected>Singer</option>
              { singer.map((data) => (
              <option name="singer_id" key={data.id} value={data.id}>{data.name}</option>
              ))}
            </select>

            <div className="d-flex align-items-center">
              <input
                type="file"
                name="music_file"
                className="file_mp3"
                id="music_file"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="upload" className="file_mp3" for="music_file">
                Attache
              </label>
            </div>
            <div className="d-grid justify-content-center">
              <button type="submit" className="btn-add">Add Music</button>
            </div>
          </form>
        </div>
      </Container>        
        </div>
    )
}