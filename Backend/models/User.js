import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    
    lastName: {
        type: String,
        required: true,
    },

    

    email: {
        type: String,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
   
   /*
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    }, {
    timestamps: true,
})
*/

});

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;