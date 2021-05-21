import { SHA3 } from "crypto-js";

class Block {
  index: number;
  timestamp: string;
  data: { payer: string; receiver: string; amount: number };
  prevHash: string;
  hash: string;
  nonce: number;
  constructor(
    index: number,
    timestamp: string,
    data: { payer: string; receiver: string; amount: number },
    prevHash: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    // data = {payer, receiver, amount}
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
    this.nonce = 0;
  }
  proofOfWork(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }

  getHash() {
    return SHA3(
      this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.prevHash +
        this.nonce,
      { outputLength: 256 }
    ).toString();
  }
}

class BlockChain {
  chain: Block[];
  difficulty: number;
  constructor() {
    this.chain = [this.getRoot()];
    // Change this difficulty in order to make adding new blocks difficult
    this.difficulty = 2;
  }
  getRoot() {
    return new Block(
      0,
      "1/1/2000",
      { payer: "admin", receiver: "John Doe", amount: 1 },
      "root"
    );
  }
  getLatest() {
    return this.chain[this.chain.length - 1];
  }
  add(block: Block) {
    block.prevHash = this.getLatest().hash;
    //block.hash = block.getHash();
    block.proofOfWork(this.difficulty);
    this.chain.push(block);
  }
  checkValidity() {
    const n = this.chain.length;
    for (let len = 1; len < n; len++) {
      const curBlock = this.chain[len - 1];
      const prevBlock = this.chain[len - 2];
      if (curBlock.getHash() !== curBlock.hash) {
        return false;
      }
      if (curBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// Main

const myBlockChain = new BlockChain();
console.log("Bitcoin mining...");
const myblock = new Block(
  1,
  "20.12.2020",
  { payer: "John", receiver: "Jane", amount: 90000 },
  ""
);
myBlockChain.add(myblock);
console.log(JSON.stringify(myBlockChain, null, 2));
