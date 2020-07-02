"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
let jokeMode = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const message = {
      author: "monkey",
      text: `${messages[Math.round(Math.random() * 5)]}`,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.message };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = ["bye", "goodbye", "seeya"];
      const jokes = [
        `I bought my friend an elephant for his room.
      He said "Thanks"
      I said "Don't mention it"`,
        `I bought the world's worst thesaurus yesterday. Not only is it terrible, it's terrible.`,
        `What's the difference between a good joke and a bad joke timing.`,
      ];

      let botMsg = text;
      if (jokeMode === true) {
        if (text == "YES") {
          botMsg = `${jokes[Math.floor(Math.random() * 3)]}`;
          jokeMode = false;
        } else if (text == "NO") {
          botMsg = "Goodbye...";
          jokeMode = false;
        } else {
          botMsg = `Unrecognized answer. Please reply with 'YES' or 'NO'.`;
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (text.includes(commonGreetings[i])) {
            botMsg = "Hello!";
          } else if (text.includes(commonGoodbyes[i])) {
            botMsg = "Goodbye...";
          }
        }
        if (text.includes("something funny")) {
          botMsg = `Do you want to hear a joke? Answer with either 'YES' or 'NO'.`;
          jokeMode = true;
        }
      }
      return botMsg;
    };
    const message = {
      author: "parrot",
      text: `Bzzt ${getBotMessage(req.query.message)}`,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
