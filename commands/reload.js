const config = require("../config.json");
const admins = require("../admins.json");
exports.run = (client, message, args) => {
  if(admins.admins.indexOf(message.author.id) === -1){
    message.channel.send("Sorry, but you can't do that!");
    return;
  }
  if(args.size < 1) return message.channel.send("Please specify a command to reload!");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`The command ${args[0]} has been reloaded`);
};
