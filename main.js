// main.js
let mana = 0;
let towers = 0;

const manaCountEl = document.getElementById("manaCount");
const towerCountEl = document.getElementById("towerCount");
const gatherBtn = document.getElementById("gatherBtn");
const buildBtn = document.getElementById("buildBtn");

gatherBtn.addEventListener("click", () => {
  mana += 10;
  updateUI();
});

buildBtn.addEventListener("click", () => {
  if (mana >= 50) {
    mana -= 50;
    towers += 1;
    updateUI();
  } else {
    alert("Недостаточно маны для строительства!");
  }
});

function updateUI() {
  manaCountEl.textContent = mana;
  towerCountEl.textContent = towers;
}
