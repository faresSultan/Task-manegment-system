const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post("/auth/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ email: email });
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        if (existingEmail) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be at least 4 characters." });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password should be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error." });
    }
});

router.post("/auth/login", async(req,res)=>{
    try{
        const { username } = req.body;
        const existingUser = await User.findOne({username : username});
        if(!existingUser){
            return res.status(400).json({message : "Username or password are incorrect"})
        }
        const { password } = req.body;

        if (password) {
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Server error while comparing passwords." });
                }
        
                if (result) {
                    const authClaims = {
                        name: username
                    };
        
                    const token = jwt.sign(authClaims, process.env.secret_key , { expiresIn: "2d" });
                    return res.status(200).json({
                        message: "Authentication successful",
                        token: token,
                        id: existingUser._id
                    });
                } else {
                    return res.status(400).json({ message: "Username or password is incorrect" });
                }
            });
        } else {
            return res.status(400).json({ message: "Password is required" });
        }
        


    } catch(err){
        console.log(err);
        return res.status(500).json({message : "Server error."})
    }
});

module.exports = router;
