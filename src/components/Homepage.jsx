import React from "react";
import { Row, Col, Divider } from "antd";
import game from "../assets/images/game.jpg";
import { Typography } from "antd";
import { Button, Flex } from "antd";
import Topcards from "./Topcards";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Row className="hero">
        <Col className="image-col" span={10}>
          <img
            src={game}
            className="game"
            style={{ width: "350px", height: "300px" }}
          />
        </Col>
        <Col className="content-col" span={14}>
          <Typography.Title style={{ color: "white" }} level={1}>
            Welcome to Gamers Cave
          </Typography.Title>
          <Typography.Title
            style={{ color: "white", margin: "0px 0px 30px 0px" }}
            level={3}
          >
            A go to place for all the aspiring gamers to get hold of valuble
            game information.
          </Typography.Title>
          <Row>
            <Col span={12}>
              <Flex gap={10}>
                <Button size="large" type="primary">
                  Api Documentation
                </Button>
                <Button size="large">GitHub</Button>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      {/* Top genre games cards */}
      <Topcards />
      <Divider />
      <Footer />
    </div>
  );
};

export default Homepage;
