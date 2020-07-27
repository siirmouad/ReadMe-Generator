const inquirer = require("inquirer");
const fs = require("fs");

const axios = require("axios");

// const emoji = require("node-emoji");

const questions = [
  "Enter your full name:",
  "Enter your email:",
  "Enter your Github username:",
  "Enter the name of the Github repo:",
  "Project title:",
  "Description:",
  "Deployed page url:",
  "Installation:",
  "Usage:",
  "Contributors:",
  "(comma-delimited) Credits:",
  "Enter ideas for Future Developments:",
];

let userPrompts = [];

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

for (i = 0; i < questions.length; i++) {
  userPrompts[i] = new Prompt(questions[i]);
  userPrompts[i].name = userPrompts[i].name.substring(
    0,
    userPrompts[i].name.length - 1
  );
}

inquirer.prompt(userPrompts).then(function (response) {
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
