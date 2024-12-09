import qs from 'qs';

export const getNewsParams = (search: string = '', page: number = 1) => {
  const params = {
    populate: '*',
    sort: 'publishedAt:desc',
    pagination: {
      page: page,
      pageSize: 6
    },
    filters: search ? {
      title: {
        $containsi: search
      }
    } : undefined
  };
  return qs.stringify(params);
};

export const getCommentsParamsByArticle = (articleId: number | string, page: number = 1) => {
  const params = {
    populate: {
      user: '*',
    },
    pagination: {
      page: page,
      pageSize: 100
    },
    filters: {
      article: {
        id: {
          $eq: articleId
        }
      }
    }
  };
  return qs.stringify(params);
};

export const getCommentsParamsByUsers = (userdId: number | string, page: number = 1) => {
  const params = {
    populate: {
      article: '*'
    },
    pagination: {
      page: page,
      pageSize: 10
    },
    filters: {
      user: {
        id: {
          $eq: userdId
        }
      }
    },
    sort: 'publishedAt:desc'
  };
  return qs.stringify(params);
}

export const truncateTitle = (title: string, maxLength: number): string => {
  return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
};