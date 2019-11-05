const initState = {
  service: {
    id: '1',
    name: 'Ужин с хирургом',
    price: '2500',
    content: 'Без приставаний'
  },
  loading: false,
  saving: false,
  error: null
}


export default function editServiceReducer(state = initState, action) {

  if (action.type === 'LOADING_SERVICE') {
    return { ...state, loading: action.isLoading }
  }

  if (action.type === 'POST_SERVICE') {
    return { ...state, saving: action.isPosting }
  }

  if (action.type === 'SERVICE_RECIVED') {
    return { ...state, service: action.service }
  }

  if (action.type === 'SERVICE_HAS_ERROR') {
    return { ...state, error: action.error }
  }

  if (action.type === 'CHANGE_INPUT_VALUE') {
    const service = { ...state.service }
    const { name, value } = action.payload;
    service[name] = value;
    return { ...state, service }
  }

  return state
}
