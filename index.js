"use strict";
exports.__esModule = true;
var crypto_js_1 = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        // data = {payer, receiver, amount}
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.getHash();
        this.nonce = 0;
    }
    Block.prototype.proofOfWork = function (difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.getHash();
        }
    };
    Block.prototype.getHash = function () {
        return crypto_js_1.SHA3(this.index +
            this.timestamp +
            JSON.stringify(this.data) +
            this.prevHash +
            this.nonce, { outputLength: 256 }).toString();
    };
    return Block;
}());
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.chain = [this.getRoot()];
        // Change this difficulty in order to make adding new blocks difficult
        this.difficulty = 2;
    }
    BlockChain.prototype.getRoot = function () {
        return new Block(0, "1/1/2000", { payer: "admin", receiver: "John Doe", amount: 1 }, "root");
    };
    BlockChain.prototype.getLatest = function () {
        return this.chain[this.chain.length - 1];
    };
    BlockChain.prototype.add = function (block) {
        block.prevHash = this.getLatest().hash;
        //block.hash = block.getHash();
        block.proofOfWork(this.difficulty);
        this.chain.push(block);
    };
    BlockChain.prototype.checkValidity = function () {
        var n = this.chain.length;
        for (var len = 1; len < n; len++) {
            var curBlock = this.chain[len - 1];
            var prevBlock = this.chain[len - 2];
            if (curBlock.getHash() !== curBlock.hash) {
                return false;
            }
            if (curBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    };
    return BlockChain;
}());
// Main
var myBlockChain = new BlockChain();
console.log("Bitcoin mining...");
var myblock = new Block(1, "20.12.2020", { payer: "John", receiver: "Jane", amount: 90000 }, "");
myBlockChain.add(myblock);
console.log(JSON.stringify(myBlockChain, null, 2));
