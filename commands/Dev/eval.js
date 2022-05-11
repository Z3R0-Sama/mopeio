const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const {
    inspect
} = require("util");
const client = require('../../index');
const config = require('../../config.json');

module.exports = {
    name: "eval",
    //aliases: ['eval'],
    description: 'None of yer business.',
    timeout: 0,
    ownerOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


            const owners = [
                '636598760616624128'
            ]
            if (!owners.includes(message.author.id)) return;
            const code = args.join(" ");
            const token = client.token.split("").join("[^]{0,2}");
            const rev = client.token.split("").reverse().join("[^]{0,2}");
            const filter = new RegExp(`${token}|${rev}`, "g");
            try {
                let output = eval(code);
                if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
                output = inspect(output, {
                    depth: 0,
                    maxArrayLength: null
                });
                output = output.replace(filter, "no");
                if (output.length < 1950) {
                    const outputembed = new MessageEmbed()
                        .setTitle('Evaluation Successful')
                        .setDescription('**Argument**\n\`\`\`' + code + '\`\`\`\n\n**Output**\n\`\`\`' + output + '\`\`\`')
                        .setFooter(client.user.tag, client.user.displayAvatarURL())
                    message.channel.send({
                        embeds: [outputembed]
                    });
                }
            } catch (error) {
                message.channel.send({
                    content: ` \`\`\`js\n${error}\`\`\` `
                });
            }
        
    },
};