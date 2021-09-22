const console = require("console");
const fs = require("fs");

const { initializeBuildDirectory }  = require("./directories.js");
const { debugComponents } = require("./components.js");

buildId = require("./build.json");
const base = (id) => { return {"builds": id}; };

async function generateUniqueFiles() {

  await initializeBuildDirectory();
  await debugComponents();

  const { generateImages } = require("./images.js");
  await generateImages();

  const { uploadGenerateAndUpload } = require("./upload.js");
  const message = await uploadGenerateAndUpload(); 
  console.log(message);

  const nextBuild = await base(buildId["builds"]+1);
  await fs.writeFileSync("./src/build.json", JSON.stringify(nextBuild, null, 2), function writeJSON(err) { if (err) { return console.log(err); } }); 
  console.log('overwriting ' + "./src/build.json");
}

module.exports = { generateUniqueFiles };