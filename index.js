const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")
const app=express();
const mongoose=require("mongoose")
const path=require("path")


mongoose.connect(process.env.database)
const db=mongoose.connection;

db.on("open",()=>{
    console.log("connected to db")
})
db.on("error",()=>{
    console.log("dis-conneted") 
})
app.use(cors({
    origin:'*'
}))

app.use(bodyparser.json())

require("./app/Routes/userRoute")(app)
app.use("/public", express.static(path.join(__dirname, "public")));



const port=8000;
console.log(path.join(__dirname, "public") )
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})
