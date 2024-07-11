import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country:'in',
    pageSize:'9',
    category:'General'
  }
  static propTypes={
    country:propTypes.string,
    pageSize:propTypes.number,
    category:propTypes.string
  }

      constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.props.category} - NewsWave`;
      }

      async updateNews(){
        this.props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKEy=${this.props.apiKey}&page=${this.state.page }&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
             totalResults:parsedData.totalResults,
            loading:false,
          })
            this.props.setProgress(100);
      }

      async componentDidMount(){
       this.updateNews()
      }

      fetchMoreData = async() => {
       this.setState({page: this.state.page + 1})
       const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKEy=3b6c768ca6fb4fe9addda753008dfcdc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      
       let data= await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData);
       this.setState({articles: this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
           })
      };
    
  render() {
    return (
       <>
        <h1 className='text-center'  style={{margin:'35px   0px', marginTop:'90px'}}>NewsWave -Top {this.props.category} Headlines </h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element,index)=>{
            return  <div className="col-md-4" key={index}>
            <NewsItem   title={element.title?element.title:""} description ={element.title?element.description:""} imageUrl ={element.urlToImage} newsUrl ={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}  
            </div>
            </div>
            </InfiniteScroll>
        </>
    )
  }
}

export default News;
