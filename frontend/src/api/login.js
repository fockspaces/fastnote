export const login = async (access_token) => {
  try {
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
    // Store the access token in localStorage
    localStorage.setItem("access_token", responseData.access_token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
