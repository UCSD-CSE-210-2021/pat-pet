export const sendPostRequest = async (endpoint, requestObj, tip="") => {
    const response = await fetch(
      `http://localhost:8080/${endpoint}`,
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