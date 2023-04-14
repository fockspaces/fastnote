export const login = async (access_token) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/users/signin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    const responseData = await response.json();
    // Store the access token in localStorage
    localStorage.setItem("access_token", responseData.access_token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    window.location.href = "/profile";
  } catch (error) {
    console.error(error);
  }
};
