interface params {
  [key: string]: string;
}

async function request(location: string, params: params) {
  const baseUrl = "https://api.cucourses.uuunnniii.com/v1";
  const url = `${baseUrl}${location}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  for (const key in params) {
    urlencoded.append(key, params[key]);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    return error;
  }
}

export { request };
