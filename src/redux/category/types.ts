import { IMeta } from "../commonType";

export interface ICategory {
  id:              number;
  documentId:      string;
  name:            string;
  description:     string | null;
  createdAt:       string;
  updatedAt:       string;
  publishedAt:     string;
  locale:          null;
}

export interface ICategoryData {
  data : ICategory[];
  meta: IMeta;
}

export interface ICategoryDataDetail {
  data : ICategory;
  meta?: IMeta;
}

export interface ICategoryState {
  categories: ICategoryData;
  category:  ICategoryDataDetail;
  loading:  boolean;
  error:    string | null;
}

export interface ICategoryPayload {
  documentId?: string;
  name:        string;
  description: string;
}