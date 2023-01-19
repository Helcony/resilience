const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const mySQLString = 'mysql://b52ac82e4c19e2:29dd909f@us-cdbr-east-06.cleardb.net/heroku_c5023923961fb8a?reconnect=true'
const database = new Prohairesis(mySQLString)

app
    .use(express.static('public'))
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .post('/api/user', (req, res) => {
        const body = req.body;
        database.execute(`
            INSERT INTO users (
                nome,
                nomeEmpresa, 
                tel,
                email
            ) VALUES (
                @nome,
                @nomeEmpresa,
                @tel,
                @email
            )
        `, {
            nome: body.nome,
            nomeEmpresa: body.nomeEmpresa,
            tel: body.tel,
            email: body.email,
        }
        )

        res.redirect('/forms.html')
    })
    .listen(port, () => console.log(`server listening in port ${port}`))
