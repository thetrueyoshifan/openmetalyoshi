// Importing the required Discord.js library
const Discord = require("discord.js");

// Create a new client instance from Discord.js
const client = new Discord.Client();

// Importing the fs library, to allow reading commands from a file
const fs = require("fs");

// Importing the config file, which contains the token, prefix, owner, and any other constant values
const config = require("./config.json");

// Contains event handlers for various discord.js events. We use this to print a message when the client is ready, as well as when the bot joins or leaves servers.
// For a reference of events that can be handled here, see: https://discord.js.org/#/docs/main/stable/class/Client
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

// The one event not handled within the events folder, is the message event.
client.on("message", (message) => {
	// Return if the message doesn't contain the prefix, or if the user is a bot (to avoid bot loops)
	if (!message.content.startsWith(config.prefix)|| message.author.bot) return;
	// Divide the received message into args
	const args = message.content.slice(2).trim().split(/ +/g);
    // ...and the command itself, which is not case sensitive
	const command = args.shift().toLowerCase();
	// Attempt to run the command
	try {
	    // Produce a file path for the command requested
    	let commandFile = require(`./commands/${command}.js`);
		// Execute the command file, passing the client object, message, and arguments
		commandFile.run(client, message, args);
    // Catch any errors that may occur (mostly from the command not existing)
    } catch (err) {
	    // Print them to the console, where they can be seen by the operator
		console.log(err)
	}
});
// Send a login request to Discord, using the client token
client.login(config.token);
