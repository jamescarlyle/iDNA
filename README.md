# Genesis Block - Solving the global identity initiation problem

## Use case
75% of the world's population can not conduct transactions on the internet currently. Many of these people are in countries lacking the governnment infrastructure to provide the identity at birth due to most of the children being born outside the confines of a hospital or other government recognised medical facility. We believe that this problem can be solved by creating a "personal scrapbook" as a persistent container for a progression of identifying activities that, over time, would serve as a trusted basis for trust.

* Birthdate
* Picture
* Thumbprint
* DNA
* Weight
# Height

## Solution
With a simple web interface or even better, a mobile phone application capable of capturing a photo, a voice recording, a thumbprint, GPS co-ordinates, finger vein pattern and a few agreed upon data fields such as Given Name, Date of Birth, Place of Birth can be hashed together to create a key which is then committed to the (a?) blockchain. 
Over time, this person can continue to add information to their "scrapbook" by adding information to their own personal git repo and committing the changes, then pushing them to a peer-to-peer filesystem (like ipfs.io) the commit hash can be combined with some meta data and committed to a blockchain for permanence and immutability.

## Components
This solution will seek to build on existing open source efforts for a number of components:

1.  Distributed Version Control - [Git](https://github.com/git/git)  
2.  Blockchain - [Ethereum](https://github.com/ethereum)  
3.  Peer-to-Peer (P2P) file storage - [IPFS](https://github.com/ipfs/ipfs)  
4.  Decentralised Passport - [World Citizenship](https://github.com/MrChrisJ/World-Citizenship)
5.  Facial recognition - [open Biometrics](https://github.com/biometrics/openbr)
6.  Finger vein recognition - [TBD]

