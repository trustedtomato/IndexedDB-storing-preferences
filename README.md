# IndexedDB preference storing
Simplified preference storing

## Install
From NPM:

	npm install indexeddb-preference-storing --save

Or download the index.js file.

## Usage
Firstly, request opening the database with plain IndexedDB.

	const dbOpenRequest = indexedDB.open('test-preference-storing');```

Then send that to storePreferences.
It returns a Promise, which resolves when the database is opened.
The resolve function has one parameter,
what can be used to set & get preferences.

	storePreferences(dbOpenRequest).then(preferences => {/* set & get preferences */});

- Setting preference: ```preferences.set('preferenceName','preferenceValue')```
- Getting preference: ```preferences.get('preferenceName')``` -
returns a Promise what resolves when it successfully gets the preference.
The value of the preference is in the first parameter.
If the preference doesn't exist, it's value is ```undefined```. 

An example can be found in example.html.

**Warning: the library uses the ```prefrences``` object store in the requested database.** 