const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu
} = require('discord.js');
let xp = require('simply-xp')
const simplydjs = require('simply-djs')
const { pagination } = require('reconlx')
module.exports = {
  name: 'leaderboard',
  aliases: ["lb"],
  description: 'Get the server\'s leaderboard.',
  timeout: 10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await xp.leaderboard(client, message.guild.id, 40).then(board => {
      let a = []
      let b = []
      let c = []
      board.forEach((user, index) => {
        if (index + 1 <= 10) {
          a.push(`**${index + 1}.** ${user.tag} » **Level:** \`${user.level}\` | **XP:** \`${user.shortxp}\``)
        } else if (index + 1 > 10 && index + 1 <= 20) {
          b.push(`**${index + 1}.** ${user.tag} » **Level:** \`${user.level}\` | **XP:** \`${user.shortxp}\``)
        } else if (index + 1 > 20 && index + 1 <= 30) {
          c.push(`**${index + 1}.** ${user.tag} » **Level:** \`${user.level}\` | **XP:** \`${user.shortxp}\``)
        }
      })

      let emb = new MessageEmbed()
        .setTitle('Leaderboard')
        .setColor('RANDOM')
        .setThumbnail(message.guild.iconURL({
          dynamic: true,
          size: 2048
        }))
        .setDescription(`${a.join('\n\n')}`)


      let emb2 = new MessageEmbed()
        .setTitle('Leaderboard')
        .setThumbnail(message.guild.iconURL({
          dynamic: true,
          size: 2048
        }))
        .setDescription(`${b.join('\n\n')}`)
        .setColor('RANDOM')

      let emb3 = new MessageEmbed()
        .setTitle('Leaderboard')
        .setThumbnail(message.guild.iconURL({
          dynamic: true,
          size: 2048
        }))
        .setDescription(`${c.join('\n\n')}`)
        .setColor('RANDOM')

      let pg = [emb, emb2, emb3]

      pagination({
        embeds: pg,
        message: message,
        channel: message.channel,
        author: message.author,
        fastSkip: true,
        time: 60000,
        button: [
          {
            name: "first",
            emoji: '911637785037910077',
            style: "PRIMARY",
          },
          {
            name: "next",
            emoji: "911640141007839273",
            style: "SUCCESS",
          },
          {
            name: "previous",
            emoji: "911640280434892850",
            style: "SUCCESS",
          },
          {
            name: "last",
            emoji: "911637840176250890",
            style: "PRIMARY",
          }
        ]
      })

      /*const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('The server leaderboard')
      .setDescription(`${lead.join('\n\n')}\n`)
      .setThumbnail(message.guild.iconURL({dynamic: true, size: 2048}))
      
      .setTimestamp()
        message.reply({embeds: [embed]})*/

    });
  },
};