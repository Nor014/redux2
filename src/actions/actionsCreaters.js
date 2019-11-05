export function isLoading(bool) {
  return { type: 'LOADING_DATA', isLoading: bool }
}

export function servicesFetchSuccess(items) {
  return { type: 'SERVICES_RECIVED', services: items }
}

export function fetchHasError(message) {
  return { type: 'HAS_ERROR', error: message }
}

export function serviceIsLoading(bool) {
  return { type: 'LOADING_SERVICE', isLoading: bool }
}

export function fetchServiceSuccess(item) {
  return { type: 'SERVICE_RECIVED', service: item }
}

export function fetchServiceHasError(message) {
  return { type: 'SERVICE_HAS_ERROR', error: message }
}

export function deletingService(bool, id) {
  return { type: 'DELETING_SERVICE', isDeleting: { bool, id } }
}

export function savingService(bool) {
  return { type: 'POST_SERVICE', isPosting: bool }
}


export const fetchServicesData = (url) => {
  return (dispatch) => {
    dispatch(isLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) { throw Error(response.statusText) }
        dispatch(isLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((services) => dispatch(servicesFetchSuccess(services)))
      .catch((e) => {
        dispatch(isLoading(false));
        dispatch(fetchHasError(e.message))
      });
  }
}

export const deleteServicesData = (url, id) => {
  return (dispatch) => {
    dispatch(deletingService(true, id));

    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) { throw Error(response.statusText); }

        return response;
      })
      .then(() => {
        dispatch(fetchServicesData('http://localhost:7070/api/services'))
      })
      .catch((e) => {
        dispatch(fetchHasError(e.message))
      });
  }
}

export const fetchService = (url) => {
  return (dispatch) => {
    dispatch(serviceIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) { throw Error(response.statusText) }

        dispatch(serviceIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((service) => dispatch(fetchServiceSuccess(service)))
      .catch((e) => {
        dispatch(serviceIsLoading(false));
        dispatch(fetchServiceHasError(e.message))
      });
  }
}

export const postService = (url, service) => {
  return (dispatch) => {
    dispatch(savingService(true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(service)
    })
      .then((response) => {
        if (!response.ok) { throw Error(response.statusText) }
        dispatch(savingService(false));
        document.location.href = '/services'
        return response;
      })
      .catch((e) => {
        dispatch(savingService(false));
        dispatch(fetchServiceHasError(e.message))
      });
  }
}


