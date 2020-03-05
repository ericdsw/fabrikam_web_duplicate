
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const toggleDarkMode = isDarkMode => dispatch => {
  dispatch({
    type: TOGGLE_DARK_MODE,
    payload: { isDarkMode }
  })
}

export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const toggleDrawer = isDrawerOpen => dispatch => {
  dispatch({
    type: TOGGLE_DRAWER,
    payload: { isDrawerOpen }
  })
}

export const SHOW_GLOBAL_ERROR_MESSAGE = "SHOW_GLOBAL_ERROR_MESSAGE";
export const showGlobalErrorMessage = message => dispatch => {
  dispatch({
    type: SHOW_GLOBAL_ERROR_MESSAGE,
    payload: { message }
  })
}

export const SHOW_GLOBAL_SUCCESS_MESSAGE = "SHOW_GLOBAL_SUCCESS_MESSAGE";
export const showGlobalSuccessMessage = message => dispatch => {
  dispatch({
    type: SHOW_GLOBAL_ERROR_MESSAGE,
    payload: { message }
  })
}

export const SHOW_GLOBAL_MESSAGE = "SHOW_GLOBAL_MESSAGE";
export const showGlobalMessage = message => dispatch => {
  dispatch({
    type: SHOW_GLOBAL_MESSAGE,
    payload: { message }
  });
}