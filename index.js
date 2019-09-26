const express = require('express');
const csv = require('csvtojson');
const last_lines = require('read-last-lines');
const convertDegreeToPoint = require("./pointConverter")

const filePath = "../LoggerNet/CR1X_Public.dat";
const app = express();



const getPoints = () => {
    console.log("Hello")
    let result = [];
    last_lines.read(filePath, 40)
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
                return result;
            })
            
        })
        .catch(function(err) {
            console.log(err);
    });
}


// let batch_of_points = getPoints();


app.get('/', function (req, res) {
    // console.log(app.locals.points)
    // res.send(app.locals.points);
    // batch_of_points = getPoints();  
    const num_lines = 50;

    let points = [];
    let result = {};
    let sumX = 0;
    let sumY = 0;
    let maxX = 0;
    let maxY = 0;
    last_lines.read(filePath, num_lines)
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
                    let point = convertDegreeToPoint(x,y);
                    maxX = Math.abs(point[0]) > maxX ? Math.abs(point[0]) : maxX
                    maxY = Math.abs(point[1]) > maxY ? Math.abs(point[1]) : maxY
                    sumX += point[0]
                    sumY += point[1]
                    points.push(point)
                });
                let avgX = sumX / num_lines;
                let avgY = sumY / num_lines;
                result = {points,maxX,maxY, avgX, avgY}
                return res.send(result);
            })
            
        })
        .catch(function(err) {
            console.log(err);
    }); 
})

app.listen(3000)
