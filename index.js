const Discord = require("discord.js");
const client = new Discord.Client();
const { sendEmbed } = require("./embed");
const prefix = "dapomo!";

let time = 0;
let sessionMinutes = time;
let spentTime = 0;
let type = "work";
let breakMinutes = 300;
let timercounter = null;

let message = "You don't have a pomodoro session";

const counter = (msg) => {
  spentTime++;

  if (type === "work") {
    message = "Work Session";
    sessionMinutes--;
    if (sessionMinutes < 0) {
      sessionMinutes = breakMinutes;
      message = "You are in break session!";
      msg.channel.send("Break time!");

      type = "break";
    }
  }
  if (type === "break") {
    message = "Break session";
    breakMinutes--;
    sessionMinutes = breakMinutes;

    if (breakMinutes < 0) {
      msg.channel.send("Work time!");

      type = "work";
    }
  }
};

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  let args = msg.content.substring(prefix.length).split(" ");
  let command = args[0];
  
  if (msg.content.substring(0, prefix.length) == prefix) {
    
    if (command === "start") {
      if (timercounter !== null) {
        return msg.channel.send("A pomodoro is already running")
      }
      if (timercounter === null) {
        time = parseInt(args[1]) * 60;
      sessionMinutes = time;
      if (isNaN(time)) {
        return msg.channel.send("Invalid value");
      }
      if (args[1] <= 0) {
        return msg.channel.send("Your session must be higher than 0 minutes.");
      }
      if (!args[1]) {
        return msg.channel.send("You must enter a number.");
      }
      if (!isNaN(sessionMinutes)) {
        msg.channel.send(
          `Your ${time / 60} minutes session has started, break is 5 minutes. `
        );
        timercounter = setInterval(function () {
          counter(msg);
        }, 1000);
      }
      }
      
      
    }
    if (command === "restart") {
      msg.channel.send("Session restarted!");
      timercounter = setInterval(function () {
        counter(msg);
      }, 1000);
    }
    if (timercounter !== null) {
      if (command === "pause") {
        msg.channel.send("Session paused!");
        clearInterval(timercounter);
      }
      if (command === "resume") {
        msg.channel.send("Session resuming.");
        timercounter = setInterval(function () {
          counter(msg);
        }, 1000);
      }
      if (command === "end") {
        msg.channel.send("Session has ended!");
        spentTime = 0;
        clearInterval(timercounter);
        timercounter = null
      }
      
      
    }
    if (command === "help") {
      
      sendEmbed(Discord, msg, message, sessionMinutes, time, "help");
    }
    if (command === "status") {
      sendEmbed(Discord, msg, message, sessionMinutes, time, "status");
    }

    
  }
});

client.login("ODU4MDUzNjIwMzM4NjU1MjYy.YNYitA.3M0FRn33BcxTOgq79gm0f4cxgYU");
