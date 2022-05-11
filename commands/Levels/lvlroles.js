const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const mongoose = require('mongoose')
const Lvl = require('simply-xp/src/models/lvlrole');

module.exports = {
    name: 'lvlroles',
    aliases: ['lr', 'levelrole', 'lvlrole'],
    description: 'When you reach the required level, the level role is added to you.',
    timeout: 3,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const data = await Lvl.find({
            gid: '747480292171710654'
        });
        let ro = [];
        data[0].lvlrole.slice(0, 10).map(e => {
            ro.push(`**${e.lvl}** | ${message.guild.roles.cache.get(e.role)}`)
        });
        const msg = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Level Roles`)
            .setThumbnail(message.guild.iconURL({
                dynamic: true,
                size: 1024
            }))
            .setDescription(`When you reach the required levels you get the following roles:\n\n${ro.join('\n')}`)
            .setFooter(`${data[0].lvlrole.length} Level Roles`)
        message.channel.send({
            embeds: [msg]
        })
    },
};