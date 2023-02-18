const { ethers } = require("hardhat");

async function main() {

  const metadata = "ipfs://QmUw4AMqkJimfWczLXUSgXbLAruLzVKbCr4oygy9nrmw1V"
  
  const LW3PunkContract = await ethers.getContractFactory("LW3Punks");

  const deployedLW3PunksContract = await LW3PunkContract.deploy(metadata);

  await deployedLW3PunksContract.deployed()

  console.log("Address of LW3Punks Contract is ", deployedLW3PunksContract.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
