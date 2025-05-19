"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [selectedLang, setSelectedLang] = useState<"en" | "vi">("en");

  const flagSrc = {
    en: "/logos/uk.png",
    vi: "/logos/vietnam.png",
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white to-gray-50 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)]">
      <Link href="/" className="flex items-center gap-2">
        <Image width={24} height={24} src="/logo.svg" alt="Internly Logo" />
        <span className="font-bold text-primary text-lg">Internly</span>
      </Link>

      <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1">
        <Image
          src={flagSrc[selectedLang]}
          alt={selectedLang}
          width={20}
          height={20}
        />
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value as "en" | "vi")}
          className="bg-transparent outline-none text-sm"
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
      </div>
    </header>
  );
}
