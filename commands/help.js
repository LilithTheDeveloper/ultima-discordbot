const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Helps you out!'),
	async execute(interaction) {
		await interaction.deferReply("Dude let me think...");
		await wait(15000);
		await interaction.editReply("5 seconds later");
	},
};