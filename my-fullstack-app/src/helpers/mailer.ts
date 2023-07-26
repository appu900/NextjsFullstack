import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        varifyToken: hashedToken,
        varifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPassword: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d72b6b4e289017",
        pass: "28713225c0a27c",
      },
    });

    //! send email code -------------------------

    const mailOptions = {
      from: "appudq670@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html: `<p> Click <a href="${
        process.env.domain
      }/varifyToken?token=${hashedToken}">here</a> to
        ${
          emailtype === "VERIFY" ? "verify your email" : "reset your Password"
        }
        or copy paste the link in browser. <br> ${process.env.domain}/varifyToken=${hashedToken}
        </p>
        `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
