import { Col, Row, Container } from "react-bootstrap";
import * as ImCon from "react-icons/im";
import { Link } from "react-router-dom";
import { memo } from "react";
import React from "react";
import Api, { endpoints } from "../configs/Apis";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function PopRouter(props) {
  let path = `/Router/${props.id}/`;

  return (
    <Link to={path}>
      <Row
        style={{
          padding: "10px",
          boxShadow: "1px 1px 10px #a4a9ad",
          margin: "10px",
          height: "100%",
        }}
      >
        <Col xs={4}>
          <img
            className="d-block w-100"
            src="../../images/bus.jpg"
            alt="route"
            style={{ height: "50%" }}
          />
        </Col>
        <Col xs={8}>
          <p>{props.name}</p>
          <Row>
            <Col xs={4}>
              <ImCon.ImLocation />
              <p>250km</p>
            </Col>
            <Col xs={4}>
              <ImCon.ImClock />

              <Container>
                {props.date}
              </Container>
            </Col>
            <Col xs={4}>
              <ImCon.ImCreditCard />
              <p>{props.price}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Link>
  );
}

export default memo(PopRouter);
