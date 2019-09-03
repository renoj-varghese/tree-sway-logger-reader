const express = require('express');
const csv = require('csvtojson');
const last_lines = require('read-last-lines');


const filePath = "../LoggerNet/CR1X_Public.dat";
const app = express();

app.get('/', function (req, res) {
    let result = []
    last_lines.read(filePath, 50)
        .then(function(data) {
            csv({
                noheader:true,
                output: "csv"
            })
            .fromString(data)
            .then((json)=>{
                json.forEach(function(el) {
                    let x = parseFloat(el[3]);
                    let y = parseFloat(el[4]);
                    result.push([x,y]);
                });
                return res.send(result);
            })
            
        })
        .catch(function(err) {
            console.log(err);
        })

})

app.listen(3000)