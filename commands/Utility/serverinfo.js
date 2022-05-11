const { CommandInteraction, Client, MessageEmbed} = require('discord.js');

	module.exports = {
		name: "serverinfo",
		aliases: ['si'],
		description: 'Serverinfo!',
		timeout: 3,
		/**
		 *
		 * @param {Client} client
		 * @param {Message} message
		 * @param {String[]} args
		 */
		run: async (client, message, args) => {
 
            const emojicount = message.guild.emojis.cache;
            const roles = message.guild.roles.cache
              .filter((r) => r.id !== message.guild.id)
              .map((role) => role.toString());
            const members = message.guild.members.cache;
            const create = message.guild.createdAt;
            const channels = message.guild.channels.cache;
     

            const embed = new MessageEmbed()
                  .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
                  .addFields(
                    {
                      name: `<a:tick:780643713994194944> **General Information**`,
                      value: `**Server Name:** \`${
                        message.guild.name
                      }\`\n**Server Id:** \`${
                        message.guild.id
                      }\`\n**Owner Name:** \`${
                        (await message.guild.fetchOwner()).user.username
                      }\`\n**Owner id:** \`${await message.guild.ownerId}\`\n`,
                    },
                    {
                      name: `<a:tick:780643713994194944> **Count**`,
                      value: `**Members:** \`${message.guild.memberCount.toString()}\`\n**Roles:**: \`${
                        roles.length
                      }\`\n**Channels:** \`${
                        channels.size
                      }\`\n**Text Channels:** \`${message.guild.channels.cache
                        .filter((channel) => channel.type === "GUILD_TEXT")
                        .size.toString()}\`\n**Voice Channels:** \`${message.guild.channels.cache
                        .filter((channel) => channel.type === "GUILD_VOICE")
                        .size.toString()}\`\n**Emojis:** \`${emojicount.size}\`\n`,
                    },
                    {
                      name: `<a:tick:780643713994194944> **Additional Information**`,
                      value: `**Created At:** \`${create}\`\n**Boost Count** \`${
                        message.guild.premiumSubscriptionCount
                      }\`\n**Boost Level** \`${message.guild.premiumTier.toString()}\`\n**Verification Level** \`${message.guild.verificationLevel.toString()}\`\n`,
                    }
                  )
     
                  .setColor("BLUE")
                  .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )

message.channel.send({embeds: [embed]});

		},
	};
	