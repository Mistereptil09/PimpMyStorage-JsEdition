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

    console.log('POST data:', data);

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        parent_category_id: parseInt(data.parent_category_id, 10), 
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

    console.log('PUT data:', data);

    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        parent_category_id: parseInt(data.parent_category_id, 10), 
      },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    console.log("DELETE request received:", request.url);

    // Parse the URL to get the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      console.error("Missing ID in DELETE request");
      return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
    }

    // Convert the ID to an integer and validate it
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      console.error("Invalid ID provided:", id);
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    console.log("Parsed ID:", parsedId);

    // Check if the category exists before deleting
    const categoryToDelete = await prisma.category.findUnique({
      where: { id: parsedId },
    });

    if (!categoryToDelete) {
      console.error("No category found with ID:", parsedId);
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    console.log("Category to delete:", categoryToDelete);

    // Delete the category
    const deletedCategory = await prisma.category.delete({
      where: { id: parsedId },
    });

    console.log("Deleted category:", deletedCategory);

    return NextResponse.json(
      { message: "Category deleted successfully", deletedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
