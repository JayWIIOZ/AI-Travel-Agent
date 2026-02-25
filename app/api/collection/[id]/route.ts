import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { itineraryNotes } from "@/db/schema/collection";

/** GET: 根据 id 获取单条收藏笔记详情 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [row] = await db
      .select({
        id: itineraryNotes.id,
        title: itineraryNotes.title,
        overview: itineraryNotes.overview,
        payload: itineraryNotes.payload,
        createdAt: itineraryNotes.createdAt,
      })
      .from(itineraryNotes)
      .where(eq(itineraryNotes.id, id));

    if (!row) {
      return NextResponse.json({ error: "未找到该笔记" }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (e) {
    console.error("GET /api/collection/[id]", e);
    return NextResponse.json(
      { error: "获取笔记详情失败" },
      { status: 500 }
    );
  }
}
