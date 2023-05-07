export const updateTag = async (oldTagName, newTagName) => {
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/documents/tags`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ oldTagName, newTagName }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update the tag");
    }

    const data = await response.json();
    console.log("Tag updated successfully:", data.message);
    return true;
  } catch (error) {
    console.error("Error updating tag:", error.message);
    return false;
  }
};
