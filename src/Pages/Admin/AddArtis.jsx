import React, { useContext, useState } from "react";
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
import { useMutation } from "react-query";
import { API } from "../../Config/Api";
import { UserContext } from "../../Context/UserContext";

export default function AddArtis () {
    const title = 'Add Artis';
    document.title = 'Co Ways | ' + title;

    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const checkAuth = () => {
        if (state.isLogin === "false") {
          navigate("/")
        } else if (state.isLogin === "costumer") {
          navigate("/home")
        }
      }

      checkAuth();
   
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        name: "",
        old: "",
        category: "",
        start_career: "",
        thumbnail: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
          const url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
    
            const formData = new FormData()
            formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
            formData.set("name", form.name);
            formData.set("old", form.old);
            formData.set("category", form.category);       
            formData.set("start_career", form.start_career);            
            
            const response = await API.post("/singer", formData);

      alert("Data artist berhasil di tambahkan")      
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
          <p>Add Artist</p>
          <div className="d-flex justify-content-end me-5 mb-3 pe-3">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
          </div>
          <form
            className="form-section"
            onSubmit={(e) => handleSubmit.mutate(e)}
          >
            <div className="d-flex align-items-center">
              <input
                className="form-add-1"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Artist"
                required
              />
              <input
                type="file"
                name="thumbnail"
                className="customFile"
                id="thumbnail"
                onChange={handleChange}
                hidden
                required
              />
              <label
                htmlFor="upload"
                className="customFile ps-4"
                for="thumbnail"
              >
                Attach Thumbnail
                <span>
                  <img src={Clip} className="me-2" alt="attach" />
                </span>
              </label>
            </div>

            <input
              className="form-add"
              type="number"
              name="old"
              onChange={handleChange}
              placeholder="Old"
              required
            />

            <input
              className="form-add"
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Solo"
              required
            />

            <input
              className="form-add"
              type="number"
              name="start_career"
              onChange={handleChange}
              placeholder="Start a Career"
              required
            />

            <div className="d-grid justify-content-center">
              <button className="btn-add">Add Artist</button>
            </div>
          </form>
        </div>
      </Container>        
        </div>
    )
}