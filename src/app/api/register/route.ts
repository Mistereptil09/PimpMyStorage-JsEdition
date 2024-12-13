import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('body:', body);
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { email, password } = body;
    console.log('email:', email, "\npassword:", password);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log('existingUser:', existingUser);

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('hashedPassword', hashedPassword);

    // Create the new user
    let user = null;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          roles: JSON.stringify(['user']), // Ensure this is a valid JSON array
        },
      });

      console.log('user:', user);
      return NextResponse.json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during user creation:', error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
      console.log('Disconnected from database');
      console.log('user :', user);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}