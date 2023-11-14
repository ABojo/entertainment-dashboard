import { NextRequest, NextResponse } from "next/server";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/auth";

interface ParamProps {
  params: { id: string };
}

export const GET = async function (req: NextRequest, { params }: ParamProps) {
  const currentUser = await getCurrentUser(req);

  const mediaData = await db.media.findFirst({
    where: {
      id: params.id,
    },
    include: {
      thumbnails: true,
      bookmarks: {
        where: {
          userId: currentUser!.id,
        },
      },
    },
  });

  if (!mediaData) {
    return NextResponse.json({ status: "error", message: "That media ID does not exist." });
  }

  return NextResponse.json({
    status: "success",
    data: {
      ...mediaData,
      bookmarks: undefined,
      bookmarkId: mediaData.bookmarks.length ? mediaData.bookmarks[0].id : null,
    },
  });
};
