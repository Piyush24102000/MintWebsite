// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract robopunk is ERC721,Ownable{
    uint public mintPrice;
    uint public totalSupply;
    uint public maxSupply;
    uint public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri; //Url of nft located
    address payable public withdrawWallet;
    mapping(address => uint) public walletMints;

    constructor() payable ERC721("RoboPunks","RP"){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        ///Set withdraw wallet here;
    }
    function setIsPublicMintEnbaled(bool _isPublicMintEnabled) external onlyOwner{
        isPublicMintEnabled = _isPublicMintEnabled;
    }
    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }
    function tokenURI(uint _tokenId) public view override returns(string memory){
        require(_exists(_tokenId),"Token doesn't exists");
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_tokenId),".json"));
    }
    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{value:address(this).balance }('');
        require(success,'withdraw failed');
    }
    function mint(uint _quantity) public payable{
        require(isPublicMintEnabled,'Minting not started');
        require(msg.value == _quantity * mintPrice,"wrong mint value");
        require(totalSupply + _quantity <= maxSupply,"Sold Out");
        require(walletMints[msg.sender] + _quantity <= maxPerWallet,"excedded max per wallet");
      
        for(uint i = 0 ;i<_quantity;i++){
            uint newTokenId = totalSupply + 1;
            totalSupply++; //effect
            _safeMint(msg.sender, newTokenId); //interract
        }
    }

}