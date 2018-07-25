import * as m from 'mithril';
import ItemModel from './ItemModel';

interface ItemAttrs {
  item: ItemModel;
  funcDelete: (key: string) => void;
  funcUpdate: (key: string, amount: string, moneyPick: string, incomePick: string, detail: string) => void;
}

export default class ItemView implements m.ClassComponent<ItemAttrs> {
  attrs: ItemAttrs;
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
  private datas: ItemModel;
  private funcDelete: (key: string) => void;
  private funcUpdate: (key: string, amount: string, moneyPick: string, incomePick: string, detail: string) => void;

  oninit(vnode: m.CVnode<ItemAttrs>) {
    this.datas = vnode.attrs.item;
    this.key = this.datas.getModelKey();
    this.amount = this.datas.getModelAmount();
    this.moneyPick = this.datas.getModelMoneyPick();
    this.incomePick = this.datas.getModelIncomePick();
    this.detail = this.datas.getModelDetail();
    this.funcDelete = vnode.attrs.funcDelete;
    this.funcUpdate = vnode.attrs.funcUpdate;
    this.updateState = false;
  }
  onbeforeupdate(vnode: m.CVnode<ItemAttrs>, old: m.CVnode<ItemAttrs>): boolean {
    if (!vnode.attrs.item.isEqual(old.attrs.item)) {
      this.datas = vnode.attrs.item;
      this.key = this.datas.getModelKey();
      this.amount = this.datas.getModelAmount();
      this.moneyPick = this.datas.getModelMoneyPick();
      this.incomePick = this.datas.getModelIncomePick();
      this.detail = this.datas.getModelDetail();
      this.funcDelete = vnode.attrs.funcDelete;
      this.funcUpdate = vnode.attrs.funcUpdate;
      this.updateState = false;
      return true;
    }
    if (this.updateState) {
      return true;
    } else {
      return false;
    }
  }
  onClickUpdate = () => {
    this.updatedAmount = this.amount;
    this.updatedMoneyPick = this.moneyPick;
    this.updatedIncomePick = this.incomePick;
    this.updatedDetail = this.detail;
    this.updateState = true;
  }
  onUpdateMoneyPick = () => {
    if (this.updatedMoneyPick === '현금') {
      this.updatedMoneyPick = '카드';
    } else {
      this.updatedMoneyPick = '현금';
    }
  }
  onUpdateIncomePick = () => {
    if (this.updatedIncomePick === '수입') {
      this.updatedIncomePick = '지출';
    } else {
      this.updatedIncomePick = '수입';
    }
  }
  deleteItem = () => {
    this.funcDelete(this.key);
  }
  updateItem = () => {
    this.funcUpdate(this.key, this.updatedAmount, this.updatedMoneyPick, this.updatedIncomePick, this.updatedDetail);
  }
  view() {
    if (this.updateState) {
      return (
        <div>
          <h3>
            <input type='text' value={this.updatedAmount} oninput={m.withAttr('value', ((v) => { this.updatedAmount = v; }))} />{'  '}
            <input type='text' value={this.updatedDetail} oninput={m.withAttr('value', ((v) => { this.updatedDetail = v; }))} />{'  '}
            <button class='btn btn-success' onclick={this.onUpdateIncomePick}>{this.updatedIncomePick}</button>{'  '}
            <button class='btn btn-warning' onclick={this.onUpdateMoneyPick}>{this.updatedMoneyPick}</button>
          </h3>
          <button onclick={this.updateItem}>수정완료</button>
        </div>
      );
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
      );
    }
  }
}
