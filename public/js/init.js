if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js')
;

var firebaseConfig = {

	"apiKey" : "AIzaSyB0NY4Q7L1Xf4VtpmH5xkfMXDhPrODPivg",
	"appId" : "1:849272530588:web:2bf5bdc9ed399e2dffef59",
	"authDomain" : "gpstrackingapi.firebaseapp.com",
	"projectId" : "gpstrackingapi",

};

if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}
