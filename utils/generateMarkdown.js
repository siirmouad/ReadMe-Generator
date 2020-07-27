const axios = require("axios");
const writeToFile = require("write-to-file");
const generateCredits = require("./credits.js");

function generateMarkdown(data) {
  let credits = data.credits;
  let links = generateCredits(credits);

  return `# ${data.title}
### URL: ${data.url}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
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
