import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import API, { endpoints } from "../configs/Apis";
import cookies from "react-cookies";
import WOW from "wowjs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Rating } from "@mui/material";
import NumberFormat from "react-number-format";
import advice1 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import PreLoader from "../components/PreLoader";
import MessageSnackbar from "../components/MessageSnackbar";
import Header from "../components/Header";
import Item from "../components/ItemLam";
import Payment from "../components/PaymentLam";
import Info from "../components/InfoLam";
import Booking1 from './Booking1';
import Booking2 from './Booking2';

export default function TourDetail(props) {
  const [route, setRoute] = useState([]);
  const [services, setServices] = useState([]);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);

  const { routerId } = useParams();

  let user = useSelector((state) => state.user.user);

  // State of message
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");

  const handleMessageClose = () => {
    setOpen(false);
  };

  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  // End message

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  /* Handle Comment Function */
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const addRating = async (event, newValue) => {
    if (user != null) {
      if (window.confirm("Bạn xác nhận đánh giá route này ?") === true) {
        try {
          let res = await API.post(
            endpoints["rating"](routerId),
            {
              rating: newValue,
            },
            {
              headers: {
                Authorization: `Bearer ${cookies.load("access_token")}`,
              },
            }
          );
          if (res.status === 200 || res.status === 201) {
            setOpen(true);
            createMessage(
              "Thành công",
              "Đánh giá route thành công !",
              "success"
            );
            setRating(newValue);
          }
        } catch (error) {
          setOpen(true);
          createMessage("Lỗi", "Đánh giá route thất bại !", "error");
          console.error(error);
        }
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể đánh giá !",
        "warning"
      );
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-route"](routerId),
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );

        if (res.status === 201) {
          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");

          setOpen(true);
          createMessage(
            "Thành công",
            "Đăng bình luận route thành công !",
            "success"
          );
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng bình luận route thất bại !", "error");
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể bình luận !",
        "warning"
      );
    }
  };
  /* End Comment Function */
  // if (route.length === 0) {
  //     return <PreLoader />
  // }

  const [listRouteDetail, setListRouteDetail] = useState([]);
  const [listTypeBus, setListTypeBus] = useState([]);
  const [sortType, setSortType] = useState();
  const [timeState, setTimeState] = useState();
  const [typeBusState, setTypeBusState] = useState([0].value);
  const [check, setCheck] = useState();
  const [seat, setSeat] = useState([]);
  const [placeFrom, setPlaceFrom] = useState();
  const [timeTableID, setTimeTableID] = useState();
  const [step, setStep] = useState(1);
  const [classStep, setClassStep] = useState([
    { class: "current-step" },
    { class: "current-step" },
    { class: "next-step" },
    { class: "empty-step" },
  ]);
  const [classTitle, setClassTitle] = useState([
    { class: "active-title" },
    { class: "active-title" },
    { class: "next-title" },
    { class: "next-title" },
  ]);
  const [classLine, setClassLine] = useState([
    { class: "current-line" },
    { class: "current-line" },
    { class: "next-line" },
  ]);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    number: "",
    email: "",
    tinh: "",
    huyen: "",
  });
  const [total, setTotal] = useState();
  const [station, setStation] = useState({ stationFrom: "", stationTo: "" });
  const [choosen, setChoosen] = useState(1);

  const [q] = useSearchParams();
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();

  useEffect(() => {
    let loadListRouteDetail = async () => {
      
      let res = await API.get(endpoints["time-table"]);
      setListRouteDetail(res.data);

      let router = await API.get(endpoints["route-detail"](routerId));

      setFromGarage(router.data.city_from.name);
      setToGarage(router.data.to_garage.name);

      let typeBus = await API.get(endpoints["type-bus"]);
      setListTypeBus(typeBus.data);
    };

    loadListRouteDetail();
  }, []);

  const setChoosenState = (id) => {
    setChoosen(id);
  };

  const setStationState = (stationFrom, stationTo) => {
    const data = {
      stationFrom: stationFrom,
      stationTo: stationTo,
    };
    setStation(data);
  };

  const setTotalState = (total) => {
    setTotal(total);
  };

  const setUserInfoState = (id, name, number, email, tinh, huyen) => {
    const data = {
      id: id,
      name: name,
      number: number,
      email: email,
      tinh: tinh,
      huyen: huyen,
    };
    setUserInfo(data);
  };

  const setClassStepState = (step) => {
    let newClassStep = classStep;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassStep[i].class = "current-step";
      }
      if (i === step + 1) {
        newClassStep[i].class = "next-step";
      }
      if (i > step + 1) {
        newClassStep[i].class = "empty-step";
      }
    }
    setClassStep(newClassStep);
  };

  const setClassTitleState = (step) => {
    let newClassTitle = classTitle;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassTitle[i].class = "active-title";
      }
      if (i > step) {
        newClassTitle[i].class = "next-title";
      }
    }
    setClassTitle(newClassTitle);
  };

  const setClassLineState = (step) => {
    let newClassLine = classLine;
    for (var i = 0; i < 3; i++) {
      if (i <= step) {
        newClassLine[i].class = "current-line";
      }
      if (i > step) {
        newClassLine[i].class = "next-line";
      }
    }
    setClassLine(newClassLine);
  };

  const setStepState = (value) => {
    setStep(step + value);
    setClassStepState(step + value);
    setClassTitleState(step + value);
    setClassLineState(step + value);
  };

  const setPlaceFromState = (place) => {
    setPlaceFrom(place);
  };

  const setTimeTableIDState = (id) => {
    setTimeTableID(id);
  };

  const setChecked = (checked) => {
    setCheck(checked);
  };

  const setSeatSubmit = (seatSubmit) => {
    setSeat(seatSubmit);
  };

  const clearSeatSubmit = () => {
    setSeat([]);
  };

  const element = listRouteDetail.filter(
    (c) => c.busRouteID.routeID.id == routerId
  );

  const sortByTypeBus = element.filter(function(c) {
    if (typeBusState === "0" || typeBusState === undefined) {
      return c;
    } else {
      return c.busRouteID.busID.typeBusID.id == typeBusState;
    }
  });

  const sorted = sortByTypeBus.filter(function(c) {
    if (timeState === undefined || timeState === "-1") {
      return c;
    } else {
      const timeStart = parseInt(timeState);
      const timeEnd = parseInt(timeState) + 6;
      return (
        parseInt(c.time.split(":")[0]) > timeStart &&
        parseInt(c.time.split(":")[0]) <= timeEnd
      );
    }
  });

  const sortByType = sorted.sort((a, b) => {
    if (sortType == "0") {
      return 0;
    }
    if (sortType == "asc") {
      return 1;
    }
    if (sortType == "desc") {
      return -1;
    }
  });

  const [classStatus, setClassStatus] = useState([]);
  const [booking, setBooking] = useState([]);
  const [seatStatusPass, setSeatStatusPass] = useState([]);
  const [seatStatusFree, setSeatStatusFree] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const [seatBooking, setSeatBooking] = useState([]);

  useEffect(() => {
    let seatStatus_pass = [];
    let seatStatus_free = [];
    let seatt = [];
    let loadSeat = async () => {
      let res = await API.get(endpoints["seats"](props.busTypeId));
      setSeat(res.data);
      seatt = res.data;
    };

    loadSeat();

    let loadBookings = async () => {
      let res = await API.get(endpoints["bookings"](props.busTypeId));
      setBooking(res.data);

      let seatBookingDetails = await API.get(
        endpoints["seat-booking-detail"](props.id)
      );
      setSeatBooking(seatBookingDetails.data);

      seatt.map((s) => {
        seatBookingDetails.data.map((b) => {
          if (b.seatID == s.id) {
            seatStatus_pass.push(s.id);
          }
        });

        if (!seatStatus_pass.includes(s.id)) {
          seatStatus_free.push(s.id);
        }
      });

      setSeatStatusPass(seatStatus_pass);
      setSeatStatusFree(seatStatus_free);
    };

    loadBookings();

    let loadTimeTable = async () => {
      let res = await API.get(endpoints["timetable-detail"](props.id));
      setTimeTable(res.data);
    };

    loadTimeTable();
  }, [props.busTypeId]);

  const setCountByStatus = classStatus.length;

  const setTotalByStatus = classStatus.length * props.price;

  const setStatuss = () => {
    let seatStatus_pass = [];
    let seatStatus_free = [];
    seat.map((s) => {
      seatBooking.map((b) => {
        if (b.seatID == s.id) {
          seatStatus_pass.push(s.id);
        }
      });

      if (!seatStatus_pass.includes(s.id)) {
        seatStatus_free.push(s.id);
      }
    });

    setSeatStatusPass(seatStatus_pass);
    setSeatStatusFree(seatStatus_free);
  };

  const setStatus = (id) => {
    var array = [...classStatus];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setClassStatus(array);
    } else {
      const data = [...classStatus, id];
      setClassStatus(data);
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

  return (
    <>
      <Header />
      <section
        className="page-title style-three"
        style={{ backgroundImage: `url(${advice1})` }}
      >
        <div className="auto-container">
          <div
            className="inner-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <div className="rating">
              <span>
                <i className="fas fa-star"></i>3{/* {route.rating} */}
              </span>
            </div>
            <h2 style={{ width: "750px" }}>
              {/* {route.route_name} */}
              {fromGarage} - {toGarage}
            </h2>
            <h3>
              {/* <NumberFormat
                            value={route.price_of_route}
                            displayType={'text'}
                            thousandSeparator={true}
                            // prefix={'$'}
                            style={{color:'orange',fontSize:'50px'}}
                            />đ / 1 người */}
            </h3>
          </div>
        </div>
      </section>

      <section className="tour-details">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="tour-details-content">
                {step === 1 ? (
                  <div>
                    {sortByType.length > 0 ? (
                      sortByType.map((c) => {
                        return (
                          <Item
                            setChoosen={setChoosenState}
                            choosen={choosen}
                            timeTableID={setTimeTableIDState}
                            check={setChecked}
                            seatSubmit={setSeatSubmit}
                            placeFrom={setPlaceFromState}
                            step={setStepState}
                            total={setTotalState}
                            station={setStationState}
                            select={check === c.id ? true : false}
                            id={c.id}
                            rate={c.rate}
                            busRouteID={c.busRouteID.id}
                            timeStart={
                              c.time.split(":")[0] + "h:" + c.time.split(":")[1]
                            }
                            timeEnd={
                              parseInt(c.time.split(":")[0]) +
                              6 +
                              "h:" +
                              c.time.split(":")[1]
                            }
                            price={c.busRouteID.price}
                            busType={c.busRouteID.busID.typeBusID.name}
                            busTypeId={c.busRouteID.busID.typeBusID.id}
                            seat={c.seat}
                            stationFrom={c.busRouteID.routeID.city_from.name}
                            stationTo={c.busRouteID.routeID.to_garage.name}
                            date={c.date}
                          ></Item>
                        );
                      })
                    ) : (
                      <h1
                        style={{
                          textAlign: "center",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        No rides!!!
                      </h1>
                    )}
                  </div>
                ) : step === 2 ? (
                  <Booking1
                    step={setStepState}
                    clearSeat={clearSeatSubmit}
                    userInfo={setUserInfoState}
                  />
                ) : step === 3 ? (
                  <Booking2
                    step={setStepState}
                    placeFrom={placeFrom}
                    userInfo={userInfo}
                    seat={seat}
                    total={total}
                    station={station}
                    timeTableID={timeTableID}
                  ></Booking2>
                ) : (
                  ""
                )}
                <div className="comment-box">
                  {/* <div className="text">
                                        <h2>Đánh giá</h2>
                                        <Rating name="simple-controlled"
                                        size="large"
                                        value={rating}
                                        onChange={addRating}
                                        />
                                    </div>
                                    <div>
                                    <form onSubmit={addComment} className="comment-form">
                                        <div className="row clearfix">
                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                <textarea placeholder="Nội dung" value={comment} 
                                                    onChange={(event) => handleChange(event)}/>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                <button type="submit" className="theme-btn">Gửi</button>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                    <hr />
                                    <div className="group-title">
                                        <h2>{listComment.length} Bình luận</h2>
                                    </div>

                                    <div className="comment-box-content">
                                        {listComment.map(c => <CommentItem key={c.id} comment={c} />)}
                                    </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="default-sidebar tour-sidebar ml-20">
                <div className="sidebar-widget downloads-widget">
                  <div className="form-widget">
                    <div className="widget-title">
                      <h3>Đặt Tour</h3>
                    </div>
                    <Link
                      to={"/route-detail/" + routerId + "/booking-1"}
                      style={{ color: "#fff" }}
                    >
                      <button type="submit" className="theme-btn">
                        Nhấn vào đây
                      </button>
                    </Link>
                  </div>
                  <div className="widget-title">
                    <h3>Download</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="download-links clearfix">
                      <li>
                        <Link to="/">
                        Guide
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                        Trip documents
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          Logo & Content
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                      Reduce <br />
                      25% for <br />
                      Dalat trips
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageSnackbar
        handleClose={handleMessageClose}
        isOpen={open}
        msg={msg}
        type={typeMsg}
        title={titleMsg}
      />
    </>
  );
}
function CommentItem(props) {
  return (
    <>
      {/* <div className="comment">
                    <figure className="thumb-box">
                        <Avatar
                            alt="ImageComment"
                            src={props.comment.user.avatar}
                            sx={{ width: 52, height: 52 }}
                        />
                    </figure>
                    <div className="comment-inner">
                        <div className="comment-info clearfix">
                            <span className="post-date">{props.comment.created_date}</span>
                        </div>
                        <p>
                            {props.comment.content}
                        </p>
                        <div className="author-comment">
                            <span>Bình luận bởi:</span> {props.comment.user.username}
                        </div>
                    </div>
                </div> */}
    </>
  );
}
