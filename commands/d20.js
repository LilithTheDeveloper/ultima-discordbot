const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const diceUtility = require('../utilities/diceUtility.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d20')
		.setDescription('Rolls a D20')
        .addStringOption(option => 
            option.setName('expression')
                .setDescription('Enter a dice expression for applying boni. (e.g. 1d4 for bardic inspiration)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('advantagedisadvantage')
                .setDescription('Advantage or Disadvantage')
                .setRequired(false)),
	async execute(interaction) {
        try {  
            let roll = 0;
            let bonus = 0;
            let sign = "+";
            let expression = interaction.options.getString('expression');
            if (expression) {
                bonus = eval(expression.replace(/[^\d+-/*//]|\/\d+/g, ''));
                if (Number(bonus) < 0) sign = "";
                bonus = bonus || 0;
            }
            let advantageDisadvantage = interaction.options.getString('advantagedisadvantage');
            if (advantageDisadvantage) {
                if(advantageDisadvantage.toLowerCase() === "advantage"){
                    let roll1 = diceUtility.RandomFromTo(0, 20);
                    let roll2 = diceUtility.RandomFromTo(0, 20);
                    roll = (roll1 > roll2) ? roll1 : roll2;
                }
                else if(advantageDisadvantage.toLowerCase() === "disadvantage"){
                    let roll1 = diceUtility.RandomFromTo(0, 20);
                    let roll2 = diceUtility.RandomFromTo(0, 20);
                    roll = (roll1 > roll2) ? roll2 : roll1;
                }
            }
            else{
                roll = diceUtility.RandomFromTo(0, 20);
            }
            let msg = ` rolled: **${roll}** with **${sign}${bonus}**. That's a **${Number(roll) + Number(bonus)}**`;
            switch (roll) {
                case 20:
                    msg += ` with a critical success `;
                    break;
                case 1:
                    res += ` with a critical failure`;
                    break;
            }
            await interaction.reply(`<@${interaction.user.id}>${msg}!`);
        } catch (error) {
            await interaction.reply("Something went wrong...\n" + error)
        }
	},
};