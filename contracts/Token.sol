//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

contract Token {

    string public name = "HH Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 1000;

    address public owner;


    mapping(address => uint256) balances;


    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

     function transfer(address _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Not enough balance!");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
     }

     function balanceOf(address _account) external view returns(uint256) {
        return balances[_account];
     }
}