module.exports = {
    name: 'invites',
    description: "Get how many members have been invited by a user",
    type: 'CHAT_INPUT',
    options: [{
        name: "user",
        description: "Find a user.",
        type: 'USER',
        required: false,
    }, ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.guild.members.fetch().then(async guild => {
            const member = interaction.options.getMember('user') || interaction.member;

            if (!member) return interaction.followUp({
                embeds: [{
                    color: "RED",
                    description: `:x: Couldn't find user : \`${args[0]}\``
                }]
            })

            if (member) {

                const invitesArray = [];

                (await interaction.guild.invites.fetch()).filter(i => i.inviter.id == member.id).forEach(value => {
                    invitesArray.push(value.uses)
                });


                interaction.followUp({
                    embeds: [{
                        color: "RANDOM",
                        timestamp: Date.now(),
                        author: {
                            name: `${member.user.tag}`,
                            iconURL: member.displayAvatarURL({
                                dynamic: true
                            })
                        },
                        description: `Total invites: \`${invitesArray.reduce((a, b) => b + a, 0) ?? 0}\``
                    }]
                })
            } else return interaction.followUp({
                content: 'uh'
            })
        })
    }
}