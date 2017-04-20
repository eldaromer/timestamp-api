var express = require('express');
var app = express();

var path = require('path');

var morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

var naturalDate = function (date) {
    var tempDate = new Date(date);
    
    var result = {};
    
    if ( Object.prototype.toString.call(tempDate) === "[object Date]" ) {
        // it is a date
        if ( isNaN( tempDate.getTime() ) ) {  // d.valueOf() could also work
            result.unix = null;
            result.natural = null;
        }
        else {
            result.unix = tempDate.getTime();
            result.natural = date;
        }
    } else {
        result.unix = null;
        result.natural = null;
    }
    
    return result;
    
}

var unixDate = function (date) {
    
    var result = {};
    result.unix = parseInt(date);
    
    var tempDate = new Date(parseInt(date));
    result.natural = naturalDateGen(tempDate);
    
    return result;
    
}

var naturalDateGen = function (date) {
    
    var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
    ];
    
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
}

app.get('/:date', function(req, res) {
    
    var data = req.params.date;
    
    var result = isNaN(data) ? naturalDate(data) : unixDate(data)
    
    if (result) {
        res.send(result);
    } else {
        res.send({"unix": null, "natural": null});
    }
    
})

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(8080);