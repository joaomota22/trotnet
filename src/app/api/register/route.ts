import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Campos obrigatórios" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email já cadastrado" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "Usuário criado com sucesso" },
    { status: 201 }
  );
}