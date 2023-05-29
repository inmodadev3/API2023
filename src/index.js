const express = require('express');
const app = express();
const cors = require('cors');
const routerApi = require('../routes/index')

//settings port 

app.set('port', process.env.PORT || 3500);
// middlewares
app.use(express.json());
app.use(cors());
// routes o endpoint
//app.use(require('../routes/tblvendedores'));
//app.use(require('../routes/tblTerceros')); 

routerApi(app);

//app.use('/api/productos/',require('../routes/productos'))

app.listen(app.get('port'),()=>{
    console.log(`server is running in http://localhost:${app.get('port')}`);
});