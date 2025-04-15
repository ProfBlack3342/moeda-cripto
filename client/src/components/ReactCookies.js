import { useState, useEffect } from "react";

function UseCookie(cookieName) {

    const DAYS_TO_EXPIRE = 1
    const EXPIRATION_DATE = new Date();
    EXPIRATION_DATE.setDate(EXPIRATION_DATE.getDate() + DAYS_TO_EXPIRE);

    const getDocumentCookie = () => {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
      return cookie ? cookie.split("=")[1] : "";
    };

    const [cookieValue, setCookieValue] = useState(getDocumentCookie());

    useEffect(() => {
      setCookieValue(getDocumentCookie());
    }, [cookieName]);

    const setCookie = (value) => {
      document.cookie = `${cookieName}=${value}; expires=${EXPIRATION_DATE.toUTCString()}; path=/`;
    };

    const deleteCookie = () => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    return [cookieValue, setCookie, deleteCookie];
  };

export default UseCookie;