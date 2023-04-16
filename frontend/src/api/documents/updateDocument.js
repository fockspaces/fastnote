export const updateDoc = async (updateData, event) => {
  try {
    const { document_id } = updateData;
    console.log("saving notes...");
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/documents/${document_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ updateData, event }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error(error);
  }
};
