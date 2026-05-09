export const ALPHABET = [
  {
    id: 1, letter: 'ا', name: 'أَلِف', nameTranslit: 'Alif',
    sound: 'ā / a', pronunciation: 'Voyelle longue "a" comme dans "pâte". En début de mot, porte une hamza (أ ou إ).',
    connects: false, example: { word: 'أَب', translit: 'ab', meaning: 'père' },
  },
  {
    id: 2, letter: 'ب', name: 'بَاء', nameTranslit: 'Bāʾ',
    sound: 'b', pronunciation: 'Comme "b" en français.',
    connects: true, example: { word: 'بَيْت', translit: 'bayt', meaning: 'maison' },
  },
  {
    id: 3, letter: 'ت', name: 'تَاء', nameTranslit: 'Tāʾ',
    sound: 't', pronunciation: 'Comme "t" en français.',
    connects: true, example: { word: 'تُفَّاح', translit: 'tuffāḥ', meaning: 'pomme' },
  },
  {
    id: 4, letter: 'ث', name: 'ثَاء', nameTranslit: 'Thāʾ',
    sound: 'th', pronunciation: 'Comme "th" en anglais "think" — entre les dents.',
    connects: true, example: { word: 'ثَلَاثَة', translit: 'thalātha', meaning: 'trois' },
  },
  {
    id: 5, letter: 'ج', name: 'جِيم', nameTranslit: 'Jīm',
    sound: 'j', pronunciation: 'Comme "j" en français (en arabe du Proche-Orient).',
    connects: true, example: { word: 'جَدّ', translit: 'jadd', meaning: 'grand-père' },
  },
  {
    id: 6, letter: 'ح', name: 'حَاء', nameTranslit: 'Ḥāʾ',
    sound: 'ḥ', pronunciation: 'H fortement soufflé depuis le fond de la gorge — plus serré que "h".',
    connects: true, example: { word: 'حَلِيب', translit: 'ḥalīb', meaning: 'lait' },
  },
  {
    id: 7, letter: 'خ', name: 'خَاء', nameTranslit: 'Khāʾ',
    sound: 'kh', pronunciation: 'Comme "j" en espagnol ou "ch" en allemand "Bach".',
    connects: true, example: { word: 'خُبْز', translit: 'khubz', meaning: 'pain' },
  },
  {
    id: 8, letter: 'د', name: 'دَال', nameTranslit: 'Dāl',
    sound: 'd', pronunciation: 'Comme "d" en français.',
    connects: false, example: { word: 'دِرَاسَة', translit: 'dirāsa', meaning: 'étude' },
  },
  {
    id: 9, letter: 'ذ', name: 'ذَال', nameTranslit: 'Dhāl',
    sound: 'dh', pronunciation: 'Comme "th" en anglais "the" — entre les dents, sonore.',
    connects: false, example: { word: 'ذَهَبَ', translit: 'dhahaba', meaning: 'aller' },
  },
  {
    id: 10, letter: 'ر', name: 'رَاء', nameTranslit: 'Rāʾ',
    sound: 'r', pronunciation: 'R légèrement roulé, proche du R espagnol.',
    connects: false, example: { word: 'رَأْس', translit: 'raʾs', meaning: 'tête' },
  },
  {
    id: 11, letter: 'ز', name: 'زَاي', nameTranslit: 'Zayn',
    sound: 'z', pronunciation: 'Comme "z" en français.',
    connects: false, example: { word: 'زَيْت', translit: 'zayt', meaning: 'huile' },
  },
  {
    id: 12, letter: 'س', name: 'سِين', nameTranslit: 'Sīn',
    sound: 's', pronunciation: 'Comme "s" en français (toujours sourd).',
    connects: true, example: { word: 'سَمَك', translit: 'samak', meaning: 'poisson' },
  },
  {
    id: 13, letter: 'ش', name: 'شِين', nameTranslit: 'Shīn',
    sound: 'sh', pronunciation: 'Comme "ch" en français.',
    connects: true, example: { word: 'شَمْس', translit: 'shams', meaning: 'soleil' },
  },
  {
    id: 14, letter: 'ص', name: 'صَاد', nameTranslit: 'Ṣād',
    sound: 'ṣ', pronunciation: 'S emphatique : bouche arrondie, langue reculée — comme un S "grave".',
    connects: true, example: { word: 'صَبَاح', translit: 'ṣabāḥ', meaning: 'matin' },
  },
  {
    id: 15, letter: 'ض', name: 'ضَاد', nameTranslit: 'Ḍād',
    sound: 'ḍ', pronunciation: 'D emphatique. La lettre la plus caractéristique de l\'arabe (langue du Ḍad).',
    connects: true, example: { word: 'ضَوْء', translit: 'ḍawʾ', meaning: 'lumière' },
  },
  {
    id: 16, letter: 'ط', name: 'طَاء', nameTranslit: 'Ṭāʾ',
    sound: 'ṭ', pronunciation: 'T emphatique : langue reculée, souffle bloqué.',
    connects: true, example: { word: 'طَعَام', translit: 'ṭaʿām', meaning: 'nourriture' },
  },
  {
    id: 17, letter: 'ظ', name: 'ظَاء', nameTranslit: 'Ẓāʾ',
    sound: 'ẓ', pronunciation: 'Dh emphatique — entre les dents, mais "lourd".',
    connects: true, example: { word: 'ظَهْر', translit: 'ẓahr', meaning: 'dos / midi' },
  },
  {
    id: 18, letter: 'ع', name: 'عَيْن', nameTranslit: 'ʿAyn',
    sound: 'ʿ', pronunciation: 'Constriction pharyngale — son unique à l\'arabe, comme un "a" étranglé profond.',
    connects: true, example: { word: 'عَيْن', translit: 'ʿayn', meaning: 'œil / source' },
  },
  {
    id: 19, letter: 'غ', name: 'غَيْن', nameTranslit: 'Ghayn',
    sound: 'gh', pronunciation: 'Comme le R grasseyé parisien, ou le G du fond de la gorge.',
    connects: true, example: { word: 'غُرْفَة', translit: 'ghurfa', meaning: 'chambre' },
  },
  {
    id: 20, letter: 'ف', name: 'فَاء', nameTranslit: 'Fāʾ',
    sound: 'f', pronunciation: 'Comme "f" en français.',
    connects: true, example: { word: 'فَم', translit: 'fam', meaning: 'bouche' },
  },
  {
    id: 21, letter: 'ق', name: 'قَاف', nameTranslit: 'Qāf',
    sound: 'q', pronunciation: 'K prononcé très en arrière dans la gorge, avec occlusion uvulaire.',
    connects: true, example: { word: 'قَلْب', translit: 'qalb', meaning: 'cœur' },
  },
  {
    id: 22, letter: 'ك', name: 'كَاف', nameTranslit: 'Kāf',
    sound: 'k', pronunciation: 'Comme "k" ou "c" (dur) en français.',
    connects: true, example: { word: 'كِتَاب', translit: 'kitāb', meaning: 'livre' },
  },
  {
    id: 23, letter: 'ل', name: 'لَام', nameTranslit: 'Lām',
    sound: 'l', pronunciation: 'Comme "l" en français.',
    connects: true, example: { word: 'لَحْم', translit: 'laḥm', meaning: 'viande' },
  },
  {
    id: 24, letter: 'م', name: 'مِيم', nameTranslit: 'Mīm',
    sound: 'm', pronunciation: 'Comme "m" en français.',
    connects: true, example: { word: 'مَاء', translit: 'māʾ', meaning: 'eau' },
  },
  {
    id: 25, letter: 'ن', name: 'نُون', nameTranslit: 'Nūn',
    sound: 'n', pronunciation: 'Comme "n" en français.',
    connects: true, example: { word: 'نَار', translit: 'nār', meaning: 'feu' },
  },
  {
    id: 26, letter: 'ه', name: 'هَاء', nameTranslit: 'Hāʾ',
    sound: 'h', pronunciation: 'H aspiré doux, comme en anglais "hello".',
    connects: true, example: { word: 'هَوَاء', translit: 'hawāʾ', meaning: 'air' },
  },
  {
    id: 27, letter: 'و', name: 'وَاو', nameTranslit: 'Wāw',
    sound: 'w / ū', pronunciation: 'Consonne "w" comme en anglais, ou voyelle longue "ou".',
    connects: false, example: { word: 'وَلَد', translit: 'walad', meaning: 'garçon' },
  },
  {
    id: 28, letter: 'ي', name: 'يَاء', nameTranslit: 'Yāʾ',
    sound: 'y / ī', pronunciation: 'Consonne "y" comme en français, ou voyelle longue "i".',
    connects: true, example: { word: 'يَد', translit: 'yad', meaning: 'main' },
  },
]

export const NON_CONNECTORS = [1, 8, 9, 10, 11, 27]
