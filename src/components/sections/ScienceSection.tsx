"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/ui/Section";
import { examineLinks, featuredStudies, doiUrl, pubmedUrl, type Study } from "@/data/studies";

/** One published study: journal + year, what was tested, what was found, an honest caveat, links. */
export function StudyCard({ study, index = 0 }: { study: Study; index?: number }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const l = (v: { fr: string; ar: string }) => (isAr ? v.ar : v.fr);

  return (
    <motion.article
      className="card p-6 flex flex-col gap-4 h-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <header>
        <p className="flex items-center gap-2 text-sm font-semibold text-harissa">
          <BookOpen className="w-4 h-4" strokeWidth={1.75} />
          <span dir="ltr">
            {study.journal} · {study.year}
          </span>
        </p>
        <p className="mt-2 text-sm text-muted" dir="ltr">
          {study.authors}
        </p>
      </header>
      <dl className="space-y-3 text-[15px] flex-1">
        <div>
          <dt className="label-sm text-muted mb-1">{isAr ? "شنوّة تجرّب" : "Testé"}</dt>
          <dd className="text-ink">{l(study.tested)}</dd>
        </div>
        <div>
          <dt className="label-sm text-muted mb-1">{isAr ? "النتيجة" : "Résultat"}</dt>
          <dd className="text-ink">{l(study.finding)}</dd>
        </div>
        <div>
          <dt className="label-sm text-muted mb-1">{isAr ? "باش تعرف" : "À savoir"}</dt>
          <dd className="text-muted">{l(study.caveat)}</dd>
        </div>
      </dl>
      <footer className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-line text-sm">
        <a
          href={pubmedUrl(study.pmid)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink"
        >
          PubMed <ExternalLink className="w-3.5 h-3.5" />
        </a>
        {study.doi && (
          <a
            href={doiUrl(study.doi)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink"
          >
            {isAr ? "الدراسة" : "Article"} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </footer>
    </motion.article>
  );
}

/** "Verify it yourself" — independent evidence summaries on Examine.com. */
export function ExamineBlock() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return (
    <div className="rounded-[20px] border border-line bg-paper p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <p className="flex items-center gap-2 font-semibold text-ink mb-1.5">
          <ShieldCheck className="w-5 h-5 text-harissa" strokeWidth={1.75} />
          {isAr ? "ما تصدّقناش على الكلام" : "Ne nous crois pas sur parole"}
        </p>
        <p className="text-muted">
          {isAr
            ? "Examine.com موقع مستقل يلخّص الأبحاث على المكمّلات: شنوّة تعمل، بقدّاش، و قدّاش الأدلّة قويّة."
            : "Examine.com, une base indépendante, résume la recherche sur les compléments : effets étudiés, doses et niveau de preuve."}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {examineLinks.map((e) => (
          <li key={e.href}>
            <a
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-ink transition-colors"
            >
              {isAr ? e.label.ar : e.label.fr} <ExternalLink className="w-3.5 h-3.5 text-muted" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScienceDisclaimer() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return (
    <p className="text-sm text-muted leading-relaxed max-w-3xl">
      {isAr
        ? "هذي الدراسات على المكوّنات موش على OMNIS FOCUS، و الجرعات المدروسة تنجّم تختلف. المكمّل الغذائي ما يعوّضش ماكلة متنوّعة و نمط حياة صحّي. فيتامين B6 و B12 هوما اللي عندهم ادعاءات مسموحة: يساهمو في نقص التعب و في الخدمة العادية للجهاز العصبي."
        : "Ces études portent sur les ingrédients et non sur le produit OMNIS FOCUS ; les doses étudiées peuvent différer. Un complément alimentaire ne remplace pas une alimentation variée et un mode de vie sain. Seules les vitamines B6 et B12 font l'objet d'allégations autorisées : elles contribuent à réduire la fatigue et au fonctionnement normal du système nerveux."}
    </p>
  );
}

/** Home + product page section: 4 featured studies, Examine.com block, disclaimer, link to /science. */
export default function ScienceSection({ tone = "cream" }: { tone?: "cream" | "paper" }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <Section
      id="science"
      tone={tone}
      eyebrow={isAr ? "الأبحاث" : "La recherche"}
      title={isAr ? "شنوّة تقول الأبحاث على الكافيين + L-théanine" : "Ce que dit la recherche sur la caféine + L-théanine"}
      intro={
        isAr
          ? "الكافيين و الـ L-théanine مدروسين مع بعضهم من 2008. هاو دراسات منشورة، بالجرعات اللي تجرّبت."
          : "La caféine et la L-théanine sont étudiées ensemble depuis 2008. Voici des études publiées, avec les doses testées."
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredStudies.map((s, i) => (
          <StudyCard key={s.id} study={s} index={i} />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <ExamineBlock />
        <ScienceDisclaimer />
        <Link href="/science" className="self-start text-ink font-semibold underline underline-offset-4 hover:text-harissa">
          {isAr ? "شوف الدراسات الكل" : "Voir toutes les études et sources"} →
        </Link>
      </div>
    </Section>
  );
}
