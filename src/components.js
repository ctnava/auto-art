const console = require("console");
const fs = require("fs");
const { traitsDir, buildDir, metaDir } = require("./directories.js");

// TRAITS
const traitsDirectory = fs.readdirSync(traitsDir);

const traitFolders = traitsDirectory.filter(entry => entry != 'base.json');
const numTraits = traitFolders.length;
function loadTraitPaths() {
  let paths = [];
  traitFolders.forEach(folder => paths.push(`${traitsDir}/${folder}`));
  return paths;
}
const traitPaths = (loadTraitPaths());
function loadTraits() {
  let names = [];
  traitFolders.forEach(folder => names.push(folder.substring(2))); 
  return names;
}
const traits = loadTraits();
const lastTrait = traits[numTraits-1]; 
const tIndex = (trait) => traits.indexOf(trait);

// TRAIT VALUES
const valueDirectory = (trait) => { return traitPaths[traits.indexOf(trait)]; }

const valueFiles = (trait) => { return fs.readdirSync(valueDirectory(trait)); }
const numValues = (trait) => { return valueFiles(trait).length };

function loadTraitValuePaths(trait) {
  let paths = [];
  valueFiles(trait).forEach(file => paths.push(`${valueDirectory(trait)}/${file}`));
  return paths;
}
const valuePaths = (trait) => loadTraitValuePaths(trait);

function loadTraitValues(trait) {
  let names = [];
  valueFiles(trait).forEach(file => names.push(file.substring(0, file.indexOf("."))));
  return names;
}
const values = (trait) => loadTraitValues(trait);
const lastValue = (trait) => values(trait)[numValues(trait)-1];
const vIndex = (trait, value) => values(trait).indexOf(value);

const attribute = (trait, value) => { return {"trait_type": trait, "value": value};};

function possibleAttributes(trait) {
  let possibilities = [];
  values(trait).forEach(value => { 
    let thisAttribute = attribute(trait, value);
    possibilities.push(thisAttribute); });
  return possibilities;
}
const numPossibleAttributes = (trait) => possibleAttributes(trait);

function generateAttributesInventory() {
  let inventory = [];
  traits.forEach(trait => { inventory.push(possibleAttributes(trait)); });
  return inventory;
}
const attributesInventory = generateAttributesInventory();

function getNumPossible() {
  let allNumValues = [];
  traits.forEach(trait => allNumValues.push(numValues(trait))); 
  let temp = 1;
  for(let i = 0; i < allNumValues.length; i++) { temp *= allNumValues[i] };
  return temp;
}
const theoreticalCollectionSize = getNumPossible();

function loadCombinations(inv, n = 0, result = [], current = []) {
  if(n === inv.length) { result.push(current); }
  else { inv[n].forEach(element => loadCombinations(inv, n+1, result, [...current, element])); }
  return result;
}
const attributesCombinations = loadCombinations(attributesInventory);

function generateValuesInventory() {
  let inventory = [];
  traits.forEach(trait => { inventory.push(values(trait)); });
  return inventory;
}
const valuesInventory = generateValuesInventory();
const valuesCombinations = loadCombinations(valuesInventory);

function debugComponents() {
  console.log("DEBUG: components.js\n\nSummary(Traits)\n\nRaw Directory:");
	console.log(traitsDirectory);
  console.log("\nFolders:");
  console.log(traitFolders);
  console.log(`\nTotal: ${numTraits}`);
  console.log("\nPaths:");
  console.log(traitPaths);
  console.log("\nNames:");
  console.log(traits);
  
  console.log("\nSummary(Values): All Traits");
  traits.forEach(trait => {
    console.log("~~~~~~~~~~~~~~~");
    console.log(`Value: ${trait}\n\nRaw Directory:`);
    console.log(valueDirectory(trait));
    console.log("\nFiles:");
    console.log(valueFiles(trait));
    console.log(`\nTotal: ${numValues(trait)}`);
    console.log("\nPaths:");
    console.log(valuePaths(trait));
    console.log("\nNames:");
    console.log(values(trait));
    console.log("\npossibleAttributes:");
    console.log(possibleAttributes(trait));
  });
  console.log("~~~~~~~~~~~~~~~");
  console.log("\nInventory");
  console.log(attributesInventory);
  console.log(valuesInventory);
  console.log(`\nLast Trait: ${lastTrait}`);
  traits.forEach(trait => {
    console.log("~~~~~~~~~~~~~~~");
    console.log(`Trait: ${trait}\nTrait Index: ${tIndex(trait)}\nLast Value(${trait}): ${lastValue(trait)}`); 
    values(trait).forEach(value => { console.log(`    Value: ${value}\n    Value Index: ${vIndex(trait, value)}`); });
  });
  console.log("~~~~~~~~~~~~~~~");
  console.log(`\nTheoretical Collection Size: ${theoreticalCollectionSize}`);
  console.log("\nPrinting Combinations");
  console.log(attributesCombinations);
  if(theoreticalCollectionSize === attributesCombinations.length) { console.log("SUCCESS: All Possible Attribute Combinations Generated"); }
  else { console.log("ERROR: theoreticalCollectionSize != attributesCombinations.length"); }
  console.log(valuesCombinations);
  if(theoreticalCollectionSize === valuesCombinations.length) { console.log("SUCCESS: All Possible Value Combinations Generated"); }
  else { console.log("ERROR: theoreticalCollectionSize != attributesCombinations.length"); }
  console.log(`Generating ${attributesCombinations.length} Unique Collectibles...`);
  console.log("_________________________________________________________________");
}

module.exports = { debugComponents, traitPaths, traits, valuePaths, values, attributesCombinations, valuesCombinations };