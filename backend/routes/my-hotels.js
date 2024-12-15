import express from "express";
const router = express.Router();
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.model.js";
import verifyToken from "../middleware/auth.js";
import { body, check, validationResult } from "express-validator";
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, // 5 mb
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("price Per Night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities  is required"),
  ],
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newHotels = req.body;

      // upload the cloudinary
      const imageUrls = await uploadImages(imageFiles);
      // if upload sucessfull and the url to the new url

      newHotels.imageUrls = imageUrls;
      newHotels.lastUpdated = new Date();
      newHotels.userId = req.userId;

      const hotel = new Hotel(newHotels);
      // save hotels
      await hotel.save();
      res.status(200).send(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log("Error creating hotel ", error);
    }
  }
);

// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is missing" });
//     }
//     const hotels = await Hotel.find({ userId });
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong !" });
//   }
// });

router.get("/", verifyToken, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const hotels = await Hotel.find({
      _id: id,
      userId: req.userId,
    });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req, res) => {
    try {
      const updateHotel = req.body;
      updateHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updateHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      const files = req.files;

      const updatedImageUrl = await uploadImages(files);

      hotel.imageUrls = [...updatedImageUrl, ...(updateHotel || [])];

      await hotel.save();
      res.status(200).send(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    // convert image into base 64
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
