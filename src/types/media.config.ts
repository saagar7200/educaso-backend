import { MediaType } from "../constants/global";

export type MediaConfig = {
  maxFileSize: number;
  supportedExtensions: string[];
};

const MediaConfigurations: { [key in MediaType]: MediaConfig } = {
  [MediaType.PROFILE_IMAGE]: {
    maxFileSize: 5 * 1024 * 1024, // *10MB
    supportedExtensions: ["jpg", "jpeg", "png"],
  },
  [MediaType.ARTICLE_IMAGE]: {
    maxFileSize: 10 * 1024 * 1024, // *10MB
    supportedExtensions: ["jpg", "jpeg", "png", "pdf"],
  },
};

export default MediaConfigurations;
