import * as m from 'mithril'
import ItemViewModel from './ItemViewModel'

interface ItemAttrs {
  item: ItemViewModel;
  funcDelete: Function;
  funcUpdate: Function;
}

export default class ItemView implements m.ClassComponent<ItemAttrs>{
  __attrs: ItemAttrs;
  private key: string;
  private amount: string;
  private moneyPick: string;
  private incomePick: string;
  private detail: string;
  private updatedAmount: string;
  private updatedMoneyPick: string;
  private updatedIncomePick: string;
  private updatedDetail: string;
  private updateState: boolean;
  private datas: Array<string>
  private funcDelete: Function;
  private funcUpdate: Function;

  oninit(vnode: m.CVnode<ItemAttrs>) {
    this.datas = vnode.attrs.item.getItemData();
    this.key = this.datas[0];
    this.amount = this.datas[1];
    this.moneyPick = this.datas[2];
    this.incomePick = this.datas[3];
    this.detail = this.datas[4];
    this.funcDelete = vnode.attrs.funcDelete;
    this.funcUpdate = vnode.attrs.funcUpdate;
    this.updateState = false;
  }
  onbeforeupdate(vnode: m.CVnode<ItemAttrs>, old: m.CVnode<ItemAttrs>) {
    if (vnode.attrs.item.getItemData() != old.attrs.item.getItemData() && !this.updateState) {
      this.datas = vnode.attrs.item.getItemData();
      this.key = this.datas[0];
      this.amount = this.datas[1];
      this.moneyPick = this.datas[2];
      this.incomePick = this.datas[3];
      this.detail = this.datas[4];
      this.funcDelete = vnode.attrs.funcDelete;
      this.funcUpdate = vnode.attrs.funcUpdate;
    }
  }
  onClickUpdate = () => {
    this.updatedAmount = this.amount;
    this.updatedMoneyPick = this.moneyPick;
    this.updatedIncomePick = this.incomePick;
    this.updatedDetail = this.detail;
    this.updateState = true;
  }
  deleteItem = () => {
    this.funcDelete(this.key);
  }
  updateItem = () => {
    this.funcUpdate(this.key, this.updatedAmount, this.updatedMoneyPick, this.updatedIncomePick, this.updatedDetail);
    this.updateState = false;
  }
  view() {
    if (this.updateState) {
      return (
        <div>
          <h3>
            <input type='text' value={this.updatedAmount} oninput={m.withAttr('value', (v => { this.updatedAmount = v; }))} />{'  '}
            <input type='text' value={this.updatedMoneyPick} oninput={m.withAttr('value', (v => { this.updatedMoneyPick = v; }))} />{'  '}
            <input type='text' value={this.updatedIncomePick} oninput={m.withAttr('value', (v => { this.updatedIncomePick = v; }))} />{'  '}
            <input type='text' value={this.updatedDetail} oninput={m.withAttr('value', (v => { this.updatedDetail = v; }))} />
          </h3>
          <button onclick={this.updateItem}>수정완료</button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>
            {this.amount}{',  '}
            {this.moneyPick}{',  '}
            {this.incomePick}{',  '}
            {this.detail}
          </h3>
          <button onclick={this.deleteItem}>삭제하기</button>
          <button onclick={this.onClickUpdate}>수정하기</button>
        </div>
      )
    }
  }
}
