import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Select, Input, Button, Row, Col } from "antd";
import "./Styles.css";
import { Typography } from "antd";

const { Option } = Select;

const Navbar = () => {
  const options = [
    { key: "1", name: "Action" },
    { key: "2", name: "Adventure" },
    { key: "3", name: "Role-playing" },
    { key: "4", name: "Simulation" },
    { key: "5", name: "Strategy" },
    { key: "6", name: "Sports" },
    { key: "7", name: "Puzzle" },
    { key: "8", name: "Shooter" },
    { key: "9", name: "Racing" },
    { key: "10", name: "Platformer" },
    { key: "11", name: "Fighting" },
    { key: "12", name: "Massively Multiplayer" },
    { key: "13", name: "Family" },
    { key: "14", name: "Educational" },
    { key: "15", name: "Indie" },
    { key: "16", name: "Arcade" },
    { key: "17", name: "Card" },
    { key: "18", name: "Casual" },
    { key: "19", name: "Music" },
  ];
  const handleOptionClick = (event) => {
    const { id } = event.target;
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="navbar">
      <Row>
        <Col span={10} style={{ display: "flex", justifyContent: "center" }}>
        <Select
      
      style={{ width: '90%' }}
      placeholder="Search to Select"
      >
      {options.map((option) => (
        <Option key={option.key} value={option.key}>
          
          <a
          onClick={handleOptionClick}
            id={option.name}
            style={{ display: 'block', marginBottom: '8px', fontSize: '16px', color: '#1890ff' }}
          >
            {option.name}
          </a>
        </Option>
      ))}
    </Select>
        </Col>
        <Col span={8}>
          <Typography.Title
            level={3}
            style={{
              color: "white",
              margin: "0",
              borderRadius: "10px",
              letterSpacing: "0.5rem",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            <Link style={{ color: "white" }} to="/">
              GAMERS CAVE
            </Link>
          </Typography.Title>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" style={{ width: "40%" }} type="primary">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="large" style={{ width: "40%", marginLeft: "10px" }}>
            <Link to="/register">Sign up</Link>
          </Button>
        </Col>
      </Row>
    </nav>
  );
};

export default Navbar;
