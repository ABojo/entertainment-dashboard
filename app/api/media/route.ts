import { NextRequest, NextResponse } from "next/server";
import db from "../../../utils/db";
import { Thumbnail } from "@prisma/client";
import { addAdminGuard } from "../../../utils/guards";
import { getCurrentUser } from "../../../utils/auth";

interface QueryCondition {
  title?: { contains: string; mode: "insensitive" };
  category?: string;
}

export const POST = addAdminGuard(async function (req: NextRequest) {
  const { title, year, category, rating, isTrending, thumbnail } = await req.json();

  if (!title || !year || !category || !rating || isTrending === undefined || !thumbnail.regular) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "You must provide a title, year, category, rating, trending status, and regular thumbnail to create new media.",
      },
      { status: 422 }
    );
  }

  const thumbnailData: Omit<Omit<Thumbnail, "mediaId">, "id">[] = [
    {
      type: "REGULAR",
      small: thumbnail.regular.small,
      medium: thumbnail.regular.medium,
      large: thumbnail.regular.large,
    },
  ];

  if (thumbnail.trending) {
    thumbnailData.push({
      type: "TRENDING",
      small: thumbnail.trending.small,
      medium: thumbnail.trending.medium,
      large: thumbnail.trending.large,
    });
  }

  const newMedia = await db.media.create({
    data: {
      title,
      year,
      category,
      rating,
      isTrending,
      thumbnails: {
        create: thumbnailData,
      },
    },
  });

  return NextResponse.json({ status: "success", data: newMedia });
});

export const GET = async function (req: NextRequest) {
  //get the currently logged in user
  const currentUser = await getCurrentUser(req);

  const { searchParams } = new URL(req.url);

  //pull query parameters
  const category = searchParams.get("category");
  const title = searchParams.get("title");

  const conditions: QueryCondition = {};

  //assemble the condition that will be used to fetch media
  if (title) conditions.title = { contains: title, mode: "insensitive" };

  if (category === "movie") conditions.category = "Movie";
  if (category === "tv") conditions.category = "TV Series";

  //pull in the media that satisfies the conditions
  //get thumbnails associated with the media and bookmark associated with the media and currently logged in user
  const mediaData = await db.media.findMany({
    where: conditions,
    include: {
      thumbnails: true,
      bookmarks: {
        where: {
          userId: currentUser?.id,
        },
      },
    },
  });

  //format the bookmark data before sending to client
  const mediaForUser = mediaData.map((media) => {
    return { ...media, bookmarks: undefined, bookmarkId: media.bookmarks[0]?.id || null };
  });

  return NextResponse.json({ status: "success", data: mediaForUser });
};
