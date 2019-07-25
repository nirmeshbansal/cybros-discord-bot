const Discord = require('discord.js')
const client = new Discord.Client()
let {PythonShell} = require('python-shell')

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("with Codechef")
})

PythonShell.run('scraper.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });


var fs = require('fs');
var objpresent = JSON.parse(fs.readFileSync('present.json', 'utf8'));

console.log(objpresent.luls[0].contestcode);
client.login("NjAyNDkxNTk0NjE2MjA5NDA4.XTRu8Q.4gy7ClhT7H5V4eI1fyokgbH4ylU")