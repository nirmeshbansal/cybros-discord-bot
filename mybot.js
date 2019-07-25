const Discord = require('discord.js')
const client = new Discord.Client()
let {PythonShell} = require('python-shell')

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("with Codechef")
})

var fs = require('fs');

client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return
  }
  if (receivedMessage.content.startsWith("!")) {
    processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  if(fullCommand == "help") {
    helpCommand(receivedMessage)
  }
  if(fullCommand == "pcontest") {
    pcontest(receivedMessage)
  }
  if(fullCommand == "ucontest") {
    ucontest(receivedMessage)
  }

}

function helpCommand(receivedMessage) {
  receivedMessage.channel.send("!info for Bot info\n!pcontest for information about ongoing contests\n!ucontest for information about upcoming contests\n!contest for information about all contests")
}


function pcontest(receivedMessage) {
  PythonShell.run('scraper.py', null, function (err) {
    if (err) throw err;
  });
  var objpresent = JSON.parse(fs.readFileSync('present.json', 'utf8'));
  var tot = objpresent.luls.length;
  for (i=0;i<tot;i++) {
    receivedMessage.channel.send("\nName - " + objpresent.luls[i].contestname + "\nCode - " + objpresent.luls[i].contestcode + "\nStart - " + objpresent.luls[i].stime + "\nEnd - " + objpresent.luls[i].etime + "\n\n")
    if(objpresent.luls[i] == null) {
      break;
    }
  }
}

function ucontest(receivedMessage) {
  PythonShell.run('scraper.py', null, function (err) {
    if (err) throw err;
  });
  var objfuture = JSON.parse(fs.readFileSync('future.json', 'utf8'));
  var tot2 = objfuture.luls.length;
  for (i=0;i<tot2;i++) {
    receivedMessage.channel.send("\nName - " + objfuture.luls[i].contestname + "\nCode - " + objfuture.luls[i].contestcode + "\nStart - " + objfuture.luls[i].stime + "\nEnd - " + objfuture.luls[i].etime + "\n\n")
    if(objfuture.luls[i] == null) {
      break;
    }
  }
}

client.login("NjA0MDA2NjcxNzM1NDU1ODMx.XTnrLg.pGmpaLU_2tTIjAY2FVRGP5I0sMk")