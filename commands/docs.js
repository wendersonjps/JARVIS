const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component } = require('discord.js')

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nenhuma tecnologia selecionada')
            .addOptions(
                {
                    label: 'Javascript',
                    description: 'Veja a documentação do Javascript',
                    value: 'javascript'
                },
                {
                    label: 'Node.js',
                    description: 'Veja a documentação do Node.js',
                    value: 'nodejs'
                },
                {
                    label: 'React.js',
                    description: 'Veja a documentação do React.js',
                    value: 'reactjs'
                },
                {
                    label: 'Discord.js',
                    description: 'Veja a documentação do Discord.js',
                    value: 'discordjs'
                },
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName('docs')
        .setDescription('Acesse a documentação da tecnologia que quiser'),

    async execute(interaction) {
        await interaction.reply({ content: 'Selecione uma das tecnologias abaixo:', components: [row] })
    }
}
