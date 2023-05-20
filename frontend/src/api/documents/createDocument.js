export const createDocument = async (document) => {
  const access_token = localStorage.getItem("access_token");
  const response = await fetch(`${process.env.REACT_APP_HOST}/api/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};
