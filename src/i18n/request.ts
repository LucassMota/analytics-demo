import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = "en";
  const mappedLocale = locale === "en" ? "en-US" : locale;

  return {
    locale,
    messages: (await import(`../dictionaries/${mappedLocale}.json`)).default,
  };
});
