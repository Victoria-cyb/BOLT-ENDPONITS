// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { AuthenticationError } = require('@apollo/server');

// const resolvers = {
//   Query: {
//     me: async (_, __, { user, UserModel }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       return await UserModel.findById(user.id);
//     },
//   },
//   Mutation: {
//     signupDriver: async (_, { email, password, name, phone, licenseDetails }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'DRIVER',
//         name,
//         phone,
//         licenseDetails,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     signupCourier: async (_, { email, password, name, phone, vehicleType }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'COURIER',
//         name,
//         phone,
//         vehicleType,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     signupRestaurant: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'RESTAURANT',
//         name,
//         phone,
//         businessName,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     signupStore: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'STORE',
//         name,
//         phone,
//         businessName,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     signupFleetOwner: async (_, { email, password, name, phone, fleetDetails }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'FLEET_OWNER',
//         name,
//         phone,
//         fleetDetails,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     signupBoltBusiness: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({
//         email,
//         password: hashedPassword,
//         role: 'BOLT_BUSINESS',
//         name,
//         phone,
//         businessName,
//       });
//       await user.save();
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//     login: async (_, { email, password }, { UserModel }) => {
//       const user = await UserModel.findOne({ email });
//       if (!user) throw new AuthenticationError('Invalid email or password');
//       const valid = await bcrypt.compare(password, user.password);
//       if (!valid) throw new AuthenticationError('Invalid email or password');
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return { token, user };
//     },
//   },
// };

// module.exports = resolvers;


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { AuthenticationError } = require('apollo-server-errors');

// Debug: Log AuthenticationError to verify it's imported correctly
console.log('AuthenticationError:', AuthenticationError);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS)

const resolvers = {
  Query: {
    me: async (_, __, { user, UserModel }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      if (!UserModel) throw new Error('UserModel is not defined in context');
      return await UserModel.findById(user.id);
    },
  },
  Mutation: {
    signupDriver: async (_, { email, password, name, phone, licenseDetails }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'DRIVER',
        name,
        phone,
        licenseDetails,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    signupCourier: async (_, { email, password, name, phone, vehicleType }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'COURIER',
        name,
        phone,
        vehicleType,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    signupRestaurant: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'RESTAURANT',
        name,
        phone,
        businessName,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    signupStore: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'STORE',
        name,
        phone,
        businessName,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    signupFleetOwner: async (_, { email, password, name, phone, fleetDetails }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'FLEET_OWNER',
        name,
        phone,
        fleetDetails,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    signupBoltBusiness: async (_, { email, password, name, phone, businessName }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
        role: 'BOLT_BUSINESS',
        name,
        phone,
        businessName,
      });
      await user.save();
      console.log('Saved user:', user);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
login: async (_, { email, password }, { UserModel }) => {
  if (!UserModel) throw new Error('UserModel is not defined in context');

  const user = await UserModel.findOne({ email });
  console.log('Login attempt for email:', email);
  console.log('User found:', user);

  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.password);
  console.log('Password valid?', valid);

  if (!valid) throw new AuthenticationError('Invalid email or password');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
},
forgotPassword: async (_, { email }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing email credentials in .env');
        throw new Error('Email service not configured');
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        console.log(`No user found for email: ${email}`);
        return true; // Don't reveal if email exists for security
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      console.log(`OTP generated for ${email}: ${otp}`);

      // Set up Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify transporter
      try {
        await transporter.verify();
        console.log('SMTP connection verified');
      } catch (error) {
        console.error('SMTP verification failed:', error);
        throw new Error(`SMTP verification failed: ${error.message}`);
      }

      // Send OTP email
      const mailOptions = {
        from: `"Bolt Support" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your Bolt Password Reset OTP',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bolt Password Reset</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
              <!-- Header -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #1a73e8;">
                  <img src="https://via.placeholder.com/150x50?text=Bolt+Logo" alt="Bolt Logo" style="max-width: 150px; height: auto;">
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 30px 20px; text-align: center;">
                  <h1 style="font-size: 24px; color: #333333; margin: 0 0 20px;">Password Reset OTP</h1>
                  <p style="font-size: 16px; color: #555555; line-height: 1.5; margin: 0 0 20px;">
                    Hello ${user.name || 'User'},<br>
                    You requested a password reset for your Bolt account. Use the OTP below to reset your password:
                  </p>
                  <div style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; letter-spacing: 2px;">
                    ${otp}
                  </div>
                  <p style="font-size: 14px; color: #777777; line-height: 1.5; margin: 20px 0 0;">
                    This OTP expires in 1 hour. If you didn’t request this, please ignore this email or contact support.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 12px; color: #777777;">
                  <p style="margin: 0;">&copy; 2025 Bolt. All rights reserved.</p>
                  <p style="margin: 5px 0;">
                    <a href="mailto:support@bolt.com" style="color: #1a73e8; text-decoration: none;">Contact Support</a> | 
                    <a href="https://bolt.com/unsubscribe" style="color: #1a73e8; text-decoration: none;">Unsubscribe</a>
                  </p>
                  <p style="margin: 5px 0;">123 Bolt Street, Lagos, Nigeria</p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${user.email}`);
        return true;
      } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error(`Failed to send OTP email: ${error.message}`);
      }
    },
    resetPassword: async (_, { otp, newPassword }, { UserModel }) => {
      if (!UserModel) throw new Error('UserModel is not defined in context');
      const user = await UserModel.findOne({
        otp,
        otpExpires: { $gt: Date.now() },
      });

      if (!user) {
        console.log(`Invalid or expired OTP: ${otp}`);
        throw new AuthenticationError('Invalid or expired OTP');
      }

      // Update password
      user.password = await bcrypt.hash(newPassword, 10);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      console.log(`Password reset successful for user: ${user.email}`);
      return true;
    },
  },
};

module.exports = resolvers;