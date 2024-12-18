import { SignInFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";

export interface HotelType {
  _id: string;
  name: string;
  city: string;
  description: string;
  country: string;
  type: string;
  pricePerNight: number;
  adultCount: number;
  childCount: number;
  starRating: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Error fetching hotels:", errorBody); // Log the error response body
    throw new Error(
      `Error fetching hotels: ${errorBody.message || "Unknown error"}`
    );
  }

  return response.json();
};

export const fetchHotelsById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotel by id");
  }
  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams) => {
  const queryParmas = new URLSearchParams();
  queryParmas.append("destination", searchParams.destination || "");
  queryParmas.append("checkIn", searchParams.checkIn || "");
  queryParmas.append("checkOut", searchParams.checkOut || "");
  queryParmas.append("adultCount", searchParams.adultCount || "");
  queryParmas.append("childCount", searchParams.childCount || "");
  queryParmas.append("page", searchParams.page || "");

  // sorting logic here

  queryParmas.append("maxPrice", searchParams.maxPrice || "");
  queryParmas.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParmas.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParmas.append("types", type));
  searchParams.stars?.forEach((star) => queryParmas.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParmas}`
  );

  if (!response.ok) {
    throw new Error("Error for fetching hotels");
  }

  return response.json();
};

// search hotel details by id
export const SearchHotelDetails = async (
  hotelId: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

  if (!response.ok) {
    throw new Error("Error for fetching hotels");
  }

  return response.json();
};
