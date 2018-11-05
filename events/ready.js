exports.run = (client) => {
  console.log('I am ready! Listening on ' + client.channels.array().length + ' channels in ' + client.guilds.array().length + ' servers!');
  client.user.setActivity("Open MY | y!help");
}
