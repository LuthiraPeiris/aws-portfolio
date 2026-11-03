"use client";

import { useEffect, useState } from "react";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(removeTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-background transition-opacity duration-500 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <Trefoil
          size="48"
          stroke="4"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.4"
          color="currentColor"
        />

        <h2 className="text-xl font-semibold tracking-wide text-foreground">
          Loading Portfolio
        </h2>
      </div>
    </div>
  );
}