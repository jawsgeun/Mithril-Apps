import * as m from 'mithril'
import SelectView from './SelectView'
import './Input.css'
import ItemListView from './ItemListView'
import * as stream from 'mithril/stream'

class Input implements m.ClassComponent<{}>{
  private amount: stream.Stream<string> = stream('');
  private moneyPick: stream.Stream<string> = stream('');
  private incomePick: stream.Stream<string> = stream('');
  private detail: stream.Stream<string> = stream('');
  private itemList: Array<Array<string>>;
  private year: stream.Stream<number>;
  private month: stream.Stream<number>;
  private day: stream.Stream<number>;
  private key: number;

  public oninit() {
    this.year = stream(new Date().getFullYear());
    this.month = stream(new Date().getMonth() + 1);
    this.day = stream(new Date().getDate());
    this.listUp();
  }
  public storeToLocal = () => {
    const storeDatas = {
      key: this.key,
      itemList: this.itemList,
    }
    localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(storeDatas);
  }
  public onSubmit = () => {
    if (this.checkEmpty()) {
      this.itemList.push([this.key.toString(), this.amount() + '원', this.moneyPick(), this.incomePick(), this.detail()])
      this.key++;
      console.log('​Input -> publiconSubmit -> this.key', this.key);
      alert('완료되었습니다.')
      this.storeToLocal();
      this.onCancle();
    }
  }
  public onCancle = () => {
    this.amount('');
    this.detail('');
  }
  public checkEmpty(): boolean {
    if (this.amount() == '') {
      alert('금액을 입력하세요!')
    } else if (this.incomePick() == '') {
      alert('수입과 지출 중 한 가지를 선택하세요!')
    } else if (this.moneyPick() == '') {
      alert('카드와 현금 중 한 가지를 선택하세요!')
    } else if (this.detail() == '') {
      alert('상세 정보를 입력하세요!')
    } else {
      return true;
    }
    return false;
  }
  private listUp = (): void => {
    if (this.month() < 1 || this.month() > 12) {
      alert('1월부터 12월 까지만 입력해주세요.')
      return;
    }
    if (this.day() < 1 || this.day() > 31) {
      alert('1일부터 31일 까지만 입력해주세요.')
      return;
    }
    if (localStorage.getItem(this.year + '.' + this.month + '.' + this.day) == null) {
      this.itemList = []
      this.key = 0;
      return;
    }
    this.itemList = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day)).itemList;
    console.log('​Input -> this.itemList', JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day)));
    this.key = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day)).key;
    console.log('​Input -> this.key', this.key);
  }
  private onItemDelete = (key: string): void => {
    this.itemList = this.itemList.filter(item => {
      return item[0] != key;
    })
    this.storeToLocal();
  }
  private onItemUpdate = (key: string, amount: string, moneyPick: string, incomePick: string, detail: string): void => {
    this.itemList = this.itemList.map(item => {
      if (item[0] == key) {
        return [key, amount, moneyPick, incomePick, detail];
      }
      return item;
    })
    this.storeToLocal();
  }
  public view() {
    return (
      <div class='docs-example'>
        <input type='number' class='date_input' id='date_year' value={this.year()} oninput={m.withAttr('value', this.year)} />년
        <input type='number' class='date_input' id='date_month' value={this.month()} oninput={m.withAttr('value', this.month)} />월
        <input type='number' class='date_input' id='date_day' value={this.day()} oninput={m.withAttr('value', this.day)} />일
        &nbsp;&nbsp;
        <button type='button' class='btn btn-primary' onclick={this.listUp}>내역 조회</button>
        <div>
          <label class='input_label' >금액</label><br />
          <input type='number' class='form-control' id='input_amount' className='money_input' value={this.amount()}
            oninput={m.withAttr('value', this.amount)} placeholder='금액을 입력하세요' />&nbsp;원
        </div>
        <SelectView formTitle='카드/현금 선택' subTitle={['카드', '현금']} ids={['credit', 'cash']} onClickEvent={this.moneyPick} />
        <hr />
        <SelectView formTitle='수입/지출 선택' subTitle={['수입', '지출']} ids={['income', 'outcome']} onClickEvent={this.incomePick} />
        <label class='input_label' >상세 정보 입력</label><br />
        <textarea rows='3' cols='50' id='input_detail' value={this.detail()}
          oninput={m.withAttr('value', this.detail)} placeholder='상세정보를 입력하세요.' />
        <br />
        <button class='btn btn-primary' onclick={this.onSubmit}>등록</button>&nbsp;&nbsp;
        <button class='btn btn-danger' onclick={this.onCancle}>취소</button>
        <ItemListView funcUpdate={this.onItemUpdate} funcDelete={this.onItemDelete} itemList={this.itemList} />
      </div>
    )
  }
}

export default Input;