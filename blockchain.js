const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(username, email, previousHash = ''){
        this.username = username;
        this.email = email;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.previousHash + this.username + this.email).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createFirstBlock()];
    }

    createFirstBlock(){
        return new Block("firstUsername", "firstEmail", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValidChain(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let user = new Blockchain();
user.addBlock(new Block("user1", "user1@gmail.com"));
user.addBlock(new Block("user2", "user2@gmail.com"));
user.addBlock(new Block("user3", "user3@gmail.com"));
user.addBlock(new Block("user4", "user4@gmail.com"));
user.addBlock(new Block("user5", "user5@gmail.com"));

// try to change the value of 1st user...
// user.chain[1].username = "anotherUser";

console.log(JSON.stringify(user, null, 2))
console.log('Is blockchain valid?: ' + user.isValidChain());