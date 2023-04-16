export const uploadImage = async (req, res) => {
  const imageNames = req.files.map((file) => file.filename);
  res
    .status(200)
    .json({ message: "Image upload successfully", images: imageNames });
};
