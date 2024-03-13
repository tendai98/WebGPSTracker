if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js')
;

var firebaseConfig = {

	"apiKey" : "API_KEY",
	"appId" : "APP_ID",
	"authDomain" : "AUTH_DOMAIN",
	"projectId" : "PROJECT_ID",

};

if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}
