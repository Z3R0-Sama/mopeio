const player = require("../../client/player");

module.exports = {
    name: "nightcore",
    description: "Toggle the nightcore filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            nightcore: !queue.getFiltersEnabled().includes('nightcore'),
            normalizer: !queue.getFiltersEnabled().includes('nightcore')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Nightcore ${queue.getFiltersEnabled().includes('nightcore') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
