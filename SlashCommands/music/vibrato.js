const player = require("../../client/player");

module.exports = {
    name: "vibrato",
    description: "Toggle the vibrato filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            vibrato: !queue.getFiltersEnabled().includes('vibrato'),
            normalizer2: !queue.getFiltersEnabled().includes('vibrato')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Vibrato ${queue.getFiltersEnabled().includes('vibrato') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
