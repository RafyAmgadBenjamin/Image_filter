import fs from 'fs';
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

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  app.get("/filteredimage/", async (req: Request, res: Response) => {

    let { image_url } = req.query;
    // let allFiles: string[] = ['aa'];
    if (!image_url) {
      return res.status(400)
        .send(`image_url is required`)
    }

    let filteredPath = await filterImageFromURL(image_url);
    console.log(filteredPath)

    let allFilesToDelete: string[] = getAllFilesInPath(__dirname + "/util/tmp/")
    // console.log(__filename)
    // console.log(__dirname)
    console.log("all files in serve file to be deleted")
    console.log(allFilesToDelete)

    res.status(200)
      .sendFile(filteredPath);


    res.on('finish', async function () {
      try {
        // fs.unlink(filename);
        console.log("it time to delete the image")
        // await deleteLocalFiles(allFilesToDelete)
        fs.unlink(filteredPath, function () {
          // file deleted
        });
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