import * as m from 'mithril'
import ItemViewModel from './ItemViewModel'
import ItemView from './ItemView';

interface ListAttrs {
  itemList: Array<ItemViewModel>;
}
export default class ItemListView implements m.ClassComponent<ListAttrs>{
  __attrs: ListAttrs;
  private itemList: Array<JSX.Element>;
  public oninit(vnode: m.CVnode<ListAttrs>) {
    this.itemList = vnode.attrs.itemList.map((value : ItemViewModel):JSX.Element=>{
      return <ItemView key ={vnode.attrs.itemList.indexOf(value)}item = {value}/>
    });
  }
  public onbeforeupdate(vnode: m.CVnode<ListAttrs>){
    this.itemList = vnode.attrs.itemList.map((value : ItemViewModel):JSX.Element=>{
      return <ItemView key ={vnode.attrs.itemList.indexOf(value)}item = {value}/>
    });
  }
  public view() {
    return (this.itemList)
  }
}
