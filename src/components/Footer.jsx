import React from "react";
import { Row, Col } from "antd";
import { Typography } from "antd";

const Footer = () => {
  const date = new Date();
  const { Title } = Typography;
  return (
    <div>
      <Row style={{ backgroundColor: "black" }}>
        <Col span={8}>
          <Title style={{ color: "white" }} level={4}>
            Gamers Cave
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ color: "white" }} level={4}>
            API
          </Title>
        </Col>
        <Col span={8}>
          <Title style={{ color: "white" }} level={4}>
            @{date.getFullYear()}. All Rights Reserved
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
