const safeReplace = (url, searchValue, replaceValue) => {
    if (!url || typeof url !== "string") return "";
    return url.replace(searchValue, replaceValue);
  };
  
  export const getResponsiveImageUrl = (imageUrl, width = 150) => {
    return safeReplace(imageUrl, "/upload/", `/upload/w_${width}/`);
  };
  
  export const getOptimizedImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.warn("getOptimizedImageUrl: imageUrl is undefined or empty.");
      return "";
    }
    return imageUrl.replace("/upload/", "/upload/f_auto,q_auto/");
  };
  
  