const tag = "[Controller]";

export default class Controller {
  constructor(
    store, 
    { 
      searchFormView, 
      searchResultView,
      tabView
    }
    ) {
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on('@reset', () => this.reset());
    this.tabView
      .on('@click', event => this.changeTab(event.detail.value));
  }

  changeTab(tab) {
    console.log(tag, "changeTab", tab);
  }

  search(keyword) {
    console.log(tag, keyword);
    this.store.search(keyword);
    this.render();
  }

  reset() {
    // console.log(tag, 'reset');
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }

  render() {
    if(this.store.searchKeyword.length > 0) {
      this.tabView.hide();
      this.searchResultView.show(this.store.searchResult);
      return;
    }
    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();
  }
}
