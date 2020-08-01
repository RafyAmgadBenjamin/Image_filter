import bodyParser from 'body-parser';
import express, { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles, getAllFilesInPath } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage/", async (req: Request, res: Response) => {

    let { image_url } = req.query;
    if (!image_url) {
      return res.status(422)
        .send(`image_url is required`)
    }

    let filteredPath = await filterImageFromURL(image_url);
    res.status(200)
      .sendFile(filteredPath);

    // On finish event, I will fire the deletion of files
    res.on('finish', async function () {
      try {
        let allFilesToDelete = await getAllFilesInPath(__dirname + "/util/tmp/")
        // Type cast the object to array of string 
        let allFilestoDeleteList = allFilesToDelete as Array<string>
        let filesDeletedFullPath: Array<string> = []
        // Get the file path of the files
        allFilestoDeleteList.forEach((file) => {
          filesDeletedFullPath.push(__dirname + "/util/tmp/" + file)
        })
        await deleteLocalFiles(filesDeletedFullPath)

      } catch (e) {
        console.log("error removing ", filteredPath);
      }
    });
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();