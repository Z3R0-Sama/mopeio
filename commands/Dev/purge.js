const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'purge',
 // aliases: [' '],
 // description: ' ',
 // timeout: 3000,
 // usage: ' ',
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
run: async (client, message, args) => {
    const owners = [
        '636598760616624128'
    ]
    if (!owners.includes(message.author.id)) return;

  try {

      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount))
        return message.channel.send({
            content:  "Please enter a number of messages to purge."
        }
          
        )
      if (!amount || amount < 2 || amount > 100)
        return message.channel.send({
            content: "Please enter a number of message between 2 and 100."
        }
          
        );
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async (m) => {
            let embed = new MessageEmbed()
              .setColor("0x#00ffff")
              .setDescription(
                `✅  Cleared **${m.size}**/**${amount}** messages!`
              );

            message.channel
              .send({embeds: [embed]})
              .then((msg) => msg.delete({ timeout: 4000 }));
          });
        } catch (e) {
          message.channel.send({
              content: `You can only delete the messages which are not older than 14 days!`
          }
            
          );
        
        }
      } else {
        return message.channel.send(`An error occoured.`);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(`An error occurred: \`${error}\``);
    }

    
  },
};