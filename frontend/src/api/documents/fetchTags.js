export const fetchTags = async () => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/documents/tags`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
