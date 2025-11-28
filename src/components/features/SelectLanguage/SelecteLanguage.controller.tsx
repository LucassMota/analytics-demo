import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { ELanguage } from "./types";

const useSelectLanguage = () => {
  const [language, setLanguage] = useState<ELanguage>();

  useEffect(() => {
    const locale = getCookie("NEXT_LOCALE");
    if (locale) {
      setLanguage(locale as ELanguage);
    }
  }, []);

  return { language, setLanguage };
};

export default useSelectLanguage;
