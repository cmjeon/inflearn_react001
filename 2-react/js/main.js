import store from './js/store.js';

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY"
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어 "
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchKeyword:'',
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
    }
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({ keywordList });
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKEyword);
    this.setState({
      searchKeyword,
      searchResult,
      submitted: true,
    })
  }

  handleReset() {
    // this.setState(()=> {
    //   return { searchKeyword: "",}
    // }, () => {
    //   console.log("handleReset", this.state.searchKeyword);
    // });
    this.setState({
      searchKeyword: "",
      submitted: false,
    });
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    if(searchKeyword.length <= 0 && this.state.submitted) {
      return this.handleReset();
    }
    this.setState({ searchKeyword });
    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    this.setState({ 
      searchResult : store.search(searchKeyword),
      submitted : true,
    });
  }

  render() {
    let resetButton = null;

    if(this.state.searchKeyword.length > 0) {
      resetButton = <button type="reset" className="btn-reset"></button>;
    }

    const searchForm = (
      <form
        onSubmit={ (event) => this.handleSubmit(event) }
        onReset={ () => this.handleReset() }
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={ this.state.searchKeyword }
          onChange={ (event) => this.handleChangeInput(event) }
        />
        { resetButton }
      </form>
    )

    const searchResult = (
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map((item, index) => {
            return (
              <li key={item.id}>
                <img src={ item.imageUrl } alt={ item.name } />
                <p>{ item.name }</p>
              </li>
            )
          })}
        </ul>
      ):(
        <div className="empty-box">검색 결과가 없습니다</div>
      )
    );

    const keywordList = (
      <ul className="list">
        { this.state.keywordList.map( (item, index) => {
          return (
            <li
              key={ item.id }
              onClick={ () => this.search(item.keyword) }
            >
              <span className="number">{ index + 1 }</span>
              <span>{ item.keyword }</span>
            </li>
          )
        })}
      </ul>
    )
        
    const tabs = (
      <>
        <ul className="tabs">
          { Object.values(TabType).map(tabType => {
            return (
              <li 
                key={ tabType }
                className={ this.state.selectedTab === tabType ? 'active' : ''}
              >{ TabLabel[tabType] }</li>
            )
          })}
        </ul>
        { this.state.selectedTab === TabType.KEYWORD && ( keywordList )}
        { this.state.selectedTab === TabType.HISTORY && ( <>최근 검색어</> )}
      </>
    )

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          { searchForm }
          <div className="content">
              { this.state.submitted ? ( searchResult ) : ( tabs )}
          </div>
        </div>
      </>
    );
  } 
}
ReactDOM.render(<App />, document.querySelector("#app"));