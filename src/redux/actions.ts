export const SETUSER = "SetUser";
export const GETUSER = "GetUser";

export const setuser = (value: any) => ({ type: SETUSER, payload: value });
export const getuser = () => ({ type: GETUSER });

// export const Login = "login";
// export const Logout = "logout";
// export const ViewTimeTable = "viewtimetable";
// export const Attendance = "attendance";

// export const fetchPostsRequest = () => ({
//     type: 'FETCH_POSTS_REQUEST',
//   });

//   export const fetchPostsSuccess = (posts: any) => ({
//     type: 'FETCH_POSTS_SUCCESS',
//     payload: posts,
//   });

//   export const fetchPostsFailure = (error: any) => ({
//     type: 'FETCH_POSTS_FAILURE',
//     payload: error,
//   });

//   // Thunk action to fetch posts
//   export const fetchPosts = () => {
//     return (dispatch: any) => {
//       // Dispatch request action
//       dispatch(fetchPostsRequest());

//       // Simulate API call
//       fetch('https://jsonplaceholder.typicode.com/posts')
//         .then((response) => response.json())
//         .then((data) => {
//           // Dispatch success action with data
//           dispatch(fetchPostsSuccess(data));
//         })
//         .catch((error) => {
//           // Dispatch failure action with error message
//           dispatch(fetchPostsFailure(error.message));
//         });
//     };
//   };
