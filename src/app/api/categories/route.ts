import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, parent_category_id: true },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data || typeof data !== 'object') {
      throw new TypeError('The "payload" argument must be of type object. Received null');
    }

    // Log the payload value
    console.log('POST data:', data);

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        parent_category_id: parseInt(data.parent_category_id, 10), // Ensure parent_category_id is an integer
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data || typeof data !== 'object') {
      throw new TypeError('The "payload" argument must be of type object. Received null');
    }

    // Log the payload value
    console.log('PUT data:', data);

    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        parent_category_id: parseInt(data.parent_category_id, 10), // Ensure parent_category_id is an integer
      },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}