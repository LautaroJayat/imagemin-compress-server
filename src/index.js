const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const imagemin = require('imagemin');
const recomp = require('imagemin-jpeg-recompress');


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Initializations
const app = express();

//  Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//  Middlewares
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img')
}).single('image'));


//  Routes
app.listen(app.get('port'), () => {
    console.log("server listening on", app.get('port'));
});

app.get('/', (req, res) => {
    res.render('index');
});




app.post('/post', async (req, res) => {

    // Creating a new array for both compressed and uncompressed image file sizes
    var OutsideScopeVariable = [];

    // Require path and comppressing with imagemin
    const file = req.file.path
    const fileC = await imagemin([file], {
        destination: path.join(__dirname, 'public'),
        plugins: [
            recomp({ method: "smallfry", target: 0.9, accurate: true, progressive: true })
        ]
    });

    // Creating a function to populate the array with the uncompressed file size
    var target1 = function (resolve, reject) {
        fs.stat(path.join(file), function (err, stat) {
            if (err) throw err;
            resolve(OutsideScopeVariable.push(stat.size));
        });
    }
    // Creating the first promise in order to assign the first value to the array
    var pushing1 = new Promise(target1)

    // Creating the second function to populate the array with the compressed file size
    var target2 = function (resolve, reject) {
        fs.stat(path.join(fileC[0].destinationPath), function (err, stat) {
            if (err) throw err;
            resolve(OutsideScopeVariable.push(stat.size));
        });
    }
    //  Creating the promise wich will be used after the first promise 
    //      populate the array with the compressed file size
    var pushing2 = new Promise(target2);


    ///
    ///     Running the promises and then sending the response to the client
    /// 
    pushing1.then(function (value) {
        pushing2.then(function (value) {

            //
            // Function what we are sending to the client 
            res.send(`
            The uncompressed file size is ${OutsideScopeVariable[0]} bytes.\n\nBut dont worry, the compressed one is ${OutsideScopeVariable[1]} bytes.\n\nHave a nice day.
            `);
        })
    });






});

/*app.get('/delete', async (req, res) => {
    await fs.unlink(app.get('file'), (err) => { if (err) throw err });
    res.send('file deleted');
});*/