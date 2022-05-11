const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu
} = require('discord.js');
let xp = require('simply-xp')
module.exports = {
  name: 'rank',
  aliases: ["lvl", "level"],
  description: "Get the level of yourself or mentioned user.",
  usage: "rank [user]",
  timeout: 10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    let membera = message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.id === args[0]) ||
      message.author;
    let member = membera.id;

    xp.rank(message, member, message.guild.id, {
      background: 'https://media.discordapp.net/attachments/754991108488036452/771348064732446740/e6.png', // default: Rainbow Background
      color: '#ff0000',
      lvlbar: '#DCD427',
      lvlbarBg: '#000000', 
    }).then((img) => {
      message.reply({
        files: [img]
      })
    })

  },
};