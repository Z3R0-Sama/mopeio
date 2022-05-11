const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "userinfo",
  aliases: ["whois", "who"],
  description: "Get information about a user",
  usage: "@user",
  timeout: 3,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

   // let userStatm;
    //let userStat = user.presence.status;

    let userRoles = user.roles.cache
      .map((x) => x)
      .filter((z) => z.name !== "@everyone");

    if (userRoles.length > 100) {
      userRoles = "More than 100";
    }

    let safe = message.author.createdTimestamp;

    if (safe > 604800017) {
      safe = "`Not Suspicious`";
    } else {
      safe = "`Suspicious`";
    }

  /*   if (userStat === "online") userStatm = `<:online:889924000325697596> `;
    if (userStat === "offline") userStatm = `<:offline:889924075479269456> `;
    if (userStat === "idle") userStatm = `<:statusidle:891614334617280542>`;
    if (userStat === "dnd")
      userStatm = `Do not disturb <:dnd:891613707266846720>`;*/

    let nitroBadge = user.user.avatarURL({ dynamic: true });
    let flags = user.user.flags.toArray().join(``);

    if (!flags) {
      flags = "None";
    }

    flags = flags.replace(
      "HOUSE_BRAVERY",
      "• `HypeSquad Bravery`"
    );
    flags = flags.replace(
      "EARLY_SUPPORTER",
      "• `Early Supporter`"
    );
    flags = flags.replace(
      "VERIFIED_DEVELOPER",
      "• `Verified Bot Developer`"
    );
    flags = flags.replace(
      "EARLY_VERIFIED_DEVELOPER",
      "• `Verified Bot Developer`"
    );
    flags = flags.replace(
      "HOUSE_BRILLIANCE",
      "• `HypeSquad Brilliance`"
    );
    flags = flags.replace(
      "HOUSE_BALANCE",
      "• `HypeSquad Balance`"
    );
    flags = flags.replace(
      "DISCORD_PARTNER",
      "• `Partner`"
    );
    flags = flags.replace(
      "HYPESQUAD_EVENTS",
      "• `Hypesquad Events`"
    );
    flags = flags.replace(
      "DISCORD_CLASSIC",
      "• `Discord Classic`"
    );

    if (nitroBadge.includes("gif")) {
      flags =
        flags +
        `
      •  \`Nitro\``;
    }

    /*let stat = user.presence.activities[0];*/
    let custom;

    /*if (user.presence.activities.some((r) => r.name === "Spotify")) {
      custom = "Listening to Spotify";
    } else if (stat && stat.name !== "Custom Status") {
      custom = stat.name;
    } else {
      custom = "None";
    }

    if (
      user.presence.activities.some((r) => r.name !== "Spotify") &&
      stat &&
      stat.state !== null
    ) {
      stat = stat.state;
    } else {
      stat = "None";
    }*/

    const embeddd = new MessageEmbed()
      .setColor(`DARK_BUT_NOT_BLACK`)
      .setAuthor(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `__**User Info**__
      **•** \`ID:\` **${user.id}**
      **•** \`Profile:\` **${user}**
      **•** \`Bot:\` **${user.user.bot ? "Yes" : "No"}**
      **•** \`Created At:\` **${moment(user.user.createdAt).format(
    "MMMM Do YYYY, H:mm:ss a"
  )}**\n
      __**Member Info**__
      **•** \`Nickname:\` **${user.displayName ? user.displayName : "yok"} **
      **•** \`Joined At:\` **${moment(user.joinedAt).format(
    "MMMM Do YYYY, H:mm:ss a"
  )}**

      __**Roles:**__
      ${userRoles}\n
      __**Badges**__
      ${flags} 
      
      __**Suspicious Check**__
      • ${safe}`
      )
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embeddd] });
  },
};