const os = require("os");
const proc = require("process");
const config = require("../config.json");
const ce = require("embed-creator");

function secondsToString(seconds) {
        seconds = Math.trunc(seconds)
        let numdays = Math.floor((seconds % 31536000) / 86400)
        let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
        let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
        let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
        return `${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds`
}

exports.run = (client, message, args) => {
  // Log this event to the console
  console.log(message.author.tag+" in "+message.guild+" issued command y!status");
  message.channel.send(ce(
    "#FEAFEA", {"name": "Metal Yoshi", "icon_url": message.author.displayAvatarURL, "url": null},  "Bot Status", "Current status of Metal Yoshi",
    [{"name": ":gear: Memory Free", "value": Math.round(os.freemem()/1024/1024)+"mb / "+Math.round(os.totalmem()/1024/1024)+"mb ("+(os.freemem()/os.totalmem()*100).toFixed(2)+"% Free)"},
    {"name": ":clock: Uptime", "value": secondsToString(proc.uptime()).toString()},
    {"name": ":desktop: Servers", "value": client.guilds.array().length}],
  ));
}
