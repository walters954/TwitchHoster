var tmi = require('tmi.js');


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

function findActiveChannelForSpecificUser()
{
  var parameters = [
        'limit=100',
        'stream_type=live',
        'client_id=' + clientId
    ];

}


//browser extention maybe ***
var users = {[
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
]}
