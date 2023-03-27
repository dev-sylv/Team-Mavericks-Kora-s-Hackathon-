import React from "react";
import styled from "styled-components";
import rstar from "../../../Assets/stars.svg";
import lstar from "../../../Assets/stars.svg";
import phone from "../../../Assets/phone.png";
import flower from "../../../Assets/flower.svg";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { TbSquareKey } from "react-icons/tb";
import Typewriter from "typewriter-effect";

const Register = () => {
  return (
    <div>
      {" "}
      <Container>
        <Left>
          <img
            src={rstar}
            alt=""
            style={{ position: "absolute", left: "75%", top: "20%" }}
          />
          <img
            src={lstar}
            alt=""
            style={{
              position: "absolute",
              top: "20%",
              left: "35px",
              height: "360px",
            }}
          />
          <h4>MAVERICK</h4>
          <H1>
            <Typewriter
              options={{
                loop: true,
              }}
              onInit={(typewriter: any) => {
                typewriter
                  .typeString("Let's get..")
                  .pauseFor(1000)
                  .deleteAll()
                  .start()

                  .typeString("You started")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
            />
          </H1>
          <p>
            You’re a few steps away. Fill the required form and start trading
            like a boss 😎
          </p>
          <Img src={phone} alt="" />
          <img
            src={flower}
            alt=""
            style={{ position: "absolute", bottom: "1%", left: "1px" }}
          />
        </Left>
      </Container>
    </div>
  );
};

export default Register;

const H1 = styled.h1`
  color: white;
  font-size: 44px;
  text-align: center;
  margin-top: 50px;
  animation: typing 4s steps(20);
  white-space: nowrap;
  overflow: hidden;
  /* border-right: 3px solid black; */

  @media screen and (max-width: 960px) {
    font-size: 30px;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const Img = styled.img`
  height: 230px;
  margin-top: 25px;
  transform: translate(-20%, -20%);
  transition: transform 0.3s ease-in-out;
  position: absolute;
  left: 35%;
  bottom: 1px;

  @media screen and (max-width: 960px) {
    position: static;
    height: 210px;
    margin-top: 60px;
    margin-left: 120px;
  }

  :hover {
    animation: bounce 0.5s;
  }
  @keyframes bounce {
    0%,
    100% {
      transform: translate(-20%, -20%) scale(1);
    }
    50% {
      transform: translate(-20%, -20%) scale(1.2);
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  @media screen and (max-width: 960px) {
    display: block;
  }
`;
const Left = styled.div`
  width: 40%;
  height: 100vh;
  background-color: #8246f3;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
  h4 {
    color: white;
    font-size: 21px;
    font-family: Inria serif;
    font-weight: 600;
    margin-top: 30px;
  }

  // h1 {
  // //   color: white;
  // //   font-size: 44px;
  // //   text-align: center;
  // //   margin-top: 50px;

  // //   @media screen and (max-width: 960px) {
  // //     font-size: 30px;
  // //   }
  // }
  p {
    color: white;
    margin: 0;
    margin-top: 10px;
    text-align: center;
    width: 65%;
    font-size: 23px;

    @media screen and (max-width: 960px) {
      font-size: 18px;
    }
  }
`;
