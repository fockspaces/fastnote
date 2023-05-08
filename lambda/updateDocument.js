import axios from "axios";

export const updateDocument = async (document_id, updateData, access_token) => {
  console.log(JSON.stringify({ document_id, updateData, access_token }));
  try {
    const response = await axios.post(
      `${process.env.host}/api/documents/${document_id}`,
      { updateData, event: "summary_document" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

export const checkAPI = async (message) => {
  try {
    const response = await axios.get(
      `${process.env.host}/api/lambda?message=${message}`
    );
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};
