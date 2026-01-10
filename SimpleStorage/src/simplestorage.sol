//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract simpleStorage {
uint256 private  store;
function set(uint256 newstore) public{
store=newstore;

}
function get()public view returns(uint256){
    return store;

}
}
