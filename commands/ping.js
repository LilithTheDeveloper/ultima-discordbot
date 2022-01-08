const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({content: 'Pong! Im gonna wait 5 seconds and then...', ephemeral: false });
		await wait(5000);
		await interaction.editReply('Pong! Im gonna wait 5 seconds and then I\'m gonna edit this command!');
	},
};