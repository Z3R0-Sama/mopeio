const player = require("../../client/player");

module.exports = {
    name: "flanger",
    description: "Toggle the flanger filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            flanger: !queue.getFiltersEnabled().includes('flanger'),
            normalizer2: !queue.getFiltersEnabled().includes('flanger')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Flanger ${queue.getFiltersEnabled().includes('flanger') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
