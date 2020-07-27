const inquirer = require("inquirer");
const fs = require("fs");
// const conversion = require("phantom-html-to-pdf")();
const axios = require("axios");
const pdf = require("html-pdf");
const emoji = require("node-emoji");

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Enter your GitHub username:",
      name: "username",
    },
    {
      type: "list",
      message: "What's your favorite color?",
      name: "faveColor",
      choices: ["red", "pink", "green", "blue"],
    },
  ]);
}

let readyToConvert = false;
promptUser()
  .then(function ({ username, faveColor }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function (res) {
      console.log(res);
      info = {
        color: faveColor,
        profilePic: res.data.avatar_url,
        name: res.data.login,
        location: res.data.location,
        profileUrl: res.data.html_url,
        blog: res.data.blog,
        bio: res.data.bio,
        company: res.data.company,
        repos: res.data.public_repos,
        followers: res.data.followers,
        following: res.data.following,
      };
      console.log(info);

      const newQueryUrl = `https://api.github.com/users/${username}/repos`;
      console.log(newQueryUrl);

      axios.get(newQueryUrl).then(function (res) {
        let starCount = 0;
        for (let index = 0; index < res.data.length; index++) {
          let count = res.data[index].stargazers_count;
          starCount = starCount + count;
        }
        console.log("Final star count for all repositories: " + starCount);
        info.starCount = starCount;
        const html = generateHTML(info);

        console.log(`${username}.html is ready to convert to PDF`);
        readyToConvert = true;

        // for testing the HTML file that gets written to disk
        fs.writeFileSync(`${username}.html`, html);

        // https://www.npmjs.com/package/html-pdf
        var options = { format: "landscape" };
        pdf
          .create(html, options)
          .toFile(`${username}.pdf`, function (err, res) {
            if (err) return console.log(err);
            console.log(res);
          });
      });
    });
    // })
    //.then(function () {

    // })

    //.then(function () {
  })
  .catch(function (err) {
    console.log(err);
  });
