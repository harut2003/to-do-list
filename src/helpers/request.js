function request(url, method = "GET", body) {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then(async (res) => {
      const result = await res.json();
      if (res.status >= 400) {
        if (result.error) {
          throw result.error;
        } else {
          throw new Error("Something went wrong");
        }
      }
      return result;
    })
    
}

export default request;
