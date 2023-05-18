import { login } from "./login";

export const authGoogle = async (code) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/users/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    const responseData = await response.json();
    const access_token = responseData.id_token;
    return await login(access_token);
  } catch (error) {
    console.error(error);
  }
};