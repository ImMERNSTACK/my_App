const users=require("../model/userSchema");
const userOtp=require("../model/userOtp");
const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhartiaman542@gmail.com',  
    pass: 'ptrt evrs owsk krut'
  }
});


exports.userRegister=async(req,res)=>{
    const {fname,email,password}=req.body;
    if(!fname || !email || !password){
        res.status(400).json({error:"Please Enter All input data"})
    }

    try{
      const preuser = await users.findOne({email:email});
      if(preuser){
        res.status(400).json({error:"Usr already exit in database"});
      }else{
        const userRegister = new users({
            fname,email,password
        })

        const storeData = await userRegister.save();
        res.status(200).json(storeData);
      }
    }catch(error){
        res.status(400).json({error:"Invaid details"});
    }
}

// user send Otp
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const preuser = await users.findOne({ email });
    if (!preuser) {
      return res.status(400).json({ error: "User does not exist in our DB" });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    let existEmail = await userOtp.findOne({ email });

    if (existEmail) {
      await userOtp.findByIdAndUpdate(
        { _id: existEmail._id },
        { otp: OTP },
        { new: true }
      );
    } else {
      await new userOtp({ email, otp: OTP }).save();
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending Email For OTP Validation",
      text: `OTP - ${OTP}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: " + error);
        return res.status(400).json({ error: "Email not sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Invalid Details" });
  }
};

exports.userLogin=async(req,res)=>{
    const {email,otp}=req.body;
    if(!otp || !email){
      res.status(400).json({error:"Please Enter Your Otp and Email"})
    }
    try {
      const otpverification= await userOtp.findOne({email:email});
      if(otpverification.otp === otp){
         const preuser = await users.findOne({email:email});
         const token = await preuser.generateAuthToken();
         console.log('token', token)
         res.status(200).json({message:"User Login successfully",userToken:token});
      }else{
        res.status(400).json({error:"Invalid Otp"});
      }
    } catch (error) {
      res.status(400).json({error:"Invalid details ",error});
    }
}