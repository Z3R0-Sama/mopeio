const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../schema/warndb')

module.exports = {
    name: 'clearwarns',
    aliases: ['clearwarn', 'clearwarnings'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({content: 'You don\'t have permission to clear warns, die.'});
        
        const user = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) || message.member;
        if(!user) return message.channel.send({content: 'Provide a valid user to clear warns.'});
       const data = await warndb.findOne(
            {
                guild: message.guild.id,
                user: user.user.id,
            }
        );
        await data.deleteOne({
            guild: message.guild.id,
            user: user.user.id,
        })
        //data.save()
        message.channel.send({ content: `Cleared all warnings for **${user.user.tag}**` })
    },
};