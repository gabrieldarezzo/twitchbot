var tmi = require("tmi.js")
var channel = "gabrieldarezzo"
// seu codigo 
// get yours at http://twitchapps.com/tmi
var configGlobal = require("./password.js")

var adms = [
  channel,  
  'darezzobot',  
];


var config = {
  options: {
    debug: true
  }, 
  connection: {
    cluster: "aws", 
    reconnect: true
  },
  identity: {
    username: "darezzobot",        
    password: configGlobal.password // get yours at http://twitchapps.com/tmi
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
  
  if(message === 'paaa') {
    let meBan = `a proxima é ban!`;
    client.timeout(channel, `]${user['display-name']}` , 5, meBan)
      .then((data) => {
        // data returns [channel, username, seconds, reason]a
      }).catch((err) => {        
        console.log("Nao");
      });
  }

  //função pra saber se é mod
  function isMod(usuario, adms, client) {
    if(!adms.includes(usuario)) {
      client.say(channel, 'você não tem permissão!');
      return false;
    }   
    return true
  }
  

  if(message === 'tt') {
    console.log()
  }

  if(message === 'log') {
    let debbug = isMod(user['display-name'], adms, client);
    console.log(user['display-name'], {
      'isMod': debbug
    });
  }


  if(message === 'sci') {
    isMod(user['display-name'], adms, client);
    client.action(channel, "!game Science & Technology")
      .then((data) => {
        console.log('troca feita com sucesso!');
      }).catch((err) => {
        console.log('error ao tentar trocar de cateogria');
      });
  }

  if(message === 'just') {
    isMod(user['display-name'], adms, client);   
    client.action(channel, "!game Just Chatting")
      .then((data) => {
        console.log('troca feita com sucesso!');
      }).catch((err) => {
        console.log('error ao tentar trocar de cateogria');
      });
  }
  
  // CONTATOS 
  if(message !== null){
    
    switch(message) {
      case '!twitter':
        client.action(channel, `${user['display-name']} https://twitter.com/gabrieldarezzo `);
      break;

      case '!github':
        client.action(channel, `${user['display-name']} https://github.com/gabrieldarezzo`);
      break;

      case '!email':
        client.action(channel, `${user['display-name']} darezzo.gabriel@gmail.com`);
      break;

      case '!specs':
        client.action(channel, `${user['display-name']} i5, 8GB DE RAM, 1050-TI, 120 SSD (Em casa),`);
      break;

      case '!tema':
        client.action(channel, `${user['display-name']} https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode`);
      break;

      case '!playlist':
        // Pegar dinamicamente da API do Spotify?!
        client.action(channel, `${user['display-name']} https://open.spotify.com/playlist/37i9dQZF1DXdfOcg1fm0VG?si=ARQSqAQLQY-kYniLwTkf-w`);
      break;

      case '!linkprojeto':        
        client.action(channel, `${user['display-name']} https://github.com/JailsonAraujo/twitchbottwitch`);
      break;

    }
  }
})
