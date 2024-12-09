import { IUser } from "../auth/types";
import { ICategory } from "../category/types";
import { IComment } from "../comment/types";
import { IMeta } from "../commonType";

export interface IArticle {
  id:              number;
  documentId:      string;
  title:           string;
  description:     string;
  cover_image_url: string;
  createdAt:       string;
  updatedAt:       string;
  publishedAt:     string;
  locale:          null;
  comments?: IComment[];
  category?: ICategory;
  user?: IUser;
}

export interface IArticleData {
  data : IArticle[];
  meta: IMeta;
}

export interface IArticleDataDetail {
  data : IArticle;
  meta?: IMeta;
}

export interface IArticleState {
  articles: IArticleData;
  article:  IArticleDataDetail;
  loading:  boolean;
  error:    string | null;
}

export interface IArticlePayload {
  data: File;
  documentId?:      string;
  title:           string;
  description:     string;
  cover_image_url?: string;
  image?: (File | undefined)[];
  category:        string | number;
}

export interface IUploadImage {
  file: File;
}