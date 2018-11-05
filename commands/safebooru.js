// Import the extremely useful booru module
const booru = require('booru');
exports.run = (client, message, args) => {
//  The code snippet below, and at the bottom of the file, allows you to check for NSFW content, if you wanted to use this with, say, e621 or rule34
//  if (message.channel.nsfw === true){
//  console.log(message.author.tag+" in "+message.guild+" issued command y!rule34 with tags "+args+"... and the channel is NSFW, so...");
  booru.search('safebooru', [args], {limit: 1, random: true})
    .then(booru.commonfy)
    .then(images => {
      for (let image of images) {
        message.channel.send(image.common.file_url)
      }
    })
    .catch(err => {
      if (err.name === 'booruError') {
        message.channel.send(err.message);
      } else {
        console.log(err)
      }
    })
// }
};
