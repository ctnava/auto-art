const console = require("console");
const fs = require("fs");
const { traitsDir, buildDir, metaDir } = require("./directories.js");

const { theoreticalCollectionSize, traitPaths, traits, valuePaths, values, attributesCombinations, valuesCombinations } = require("./components.js")

// const rarity = ["doodoo", "garbage", "common", "uncommon", "rare", "super rare", "exotic", "epic", "legendary", "fabled", "far out man", "unheard of"]
// const rarity = ["doodoo", "garbage", "burnt", "overcooked", "well done", "medium well", "medium", "medium rare", "rare", "blue rare", "raw cut", "uncut"];
function defineRarity(combo) {
  const set = new Set(combo);
  const diff = combo.length - set.size;
  // return rarity[diff]; // only if one of the rarity arrays is uncommented
  return diff; // numerical default
}
function addRarity() {
  console.log("Assigning Rarity");
  attributesCombinations.forEach(combo => {
    let index = attributesCombinations.indexOf(combo);
    combo.push({"trait_type": "rarity", "value": defineRarity(valuesCombinations[index])});
  });
}

// COLLECTIBLE
const ref = require(".././traits/base.json");
const collectable = (name) => { return {"name": name}; };

function realizeMetadata(instance, comboIndex) {
  fs.stat(`${metaDir}/${comboIndex}.json`, (err) => {
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${metaDir}/${comboIndex}.json`, JSON.stringify(instance, null, 2)); } 
    else {
      console.log('Duplicate Metadata Detected || ' + comboIndex);} });
}

async function generateMetadata(galleryPath) {
  console.log("Generating Metadata... Please Wait");
  await addRarity();
  console.log("Rarities Added");
  let result = [];
  for(let i = 1; i <= attributesCombinations.length; i++) {
    let instance = collectable(i);
    instance["name"] = i;
    if(ref["description"]) { instance["description"] = ref["description"]; }
    instance["image"] = `ipfs://${galleryPath}/${i}.png`;
    if(ref["external_url"]) { instance["external_url"] = `${ref["external_url"]}/${i}`; }
    if(ref["background_color"]) { instance["background_color"] = ref["background_color"]; }
    instance["attributes"] = attributesCombinations[i-1];
    await realizeMetadata(instance, i);
    result.push(instance);
  } 
  console.log("Metadata Generated");
  console.log("_________________________________________________________________");
  return result;
}

module.exports = { generateMetadata }