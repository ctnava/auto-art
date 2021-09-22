const console = require("console");
const fs = require("fs");
const IPFS = require("ipfs");
const all = require("it-all");
const { buildDir, imgDir, metaDir } = require("./directories.js");
const { generateMetadata } = require("./metadata.js");

const imageDirectory = fs.readdirSync(imgDir);
const metadataDirectory = fs.readdirSync(metaDir);

function loadLabels() {
  	let labels = [];
  	metadataDirectory.forEach(file => labels.push(file.substring(0, file.indexOf("."))));
  	return labels; }
const labels = loadLabels();

function loadBuffer(directory) {
	let result = [];
	let files = fs.readdirSync(directory);
	files.forEach(file => {
		let buffer = fs.readFileSync(`${directory}/${file}`); 
		result.push(buffer); });
	return result; }
const bufferedImages = loadBuffer(imgDir);
const bufferedMetadata = loadBuffer(metaDir);

async function uploadGenerateAndUpload() {
	const node = await IPFS.create();
	await node.files.mkdir('/images');
	await node.files.mkdir('/metadata');
	
	async function uploadFiles(type ,files, cont) {
		const fileObjectsArray = files.map((file) => { 
			const filePath = `/${type}/${file}`;
			const fileContent = cont[files.indexOf(file)];
			return { path: filePath, content: fileContent };});

		const uploaded = await all(node.addAll(fileObjectsArray, { pin: true, wrapWithDirectory: true }));
  		const directoryCID = uploaded[uploaded.length - 1].cid;
  		return all(node.ls(directoryCID)); 
  	}
  	
  	console.log("Uploading Images... Please Wait");
	const gpArray = await uploadFiles("images", imageDirectory, bufferedImages);
	console.log(gpArray[0].path);
	console.log("Images Uploaded");
	console.log("_________________________________________________________________");

	await generateMetadata(gpArray[0].path);

	console.log("Uploading Metadata... Please Wait");
  	const mpArray = await uploadFiles("metadata", labels, bufferedMetadata);
  	console.log(mpArray[0].path);
	console.log("Metadata Uploaded");
	console.log("_________________________________________________________________"); 
	await fs.writeFileSync(`${buildDir}/imageDir_IPFS.json`, JSON.stringify(gpArray[0], null, 2));
	await fs.writeFileSync(`${buildDir}/metadataDir_IPFS.json`, JSON.stringify(mpArray[0], null, 2));

	node.stop();
}

module.exports = { uploadGenerateAndUpload };