### BotAutoMessageDiscord

### Projeto
Esse projeto é de um bot do discord aonde ele envia uma mensagem para varios channels especifícos ou para todos channels do tipo texto

### Configuração 
Para usar esse bot existe umas pequenas configuração que dever ser feita 

- No arquivo config.json existe umas variáveis que devem ser preenchidas
- Na variável roleAutoMessage deve ser colocado o nome da regra que será verificada quando um usuário tentar usar o bot
- Na variável channelMaster deve ser colocado o nome do canal que irá ser usado para passar comandos para o bot
- Na variável token você deve criar um aplicação no discord [link](https://discord.com/developers/applications) após criá-la
você deve ir na aba bot e criar um, perto da imagem do bot há um campo chamado token esse token que deve ser enserido nessa  variável
- Para inserir o bot no seu servidor entre nesse link https://discordapp.com/oauth2/authorize?=&client_id=###&scope=bot&permissions=8 e 
aonde está escrito client_id você deve apagar os caracteres '###' e pega seu client id da aplicação que foi criada

### Execução 
Quando o bot entrar na primeira vez no seu servidor ele irá criar um canal com o nome que foi posto na variável channelMaster e criar a regra
com o nome que foi indicado em roleAutoMessage assim colocando as informações sobre o comando no canal

### Adicionar funcionalidades
Se você se interessou no projeto e quer adicionar mais funcionalidades faça um fork e mande pull request
