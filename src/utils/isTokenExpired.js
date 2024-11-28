import { jwtDecode } from "jwt-decode";
export function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return false;
  } catch (e) {
    return true;
  }
}
