const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer,
  maxTime = 60,
  timeLeft = maxTime;

let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  charIndex = 0;
  inpField.value = "";
  mistakes = 0;
  timeLeft = maxTime;
  mistakeTag.innerText = mistakes;
  timeTag.innerText = timeLeft;
  cpmTag.innerText = 0;
  wpmTag.innerText = 0;
  clearInterval(timer);
  isTyping = false;
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedChar == null) {
    if (charIndex > 0) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
        mistakeTag.innerText = mistakes;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    }
  } else {
    if (charIndex < characters.length) {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }

    mistakeTag.innerText = mistakes;

    
    const cpm = charIndex - mistakes;
    cpmTag.innerText = cpm;

    const elapsedTime = maxTime - timeLeft;
    const wpm = Math.round((charIndex - mistakes) / 5 / (elapsedTime / 60));
    wpmTag.innerText = elapsedTime > 0 ? wpm : 0;
  }
}

document.addEventListener("keydown", () => inpField.focus());
typingText.addEventListener("click", () => inpField.focus());

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

randomParagraph();
inpField.addEventListener("input", initTyping);
