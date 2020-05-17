const initialState = { favoritesImage: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteImageIndex = state.favoritesImage.findIndex(item => item.id === action.value.id)
      if (favoriteImageIndex !== -1) {
        nextState = {
          ...state,
          favoritesImage: state.favoritesImage.filter( (item, index) => index !== favoriteImageIndex)
        }
      }
      else {
        nextState = {
          ...state,
          favoritesImage: [...state.favoritesImage, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite