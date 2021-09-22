const console = require("console");
const fs = require("fs");
const IPFS = require("ipfs");
const all = require("it-all");

const { buildDir, imgDir, metaDir } = require("./directories.js");
const buildCounter = require("./build.json");

const labels = () => {
  		let labels = [];
  		fs.readdirSync(imgDir).forEach(file => labels.push(file.substring(0, file.indexOf("."))));
  		return labels; };

async function uploadGenerateAndUpload() {
	const node = await IPFS.create();

	async function checkExists(dir) {
		try {
			await node.files.stat(dir);
			return true; }
		catch (err) { 
			return false; }
	}

	const buildExists = await checkExists(`/${buildCounter["builds"]}`);
	if(buildExists) { node.files.rm(`/${buildCounter["builds"]}`, { recursive: true }); }

	await node.files.mkdir(`/${buildCounter["builds"]}`);
	await node.files.mkdir(`/${buildCounter["builds"]}/images`);
	await node.files.mkdir(`/${buildCounter["builds"]}/metadata`);

	async function loadBuffer(directory) {
		let result = [];
		let files = await fs.readdirSync(directory);
		files.forEach(file => {
			let buffer = fs.readFileSync(`${directory}/${file}`); 
			result.push(buffer); });
		return result; }
	async function uploadFiles(type ,files, cont) {
		const fileObjectsArray = files.map((file) => { 
			const filePath = `/${type}/${file}`;
			const fileContent = cont[files.indexOf(file)];
			return { path: filePath, content: fileContent };});
		const uploaded = await all(node.addAll(fileObjectsArray, { pin: true, wrapWithDirectory: true }));
  		const directoryCID = uploaded[uploaded.length - 1].cid;
  		return all(node.ls(directoryCID)); }
	async function uploadImages() {
		const imageDirectory = await fs.readdirSync(imgDir);
		const bufferedImages = await loadBuffer(imgDir);
		console.log("_________________________________________________________________\nUploading Images... Please Wait");
		const gpArray = await uploadFiles("images", imageDirectory, bufferedImages);
		await fs.writeFileSync(`${buildDir}/imageDir_IPFS.json`, JSON.stringify(gpArray[0], null, 2));
		console.log(`Images Uploaded to ${gpArray[0].path}\n_________________________________________________________________`);
		return gpArray[0].path; }
	async function uploadMetadata() {
		const names = await labels();
		const bufferedMeta = await loadBuffer(metaDir);
		console.log("Uploading Metadata... Please Wait"); 
	  	const mpArray = await uploadFiles("metadata", names, bufferedMeta);
	  	await fs.writeFileSync(`${buildDir}/metadataDir_IPFS.json`, JSON.stringify(mpArray[0], null, 2));
	  	console.log(`Metadata Uploaded to ${mpArray[0].path}\n_________________________________________________________________`); 
		return mpArray[0].path; }

	const gPath = await uploadImages()
		.then(async(result) => { 
			const { generateMetadata } = require("./metadata.js");
			await generateMetadata(result); });
	
	const mPath = await uploadMetadata();

	const success = (`${gPath}` && `${mPath}` && `${gPath}` != `${mPath}`);
	return (success ? "Upload Successful" :  "Upload Failed");
}

module.exports = { uploadGenerateAndUpload };