import { Chat } from "@/src/components/features/Chat";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home-page");

  return (
    <div className="h-full w-full">
      <Chat />
    </div>
  );
}
