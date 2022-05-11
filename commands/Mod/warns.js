const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../schema/warndb')

module.exports = {
    name: 'warns',
    aliases: ['warning', 'warnings'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const embed1 = new MessageEmbed()
            .setColor('RED')
            .setDescription("You don't have the permissions to check warns~")

        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({ embeds: [embed1] })

        const user = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) || message.author;

        warndb.findOne({
            guild: message.guild.id,
            user: user.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `
                    \n\`${i + 1}\` - **Moderator:** ${message.guild.members.cache.get(w.moderator).user.tag} | **Reason:** ${w.reason} |
                    ** ** ** **     **ID:** ${w.id || 'No ID.'} | <t:${w.time}:R>`
                )
                const embed = new MessageEmbed()
                    .setTitle("**Warnings**")
                    .setColor('DARK_RED')
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setDescription(e.join(' '))
                    .setFooter({text:'Warnings'})
                    .setTimestamp()
                message.channel.send({
                    embeds: [embed]
                })
            } else {

                const embed2 = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription("This user does not have any warns~")
                message.channel.send({ embeds: [embed2] })
            }
        })

    }
}