import { IArticle } from "../articles/types";
import { IUser } from "../auth/types";
import { IMeta } from "../commonType";

export interface IComment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user?: IUser,
  article?: IArticle;
}

export interface ICommentData {
  data : IComment[];
  meta: IMeta;
}

export interface ICommentState {
  comments: ICommentData;
  comment:  IComment;
  loading:  boolean;
  error:    string | null;
  loadingUpdate: boolean;
}

export interface ICommentPayload {
  documentId?: string;
  article: string | number;
  content: string;
}