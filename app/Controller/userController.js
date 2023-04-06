const UserModel=require("../Models/userModel")


exports.getAll= (req,res)=>{
    UserModel.find({})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(505).send({message:err.message});
    })
}



exports.create= async(req,res)=>{
    const {title}=req.body;
    let videosPaths=[];
    console.log(req.files.videos);
    if(Array.isArray(req.files.videos) && req.files.videos.length>0){
       for(let video of req.files.videos){
        videosPaths.push("/" + video.path);
       }
    }
    try{
        const createMedia=await UserModel.create({
            title,
            videos:videosPaths
        })
        res.json({message:"video is uploaded successfully", createMedia });
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
}