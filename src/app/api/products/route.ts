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
    console.log('POST data:', data);

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
    console.error('POST error:', error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    console.log('PUT data:', data);

    const updatedProduct = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    console.log("DELETE request received:", request.url);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      console.error("Missing ID in DELETE request");
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      console.error("Invalid ID provided:", id);
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    console.log("Parsed ID:", parsedId);

    const productToDelete = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!productToDelete) {
      console.error("No product found with ID:", parsedId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: parsedId },
    });

    console.log("Deleted product:", deletedProduct);

    return NextResponse.json(
      { message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}



