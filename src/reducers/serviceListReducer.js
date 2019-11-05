const initState = {
  serviceItems: [
    {
      id: 1,
      name: 'Любовь с мужчиной',
      price: 800,
      content: 'незабываемый Виктор',
      deleting: false,
    },
    {
      id: 2,
      name: 'Хитрый салат',
      price: 1800,
      content: 'не в рот а в глаз',
      deleting: false,
    },
  ],
  loading: false,

  error: null
}

export default function serviceListReducer(state = initState, action) {
  if (action.type === 'LOADING_DATA') {
    return { ...state, loading: action.isLoading }
  }

  if (action.type === 'DELETING_SERVICE') {
    const services = [... state.serviceItems];
    let deletingService = services.find(el => el.id === action.isDeleting.id);
    deletingService.deleting = true;

    return { ...state, services}
  }

  if (action.type === 'SERVICES_RECIVED') {
    return { ...state, serviceItems: action.services }
  }

  if (action.type === 'HAS_ERROR') {
    return { ...state, error: action.error }
  }

  return state
}