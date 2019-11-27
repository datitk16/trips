const express = require('express');
const swaggersUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const router = express.Router();

router.use('/',swaggersUi.serve,swaggersUi.setup(swaggerDocs))

module.exports=  router;