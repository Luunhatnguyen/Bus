import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import Api, { endpoints } from "../configs/Apis";
// import "../static/Payment.css";
import { memo } from "react";
import Moment from "react-moment";
import React from "react";
function Payment(props) {
  const [seat, setSeat] = useState(props.seat);
  const [nameSeat, setNameSeat] = useState([]);
  const [nameGara, setNameGara] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const navigate = useNavigate();
  const { routerId } = useParams();
  useEffect(() => {
    let loadElement = async () => {
      let res = await Api.get(endpoints["garages-detail"](props.placeFrom));
      setNameGara(res.data);

      let ress = await Api.get(
        endpoints["time-table-detail"](props.timeTableID)
      );
      setTimeTable(ress.data);
    };

    loadElement();
  }, []);

  useEffect(() => {
    let e = [];
    let load = async () => {
      seat.forEach(async (c) => {
        let res = await Api.get(endpoints["seat-detail"](c));
        e.push(res.data);
      });
    };
    load();
    setNameSeat(e);
  }, []);

  const formatPrice = (price) => {
    var str = price.toString();
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  const pay = async (customerID, name, phone, timeTable, nameGara) => {
    if (window.confirm("Bạn có chắc muốn thanh toán không?") == true) {
      let booking = await Api.post(endpoints["booking"], {
        headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/route-detail/" + routerId + "/booking-3",
        customerID: customerID,
        name: name,
        phone: phone,
        timeTable: timeTable,
      });

      let res = await Api.get(endpoints["last-booking"]);

      let id = res.data.id;

      seat.map(async (c) => {
        let bookingdetails = await Api.post(endpoints["bookingdetails"], {
          headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/route-detail/" + routerId + "/booking-3",
          bookingID: id,
          from_garage: nameGara.id,
          seatID: c,
        });
      });

      let bookinghistorys = await Api.post(endpoints["booking-history"], {
        headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/route-detail/" + routerId + "/booking-3",
        bookingID: id,
        statusID: 1,
      });
      console.log(bookinghistorys);
      if (bookinghistorys.status === 201) {
        alert("Bạn đã thanh toán thành công!");
        navigate("/route-detail/" + routerId + "/booking-3");
      } else {
        alert("Rất tiếc! Thanh toán đã thất bại");
        navigate("/");
      }
    } else {
      alert("Bạn đã huỷ thanh toán!");
      navigate("/");
    }
  };

  return (
    <Container className="payment-container">
      <Row className="payment-row">
        <Col xs="12" className="payment-header">
          Thông tin mua vé
        </Col>
        
        <Col xs="12" className="payment-title">
          Thông tin chuyến: {props.station.stationFrom} ⇒{" "}
          {props.station.stationTo}
        </Col>
        <Col xs="2" className="payment-info">
          Tuyến xe:
        </Col>
        <Col xs="4" className="payment-info">
          {props.station.stationFrom} ⇒ {props.station.stationTo}
        </Col>
        <Col xs="2" className="payment-info">
          Số lượng ghế:
        </Col>
        <Col xs="4" className="payment-info">
          {props.seat.length}
        </Col>
        <Col xs="2" className="payment-info">
          Thời gian:
        </Col>
        <Col xs="4" className="payment-info">
          <span className="high-light">
            {timeTable.time} ngày{" "}
            <Moment format="DD/MM/YYYY">{timeTable.date}</Moment>
          </span>
        </Col>
        <Col xs="2" className="payment-info">
          Số ghế:
        </Col>
        <Col xs="4" className="payment-info">
          <span className="high-light">
            {nameSeat.map((c) => c.location + ", ")}
          </span>
        </Col>
        <Col xs="2" className="payment-info">
          Điểm lên xe:
        </Col>
        <Col xs="4" className="payment-info">
          <span className="high-light">{nameGara.name}</span>
        </Col>
        <Col xs="4" className="payment-info">
          {props.id}
        </Col>
        <Col xs="12" className="payment-title-total">
          Tổng tiền
        </Col>
        <Col xs="12" className="payment-total">
          {formatPrice(props.total)}
          <sup>₫</sup>
        </Col>
      </Row>
      <div className="booking-nav-buttons">
        <div className="left-btns">
          <button
            className="back-btn"
            onClick={() => {
              props.step(-1);
            }}
          >
            <img
              src="../../images/back.png"
              alt="back"
              width="24"
              height="24"
              class="icon"
            />
            Quay lại
          </button>
        </div>
        <div className="right-btns">
          <button
            className="next-btn"
            onClick={() =>
              pay(
                props.userInfo.id,
                props.userInfo.name,
                props.userInfo.number,
                props.timeTableID,
                nameGara
              )
            }
          >
            Thanh toán
            <img
              src="../../images/next.png"
              alt="back"
              width="24"
              height="24"
              class="icon"
            />
          </button>
        </div>
      </div>
    </Container>
  );
}
export default memo(Payment);
