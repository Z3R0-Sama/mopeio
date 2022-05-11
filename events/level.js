const client = require('../index')
const spamchannels = ['901338643128516648', '957981195604471858', '957980980201816174', '957979414812065852', '955399577895317524', '972865600680497172']

client.on('messageCreate', async (message) => {
    let xp = require('simply-xp')
if (spamchannels.includes(message.channel.id)) return;
    if (!message.guild || message.author.bot ) return;
    

    xp.addXP(message, message.author.id, message.guild.id, {
        min: 5,
        max: 20
    })
    xp.lvlRole(message, message.author.id, message.guild.id)
});

client.on('levelUp', async (message, data) => {

    message.reply(
        `Congratulations ${message.author}, You have reached level **${data.level}**.`
    )
})