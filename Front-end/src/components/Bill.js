import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import API, { endpoints } from "../configs/Apis";
import { useNavigate, useParams } from "react-router-dom";

function Bill(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const pay = async (type) => {
    if (window.confirm("Bạn có chắc muốn thanh toán?") == true) {
      if (type == "momo") {
        let bookinghistorys = await API.get(
          endpoints["history-find-by-bookingID"](props.id)
        );
        if (bookinghistorys.status === 200) {
          let momo = await API.post(endpoints["momo"], {
            headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
            amount: props.price * props.detail.length,
            orderId: props.id,
            historyId: bookinghistorys.data.id,
          });
          if (momo.status === 200 && momo.data.payUrl !== undefined) {
            // window.open(momo.data.payUrl, '_blank').focus();
            window.location.replace(momo.data.payUrl);
          }
        } else {
          alert("Xin lỗi! Đã có lỗi xảy ra, xin hãy thử lại sau!");
        }
      } else if (type == "offline") {
        let bookinghistorys = await API.post(endpoints["booking-history"], {
          headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
          bookingID: props.id,
          statusID: 2,
        });
        if (bookinghistorys.status === 201) {
          alert("Bạn đã đặt vé thành công");
        } else {
          alert("Xin lỗi! Đã có lỗi xảy ra, xin hãy thử lại sau!");
        }
      }
    } else {
      alert("Bạn đã hủy thanh toán!");
    }
    navigate("/");
  };

  const deleteBooking = async () => {
    if (window.confirm("Bạn có chắc muốn xóa?") == true) {
      let booking = await API.delete(endpoints["bookingID"](props.id));
      if (booking.status === 204) {
        alert("Vé của bạn đã bị xóa!");
        props.deleteBooking(props.id);
      } else {
        alert("Xin lỗi! Đã có lỗi xảy ra, xin hay thử lại sau!");
      }
    }
  };

  const formatPrice = (price) => {
    var str = price.toString();
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  console.log(props.error);

  return (
    <>
      {props.error !== undefined ? (
        <Row className="pay-card">
          <h1>
            Đã có lỗi xảy ra, xin vui lòng quay lại sau hoặc gọi cho 0329460091
            để được hỗ trợ!!
          </h1>
        </Row>
      ) : (
        <>
          <Row className="pay-card">
            <Col xs={8} style={{ padding: "20px" }}>
              <div className="pay-card__route">
                {props.from} - {props.to}
              </div>
              {/* <div className="pay-card__garage">
                {props.detail[0].from_garage.address.substring(
                  0,
                  props.detail[0].from_garage.address.indexOf(",")
                )}{" "}
                - {props.time} - {props.date}
              </div>
              <div className="pay-card__seat">
                {props.detail.map((e) => e.seatID.location + ",")}
              </div>
              <div className="pay-card__total">
                {formatPrice(props.price * props.detail.length)}
                <sup>₫</sup>
              </div> */}
            </Col>
            <Col xs={4} style={{ padding: "40px" }}>
              <Button
                variant="primary"
                className="pay-card__pay-button"
                onClick={() => handleShow()}
              >
                Thanh toán
              </Button>
              <Button
                variant="danger"
                className="pay-card__delete-button"
                onClick={() => deleteBooking()}
              >
                Xóa
              </Button>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Chọn phương thức thanh toán!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="secondary" onClick={() => pay("momo")}>
                VÍ ĐIỆN TỬ MOMO
              </Button>
              <Button variant="primary" onClick={() => pay("offline")}>
                TRỰC TIẾP
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default Bill;
