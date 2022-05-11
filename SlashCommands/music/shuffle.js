const player = require("../../client/player");

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.shuffle();
        
        interaction.followUp({ content: '🔀 | Queue has been shuffled!' });

    },
};
