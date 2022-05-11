const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const config = require('../../config.json')
const { readdirSync } = require("fs");
//const Prefix = require('../../schema/prefix');

module.exports = {
  name: "help",
  aliases: ['h'],
  timeout: 3,
  description: `Shows all available bot commands. Use \`help\` followed by a command name to get more additional information on a command and also the usage.`,
  /**
   * 
   * @param {*} client 
   * @param {*} message 
   * @param {*} args 
   * @returns 
   */

  run: async (client, message, args) => {
    /*const customPrefix = async (client, message) => {
      let custom;
      const data = await Prefix.findOne({ guildId: message.guild.id });
    
      if (data?.prefix) {
        custom = data.prefix;
      } else {
        custom = client.config.prefix; 
      }
      return custom;
    }
    const prefix = await customPrefix(client, message);*/
    const prefix = client.config.prefix;

    const roleColor =
    message.guild.me.displayHexColor === "#000000" ?
    "#ffffff" :
    message.guild.me.displayHexColor;

  if(!args[0]) {
    const emojis = {
      info: "909034915260137483",
      utility: "909035409248489483",
      moderation: "909036796267094016",
      fun: '909035898941898793',
      image: '🖼',
      levels: '909036099291193354',
      nsfw: '856140705377026068',
      settings: '909036295098101830',
      action: '781499631578251285'
    };
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
          return {
            name: cmd.name || "No name",
            description: cmd.description ||
              "No description yet.",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };

    });

    const embed = new MessageEmbed().setTitle('Please choose a category in the dropdown menu.').setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command and also how to use the command. For example: \`${prefix}help ping\`.`).setColor(roleColor);

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Select a Category.")
        .setDisabled(state)
        .addOptions(
          categories
          .filter((cmd) => cmd.directory !== 'Dev')
          .map((cmd) => {
            return {
              label: cmd.directory,
              value: cmd.directory.toLowerCase(),
              description: `Commands from ${cmd.directory} category`,
              emoji:
                emojis[cmd.directory.toLowerCase()] || null,
            };
          })
        )
      ),
        ];

    const initialMessage = await message.channel.send({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id = message.author.id;


      
    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      //time: 10000,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new MessageEmbed()
      .setTitle(`${capitalizeFirstLetter(directory)} Commands`)
      .setDescription(`Here are the list of ${directory} commands. Use \`${prefix}help\` followed by a command name to get more additional information on a command and its usage.`)
      .setColor(roleColor)
      .addFields(
        category.commands.map((cmd) => {
          return{
            name: `\`${cmd.name}\``,
            value: `${cmd.description}`,
            inline: true,
          };
        })
      );

      interaction.update ({embeds: [categoryEmbed]})
    });

    collector.on('end', () => {
      initialMessage.edit({components: (true)})
    })
    
    console.log(categories);
  } else{





if (!args[0]) return;
let categories = [];

readdirSync("./commands/").forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
    );

    const cmds = commands.map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
    });

    let data = new Object();

    data = {
        name: dir.toUpperCase(),
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
    };

    categories.push(data);
});

const command =
    client.commands.get(args[0].toLowerCase()) ||
    client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
    );

if (!command) {
    const embed = new MessageEmbed()
        .setTitle(`Invalid command! Use \`${prefix}help\` for a list of all my commands!`)
        .setColor("FF0000");
    return message.channel.send({embeds: [embed]});
}

const embed = new MessageEmbed()
    .setTitle("Command Details:")
    .addField("PREFIX:", `\`${prefix}\``)
    .addField(
        "COMMAND:",
        command.name ? `\`${command.name}\`` : "No name for this command."
    )
    .addField(
        "ALIASES:",
        command.aliases ?
        `\`${command.aliases.join("` `")}\`` :
        "No aliases for this command."
    )
    .addField(
        "USAGE:",
        command.usage ?
        `\`${prefix}${command.name} ${command.usage}\`` :
        `\`${prefix}${command.name}\``
    )
    .addField(
      "COOLDOWN:",
      command.timeout ?
      `\`${command.timeout}\`s` :
      `No cooldown.`
  )
    .addField(
        "DESCRIPTION:",
        command.description ?
        command.description :
        "No description for this command."
    )
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({
            dynamic: true
        })
    )
    .setTimestamp()
    .setColor(roleColor);
return message.channel.send({embeds: [embed]});
  }
  },
};