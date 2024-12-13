import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stockMovements = await prisma.stock_movement.findMany({
      include: {
        stock_movement_has_product: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(stockMovements);
  } catch (error) {
    console.error("Error fetching stock movements:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const changes = await request.json();
  
      const totalQuantity = changes.reduce(
        (sum, change) => (change.action === "Add" ? sum + change.value : sum - change.value),
        0
      );
      const movementType = totalQuantity > 0 ? "In" : "Out";
  
      const stockMovement = await prisma.stock_movement.create({
        data: {
          quantity: totalQuantity,
          date: new Date(),
          reason: "Inventory Update",
          movement_type: movementType,
          user_id: null,
        },
      });
  
      const updatedProducts = await Promise.all(
        changes.map(async ({ id, action, value }: { id: number; action: string; value: number }) => {
          const product = await prisma.product.findUnique({ where: { id } });
          if (!product) {
            throw new Error(`Product with ID ${id} not found`);
          }
  
          let newQuantity = product.quantity;
          if (action === "Add") {
            newQuantity += value;
          } else if (action === "Subtract") {
            newQuantity = Math.max(0, newQuantity - value);
          }
  
          await prisma.stock_movement_has_product.create({
            data: {
              product_id: id,
              stock_movement_id: stockMovement.id,
            },
          });
  
          return prisma.product.update({
            where: { id },
            data: { quantity: newQuantity },
          });
        })
      );
  
      return NextResponse.json(updatedProducts);
    } catch (error) {
      console.error("Error saving stock movement:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }