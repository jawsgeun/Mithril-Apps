import * as m from 'mithril';
import * as stream from 'mithril/stream';
import './Input.css';
import ItemListView from './ItemListView';
import SelectView from './SelectView/SelectView';

interface IdataFormat {
  key: number;
  itemList: string[][];
}

class Input implements m.ClassComponent<{}> {
  private amount: stream.Stream<string> = stream('');
  private moneyPick: stream.Stream<string> = stream('');
  private incomePick: stream.Stream<string> = stream('');
  private detail: stream.Stream<string> = stream('');
  private radioSelect: stream.Stream<string> = stream('');
  private itemList: string[][];
  private year: stream.Stream<number>;
  private month: stream.Stream<number>;
  private day: stream.Stream<number>;
  private key: number;

  public oninit() {
    this.year = stream(new Date().getFullYear());
    this.month = stream(new Date().getMonth() + 1);
    this.day = stream(new Date().getDate());
    this.incomePick = this.radioSelect.map((v: string) => {
      if (v === 'income') {
        return '수입';
      } else {
        return '지출';
      }
    });
    this.moneyPick = this.radioSelect.map((v: string) => {
      if (v === 'cash') {
        return '현금';
      } else {
        return '카드';
      }
    });
    this.listUp();
  }
  public storeToLocal = () => {
    const storeDatas: IdataFormat = {
      key: this.key,
      itemList: this.itemList,
    };
    localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(storeDatas);
  }
  public onSubmit = () => {
    if (this.checkEmpty()) {
      this.itemList.push([this.key.toString(), this.amount() + '원', this.moneyPick(), this.incomePick(), this.detail()]);
      this.key++;
      alert('완료되었습니다.');
      this.storeToLocal();
      this.onCancle();
    }
  }
  public onCancle = () => {
    this.amount('');
    this.detail('');
  }
  public checkEmpty(): boolean {
    if (this.amount() === '') {
      alert('금액을 입력하세요!');
    } else if (this.incomePick() === '') {
      alert('수입과 지출 중 한 가지를 선택하세요!');
    } else if (this.moneyPick() === '') {
      alert('카드와 현금 중 한 가지를 선택하세요!');
    } else if (this.detail() === '') {
      alert('상세 정보를 입력하세요!');
    } else {
      return true;
    }
    return false;
  }
  private listUp = (): void => {
    if (this.month() < 1 || this.month() > 12) {
      alert('1월부터 12월 까지만 입력해주세요.');
      return;
    }
    if (this.day() < 1 || this.day() > 31) {
      alert('1일부터 31일 까지만 입력해주세요.');
      return;
    }
    if (localStorage.getItem(this.year + '.' + this.month + '.' + this.day) == null) {
      this.itemList = [];
      this.key = 0;
      return;
    }
    this.itemList = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day)).itemList;
    this.key = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day)).key;
  }
  private onItemDelete = (key: string): void => {
    this.itemList = this.itemList.filter((item) => {
      return item[0] !== key;
    });
    this.storeToLocal();
  }
  private onItemUpdate = (key: string, amount: string, moneyPick: string, incomePick: string, detail: string): void => {
    this.itemList = this.itemList.map((item) => {
      if (item[0] === key) {
        return [key, amount, moneyPick, incomePick, detail];
      }
      return item;
    });
    this.storeToLocal();
  }
  public view() {
    return (
      <div class='docs-example'>
        <input type='number' class='date_input' value={this.year()} oninput={m.withAttr('value', this.year)} />년
        <input type='number' class='date_input' value={this.month()} oninput={m.withAttr('value', this.month)} />월
        <input type='number' class='date_input' value={this.day()} oninput={m.withAttr('value', this.day)} />일
        &nbsp;&nbsp;
        <button type='button' class='btn btn-primary' onclick={this.listUp}>내역 조회</button>
        <div>
          <label class='input_label' >금액</label><br />
          <input type='number' class='form-control' className='money_input' value={this.amount()}
            oninput={m.withAttr('value', this.amount)} placeholder='금액을 입력하세요' />&nbsp;원
        </div>
        <SelectView formTitle='카드/현금 선택' subTitle={['카드', '현금']} ids={['credit', 'cash']} onClickEvent={this.radioSelect} />
        <hr />
        <SelectView formTitle='수입/지출 선택' subTitle={['수입', '지출']} ids={['income', 'outcome']} onClickEvent={this.radioSelect} />
        <label class='input_label' >상세 정보 입력</label><br />
        <textarea rows='3' cols='50' value={this.detail()}
          oninput={m.withAttr('value', this.detail)} placeholder='상세정보를 입력하세요.' />
        <br />
        <button class='btn btn-primary' onclick={this.onSubmit}>등록</button>&nbsp;&nbsp;
        <button class='btn btn-danger' onclick={this.onCancle}>취소</button>
        <ItemListView funcUpdate={this.onItemUpdate} funcDelete={this.onItemDelete} itemList={this.itemList} />
      </div>
    );
  }
}

export default Input;
