import * as m from 'mithril'
import ItemModel from './ItemModel'
import ItemView from './ItemView';

interface ListAttrs {
  itemList: Array<Array<string>>;
  funcDelete: Function;
  funcUpdate: Function;
}
export default class ItemListView implements m.ClassComponent<ListAttrs>{
  __attrs: ListAttrs;
  private itemList: Array<JSX.Element>;
  public oninit(vnode: m.CVnode<ListAttrs>): void {
    if (vnode.attrs.itemList.length == 0) {
      this.itemList = [<div><h1>내역이 없습니다.</h1></div>];
      return;
    }
    this.itemList = vnode.attrs.itemList.map((v: Array<string>): JSX.Element => {
      return <ItemView funcUpdate={vnode.attrs.funcUpdate} funcDelete={vnode.attrs.funcDelete} item={new ItemModel(v[0], v[1], v[2], v[3], v[4])} />
    });
  }
  public onbeforeupdate(vnode: m.CVnode<ListAttrs>): void {
    if (vnode.attrs.itemList.length == 0) {
      this.itemList = [<div><h1>내역이 없습니다.</h1></div>];
      return;
    }
    this.itemList = vnode.attrs.itemList.map((v: Array<string>): JSX.Element => {
      return <ItemView funcUpdate={vnode.attrs.funcUpdate} funcDelete={vnode.attrs.funcDelete} item={new ItemModel(v[0], v[1], v[2], v[3], v[4])} />
    });
  }
  public view() {
    return (this.itemList)
  }
}
