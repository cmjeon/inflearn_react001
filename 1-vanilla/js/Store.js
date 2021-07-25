import { TabTypes } from './views/TabView.js';
import { createNextId } from './helpers.js';

const tag = "[Store]";

export default class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabTypes.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product =>
      product.name.includes(keyword)
    );
    this.addHistory(keyword);
  }

  addHistory(keyword) {
    keyword  = keyword.trim();
    if(!keyword) {
      return;
    }
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword);
    if(hasHistory) {
      this.removeHistory(keyword);
    }
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2) {
    return history2.date - history1.date;
    // firefox 의 경우 return history2.date > history1.date
    // Chorme 의 경우 return history2.date - history1.date
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(history => history.keyword != keyword);
  }
}
