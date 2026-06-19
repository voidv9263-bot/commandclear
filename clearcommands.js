const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const TOKEN = 'YOUR_BOT_TOKEN';
const CLIENT_ID = 'YOUR_CLIENT_ID';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {
    console.log(`${client.user.tag} is online!`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Deleting all global slash commands...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: [] }
        );

        console.log('Successfully deleted all global slash commands.');
    } catch (error) {
        console.error(error);
    }
});

client.login(TOKEN);