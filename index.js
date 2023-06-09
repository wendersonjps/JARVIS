const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// .env File
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// Commands Import
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes!`)
    }
}

// Bot Login
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login realizado como: ${c.user.tag}`)
})
client.login(TOKEN)

// Bot Interaction Listener
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]
        if (selected == 'javascript') {
            await interaction.reply('Documentação do JavaScript: https://www.w3schools.com/js/')
        } else if (selected == 'nodejs') {
            await interaction.reply('Documentação do Node.js: https://nodejs.org/en')
        } else if (selected == 'reactjs') {
            await interaction.reply('Documentação do React.js: https://react.dev')
        } else if (selected == 'discordjs') {
            await interaction.reply('Documentação do Discord.js: https://discord.js.org')
        }
    }
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error('Comando não encontrado!')
        return
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply('Houve um erro ao executar esse comando!')
    }
})
