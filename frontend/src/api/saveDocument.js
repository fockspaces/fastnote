export const saveDocument = async (title, tags = [], content) => {
  try {
    console.log({ title, tags, content });
    const access_token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        title,
        tags: tags,
        contnet,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error(error);
  }
};

const generateTags = async () => {};
