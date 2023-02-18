// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LW3Punks is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string _baseTokenURI;

    uint256 public _price = 0.1 ether;

    bool public _paused;

    uint256 public maxTokenIds = 10;

    uint256 public tokenIds;

    constructor(string memory baseURI) ERC721("LW3Punks", "LW3P"){
        _baseTokenURI = baseURI;
    }

    modifier onlyWhenNotPaused {
        require(!_paused, "Contract currently paused");
        _;
    }

    function mint() public payable onlyWhenNotPaused{
        require(tokenIds < maxTokenIds, "Exceed maximum LW3P supply");
        require(msg.value >= _price, "Ether sent is incorrect");
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    function _baseURI() internal view virtual override returns(string memory){
        return _baseTokenURI;
    }

    function setPause(bool val) public onlyOwner{
        _paused = val;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send ether");
    }
    
    receive() external payable {}
    fallback() external payable {}
}
