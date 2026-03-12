import { NextRequest, NextResponse } from "next/server";

// Basit authentication - Production'da JWT ve database kullanılmalı
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@tsremlak.com",
  password: process.env.ADMIN_PASSWORD || "TSR2026.1",
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Basit token (Production'da JWT kullanın)
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

      return NextResponse.json({
        success: true,
        token,
        user: { email, name: "Admin" },
      });
    } else {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}


















