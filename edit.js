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

const wordSelect = document.getElementById("wordSelect");
const wordInput = document.getElementById("wordInput");
const meaningInput = document.getElementById("meaningInput");
const partInput = document.getElementById("partInput");
const exampleInput = document.getElementById("exampleInput");
const rootInput = document.getElementById("rootInput");
const saveBtn = document.getElementById("saveBtn");
const newBtn = document.getElementById("newBtn");
const deleteBtn = document.getElementById("deleteBtn");

let words = [];
let selectedIndex = 0;

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
      console.warn("儲存資料讀取失敗，使用預設單字。", error);
    }
  }
  words = defaultWords.slice();
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function populateSelect() {
  wordSelect.innerHTML = words
    .map((item, index) => `<option value="${index}">${item.word}</option>`)
    .join("");
  wordSelect.value = selectedIndex;
}

function updateForm() {
  const current = words[selectedIndex];
  wordInput.value = current.word;
  meaningInput.value = current.meaning;
  partInput.value = current.part;
  exampleInput.value = current.example;
  rootInput.value = current.root;
}

function setSelected(index) {
  selectedIndex = index;
  populateSelect();
  updateForm();
}

function saveCurrentWord() {
  const trimmedWord = wordInput.value.trim();
  if (!trimmedWord) {
    alert("請輸入英文單字。"
    );
    return;
  }

  words[selectedIndex] = {
    word: trimmedWord,
    meaning: meaningInput.value.trim() || "",
    part: partInput.value.trim() || "",
    example: exampleInput.value.trim() || "",
    root: rootInput.value.trim() || ""
  };

  saveWords();
  populateSelect();
  wordSelect.value = selectedIndex;
  alert("已儲存單字變更。返回主頁即可查看最新內容。");
}

function createNewWord() {
  const newWord = {
    word: "",
    meaning: "",
    part: "",
    example: "",
    root: ""
  };

  words.push(newWord);
  selectedIndex = words.length - 1;
  populateSelect();
  updateForm();
  saveWords();
  alert("已新增一筆空白單字，可立即編輯內容。" );
}

function deleteCurrentWord() {
  if (words.length <= 1) {
    alert("至少要保留一個單字。" );
    return;
  }

  if (!confirm(`確定要刪除「${words[selectedIndex].word}」嗎？`)) {
    return;
  }

  words.splice(selectedIndex, 1);
  selectedIndex = Math.max(0, selectedIndex - 1);
  saveWords();
  populateSelect();
  updateForm();
  alert("已刪除目前單字。" );
}

wordSelect.addEventListener("change", (event) => {
  setSelected(Number(event.target.value));
});

saveBtn.addEventListener("click", saveCurrentWord);
newBtn.addEventListener("click", createNewWord);
deleteBtn.addEventListener("click", deleteCurrentWord);

loadWords();
populateSelect();
updateForm();
