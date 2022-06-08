[MonoBlockchain](https://github.com/safesploit/MonoBlockchain)

# MonoBlockchain



<p align="center">
    <img alt="MonoBlockchain-Preview" src="#">
</p>

# Features

- Immutable ledger
- Distributed P2P network
- Proof of Work
  - SHA256
- Consensus protocol
- API
- Easy to use transaction system

[Markdown TOC](https://luciopaiva.com/markdown-toc/)
# Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Python Imports](#python-imports)
- [Design Choices](#design-choices)
- [Preview Images](#preview-images)
- [Preview Video](#preview-video)

https://toc.git.safesploit.com/
# Setup and Usage

## Python Imports

    pip install Crypto

# Programming Logic

## Proof of Work

MonoBlockchain is based on Proof of Work (PoW), _explanation_.

## Hashing Algorithm

PoW relies on SHA256 due to requiring:
  - One-way function
  - Deterministic
  - Fast computation
  - The avalanche effect
  - Must withstand collisions (SHA-256 has 2<sup>256</sup> combinations)

## Immutable Ledger

The idea of an immutable ledger is to ensure the previous hash is linked cryptographically to the last block. Which then can be traversed back to the genesis (initial) block.

<p align="center">
  <img width="640" alt="Immutable Ledger Example" src="https://user-images.githubusercontent.com/10171446/172579310-c11ca268-f185-4560-8b89-5388aa17dabb.png">
  </br>
  <b>Immputable Ledger</b>
</p>

If _block 2_ were to be maliciously altered, the previous hash on _block 3_ would reflect this alteration. As the hash of _block 2_ would not be equal to the previous hash of _block 3_.

## Distributed P2P

### explanation

Distributed peer-to-peer (P2P) network ensures the network hosting the blockchain ledger is not centralised located. 

<p align="center">
  <img width="575" alt="image" src="https://user-images.githubusercontent.com/10171446/172582471-6d101052-4e95-4482-b3f8-6c6bd120bf1e.png">
  </br>
  <b>Distributed P2P Network: Showing Computers (Servers) as Nodes</b>
</p>

Having a decentralised network provides several benefits:
  - More nodes in the network
  - Potentially faster as not relying on a single node
  - More secure as the ledger has no single point of failure


<p align="center">
  <img width="681" alt="Distributed P2P Network Showing Blocks" src="https://user-images.githubusercontent.com/10171446/172584273-9f9cdf41-b5d2-4727-b232-eebe8802473c.png">
  </br>
  <b>Distributed P2P Network Showing Blocks</b>
</p>

### Attacking Distributed P2P Network

Because of the immutable ledger, the attack must modify earlier blocks to reflect the hash change. Which requires a great deal of processing power as the SHA-256 algorithm is computationally demanding.

The attack vector of computing forged blocks is demonstrated below:

<p align="center">
  <img width="682" alt="Distributed P2P Network Being Attacked" src="https://user-images.githubusercontent.com/10171446/172584901-121923b0-2890-41ad-8f0f-d78d8d447461.png">
  </br>
  <b>Distributed P2P Network Being Attacked</b>
</p>

However, for the example above, seven nodes maintain an independent version of the ledger. Moreover, while the attacker has successfully modify blocks and forged the ledger cryptographically to reflect an action which did not take place. However, the attack did this for a single node. Hence, the attacker only makes up 14% of the distributed P2P network. For the attacker to successfully perform their attack, they must control 51% or more of the network's nodes. 

See, [51% attack](https://www.investopedia.com/terms/1/51-attack.asp#:~:text=A%2051%25%20attack%20is%20an,other%20miners%20from%20completing%20blocks.).

## Mining



<p align="center">
  
  </br>
  <b>Mining</b>
</p>

## Consensus Protocol

<p align="center">
  
  </br>
  <b></b>
</p>

# Preview Images

# Preview Video
