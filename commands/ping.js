const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Se estiver vivo responderá com pong! '),

    async execute(interaction) {
        await interaction.reply('pong!')
    }
}
