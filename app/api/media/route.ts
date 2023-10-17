import { NextRequest, NextResponse } from "next/server";
import db from "../../../utils/db";
import { Thumbnail } from "@prisma/client";
import { addAdminGuard } from "../../../utils/guards";

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
  const mediaData = await db.media.findMany({
    include: { thumbnails: true },
  });

  return NextResponse.json({ status: "success", data: mediaData });
};
