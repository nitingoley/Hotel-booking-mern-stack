import express from "express";
const router = express.Router();
import Hotel from "../models/hotel.model.js";

router.get("/search", async (req, res) => {
  try {
    const pageSize = 3;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotel = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();

    const response = {
      data: hotel,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Error", error);
  }
});

export default router;
