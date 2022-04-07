const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/routes');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.set('port', port);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/', require('./routes/routes'));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  var allowedOrigins = ['http://localhost:3000'];
  //(_origin, callback) => callback(null, true),
  app.use(
    cors({
      origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: "GET, POST",
      credentials: true
    })
  );
  
  app.use(express.json({limit: '500kb'}));
  
  app.use(express.urlencoded({limit: '500kb', extended: true}));
  
  app.use('*', (_req, res, next) => {
    return next(setError(404,'Route not found'));
  });
  
  app.use((error, _req, res, _next) => {
    return res.status(error.status || 500).json(error.message || 'Error no esperado');
  });
  
  app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  app.disable('x-powerd-by');