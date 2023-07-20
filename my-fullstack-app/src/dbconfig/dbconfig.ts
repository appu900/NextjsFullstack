import mongoose from 'mongoose'
export async function connect(){
    try{
       mongoose.connect(process.env.mongo_url!)
       const connection = mongoose.connection;

       connection.on('connected',()=>{
        console.log("mongo db connected sucessfully")
       })

       connection.on('error',(err)=>{
        console.log("there is some error in connecting the database - " + err)
        process.exit();
       })
    }
    catch(error){
        console.log('something went wrong')
        console.log(error)
    }
}