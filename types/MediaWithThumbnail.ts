import { Media, Thumbnail } from "@prisma/client";

type MediaWithThumbnail = { thumbnails: Thumbnail[] } & Media;

export default MediaWithThumbnail;
