// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import "../src/simplestorage.sol";

contract deploysimplestorage is Script {
    function run() external {
        vm.startBroadcast();
        new simpleStorage();
        vm.stopBroadcast();
    }
}
