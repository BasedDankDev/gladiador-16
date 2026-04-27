"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gladiador:viewed-products";
const MAX_VIEWED = 8;

export function useViewedProducts() {
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setViewed(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return viewed;
}

export function addViewedProduct(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((s) => s !== slug);
    filtered.unshift(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_VIEWED)));
  } catch {
    // ignore
  }
}

export function clearViewedProduct(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.filter((s) => s !== slug)));
  } catch {
    // ignore
  }
}
