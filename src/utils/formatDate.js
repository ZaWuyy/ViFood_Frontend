export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  };
  