export const setWeather = weather => ({
  type: 'SET_WEATHER',
  weather
});

export const setIsOpenAddLocation = isOpenAddLocation => ({
  type: 'SET_IS_OPEN_ADD_LOCATION',
  isOpenAddLocation
});

export const setSavedLocations = savedLocations => ({
  type: 'SET_SAVED_LOCATIONS',
  savedLocations
});