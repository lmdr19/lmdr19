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

// Autres fonctions...
// Gardez ici les fonctions getOctoSigning, getTodayDate, getMySelf, getDBNWSentence

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
