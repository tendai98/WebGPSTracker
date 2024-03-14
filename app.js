const express = require('express')
const firebase = require('firebase')
const config = require('./config')
const auth = require('./auth')

const port = process.env.PORT
const fb = firebase.initializeApp(config)
let authed = false

function getTimestamp(){
	return Math.floor(new Date())
}

function authSystem(){
	fb.auth().signInWithEmailAndPassword(auth.email, auth.password).then( e => {
		authed = true
	}).finally( e => {} )
}

function authLogic(req, res) {

    let ref = fb.database().ref("Logins")
    let successfulLoginsRef = ref.child("ValidLogins")
    let failedLoginsRef = ref.child("InvalidLogins")


    fb.auth().signInWithEmailAndPassword(req.query.email, req.query.password)
        .then(userCredential => {

	    let target = successfulLoginsRef.child(getTimestamp())
	    target.set({user:`${req.query.email}`, entity:"SYSTEM-USER", status:"Logged In", errorCode: 200})
            res.send({ message: "Logged In", code: 200 });
        })
        .catch(error => {

	    let target = failedLoginsRef.child(getTimestamp())
	    target.set({user:`${req.query.email}`, entity:"UNKNOWN-USER", status:"Access Denied", errorCode: 404})
            res.send({ message: "Access Denied", code: 403 });
        });
}


function gps(req, res){
	try{
		let ref = fb.database().ref(req.query.id)
		let target = ref.child(req.query.target)

		target.on("value", data => {
			res.json(data.val())
		})
	}catch(e){
			res.json({code:-1})
	}
}

function api(req, res){
	try{
		if(!authed){
			authSystem()
		}

		let data = req.query

		let id = req.query.id
		let ref = fb.database().ref(id)
		let logRef = fb.database().ref("TrackerLog").child(id)
		let timestamp = getTimestamp()
		delete data.id

		data.timestamp = timestamp

		let lt = parseFloat(data.lt)
		let ln = parseFloat(data.ln)

		if(lt != 0){
			ref.child("currentTrackerData").set(data)
			logRef.child(timestamp.toString()).set(data)
		}

		res.send("DATA RECV")
	}catch(e){
		console.log(e)
		res.end()
	}
}


app = express()
app.use(express.static("public"))
app.get("/api", api)
app.get("/gps", gps)
app.get("/auth", authLogic)

authSystem()

app.listen(port, () => {
	console.log(`[SERVER-ONLINE] ::${port}`);
})
