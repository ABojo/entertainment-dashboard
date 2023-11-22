import { NextResponse } from "next/server";
import db from "../../../../utils/db";
import { addAuthGuard } from "../../../../utils/guards";

interface ConfigProps {
  params: { id: string };
}

export const GET = addAuthGuard(async function (req, currentUser, config?: ConfigProps) {
  const mediaData = await db.media.findFirst({
    where: {
      id: config?.params.id,
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
});
