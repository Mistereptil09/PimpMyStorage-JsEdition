import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('POST data:', data); // Log the incoming data

    // Validate and parse the incoming data
    const parsedData = {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      quantity: parseInt(data.quantity, 10),
      category_id: parseInt(data.category_id, 10),
    };

    if (isNaN(parsedData.price) || isNaN(parsedData.quantity) || isNaN(parsedData.category_id)) {
      throw new TypeError('Invalid data types provided');
    }

    const newProduct = await prisma.product.create({
      data: parsedData,
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('POST error:', error); // Log the error details
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    console.log('PUT data:', data); // Log the incoming data

    const updatedProduct = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('PUT error:', error); // Log the error details
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}