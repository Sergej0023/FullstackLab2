import express from 'express';
import { router } from './src/route/index.js';
import databaseService from "./src/service/databaseService.js";

await databaseService.connect();

const PORT = process.env.PORT;
const app = express();

app.use(express.static('public'));

// Use the public folder for static resources
app.use(express.static('./client/dist'))


app.use(express.json());

app.use('/', router);

app.use((req, res, next) => {
    res.sendFile('index.html', { root: './client/dist' }, (err) => {
        if (err) {
            next(err)
        }
    })
})




app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});


