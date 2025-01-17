import React, { useEffect, useState } from "react";
import API, { endpoints } from "../configs/Apis";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import about3 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import advice1 from "../static/image/advice/advice-1.jpg";
import PreLoader from "../components/PreLoader";
import Header from "../components/Header";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";


const useStyles = makeStyles((theme) => ({
  ul: {
    "& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#ff7c5b",
    },
    "& .Mui-selected": {
      color: "#fff",
    },
  },
}));

function Articals(props) {
  const classes = useStyles();
  let location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(-1);
  const [listArtical, setListArtical] = useState([]);
  const [lastestArticals, setLastestArticals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);



    /* Radio Search */
    const colorRadio = {
      color: "black",
      "&.Mui-checked": {
        color: "#ff7c5b",
      },
    };

  const [rate, setRate] = useState("");
  const handleRateChange = (event) => {
    setRate(event.target.value);
    navigate(`/garage/?rate=${event.target.value}`);
  };

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  useEffect(() => {
    let loadArticals = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;

      try {
        let res = await API.get(`${endpoints["buss"]}${query}`);
        console.log(res.data);

        setListArtical(res.data.results);
        setCount(res.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, [location.search, page]);

  const searchArtical = (event, search = `?q=${searchTerm}`) => {
    event.preventDefault();
    navigate(`/garage/?q=${searchTerm}`);
  };

  let buss = <></>;
  let results = <></>;

  if (listArtical.length !== 0) {
    buss = (
      <>
        {listArtical.map((b) => (
          <ArticalItem key={b.id} bus={b} />
        ))}
      </>
    );
  }

  results = (
    <>
      <h3
        style={{
          marginTop: "-90px",
          fontSize: "26px",
          lineHeight: "50px",
          fontWeight: 600,
        }}
      >
        Display {listArtical.length} above {count} result garage
      </h3>
    </>
  );

  // Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let pages = (
    <>
      <Stack spacing={2}>
        <Pagination
          classes={{ ul: classes.ul }}
          variant="outlined"
          size="large"
          count={Math.ceil(count / 5)}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );

  // if (listArtical.length === 0 && count === -1) {
  //     return <PreLoader />
  // }

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle6})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Garage Page</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="left-column pull-left">{results}</div>
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-standard-content">
                {buss}
                <div className="pagination-wrapper">
                  <ul className="pagination clearfix">{pages}</ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                <div className="sidebar-widget sidebar-search">
                  <div className="widget-title">
                    <h3>Search Name Bus</h3>
                  </div>
                  <form onSubmit={searchArtical} className="search-form">
                    <div className="form-group">
                      <input
                        type="search"
                        placeholder="Enter keywords"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                      <button type="submit">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </form>
                </div>
                <div className="sidebar-widget review-widget">
                  <div className="widget-title">
                    <h3>Rating</h3>
                  </div>
                  <div className="widget-content">
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="duration"
                        name="controlled-radio-buttons-group"
                        value={rate}
                        onChange={handleRateChange}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio sx={colorRadio} />}
                          label="1 star"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio sx={colorRadio} />}
                          label="2 star"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio sx={colorRadio} />}
                          label="3 star"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio sx={colorRadio} />}
                          label="4 star"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio sx={colorRadio} />}
                          label="5 star"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="sidebar-widget category-widget">
                  <div className="widget-title">
                    <h3>Classify</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      <li>
                        <Link to="/artical-details/2">
                          <i className="fas fa-long-arrow-alt-right" />
                          Culture
                        </Link>
                      </li>
                      <li>
                        <Link to="/artical-details/3">
                          <i className="fas fa-long-arrow-alt-right" />
                          Behavior
                        </Link>
                      </li>
                      <li>
                        <Link to="/artical-details/4">
                          <i className="fas fa-long-arrow-alt-right" />
                          Safe
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{
                      backgroundImage: `url(${advice1})`,
                    }}
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
    </>
  );
}

export default Articals;

function ArticalItem(props) {
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <>
      <div
        className="news-block-one wow fadeInUp animated animated"
        data-wow-delay="00ms"
        data-wow-duration="1500ms"
      >
        <div className="inner-box">
          <figure className="image-box">
            <Link to={"/bus-details/" + props.bus.id}>
              <img
                style={{ width: "770px", height: "470px" }}
                // src={about3}
                src={props.bus.image}
                alt="Image Bus"
              />
            </Link>
            <span className="post-date">
              <i className="fas fa-bus-alt" />
              {props.bus.name}
            </span>
          </figure>




          <div className="lower-content">
            <h2>
              <Link to={"/bus-details/" + props.bus.id}>{props.bus.name}</Link>
              <span>
              <i className="fas fa-star" style={{marginLeft:"10px",color:"#ffab01"}}/>
              {props.bus.rating}
            </span>
            </h2>
            <ul className="post-info clearfix" style={{padding:'0'}}>
              <li>{props.bus.description}</li>

              {/* <li> - Date created :{props.bus.created_date}</li> */}
            </ul>
            <div className="btn-box">
              <Link
                to={"/bus-details/" + props.bus.id}
                className="theme-btn-two"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
