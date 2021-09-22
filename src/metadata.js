const console = require("console");
const fs = require("fs");
const { traitsDir, buildDir, metaDir } = require("./directories.js");

const { theoreticalCollectionSize, traitPaths, traits, valuePaths, values, attributesCombinations, valuesCombinations } = require("./components.js")
const ref = require(".././traits/base.json");
const collectable = (name) => { return {"name": name}; };

// const rarity = ["doodoo", "garbage", "common", "uncommon", "rare", "super rare", "exotic", "epic", "legendary", "fabled", "far out man", "unheard of"]
// const rarity = ["doodoo", "garbage", "burnt", "overcooked", "well done", "medium well", "medium", "medium rare", "rare", "blue rare", "raw cut", "uncut"];
function assignRarity() {
  console.log("Assigning Rarity Scores... Please Wait");
  attributesCombinations.forEach(combo => {
    let set = new Set(combo);
    let diff = combo.length - set.size;
    let index = attributesCombinations.indexOf(combo);
    combo.push({"trait_type": "rarity", "value": diff/*rarity[diff]*/}); });
  console.log("Rarity Scores Assigned");
}

async function generateCollection(galleryPath) {
  console.log("Generating Metadata... Please Wait");
  for(let i = 1; i <= attributesCombinations.length; i++) {
    let instance = collectable(i);

    instance["name"] = i;
    if(ref["description"]) { instance["description"] = ref["description"]; }
    instance["image"] = `ipfs://${galleryPath}/${i}.png`;
    if(ref["external_url"]) { instance["external_url"] = `${ref["external_url"]}/${i}`; }
    if(ref["background_color"]) { instance["background_color"] = ref["background_color"]; }
    instance["attributes"] = attributesCombinations[i-1];

    if(fs.existsSync(`${metaDir}/${i}.json`)) { 
      console.log('Duplicate Metadata Detected || ' + i); } 
    else {
      await fs.writeFileSync(`${metaDir}/${i}.json`, JSON.stringify(instance, null, 2)); } 
  } 
  console.log(`Metadata Written to ${metaDir}\n_________________________________________________________________`);
}
      
async function generateMetadata(galleryPath) {
  await assignRarity();
  await generateCollection(galleryPath);
}

module.exports = { generateMetadata }