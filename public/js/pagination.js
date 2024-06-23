//const express=require('express')
//const app=express()
const express=require('express');
const session=require('express-session');
const app=express();

app.use(session({
    //secret is used to sign id cookie
secret:'some secret',
//means it will expire after 3000 sec
cookie:{maxAge:3000},
//if we made it true kol ma n3mel refresh it will initialize new session id 
//bnkhleha b true lama el user y login 
saveUninitialized:'false';


}))








const mongoose=require('mongoose')
const Propirty=require("../models/propirty.models.js")
mongoose.connect('mongodb://localhost/nameofdb', {useNewUrlParser: true, useUnifiedTopology:true })
const db=mongoose.connection
db.once('open',asyn()=>{
    //means if we have properties in our db will return
    if(await Propirty.countDocuments().exec()>0) return

Promise.all([

]).then(()=>console.log('Added'))


})



//app.listen(3000)      


app.get('/users',paginatedResults(Propirty),(req,res)=>{
    
    res.json( res.paginatedResults)
})
function paginatedResults(model){
    return (req,res,next)=>{
        const page=parseInt(req.query.page)
        const limit=parseInt(req.query.limit)
    // -1 because index of array
        const startIndex=(page-1) * limit
        const endIndex= page * limit
        const results={}
     if(endIndex<model.length){
        results.next={
            page:page+1,//the next page
            limit:limit
           }
    }
    if(startIndex>0){
        results.next={
            page:page-1,
            limit:limit
        }
    }
        
        //gives everything between the two indexes
        results.results =model.slice(startIndex,endIndex)

        res.paginatedResults=results
        next()
    }
}






