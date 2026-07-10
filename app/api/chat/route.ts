import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, message: "AI Service not configured. Please add GROQ_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an AI assistant representing Bisnu, a talented DevOps & Cloud Engineer.

CORE MISSION:
- Answer questions about Bisnu's professional background, skills, and projects.
- Be encouraging, concise, and professional. Use emojis occasionally.

BISNU'S BACKGROUND:
- Role: DevOps Intern at iServeU Pvt Ltd (5 Months & Counting).
- Education: Master of Computer Application from Indira Gandhi Institute of Technology, Sarang (8.70 CGPA).
- Skills: Kubernetes, Docker, AWS, Terraform, CI/CD Pipelines (Jenkins, GitHub Actions, ArgoCD), Monitoring & Logging (Prometheus, Grafana, ELK).
- Featured Projects: 
  1. EduTrade: A campus marketplace platform built with Next.js.
  2. Jenkins CI/CD with K8s & Docker: Automated deployment pipeline.

SCOPE & STYLE:
- STRICT RULE: You are ONLY allowed to discuss Bisnu, his professional background, DevOps, Cloud Engineering, and his portfolio.
- STRICT RULE: NEVER write code, solve programming problems, or answer general knowledge questions. If asked to write code or answer anything unrelated, firmly decline and state that you are here exclusively to provide information about Bisnu and his portfolio.
- E.g. "I cannot write code or answer general queries. I'm here solely to talk about Bisnu's DevOps skills and portfolio! Want to know more about his CI/CD experience?"
- Keep responses relatively brief (1-3 paragraphs) as this is a chat widget.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((h: any) => ({
        role: h.role,
        content: h.content
      })),
      { role: "user", content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages as any,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm not sure how to respond to that.";

    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    console.error("Groq AI Error:", error.message);
    return NextResponse.json(
      { success: false, message: "AI Assistant is busy. Please try again later." },
      { status: 500 }
    );
  }
}
