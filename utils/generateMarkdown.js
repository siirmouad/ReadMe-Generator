const axios = require("axios");
const writeToFile = require("write-to-file");
const generateCredits = require("./credits.js");

function generateMarkdown(data) {
  let credits = data.credits;
  let links = generateCredits(credits);

  return `# ${data.title}
![last commit](https://img.shields.io/github/last-commit/${data.username}/${data.repo}?style=flat-square) ![license badge](https://img.shields.io/github/license/${data.username}/${data.repo}?style=flat-square)
### URL: ${data.url}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Future Enhancements](#future-enhancements)
* [Credits](#Credits)
* [Questions](#questions)
## Installation
\`\`\`
${data.installation}
\`\`\`
## Usage
${data.usage}

## Future Enhancements
${data.enhancements}
## Credits
${links}
## Questions?
Contact me at [${data.email}](mailto:${data.email}) 
`;
}

module.exports = generateMarkdown;
