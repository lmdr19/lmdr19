// Importation du module fs pour lire et écrire dans README.md
const fs = require("fs");

// Fonction pour obtenir la date actuelle
const today = new Date();
const todayDate = today.toLocaleDateString("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Calcul des jours restants avant le Nouvel An
const newYear = new Date(today.getFullYear() + 1, 0, 1);
const daysBeforeNewYear = Math.floor((newYear - today) / (1000 * 60 * 60 * 24));

// Lecture du contenu actuel du README.md
let readme;
try {
  readme = fs.readFileSync("README.md", "utf-8");
} catch (error) {
  console.error("Erreur lors de la lecture de README.md :", error);
  process.exit(1);
}

// Remplacement des balises dynamiques
const updatedContent = readme
  .replace(/<today_date>/g, todayDate) // Remplace <today_date> par la date actuelle
  .replace(/<days_before_new_year>/g, daysBeforeNewYear); // Remplace <days_before_new_year> par les jours avant le Nouvel An

// Écriture du contenu mis à jour dans README.md
fs.writeFileSync("README.md", updatedContent);
console.log("README.md successfully updated!");
