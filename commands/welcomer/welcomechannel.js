const { MessageEmbed } = require('discord.js')
const { getSettingsar } = require('../../models/autorole')

module.exports = {
    name: 'welcomechannel',
    category: 'welcomer',
    run: async (client, message, args) => {
        if (message.guild.memberCount < 5) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | Your Server Doesn't Meet My 5 Member Criteria`
                        )
                ]
            })
        }
        const settings = await getSettingsar(message.guild)
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You must have \`Administration\` perms to run this command.`
                        )
                ]
            })
        }
        let isown = message.author.id == message.guild.ownerId
        if (!isown && !client.util.hasHigher(message.member)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        let channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0])
        if (!channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You didn't mentioned the channel to set as welcome channel.`
                        )
                ]
            })
        }
        let response = await client.util.setChannel(settings, channel)
        return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(response)
            ]
        })
    }
}
