export const logDevError = (error, errorSource) => {
  if (__DEV__) {
    let message;
    if (typeof error === 'object') {
      message = error.message;
    } else {
      message = error;
    }
    // eslint-disable-next-line no-console
    console.trace(`Dev error from ${errorSource}: `, message);
  }
};

export const logErrorWithMessage = (message, errorSource) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.trace('Sentry Log', message, errorSource);
  } /*else {
    if (typeof message === 'object') {
      // If someone inadvertently passes an object
      message = message.message;
    }
    // todo sentry
  }*/
};

// all axios catch block should call this logger wrapper
export const logApiError = (error, errorSource) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.trace(error, errorSource);
  } /*else {
    if (typeof error === 'object') {
      // Not catching Network Error
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;

        // not catching auth errors because it hits our paid sentry account
        if (statusCode === 401 || statusCode === 403) {
          return;
        }

        // todo sentry
      }
    }
  }*/
};
