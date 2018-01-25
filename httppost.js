var https = require('https');
 
module.exports.postdata =  (postDataJSON) => {
  // form data
  var postData = JSON.stringify(postDataJSON);
  console.log(postData); 
  // request option
  var options = {
    host: 'slack.com',
    port: 443,
    method: 'POST',
    path: '/api/chat.postMessage',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'YOUR TOKEN FROM SLACK',
      'Content-Length': postData.length
    }
  };
   
  // request object
  var req = https.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {
      console.log(result);
    });
    res.on('error', function (err) {
      console.log(err);
    })
  });
   
  // req error
  req.on('error', function (err) {
    console.log(err);
  });
   
  //send request witht the postData form
  req.write(postData);
  req.end();
};
