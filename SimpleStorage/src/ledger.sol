// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Ledger{
    uint256 amtDeposited1;
     
     struct ledger{
        string name;
        uint256 time;
        uint256 amtDeposited_;
        uint256 history_;
     }
     
      event Deposit(address indexed user,uint256 amount,uint256 time);
     
    struct User{
        string username;
        uint256 time; 
        uint256 amtDeposited_; 
        bool registered;
    }
    mapping(address => User) public users;
    ledger[]public list;
    
    function registerUser(string memory _username) public {
        User storage newUser = users[msg.sender];
        newUser.username=_username;
        newUser.time=block.timestamp;
        newUser.registered=true;
    }
    
    function deposit(uint256 _amtDeposited)public payable{
       require(msg.value > 0, "Deposit must be > 0");
        User storage user = users[msg.sender];
        require(user.registered, "User not registered");
        amtDeposited1 = msg.value;
        user.amtDeposited_ += msg.value;

        list.push(ledger(user.username,block.timestamp,msg.value,user.amtDeposited_));

     emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    function getLedgerLength() public view returns (uint256) {
        return list.length;
    }

}