import { SETUSER, GETUSER } from "./actions";

const initialStateRolesInfo = {
  email: "",
  roles: [],
};

export const RolesInfoReducer = (
  state = initialStateRolesInfo,
  action: { type: any; payload: any },
) => {
  // debugger
  if (action.type == SETUSER) {
    return {
      ...state,
      email: action.payload.email,
      roles: action.payload.roles,
    };
  } else if (action.type == GETUSER) {
    return {
      email: state.email,
      roles: state.roles,
    };
  } else {
    return state;
  }
};

// const initialState = {
//   token: "",
//   permission: [],
// };

// const initialtimetable = {
//   name: "",
//   teacher_id: "",
//   classroom_id: "",
//   grade: "",
//   section: "",
//   timetable_id: "",
//   day: "",
//   time: "",
//   subject: "",
// };

// const initialStateforReducer = {
//   loading: false,
//   posts: [],
//   error: '',
// }

// export const postsReducer  = (state = initialStateforReducer, action:{ type: any; payload: any }) => {
//   switch (action.type){
//     case 'FETCH_POSTS_REQUEST':
//       return { ...state, loading :true}
//      case "FETCH_POSTS_SUCCESS":
//      return { ...state, loading :false ,posts: action.payload}
//      case "FETCH_POSTS_FAILURE":
//       return { ...state, loading :false ,error: action.payload}
//       default:
//         return state;
//   }
// }

// export const rootReducer = (
//   state = initialState,
//   action: { type: any; payload: any },
// ) => {
//   // debugger
//   switch (action.type) {
//     case "login":
//       // debugger
//       return {
//         ...state,
//         token: action.payload.token,
//         permission: action.payload.permission,
//       };
//     case "logout":
//       return {
//         ...state,
//         token: "",
//         permission: [],
//       };
//     default:
//       return state;
//   }
// };

// export const timetablereducer = (
//   state = initialtimetable,
//   action: { type: any; payload: any },
// ) => {
//   // debugger
//   switch (action.type) {
//     case "viewtimetable":
//       // debugger
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const attendanceReducer = (
//   state = {},
//   action: { type: any; payload: any },
// ) => {
//   // debugger
//   switch (action.type) {
//     case "attendance":
//       // debugger
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;
