import { Admin } from "./pages/admin/admin";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UpdateInformationForm } from "./pages/regis";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";
import Axios from "axios";
import { useEffect } from "react";
import { Login } from "./pages/login";
import { Absen } from "./pages/absen";
import { Footer } from "./components/footer";
import { AbsenReport } from "./pages/absenReport";
import { AdminAbsenHistory } from "./components/admin/adminAbsenHistory";
import { DailySalary } from "./pages/salaryReport";
import { AdminSalaryHistory } from "./components/admin/adminSalaryHistory";

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Footer/>, children:[
      {path: "",element:<Absen/>},
      {path: "absen",element:<AbsenReport/>},
      {path: "admin",element:<Admin/>},
      {path: "admin/absen",element:<AdminAbsenHistory/>},
      {path: "admin/salary",element:<AdminSalaryHistory/>},
      {path: "salary",element:<DailySalary/>},

    ]},
    {path: "/regis/:token", element: <UpdateInformationForm/>},
    {path: "/login", element: <Login/>}
  ])
  const token = localStorage.getItem("token"); 
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/users", {
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(setValue(response.data));
      console.log(response);
    } catch (error) {
      console.log(error);     
    }
  };
  useEffect(() => {
    token? keepLogin():console.log("login first");;
  },[]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
