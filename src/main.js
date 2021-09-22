const console = require("console");
const fs = require("fs");

const { initializeBuildDirectory }  = require("./directories.js");
const { debugComponents } = require("./components.js");

function init() {
  if(fs.existsSync("../../.././.jsipfs")) { 
    fs.rmdirSync("../../.././.jsipfs", {recursive: true}); 
    console.log(".jsipfs removed"); }
  initializeBuildDirectory();
  debugComponents();
}

async function generateUniqueFiles() {
  await init();

  const { generateImages } = require("./images.js");
  await generateImages();

  const { uploadGenerateAndUpload } = require("./upload.js");
  const message = await uploadGenerateAndUpload(); 
  console.log(message);
}

module.exports = { generateUniqueFiles };