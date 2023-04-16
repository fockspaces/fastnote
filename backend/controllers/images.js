import { uploadToS3 } from "../utils/uploadS3.js";

export const uploadImage = async (req, res) => {
  try {
    const imageNames = [];

    for (const file of req.files) {
      const fileName = await uploadToS3(file);
      imageNames.push(fileName);
    }

    return res.status(200).json({
      message: "Image upload successfully",
      images: imageNames,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading images", error });
  }
};
