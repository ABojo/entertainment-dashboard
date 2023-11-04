import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../utils/auth";
import db from "../../../utils/db";

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser(req);

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: currentUser!.id,
    },
    include: {
      media: true,
    },
  });

  const bookmarkArray = bookmarks.map((bookmark) => bookmark.media);

  return NextResponse.json({ status: "success", data: bookmarkArray });
}

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser(req);

  if (!currentUser)
    return NextResponse.json({
      status: "error",
      message: "Please login again.",
    });

  const json = await req.json();

  const selectedMedia = await db.media.findFirst({
    where: {
      id: json.mediaId,
    },
  });

  if (!selectedMedia)
    return NextResponse.json({
      status: "error",
      message: "We could not find that media. Make sure you entered the correct Media ID.",
    });

  const currentBookmark = await db.bookmark.findFirst({
    where: {
      mediaId: selectedMedia.id,
      userId: currentUser.id,
    },
  });

  if (currentBookmark)
    return NextResponse.json({ status: "error", message: "You already have this media bookmarked!" });

  const newBookmark = await db.bookmark.create({
    data: {
      userId: currentUser.id,
      mediaId: selectedMedia.id,
    },
  });

  return NextResponse.json({ status: "success", data: newBookmark });
}

export async function DELETE(req: NextRequest) {
  const currentUser = await getCurrentUser(req);

  if (!currentUser)
    return NextResponse.json({
      status: "error",
      message: "Please login again.",
    });

  const json = await req.json();

  if (!json.bookmarkId) return NextResponse.json({ status: "error", message: "You must provide a bookmarkId" });

  const bookmark = await db.bookmark.delete({
    where: {
      id: json.bookmarkId,
      userId: currentUser.id,
    },
  });

  if (!bookmark) return NextResponse.json({ status: "error", message: "That bookmark doesn't exist!" });

  return NextResponse.json({ status: "success", data: { bookmark } });
}
