// 👹 Монстры
const monsterNames = ["Тень Душ", "Костяной Король", "Пожиратель Света"];
let nextMonsterAttack = 20;
let monsterActive = false;

const monsterNameEl = document.getElementById("monsterName");
const monsterDamageEl = document.getElementById("monsterDamage");
const nextAttackTimerEl = document.getElementById("nextAttackTimer");
const defendBtn = document.getElementById("defendBtn");

defendBtn.addEventListener("click", () => {
  if (mana >= 100) {
    mana -= 100;
    if (monsterActive) {
      monsterActive = false;
      monsterNameEl.textContent = "—";
      monsterDamageEl.textContent = "0";
      alert("Ты изгнал монстра с помощью магии!");
    } else {
      alert("Нет монстра для изгнания.");
    }
    updateUI();
  } else {
    alert("Не хватает маны на защиту!");
  }
});

// Таймер атак
setInterval(() => {
  if (!monsterActive) {
    nextMonsterAttack -= 1;
    nextAttackTimerEl.textContent = nextMonsterAttack + " сек.";
    if (nextMonsterAttack <= 0) {
      summonMonster();
    }
  }
}, 1000);

function summonMonster() {
  monsterActive = true;
  nextMonsterAttack = Math.floor(20 + Math.random() * 30);
  const name = monsterNames[Math.floor(Math.random() * monsterNames.length)];
  const damage = Math.floor(1 + Math.random() * 3);

  monsterNameEl.textContent = name;
  monsterDamageEl.textContent = damage;

  setTimeout(() => {
    if (monsterActive) {
      towers = Math.max(0, towers - damage);
      monsterActive = false;
      monsterNameEl.textContent = "—";
      monsterDamageEl.textContent = "0";
      flashTowerDamage();
      updateUI();
    }
  }, 5000);
}

function flashTowerDamage() {
  towerCountEl.classList.add("text-red-500");
  setTimeout(() => {
    towerCountEl.classList.remove("text-red-500");
  }, 1000);
}

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
