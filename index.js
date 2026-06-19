require('dotenv').config();

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Clearing all global slash commands...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: [] }
        );

        console.log('Successfully cleared all global slash commands.');
    } catch (err) {
        console.error(err);
    }

    process.exit(0);
});

client.login(TOKEN);
