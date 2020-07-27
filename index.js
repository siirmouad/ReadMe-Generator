const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const writeToFile = require("write-to-file");
const emoji = require("node-emoji");
const markdown = require("./utils/generateMarkdown.js");
// const github = require("./utils/github.js");

// emojis
const checkmark = emoji.get("heavy_check_mark");

// command line prompts
const questions = [
  "Enter your full name:",
  "Enter your email:",
  "Enter your Github username:",
  "Enter the name of the Github repo:",
  "Project title:",
  "Deployed page url:",
  "Project description:",
  "Installation:",
  "Usage:",
  "(comma-delimited) Credits:",
  "Enter ideas for Future Enhancements:",
];

let prompts = [];

// contructor function to create prompt object for each question
const Prompt = function (question) {
  (this.type = "input"),
    (this.message = question),
    (this.name = this.message.split(" ").splice(-1).toString().toLowerCase());
  this.validate = function (value) {
    if (value.length) {
      return true;
    } else {
      return "Input required";
    }
  };
};

// generates an array of prompt objects to pass into inquirer
for (i = 0; i < questions.length; i++) {
  prompts[i] = new Prompt(questions[i]);
  prompts[i].name = prompts[i].name.substring(0, prompts[i].name.length - 1);
}

// command line prompts
inquirer.prompt(prompts).then(function (response) {
  let data = markdown(response);

  (async () => {
    try {
      await writeToFile("README_.md", data);
      await console.log(`${checkmark}  README.md successfully created!`);
    } catch (error) {
      console.error(error.message);
    }
  })();
});

function generateCredits(credits) {
  let creditsArr = credits.split(",");

  for (var i = 0; i < creditsArr.length; i++) {
    creditsArr[i] = creditsArr[i].trim().toLowerCase();
  }

  let renderCredits = [];

  for (var j = 0; j < creditsArr.length; j++) {
    let credit = creditsArr[j].toLowerCase();
    if (credit === "inquirer") {
      renderCredits.push(
        `* [Inquirer](https://www.npmjs.com/package/inquirer)`
      );
    } else if (credit === "jest") {
      renderCredits.push(`* [Jest](https://jestjs.io/)`);
    } else if (credit === "bootstrap") {
      renderCredits.push(`* [Bootstrap](https://getbootstrap.com/)`);
    } else if (credit === "font awesome" || credit === "fontawesome") {
      renderCredits.push(`* [Font Awesome](https://fontawesome.com/)`);
    } else if (credit === "moments" || credit === "moments.js") {
      renderCredits.push(`* [Moments.js](https://momentjs.com/)`);
    } else if (credit === "express" || credit === "express.js") {
      renderCredits.push(
        `* [Express.js](https://www.npmjs.com/package/express)`
      );
    } else if (credit === "mysql") {
      renderCredits.push(`* [MySQL](https://www.npmjs.com/package/mysql)`);
    } else if (credit === "chalk") {
      renderCredits.push(`* [Chalk](https://www.npmjs.com/package/chalk)`);
    } else if (credit === "fs") {
      renderCredits.push(
        `* [file-system](https://www.npmjs.com/package/file-system)`
      );
    } else {
      renderCredits.push(`* ${credit}`);
    }
  }

  return renderCredits.join("\n\n");
}

module.exports = generateCredits;
