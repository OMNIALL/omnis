"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSuccess from "@/components/OrderSuccess";
import { useLanguage } from "@/context/LanguageContext";
import { trackPurchase } from "@/lib/analytics";
import { LAST_ORDER_KEY, TRACKED_KEY, type PlacedOrder } from "@/lib/placeOrder";

const noopSubscribe = () => () => {};

/**
 * Thank-you page — the clean conversion URL for Meta / TikTok / Google.
 * Fires the Purchase event exactly once per order (guarded in sessionStorage, so reloads don't double count).
 */
export default function MerciClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // Raw string snapshot (stable between renders); null on the server.
  const raw = useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem(LAST_ORDER_KEY);
      } catch {
        return null;
      }
    },
    () => null
  );
  const order = useMemo<PlacedOrder | null>(() => {
    try {
      return raw ? (JSON.parse(raw) as PlacedOrder) : null;
    } catch {
      return null;
    }
  }, [raw]);

  useEffect(() => {
    if (!order) return;
    try {
      const done: string[] = JSON.parse(sessionStorage.getItem(TRACKED_KEY) || "[]");
      if (done.includes(order.id)) return;
      trackPurchase(order.items, order.total, order.id);
      sessionStorage.setItem(TRACKED_KEY, JSON.stringify([...done, order.id]));
    } catch {
      /* storage blocked: skip tracking rather than risk double counting */
    }
  }, [order]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {order ? (
          <OrderSuccess order={order} />
        ) : (
          <div className="card max-w-2xl mx-auto p-8 sm:p-10 text-center">
            <h1 className="heading-xl text-3xl text-ink mb-3">{isAr ? "شكراً!" : "Merci !"}</h1>
            <p className="text-muted mb-6">
              {isAr
                ? "الكوموند متاعك وصلتنا. تنجّم تتابعها برقم الكوموند ولا بتليفونك."
                : "Ta commande est bien reçue. Tu peux la suivre avec ton numéro de commande ou ton téléphone."}
            </p>
            <Link href="/track" className="btn-sticker btn-primary">
              {isAr ? "تابع الكوموند" : "Suivre ma commande"}
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
