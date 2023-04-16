const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Upload your image to your server or any file storage service (e.g., Amazon S3, Cloudinary, etc.)
  // For the example, let's assume you have a function called `uploadImage` that returns the URL of the uploaded image
  const imageUrl = await uploadImage(file);

  if (imageUrl) {
    // Insert the image at the current position in the editor
    editor.chain().focus().setImage({ src: imageUrl }).run();
  }
};

export default handleImageUpload;
