// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Ledger.sol";

contract ledgerTest is Test{
    Ledger ledger;
     
     address alice=address(0xA11CE);
     address bob=address(0xB0B);

function setUp()public {
    ledger=new Ledger();

}
function test_Register() public{
    vm.prank(alice);
    ledger.register("Alice");
    (string memory username,bool registered)=ledger.user(alice);
    assertEq(username,"Alice");
    assertTrue(registered);
}
function test_Deposit() public{
    vm.prank(alice);
    ledger.register("Alice");
     
     vm.prank(alice);
     ledger.deposit{value:1 ether}();
     (uint256 amtDeposited_,bool registered)=ledger.user("alice");
    assertTrue(registered);
    assertEd(amtDeposited_,1 ether);
    assertEq(ledger.getLedgerLength(),1);
}
function testRevert_Deposit_notRegistered() public {
    vm.prank(bob);
    vm.expectRevert(bytes("User not registered"));
    ledger.deposit{value:1 ether}();

}
function testRevert_Deposit_ifethiszero() public{
    vm.prank(alice);
    ledger.registerUser("Alice");
    vm.prank(alice);
    vm.expectRevert(bytes("Deposit must be more than zero "));
    ledger.deposit{value:0 ether}();
}

}