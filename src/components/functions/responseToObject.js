const responseToObject = (response, body) => {
    return {
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        body,
        url: response.url
    }
}

export default responseToObject;