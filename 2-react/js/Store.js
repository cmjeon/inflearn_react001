import storage from './storage.js';

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw "no storage";

    this.storage = storage;
  }

  search(searchKeyword) {
    return this.storage.productData.filter(
      (product) => product.name.includes(searchKeyword)
    );
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
    // FF의 경우 return history2.date > history1.date;, Chorme 의 경우 - 로 해줘야 함
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(history => history.keyword != keyword);
  }
}

const store = new Store(storage);
export default store;