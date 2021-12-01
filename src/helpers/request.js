import { getToken } from "./auth";

async function request(url, method = "GET", body) {
  let token = await getToken();

  console.log(token);
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config).then(async (res) => {
    const result = await res.json();
    if (res.status >= 400) {
      if (result.errors || result.error || result.message) {
        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else if (result.error) {
          throw new Error(result.error.message);
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error("Something went wrong");
      }
    }
    return result;
  });
}

export default request;
