# Blockchain Example

A simple blockchain built with typescript

## How it works

A blockchain can be considered as a chain or collection of blocks and these blocks are made of data (or transactions in the case of a cryptocurrency).
Each block has a unique hash and also a hash of prev block.  If anyone tries to change data in a block then its hash will also change. This ensures that the blockchain is not manipulated by anyone.
It's also important to prevent people from spamming blocks in the blockchain. To solve this problem,  blockchains use something called ***proof of work***.
The person wanting to add a new block to the blockchain has to perform some work to get his block merged with blockchain.  In this example, we 
make sure that the hash of a block must start with 2 or more consecutive zeros(actual blockchains use a lot more than that) to keep things simple.  
A person who generates this hash is often called a ***miner***. Miners also get some reward for doing this work(obviously not in this example😂).
