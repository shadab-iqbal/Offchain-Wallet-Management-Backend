// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IStablecoin.sol";

contract ReserveManagement {
    address private admin;

    // Native ERC20 variables
    mapping(address => uint256) public nativeTokenBalances;

    // External ERC20 variables
    // TokenAddress => (WalletAddress => Balance)
    mapping(address => mapping(address => uint256)) public erc20TokenBalances;

    // External ERC721 variables
    // TokenAddress => (TokenId => WalletAddress)
    mapping(address => mapping(uint256 => address)) public erc721TokenBalances;

    // External ERC1155 variables
    // TokenAddress => (TokenId => (WalletAddress => Balance))
    mapping(address => mapping(uint256 => mapping(address => uint256))) public erc1155TokenBalances;

    modifier amountMoreThanZero(uint256 amount) {
        require(amount > 0, "Amount must be greater than 0");
        _;
    }

    modifier adminOnly() {
        require(msg.sender == admin, "You are not authorized to perform this action!");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    function mintStableCoin(
        address stableCoinAddress,
        address userAddress,
        uint256 amount
    ) external adminOnly {
        IStablecoin stablecoinObject = IStablecoin(stableCoinAddress);
        stablecoinObject.mint(amount);
        nativeTokenBalances[userAddress] += amount;
    }

    function burnStableCoin(
        address stableCoinAddress,
        address userAddress,
        uint256 amount
    ) external adminOnly {
        IStablecoin stablecoinObject = IStablecoin(stableCoinAddress);
        stablecoinObject.burn(amount);
        nativeTokenBalances[userAddress] -= amount;
    }

    // the 3 receive functions below
    function erc20Receive(address tokenAddress, address userAddress, uint256 amount) external {
        erc20TokenBalances[tokenAddress][userAddress] += amount;
    }

    function erc721Receive(address tokenAddress, uint256 tokenId, address userAddress) external {
        erc721TokenBalances[tokenAddress][tokenId] = userAddress;
    }

    function erc1155Receive(
        address tokenAddress,
        uint256 tokenId,
        address userAddress,
        uint256 amount
    ) external {
        erc1155TokenBalances[tokenAddress][tokenId][userAddress] += amount;
    }

    // the 3 transfer functions below
    function erc20Transfer(address tokenAddress, address to, uint256 amount) public {
        erc20TokenBalances[tokenAddress][msg.sender] -= amount;
        erc20TokenBalances[tokenAddress][to] += amount;
    }

    function erc721Transfer(address tokenAddress, address to, uint256 tokenId) public {
        erc721TokenBalances[tokenAddress][tokenId] = to;
    }

    function erc1155Transfer(
        address tokenAddress,
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) public {
        erc1155TokenBalances[tokenAddress][tokenId][msg.sender] -= amount;
        erc1155TokenBalances[tokenAddress][tokenId][to] += amount;
    }
}
