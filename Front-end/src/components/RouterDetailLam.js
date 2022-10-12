import { Container } from "react-bootstrap";
import Info from "../components/InfoLam";
// import "../static/Router.css";
import { useEffect, useState } from "react";
import Payment from "../components/PaymentLam";
import Api, { endpoints } from "../configs/Apis";
import { useSearchParams, useParams } from "react-router-dom";
import Item from "../components/ItemLam";
import Moment from "react-moment";
import React from 'react';

function RouterDetail() {
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
  const { routerId } = useParams();

  useEffect(() => {
    let loadListRouteDetail = async () => {
      let res = await Api.get(endpoints["time-table"]);
      setListRouteDetail(res.data);

      let router = await Api.get(endpoints["route-detail"](routerId));

      setFromGarage(router.data.city_from.name);
      setToGarage(router.data.to_garage.name);

      let typeBus = await Api.get(endpoints["type-bus"]);
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

  const sortByTypeBus = element.filter(function (c) {
    if (typeBusState === "0" || typeBusState === undefined) {
      return c;
    } else {
      return c.busRouteID.busID.typeBusID.id == typeBusState;
    }
  });

  const sorted = sortByTypeBus.filter(function (c) {
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

  return (
    <div style={{ background: "#fff" }}>
      <div
        style={{
          backgroundColor: "",
          width: "100%",
          height: "100%",
          paddingTop: "40px",
        }}
      >
        <Container className="booking-header">
          <h1>
            {fromGarage} - {toGarage}
          </h1>
        </Container>

        {step === 1 ? (
          <div>
            <div className="filter-container">
              <select
                className="custom-select filter-select"
                onChange={(e) => {
                  setSortType(e.target.value);
                }}
              >
                <option value="0" selected="selected">
                  Giá
                </option>
                <option value="asc">Thấp - Cao</option>
                <option value="desc">Cao - Thấp</option>
              </select>
              <select
                className="custom-select filter-select"
                onChange={(e) => {
                  setTypeBusState(e.target.value);
                }}
              >
                <option value="0" selected="selected">
                  Loại xe
                </option>
                {listTypeBus.map((c) => {
                  return <option value={c.id}>{c.name}</option>;
                })}
              </select>
              <select
                className="custom-select filter-select"
                onChange={(e) => {
                  setTimeState(e.target.value);
                }}
              >
                <option value="-1" selected="selected">
                  Giờ
                </option>
                <option value="0" data-v-7026b95e="">
                  0h - 6h
                </option>
                <option value="6" data-v-7026b95e="">
                  6h - 12h
                </option>
                <option value="12" data-v-7026b95e="">
                  12h - 18h
                </option>
                <option value="18" data-v-7026b95e="">
                  18h - 24h
                </option>
              </select>
            </div>

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
              <h1 style={{ textAlign: "center", margin: "0", padding: "10px" }}>
                Không có chuyến nào!!!
              </h1>
            )}
          </div>
        ) : step === 2 ? (
          <Info
            step={setStepState}
            clearSeat={clearSeatSubmit}
            userInfo={setUserInfoState}
          ></Info>
        ) : step === 3 ? (
          <Payment
            step={setStepState}
            placeFrom={placeFrom}
            userInfo={userInfo}
            seat={seat}
            total={total}
            station={station}
            timeTableID={timeTableID}
          ></Payment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RouterDetail;
