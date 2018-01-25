const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const https = require('https');
var httppost = require('./httppost.js');
const pricelimit = 42000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

 
  
var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my " + minutes + " minutes check");
  https.get('https://www.tesla.com/api?m=cpo_marketing_tool&a=search&exteriors=all&model=&battery=all&priceRange=0%2C' + pricelimit + '&city=Cupertino&state=CA&country=US&region=NA&sort=featured%7Casc&titleStatus=used&zip=', (resp) => {
    let data = '';
   
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
   
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(JSON.parse(data));
      if (JSON.parse(data)[0] && JSON.parse(data)[0].Vin){
        console.log("https://www.tesla.com/used/" + JSON.parse(data)[0].Vin);  
        var postJSON = {
          channel: "general",
          text: "Spy bot for Tesla found a car below configured threshhold price of " + pricelimit + ". URL: https://www.tesla.com/used/" + JSON.parse(data)[0].Vin
        };  
        httppost.postdata(postJSON);
      }
    });
   
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}, the_interval);