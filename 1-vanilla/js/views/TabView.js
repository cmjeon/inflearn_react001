import { qs } from "../helpers.js";
import View from "./View.js";

const TabTypes = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY'
}

const TabLabels = {
  [TabTypes.KEYWORD] : '추천 검색어',
  [TabTypes.HISTORY] : '최근 검색어',
}

const tag = "[TabView]";

export default class TabView extends View {  
  constructor() {
    super(qs("#tab-view"));
    this.template = new Template();
  }

  show() {
    this.element.innerHTML = this.template.getTabList();
    super.show();
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabTypes)
          .map((tabType) => ({
            tabType, tabLabel : TabLabels[tabType]
          }))
          .map(this._getTab)
          .join("")
        }
      </ul>
    `;
  }

  _getTab({ tabType, tabLabel }) {
    return `
      <li data-tab="${tabType}">
        ${tabLabel}
      </li>
    `
  }
}