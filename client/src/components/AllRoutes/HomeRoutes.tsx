import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import SelectAccount from "../Auth/SelectAccount";
import Homescreen from "../LandingPage/HomeScreen";
// import BizzLogin from "../Auth/Business.Login";
// import BizzSignUp from "../Auth/Business.Register";
// import Login from "../Auth/Login";
// import Register from "../Auth/Register";
// import { useAppSelector } from "../Global/Store";

const HomeRoute = () => {
  //   const user = useAppSelector((state) => state.bizClient);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (user?.status === "Business") {
  //       navigate("/business/dashboard", { replace: true });
  //     } else if (user?.status === "User") {
  //       navigate("/user/dashboard", { replace: true });
  //     }
  //   }, []);

  const elements = useRoutes([
    {
      path: "/",
      element: <Homescreen />,
    },
    {
      path: "/get-started",
      element: <SelectAccount />,
    },
    {
      path: "/login",
      //   element: <Login />,
    },
    {
      path: "/business/register",
      //   element: <BizzSignUp />,
    },
    {
      path: "/business/login",
      //   element: <BizzLogin />,
    },
    {
      path: "/register",
      //   element: <Register />,
    },
  ]);
  return <div>{elements}</div>;
};

export default HomeRoute;
