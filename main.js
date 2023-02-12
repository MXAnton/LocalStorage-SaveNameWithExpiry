const savedNameText = document.querySelector(".saved-name");
const newNameInput = document.querySelector("#name");


loadSavedName();
function loadSavedName() {
    let _newName = 'No name saved';
    // localStorage.getItem('name');
    if (getWithExpiry('name')) {
        _newName = getWithExpiry('name');
    }

    // Set text to new name
    savedNameText.innerText = _newName;
}


function saveName(e) {
    let _newName = newNameInput.value;
    _newName = _newName.trim();


    // Save _newName to localStorage
    // localStorage.setItem('name', _newName);
    setWithExpiry('name', _newName, 3000);


    // Set text to new name
    savedNameText.innerText = _newName;
}


function setWithExpiry(key, value, ttl) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}
