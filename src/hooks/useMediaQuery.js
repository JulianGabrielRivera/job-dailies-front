import { useState, useEffect } from "react";

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const listener = () => setIsMobile(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isMobile]);
  return isMobile;
};

export default useMediaQuery;
