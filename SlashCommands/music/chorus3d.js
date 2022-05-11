const player = require("../../client/player");

module.exports = {
    name: "chorus3d",
    description: "Toggle the chorus3d filer.",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ content: '❌ | No music is being played!' });
        
        await queue.setFilters({
            chorus3d: !queue.getFiltersEnabled().includes('chorus3d'),
            normalizer2: !queue.getFiltersEnabled().includes('chorus3d')
        });

        setTimeout(() => {
            return interaction.followUp({ content: `🎵 | Chorus3D ${queue.getFiltersEnabled().includes('chorus3d') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);

        

    },
};
