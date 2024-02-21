//write all the important commands for the code
// express is a node module that is used to create a server
const express = require('express');
// body-parser is a node module that is used to parse the data from the form
const bodyParser = require('body-parser');
// request is a node module that is used to make request to the server
const request = require('request');
// https is a node module that is used to make request to the server
const https = require('https');


// create a new server
const app = express();
// port number
const port = 3000;
// use the express module to use the static files
app.use(express.static("public"));
// use the body-parser module to parse the data from the form
app.use(bodyParser.urlencoded({extended: true}));

// get request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');


});

// post request
app.post('/', (req, res) => {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
// convert the data into json format
    const jsonData = JSON.stringify(data);

// make a request to the server
    const url = "https://us21.api.mailchimp.com/3.0/lists/6d8ce32730";
// options for the request
    const options = {
        method: "POST",
        auth: "piyush:87a1b6c79da0e3152a68015728a19ba1-us21"
    }
// make a request to the server
    const reques = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    reques.write(jsonData);
    reques.end();
    
    

});
// post request
app.post('/failure', (req, res) => {
    res.redirect("/");
});

// post request

app.listen(port, () => {    
    console.log(`Server listening on port ${port}`);
});



//audience id ; 6d8ce32730
//api key: 87a1b6c79da0e3152a68015728a19ba1-us21    