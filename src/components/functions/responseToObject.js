const responseToObject = async(response) => {
    return {
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        body: await response.clone().text(),
        url: response.url
    }
}

export default responseToObject;