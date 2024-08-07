const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");

let charIndex = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = ""; // Clear previous content
  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  charIndex = 0; // Reset charIndex for new paragraph
  inpField.value = ""; // Clear input field
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length) {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }
}

document.addEventListener("keydown", () => inpField.focus());
typingText.addEventListener("click", () => inpField.focus());

randomParagraph();
inpField.addEventListener("input", initTyping);
