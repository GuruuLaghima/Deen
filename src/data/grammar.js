export const LESSONS = [
  {
    id: 1,
    title: "L'alphabet arabe",
    subtitle: "Les 28 lettres et l'écriture",
    icon: 'أ',
    color: '#2D6A4F',
    sections: [
      {
        heading: 'Écriture de droite à gauche',
        content: `L'arabe s'écrit et se lit de droite à gauche. Les lettres sont cursives — elles se lient entre elles — sauf 6 lettres qui ne se lient pas à gauche :\n\nا   د   ذ   ر   ز   و\n\nCes 6 lettres brisent la liaison dans le mot.`,
      },
      {
        heading: 'Les voyelles courtes (ḥarakāt)',
        content: `En arabe littéraire, les voyelles courtes sont notées par des signes diacritiques au-dessus ou en-dessous des lettres :\n\n• Fatḥa  (  َ ) → son « a » bref : كَتَبَ (kataba)\n• Kasra  (  ِ ) → son « i » bref : كِتَاب (kitāb)\n• Ḍamma (  ُ ) → son « u » bref : كُتُب (kutub)\n• Sukūn  (  ْ ) → absence de voyelle : بَيْت (bayt)\n• Shadda (  ّ ) → consonne doublée : جَدّ (jadd)`,
      },
      {
        heading: 'Tanwīn — la nunation',
        content: `Le tanwīn ajoute un « n » final aux noms indéfinis :\n\n• كِتَابٌ (kitābun) = un livre\n• شُكْرًا (shukran) = merci (litt. "en remerciement")\n• مَرْحَبًا (marḥaban) = bienvenue`,
      },
    ],
  },
  {
    id: 2,
    title: "L'article défini ال",
    subtitle: "Al- et l'assimilation solaire",
    icon: 'ال',
    color: '#1565C0',
    sections: [
      {
        heading: "L'article ال (al-)",
        content: `L'article défini en arabe est ال (al-), équivalent de "le", "la", "les" en français. Il est invariable.\n\n• كِتَاب (kitāb) = un livre\n• الكِتَاب (al-kitāb) = le livre\n• بَيْت (bayt) = une maison\n• البَيْت (al-bayt) = la maison`,
      },
      {
        heading: 'Lettres solaires et lunaires',
        content: `Quand ال précède une lettre solaire, le لام s'assimile à cette lettre (la lettre se double) :\n\nLettres solaires : ت ث د ذ ر ز س ش ص ض ط ظ ل ن\n\n• الشَّمْس = ash-shams (le soleil)\n• النَّار = an-nār (le feu)\n\nAvec les lettres lunaires, on prononce bien « al- » :\n\nLettres lunaires : أ ب ج ح خ ع غ ف ق ك م ه و ي\n\n• القَمَر = al-qamar (la lune)\n• الكِتَاب = al-kitāb (le livre)`,
      },
    ],
  },
  {
    id: 3,
    title: 'Le genre',
    subtitle: 'Masculin et féminin',
    icon: 'م/ف',
    color: '#6A1E55',
    sections: [
      {
        heading: 'Le masculin',
        content: `Par défaut, les noms sans terminaison spéciale sont masculins :\n\n• كِتَاب (kitāb) = livre (masc.)\n• بَيْت (bayt) = maison (masc.)\n• وَلَد (walad) = garçon (masc.)`,
      },
      {
        heading: 'Le féminin : la tāʾ marbūṭa ة',
        content: `Le féminin se forme souvent par l'ajout de ة (tāʾ marbūṭa, "t attaché") en fin de mot :\n\n• مُدَرِّس (mudarris) = enseignant\n→ مُدَرِّسَة (mudarrisa) = enseignante\n\n• طَالِب (ṭālib) = étudiant\n→ طَالِبَة (ṭāliba) = étudiante\n\nCertains noms sont féminins sans ة :\nأُمّ (mère), أُخْت (sœur), شَمْس (soleil), أَرْض (terre)`,
      },
    ],
  },
  {
    id: 4,
    title: 'Les pronoms personnels',
    subtitle: 'Ḍamāʾir — ضَمَائِر',
    icon: 'أنا',
    color: '#B7410E',
    sections: [
      {
        heading: 'Singulier',
        content: `• أَنَا (anā) — je / moi\n• أَنْتَ (anta) — tu / toi (masculin)\n• أَنْتِ (anti) — tu / toi (féminin)\n• هُوَ (huwa) — il / lui\n• هِيَ (hiya) — elle`,
      },
      {
        heading: 'Pluriel',
        content: `• نَحْنُ (naḥnu) — nous\n• أَنْتُمْ (antum) — vous (masc.)\n• أَنْتُنَّ (antunna) — vous (fém.)\n• هُمْ (hum) — ils\n• هُنَّ (hunna) — elles`,
      },
    ],
  },
  {
    id: 5,
    title: 'La phrase nominale',
    subtitle: 'Jumla ismiyya — جُمْلَة اسْمِيَّة',
    icon: 'جملة',
    color: '#1A5276',
    sections: [
      {
        heading: 'Pas de verbe "être" au présent',
        content: `En arabe, le verbe "être" (كَانَ, kāna) n'est pas exprimé au présent. Le sujet et l'attribut sont simplement juxtaposés :\n\n• أَنَا طَالِب = Je (suis) étudiant\n• البَيْتُ كَبِير = La maison (est) grande\n• هُوَ مُعَلِّم = Il (est) professeur`,
      },
      {
        heading: 'Structure : sujet + attribut',
        content: `[Sujet • مُبْتَدَأ] + [Attribut • خَبَر]\n\nExemples :\n• الوَلَدُ سَعِيد — Le garçon (est) heureux\n• الكِتَابُ جَدِيد — Le livre (est) nouveau\n• البِنْتُ ذَكِيَّة — La fille (est) intelligente\n• السَّمَاءُ زَرْقَاء — Le ciel (est) bleu`,
      },
    ],
  },
  {
    id: 6,
    title: 'La racine et le verbe au passé',
    subtitle: 'Fiʿl māḍī — فِعْل مَاضٍ',
    icon: 'فعل',
    color: '#145A32',
    sections: [
      {
        heading: 'La racine trilittère',
        content: `La plupart des mots arabes dérivent d'une racine de 3 consonnes. Exemple : la racine ك-ت-ب (k-t-b) exprime l'idée d'« écrire » :\n\n• كَتَبَ (kataba) = il a écrit\n• كِتَاب (kitāb) = livre\n• كَاتِب (kātib) = écrivain\n• مَكْتَبَة (maktaba) = bibliothèque\n• مَكْتُوب (maktūb) = lettre / écrit`,
      },
      {
        heading: 'Conjugaison au passé (كَتَبَ — écrire)',
        content: `• كَتَبْتُ (katabtu) — j'ai écrit\n• كَتَبْتَ (katabta) — tu as écrit (masc.)\n• كَتَبْتِ (katabti) — tu as écrit (fém.)\n• كَتَبَ (kataba) — il a écrit\n• كَتَبَتْ (katabat) — elle a écrit\n• كَتَبْنَا (katabnā) — nous avons écrit\n• كَتَبُوا (katabū) — ils ont écrit`,
      },
    ],
  },
]
