"use client";

import { useEffect } from "react";

export default function ThemeSync() {
  useEffect(() => {
    const enabled = localStorage.getItem("sasra-theme") === "dark";
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  return null;
}
