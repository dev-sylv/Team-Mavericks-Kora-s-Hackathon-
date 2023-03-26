import React, { useEffect } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import BizzLogin from "../Auth/BusinessAuth/Business.Login";
import BizzSignUp from "../Auth/BusinessAuth/Business.Register";
import SelectAccount from "../Auth/SelectAccount";
import Login from "../Auth/UserAuth/User.Login";
import Register from "../Auth/UserAuth/User.Register";
import Homescreen from "../LandingPage/HomeScreen";
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
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "business",
      children: [
        {
          path: "register",
          element: <BizzSignUp />,
        },
        {
          path: "login",
          element: <BizzLogin />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
  return <div>{elements}</div>;
};

export default HomeRoute;
