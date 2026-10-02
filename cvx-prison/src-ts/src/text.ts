// Russian translations of the original English in-game texts (originals are kept as fallback).
export const RU: Record<string, string> = {
  "There are hairs scattered here.": 'Здесь разбросаны волосы.',
  "A hemostatic capsule\nis on the floor.": 'На полу лежит\nкровоостанавливающая капсула.',
  "It's empty.": 'Она пуста.',
  "Old prisoner's uniforms\nare piled up here.": 'Здесь свалены старые\nтюремные робы.',
  "He seems to be in great pain.": 'Похоже, ему очень больно.',
  "I shouldn't talk to him.": 'Не стоит с ним заговаривать.',
  "If I were equipped with a \nlighter, I could see outside...": 'Будь у меня зажигалка,\nя бы разглядела, что снаружи...',
  "His eyes are closed.": 'Его глаза закрыты.',
  "He's bleeding.\nI'll need hemostatic medicine...": 'У него кровотечение.\nНужно кровоостанавливающее...',
  "A disorganized pile of\nvarious documents.": 'Беспорядочная груда\nразных документов.',
  "This area is completely\nvoid of light.": 'Здесь совершенно\nнет света.',
  "I don't think I can\ntreat his wound properly.": 'Вряд ли я смогу\nкак следует обработать его рану.',
  "It's too dark to\nmake out anything.": 'Слишком темно,\nничего не разглядеть.',
  "It's a list of prisoners.\nMy name is at the end.": 'Это список заключённых.\nМоё имя — в самом конце.',
  "The escort's name is at\nthe end of the document.": 'Имя конвоира указано\nв конце документа.',
  "An old typewriter.": 'Старая пишущая машинка.',
  "I could save my progress\nif I had an ink ribbon.": 'Я могла бы сохраниться,\nбудь у меня красящая лента.',
  "You can save your\nprogress with this.": 'С её помощью можно\nсохранить прогресс.',
};
export const ITEM_RU: Record<string, string> = {
  'Combat Knife': 'Боевой нож', 'Handgun Bullets': 'Патроны для пистолета', 'Green Herb': 'Зелёная трава',
  'Ink Ribbon': 'Красящая лента', 'Board Clip': 'Планшет с бумагами', 'Hemostatic': 'Кровоостанавливающее',
  'Lighter': 'Зажигалка', 'Lockpick': 'Отмычка', 'Handgun': 'Пистолет', 'F. Aid Spray': 'Аптечка-спрей',
};
export let LANG: 'ru' | 'en' = (localStorage.getItem('cvx.lang') as any) || 'ru';
export function setLang(l: 'ru' | 'en') { LANG = l; localStorage.setItem('cvx.lang', l); }
/** Split original message into pages (form-feed separated) and translate each page. */
export function pages(msg: string): string[] {
  const raw = msg.replace(/<0>|<1>/g, '').split('\f').map((s) => s.replace(/^\n+/, '').replace(/\{[0-9a-f]+:[0-9a-f]+\}/g, '').trimEnd()).filter((s) => s.trim().length);
  if (LANG === 'en') return raw;
  return raw.map((p) => RU[p] ?? RU[p.trim()] ?? p);
}
export function itemName(en: string) { return LANG === 'ru' ? (ITEM_RU[en] ?? en) : en; }
const ru = () => LANG === 'ru';
export const UI = {
  take: () => (ru() ? 'Взять' : 'Take'),
  takeQ: (n: string) => (ru() ? `Взять: ${n}?` : `Will you take the ${n}?`),
  yes: () => (ru() ? 'Да' : 'Yes'), no: () => (ru() ? 'Нет' : 'No'),
  got: (n: string) => (ru() ? `Получено: ${n}.` : `Picked up the ${n}.`),
  full: () => (ru() ? 'Нет места в инвентаре.' : 'You cannot carry any more items.'),
  saveQ: () => (ru() ? 'Сохранить игру? (будет использована красящая лента)' : 'Use an ink ribbon to save?'),
  saved: () => (ru() ? 'Игра сохранена.' : 'Game saved.'),
  locked: () => (ru() ? 'Дальше — улица острова Рокфорт.\nЭта часть пока не перенесена.' : 'Beyond this door lies Rockfort Island.\nThis area is not ported yet.'),
  camFixed: () => (ru() ? 'Камера: фиксированная' : 'Camera: fixed'),
  camBehind: () => (ru() ? 'Камера: от третьего лица' : 'Camera: third person'),
  // lighter-lit variants of the dark-area messages
  litOutside: () => (ru() ? 'При свете зажигалки видно:\nза решёткой лишь пустой\nтёмный коридор...' : 'By the lighter\'s flame I can see\nonly an empty, dark\ncorridor outside...'),
  litDark: () => (ru() ? 'Зажигалка освещает угол.\nЗдесь ничего нет.' : 'The lighter lights up the corner.\nThere is nothing here.'),
  litWound: () => (ru() ? 'Даже при свете зажигалки\nя вряд ли смогу как следует\nобработать его рану.' : "Even with the lighter I don't\nthink I can treat\nhis wound properly."),
};
