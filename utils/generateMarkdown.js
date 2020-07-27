const generateCredits = require("./credits.js");

function generateMarkdown(data) {
  let credits = data.credits;
  let links = generateCredits(credits);
  return `
  # Title: ${data.title}
  ![last commit](https://img.shields.io/github/last-commit/${data.username}/${
    data.repo
  }?style=flat-square)![license badge](https://img.shields.io/github/license/${
    data.username
  }/${data.repo}?style=flat-square)
  ### URL: ${data.url}
  ## Description 
  
  ${data.description}
  ## Table of Contents 
   
  * [Installation](#installation)
  * [Usage](#usage)
  * [Future Developments](#future-developments)
  * [Credits](#credits)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation 
  \`\`\
  ${data.installation}
  \`\`\
  
  ## Usage 
  
  ${data.usage}
  ## Future Developments
  ${data.future - developments}
  ## Credits
  ${links}
  ## Contributors: ${data.contributions}
  ## Questions?
  Contact me at  [${data.email}](mailto:${data.email}]
  
  or [![Follow on Github](https://img.shields.io/github/followers/${
    data.username
  }?label=Follow&style=social)](http://www.github.com/${data.username})
  Copyright © 2020 [${data.name}](http://www.github.com/${data.username})
  ---
  
  
}

module.exports = generateMarkdown;
