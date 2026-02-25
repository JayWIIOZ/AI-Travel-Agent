import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import db from "@/db";
import { itineraryNotes } from "@/db/schema/collection";
import type { GeneratedItinerary } from "@/types/itinerary";

/** GET: 获取已保存的行程笔记列表（用于收藏页卡片） */
export async function GET() {
  try {
    const rows = await db
      .select({
        id: itineraryNotes.id,
        title: itineraryNotes.title,
        overview: itineraryNotes.overview,
        payload: itineraryNotes.payload,
        createdAt: itineraryNotes.createdAt,
      })
      .from(itineraryNotes)
      .orderBy(desc(itineraryNotes.createdAt));
    return NextResponse.json(rows);
  } catch (e) {
    console.error("GET /api/collection", e);
    return NextResponse.json(
      { error: "获取收藏列表失败" },
      { status: 500 }
    );
  }
}

/** POST: 保存当前行程笔记到收藏（并写入数据库） */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GeneratedItinerary;
    const title = body?.title?.trim() || "未命名行程";
    const overview =
      typeof body?.overview === "string" ? body.overview : "";
    const payload = body ?? {
      title,
      overview,
      days: [],
      highlights: undefined,
    };

    const [inserted] = await db
      .insert(itineraryNotes)
      .values({
        title,
        overview,
        payload,
      })
      .returning({ id: itineraryNotes.id, createdAt: itineraryNotes.createdAt });

    if (!inserted) {
      return NextResponse.json(
        { error: "保存失败" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      id: inserted.id,
      createdAt: inserted.createdAt,
    });
  } catch (e) {
    console.error("POST /api/collection", e);
    return NextResponse.json(
      { error: "保存笔记失败" },
      { status: 500 }
    );
  }
}
