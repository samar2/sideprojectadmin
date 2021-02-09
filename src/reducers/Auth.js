// Types
export const SET_USER = "AUTH/SET_USER";

// Function to fire the action in reducer
export const setUser = (data) => ({
  type: SET_USER,
  data,
});

// Thunk function to handle setting the state and calling API's and use it in the screen
export const editUser = (data) => (dispatch, getState) => {
  // let visibility = getState().Auth.;
  dispatch(setUser(data));
};

export default function reducer(
  state = {
    user: {
      name: "Demo User",
      image:
        "http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png",
    },
  },
  action
) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}
