import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchArticles } from "../../redux/articles/action";
import { useEffect } from "react";
import Header from "../../components/Header";
import BarChart from "../../components/Charts/Barchart";
import PieChart from "../../components/Charts/Piechart";
import CardDasboard from "../../components/CardDashboard";

const DashboardPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { articles } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles('populate=*'));
  }, [dispatch]);

  // Extract data for charts
  const categories = articles.data.map(item => item.category ? item.category.name : 'Uncategorized');
  const commentsCount = articles.data.map(item => item.comments ? item.comments.length : 0);
  const titles = articles.data.map(item => item.title);
  
  // Calculate category counts
  const categoryCounts = categories.reduce((acc: { [key: string]: number }, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1
          className="text-2xl font-bold text-primary-dark text-center my-4"
        >
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardDasboard
            title="Total articles" 
            value={articles.meta.pagination.total} 
          />
          <CardDasboard
            title="Total comments" 
            value={commentsCount.reduce((acc, curr) => acc + curr, 0)} 
          />
          <CardDasboard 
            title="Most commented article" 
            value={titles[commentsCount.indexOf(Math.max(...commentsCount))]} 
          />
        </div>
        <div
          className="container mx-auto p-4"
        >
          <div className="mb-4">
            <BarChart 
              titlesBar={titles} 
              data={commentsCount}
              seriesName="Comments"
              titleChart="Comments per Article"
            />
          </div>
          <div>
            <PieChart 
              data={categoryCounts}
              titleChart="Articles per Category"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage