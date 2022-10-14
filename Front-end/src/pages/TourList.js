import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API, { endpoints } from '../configs/Apis';
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Pagination, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import viLocale from 'date-fns/locale/vi';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box } from '@mui/system';
import WOW from 'wowjs';
import advice1 from "../static/image/advice/advice-1.jpg"
import PreLoader from "../components/PreLoader"
import Header from '../components/Header';
import about3 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import { useSearchParams, useParams } from "react-router-dom";
import { Col, Form, Row} from "react-bootstrap";

function valuetext(value) {
    return `${value}°C`;
}

const sliderTheme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                thumb: {
                color: "#ff7c5b"
                },
                track: {
                color: "#ff7c5b"
                },
                rail: {
                color: "#ff7c5b"
                }
            }
        }
    }
});

const buttonTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '15px',
                    backgroundColor: "#ff7c5b",
                    width: '110px',
                    height: '45px',
                },
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    ul: {
        '& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#ff7c5b',
        },
        '& .Mui-selected': {
            color: '#fff',
        },
    }
})
);

export default function TourList() {
    const location = useLocation()
    const navigate = useNavigate()

    const [count, setCount] = useState(-1)
    const [routeList, setRouteList] = useState([])

    const [cName, setcName] = useState('wrapper list')
    const [cList, setcList] = useState('list-view on')
    const [cGrid, setcGrid] = useState('grid-view')

    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("")
    const [departDate, setDepartDate] = useState(new Date());

    const [page, setPage] = useState(1)
    const classes = useStyles();

    const [index, setIndex] = useState(0);
    const [fromGarage, setFromGarage] = useState();
    const [toGarage, setToGarage] = useState();
    const [listRoute, setListRoute] = useState([]);
    const [city, setCity] = useState([]);
    const [sDate, setSDate] = useState([]);
    
    
    const [q] = useSearchParams();
    /* Radio Search */
    const colorRadio = {
        color: "black",
        "&.Mui-checked": {
            color: "#ff7c5b"
        }
    };
    const [duration, setDuration] = useState("");
    const [rate, setRate] = useState("")
    /* End Radio Search */

    /* Range slider */
    const [value, setValue] = useState([500000, 10000000]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // const handleChangeCommitted = () => {
    //     console.log(value);
    // };
    /* End Range Slider */

    /* Classname List and Grid view for page tour list */
    const listOn = () => {
        setcName('wrapper list')
        setcList('list-view on')
        setcGrid('grid-view')
    }

    const gridOn = () => {
        setcName('wrapper grid')
        setcList('list-view')
        setcGrid('grid-view on')
    }
    const search = (event) => {
        event.preventDefault();
        if (sDate != "") {
          navigate(`/routed/?search=${fromGarage}to${toGarage}ngày${sDate}`);
        } else {
          navigate(`/routed/?search=${fromGarage}to${toGarage}`);
        }
      };
      
    useEffect(() => {


        let loadRouter = async () => {
            let query = location.search
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`

            try {
                // let search = q.get("search");
                // if (search != null) {
                //   setFromGarage(search.split("to")[0]);
                //   // setToGarage(search.split("to")[1])
                //   setToGarage(search.split("to")[1].split("ngày")[0]);
                //   setSDate(search.split("to")[1].split("ngày")[1]);
                // }
                let res = await API.get(`${endpoints['router']}${query}`)
                console.log(res.data)

                setRouteList(res.data)
                setCount(res.data.count)

                let cities = await API.get(endpoints["city"]);
                setCity(cities.data);

            } catch (error) {
                console.error(error)
            }
        }
        loadRouter()
      }, [location.search, page])

    /* Function Search Tour */
    const handleDepartDateChange = (newValue) => {
        setDepartDate(newValue)
        console.log(newValue)
        let year = newValue.getFullYear()
        let month = newValue.getMonth() + 1
        let date = newValue.getDate()

        navigate(`/tour-list/?depart_date=${year}-${month}-${date}`)
    }

    const handleSortChange = (event) => {
        setSort(event.target.value)
        navigate(`/tour-list/?sort=${event.target.value}`)
    }

    const searchTour = (event) => {
        event.preventDefault()
        navigate(`/tour-list/?q=${searchTerm}`)
    }

    const searchByPrice = async () => {
        navigate(`/tour-list/?min=${value[0]}&max=${value[1]}`)
    }

   
    
    const handleRadioChange = (event) => {
        let min_d=null;
        let max_d=null;
        if (event.target.value==="1") { min_d=1; max_d=2;}
        if (event.target.value==="2") { min_d=2; max_d=3;}
        if (event.target.value==="3") { min_d=3; max_d=4;}
        if (event.target.value==="4") { min_d=4; max_d=5;}

        setDuration(event.target.value);
        navigate(`/tour-list/?min_d=${min_d}&max_d=${max_d}`)
    };

    // const handleCateChange = (event) => {
    //     setCate(Number(event.target.value));
    //     navigate(`/tour-list/?category_id=${Number(event.target.value)}`)
    // };

    const handleRateChange =(event) => {
        setRate(event.target.value)
        navigate(`/tour-list/?rate=${event.target.value}`)
    }
    /* End Function Search Tour */

    /* Render tour list */
    let routes = <></>
    let results = <></>

//  CHÚ Ý LỌC CÓ HAY KHÔNG
        routes = <>
            <div className="tour-list-content list-item">
                {routeList.map(t => <RouteItem2 route={t} key={t.id}  name={`${t.city_from.name} - ${t.to_garage.name}`}
                id={t.id} />)}
            </div>
        </>
        
        results = <><h3>Display {routeList.length} above {count} result</h3></>
   

    // Pagination
    const handlePageChange = (event, value) => {
        setPage(value);
      };

    let pages = <>
        <Stack spacing={2}>
            <Pagination
            classes={{ ul: classes.ul }}
            variant="outlined" 
            size="large" 
            count={Math.ceil(count / 6)}
            onChange={handlePageChange} />
        </Stack>
    </>
    /* End Render */
     if (routeList.length === 0 && count === -1){
        return <PreLoader />
     }

    return (
        <>
            <Header/>
            
            <section className="page-title style-two centred"
              style={{
                backgroundImage:
                "url(" + require("../assets/img/yokohama-bus-1f-1280x800.jpg") + ")",
             }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                        <h1>Lists Trip </h1>
                        <p>Explore your next great journey</p>
                    </div>
                </div>
            </section>

            <section className="tours-page-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="item-shorting clearfix">
                                <div className="left-column pull-left">
                                    {results}
                                </div>
                                {/* <div className="right-column pull-right clearfix">
                                    <div className="short-box clearfix">
                                        <FormControl sx={{ m: 0, minWidth: 140 }}>
                                            <InputLabel id="select-sort-label">Sắp xếp theo</InputLabel>
                                            <Select
                                                labelId="select-sort-label"
                                                id="sort-select"
                                                value={sort}
                                                onChange={handleSortChange}
                                                autoWidth
                                                lable='Sắp xếp theo'
                                                inputProps={{ MenuProps: {disableScrollLock: true} }}
                                            >
                                                <MenuItem value="">
                                                    <em>Sắp xếp theo</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Name (a - z)</MenuItem>
                                                <MenuItem value={2}>Giá tăng dần</MenuItem>
                                                <MenuItem value={3}>Giá giảm dần</MenuItem>
                                                <MenuItem value={4}>Rating</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="menu-box">
                                        <button className={cList} onClick={listOn}>
                                            <i className="fas fa-stream" />
                                        </button>
                                        <button className={cGrid} onClick={gridOn}>
                                            <i className="fas fa-th-large" />
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                            <div className={cName}>
                                {routes}
                            </div>
                            <div className="pagination-wrapper">
                                <ul className="pagination clearfix">
                                    {pages}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="default-sidebar tour-sidebar ml-20">
                                <div className="sidebar-widget sidebar-search">
                                    <div className="widget-title">
                                        <h3>Search</h3>
                                    </div>
                                    <form onSubmit={search} className="search-form">
                                        <div className="form-group">
                                        <Form.Group>
                                            <h4>Choose a starting point</h4>
                                            <Form.Select 
                                                value={fromGarage}
                                                onChange={(e) => setFromGarage(e.target.value)}
                                            >
                                                <option value="0" selected="selected">
                                                Choose a starting point
                                                </option>
                                                {city.map((c) => {
                                                return <option value={c.name}>{c.name}</option>;
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        </div>
                                        <div className="form-group" >
                                        <Form.Group>
                                            <h4>Choose a destination</h4>
                                            <Form.Select 
                                                value={toGarage}
                                                onChange={(e) => setToGarage(e.target.value)}
                                            >
                                                <option value="0" selected="selected">
                                                Choose a destination
                                                </option>

                                                {city.map((c) => {
                                                return <option value={c.name}>{c.name}</option>;
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        
                                        </div>
                                        <Box className="box_tim">
                                            <ThemeProvider theme={buttonTheme}>
                                                <Button color="warning" variant="contained"  type="submit" startIcon={<SearchIcon />}>
                                                        Search
                                                </Button>
                                            </ThemeProvider>
                                        </Box>
                                        
                                    </form>
                                </div>
                                {/* <div className="sidebar-widget">
                                    <div className="widget-title">
                                        <h3>Ngày khởi hành</h3>
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
                                        <DatePicker
                                            label="Ngày khởi hành"
                                            value={departDate}
                                            onChange={handleDepartDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div> */}
                                {/* <div className="sidebar-widget category-widget">
                                    <div className="widget-title">
                                        <h3>Loại tour</h3>
                                    </div>
                                    <div className="widget-content">
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="category" name="controlled-radio-buttons-group" value={cate}
                                            onChange={handleCateChange}>
                                                {categories.map(c => <FormControlLabel key={c.id} value={c.id} control={<Radio sx={colorRadio} />} label={c.name} />)}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div> */}
                                
                                {/* <div className="sidebar-widget price-filter">
                                    <div className="widget-title">
                                        <h3>Lọc theo giá</h3>
                                    </div>
                                    <Box>
                                        <ThemeProvider theme={sliderTheme}>
                                            <Slider
                                                value={value}
                                                onChange={handleChange}
                                                // onChangeCommitted={handleChangeCommitted}
                                                valueLabelDisplay="auto"
                                                aria-labelledby="range-slider"
                                                getAriaValueText={valuetext}
                                                min={500000}
                                                max={10000000}
                                            />
                                        </ThemeProvider>
                                    </Box>
                                    <div className="range-slider clearfix">
                                        <div className="value-box clearfix">
                                            <div className="min-value pull-left">
                                                <p>500.000</p>
                                            </div>
                                            <div className="max-value pull-right">
                                                <p>10.000.000</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Box >
                                        <ThemeProvider theme={buttonTheme} >
                                            <Button color="warning"  variant="contained" onClick={searchByPrice} startIcon={<SearchIcon />}>
                                                Tìm
                                            </Button>
                                        </ThemeProvider>
                                    </Box>
                                </div>
                                <div className="sidebar-widget duration-widget">
                                    <div className="widget-title">
                                        <h3>Thời gian</h3>
                                    </div>
                                    <div className="widget-content">
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="duration" name="controlled-radio-buttons-group" value={duration}
                                            onChange={handleRadioChange}>
                                                <FormControlLabel value="1" control={<Radio sx={colorRadio} />} label="1 - 2 ngày" />
                                                <FormControlLabel value="2" control={<Radio sx={colorRadio} />} label="2 - 3 ngày" />
                                                <FormControlLabel value="3" control={<Radio sx={colorRadio} />} label="3 - 4 ngày" />
                                                <FormControlLabel value="4" control={<Radio sx={colorRadio} />} label="4 - 5 ngày" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="sidebar-widget review-widget">
                                    <div className="widget-title">
                                        <h3>Điểm đánh giá</h3>
                                    </div>
                                    <div className="widget-content">
                                    <FormControl component="fieldset">
                                            <RadioGroup aria-label="duration" name="controlled-radio-buttons-group" 
                                            value={rate}
                                            onChange={handleRateChange}>
                                                <FormControlLabel value="1" control={<Radio sx={colorRadio} />} label="1 sao" />
                                                <FormControlLabel value="2" control={<Radio sx={colorRadio} />} label="2 sao" />
                                                <FormControlLabel value="3" control={<Radio sx={colorRadio} />} label="3 sao" />
                                                <FormControlLabel value="4" control={<Radio sx={colorRadio} />} label="4 sao" />
                                                <FormControlLabel value="5" control={<Radio sx={colorRadio} />} label="5 sao" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div> */}
                                <div className="advice-widget">
                                    <div className="inner-box"
                                        style={{
                                            backgroundImage: `url(${advice1})`
                                        }}>
                                        <div className="text">
                                            <h2>
                                                Discount <br />
                                                25% for <br />
                                                trips Binh Đinh
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



function RouteItem2 (props) {
    const componentDidMount= () => {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (
            
            <div className="tour-block-two wow fadeInUp animated animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
            >
        
                <div className="inner-box">
                    <figure className="image-box">
                        <img style={{ width: '190px', height: '227px' }}
                            src={about3}
                            // src={props.route.image_path}
                            alt="ImageTrip"
                        />
                        
                        <Link to={`/route-detail/${props.id}`} >
                            <i className="fas fa-link" />
                        </Link>
                    </figure>
                    <div className="content-box">
                        <div className="rating">
                            <span>
                                <i className="fas fa-star" />
                                3
                                {/* {props.tour.rating} */}
                            </span>
                        </div>
                       
                        <h3>
                            <Link to={`/route-detail/${props.id}`} data-toggle="tooltip" title={props.route.id}>
                            <p>{props.name}</p>
                            
                            </Link>
                        </h3>
                        <p>
                            {/* {props.date}  */}
                            250 km
                            <span> 
                                 | Still: 
                                 {/* {props.route.slot}  */}
                                 seat
                            </span>
                        </p>
                        <div className="btn-box">
                            <Link to={`/route-detail/${props.id}`}>See details</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

