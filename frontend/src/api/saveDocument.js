export const saveDocument = async (document, is_new) => {
  try {
    let { title, tags = [], content } = document;
    if (!tags.length || is_new) {
      tags = await generateTags(document);
    }
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/api/documents/${document._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          document,
        }),
      }
    );

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

const generateTags = async () => {
  return ["default tag"];
};
