const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field");

let charIndex = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);

  paragraphs[randIndex].split("").forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");

  if (charIndex < characters.length) {
    let typedChar = inpField.value.split("")[charIndex];

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
