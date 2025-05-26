// main.js
let mana = 0;
let towers = 0;
let manaPerClick = 10;
let manaPerSecond = 0;
let upgrades = {
  clickPower: { level: 1, cost: 100 },
  manaFlow: { level: 0, cost: 150 }
};

const manaCountEl = document.getElementById("manaCount");
const towerCountEl = document.getElementById("towerCount");
const gatherBtn = document.getElementById("gatherBtn");
const buildBtn = document.getElementById("buildBtn");
const upgradeClickBtn = document.getElementById("upgradeClickBtn");
const upgradePassiveBtn = document.getElementById("upgradePassiveBtn");
const manaPerSecEl = document.getElementById("manaPerSec");

gatherBtn.addEventListener("click", () => {
  mana += manaPerClick;
  updateUI();
});

buildBtn.addEventListener("click", () => {
  if (mana >= 50) {
    mana -= 50;
    towers += 1;
    manaPerSecond += 2;
    updateUI();
  } else {
    alert("Недостаточно маны!");
  }
});

upgradeClickBtn.addEventListener("click", () => {
  const upg = upgrades.clickPower;
  if (mana >= upg.cost) {
    mana -= upg.cost;
    upg.level += 1;
    manaPerClick += 5;
    upg.cost = Math.floor(upg.cost * 1.7);
    updateUI();
  }
});

upgradePassiveBtn.addEventListener("click", () => {
  const upg = upgrades.manaFlow;
  if (mana >= upg.cost) {
    mana -= upg.cost;
    upg.level += 1;
    manaPerSecond += 1;
    upg.cost = Math.floor(upg.cost * 2);
    updateUI();
  }
});

function updateUI() {
  manaCountEl.textContent = mana;
  towerCountEl.textContent = towers;
  manaPerSecEl.textContent = manaPerSecond;
  upgradeClickBtn.textContent = `🔱 Улучшить клик (LVL ${upgrades.clickPower.level}) — ${upgrades.clickPower.cost}💠`;
  upgradePassiveBtn.textContent = `🌊 Поток маны (LVL ${upgrades.manaFlow.level}) — ${upgrades.manaFlow.cost}💠`;
}

setInterval(() => {
  mana += manaPerSecond;
  updateUI();
}, 1000);

updateUI();
