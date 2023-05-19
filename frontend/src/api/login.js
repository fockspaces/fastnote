export const login = async (access_token, provider) => {
  let responseData;
  try {
    if (provider === "guest") responseData = await guestLogin();
    else responseData = await googleLogin(access_token);

    // Store the access token in localStorage
    localStorage.setItem("access_token", responseData.access_token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

export const guestLogin = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/api/users/guests`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  const responseData = await response.json();
  return responseData;
};

const googleLogin = async (access_token) => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/api/users/signin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }
  const responseData = await response.json();
  return responseData;
};
