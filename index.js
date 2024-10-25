const fs = require("fs");

// Lire le contenu actuel de README.md
let readme;
try {
  readme = fs.readFileSync("README.md", "utf-8"); // Assure que readme est une chaîne de caractères
} catch (error) {
  console.error("Erreur lors de la lecture de README.md :", error);
  process.exit(1);
}

const msInOneDay = 1000 * 60 * 60 * 24;
const today = new Date();

function generateNewREADME() {
  const readmeRow = readme.split("\n");

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRow, identifier);
    if (!readmeRow[identifierIndex]) return;
    readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    day_before_new_years: getDBNWSentence(),
    today_date: getTodayDate(),
    octo_signing: getOctoSigning(), // Utilisation de la fonction getOctoSigning
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRow.join("\n");
}

// Définition de la fonction getDBNWSentence
function getDBNWSentence() {
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(nextYear, 0, 1); // 1er janvier de l'année prochaine

  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} days before ${nextYear} ⏱**`;
}

// Définition des autres fonctions nécessaires
function getTodayDate() {
  return today.toDateString();
}

const moodByDay = {
  1: "hate",
  2: "wickedness",
  3: "pleasure",
  4: "wickedness",
  5: "cruelty",
  6: "horror",
  7: "love",
};

function getOctoSigning() {
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // Dimanche devient 7
  const mood = moodByDay[dayOfWeek];
  return `🤖 This README.md is updated with ${mood}, by OctoCommitter ❤️`;
}

function getMySelf() {
  return today.getDate() % 2 === 0
    ? Math.floor(Math.random() * 2)
      ? "penguin 🐧"
      : "bear 🐻"
    : "penguin bear 🐧🐻";
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, "i"))));

function updateREADMEFile(text) {
  try {
    fs.writeFileSync("README.md", text);
    console.log("README.md successfully updated!");
  } catch (error) {
    console.error("Error updating README.md:", error);
  }
}

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}

main();
