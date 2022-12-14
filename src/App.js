import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomeRegister from './components/Auth/HomeRegister';
import HomeLogin from "./components/Auth/HomeLogin";
import Home from "./Pages/Home";
import Pay from "./Pages/Pay";
import AddMusic from "./Pages/Admin/AddMusic";
import AddArtis from "./Pages/Admin/AddArtis";
import IncomeTransactions from "./Pages/Admin/IncomeTransaction";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import { API, setAuthToken } from "./Config/Api";
import { QueryClient, QueryClientProvider } from "react-query";
import PageNotFound from "./Pages/404";

function App() {   
  const [state, dispatch] = useContext(UserContext);  

  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" />
  };

  const AdminRoute = () => {
    const status = state.user.status;
    return status === "admin" ? <Outlet /> : <Navigate to="/trans" />;
  };  

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth")    

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {      
    };
  };

  useEffect(() => {
    checkUser();
  }, []); 

  const client = new QueryClient();

  return (
    <>
    <QueryClientProvider client={client}>
     <Routes>        
        <Route path="/" element={<HomeRegister />} />
        <Route path="/login" element={<HomeLogin />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/" element={<PrivateRoute />} > 
        <Route path="/home" element={<Home />} />         
        <Route path="/pay" element={<Pay />} /> 
        </Route>
        <Route path="/" element={<AdminRoute />} >        
        <Route path="/add-music" element={<AddMusic />} />
        <Route path="/add-artis" element={<AddArtis />} />         
        <Route path="/trans" element={<IncomeTransactions />} /> 
        </Route>
        <Route path="*" element={<Navigate to="/" />} />         
      </Routes>
      </QueryClientProvider>      
    </>
  );
}

export default App;
