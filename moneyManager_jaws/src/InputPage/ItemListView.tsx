import * as m from 'mithril';
import ItemModel from './ItemModel';
import ItemView from './ItemView';

interface ListAttrs {
  itemList: string[][];
  funcDelete: (key: string) => void;
  funcUpdate: (key: string, amount: string, moneyPick: string, incomePick: string, detail: string) => void;
}
export default class ItemListView implements m.ClassComponent<ListAttrs> {
  attrs: ListAttrs;
  private itemList: string[][];
  private isItemExist: boolean;
  public oninit(vnode: m.CVnode<ListAttrs>): void {
    if (vnode.attrs.itemList.length === 0) {
      this.isItemExist = false;
    } else {
      this.isItemExist = true;
      this.itemList = vnode.attrs.itemList;
    }
  }
  public onbeforeupdate(vnode: m.CVnode<ListAttrs>): boolean {
    if (vnode.attrs.itemList.length === 0) {
      this.isItemExist = false;
    } else {
      this.isItemExist = true;
      this.itemList = vnode.attrs.itemList;
    }
    return true;
  }
  public view(vnode: m.CVnode<ListAttrs>) {
    if (this.isItemExist) {
      return this.itemList.map((v: string[]) => {
        return <ItemView item={new ItemModel(v[0], v[1], v[2], v[3], v[4])}
          funcDelete={vnode.attrs.funcDelete} funcUpdate={vnode.attrs.funcUpdate} />;
      });
    } else {
      return <div><h1>내역이 없습니다.</h1></div>;
    }
  }
}
