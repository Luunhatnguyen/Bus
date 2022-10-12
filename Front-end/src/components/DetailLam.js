import { useState } from "react";
import { Carousel } from "react-bootstrap";
// import "../static/Detail.css";
import React from 'react';
function Detail() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ width: "100%", height: "225px" }}
      >
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="../../images/1.jpg"
            alt="First slide"
            style={{ height: "225px", margin: "0" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="../../images/2.jpg"
            alt="Second slide"
            style={{ height: "225px", margin: "0" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="../../images/3.jpg"
            alt="Third slide"
            style={{ height: "225px", margin: "0" }}
          />
        </Carousel.Item>
      </Carousel>
      <div
        className="ant-row Facilities__FacilityRow-sc-1s5e1kk-0 kdToPD"
        style={{ marginLeft: "-8px", marginRight: "-8px" }}
      >
        <div className="facility-des-container">
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1610093076560.png"
                alt="An toàn mùa Covid-19"
              />
              <div className="name">An toàn mùa Covid-19</div>
            </div>
            <div className="description">
              <p>
                Là chương trình bảo vệ an toàn cho hành khách sử dụng dịch vụ
                của VeXeRe trong mùa dịch Covid. VeXeRe đồng hành các nhà xe đối
                tác triển khai biện pháp bảo vệ an toàn cho hành khách, như sau:
              </p>
              <p>(1) Kiểm tra thân nhiệt hành khách trước khi lên xe;</p>
              <p>(2) Trang bị nước rửa tay;</p>
              <p>
                (3) Có đảm bảo khuyến cáo tất cả hành khách đeo khẩu trang khi
                lên xe;
              </p>
              <p>(4) Có thực hiện khử trùng xe;</p>
              <p>(5) Tài xế và nhân viên đã được tiêm vắc xin</p>
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837216356.png"
                alt="Toilet"
              />
              <div className="name">Toilet</div>
            </div>
            <div className="description">Nhà vệ sinh trên xe</div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1610093097657.png"
                alt="Gối ôm"
              />
              <div className="name">Gối ôm</div>
            </div>
            <div className="description">
              Nhà xe có trang bị gối ôm cho hành khách
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837352707.png"
                alt="Đèn đọc sách"
              />
              <div className="name">Đèn đọc sách</div>
            </div>
            <div className="description">
              Hỗ trợ hành khách đọc sách dễ dàng và an toàn khi ngồi trên xe
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609838042285.png"
                alt="Dây đai an toàn"
              />
              <div className="name">Dây đai an toàn</div>
            </div>
            <div className="description">
              Trên xe có trang bị dây đai an toàn cho hành khách khi ngồi trên
              xe
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837974706.png"
                alt="Xe trung chuyển"
              />
              <div className="name">Xe trung chuyển</div>
            </div>
            <div className="description">
              Nhà xe có xe trung chuyển đón khách tận nơi tại nhà/khách sạn
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837962216.png"
                alt="Khử trùng xe"
              />
              <div className="name">Khử trùng xe</div>
            </div>
            <div className="description">
              Nhà xe có thực hiện phun khử trùng Nano Bạc lên xe nhằm bảo vệ an
              toàn cho hành khách mùa Covid
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837921462.png"
                alt="Nước rửa tay"
              />
              <div className="name">Nước rửa tay</div>
            </div>
            <div className="description">
              Nhà xe có trang bị nước rửa tay diệt khuẩn trước khi lên xe và
              trong xe
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837906714.png"
                alt="Đo thân nhiệt"
              />
              <div className="name">Đo thân nhiệt</div>
            </div>
            <div className="description">
              Hành khách sẽ được đo thân nhiệt trước khi lên xe để xác định
              không nghi nhiễm/ lan truyền vi rút Covid cho hành khách khác.
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1609837896898.png"
                alt="Khuyến cáo đeo khẩu trang"
              />
              <div className="name">Khuyến cáo đeo khẩu trang</div>
            </div>
            <div className="description">
              Có đảm bảo khuyến cáo tất cả hành khách đeo khẩu trang khi lên xe
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1610093150480.png"
                alt="Nước uống"
              />
              <div className="name">Nước uống</div>
            </div>
            <div className="description">
              Nhà xe có phục vụ nước cho hành khách{" "}
            </div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1610093127922.png"
                alt="Gối nằm"
              />
              <div className="name">Gối nằm</div>
            </div>
            <div className="description">Trên xe có trang bị gối nằm</div>
          </div>
          <div className="line"></div>
          <div className="facility-description">
            <div className="img-name">
              <img
                src="//static.vexere.com/production/utilities/1610093115226.png"
                alt="Búa phá kính"
              />
              <div className="name">Búa phá kính</div>
            </div>
            <div className="description">
              Dùng để phá kính ô tô thoát hiểm trong trường hợp khẩn cấp.
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1609837175400.png"
                alt="Tivi LED"
              />
              <div className="name">Tivi LED</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1609837338878.png"
                alt="Sạc điện thoại"
              />
              <div className="name">Sạc điện thoại</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1610093201933.png"
                alt="Rèm cửa"
              />
              <div className="name">Rèm cửa</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1610093169649.png"
                alt="Chăn đắp"
              />
              <div className="name">Chăn đắp</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1609837875569.png"
                alt="Wifi"
              />
              <div className="name">Wifi</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1609837782107.png"
                alt="Điều hòa"
              />
              <div className="name">Điều hòa</div>
            </div>
          </div>
          <div
            className="ant-col ant-col-8"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
          >
            <div className="facility">
              <img
                src="//static.vexere.com/production/utilities/1610093184385.png"
                alt="Khăn lạnh"
              />
              <div className="name">Khăn lạnh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
