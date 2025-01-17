import React, { useEffect, useState } from "react";
import API, { endpoints } from "../configs/Apis";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import pageTitle9 from "../static/image/background/page-title-9.jpg";
import shape16 from "../static/image/shape/shape-16.png";
import shape17 from "../static/image/shape/shape-17.png";
import { Fade, Typography } from "@mui/material";
import Header from "../components/Header";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const sendMailResetPass = async (event) => {
    event.preventDefault();
    setStatus("progress");

    const formData = new FormData();
    formData.append("email", email);

    try {
      let res = await API.post(endpoints["forgot-password"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setStatus("success");
      }
    } catch (error) {
      console.error(error);
      setStatus("success");
    }
  };

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle9})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Forgot password</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{ backgroundImage: `url(${shape16})` }}
          />
          <div
            className="icon anim-icon-2"
            style={{ backgroundImage: `url(${shape17})` }}
          />
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div
              className="sec-title centred wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <p>Forgot password</p>
              <h2>Connect with us for Better Trip</h2>
            </div>
            <div className="form-inner">
              <h3>Đăng nhập với</h3>
              <ul className="social-links clearfix">
                <li>
                  <Link to="/">
                    <span>Login with Facebook _</span>
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Login with Google _</span>
                    <i className="fab fa-google-plus-g" />
                  </Link>
                </li>
              </ul>
              <div className="text">
                <span>Or</span>
              </div>
              <form onSubmit={sendMailResetPass} className="register-form">
                <div className="row clearfix">
                  <InputForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    change={(event) => setEmail(event.target.value)}
                  />
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group message-btn">
                      <button type="submit" className="theme-btn">
                        Send
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <Box sx={{ display: "flex" }}>
                      {status === "success" ? (
                        <Typography>
                          Please check your email ! If you haven't received it,
                          press resend
                        </Typography>
                      ) : (
                        <Fade
                          in={status === "progress"}
                          style={{
                            transitionDelay: status === 0 ? "800ms" : "0ms",
                          }}
                          unmountOnExit
                        >
                          <CircularProgress color="inherit" />
                        </Fade>
                      )}
                    </Box>
                  </div>
                </div>
              </form>
              <div className="other-text">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InputForm(props) {
  return (
    <>
      <div className={props.class}>
        <div className="form-group">
          <label>{props.label}</label>
          <input
            value={props.value}
            type={props.type}
            id={props.id}
            onChange={props.change}
            required
          />
        </div>
      </div>
    </>
  );
}
