const player = require("../../client/player");

module.exports = {
    name: "treble",
    description: "Toggle the treble filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            treble: !queue.getFiltersEnabled().includes('treble'),
            normalizer2: !queue.getFiltersEnabled().includes('treble')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Treble ${queue.getFiltersEnabled().includes('treble') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
