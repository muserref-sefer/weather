const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...state,
        weatherState: action.weather
      }
    case 'SET_IS_OPEN_ADD_LOCATION':
      return {
        ...state,
        isOpenAddLocation: action.isOpenAddLocation
      }
    case 'SET_SAVED_LOCATIONS':
      return {
        ...state,
        savedLocations: action.savedLocations
      }
    default:
      return state;
  }
}

export default rootReducer;