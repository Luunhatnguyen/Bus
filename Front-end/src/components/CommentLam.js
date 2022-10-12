// // import "../static/Comment.css";
// import { AiFillStar } from "react-icons/ai";
// import { GoVerified } from "react-icons/go";
// import { IoIosPaperPlane } from "react-icons/io";
// import { Button, Pagination } from "react-bootstrap";
// import { useContext, useEffect, useState } from "react";
// import Api, { endpoints } from "../configs/Apis";
// import Moment from "react-moment";
// import { memo } from 'react'
// import { UserContext } from "../App";
// import { Navigate, useNavigate } from "react-router";
// import cookies from "react-cookies";
// import React from 'react';


// function Comment(props) {
//   const [ratingClick, setRatingClick] = useState();
//   const [ratingHover, setRatingHover] = useState();
//   const [rating, setRating] = useState([]);
//   const [averagRating, setAverageRating] = useState();
//   const [comments, setComments] = useState([]);
//   const [content, setContent] = useState();
//   // const [user, dispatch] = useContext(UserContext);
//   const navigate = useNavigate();
//   const [checkedUser, setCheckedUser] = useState([]);
//   const [isBooking, setIsBooking] = useState(false);
//   let user = cookies.load('user')




//   useEffect(() => {
//     const loadComments = async () => {
//       const res = await Api.get(
//         endpoints["busroute-comments"](props.busRouteID)
//       );
//       setComments(res.data.reverse());
//     };

//     const loadRating = async () => {
//       const res = await Api.get(
//         endpoints["busroute-ratings"](props.busRouteID)
//       );
//       setRating(res.data);
//       let a = 0;
//       res.data.map(c => {
//         a += c.rate
//       })
//       setAverageRating((a/res.data.length).toFixed(1))
//     };

//     const loadCheckedUser = async () => {
//       const res = await Api.get(
//         endpoints["checked-user"](props.busRouteID)
//       );
//       res.data.map(c => {
//         if (user != null)
//           if(c.id == user.id) {
//             setIsBooking(true);
//           }
//       })
//       setCheckedUser(res.data);
//     };

//     loadComments();
//     loadRating();
//     loadCheckedUser();
//   }, []);

//   const setRatingClickState = (value) => {
//     setRatingClick(value)
//   }

//   const setRatingHoverState = (value) => {
//     setRatingHover(value)
//   }

//   const setContentState = (value) => {
//     setContent(value)
//   }

//   const addComment = async (event) => {
//     event.preventDefault();
//     if (user == null) {
//       alert("Đăng nhập để bình luận")
//       navigate("/Login/");
//     } else {

//       // const resComment = await authApi().post(endpoints["comments"], {
//       //   content: content,
//       //   busroute: props.busRouteID,
//       //   user: user.id,
//       // });
  
//       const resLastComment = await Api.get(endpoints["last-comment"]);
  
//       const idComment = resLastComment.data.id;
  
//       // const resRating = await authApi().post(endpoints["ratings"], {
//       //   busroute: props.busRouteID,
//       //   rate: ratingClick,
//       //   user: user.id,
//       //   comment: idComment,
//       // });
//       setRatingClick(0);
//       setContent("");
//       setComments(comments.reverse())
//       setComments([...comments, resLastComment.data].reverse());
//       setRating([...rating, resRating.data]);
//       let a = 0;
//       rating.map(c => {
//         a += c.rate
//       })
//       a += resRating.data.rate
//       setAverageRating((a/(rating.length+1)).toFixed(1))
//     }
//   };

//   const GetRating = (id) => {
//     let kq;
//     if (rating) {
//       rating.map((c) => {
//         if (c.comment == id) {
//           kq = parseInt(c.rate);
//         }
//       });
//     }
//     return kq;
//   };

//   const RatingList = (list) => {
//     const rateList = []
//     for(var i = 1; i <= list; i++){
//       rateList.push(i)
//     }
//     return rateList.map(c => (
//       <div className="material-icons-wrapper md-16">
//         <AiFillStar />
//       </div>
//     ))
//   };
  
//   function Items({ currentItems }){
//     return(
//       <>
//         {currentItems &&
//           currentItems.map((item) => (
//           <div className="items">
//             <div className="ixChPW review-item-container ">
//               <div className="review-item">
//                 <div className="review-section header">
//                   <img
//                     className="review-avatar lazyloaded"
//                     src={item.user.avatar_path}
//                     alt="review-avatar"
//                     width="40"
//                     height="40"
//                   />
//                   {/* data-src="https://storage.googleapis.com/fe-production/svgIcon/avatar.svg" src="https://storage.googleapis.com/fe-production/svgIcon/avatar.svg" */}
//                   <div className="review-title">
//                     <p className="gbHaVL name color--darkness">
//                       {item.user.first_name} {item.user.last_name}
//                     </p>
//                     <div className="jTwPyK rating-stars-container ">
//                       {RatingList(GetRating(item.id))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="review-section body">
//                   <p
//                     className="base__Body02-sc-1tvbuqk-16 ewOEQO comment color--dark"
//                     style={{ textAlign: "left" }}
//                   >
//                     {item.content}
//                   </p>
//                 </div>
//                 <div
//                   className="review-section footer"
//                   style={{ marginTop: "0" }}
//                 >
//                   <p className="base__Caption-sc-1tvbuqk-18 gJvXJw rated-date color--light-disable">
//                     Đăng ngày <Moment  format="DD/MM/YYYY">{item.updated_date}</Moment>{" "}
//                   </p>
//                   <div className="material-icons-wrapper md-16">
//                     <GoVerified className="color--positive" />
//                     <p className="gJvXJw color--positive">Đã mua vé</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </>
//     )
//   }

//   function Paginate(props) {
//     const page = []

//     for (var i = 0; i < props.pageCount; i++){
//         page.push(i)
//     }
//     return(
//       <Pagination style={{marginTop:"10px", margin:"auto"}}>
//         <Pagination.First onClick={() => props.onPageChange(0)}/>
//       {page.map(p => (
//         <Pagination.Item onClick={() => props.onPageChange(p)}>{p+1}</Pagination.Item>
//       ))}
//         <Pagination.Last onClick={() => props.onPageChange(props.pageCount-1)}/>
//       </Pagination>
//     )
//   }

//   function PaginatedItems({ itemsPerPage }) {
//     const [currentItems, setCurrentItems] = useState(null);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffset, setItemOffset] = useState(0);

//     useEffect(() => {
//       const endOffset = itemOffset + itemsPerPage;
//       setCurrentItems(comments.slice(itemOffset, endOffset));
//       setPageCount(Math.ceil(comments.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);

//     const handlePageClick = (value) => {
//       const newOffset = value * itemsPerPage % comments.length;
//       setItemOffset(newOffset);
//     };

//     return (
//       <>
//         <Items currentItems={currentItems} />
//         {comments.length > itemsPerPage ? 
//           <Paginate pageCount={pageCount} onPageChange={handlePageClick} pageRangeDisplayed={5} itemOffset={itemOffset}/>
//           : ''}
//       </>
//     )
//   }

//   const globalRating = (list) => {
//     const rateList = []
//     for(var i = 1; i <= list; i++){
//       rateList.push(i)
//     }
//     return rateList.map(c => (
//       <img
//         src="https://storage.googleapis.com/vxrd/star_yellow.svg"
//         alt="yellow-icon"
//         className="dnhtJh"
//         style={{ width: "20px", height: "20px" }}
//       />
//     ))
//   }

//   return (
//     <div>
//       {/* Hien thong tin rating */}
//       <div className="rating">
//         <div className="overall-rating">
//           <i aria-label="icon: star" className="anticon anticon-star"></i>
//           <span>{averagRating}</span>
//         </div>
//         <div
//           className="gKWetz star_wrapper"
//           style={{ width: "125px" }}
//         >
//           <img
//             src="https://storage.googleapis.com/vxrd/star_grey.svg"
//             alt="grey-icon"
//             className="dnhtJh"
//             style={{ width: "20px", height: "20px" }}
//           />
//           <img
//             src="https://storage.googleapis.com/vxrd/star_grey.svg"
//             alt="grey-icon"
//             className="dnhtJh"
//             style={{ width: "20px", height: "20px" }}
//           />
//           <img
//             src="https://storage.googleapis.com/vxrd/star_grey.svg"
//             alt="grey-icon"
//             className="dnhtJh"
//             style={{ width: "20px", height: "20px" }}
//           />
//           <img
//             src="https://storage.googleapis.com/vxrd/star_grey.svg"
//             alt="grey-icon"
//             className="dnhtJh"
//             style={{ width: "20px", height: "20px" }}
//           />
//           <img
//             src="https://storage.googleapis.com/vxrd/star_grey.svg"
//             alt="grey-icon"
//             className="dnhtJh"
//             style={{ width: "20px", height: "20px" }}
//           />
//           <div
//             className="hMJCFM"
//             style={{ width: "98%", textAlign:"left" }}
//           >
//             <div style={{ width: "125px" }}>
//               {globalRating(averagRating)}
//             </div>
//           </div>
//         </div>
//         <span>• {comments.length} đánh giá</span>
//       </div>
//       {/* Cho nay comment nehhhhhh */}
//       <div
//         id="moduleComment"
//         data-pagetype="1"
//         data-productid="33485"
//         className="block-comment"
//         style={{ display: "block" }}
//       >
//         <div className="block-comment__box-title">
//           <p
//             id="total_comment"
//             className="totalcomment"
//             style={{ color: "red" }}
//           >
//             Đánh giá chuyến đi
//           </p>
//         </div>
//         <div className="rating-comment">
//           <div
//             className={`${
//               ratingClick >= 1 || ratingHover >= 1
//                 ? "star-comment-selected"
//                 : "star-comment"
//             }`}
//             onMouseOver={() => {
//               setRatingHoverState(1);
//             }}
//             onMouseOut={() => {
//               setRatingHoverState(0);
//             }}
//             onClick={() => {
//               setRatingClickState(1);
//             }}
//           >
//             <AiFillStar />
//           </div>
//           <div
//             className={`${
//               ratingClick >= 2 || ratingHover >= 2
//                 ? "star-comment-selected"
//                 : "star-comment"
//             }`}
//             onMouseOver={() => {
//               setRatingHoverState(2);
//             }}
//             onMouseOut={() => {
//               setRatingHoverState(0);
//             }}
//             onClick={() => {
//               setRatingClickState(2);
//             }}
//           >
//             <AiFillStar />
//           </div>
//           <div
//             className={`${
//               ratingClick >= 3 || ratingHover >= 3
//                 ? "star-comment-selected"
//                 : "star-comment"
//             }`}
//             onMouseOver={() => {
//               setRatingHoverState(3);
//             }}
//             onMouseOut={() => {
//               setRatingHoverState(0);
//             }}
//             onClick={() => {
//               setRatingClickState(3);
//             }}
//           >
//             <AiFillStar />
//           </div>
//           <div
//             className={`${
//               ratingClick >= 4 || ratingHover >= 4
//                 ? "star-comment-selected"
//                 : "star-comment"
//             }`}
//             onMouseOver={() => {
//               setRatingHoverState(4);
//             }}
//             onMouseOut={() => {
//               setRatingHoverState(0);
//             }}
//             onClick={() => {
//               setRatingClickState(4);
//             }}
//           >
//             <AiFillStar />
//           </div>
//           <div
//             className={`${
//               ratingClick == 5 || ratingHover == 5
//                 ? "star-comment-selected"
//                 : "star-comment"
//             }`}
//             onMouseOver={() => {
//               setRatingHoverState(5);
//             }}
//             onMouseOut={() => {
//               setRatingHoverState(0);
//             }}
//             onClick={() => {
//               setRatingClickState(5);
//             }}
//           >
//             <AiFillStar />
//           </div>
//         </div>

//         <div className="block-comment__box-form-comment form-add">
//           <textarea
//             id="review_field"
//             name="detail"
//             rows="4"
//             cols="5"
//             placeholder="Xin mời để lại trải nghiệm và đánh giá của bạn về chuyến đi, chúng tôi luôn cố gắng hết sức để cải thiện chất lượng dịch vụ theo nhu cầu của bạn"
//             className="cps-textarea"
//             value={content}
//             onChange={(evt) => setContentState(evt.target.value)}
//           ></textarea>
//           {isBooking == true ? <Button className="btn-send-cmt" onClick={addComment}>
//             <IoIosPaperPlane />
//             &nbsp;Gửi
//           </Button>:<Button className="btn-send-cmt"style={{cursor: "not-allowed"}}>
//             <IoIosPaperPlane />
//             &nbsp;Gửi
//           </Button>}
          
//           <span
//             id="sub-comment-error"
//             className="comment-error error-text error d-none"
//           >
//             Vui lòng nhập bình luận
//           </span>
//         </div>
//       </div>
//       {/* Cho nay la hien comment */}
//         <PaginatedItems itemsPerPage={5} />
//     </div>
//   );
// }

// export default memo(Comment);
