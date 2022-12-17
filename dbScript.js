
// const { Client } = require("pg")

// const format = require('pg-format');
// const dotenv = require("dotenv")
// dotenv.config()

// const connectDb = async () => {
//     let client;
//     try {
//         client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: 'hackathon123####',
//             port: process.env.PGPORT
//         })

//         await client.connect()


//         let patients = [
//             ["1", "Mary", 22, "F", 170.2, "ALLOCATED", 11, "Orthopaedic", "Manual", "ALLOCATED"],
//             ["2", "Chauncey", 25, "M", 173.6, "ALLOCATED", 12, "Orthopaedic", "Semi - Electric", "ALLOCATED"],
//             ['3', 'Anna', 26, 'F', 175.9, 'ALLOCATED', 21, 'Accidents And Emergency', 'Manual', 'ALLOCATED'],
//             ['4', 'Emma', 37, 'F', 168.9, 'REQUESTED', null, 'Pregnancy', 'Semi - Electric', 'ACTIVE'],
//             ['5', 'Elizabeth', 45, 'F', 175.4, 'ALLOCATED', 31, 'Critical Care', 'Full - Electric', 'ALLOCATED'],
//             ['6', 'Minnie', 17, 'F', 173.6, 'REQUESTED', null, 'Accidents And Emergency', 'Full - Electric', 'ACTIVE'],
//             ['7', 'Dempsey', 29, 'M', 167.5, 'REQUESTED', null, 'Orthopaedic', 'Manual', 'ACTIVE'],
//             ['8', 'Elmore', 64, 'M', 176.2, 'ALLOCATED', 32, 'Critical Care', 'Full - Electric', 'ALLOCATED'],
//             ['9', 'Emmanuel', 24, 'M', 175.3, 'REQUESTED', null, 'Orthopaedic', 'Manual', 'ACTIVE'],
//             ['10', 'Harlen', 33, 'M', 172.8, 'REQUESTED', null, 'Orthopaedic', 'Manual', 'ACTIVE'],
//         ]

//         // let users = [['test@example.com', 'Fred'], ['test2@example.com', 'Lynda']];
//         let query1 = format('INSERT INTO public.patient (patientId, name, age, gender, height, bedStatus, bedId, ward, bedType, requestStatus) VALUES %L returning id', patients);


//         let query1 = 'DROP TABLE IF EXISTS public.patient;'
//         const res = await client.query(query1)
//         console.log(res)
//         await client.end()
//     } catch (error) {
//         console.log(error)
//         await client.end()
//     }
// }
// let f = () => {
//     let q = 'DROP TABLE IF EXISTS public.patient;'

//     let q2 = `CREATE TABLE IF NOT EXISTS public.patient
//             (
//                 "patientId" VARCHAR(255) ,
//                 name VARCHAR(255) ,
//                 age integer,
//                 gender VARCHAR(255) ,
//                 height double precision,
//                 "bedStatus" VARCHAR(255) ,
//                 "bedId" VARCHAR(255) ,
//                 ward VARCHAR(255) ,
//                 "bedType" VARCHAR(255) ,
//                 "requestStatus" VARCHAR(255) 
//             )`

// }


// connectDb()