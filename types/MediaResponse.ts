import { Media, Thumbnail } from "@prisma/client";

type MediaResponse = { thumbnails: Thumbnail[]; bookmarkId?: string } & Media;

export default MediaResponse;
