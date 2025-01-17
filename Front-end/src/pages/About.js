import React from "react";
import WOW from "wowjs";
import Header from "../components/Header";
import shape2 from "../static/image/shape/shape-2.png";
import shape3 from "../static/image/shape/shape-3.png";
import shape12 from "../static/image/shape/shape-12.png";
import shape13 from "../static/image/shape/shape-13.png";
import team1 from "../assets/img/logo.png";
import video1 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import about3 from "../assets/img/banner-mockup-bus-station-stop-departing-red-blank-poster-mock-up-inside-advertising-empty-template-public-141508844.jpg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{
          backgroundImage:
            "url(" +
            require("../assets/img/yokohama-bus-1f-1280x800.jpg") +
            ")",
        }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Infomation</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section>
      <AboutStyleTwoSection />
      <AboutVideoSection />
      <AboutTeamSection />
    </>
  );
}

function AboutStyleTwoSection() {
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <section className="about-style-two">
      <div
        className="pattern-layer"
        style={{
          backgroundImage: `url(${shape2})`,
        }}
      />
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content_block_1">
              <div className="content-box">
                <div
                  className="sec-title wow fadeInLeft animated animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                >
                  <p>Bus Station</p>
                  <h2>
                    The best best vehicles joint stock company in the country
                    from 2022.
                  </h2>
                </div>
                <div
                  className="text wow fadeInLeft animated animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                >
                  <p>
                    BusStation is a company's branding Travel and Service Co.,
                    Ltd BusStation. BusStation is evaluated as one of the
                    prestigious brands in international and domestic enterprises
                    of Vietnam.
                  </p>
                </div>
                <div
                  className="btn-box wow fadeInUp animated animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                >
                  <Link to="/tour-list" className="theme-btn">
                  Learn about
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image_block_2">
              <div
                className="image-box wow fadeInRight animated animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <div className="shape">
                  <div
                    className="shape-1"
                    style={{
                      backgroundImage: `url(${shape13})`,
                    }}
                  />
                  <div
                    className="shape-2"
                    style={{
                      backgroundImage: `url(${shape12})`,
                    }}
                  />
                  <div
                    className="shape-3"
                    style={{
                      backgroundImage: `url(${shape12})`,
                    }}
                  />
                </div>
                <figure className="image">
                  <img src={about3} alt="ImageAbout" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutVideoSection() {
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <section
      className="video-section centred"
      style={{
        backgroundImage: `url(${video1})`,
      }}
    >
      <div className="auto-container">
        <div className="inner-box">
          <h2
            className="wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            Explore your journey
          </h2>
          <p
            className="wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            Your new journey idea
          </p>
          <div
            className="video-btn wow fadeInUp animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <Link
              to="https://www.youtube.com/watch?v=YncYl8rREqQ&ab_channel=KOYMusicGroup"
              className="lightbox-image"
              data-caption
            >
              <i className="fas fa-play" />
              <span className="border-animation border-1" />
              <span className="border-animation border-2" />
              <span className="border-animation border-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTeamSection() {
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <section className="team-section sec-pad bg-color-1 centred">
      <div className="anim-icon">
        <div
          className="icon anim-icon-1"
          style={{
            backgroundImage: `url(${shape3})`,
          }}
        />
        <div
          className="icon anim-icon-2"
          style={{
            backgroundImage: `url(${shape3})`,
          }}
        />
      </div>
      <div className="auto-container">
        <div className="sec-title">
          <p>Tour guide</p>
          <h2>Guides</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <figure className="image-box">
                  <img src={team1} alt="ImageTeam" />
                </figure>
                <div className="lower-content">
                  <h3>
                    <Link to="/">Nhật Nguyên</Link>
                  </h3>
                  <span className="designation">Tour guide</span>
                  <ul className="social-links clearfix">
                    <li>
                      <Link to="/">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated animated"
              data-wow-delay="300ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <figure className="image-box">
                  <img src={team1} alt="ImageTeam" />
                </figure>
                <div className="lower-content">
                  <h3>
                    <Link to="/">Huy Nguyên</Link>
                  </h3>
                  <span className="designation">Tour guide</span>
                  <ul className="social-links clearfix">
                    <li>
                      <Link to="/">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 team-block">
            <div
              className="team-block-one wow fadeInUp animated animated"
              data-wow-delay="600ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <figure className="image-box">
                  <img src={team1} alt="ImageTeam" />
                </figure>
                <div className="lower-content">
                  <h3>
                    <Link to="/">Hữu Tiên</Link>
                  </h3>
                  <span className="designation">Tour guide</span>
                  <ul className="social-links clearfix">
                    <li>
                      <Link to="/">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
