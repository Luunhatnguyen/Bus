import { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Api, { endpoints } from "../configs/Apis";
import PopRouter from "../components/PopRouterLam";
import React from 'react';
import { display } from "@mui/system";

function Home() {
  
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();
  const [listRoute, setListRoute] = useState([]);
  const [city, setCity] = useState([]);
  const nav = useNavigate();
  const [sDate, setSDate] = useState([]);
  
  useEffect(() => {
    let loadListRoute = async () => {
      let router = await Api.get(endpoints["router"]);
      setListRoute(router.data);

      let cities = await Api.get(endpoints["city"]);
      setCity(cities.data);
      
    };

    loadListRoute();
  }, []);

  
  const search = (event) => {
    event.preventDefault();
    if (sDate != "") {
      nav(`/Router/?search=${fromGarage}to${toGarage}ngày${sDate}`);
    } else {
      nav(`/Router/?search=${fromGarage}to${toGarage}`);
    }
  };



  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        padding: "50px",
      }}
    >
      <Form
        onSubmit={search}
        style={{
          backgroundColor: "white",
          boxShadow: "1px 1px 10px #a4a9ad",
          width: "70%",
          margin: "40px auto",
          position: "relative",
          height: "165px",
        }}
      >
        <Row
          style={{ margin: "20px 20px", position: "relative", height: "20vh" }}
        >
          <Col
            xs="6"
            style={{
              padding: "10px",
              position: "absolute",
              left: "0",
              boxShadow: "1px 1px 10px #a4a9ad",
              height:"90px"
            }}
          >
            <Row>
              <Col xs="6">
                <Form.Group>
                  <Form.Label>Chọn điểm bắt đầu</Form.Label>
                  <Form.Select 
                    value={fromGarage}
                    onChange={(e) => setFromGarage(e.target.value)}
                  >
                    <option value="0" selected="selected">
                      Chọn điểm bắt đầu
                    </option>
                    {city.map((c) => {
                      return <option value={c.name}>{c.name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs="6">
                <Form.Group>
                  <Form.Label>Chọn điểm đến</Form.Label>
                  <Form.Select 
                    value={toGarage}
                    onChange={(e) => setToGarage(e.target.value)}
                  >
                    <option value="0" selected="selected">
                      Chọn điểm đến
                    </option>

                    {city.map((c) => {
                      return <option value={c.name}>{c.name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col
            xs="5"
            style={{
              padding: "10px",
              position: "absolute",
              right: "0",
              marginLeft: "5px",
              boxShadow: "1px 1px 10px #a4a9ad",
              height:"90px"
            }}
          >
            <Row>
              <Col xs="6">
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Chọn ngày đi</Form.Label>
                  <Form.Control
                    type="date"
                    value={sDate}
                    onChange={(e) => setSDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button
          type="submit"
          style={{
            bottom: "-20px",
            position: "absolute",
            right: "40px",
            padding: "10px 20px",
            width: "120px",
            backgroundImage:
              "linear-gradient(to right, rgb(119, 161, 211) 0%, rgb(121, 203, 202) 51%, rgb(119, 161, 211) 100%)",
          }}
        >
          Tìm kiếm
        </Button>
      </Form>
      
      <h1 style={{ width: "70%", margin: "30px auto" }}>
        Tuyến đường phổ biến
      </h1>
      <Row style={{ width: "70%", margin: "auto" }}>
        {listRoute.map((c) => {
          return (
            <Col xs={6} style={{ height: "125px", marginBottom: "15px" }}>
              <PopRouter
                name={`${c.city_from.name} - ${c.to_garage.name}`}
                id={c.id}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
export default Home;
