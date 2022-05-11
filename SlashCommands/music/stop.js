const player = require("../../client/player");

module.exports = {
    name: "stop",
    description: "Stop playing and disconnect.",
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played",
            });

        await queue.destroy();

        interaction.followUp({ content: "⏹ | Stopped playing and disconnected from the channel!" });
    },
};
