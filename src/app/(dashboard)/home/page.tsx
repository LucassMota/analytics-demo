import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home-page");

  return (
    <div className="h-full w-full">
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
