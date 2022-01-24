// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

struct Contact {
    string name;
    string surname;
    string phone;
    string email;
}

contract Contacts {
    mapping(address => Contact[]) public addressBookList;

    constructor() {}

    function getContacts(address owner) public view returns (Contact[] memory) {
        return addressBookList[owner];
    }

    function getLength(address owner) public view returns (uint256) {
        return addressBookList[owner].length;
    }

    function createContact(
        string memory _name,
        string memory _surname,
        string memory _phone,
        string memory _email,
        address owner
    ) public {
       addressBookList[owner].push(Contact(_name, _surname, _phone, _email));        
    }

    function removeContact(uint256 _id, address owner) public {
        Contact[] storage contacts = addressBookList[owner];
        require(_id < contacts.length, "index out of bound");

        for (uint256 i = _id; i < contacts.length - 1; i++) {
            contacts[i] = contacts[i + 1];
        }

        contacts.pop();
    }
}
