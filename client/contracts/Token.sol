//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import 'hardhat/console.sol';

contract Token {
  string public name = 'Nader Dabit Token';
  string public symbol = 'NDT';
  uint256 public totalSupply = 1000000;

  // const balances = { adress: uint256 }
  mapping(address => uint256) balances;

  constructor() {
    // The balance of the deployer gets the total supply.
    balances[msg.sender] = totalSupply;
  }

  function transfer(address to, uint256 amount) external {
    // Require that the sender has enough Tokens - if not - code returns.
    require(balances[msg.sender] >= amount, 'Not enough tokens');
    // Subtract from sender
    balances[msg.sender] -= amount;
    // Add to reciever
    balances[to] += amount;
  }

  // Returns the balance of an account
  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
}
