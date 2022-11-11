const express = require("express");
const router = express.Router();
const users = require("../models/usersSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user -- POST method
router.post("/register", async(req,res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,position,address,description} = req.body;

    if(!name || !email || !age || !mobile || !position || !address || !description){
        res.status(422).json("all fields are required");
    }

    try {
        // preuser 
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("User already exists!");
        }else{
            const adduser = new users({
                name,email,age,mobile,position,address,description
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})



// get userdata -- GET method
router.get("/getdata", async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user -- GET mehtod
router.get("/getuser/:id", async(req,res)=> {
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data - PATCH method
router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user - DELETE method
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})


module.exports = router;