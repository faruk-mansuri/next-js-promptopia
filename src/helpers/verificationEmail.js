import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendVerificationEmail = async ({ email, emailType, userId }) => {
  try {
    // create verification Token
    const verificationToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        {
          verifiedToken: btoa(verificationToken),
          verifiedTokenExpiry: new Date(Date.now() + 6000 * 60 * 5), // 5 minutes token expiry
        }
        // { new: true, runValidators: true }
      );
    } else if (emailType === 'RESET_PASSWORD') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: btoa(verificationToken),
        forgotPasswordTokenExpiry: new Date(Date.now() + 6000 * 60 * 30), // 30 minutes token expiry
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testingnodejs7@gmail.com',
        pass: 'teezexdecbnopaan',
      },
    });

    const url = emailType === 'VERIFY' ? 'verifyEmail' : 'reset-password';
    // compose email message
    const mailOptions = {
      from: 'faruk13@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      // btoa(verificationToken)
      html: `
        <p>
        Click <a href="https://auth-next-js.netlify.app/${url}?token=${btoa(
        verificationToken
      )}" >here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      }
      </p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
