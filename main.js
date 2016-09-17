var tmi = require('tmi.js');
var request = require('request');

var testStreamerToHostList =['parkin954','trick2g','EJipt','AustenMarie','Enviosity']


var parameters = [
      'limit=100',
      'client_id=fht2ha0nr9qgth11pg3qq30fxjrlsje',
      'stream_type=live'
  ];
//findActiveChannelForSpecificUser(testStreamerToHostList);
checkHostIsOnline(testStreamerToHostList);


function hostChannel(user,gettingHosted)
{
  var options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
      username: "YungYungerbot",
      password: "oauth:brf2s0b12cye9ny1nu6w7jh4kchavu"
    },
    channels: ["YungYungerbot"]
  };

  var client = new tmi.client(options);
  client.connect();
  client.on('connected', function(address, port)
  {
    client.action("YungYungerbot", "This is when I would say /host YungYungerbot" );
    //may use the client.host command
  });
  client.disconnect();
}

function findActiveChannelForSpecificUser(users)
{
  hostersList +='&';
    request('https://api.twitch.tv/kraken/streams?channel=' + users + "?" + parameters.join("&"), function(error, response, body) {
            body = JSON.parse(body);
            for (i = 0; i < body._total; i ++)
            {
              console.log(body.streams[i].channel.name);

            }

          });

}

function checkHostIsOnline(hostersList)
{

    hostersList +='&';

    hostersList = hostersList.toLowerCase();

    request('https://api.twitch.tv/kraken/streams?channel=' + hostersList + "?" + parameters.join("&"), function(error, response, body) {
            body = JSON.parse(body);
            for (i = 0; i < body._total; i ++)
            {

              if(hostersList.indexOf(body.streams[i].channel.name) == -1)
              {
                console.log('found person indexof is offline', body.streams[i].channel.name)
              }

              for (x = 0; x < hostersList.length; x++)
              {
                console.log(x);
              }
            }

          });
}


//browser extention maybe ***
/*var users = {[
  username: "YungYungerbot",
  password: "oauth:brf2s0b12cye9ny1nu6w7jh4kchavu",
  userList:[
    {
      twitchname: "Parkin954",
      priority: 1
    },
    {
      twitchName: "TehFlipeh",
      priority: 2
    }
  ]
]}*/
