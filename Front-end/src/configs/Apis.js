import axios from 'axios'
import cookies from 'react-cookies'

export let endpoints = {
    // 'tours': '/tours/',
    // 'tour-details': (tourId) => `/tours/${tourId}/`,
    // 'add-comment-tour': (tourId) => `/tours/${tourId}/add-comment/`,
    // 'tour-comments': (tourId) => `/tours/${tourId}/comments/`,
    // 'update-slots': (tourId) => `/tours/${tourId}/update-slots/` ,
    // 'categories': '/categories/',
    // 'services': '/services/',
    // 'customers': '/customers/',
    // 'articals': '/articals/',
    // 'artical-details': (articalId) => `/articals/${articalId}/`,
    // 'like': (articalId) => `/articals/${articalId}/like/`,
    // 'payers': '/payers/',
    // 'get-payer': (payerId) => `/payers/${payerId}`,
    
    // 'rating': (tourId) => `/tours/${tourId}/rating/`,

    'users': '/users/',
    'change-password': '/users/change-password/',
    'forgot-password': '/reset-password/',
    'verify-token': '/reset-password/validate_token/',
    'reset-password': '/reset-password/confirm/',
    'current-user': '/users/current-user/',
    'login': '/o/token/',
    'oauth2-info': '/oauth2-info/',

    "router": "/routes/",
    "buss": "/buss/",
    'bus-details': (busId) => `/buss/${busId}/`,
    'bus-comments': (busId) => `/buss/${busId}/comments/`,
    'add-comment-bus': (busId) => `/buss/${busId}/add-comment/`,
    "time-table": "/timetables/",
    "time-table-detail": (timetableID) =>`/timetables/${timetableID}`,
    "type-bus": "/typebuss/",
    "route-detail": (routerId) => `/routes/${routerId}/`,
    "seats": (typebusID) => `/typebuss/${typebusID}/seat/`,
    'seat-detail': (seatId) =>`/seats/${seatId}/`,
    "bookings": (timetableID) => `/timetables/${timetableID}/booking/`,
    "booking-detail": (bookingID) => `/bookings/${bookingID}/booking-detail/`,
    'city': '/city/',
    "timetable-detail": (timetableID) => `/timetables/${timetableID}/garage/`,
    'booking': "/bookings/",
    'booking-history': "/bookinghistorys/",
    'seat-booking-detail': (timetableID) => `/timetables/${timetableID}/bookingdetails/`,
    'bookingdetails': '/bookingdetails/',
    'last-booking': '/bookings/last-book/',
    'booking-history': '/bookinghistorys/',
    "like-busroute": (busrouteId) => `/busroutes/${busrouteId}/like/`,
    "busroute-comments": (busrouteId) => `/busroutes/${busrouteId}/comments/`,
    "ratings": "/ratings/",
    "busroute-ratings": (busrouteId) => `/busroutes/${busrouteId}/get-rating/`,
    "comments": "/comments/",
    'last-comment': '/busroutes/last-comment/',
    "checked-user": (busrouteId) => `/busroutes/${busrouteId}/checked-user/`,
    "garages": "/garages/",
    "garages-detail": (garagesId) =>`/garages/${garagesId}`,
    "facebook-access": "/social_auth/facebook/",
    "google-access": "/social_auth/google/",
    "momo": "/momo/request_momo/",
    "return-momo": "/momo/return-momo/",
    "booking-pending": (userID) => `/bookings/booking_pending/?userID=${userID}`,
    "history-find-by-bookingID": (bookingID) => `/bookinghistorys/find_by_bookingID/?bookingID=${bookingID}`,
    "bookingID": (bookingID) => `/bookings/${bookingID}`,
}
export const authApi = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
    })
}
export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})