/**
 * Published research on the INGREDIENTS (not on OMNIS FOCUS).
 * Every entry was verified on PubMed (authors, journal, year, DOI, PMID) and summarized from its abstract.
 * Rules: describe what was measured, keep the caveat, never turn a finding into a product claim.
 * See marketing/science-and-moments-plan.md.
 */

export interface Study {
  id: string;
  authors: string;
  year: number;
  journal: string;
  citation: string; // volume(issue):pages
  title: string;
  doi?: string;
  pmid: string;
  featured: boolean; // shown as a card on home/product; all are listed on /science
  tested: { fr: string; ar: string };
  finding: { fr: string; ar: string };
  caveat: { fr: string; ar: string };
}

export const studies: Study[] = [
  {
    id: "owen-2008",
    authors: "Owen GN, Parnell H, De Bruin EA, Rycroft JA",
    year: 2008,
    journal: "Nutritional Neuroscience",
    citation: "11(4):193-8",
    title: "The combined effects of L-theanine and caffeine on cognitive performance and mood.",
    doi: "10.1179/147683008X301513",
    pmid: "18681988",
    featured: true,
    tested: {
      fr: "100 mg de L-théanine + 50 mg de caféine, comparés à un placebo, chez 27 adultes.",
      ar: "100 ملغ L-théanine + 50 ملغ كافيين، مقارنة ببلاسيبو، عند 27 شخص كبير.",
    },
    finding: {
      fr: "La combinaison a amélioré la vitesse et la précision sur une tâche de changement d'attention, et réduit la sensibilité aux distractions dans une tâche de mémoire.",
      ar: "الخلطة حسّنت السرعة و الدقّة في تمرين تبديل الانتباه، و نقّصت التأثّر بالتشتيت في تمرين الذاكرة.",
    },
    caveat: {
      fr: "Petit échantillon, une seule prise, moins de caféine que FOCUS. Étude financée par Unilever.",
      ar: "عيّنة صغيرة، جرعة وحدة، كافيين أقل من FOCUS. الدراسة ممولة من Unilever.",
    },
  },
  {
    id: "giesbrecht-2010",
    authors: "Giesbrecht T, Rycroft JA, Rowson MJ, De Bruin EA",
    year: 2010,
    journal: "Nutritional Neuroscience",
    citation: "13(6):283-90",
    title: "The combination of L-theanine and caffeine improves cognitive performance and increases subjective alertness.",
    doi: "10.1179/147683010X12611460764840",
    pmid: "21040626",
    featured: true,
    tested: {
      fr: "97 mg de L-théanine + 40 mg de caféine, comparés à un placebo, chez 44 jeunes adultes.",
      ar: "97 ملغ L-théanine + 40 ملغ كافيين، مقارنة ببلاسيبو، عند 44 شاب.",
    },
    finding: {
      fr: "Meilleure précision lors du passage d'une tâche à l'autre, vigilance ressentie plus élevée et fatigue ressentie plus faible.",
      ar: "دقّة أحسن كي تبدّل من تمرين لآخر، إحساس باليقظة أكثر و إحساس بالتعب أقل.",
    },
    caveat: {
      fr: "Aucun effet sur les autres tests (recherche visuelle, temps de réaction, rotation mentale). Étude financée par Unilever.",
      ar: "ما فمّاش تأثير على التمارين الأخرى. الدراسة ممولة من Unilever.",
    },
  },
  {
    id: "kelly-foxe-2008",
    authors: "Kelly SP, Gomez-Ramirez M, Montesi JL, Foxe JJ",
    year: 2008,
    journal: "The Journal of Nutrition",
    citation: "138(8):1572S-1577S",
    title: "L-theanine and caffeine in combination affect human cognition as evidenced by oscillatory alpha-band activity and attention task performance.",
    doi: "10.1093/jn/138.8.1572S",
    pmid: "18641209",
    featured: true,
    tested: {
      fr: "100 mg de L-théanine, 50 mg de caféine, les deux ensemble, ou un placebo — avec mesure de l'activité cérébrale (EEG).",
      ar: "100 ملغ L-théanine، 50 ملغ كافيين، الزوز مع بعضهم، ولا بلاسيبو — مع قياس نشاط المخ (EEG).",
    },
    finding: {
      fr: "La combinaison a augmenté le taux de bonnes réponses et la capacité à distinguer les cibles par rapport au placebo, et modifié l'activité alpha du cerveau.",
      ar: "الخلطة زادت في الإجابات الصحيحة و في القدرة على تمييز الأهداف مقارنة بالبلاسيبو، و بدّلت نشاط موجات ألفا في المخ.",
    },
    caveat: {
      fr: "Tâche de laboratoire, petit groupe ; la L-théanine seule n'a pas montré d'effet sur la performance à cette dose.",
      ar: "تمرين في المخبر، مجموعة صغيرة؛ الـ L-théanine وحدها ما بانش عندها تأثير على الأداء بهذي الجرعة.",
    },
  },
  {
    id: "camfield-2014",
    authors: "Camfield DA, Stough C, Farrimond J, Scholey AB",
    year: 2014,
    journal: "Nutrition Reviews",
    citation: "72(8):507-22",
    title: "Acute effects of tea constituents L-theanine, caffeine, and epigallocatechin gallate on cognitive function and mood: a systematic review and meta-analysis.",
    doi: "10.1111/nure.12120",
    pmid: "24946991",
    featured: true,
    tested: {
      fr: "Revue systématique et méta-analyse de 11 études contrôlées contre placebo.",
      ar: "مراجعة منهجية و تحليل لـ 11 دراسة مقارنة بالبلاسيبو.",
    },
    finding: {
      fr: "Effets modérés en faveur de la combinaison caféine + L-théanine dans les 2 heures suivant la prise, sur la vigilance ressentie et la précision du changement d'attention.",
      ar: "تأثير متوسط لصالح خلطة الكافيين + L-théanine في الساعتين بعد الأخذ، على اليقظة و دقّة تبديل الانتباه.",
    },
    caveat: {
      fr: "Les effets semblaient davantage liés à la dose de caféine qu'à celle de L-théanine.",
      ar: "التأثير يبان مرتبط أكثر بجرعة الكافيين من جرعة الـ L-théanine.",
    },
  },
  {
    id: "nobre-2008",
    authors: "Nobre AC, Rao A, Owen GN",
    year: 2008,
    journal: "Asia Pacific Journal of Clinical Nutrition",
    citation: "17 Suppl 1:167-8",
    title: "L-theanine, a natural constituent in tea, and its effect on mental state.",
    pmid: "18296328",
    featured: false,
    tested: {
      fr: "50 mg de L-théanine ou placebo, activité cérébrale (EEG) mesurée au repos.",
      ar: "50 ملغ L-théanine ولا بلاسيبو، قياس نشاط المخ في الراحة.",
    },
    finding: {
      fr: "Augmentation plus importante de l'activité alpha au fil du temps avec la L-théanine qu'avec le placebo.",
      ar: "زيادة أكبر في نشاط موجات ألفا مع الوقت بالـ L-théanine مقارنة بالبلاسيبو.",
    },
    caveat: { fr: "Résumé de congrès, petits groupes.", ar: "ملخّص مؤتمر، مجموعات صغيرة." },
  },
  {
    id: "gomez-ramirez-foxe-2009",
    authors: "Gomez-Ramirez M, Kelly SP, Montesi JL, Foxe JJ",
    year: 2009,
    journal: "Brain Topography",
    citation: "22(1):44-51",
    title: "The effects of L-theanine on alpha-band oscillatory brain activity during a visuo-spatial attention task.",
    doi: "10.1007/s10548-008-0068-z",
    pmid: "18841456",
    featured: false,
    tested: {
      fr: "L-théanine et activité alpha du cerveau pendant une tâche d'attention visuelle.",
      ar: "L-théanine و نشاط موجات ألفا خلال تمرين انتباه بصري.",
    },
    finding: {
      fr: "Étude de l'effet de la L-théanine sur l'activité alpha liée à l'attention.",
      ar: "دراسة تأثير الـ L-théanine على نشاط ألفا المرتبط بالانتباه.",
    },
    caveat: { fr: "Étude de neurophysiologie en laboratoire.", ar: "دراسة في المخبر." },
  },
  {
    id: "foxe-2012",
    authors: "Foxe JJ, Morie KP, Laud PJ, Rowson MJ, de Bruin EA, Kelly SP",
    year: 2012,
    journal: "Neuropharmacology",
    citation: "62(7):2320-7",
    title: "Assessing the effects of caffeine and theanine on the maintenance of vigilance during a sustained attention task.",
    doi: "10.1016/j.neuropharm.2012.01.020",
    pmid: "22326943",
    featured: false,
    tested: {
      fr: "50 mg de caféine, 100 mg de L-théanine, les deux, ou placebo, pendant une tâche monotone de 2 heures (27 participants).",
      ar: "50 ملغ كافيين، 100 ملغ L-théanine، الزوز، ولا بلاسيبو، في تمرين طويل ساعتين (27 مشارك).",
    },
    finding: {
      fr: "La caféine et la L-théanine ont chacune réduit les erreurs par rapport au placebo.",
      ar: "الكافيين و الـ L-théanine كل واحد نقّص الأخطاء مقارنة بالبلاسيبو.",
    },
    caveat: {
      fr: "La combinaison n'a pas apporté de bénéfice supplémentaire par rapport à chaque ingrédient seul.",
      ar: "الخلطة ما زادت حتى فايدة على كل مكوّن وحدو.",
    },
  },
  {
    id: "haskell-2008",
    authors: "Haskell CF, Kennedy DO, Milne AL, Wesnes KA, Scholey AB",
    year: 2008,
    journal: "Biological Psychology",
    citation: "77(2):113-22",
    title: "The effects of L-theanine, caffeine and their combination on cognition and mood.",
    doi: "10.1016/j.biopsycho.2007.09.008",
    pmid: "18006208",
    featured: false,
    tested: {
      fr: "250 mg de L-théanine, 150 mg de caféine, les deux, ou placebo.",
      ar: "250 ملغ L-théanine، 150 ملغ كافيين، الزوز، ولا بلاسيبو.",
    },
    finding: {
      fr: "La combinaison a amélioré plusieurs mesures de vitesse et de précision, et réduit la fatigue ressentie par rapport au placebo.",
      ar: "الخلطة حسّنت برشا قياسات متاع السرعة و الدقّة، و نقّصت الإحساس بالتعب مقارنة بالبلاسيبو.",
    },
    caveat: {
      fr: "Doses plus élevées que FOCUS ; la L-théanine seule a augmenté les plaintes de maux de tête dans cette étude.",
      ar: "جرعات أكبر من FOCUS؛ الـ L-théanine وحدها زادت في الشكاوي من وجيعة الراس في هذي الدراسة.",
    },
  },
  {
    id: "kahathuduwa-2017",
    authors: "Kahathuduwa CN, Dassanayake TL, Amarakoon AMT, Weerasinghe VS",
    year: 2017,
    journal: "Nutritional Neuroscience",
    citation: "20(6):369-377",
    title: "Acute effects of theanine, caffeine and theanine-caffeine combination on attention.",
    doi: "10.1080/1028415X.2016.1144845",
    pmid: "26869148",
    featured: false,
    tested: {
      fr: "200 mg de L-théanine, 160 mg de caféine, les deux, une tasse de thé ou placebo, chez 20 hommes en bonne santé.",
      ar: "200 ملغ L-théanine، 160 ملغ كافيين، الزوز، كاس تاي ولا بلاسيبو، عند 20 راجل.",
    },
    finding: {
      fr: "Chacun des trois traitements a amélioré un temps de réaction d'attention sélective par rapport au placebo.",
      ar: "التلاثة حسّنو وقت ردّ الفعل في الانتباه مقارنة بالبلاسيبو.",
    },
    caveat: { fr: "Petit groupe, uniquement des hommes.", ar: "مجموعة صغيرة، رجال برك." },
  },
];

export const featuredStudies = studies.filter((s) => s.featured);

/** Independent sources the visitor can use to check the evidence themselves. */
export const examineLinks = [
  { label: { fr: "L-théanine", ar: "L-théanine" }, href: "https://examine.com/supplements/theanine/" },
  { label: { fr: "Caféine", ar: "الكافيين" }, href: "https://examine.com/supplements/caffeine/" },
  { label: { fr: "Vitamine B6", ar: "فيتامين B6" }, href: "https://examine.com/supplements/vitamin-b6/" },
  { label: { fr: "Vitamine B12", ar: "فيتامين B12" }, href: "https://examine.com/supplements/vitamin-b12/" },
];

export const pubmedUrl = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
