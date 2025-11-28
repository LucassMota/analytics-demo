"use client";

import { useTransition } from "react";
import { setCookie } from "cookies-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { ChevronDown } from "lucide-react";
import useSelectLanguage from "./SelecteLanguage.controller";
import { Locale } from "next-intl";
import { ELanguage } from "./types";
import { setUserLocale } from "@/src/services/locale";

const SelectLanguage: React.FC = () => {
  const { language, setLanguage } = useSelectLanguage();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale) => {
    setCookie("NEXT_LOCALE", newLocale);
    startTransition(() => {
      setLanguage(newLocale as ELanguage);
      setUserLocale(newLocale as ELanguage);
    });
  };

  const languages = [
    {
      id: 1,
      src: "https://flagcdn.com/es.svg",
      alt: "Spain",
      code: "es-ES" as Locale,
      text: "ES",
    },
    {
      id: 2,
      src: "https://flagcdn.com/br.svg",
      alt: "Brazil",
      code: "pt-BR" as Locale,
      text: "PT",
    },
    {
      id: 3,
      src: "https://flagcdn.com/us.svg",
      alt: "United States",
      code: "en-US" as Locale,
      text: "EN",
    },
  ];

  const selectedLanguage = languages.find((lang) => lang.code === language);
  const availableLanguages = languages.filter((lang) => lang.code !== language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-24 h-10 rounded-[47px] cursor-pointer bg-active flex justify-center items-center gap-1 text-sm">
          {selectedLanguage && (
            <img
              src={selectedLanguage.src}
              width="20"
              alt={`${selectedLanguage.text} Flag`}
            />
          )}
          <span className="text-[var(--gray-light-mode-900)] dark:text-[var(--gray-dark-mode-25)] text-base">
            {selectedLanguage?.text}
          </span>
          <ChevronDown
            size={16}
            className="text-[var(--gray-light-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="border-none bg-transparent">
        {availableLanguages?.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            disabled={isPending}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex max-w-21 items-center gap-2 px-3 py-1.5 rounded text-sm transition-all duration-300 mt-1 cursor-pointer hover:bg-[var(--gray-dark-mode-500)] dark:hover:bg-[var(--gray-dark-mode-500)] bg-[var(--gray-light-mode-200)] dark:bg-[var(--gray-dark-mode-800)] text-[var(--gray-light-mode-900)] dark:text-[var(--gray-dark-mode-25)]"
          >
            <img src={lang.src} width="20" alt={lang.alt} />
            {lang.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectLanguage;
