import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import "../static/Info.css";
import cookies from "react-cookies";
import { memo } from 'react'
import React from 'react';
import Header from '../components/Header';

function Info(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [accept, setAccept] = useState(false);

  const userInfo = () => {
    props.userInfo(id, name, number, email, tinh, huyen);
  };

  useEffect(() => {
    let loadUser = async () => {
      let info = cookies.load("user");
      setUser(info);
      setName(`${info.first_name} ${info.last_name}`);
      setNumber(info.phone);
      setEmail(info.email);
      setId(info.id);
    };

    loadUser();
  }, []);

  return (
    <>
    <Container className="info-container">
      <Row className="info-row">
        <Col xs={6}>
          <Container>
            <div className="info-header" onClick={() => console.log(user)}>
              Thông tin khách hàng
            </div>
            <Form>
              <Form.Group className="info-input" controlId="formBasicText">
                <Form.Label>Họ và tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhap ho va ten..."
                  style={{ borderRadius: "20px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="info-input" controlId="formBasicText">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={number}
                  placeholder="Nhap so dien thoai..."
                  style={{ borderRadius: "20px" }}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="info-input" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="Nhap email..."
                  style={{ borderRadius: "20px" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Check
                className="info-check"
                type="checkbox"
                label="Chấp nhận điều khoản và đặt vé"
                onClick={() => setAccept(!accept)}
              />
            </Form>
          </Container>
        </Col>
        <Col xs={6} className="notes-container">
          <Container>
            <p className="info-header">ĐIỀU KHOẢN &amp; LƯU Ý</p>
            <p className="txt">
              (*) Quý khách vui lòng mang email có chứa mã vé đến văn phòng để
              đổi vé lên xe trước giờ xuất bến ít nhất
              <span className="high-light">60 phút</span>
              để chúng tôi trung chuyển.
            </p>
            <p className="txt">
              (*) Thông tin hành khách phải chính xác, nếu không sẽ không thể
              lên xe hoặc hủy/đổi vé.
            </p>
            <p className="txt">
              (*) Quý khách không được đổi/trả vé vào các ngày Lễ Tết (ngày
              thường quý khách được quyền chuyển đổi hoặc hủy vé
              <span className="high-light">một lần</span>
              duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%.
            </p>
            <p className="txt">
              (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số
              điện thoại
              <span>1900 6067</span>
              trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm
              xe trung chuyển không thể tới được.
            </p>
          </Container>
        </Col>
      </Row>
      <div className="booking-nav-buttons">
        <div className="left-btns">
          <button
            className="back-btn"
            onClick={() => {
              props.step(-1);
              props.clearSeat();
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
        {accept === true && name !== "" && number !== "" && email !== "" ? (
          <div
            className="right-btns"
            onClick={() => {
              props.step(1);
              userInfo();
            }}
          >
            <button className="next-btn">
              Tiếp tục
              <img
                src="../../images/next.png"
                alt="back"
                width="24"
                height="24"
                class="icon"
              />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </Container>
    </>
  );
}
export default memo(Info);
