exports.run = (client, message, args) => {
  console.log(message.author.tag+" in "+message.guild+" issued command y!ping");
  message.channel.send('Pong!~');
  message.channel.send('Ping: '+client.ping+'ms');
}
