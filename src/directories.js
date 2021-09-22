const console = require("console");
const fs = require("fs");

const buildCounter = require("./build.json");

if (!process.env.PWD) {process.env.PWD = process.cwd();}
const traitsDir = `${process.env.PWD}/traits`;
const allBuildsDir = `${process.env.PWD}/build`;
const buildDir = `${allBuildsDir}/${buildCounter["builds"]}`;
const metaDir = `${buildDir}/metadata`;
const imgDir = `${buildDir}/images`;

function initializeBuildDirectory() {
  
  console.log("_________________________________________________________________");
  /*
  console.log("DEBUG: directories.js");
  console.log("\nPrinting Constants...");
  console.log(traitsDir);
  console.log(allBuildsDir);
  console.log(buildDir);
  console.log(metaDir);
  console.log(imgDir);*/

  //if(fs.existsSync(traitsDir)) { console.log(`\nTrait Directory Located`); }
  
  if(fs.existsSync(allBuildsDir) === false) { fs.mkdirSync(allBuildsDir); }

  if(fs.existsSync(buildDir)) { fs.rmdirSync(buildDir, {recursive: true}); }
  if(fs.existsSync(metaDir)) { fs.rmdirSync(metaDir, {recursive: true}); }
  if(fs.existsSync(imgDir)) { fs.rmdirSync(imgDir, {recursive: true}); }

  fs.mkdirSync(buildDir);
  fs.mkdirSync(metaDir);
  fs.mkdirSync(imgDir);

  console.log(`\nBuild Directories Initialized\n${buildDir}\n${metaDir}\n${imgDir}`);

  console.log("_________________________________________________________________");
}

module.exports = {initializeBuildDirectory, traitsDir, allBuildsDir, buildDir, metaDir, imgDir};