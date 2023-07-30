// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface IStablecoin {
    function mint(uint256 amount) external;

    function burn(uint256 amount) external;
}
