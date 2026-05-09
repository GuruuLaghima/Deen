export const CATEGORIES = [
  { id: 'greetings', label: 'Salutations', icon: '👋' },
  { id: 'numbers', label: 'Chiffres', icon: '🔢' },
  { id: 'colors', label: 'Couleurs', icon: '🎨' },
  { id: 'family', label: 'Famille', icon: '👨‍👩‍👧' },
  { id: 'body', label: 'Corps', icon: '🧍' },
  { id: 'food', label: 'Nourriture', icon: '🍽️' },
  { id: 'verbs', label: 'Verbes', icon: '⚡' },
  { id: 'objects', label: 'Objets', icon: '📦' },
]

export const VOCABULARY = [
  // Salutations
  { id: 1, arabic: 'السَّلَامُ عَلَيْكُمْ', translit: 'as-salāmu ʿalaykum', french: 'Paix sur vous (salutation islamique)', category: 'greetings' },
  { id: 2, arabic: 'وَعَلَيْكُمُ السَّلَام', translit: 'wa-ʿalaykumu s-salām', french: 'Et sur vous la paix (réponse)', category: 'greetings' },
  { id: 3, arabic: 'مَرْحَبًا', translit: 'marḥaban', french: 'Bonjour / Bienvenue', category: 'greetings' },
  { id: 4, arabic: 'أَهْلًا', translit: 'ahlan', french: 'Bonjour / Salut', category: 'greetings' },
  { id: 5, arabic: 'شُكْرًا', translit: 'shukran', french: 'Merci', category: 'greetings' },
  { id: 6, arabic: 'عَفْوًا', translit: 'ʿafwan', french: 'De rien / Pardon', category: 'greetings' },
  { id: 7, arabic: 'نَعَمْ', translit: 'naʿam', french: 'Oui', category: 'greetings' },
  { id: 8, arabic: 'لَا', translit: 'lā', french: 'Non', category: 'greetings' },
  { id: 9, arabic: 'مَعَ السَّلَامَة', translit: 'maʿa s-salāma', french: 'Au revoir', category: 'greetings' },
  { id: 10, arabic: 'مِنْ فَضْلِكَ', translit: 'min faḍlika', french: "S'il vous plaît", category: 'greetings' },

  // Chiffres
  { id: 11, arabic: 'وَاحِد', translit: 'wāḥid', french: 'Un (1)', category: 'numbers' },
  { id: 12, arabic: 'اثْنَانِ', translit: 'ithnān', french: 'Deux (2)', category: 'numbers' },
  { id: 13, arabic: 'ثَلَاثَة', translit: 'thalātha', french: 'Trois (3)', category: 'numbers' },
  { id: 14, arabic: 'أَرْبَعَة', translit: 'arbaʿa', french: 'Quatre (4)', category: 'numbers' },
  { id: 15, arabic: 'خَمْسَة', translit: 'khamsa', french: 'Cinq (5)', category: 'numbers' },
  { id: 16, arabic: 'سِتَّة', translit: 'sitta', french: 'Six (6)', category: 'numbers' },
  { id: 17, arabic: 'سَبْعَة', translit: 'sabʿa', french: 'Sept (7)', category: 'numbers' },
  { id: 18, arabic: 'ثَمَانِيَة', translit: 'thamāniya', french: 'Huit (8)', category: 'numbers' },
  { id: 19, arabic: 'تِسْعَة', translit: 'tisʿa', french: 'Neuf (9)', category: 'numbers' },
  { id: 20, arabic: 'عَشَرَة', translit: 'ʿashara', french: 'Dix (10)', category: 'numbers' },

  // Couleurs
  { id: 21, arabic: 'أَحْمَر', translit: 'aḥmar', french: 'Rouge', category: 'colors' },
  { id: 22, arabic: 'أَزْرَق', translit: 'azraq', french: 'Bleu', category: 'colors' },
  { id: 23, arabic: 'أَخْضَر', translit: 'akhḍar', french: 'Vert', category: 'colors' },
  { id: 24, arabic: 'أَصْفَر', translit: 'aṣfar', french: 'Jaune', category: 'colors' },
  { id: 25, arabic: 'أَبْيَض', translit: 'abyaḍ', french: 'Blanc', category: 'colors' },
  { id: 26, arabic: 'أَسْوَد', translit: 'aswad', french: 'Noir', category: 'colors' },
  { id: 27, arabic: 'بُرْتُقَالِي', translit: 'burtuqālī', french: 'Orange', category: 'colors' },
  { id: 28, arabic: 'بَنَفْسَجِي', translit: 'banafsajī', french: 'Violet', category: 'colors' },

  // Famille
  { id: 29, arabic: 'أَب', translit: 'ab', french: 'Père', category: 'family' },
  { id: 30, arabic: 'أُمّ', translit: 'umm', french: 'Mère', category: 'family' },
  { id: 31, arabic: 'أَخ', translit: 'akh', french: 'Frère', category: 'family' },
  { id: 32, arabic: 'أُخْت', translit: 'ukht', french: 'Sœur', category: 'family' },
  { id: 33, arabic: 'ابْن', translit: 'ibn', french: 'Fils', category: 'family' },
  { id: 34, arabic: 'بِنْت', translit: 'bint', french: 'Fille', category: 'family' },
  { id: 35, arabic: 'جَدّ', translit: 'jadd', french: 'Grand-père', category: 'family' },
  { id: 36, arabic: 'جَدَّة', translit: 'jadda', french: 'Grand-mère', category: 'family' },

  // Corps
  { id: 37, arabic: 'رَأْس', translit: 'raʾs', french: 'Tête', category: 'body' },
  { id: 38, arabic: 'يَد', translit: 'yad', french: 'Main', category: 'body' },
  { id: 39, arabic: 'عَيْن', translit: 'ʿayn', french: 'Œil', category: 'body' },
  { id: 40, arabic: 'أُذُن', translit: 'udhun', french: 'Oreille', category: 'body' },
  { id: 41, arabic: 'فَم', translit: 'fam', french: 'Bouche', category: 'body' },
  { id: 42, arabic: 'قَلْب', translit: 'qalb', french: 'Cœur', category: 'body' },
  { id: 43, arabic: 'رِجْل', translit: 'rijl', french: 'Pied / Jambe', category: 'body' },
  { id: 44, arabic: 'أَنْف', translit: 'anf', french: 'Nez', category: 'body' },

  // Nourriture
  { id: 45, arabic: 'خُبْز', translit: 'khubz', french: 'Pain', category: 'food' },
  { id: 46, arabic: 'مَاء', translit: 'māʾ', french: 'Eau', category: 'food' },
  { id: 47, arabic: 'لَحْم', translit: 'laḥm', french: 'Viande', category: 'food' },
  { id: 48, arabic: 'تُفَّاح', translit: 'tuffāḥ', french: 'Pomme', category: 'food' },
  { id: 49, arabic: 'حَلِيب', translit: 'ḥalīb', french: 'Lait', category: 'food' },
  { id: 50, arabic: 'أُرُزّ', translit: 'uruzz', french: 'Riz', category: 'food' },
  { id: 51, arabic: 'سَمَك', translit: 'samak', french: 'Poisson', category: 'food' },
  { id: 52, arabic: 'بَيْض', translit: 'bayḍ', french: 'Œuf(s)', category: 'food' },

  // Verbes (passé, 3ème personne masc. sg.)
  { id: 53, arabic: 'ذَهَبَ', translit: 'dhahaba', french: 'Il est allé • aller', category: 'verbs' },
  { id: 54, arabic: 'أَكَلَ', translit: 'akala', french: 'Il a mangé • manger', category: 'verbs' },
  { id: 55, arabic: 'شَرِبَ', translit: 'shariba', french: 'Il a bu • boire', category: 'verbs' },
  { id: 56, arabic: 'قَرَأَ', translit: 'qaraʾa', french: 'Il a lu • lire', category: 'verbs' },
  { id: 57, arabic: 'كَتَبَ', translit: 'kataba', french: 'Il a écrit • écrire', category: 'verbs' },
  { id: 58, arabic: 'قَالَ', translit: 'qāla', french: 'Il a dit • dire', category: 'verbs' },
  { id: 59, arabic: 'عَلِمَ', translit: 'ʿalima', french: 'Il a su • savoir', category: 'verbs' },
  { id: 60, arabic: 'رَأَى', translit: 'raʾā', french: 'Il a vu • voir', category: 'verbs' },

  // Objets
  { id: 61, arabic: 'كِتَاب', translit: 'kitāb', french: 'Livre', category: 'objects' },
  { id: 62, arabic: 'بَيْت', translit: 'bayt', french: 'Maison', category: 'objects' },
  { id: 63, arabic: 'مَدْرَسَة', translit: 'madrasa', french: 'École', category: 'objects' },
  { id: 64, arabic: 'قَلَم', translit: 'qalam', french: 'Stylo / Crayon', category: 'objects' },
  { id: 65, arabic: 'بَاب', translit: 'bāb', french: 'Porte', category: 'objects' },
  { id: 66, arabic: 'سَيَّارَة', translit: 'sayyāra', french: 'Voiture', category: 'objects' },
  { id: 67, arabic: 'مَسْجِد', translit: 'masjid', french: 'Mosquée', category: 'objects' },
  { id: 68, arabic: 'شَمْس', translit: 'shams', french: 'Soleil', category: 'objects' },
]
