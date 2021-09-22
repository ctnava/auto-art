const console = require("console");
const fs = require("fs");

const { buildDir, metaDir }  = require("./directories.js");
const { uploadGenerateAndUpload } = require("./upload.js");

function init() {
  if(fs.existsSync("../../.././.jsipfs")) { 
    fs.rmdirSync("../../.././.jsipfs", {recursive: true}); 
    console.log(".jsipfs removed"); }
  if(fs.existsSync(`${buildDir}/imageDir_IPFS.json`)) { 
    fs.rmSync(`${buildDir}/imageDir_IPFS.json`); 
    console.log("imageDir_IPFS.json removed"); }
  if(fs.existsSync(`${buildDir}/metadataDir_IPFS.json`)) { 
    fs.rmSync(`${buildDir}/metadataDir_IPFS.json`); 
    console.log("metadataDir_IPFS.json removed"); }
  if(fs.existsSync(`${metaDir}/1.json`)) {
    const directory = fs.readdirSync(metaDir);
    directory.forEach(file => fs.rmSync(`${metaDir}/${directory.indexOf(file)+1}.json`));
    console.log("existing metadata removed"); }
}

async function generateUniqueFiles() {
  await init();
  const message = await uploadGenerateAndUpload(); 
  console.log(message);
}

module.exports = { generateUniqueFiles };