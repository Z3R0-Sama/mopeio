const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require('discord.js');
const glob = require("glob");
const chalk = require("chalk");

module.exports = {
    name: 'reload',
    aliases: ['r'],
    description: 'None of yer business.',
    timeout: 69,
    usage: 'command',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const owners = [
            '636598760616624128',
        ];
        if (!owners.includes(message.author.id)) return;
        client.commands.sweep(() => true);
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);
                if (pull.name) {
                    console.log(
                        chalk.red("✪ ") +
                        chalk.blue(`Reloaded `) +
                        chalk.green(`${pull.name} `) +
                        chalk.blue(`Command`)
                    );
                    client.commands.set(pull.name, pull);
                }
            });
        });
        let reload_embed = new MessageEmbed()
            .setTitle(`:white_check_mark: | Reloaded All Commands`)
            .setColor("GREEN")
            //.setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
        message.reply({
            embeds: [reload_embed]
        });

    },
};