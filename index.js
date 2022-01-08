//Imports, Versioning and stuff
const VERSION = "0.0 - Alpha";
const AUTHOR = "The Unkindled";

// Require the necessary discord.js classes
const fs = require('fs');

const { Client, Collection, Intents  } = require('discord.js');
const { clientId, guildId, token } = require('./config/config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Dynamic Command Handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    console.log('Version: ' + VERSION);
    console.log('Author: ' + AUTHOR);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	try {
		await command.execute(interaction);
	} catch (error) {
		//console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token)
    .then(console.log('Client connecting...'))
    .catch(error => console.log("The provided token is invalid. Please check your config file in config/config.json for a valid bot token.\n" + error))