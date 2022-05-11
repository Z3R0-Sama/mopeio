const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require('discord.js');
let xp = require('simply-xp')

module.exports = {
    name: 'charts',
    //aliases: [''],
    description: 'Shows the XP charts on a graph.',
    timeout: 3,
    //usage: '',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        xp.charts(message, {
            position: 5,
            type: 'bar'
        }).then((attach) => {
            message.reply({
                files: [attach]
            })
        })

    },
};