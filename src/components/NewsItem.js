import React from "react";

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, publishedAt, source} = props;
    return (
      <div>
        <div className="card my-3 mx-4">
          <img src={!imageUrl ? "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" : imageUrl} className="card-img-top" alt="..." height={225} />
          <div className="card-body">
            {/* <h5 className="card-title">{title ? title.slice(0, 45) + (title.length <= 45 ? "" : "...") : ""}</h5> */}
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {/* {description ? description.slice(0, 100) + (description.length <= 100 ? "" : "...") : ""} */}
              {description}
              <span className="badge rounded-pill text-bg-info mx-2">{source}</span>
            </p>
            <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(publishedAt).toUTCString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
