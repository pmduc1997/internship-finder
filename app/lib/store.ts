// lib/store.ts
import { create } from "zustand";

type Language = "en" | "vi";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language:
    (typeof window !== "undefined" && localStorage.getItem("language")) === "vi"
      ? "vi"
      : "en", // fallback to "en" if undefined

  setLanguage: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    set({ language: lang });
  },
}));
