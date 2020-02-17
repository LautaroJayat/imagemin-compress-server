const express = require('express');
const path = require('path');
const multer = require('multer');
const ctrl = require('./bigControllers');

// Storage config
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
app.use(express.static(path.join(__dirname, 'public')));


//  Middlewares
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img')
}).single('image'));


//  Routes
app.listen(app.get('port'), () => {
    console.log("server listening on", app.get('port'));
});

app.get('/http', (req, res) => {
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('testing');
});

app.post('/', ctrl.ajaxUpload);

app.post('/post', ctrl.upload);