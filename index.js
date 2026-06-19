require('dotenv').config();

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Clearing all global slash commands...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: [] }
        );

        console.log('✅ All global slash commands have been deleted.');
    } catch (error) {
        console.error('❌ Failed to clear commands:', error);
    }

    process.exit(0); // Stops the bot after clearing commands
});

client.login(TOKEN);
