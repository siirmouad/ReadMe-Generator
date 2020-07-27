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
