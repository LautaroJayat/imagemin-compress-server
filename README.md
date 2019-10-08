# imagemin-compress-server

A minimal example of a Express server that implements [ImageMin](https://www.npmjs.com/package/imagemin) and the [Jpeg-Recompress ImageMin Pluguin](https://www.npmjs.com/package/imagemin-jpeg-recompress);

## Instructions for a normal upload

1. Clone the repository or [download the zip file](https://github.com/LautaroJayat/imagemin-compress-server/archive/master.zip);

2. Open a terminal in the directory where you have cloned this repo and run **```npm run build```** in order to install all the packages and dependencies. Then run **```npm run dev```** to initialize the server;

3. Open your browser and go to **localhost:3000**

4. Select a jpg image to compress and press the **UPLOAD** button.

5. Enjoy the pleasure of having 3 beautiful lines that displays the sizes of the uncompressed and the compressed files in your own screen.

6. Bon Apetit.

## Instructions for canvas and ajax version

1. Same as before but go to **localhost:300/ajax**

2. Select a file;

3. Click on ***ToCanvas*** button. It will draw the jpeg image to the canvas.

4. Click on ***ToData*** button. It will turn the canvas into a blob.

5. click on ***toServer*** button. It will send de blob to the server and then compress it;

6. Check the therminal, it will display some logs with the old and the new sizes.

