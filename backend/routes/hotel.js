import express from "express";
const router = express.Router();
import Hotel from "../models/hotel.model.js";

// router.get("/search", async (req, res) => {
//   try {
//     const query = constructSearchQuery(req.query);

//     let sortOptions = {};
//     switch (req.query.sortOption) {
//       case "starRating":
//         sortOptions = { starRating: -1 };
//         break;
//       case "pricePerNightAsc":
//         sortOptions = { pricePerNight: 1 };
//         break;
//       case "pricePerNightDesc":
//         sortOptions = { pricePerNight: -1 };
//         break;
//     }


//     const pageSize = 3;
//     const pageNumber = parseInt(
//       req.query.page ? req.query.page.toString() : "1"
//     );
//     const skip = (pageNumber - 1) * pageSize;
//     const hotel = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
//     const total = await Hotel.countDocuments(query);

//     const response = {
//       data: hotel,
//       pagination: {
//         total,
//         pages: Math.ceil(total / pageSize),
//       },
//     };
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log("Error", error);
//   }
// });

// const constructSearchQuery = (queryParams) => {
//   let constructedQuery = {};

//   if (queryParams.destination) {
//     constructedQuery.$or = [
//       { city: new RegExp(queryParams.destination, "i") },
//       { country: new RegExp(queryParams.destination, "i") },
//     ];
//   }

//   if (queryParams.adultCount) {
//     constructedQuery.adultCount = {
//       $gte: parseInt(queryParams.adultCount),
//     };
//   }

//   if (queryParams.childCount) {
//     constructedQuery.childCount = {
//       $gte: parseInt(queryParams.childCount),
//     };
   
//   }


//   if (queryParams.facilities) {
//     constructedQuery.facilities = {
//        $all: Array.isArray(queryParams.facilities)
//        ? queryParams.facilities
//        : [queryParams.facilities],
//     };
//   };



//   if (queryParams.types) {
//     constructedQuery.types = {
//        $in: Array.isArray(queryParams.types)
//        ? queryParams.types
//        : [queryParams.types],
//     };
//   };




//    if(queryParams.stars) {
//     const starRating = Array.isArray(queryParams.stars)
//      ? queryParams.stars.map((star)=> parseInt(star))
//      : parseInt(queryParams.stars);

//      constructedQuery.starRating = {$in: starRating};
//    }


//    if(queryParams.maxPrice) {
//     constructedQuery.pricePerNight = {
//       $lte: parseInt(queryParams.maxPrice).toString(),
//     }
//    }
//    return constructedQuery;
// };



// const constructSearchQuery = (queryParams) => {
//   let constructedQuery = {};

//   if (queryParams.destination) {
//     constructedQuery.$or = [
//       { city: new RegExp(queryParams.destination, "i") },
//       { country: new RegExp(queryParams.destination, "i") },
//     ];
//   }

//   if (queryParams.adultCount) {
//     constructedQuery.adultCount = {
//       $gte: parseInt(queryParams.adultCount),
//     };
//   }

//   if (queryParams.childCount) {
//     constructedQuery.childCount = {
//       $gte: parseInt(queryParams.childCount),
//     };
//   }

//   if (queryParams.facilities) {
//     constructedQuery.facilities = {
//       $all: Array.isArray(queryParams.facilities)
//         ? queryParams.facilities
//         : [queryParams.facilities],
//     };
//   }

//   if (queryParams.types) {
//     constructedQuery.type = {
//       $in: Array.isArray(queryParams.types)
//         ? queryParams.types
//         : [queryParams.types],
//     };
//   }

//   if (queryParams.stars) {
//     const starRating = Array.isArray(queryParams.stars)
//       ? queryParams.stars.map((star) => parseInt(star))
//       : [parseInt(queryParams.stars)];

//     constructedQuery.starRating = { $in: starRating };
//   }

//   if (queryParams.maxPrice) {
//     constructedQuery.pricePerNight = {
//       $lte: parseInt(queryParams.maxPrice),
//     };
//   }

//   return constructedQuery;
// };

// router.get("/search", async (req, res) => {
//   try {
//     const query = constructSearchQuery(req.query);

//     let sortOptions = {};
//     switch (req.query.sortOption) {
//       case "starRating":
//         sortOptions = { starRating: -1 };
//         break;
//       case "pricePerNightAsc":
//         sortOptions = { pricePerNight: 1 };
//         break;
//       case "pricePerNightDesc":
//         sortOptions = { pricePerNight: -1 };
//         break;
//     }

//     const pageSize = 3;
//     const pageNumber = parseInt(
//       req.query.page ? req.query.page.toString() : "1"
//     );
//     const skip = (pageNumber - 1) * pageSize;

//     const hotels = await Hotel.find()
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(pageSize);

//     const total = await Hotel.countDocuments( );

//     const response = {
//       data: hotels,
//       pagination: {
//         total,
//         pages: Math.ceil(total / pageSize),
//       },
//     };

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log("Error:", error);
//   }
// });


router.get("/search", async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
      default:
        sortOptions = { pricePerNight: 1 }; 
    }

    const pageSize = 3;
    const pageNumber = parseInt(req.query.page || "1", 10);
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);
 

    const response = {
      query, 
      data: hotels,
      pagination: {
        total,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error("Error:", error);
  }
});

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice),
    };
  }

  return constructedQuery;
};

export default router;
