// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NetflixSmartContract {
 struct subscriberProfile {
     string name;
     uint256 amount;
     string email;
 }

 uint256 subscriptionCost = 1e17;
 
  subscriberProfile[100] public profiles;
 
 function subscribe(
    string memory name, 
    address payable netflix,
    uint32 subscriptionIndex, 
    string memory email
 ) external payable {

    subscriberProfile memory profile = subscriberProfile(name, msg.value, email);
    profiles[subscriptionIndex] = profile;
    netflix.transfer(msg.value);
 }
}
