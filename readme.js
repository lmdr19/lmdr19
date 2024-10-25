// Importation du module fs pour écrire dans README.md
const fs = require('fs');

// Fonction pour obtenir la date actuelle au format désiré
const today = new Date();
const todayDate = today.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// Calcul des jours restants avant le Nouvel An
const newYear = new Date(today.getFullYear() + 1, 0, 1);
const daysBeforeNewYear = Math.floor((newYear - today) / (1000 * 60 * 60 * 24));

// Contenu du README avec les valeurs dynamiques
const content = `### Hello there! 👋

I develop web applications and share my journey with the world. You can follow me on [Twitter](https://twitter.com/id_ProLM) for daily updates and cool tech content!

### About me

I am passionate about coding, creating, and continuously learning new web technologies. My goal is to help others grow by sharing knowledge and experience.

### Contact me

* [Twitter](https://twitter.com/id_ProLM)
* [Mail](mailto:contact@id_prolm.com)

### My Projects

* [My Portfolio](https://laurent-portefolio.vercel.app/)

This is my personal website, where you can discover my projects, blog, and résumé. 

* [CodeMaster](https://id_prolm.com/codemaster)

A platform to sharpen your coding skills with exercises and tutorials for various web technologies.

* [DevCommunity](https://id_prolm.com/devcommunity)

Join a community of developers where we share knowledge, solve problems, and collaborate on cool projects.

* [QuizMaster](https://id_prolm.com/quizmaster)

Challenge yourself with programming quizzes and puzzles. Test your knowledge and improve your problem-solving skills!

### Fun Tools

* [QuickCorrect](https://id_prolm.com/quickcorrect)

A tool to correct grammar in large documents swiftly.

* [LinkedAssist](https://id_prolm.com/linkedassist)

Automate your LinkedIn connections with just one click.

* [NoteMaster](https://id_prolm.com/notemaster)

Simplify your daily note-taking process.

### Visitor count

<img src="https://profile-counter.glitch.me/id_ProLM/count.svg" />

Added on: Tue 1 Oct 2024

Last update on ${todayDate}

${daysBeforeNewYear} days before New Year's Day 🎉

✨ Powered by OctoCommiter
`;

// Écriture du contenu dans README.md
fs.writeFileSync('README.md', content);
