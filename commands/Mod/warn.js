const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const warndb = require('../../schema/warndb')

module.exports = {
    name: 'warn',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({content: 'You don\'t have permission to warn, die.'});
        const moderator = message.author.id
        const user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ')
        if(!args[0]) message.channel.send({content: 'Provide a valid user to warn.'});
        if(user.user.id === moderator) return message.channel.send({content: 'You cannot warn yourself.'});
        if(!reason) return message.channel.send({content: `Provide a reason~`});
        if(!user) return message.channel.send({content: 'Provide a valid user to warn.'});
        warndb.findOne(
            {
                guild: message.guild.id,
                user: user.user.id,
            },
            async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new warndb({
                        guild: message.guild.id,
                        user: user.user.id,
                        content: [
                            {
                                moderator: moderator,
                                reason: reason,
                                time: Math.floor(Date.now() / 1000),
                                id: Math.floor(Math.random() * Date.now()).toString(36),
                            },
                        ],
                    });
                } else {
                    const object = {
                        moderator: moderator,
                        reason: reason,
                        time: Math.floor(Date.now() / 1000),
                        id: Math.floor(Math.random() * Date.now()).toString(36),
                    };
                    data.content.push(object);
                }
                data.save();
                const embe = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle(`Warning`)
                .setDescription(
                    `
                    Warned <@${user.user.id}>
                    **Reason:** ${reason}
                    **Moderator:** ${message.author}
                    **Current Warnings:** \`${data.content.length}\`
                    `)
                .setFooter({text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
                message.channel.send({embeds: [embe]})
                user.user.send(`You have been warned: **${reason}**`)
            });
            },
};