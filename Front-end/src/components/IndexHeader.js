import React from "react";
import { Container } from "react-bootstrap";

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("../assets/img/Bus-Station-Wallpaper-Background.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          {/* <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Bus Station Luxury</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Làm cho mọi người có một trải nghiệm tuyệt vời
            </h2>
          </Container> */}
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
