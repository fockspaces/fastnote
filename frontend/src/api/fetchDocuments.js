export const fetchDocuments = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(`http://127.0.0.1:8000/api/documents`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Could not fetch document");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
