const discord = require('discord.js')
const config = require('../config')

const client = new discord.Client()

client.on("ready", () => {
    console.log(`Bot foi iniciado`)
})

client.on("guildCreate", async (guild) => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`)

    const findChannel = guild.channels.cache.find(channel => channel.name === config.channelMaster)
    const findRole = guild.roles.cache.find(role => role.name === config.roleAutoMessage)
    let role
    let channel
    if(!findRole) {
         role = await guild.roles.create({
            data: {
                name: config.roleAutoMessage,
                color: [51,153,255],
            },
            reason: 'Deve ter essa role para mandar comandos no channel autoMessage'
        })
    }
    if(!findChannel) {
         channel = await guild.channels.create(config.channelMaster, {
            reason: 'Esse canal server para mandar menssagens para varios canais ao mesmo tempo',
            type: 'text',
            permissionOverwrites: [
                {
                    id: role ? role.id : findRole.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                }
            ]
        })
    }

    channel ? channel.send(`Para enviar menssagens nesse canal você tera que ter os seguinter requisitos atendidos:\n
                Role: ${config.roleAutoMessage}\n
                Comando: sendMessage "Mensagens" [channel1, channel2, channel3] \n
                sendMessageAllChannel "Memsagem"`)
                : findChannel.send(`Para enviar menssagens nesse canal você tera que ter os seguinter requisitos atendidos:\n
                Role: ${config.roleAutoMessage}\n
                Comando: sendMessage "Mensagens" [channel1, channel2, channel3] \n
                sendMessageAllChannel "Memsagem"`)

})

client.on("guildDelete", (guild) => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`)
})

const comandos = {
    sendMessage: async (message, sendMessagem, channels) => {
        const m = await message.channel.send("Enviando Mensagem...")
        let messageSentOnTheChannel = []
        channels.forEach(channel => {
            const channelFound = client.channels.cache.find(findChannel => findChannel.name === channel)
            if(channelFound) {
                messageSentOnTheChannel.push(channelFound.name)
                channelFound.send(sendMessagem)
            }
        })
        if(messageSentOnTheChannel.length > 0) {
            m.edit(`A mensagem: ${sendMessagem} foi enviada em ${messageSentOnTheChannel.join(", ")}`)
        }else {
            m.edit("Nenhuma mensagem foi enviada")
        }
    },
    sendMessageAllChannel: async (message, sendMessage) => {
        const m = await message.channel.send("Enviando Mensagem...")
        client.channels.cache.forEach(channel => {
            if(channel.type === 'text' && channel.name !== config.channelMaster) {
                channel.send(sendMessage)
            }
        })
        m.edit(`A mensagem: '${sendMessage}' foi enviada para todos os canais de texto`)
    }
}

client.on("message", async message => {
    if(message.author.bot) return
    if(message.channel.type === 'dm') return

    const args = message.content.trim().split('"')
    const comando = args[0].trim()
    const sendMessage = args[1].trim()
    const channels = args[2].trim().replace(/[\[\].!'@,><|://\\;&*()_+=]/g, "").split(' ')

    if(message.channel.name.trim().toLocaleLowerCase() === config.channelMaster.trim().toLocaleLowerCase() ) {
        const executarComando = comandos[comando]
        
        const guild = client.guilds.cache.get(message.guild.id)
        const findRole = guild.roles.cache.find(role => role.name === config.roleAutoMessage)

        let user = message.member['_roles'].find(role => role === findRole.id)

        if(executarComando && user) {
            executarComando(message, sendMessage, channels)
        } else {
            const m = await message.channel.send('Error!')
            m.edit("Comando não existe ou você não possui permissão")
        }
    }
})

client.login(config.token)