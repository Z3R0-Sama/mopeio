const client = require('../index')
const { MessageEmbed } = require("discord.js");
const warndb = require("../schema/warndb");
client.on('messageCreate', async message => {
    const array = require(`../scam.json`)
    let sus = false;
    message.content.split(' ').forEach(c => {
        if(array.includes(/^(ftp|http|https):\/\/[^ "]+$/.test(c) ? `${c.replaceAll('http://', '').replaceAll('https://', '').replaceAll('www.', 'www.').replaceAll('/', '')}` : c)) sus = true;  
        else return;
    })
    
      
      /*await message.member.timeout(120000, `Posting scam links`)
      message.author.send({
          content: `${message.author} You have been muted for posting scam links.`
      });*/
      
  if (sus === true) {
    message.delete();
    const embed = new MessageEmbed()
      .setTitle("**No scam links.**")
      .setColor("RED");
    message.author.send({ embeds: [embed] });
  } else {
    return;
  }

  const reason = "Scam links";
  const user = message.member;
  const moderator = client.user.id;

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

      if (data.content.length > 2 && data.content.length < 5) {
        const time = 5 * 60000;

        await message.member.timeout(time, `bad words`)
      message.author.send({
          content: `${message.author} You have been muted for sending scam links.`
      });

        const embedjee = new MessageEmbed()

          .setAuthor(
            "Warning",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .addField(
            "Action",
            `${user} is now muted for 5 minute.`
          )
          .setTimestamp()
          .setFooter(`Warned ${message.author.tag}`);

        message.channel.send({ embeds: [embedjee] });

      } else if (data.content.length > 4 && data.content.length < 7) {
        const timee = 10 * 60 * 1000;
        await message.member.timeout(timee, `bad words`)
        message.author.send({
            content: `${message.author} You have been muted for sending scam links.`
        });

        const embedjee = new MessageEmbed()

          .setAuthor(
            "Warning",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .addField(
            "Action ",
            `${user} has been muted for 10 minutes`
          )
          .setTimestamp()
          .setFooter(`Warned ${message.author.tag}`);

        message.channel.send({ embeds: [embedjee] });

      } else if (data.content.length > 6) {
        if (user) {
          const reden = "Too many warns.";

          await user
            .kick({
              reason: reden,
            })
            .then(() => {
              const banEmbed = new MessageEmbed()

              .setColor("#34e628")
              .setAuthor({
                name: user.user.username,
                iconURL: user.displayAvatarURL({ dynamic: true, size: 512 })
              })
              .setDescription(`${user}` + " has been kicked due to too many warns!")
              .addField("\u200b", "\u200b", true)
              .setTimestamp()
              .setFooter({text: `Bai bai~`});

              message.channel.send({ embeds: [banEmbed] });
            });
        } else {
          const embed2 = new MessageEmbed()
            .setColor("RED")
            .setDescription("User not found");
          message.channel.send({ embeds: [embed2] });
        }
      } else {
        const embed12 = new MessageEmbed()
          .setAuthor(
            "Warnings",
            user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setDescription(`Warned ${user} for **${reason}**`)
          .setColor("RED")
          .addField("Total warns: ", `${data.content.length}`)
          .setTimestamp()
          .setFooter(`Warned`);

        message.channel.send({ embeds: [embed12] });
      }
    }
  );
    
  })