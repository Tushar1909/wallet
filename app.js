var admin = require("firebase-admin");
const express=require("express");
const app=express();

var serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

app.get("/",(req,res)=>{
    res.send("Hi");
})

app.get("/:userid/:orderid/update",async (req,res)=>{
    
    await db.collection("orders").doc(req.params.orderid).update({
        "isActive": false
    }).then(()=>{
        res.send("Success1")
    }).catch((e)=>{
        res.send(e);
    })
    await db.collection("users").doc(req.params.userid).update({
        "wallet": "500.00"
    }).then(()=>{
        console.log("Success2")
    }).catch((e)=>{
        console.log(e);
    })
})

app.get("/:userid/:orderid/:/price/:bet/:final/:token/ind",async (req,res)=>{
    
    const wall=req.params.final+((Number(req.params.price)*Number(req.params.token_price)*Number(req.params.bet*1750))/10000000)
    await db.collection("orders").doc(req.params.orderid).update({
        "isActive": false
    }).then(()=>{
        res.send("Success1")
    }).catch((e)=>{
        res.send(e);
    })
   var response= await db.collection("users").where('userId','==',req.params.userid).get();
    let data=response.data();
    let wal=Number(data["wallet"]);
    let wa=(wal+wall).toString();

    await db.collection("users").doc(req.params.userid).update({
        "wallet":  wa
    }).then(()=>{
        console.log("Success2")
    }).catch((e)=>{
        console.log(e);
    })
})

app.listen(5000,(req,res)=>{
    console.log("server started at 5000")
})