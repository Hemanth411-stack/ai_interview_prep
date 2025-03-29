
import connectDB from "../../../Mongoosedb/db";

import User from "../../../models/auth.js"
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, type } = await request.json();

    if (type === 'sign-up') {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
          status: 400,
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return new Response(JSON.stringify(newUser), { status: 201 });
    } else {
      // Sign-in logic
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401,
        });
      }

      return new Response(JSON.stringify(user), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}