const player = require("../../client/player");

module.exports = {
    name: "expander",
    description: "Toggle the expander filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            expander: !queue.getFiltersEnabled().includes('expander'),
            normalizer2: !queue.getFiltersEnabled().includes('expander')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Expander ${queue.getFiltersEnabled().includes('expander') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
