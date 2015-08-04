contract ScrapBook {

	struct Identity {
		address identityAddress;
		uint registrationTimestamp;
		Charity identityCharity;
		bool exists;
		uint latestEntryTimestamp;
		mapping (uint => Entry) entries;
		mapping (address => Identity) parents;
	}

	struct Charity {
		bytes16 charityName;
		bytes16 storeName;
		bytes32 baseUrl;
		bool exists;
	}

	struct Entry {
		bytes32 hashValue;
		bytes32 comment;
		uint previousEntryTimestamp;
	}

	mapping (address => Identity) identities; 
	mapping (bytes16 => Charity) charities;
	address public owner;

	modifier isAdmin { if (owner == msg.sender) _ }
	function ScrapBook() { owner = msg.sender; }

	function registerCharity(bytes16 charityName, bytes16 storeName, bytes32 baseUrl) isAdmin public returns (bool) {
		Charity c = charities[charityName];
		if (c.exists) {
			return false;
		}
		c.storeName = storeName;
		c.baseUrl = baseUrl;
		return true;
	}

	function registerIdentity(bytes16 charityName) public returns (bool) {
		Identity i = identities[msg.sender];
		Charity c = charities[charityName];
		// check and see if user not already registered and store is known
		if (i.exists || !c.exists) {
			return false;
		}
		i.registrationTimestamp = now;
		i.identityCharity = c;
		i.exists = true;
		return true;
	}

	function registerChild(address childAddress) public returns (bool) {
		Identity p = identities[msg.sender];
		Identity c = identities[childAddress];
		// check and see if parent and child are already registered 
		if (!p.exists || c.exists) {
			return false;
		} 
		c.parents[msg.sender] = p;
		return true;
	}

	function createScrapBookEntry(bytes32 hashValue, bytes32 comment) public returns (bool) {
		Identity i = identities[msg.sender];
		if (!i.exists) {
			return false;
		}
		uint nowTimeStamp = now;
		Entry next = i.entries[nowTimeStamp];
		next.previousEntryTimestamp = i.latestEntryTimestamp;
		next.hashValue = hashValue;
		next.comment = comment;
		i.latestEntryTimestamp = nowTimeStamp;
	}
}