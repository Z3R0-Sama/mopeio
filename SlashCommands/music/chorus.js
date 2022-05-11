const player = require("../../client/player");

module.exports = {
    name: "chorus",
    description: "Toggle the chorus filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            chorus: !queue.getFiltersEnabled().includes('chorus'),
            normalizer2: !queue.getFiltersEnabled().includes('chorus')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Chorus ${queue.getFiltersEnabled().includes('chorus') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
