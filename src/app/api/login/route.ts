import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    // Passwords match
    return NextResponse.json({ message: 'Login successful' });
  } else {
    // Passwords do not match
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }
}