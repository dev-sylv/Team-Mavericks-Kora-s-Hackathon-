import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Container>
        <LogoPart>
          <Logo>MAVERICKS</Logo>
          <Text>
            A Unique giftcard purchasing business perfectly built for you.
          </Text>
          <NavLink to="/get-started" style={{ textDecoration: "none" }}>
            <Button>Get Started</Button>
          </NavLink>
        </LogoPart>
        <Connect>
          <Heading>Company</Heading>
          <Trailing>About us</Trailing>
          <Trailing>Terms</Trailing>
          <Trailing>Privacy Policy</Trailing>
          <Trailing>AML Policy</Trailing>
          <Trailing>FAQs</Trailing>
        </Connect>
        <Company>
          <Heading>Connect with Us</Heading>
          <Trailing>Contact us</Trailing>
          <Trailing>Follow us on Instagram</Trailing>
        </Company>
      </Container>
    </div>
  );
};

export default Footer;

const Container = styled.div`
  font-size: 12px;
  @media screen and (min-width: 1000px) {
    font-size: 18px;
    width: 85%;
    padding: 50px;
    margin: auto;
    margin-bottom: 50px;
  }
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  background-color: #f2f2f2;
  color: #525151;
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
`;
const LogoPart = styled.div``;
const Company = styled.div``;
const Heading = styled.div`
  font-size: 14px;
  @media screen and (min-width: 1000px) {
    font-size: 18px;
  }
  font-weight: 600;
`;
const Trailing = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: blue;
  }
`;
const Connect = styled.div``;
const Logo = styled.div`
  font-weight: 600;
  color: #5352ec;
`;
const Text = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 70%;
  font-size: 15px;
  line-height: 1.2rem;
`;
const Button = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #9342f6;
  padding: 15px 40px;
  font-size: 16px;
  margin-top: 20px;
  border: none;
  outline: none;
  transition: all 350ms;
  :hover {
    cursor: pointer;
    background-color: #7f22f1;
  }
`;
