"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Zap, BatteryLow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** PAS — Problem + Agitate: the coffee trap. (Solution follows in the next sections.) */
export default function ProblemSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const steps = isAr
    ? [
        { Icon: Coffee, time: "09:00", title: "القهوة الأولى", text: "تفيق، و تبدا النهار." },
        { Icon: Zap, time: "11:00", title: "الثالثة", text: "قلبك يجري، يديك ما تقعدش، مخّك يمشي و يجي." },
        { Icon: BatteryLow, time: "14:00", title: "الطيحة", text: "الإينرجي تطيح، و الكور ولا الرينيون يولّي عذاب." },
      ]
    : [
        { Icon: Coffee, time: "9h", title: "Le premier café", text: "Tu te réveilles, la journée démarre." },
        { Icon: Zap, time: "11h", title: "Le troisième", text: "Tu deviens nerveux, tu n'arrives plus à rester sur une tâche." },
        { Icon: BatteryLow, time: "14h", title: "Le crash", text: "L'énergie s'effondre, et le cours ou la réunion devient interminable." },
      ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-14 items-center mb-10">
          <div>
            <p className="eyebrow mb-3">{isAr ? "المشكلة" : "Le problème"}</p>
            <h2 className="heading-xl text-3xl sm:text-5xl text-ink mb-4">
              {isAr ? "تعرف النهار هذا؟" : "Tu connais cette journée ?"}
            </h2>
            <p className="text-lg text-muted">
              {isAr
                ? "القهوة وحدها تعطيك دفعة… و بعد تخلّصها. كل ما تزيد قهوة، تولّي نيرفي أكثر، و الطيحة تجي أقوى."
                : "Le café seul donne un coup de fouet… puis te le fait payer. Plus tu en rajoutes, plus tu es nerveux, et plus le coup de barre arrive fort."}
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[3/4] max-h-[460px] rounded-[20px] overflow-hidden bg-cream">
            <Image
              src="/images/problem-coffee-desk.webp"
              alt={isAr ? "بيرو فيه برشا فناجن قهوة فارغة في العشية" : "Bureau en fin d'après-midi avec plusieurs tasses de café vides"}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ Icon, time, title, text }, i) => (
            <motion.li
              key={title}
              className="card p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${i === 2 ? "text-harissa" : "text-ink"}`} strokeWidth={1.5} />
                <span className="text-sm font-semibold text-muted tabular-nums">{time}</span>
              </div>
              <p className="heading-lg text-xl text-ink mb-1.5">{title}</p>
              <p className="text-muted">{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
