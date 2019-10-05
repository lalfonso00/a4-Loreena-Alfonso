const express = require('express');
const app = express();

const staticMiddleWare = express.static('public');
app.use(staticMiddleWare);

app.set('view engine', 'ejs');

const { validationResult } = require('express-validator');

const { heroesValidators } = require(__dirname + "/validators.js");
const { colorsValidators } = require(__dirname + "/validators.js");

app.use(express.urlencoded({ extended: true }));




app.get('/', colorsValidators, (req, res) => {

    let userColor = req.query.color;
    console.log(userColor);
    res.render('index', { style: { color: userColor } })
});

app.post('/heroes', heroesValidators, (req, res) => {

    const valErrors = validationResult(req).array();

    //422 - unporcessable entity
    if (valErrors.length != 0) {
        res.status(422).send(valErrors)
    }
    else {
        //  res.send(req.body);
        res.render('heroes-success', { hero: req.body });
    }
});


app.set('port', 8080);
const server = app.listen(app.get('port'), () => {
    console.log("Listening on ", app.get('port'));
});
