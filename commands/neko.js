const booru = require('booru');
var tag = [
  'catgirl'
];
exports.run = (client, message, args) => {
  console.log(message.author.tag+" in "+message.guild+" issued command y!neko");
  booru.search('safebooru', tag, {limit: 1, random: true})
    .then(booru.commonfy)
    .then(images => {
      for (let image of images) {
        message.channel.send(image.common.file_url)
      }
    })
    .catch(err => {
      if (err.name === 'booruError') {
        message.channel.send(err.message)
      } else {
        console.log(err)
      }
    })
  
};
