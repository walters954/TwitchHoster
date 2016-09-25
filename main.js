var tmi = require('tmi.js');
var request = require('request');
var rp = require('request-promise');

var testStreamerToHostList =['parkin954','walters954','YungYungerbot','AustenMarie','Enviosity','360Chrism']
var testName = 'flosd';

var parameters = [
      'limit=100',
      'client_id=fht2ha0nr9qgth11pg3qq30fxjrlsje',
      'stream_type=live'
  ];
//checkHostIsOnline(testStreamerToHostList);
var users = [
  {
    username: "YungYungerbot",
    password: "oauth:brf2s0b12cye9ny1nu6w7jh4kchavu",
    userList:[
      {
        twitchName: "Parkin954",
        priority: 1
      },
      {
        twitchName: "TehFlipeh",
        priority: 2
      }
    ]
  },
  {
    username: "walters954",
    password: "oauth:brf2s0b12cye9ny1nu6w7jh4kchavu",
    userList:[
      {
        twitchName: "Parkin954",
        priority: 1
      },
      {
        twitchName: "TehFlipeh",
        priority: 2
      }
    ]
  },
  {
    username: testName,
    password: "oauth:brf2s0b12cye9ny1nu6w7jh4kchavu",
    userList:[
      {
        twitchName: "Parkin954",
        priority: 1
      },
      {
        twitchName: "TehFlipeh",
        priority: 2
      }
    ]
  }
]

//init();
//console.log(users.length);
doSomething();
function init(){
  var entireHostLost = [];
  for (i = 0; i < users.length; i++)
  {
    entireHostLost.push(users[i].username);
  }
  checkHosterIsOffline(entireHostLost);
  //promiseTest(entireHostLost);
}


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
  //client.disconnect(); wait for disconnect maybe 5 seconds
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
  // console.log(hostersList);

    hostersList= hostersList.toString();
    hostersList +='&';

    hostersList = hostersList.toLowerCase();

    request('https://api.twitch.tv/kraken/streams?channel=' + hostersList + "?" + parameters.join("&"), function(error, response, body) {
            body = JSON.parse(body);

            if (body._total > 0)
            {
              console.log('getting hosted', body.streams[0].channel.name);
              //host first person
            }
            else{
              console.log('there is no one to get hosted');
            }
          });
}

function checkHosterIsOffline(hostersList,callback,secondCallBack)
{
  // console.log(hostersList);

    hostersList= hostersList.toString();
    hostersList +='&';

    hostersList = hostersList.toLowerCase();

    var options = {
    uri: 'https://api.twitch.tv/kraken/streams?channel=' + hostersList + "?" + parameters.join("&"),
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

    rp(options)
    .then(function (body) {
        // Process html..
        hostersList = hostersList.substring(0, hostersList.length -1);
        var convertToStringHostersList = hostersList.toString();
        hostersList = convertToStringHostersList.split(",");
        var hostersNotOnline = [];
        for (i = 0; i < body._total; i ++)
        {
         hostersList.splice(hostersList.indexOf(body.streams[i].channel.name),1);

        }

        for (i = 0; i < hostersList.length; i++)
        {
          console.log(hostersList[i], i, hostersList.length);
          searchThroughUsersObject(hostersList[i]);
        }
    })
    .catch(function (err) {
        // Crawling failed...
    });

    /*request('https://api.twitch.tv/kraken/streams?channel=' + hostersList + "?" + parameters.join("&"), function(error, response, body) {
            body = JSON.parse(body);
            //console.log(body);
            hostersList = hostersList.substring(0, hostersList.length -1);
            var convertToStringHostersList = hostersList.toString();
            hostersList = convertToStringHostersList.split(",");
            var hostersNotOnline = [];
            for (i = 0; i < body._total; i ++)
            {
             hostersList.splice(hostersList.indexOf(body.streams[i].channel.name),1);

            }
            console.log(hostersList);

            for (i = 0; i < hostersList.length; i++)
            {
              console.log(hostersList[i], i, hostersList.length);
              callback(hostersList[i]);
            }
          });*/




}

function searchThroughUsersObject(passedName)
{
  for (var i=0 ; i < users.length ; i++)
      {
        if (users[i].username.toLowerCase() == passedName)
        {
          //console.log('searchThroughUsersObject', users[i]);
          gatherGettingHostedList(users[i]);
        }
      }

      function gatherGettingHostedList(user)
      {
        var hostedList = [];
        for (i = 0; i < user.userList.length; i++)
        {
          hostedList.push(user.userList[i].twitchName);
        }
        console.log('gatherGettingHostedList',hostedList);
        return hostedList;
      };


}

function promiseTest(nhostersList)
{

  nhostersList= nhostersList.toString();
  nhostersList +='&';

  nhostersList = nhostersList.toLowerCase();

  var testURL= 'https://api.twitch.tv/kraken/streams?channel=' + nhostersList + "?" + parameters.join("&")

  rp(testURL).then(function (body) {
    body = JSON.parse(body);
    console.log(body);
  }).then(function(anotherbody)
  {
  console.log(anotherbody);
  })
  .catch(function (err) {
      // Crawling failed...
  });



  function promiseTest1()
  {

    rp('http://www.google.com')
        .then(function (htmlString) {
            console.log('went to google')
            return html
        })
        .catch(function (err) {
            // Crawling failed...
        });
  }
}



function testPromises()
{

  var firstMethod = function(val) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('first method completed', val);
      resolve(val);
    }, 2000);
  });
  return promise;
};


var secondMethod = function(someStuffs) {
  var promise = new Promise(function(resolve, reject) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'https://mobile.fmcsa.dot.gov/qc/services/carriers/458864.json?webKey=b0aa9dd802d64865f3dd66821d4692fd2b23a0a8', false);

      xmlHttp.send(null);
      someStuffs = JSON.parse(xmlHttp.responseText).content.carrier.totalPowerUnits;



      console.log('second method completed', someStuffs);
      resolve(someStuffs);
  });
  return promise;
};

var thirdMethod = function(someStuff) {

var resolveArray = [];
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText).content.carrier.totalPowerUnits;
}

someStuff = httpGet('https://mobile.fmcsa.dot.gov/qc/services/carriers/458864.json?webKey=b0aa9dd802d64865f3dd66821d4692fd2b23a0a8') +someStuff;

for (i = 0; i < 3; i++)
{
resolveArray.push(httpGet('https://mobile.fmcsa.dot.gov/qc/services/carriers/45886'+i+'.json?webKey=b0aa9dd802d64865f3dd66821d4692fd2b23a0a8'));

}
      console.log('third method completed', someStuff);
      console.log('resolve array', resolveArray )
      resolve(someStuff);
    }, 3000);
  });
  return promise;
};

var inputdate = 1;

firstMethod(inputdate)
  .then(secondMethod)
  .then(thirdMethod)
}
