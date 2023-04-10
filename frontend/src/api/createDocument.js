export const createDocument = async () => {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch('http://127.0.0.1:8000/api/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'New Document' })
    });
    
    if (!response.ok) {
      throw new Error("Could not create document");
    }
    
    const data = await response.json();
    return data;
  };
  