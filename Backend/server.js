import express from "express";
import { connectToBD } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";   
import cors from "cors";


dotenv.config();


const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));

//port
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
   
    res.send("Hello Subcribe to Our channel");
});

app.post("/api/signup", async (req, res) => {

    const {firstName, lastName, email, username, password } = req.body;

     // console.log(Firstname, Lastname, email, username, password);

    // to check if all fields are provided (try-catch block)
    try {
        if (!firstName || !lastName || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email already exists in the database
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // save the user to the database
        const userDoc = await User.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });


        // JWT token generation can be added here for authentication

        if (userDoc) {
           const token = jwt.sign(
                {id: userDoc._id}, process.env.JWT_SECRET, {expiresIn: "7d"}
            ); 

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set secure flag in production
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            
        }

        return res
        .status(200)
        .json({ user: userDoc, message: "User registered successfully" });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(400).json({ message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;   
    try {
        if (!username || !password) {
           return res.status(400).json({ message: "Invalid Login details" });
        }

        // Check if the email exists in the database
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
           return res.status(400).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compareSync(password, userDoc.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token for authentication
        const token = jwt.sign(
            { id: userDoc._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // Set the token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res
            .status(200)
            .json({ user: userDoc, message: "Login successful" });

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(400).json({ message: "Server error" });
    }

});

 // Fetch user details based on the JWT token
app.get("/api/fetch-user", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token and extract user ID
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userDoc = await User.findById(decoded.id).select("-password"); // Exclude password field

        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: userDoc });

    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
});

// Logout route to clear the authentication cookie
app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
});


app.listen(PORT, () => {
    connectToBD();
    console.log(`Server is running on http://localhost:${PORT}`);
})