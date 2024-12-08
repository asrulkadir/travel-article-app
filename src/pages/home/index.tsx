import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createArticle, fetchArticles, updateArticle } from '../../redux/articles/action';
import dayjs from 'dayjs';
import { getNewsParams } from '../../utils/helpers';
import { IArticle, IArticlePayload } from '../../redux/articles/types';
import Search from '../../components/Search';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '../../components/Button';
import ModalArticle from '../../components/ModalArticle';
import ArticleCard from '../../components/ArticleCard';
import Layout from '../../components/Layout';

dayjs.extend(relativeTime);

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles } = useSelector((state: RootState) => state.articles);
  const { authData } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = !!authData.jwt;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loadedArticles, setLoadedArticles] = useState<IArticle[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [initialArticle, setInitialArticle] = useState<IArticle>();

  useEffect(() => {
    dispatch(fetchArticles(getNewsParams(search, page)));
  }, [dispatch, search, page]);

  useEffect(() => {
    if (page === 1) {
      setLoadedArticles(articles.data);
    } else {
      setLoadedArticles((prevArticles) => {
        const newArticles = articles.data.filter(article => 
          !prevArticles.some(prevArticle => prevArticle.id === article.id)
        );
        return [...prevArticles, ...newArticles];
      });
    }
  }, [articles.data, page]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = Math.round(document.documentElement.scrollTop);
      const offsetHeight = Math.round(document.documentElement.offsetHeight);
      if (windowHeight + scrollTop < offsetHeight) return;
      if (articles.meta.pagination.pageCount === page) return;
      setPage((prevPage) => prevPage + 1);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articles.meta.pagination.pageCount, page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    dispatch(fetchArticles(getNewsParams(search, 1)));
  }

  const handleClear = () => {
    setSearch('');
    setPage(1); // Reset to first page on clear
    dispatch(fetchArticles(getNewsParams('', 1)));
  }

  const handleSave = async (data: IArticlePayload): Promise<void> => {
    if (initialArticle) {
      const res = await dispatch(updateArticle({ article: data, id: initialArticle.documentId }));
      if (res.meta.requestStatus === 'fulfilled') {
        setShowModal(false);
      }
    } else {
      const res = await dispatch(createArticle({ article: data, params: getNewsParams(search, 1) }));
      setPage(1); // Reset to first page on new article
      if (res.meta.requestStatus === 'fulfilled') {
        setShowModal(false);
      }
    }
  }

  return (
    <Layout>
      <div className='p-2 lg:p-5'>
        <div
          className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 sticky top-8 md:top-16 lg:top-12 p-2 lg:p-5'
        >
          {isAuthenticated && 
            <Button
              title='Add Article'
              className='w-full sm:w-32'
              onClick={() => {
                setShowModal(true);
                setInitialArticle(undefined);
              }}
            />
          }
          <Search
            onSearch={setSearch}
            search={search}
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className='p-2 lg:p-5'>
          {loadedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isAuthenticated={isAuthenticated}
              authData={authData}
            />
          ))}
        </div>
        <ModalArticle
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialData={initialArticle}
        />
      </div>
    </Layout>
  )
}

export default Home