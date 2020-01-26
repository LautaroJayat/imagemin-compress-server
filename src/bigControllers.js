const path = require('path');
const multer = require('multer');
const fs = require('fs');
const imagemin = require('imagemin');
const recomp = require('imagemin-jpeg-recompress');
const ctrl = {};

ctrl.ajaxUpload = async (req, res) => {
    const file = req.file.path
    const fileC = await imagemin([file], {
        destination: path.join(__dirname, 'public'),
        plugins: [
            recomp({ method: "smallfry", target: 0.9, accurate: true, progressive: true })
        ]
    });
    const fileCpath = fileC[0].destinationPath;
    // Creating a new array for both compressed and uncompressed image file sizes
    function uncompressedSize() {
        fs.stat(path.join(file), (err, stat) => {
            if (err) throw err;
            console.log("\nCheck! Check!\nThesize of this file is ", stat.size);
        });
    };

    function compressedSizes() {
        fs.stat(path.join(fileCpath), (err, stat) => {
            if (err) throw err;
            console.log("But Dont worry\nThe compresed one is ", stat.size);
        });
    };
    var compresedPath = fileC[0].destinationPath.substring(fileC[0].destinationPath.indexOf('public')).replace('public/', ""); uncompressedSize();
    compressedSizes();
    res.json({ "compressed": compresedPath });
    res.end();

}


ctrl.upload = async (req, res) => {

    // Creating a new array for both compressed and uncompressed image file sizes
    var sizes = [];

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
            resolve(sizes.push(stat.size));
        });
    }
    // Creating the first promise in order to assign the first value to the array
    var pushing1 = new Promise(target1)

    // Creating the second function to populate the array with the compressed file size
    var target2 = function (resolve, reject) {
        fs.stat(path.join(fileC[0].destinationPath), function (err, stat) {
            if (err) throw err;
            resolve(sizes.push(stat.size));
        });
    }
    //  Creating the promise wich will be used after the first promise 
    //      populate the array with the compressed file size
    var pushing2 = new Promise(target2);


    ///
    ///     Running the promises and then sending the response to the client
    /// 
    console.log(fileC[0].destinationPath.substring(fileC[0].destinationPath.indexOf('public')).replace('public/', ""));
    var compresedPath = fileC[0].destinationPath.substring(fileC[0].destinationPath.indexOf('public')).replace('public/', "");
    pushing1.then(function (value) {
        pushing2.then(function (value) {

            //
            // Function what we are sending to the client 
            res.write(`<p>
            The uncompressed file size is ${sizes[0]} bytes.\n\nBut dont worry, the compressed one is ${sizes[1]} bytes.\n\nHave a nice day.
            <p>
            <img src=/${compresedPath}>
            `);
        })
    });

}

module.exports = ctrl;