const console = require("console");
const fs = require("fs");
const { imgDir } = require("./directories.js");
const { traits, traitPaths, valuesCombinations } = require("./components.js");

const dimensions = {width: 230, height: 230};

const {createCanvas, loadImage} = require("canvas");
const canvas = createCanvas(dimensions.width, dimensions.height);
const ctx = canvas.getContext("2d");

async function drawLayer(trait, value, index) { 
  const image = await loadImage(`${traitPaths[traits.indexOf(trait)]}/${value}.png`);

  await ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  await fs.writeFileSync(`${imgDir}/${index}.png`, canvas.toBuffer("image/png"));
} 

async function generateImages() {
  console.log("Generating Images... Please Wait");
  for(let i = 0; i < valuesCombinations.length; i++) {
    for(let j = 0; j < valuesCombinations[i].length; j++) {
      let trait = traits[j];
      await drawLayer(trait, valuesCombinations[i][j], i+1); 
    } 
  }
  console.log("Images Generated");
  console.log("_________________________________________________________________");
}

module.exports = { generateImages };