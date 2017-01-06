window.storePreferences = (function(){
	'use strict';

	const storePreferences = indexedDBRequest => new Promise((resolve,reject) => {

		indexedDBRequest.addEventListener('upgradeneeded', e => {
			const db = e.target.result;
			const dataObjectStore = db.createObjectStore('preferences',{keyPath: 'name'});
			dataObjectStore.createIndex('name','name',{unique: true});
			log('Database upgraded!');
		});

		indexedDBRequest.addEventListener('success', e => {
			const db = e.target.result;
			
			resolve({
				get: (dataName) =>
					new Promise((resolve) => {
						const transaction = db.transaction(['preferences'],'readonly');
						const store = transaction.objectStore('preferences');
						const index = store.index('name');
						const gettingData = index.get(dataName);
						gettingData.onsuccess = function(e){
							const result = e.target.result;
							resolve(result ? result.value : undefined);
						};
					}),
				set: (dataName,dataValue) =>
					new Promise((resolve) => {
						const transaction = db.transaction(['preferences'],'readwrite');
						const store = transaction.objectStore('preferences');
						const puttingData = store.put({
							name: dataName,
							value: dataValue
						});
						puttingData.onsuccess = function(){
							resolve();
						};
					})
			});
		});
	});

	const log = text => {
		if(storePreferences.debug) console.log(text); 
	};

	storePreferences.debug = false;

	return storePreferences;
}());