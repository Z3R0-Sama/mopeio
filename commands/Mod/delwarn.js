const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../schema/warndb')

module.exports = {
    name: 'delwarn',
    aliases: ['removewarning', 'removewarn', 'deletewarn', 'deletewarning', 'delwarning'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({content: 'You don\'t have permission to delete warn, die.'});
        try {
        const user = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
            if(!user) return message.channel.send({content: `Mention a user~`})
            
       const data = await warndb.findOne(
            {
                guild: message.guild.id,
                user: user.user.id,
            }
        );
        /*await data.deleteOne({
            guild: message.guild.id,
            user: user.user.id,
        })*/
        const sus = data.content.find(c => c.id === args[1])
        const deta = await data.content.splice(data.content.indexOf(sus), 1)
        const su = await warndb.findOneAndUpdate(
            {
                guild: message.guild.id,
                user: user.user.id,
            },
            {
                content: data.content
            })
        message.channel.send({ content: `Cleared the warning: **${sus.reason}**` })
        } catch {
            message.channel.send({content: 'Provide a valid warn id to delete~'})
        }
    },
};