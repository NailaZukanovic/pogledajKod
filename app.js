const express = require('express');
const app = express();

const morgan = require('morgan'); //koristi next funkciju da locka nesto, a tebe pusti sa zahtevima

const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

const userRoutes = require('./api/routes/user');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://mongo:'
 + process.env.MONGO_ATLAS_PW 
 + '@cluster0.tb2zz.mongodb.net/test' 
// {
//     useMongoClient : true
// }
);

//morgan sluzi za pracenje requesta i errora
app.use(morgan('dev')); //dev je tip podataka koji cemo koristiti


app.use('/uploads', express.static('uploads')); //makes uploads public

app.use(bodyParser.urlencoded({extended: false})); //Da bi prebacivao podatke
app.use(bodyParser.json()); //express.json 


//Za Headere, da odobris pristup??
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*'); //* da bi dao access svakom originu
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    //Ako browser moze pristupiti 
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        //We do provide such an answer

        return res.status(200).json({});
    }

    next();
})

//Middleware that forwards requests

//Routes that should handle requests
app.use('/products', productRoutes); //nickmane for rutu za producte i koristi sa appom
app.use('/orders', orderRoutes); //nickname for rutu za ordere i koristi sa appom
app.use('/user',userRoutes);

//svaki request treba doci do ovog fajla pa posle da se prebacuje
//ako se ne izvrse prva dva (nema funkcija koje bi to izdrzale), onda ce se izvrsiti ovo za error 

//salje request jer je to jedini, ne treba ti poseban faj;
app.use( (req, res, next) => {
    const error = Error('not found');
    error.status = 404;

    next(error); //forwarduje dalje kroz fajl error koji si kreirala
});

//Ova middleware ovde sluzi za handleanje svih errora, ne samo onaj gore sto smo napravili, vec i onaj iz baze 

app.use( (error,req,res, next) =>
{
    res.status(error.status || 500);

    res.json({

        error:{
            message: error.message
        }

    });
});

module.exports = app;
