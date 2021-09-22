const console = require("console");
const fs = require("fs");

if (!process.env.PWD) {process.env.PWD = process.cwd();}
const { allBuildsDir } = require("./src/directories.js");

const base = (id) => { return {"builds": id}; };

(async () => { 
	if(fs.existsSync("../../.././.jsipfs")) { 
    	await fs.rmdirSync("../../.././.jsipfs", {recursive: true}); 
    	console.log(".jsipfs removed"); }

    if(fs.existsSync(allBuildsDir)) { 
    	await fs.rmdirSync(allBuildsDir, {recursive: true}); 
    	console.log("builds deleted"); } 

    if(fs.existsSync("./src/build.json")) { 
        await fs.rmSync("./src/build.json"); 
        console.log("build.json deleted"); } 

    const baseBuild = await base(1);
    await fs.writeFileSync("./src/build.json", JSON.stringify(baseBuild, null, 2), function writeJSON(err) { if (err) { return console.log(err); } }); 
    console.log(JSON.stringify(baseBuild));
    console.log('overwriting ' + "./src/build.json");
})();
