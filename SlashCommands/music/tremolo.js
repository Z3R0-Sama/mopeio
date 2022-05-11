const player = require("../../client/player");

module.exports = {
    name: "tremolo",
    description: "Toggle the tremolo filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            tremolo: !queue.getFiltersEnabled().includes('tremolo'),
            normalizer2: !queue.getFiltersEnabled().includes('tremolo')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Tremolo ${queue.getFiltersEnabled().includes('tremolo') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
