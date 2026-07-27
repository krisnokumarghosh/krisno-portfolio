import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactEmail from "@/components/email/contact-template";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // production e nijer domain
      to: process.env.MY_EMAIL!,
      replyTo: email, // reply dile sorasori recruiter er email e jabe
      subject: `New message from ${name}`,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
