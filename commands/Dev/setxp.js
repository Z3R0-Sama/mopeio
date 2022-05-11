const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
let xp = require('simply-xp')
module.exports = {
  name: 'setxp',
  //aliases: ["lvl","level"],
  description: "set xp",
  usage: "[user] [xp]",
  timeout: 10,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply({content: 'You do not have the permission to do this. You need `Manage Server` permissions in order to do so.'})
    let membera = message.mentions.members.first() ||
    message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
    message.guild.members.cache.find((m) => m.user.username === args[0]) ||
    message.guild.members.cache.find((m) => m.user.id === args[0]) ||
    message.author;
    let member = membera.id;

    xp.setXP(member, message.guild.id, parseInt(args[1]))

    
        },
    };