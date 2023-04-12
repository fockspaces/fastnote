export const fetchDocuments = async (queryString) => {
  try {
    console.log(queryString);
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/api/documents?${queryString}`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not fetch document");
    }
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
