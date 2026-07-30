"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { curseur } from "@/lib/state/storage";

/**
 * 03-navigation.md §2.2 : aucun écran d'accueil. Le curseur (D-32) dépend
 * du journal `localStorage`, donc uniquement disponible côté client — la
 * redirection ne peut pas se faire au serveur sans compte (D-22).
 */
export function RedirectionAccueil({ questionIds }: { questionIds: string[] }) {
  const router = useRouter();

  useEffect(() => {
    if (questionIds.length === 0) return;
    const rang = curseur(questionIds);
    const destination = rang >= questionIds.length ? "/fin" : `/q/${questionIds[rang]}`;
    router.replace(destination);
  }, [questionIds, router]);

  return null;
}
