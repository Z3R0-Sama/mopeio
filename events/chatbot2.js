const client = require('../index')
const zeroapi = require('zeroapi-wrapper')
const apiclient = new zeroapi({ token: process.env['zero'] }); //dm me if you want an apikey
const Discord = require('discord.js')

client.on ('messageCreate', async(message) => {
  if(message.author.bot) return;
  if(message.channel.id === '973910698654572574') {
const request = await apiclient.waifuchat({ "message": message.content, "situation": `Nia-san is a dominant female wife. but its not horny`, "uuid": message.author.id, "botname": "Nia-san" })
const rep = (request.response)
message.reply(`${rep}`)
  }
});