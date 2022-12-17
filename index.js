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


app.post('/patient/assignbed', async (req, res) => {
    console.log('REQUEST BODY: ' ,req.body);
    const data = req.body;
    if(!data.patientid || !data.bedid) res.status(400).send('Bad Request');
    
    const patientid = data.patientid;
    const bedid = data.bedid;

    //get bed status:
    let beds = await dbclient.query(`select * from public.resource where bedid = '${bedid}'`);
    beds = beds.rows;
    console.log(beds);
    if (!beds || beds.length === 0) {
        return res.status(404).send('Not found');
    }
    let bed = beds[0];
    if (bed.assignedstatus === 'ASSIGNED') {
        return res.status(400).json({ message: 'Bed Unavailable' })
    }
    
    // Update patient
    let query1 = `UPDATE patient SET bedid = '${bedid}', bedstatus = 'ALLOCATED' 
                   WHERE patientid = '${patientid}';`;
    // const values = [bedid, status, patientid ];
    
    const resp = await dbclient.query(query1);
    console.log(resp);


    // update bed object
    const bedStatus = 'ASSIGNED';
    let query2 = `UPDATE resource SET assignedstatus = '${bedStatus}' WHERE bedid='${bedid}'`;
    console.log(query2);
    const resp2 = await dbclient.query(query2);
    console.log(resp2);

    return res.json({staus: 'Successfully assigned bed to patient', patientid, bedid});
})


app.post('/patient/discharge', async (req, res) => {
    console.log('REQUEST BODY: ' ,req.body);
    const data = req.body;
    if(!data.patientid) res.status(400).send('Bad Request');
    
    const patientid = data.patientid;

    //get patient
    let patients = await dbclient.query(`select * from public.patient where patientid = '${patientid}'`);
    patients = patients.rows;
    console.log(patients);
    if (!patients || patients.length === 0) {
        return res.status(404).send('Not found');
    }
    let patient = patients[0];
    if (patient.bedstatus !== 'ALLOCATED' || !patient.bedid) {
        return res.status(400).json({ message: 'Patient not allocated any bed' })
    }
    const bedid = patient.bedid;
    
    // Update patient
    let query1 = `UPDATE patient SET bedid = null, bedstatus = 'DISCHARGED' 
                   WHERE patientid = '${patientid}';`;
    
    const resp = await dbclient.query(query1);
    console.log(resp);


    // update bed object
    const bedStatus = 'AVAILABLE';
    let query2 = `UPDATE resource SET assignedstatus = '${bedStatus}' WHERE bedid='${bedid}'`;
    const resp2 = await dbclient.query(query2);
    console.log(resp2);

    return res.json({staus: 'Successfully discharged patient', patientid: patientid, bedid});
})



app.listen(port, async () => {
    dbclient = await dbConnect();
    console.log(`Example app listening on port ${port}`)
})