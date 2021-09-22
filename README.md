# auto-art (WIP)
Generate art with all combinations of template assets that you provide.
REQUIRES NODE JS

# Installation
```sh
git clone "https://github.com/ctnava/auto-art.git"
npm install
```
# Configuration
![](https://github.com/ctnava/auto-art/blob/main/blob/traits.PNG)

Place your assets into the traits folder, divided into smaller folders prefixed with "x_" as seen in the picture.
The program will place layers in that order. Each folder's name is recognized as an attribute trait type and each file's name is recognized as the value.

```js
{
	"name": "_name",
	"description": "_description",
	"external_url": "_additionalInfo", 
	"background_color": "_background_color"
}
```
Edit base.json in the traits folder.
changing the base name is pointless and gets overwritten anyway.
description should be the name of the NFT series.
external_url and background_color can be set to "" if you would like to omit these.

# Output
Successful build runs will have the following output.

```sh 
PS C:\Users\<THIS USER>\<PATH TO>\auto-art> npm run build

> ez_nft@1.0.0 build C:\Users\<THIS USER>\<PATH TO>\auto-art
> node index.js

_________________________________________________________________

Build Directories Initialized
C:\Users\<THIS USER>\<PATH TO>\auto-art/build/6
C:\Users\<THIS USER>\<PATH TO>\auto-art/build/6/metadata
C:\Users\<THIS USER>\<PATH TO>\auto-art/build/6/images
_________________________________________________________________

Theoretical Collection Size: 648
All Possible Attribute Combinations Generated
All Possible Value Combinations Generated
Generating 648 Unique Collectibles...
_________________________________________________________________
Generating Images... Please Wait
Images Generated
_________________________________________________________________
Swarm listening on /ip4/XXX.0.0.XXX/tcp/PORT/p2p/<HASH>
Swarm listening on /ip4/XXX.XXX.XXX.XXX/tcp/PORT/p2p/<HASH>
Swarm listening on /ip4/127.0.0.1/tcp/PORT/p2p/<HASH>
Swarm listening on /ip4/127.0.0.1/tcp/PORT/ws/p2p/<HASH>
_________________________________________________________________
Uploading Images... Please Wait
Images Uploaded to <CID>/images
_________________________________________________________________
Assigning Rarity Scores... Please Wait
Rarity Scores Assigned
Generating Metadata... Please Wait
Metadata Written to C:\Users\<THIS USER>\<PATH TO>\auto-art/build/6/metadata
_________________________________________________________________
Uploading Metadata... Please Wait
Metadata Uploaded to <CID>/metadata
_________________________________________________________________
Upload Successful
overwriting ./src/build.json
```

check your build folder for IPFS objects that hold your CID if you forget to note them or wish to summon them in another program.

![](https://github.com/ctnava/auto-art/blob/main/blob/ipfs.PNG)
![](https://github.com/ctnava/auto-art/blob/main/blob/sampleImages.PNG)
