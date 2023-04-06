const UserController=require("../Controller/userController")
const multer=require("multer")
const fs=require("fs");
const path=require("path")
const express = require("express");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        if(!fs.existsSync("public")){
            fs.mkdirSync("public")
        }
        if(!fs.existsSync("public/videos")){
            fs.mkdirSync("public/videos")
        }
        cb(null,"public/videos");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    },
});

const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        var ext=path.extname(file.originalname);
        if(ext !== ".mkv" && ext !==".mp4"){
            return cb(new Error("Only mkv and mp4 videos are allowedl!"));
        }

    cb(null, true);
    }
})

module.exports=app=>{
    app.get("/api/user", UserController.getAll);
    app.post("/api/create", upload.fields([
        {
          name: "videos",
          maxCount: 5,
        },
      ]), 
      UserController.create);
}