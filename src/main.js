const console = require("console");
const { initializeBuildDirectory }  = require("./directories.js");
const { debugComponents, attributesCombinations } = require("./components.js");
const { generateMetadata } = require("./metadata.js");
const { generateImages } = require("./images.js");

async function generateUniqueFiles() {
  console.log("_________________________________________________________________");
  await initializeBuildDirectory();
  await debugComponents();
  await console.log(`Generating ${attributesCombinations.length} Unique Collectibles...`);
  console.log("_________________________________________________________________");
  await generateImages();
  const { uploadGenerateAndUpload } = require("./upload.js");
  await uploadGenerateAndUpload();
  console.log(`End Program`);
}

module.exports = { generateUniqueFiles };