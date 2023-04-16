export const uploadImage = async (file) => {
  const access_token = localStorage.getItem("access_token");

  const formData = new FormData();
  formData.append("images", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/images", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    if (data && data.images && data.images.length > 0) {
      return data.images[0]; // Return the first image URL from the response
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
