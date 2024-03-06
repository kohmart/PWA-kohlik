const router = require("express").Router();
const User = require("../Models/User");

//login user
router.post("/login", async(req,res)=>{
    try {
        const{email,password} = req.body;
        const user = await User.findByCredentials(email, password);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = router
