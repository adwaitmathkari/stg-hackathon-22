const express = require('express');
const helmet = require('helmet')
const dotenv = require("dotenv");
const dbConnect = require('./dbConnect');
const format = require('pg-format');

const app = express();
app.use(helmet())
app.use(express.json());
const port = 3000
dotenv.config();
let dbclient;

// auth middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    const headers = req.headers;
    if (headers.client_id === 'qasd87tqawh123sd78' && headers.client_secret === 'asd976fsd087hj&%(FNORAQEW%*^') {   
        return next();
    }
    return res.status(401).send('Error, Authentication Failed')
})

app.post('/patient/add', async (req, res) => {
    // console.log(req.body);
    const patients = req.body;

    // let query1 = 'select * from public.patient;'
    let query1 = format(
        'INSERT INTO public.patient (patientid, name, age, gender, height, bedstatus, bedid, ward, bedtype, requeststatus) VALUES %L returning patientid',
        patients);
    const resp = await dbclient.query(query1)
    console.log(resp.rows);
    res.send('Patients Added');
})

app.get('/patients', async (req, res) => {
    let query1 = 'select * from public.patient;'
    
    const resp = await dbclient.query(query1)
    // console.log(resp.rows);
    res.status(200).json(resp.rows);
})

app.get('/beds', async (req, res) => {
    let query1 = 'select * from public.resource;'
    
    const resp = await dbclient.query(query1)
    // console.log(resp.rows);
    res.status(200).json(resp.rows);
})


app.post('/bed/setstatus', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    if(!data.patientid || !data.bedid) res.status(400).send('Bad Request');
    
    const patientid = data.patientid;
    const bedid = data.bedid;
    const status = data.status;
    
    let query1 = `UPDATE patient SET bedid = '${bedid}', bedstatus = '${status}' 
                   WHERE patientid = '${patientid}';`;
    // const values = [bedid, status, patientid ];
    
    const resp = await dbclient.query(query1);
    console.log(resp);


    // update bed object
    const bedStatus = status === 'ALLOCATED' ? 'ASSIGNED' : 'AVAILABLE';
    let query2 = `UPDATE resource 
                   SET assignedstatus = '${bedStatus}' WHERE bedid='${bedid}'`;
    console.log(query2);
    const resp2 = await dbclient.query(query2);
    console.log(resp2);

    res.json({staus: 'Successfully updated statuses'});
})



app.listen(port, async () => {
    dbclient = await dbConnect();
    console.log(`Example app listening on port ${port}`)
})