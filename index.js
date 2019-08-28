var tmi = require("tmi.js")
var channel = "seu usuario"
// seu codigo 
// get yours at http://twitchapps.com/tmi
var senha = require("./codigoauth.js")

var config = {
  options: {
    debug: true
  }, 
  connection: {
    cluster: "aws", 
    reconnect: true
  },
  identity: {
    username: "seu nome",
    // get yours at http://twitchapps.com/tmi
    // abaixo eu crieu um module export que emporta a senha 
    password: senha.senha 
  },
  // nome do meu canal
  channels: [channel]
}
var client = new tmi.client(config)
client.connect();

client.on("connected", (address, port) => {
  client.action(channel, "Entrei :D")
})

client.on("chat", (channel, user, message, self) => {
  if( message === "oi" ) {
    client.say(channel, "oi conta a boa :D")
  }
  if(message === 'paaa') {
    let meBan = `a proxima é ban!`;
    client.timeout(channel, `${user['display-name']}` , 5, meBan)
      .then((data) => {
        // data returns [channel, username, seconds, reason]a
      }).catch((err) => {
        //
        console.log("Nao");
      });
  }
  if(message === 'mod') {
    client.mod(channel, 'nightbot')
      .then((data) => {
        client.say(channel, "Voce ativou o nightbot como moderador do canal!");
      }).catch((err) => {
      });
  }
  //função pra saber se é mod
  function isMod(usuario) {
    if(usuario === client.mods(channel)) 
      return true;
    else 
      return false;
  }
  if(message === 'sci') {
    if(isMod(`${user['display-name']}`)) 
      client.action(channel, "!game Science & Technology")
        .then((data) => {
          console.log('troca feita com sucesso!');
        }).catch((err) => {
          console.log('error ao tentar trocar de cateogria');
        });
    else 
      client.say(channel, 'você não tem permissão!');
  }
  if(message === 'just') {
   
    client.action(channel, "!game Just Chatting")
      .then((data) => {
        console.log('troca feita com sucesso!');
      }).catch((err) => {
        console.log('error ao tentar trocar de cateogria');
      });
  }
  if(message === 'tira mod') {
    client.unmod(channel, 'nightbot')
      .then((data) => {
        client.say(channel, "Retirado o mod do nightbot");
      }).catch((err) => {
        if(err === 'bad_unmod_mod') {
          client.say(channel, "usuario não tem moderação");
        }
      });
  }
  // CONTATOS 
  if(message !== null){
    switch(message) {
      case '!twitter':
        client.action(channel, `${user['display-name']} https://twitter.com/Araujo_dev `);
        break;
      case '!github':
        client.action(channel, `${user['display-name']} https://github.com/JailsonAraujo `);
        break;
      case '!email':
        client.action(channel, `${user['display-name']} https://github.com/JailsonAraujo `);
      default:
        break;
    }
  }
})
