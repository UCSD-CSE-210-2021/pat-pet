export const sendPostRequest = async (route, requestObj, tip="") => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}${route}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(requestObj)
      }
    );
    const responseText = await response.text();
    if (response.status !== 200) {
      throw new Error(
        `${tip}=>request failed: ${
        response.status === 500 ? "server error" : responseText
        }`
      );
    }
    return JSON.parse(responseText);
  };


  export const sendGetRequest = async (route, tip="") => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}${route}`,
      {
        method: "GET"
      }
    );
    const responseText = await response.text();
    if (response.status !== 200) {
      throw new Error(
        `${tip}=>request failed: ${
        response.status === 500 ? "server error" : responseText
        }`
      );
    }
    return JSON.parse(responseText);
  };