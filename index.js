const { promises: fs } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;
const today = new Date();

function generateNewREADME() {
  const readmeRow = readme.split('\n');

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
    octo_signing: getOctoSigning(),  // Utilisation de la fonction getOctoSigning
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRow.join('\n');
}

const moodByDay = {
  1: 'hate',
  2: 'wickedness',
  3: 'pleasure',
  4: 'wickedness',
  5: 'cruelty',
  6: 'horror',
  7: 'love',
};

function getOctoSigning() {
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();  // Dimanche devient 7
  const mood = moodByDay[dayOfWeek];
  return `🤖 This README.md is updated with ${mood}, by OctoCommitter ❤️`;
}

function getTodayDate() {
  return today.toDateString();
}

function getMySelf() {
  // Vérifie si nous sommes dans un jour pair
  return today.getDate() % 2 === 0
    ? Math.floor(Math.random() * 2)
      ? 'penguin 🐧'
      : 'bear 🐻'
    : 'penguin bear 🐧🐻';
}

function getDBNWSentence() {
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(nextYear, 0, 1);  // 1er janvier de l'année prochaine

  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day before ${nextYear} ⏱**`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = async (text) => {
  try {
    await fs.writeFile('./README.md', text);
    console.log('README.md successfully updated!');
  } catch (error) {
    console.error('Error updating README.md:', error);
  }
};

async function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  await updateREADMEFile(newREADME);
}

main();
