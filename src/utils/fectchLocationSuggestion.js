import axios from "axios";

export const fetchLocationSuggestions = async (input) => {
  if (!input || input.trim() === "") {
    console.warn("Input is empty. Skipping API call.");
    return [];
  }

  try {
    const response = await axios.get(`https://api.locationiq.com/v1/autocomplete`, {
      params: {
        key: process.env.REACT_APP_LOCATIONIQ_APIKEY,
        q: input,
        countrycodes: "VN",
        limit: 5,
      },
    });

    if (Array.isArray(response.data)) {
      return response.data.map((location, index) => ({
        description: location.display_name || "Unknown location",
        id: `${location.place_id}-${index}`,
      }));
    } else {
      console.warn("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching location suggestions:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    return [];
  }
};
