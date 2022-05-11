const express = require('express');
const app = express();
const port = 3000;
require('simply-xp')
app.get('/', (req, res) => res.send('Hello Peeps.'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
const discordModals = require('discord-modals') 
discordModals(client);
// Initializing the project
require("./handler")(client);
let xp = require('simply-xp')
    xp.connect(process.env['mongo'], {
        notify: false
        })

        
client.login(process.env.DISCORD_TOKEN);