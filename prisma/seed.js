import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const saltRounds = 10;
  const password1 = await bcrypt.hash(process.env.VENDOR_PASSWORD_1, saltRounds);
  const password2 = await bcrypt.hash(process.env.VENDOR_PASSWORD_2, saltRounds);
  const password3 = await bcrypt.hash(process.env.VENDOR_PASSWORD_3, saltRounds);

  // Define dummy image URLs (using placeholder services)
  const dummyImages = {
    jollofRice: 'https://placehold.co/600x400/orange/white?text=Jollof+Rice',
    friedRice: 'https://placehold.co/600x400/yellow/black?text=Fried+Rice',
    chocolateCake: 'https://placehold.co/600x400/brown/white?text=Chocolate+Cake',
    pepperoniPizza: 'https://placehold.co/600x400/red/white?text=Pepperoni+Pizza',
    vegetablePizza: 'https://placehold.co/600x400/green/white?text=Vegetable+Pizza',
    cheesecake: 'https://placehold.co/600x400/beige/black?text=Cheesecake',
    classicBurger: 'https://placehold.co/600x400/brown/white?text=Classic+Burger',
    chickenBurger: 'https://placehold.co/600x400/tan/black?text=Chicken+Burger',
    iceCream: 'https://placehold.co/600x400/white/black?text=Ice+Cream+Sundae',
  };

  // Use transaction for all database operations
  await prisma.$transaction(async prismaTransaction => {
    // Create vendors
    const vendor1 = await prismaTransaction.vendor.create({
      data: {
        name: 'Delight Kitchens',
        address: '12 Okeafa Road, Isolo',
        phone: '08132030908',
        email: 'delight@gmail.com',
        password: password1,
      },
    });

    const vendor2 = await prismaTransaction.vendor.create({
      data: {
        name: 'Pizza Place',
        address: '42 Sijuawade Street, Ijesha',
        phone: '08198755412',
        email: 'pizza@gmail.com',
        password: password2,
      },
    });

    const vendor3 = await prismaTransaction.vendor.create({
      data: {
        name: 'Burger Bros',
        address: '7 Bun Ave',
        phone: '08122334455',
        email: 'burger@gmail.com',
        password: password3,
      },
    });

    // Create categories
    const category1 = await prismaTransaction.category.create({
      data: {
        name: 'Main Dishes',
        vendorId: vendor1.id,
      },
    });

    const category2 = await prismaTransaction.category.create({
      data: {
        name: 'Fast Food',
        vendorId: vendor2.id,
      },
    });

    const category3 = await prismaTransaction.category.create({
      data: {
        name: 'Desserts',
        vendorId: vendor3.id,
      },
    });

    // Create menu items using createMany for better efficiency
    await prismaTransaction.menuItem.createMany({
      data: [
        // Delight Kitchens items
        {
          name: 'Jollof Rice',
          description: 'Spicy rice dish with vegetables and spices',
          price: 1500,
          image: dummyImages.jollofRice,
          vendorId: vendor1.id,
          categoryId: category1.id,
        },
        {
          name: 'Fried Rice',
          description: 'Delicious rice with mixed vegetables and protein',
          price: 1700,
          image: dummyImages.friedRice,
          vendorId: vendor1.id,
          categoryId: category1.id,
        },
        {
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with frosting',
          price: 2500,
          image: dummyImages.chocolateCake,
          vendorId: vendor1.id,
          categoryId: category3.id,
        },

        // Pizza Place items
        {
          name: 'Pepperoni Pizza',
          description: 'Classic pizza with pepperoni toppings',
          price: 3500,
          image: dummyImages.pepperoniPizza,
          vendorId: vendor2.id,
          categoryId: category2.id,
        },
        {
          name: 'Vegetable Pizza',
          description: 'Healthy pizza loaded with fresh vegetables',
          price: 3200,
          image: dummyImages.vegetablePizza,
          vendorId: vendor2.id,
          categoryId: category2.id,
        },
        {
          name: 'Cheesecake',
          description: 'Creamy cheesecake with berry topping',
          price: 2800,
          image: dummyImages.cheesecake,
          vendorId: vendor2.id,
          categoryId: category3.id,
        },

        // Burger Bros items
        {
          name: 'Classic Burger',
          description: 'Beef patty with lettuce, tomato, and special sauce',
          price: 2000,
          image: dummyImages.classicBurger,
          vendorId: vendor3.id,
          categoryId: category2.id,
        },
        {
          name: 'Chicken Burger',
          description: 'Grilled chicken with fresh toppings',
          price: 1800,
          image: dummyImages.chickenBurger,
          vendorId: vendor3.id,
          categoryId: category2.id,
        },
        {
          name: 'Ice Cream Sundae',
          description: 'Vanilla ice cream with chocolate sauce and nuts',
          price: 1200,
          image: dummyImages.iceCream,
          vendorId: vendor3.id,
          categoryId: category3.id,
        },
      ],
    });
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
