const snekfetch = require("snekfetch");
const ce = require("embed-creator");
const Discord = require("discord.js")
const request = require("request")
exports.run = (client, message, args) => {
  // Log this event to the console
  console.log(message.author.tag+" in "+message.guild+" issued command y!status");
  request("http://random.cat/meow", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var meowThing = JSON.parse(body);
                            if (typeof (meowThing.file) != "undefined") {
                                message.channel.send(meowThing.file);
                            }
                            else {
                                message.channel.send("Things are going wrong all over.");
                            }
                        }
                    });
}
