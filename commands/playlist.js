const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Playlistzinha de folk indie para acalmar a vida'),

    async execute(interaction) {
        await interaction.reply('https://open.spotify.com/playlist/51UIqZaRs91e0eFPWcnjnR?si=c9c5dab255764468')
    }
}
