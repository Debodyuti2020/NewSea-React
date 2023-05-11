import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(15);
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=62ed83a02ce04a6890f6fa4c1b35b6fc&page=${pageNo}&pageSize=${props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url); // It returns a promise
    let persedData = await data.json();
    props.setProgress(70);
    setArticles(persedData.articles);
    setTotalResults(persedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.pageTitle)} | NewsSea - Get your daily dose of news for free!`
    updateNews();
    // eslint-disable-next-line
  }, [])

//   const handlePrevClick = async() => {
//     setPage(page - 1);
//     updateNews();
//   }
//   const handleNextClick = async() => {
//     setPage(page - 1);
//     updateNews();
//   }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url); // It returns a promise
    let persedData = await data.json();
    setArticles(articles.concat(persedData.articles));
    setTotalResults(persedData.totalResults);
    setLoading(false);
  };

    return (
      <>
        {/* <div className='container my-3'> */}
        <h1 className='text-center' style={{margin: "20px 0px", marginTop: "90px"}}>NewsSea - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner />}
        >
          <div className="container">
          <div className="row">
            {/* {!loading && articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
                )
              })} */}
            {articles.map((element, index) => {
              return (
                // <div className="col-md-4" key={element.url}>
                <div className="col-md-4" key={index}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
              )
            })}
          </div>             
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-end">
          <button disabled={page<=1} type="button" className="btn btn-dark mx-1" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / 21)} type="button" className="btn btn-dark mx-1" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}

        {/* <div className="d-flex mb-3">
          <div className="me-auto p-2">
            <button disabled type="button" className="btn btn-outline-secondary">Page {page}</button> 
          </div>
          <div className="p-2">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          </div>
          <div className="p-2">
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div>
        </div> */}
      {/* </div> */}
      </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News