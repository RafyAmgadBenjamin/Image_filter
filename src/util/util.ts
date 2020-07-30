import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}

// getAllFilesInFolder
// helper function to get files in a folder on the local disk 
// useful to list files in path

export function getAllFilesInPath(path: string) {
    var allFiles: Array<string> = [];
    fs.readdirSync(path).forEach(file => {
        allFiles.push(file);
    });
    return allFiles
}
// export async function getAllFilesInPath(path: string) {
//     var allFiles: Array<string> = [];
//     fs.readdir(path, (err, files) => {
//         files.forEach(file => {
//             console.log(file)
//             allFiles.push(file);
//         });
//     });
//     console.log("out side the loop")
//     console.log(allFiles)
//     return allFiles
// }
