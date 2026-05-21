const STORAGE_KEY = "flashcardWords";

const defaultWords = [
  {
    word: "abandon",
    meaning: "放棄；拋棄",
    part: "動詞",
    example: "He had to abandon the old bike because it was too damaged.",
    root: "a- (to) + bandon (control/authority) → 放開控制"
  },
  {
    word: "adapt",
    meaning: "適應；改編",
    part: "動詞",
    example: "She adapted quickly to the new school environment.",
    root: "ad- (to) + apt (fit) → 使合適"
  },
  {
    word: "burst",
    meaning: "爆發；破裂",
    part: "動詞",
    example: "The balloon burst when it touched the candle flame.",
    root: "burst 原本即為破裂、迸發的意思"
  },
  {
    word: "curious",
    meaning: "好奇的；求知的",
    part: "形容詞",
    example: "The curious student asked many questions in class.",
    root: "curi- (care) + -ous → 關心、好奇"
  },
  {
    word: "eager",
    meaning: "渴望的；熱切的",
    part: "形容詞",
    example: "She was eager to start the science experiment.",
    root: "ea- (out) + ger (bring) → 想要帶出來，渴望"
  },
  {
    word: "fashion",
    meaning: "時尚；方式",
    part: "名詞",
    example: "He likes to follow the latest fashion trends.",
    root: "fas- (to make) → 形成、方式"
  },
  {
    word: "grateful",
    meaning: "感激的；感謝的",
    part: "形容詞",
    example: "I am grateful for your help with the homework.",
    root: "grate- (pleasing) + -ful → 心中有恩義"
  },
  {
    word: "horizon",
    meaning: "地平線；視野",
    part: "名詞",
    example: "The sun sank slowly below the horizon.",
    root: "hori- (boundary) + -zon (line) → 地平線"
  },
  {
    word: "identify",
    meaning: "識別；確認",
    part: "動詞",
    example: "The detective identified the suspect from the photo.",
    root: "id- (same) + -entify (make) → 確認為相同"
  },
  {
    word: "journey",
    meaning: "旅行；旅程",
    part: "名詞",
    example: "Their journey to the mountain village took three hours.",
    root: "jour- (day) → 一天的旅程"
  }
];

const wordElm = document.getElementById("word");
const meaningElm = document.getElementById("meaning");
const partElm = document.getElementById("part");
const exampleElm = document.getElementById("example");
const rootElm = document.getElementById("root");
const flipCard = document.getElementById("flashcard");
const flipBtn = document.getElementById("flipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let words = [];
let activeIndex = 0;
let isFlipped = false;

function loadWords() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        words = parsed;
        return;
      }
    } catch (error) {
      console.warn("讀取儲存資料失敗，使用預設單字。", error);
    }
  }
  words = defaultWords.slice();
}

function updateCard() {
  const current = words[activeIndex];
  wordElm.textContent = current.word;
  meaningElm.textContent = current.meaning;
  partElm.textContent = current.part;
  exampleElm.textContent = current.example;
  rootElm.textContent = current.root;
  flipCard.classList.toggle("flipped", isFlipped);
}

function showNextWord() {
  activeIndex = (activeIndex + 1) % words.length;
  isFlipped = false;
  updateCard();
}

function showPrevWord() {
  activeIndex = (activeIndex - 1 + words.length) % words.length;
  isFlipped = false;
  updateCard();
}

flipBtn.addEventListener("click", () => {
  isFlipped = !isFlipped;
  updateCard();
});

flipCard.addEventListener("click", () => {
  isFlipped = !isFlipped;
  updateCard();
});

prevBtn.addEventListener("click", showPrevWord);
nextBtn.addEventListener("click", showNextWord);

loadWords();
updateCard();
