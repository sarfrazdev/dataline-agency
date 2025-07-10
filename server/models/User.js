 import mongoose from 'mongoose'
 import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 100,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
       
    },
    role: {
        type: String,
        enum: [
            'enduser',
            'reseller',
            'distributor',
            'enduser-admin',
            'reseller-admin',
            'distributor-admin',
            'superadmin'
        ],
        default: 'enduser',
    },
    // For Reseller & Distributor
    firmName: {
        type: String,
        trim: true,
        maxlength: 150,
    },
    constitutionOfFirm: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    gstNumber: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    panNumber: {
        type: String,
        trim: true,
        maxlength: 20,
    },
    uniqueId: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    officeAddress: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    residenceAddress: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    mobile: {
        type: String,
        trim: true,
        maxlength: 15,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
resetOtp: {
  type: String,
  default: null,
},
resetOtpExpireAt: {
  type: Date,
  default: null,
},

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    }
});



//hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.matchPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


 export default mongoose.model('User', userSchema);

