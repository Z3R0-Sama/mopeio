const player = require("../../client/player");

module.exports = {
    name: "earrape",
    description: "Toggle the earrape filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            earrape: !queue.getFiltersEnabled().includes('earrape'),
            normalizer2: !queue.getFiltersEnabled().includes('earrape')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Earrape ${queue.getFiltersEnabled().includes('earrape') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
