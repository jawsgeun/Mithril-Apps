import * as m from 'mithril'
import ItemViewModel from './ItemViewModel'

interface ItemAttrs {
  item : ItemViewModel;
  key : any;
}

export default class ItemView implements m.ClassComponent<ItemAttrs>{
  __attrs: ItemAttrs;
  private amount: string;
  private moneyPick: string;
  private incomePick: string;
  private detail: string;
  private datas : Array<string>
  oninit(vnode : m.CVnode<ItemAttrs>){
    this.datas = vnode.attrs.item.getItemData();
    this.amount = this.datas[0];
    this.moneyPick = this.datas[1];
    this.incomePick = this.datas[2];
    this.detail = this.datas[3];
  }
  view() {
    return (
      <div>
        <h3>
          {this.amount}{'  '}
          {this.moneyPick}{'  '}
          {this.incomePick}{'  '}
          {this.detail}
        </h3>
      </div>
    )
  }
}
