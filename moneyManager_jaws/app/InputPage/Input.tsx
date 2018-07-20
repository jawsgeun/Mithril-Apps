import * as m from 'mithril'
import SelectView from './SelectView'
import './Input.css'
import ItemListView from './ItemListView'

class Input implements m.ClassComponent<{}>{
  private amount: string = '';
  private moneyPick: string = '';
  private incomePick: string = '';
  private detail: string = '';
  private itemList: Array<Array<string>>;
  private year: string;
  private month: string;
  private day: string;
  private key: number;
  
  public oninit() {
    this.year = new Date().getFullYear().toString();
    this.month = (new Date().getMonth() + 1).toString();
    this.day = new Date().getDate().toString();
    this.listUp();
    this.key = this.itemList == null ? 0 : this.itemList.length;
  }
  public onbeforeupdate(){
    this.key = this.itemList == null ? 0 : this.itemList.length;
  }
  public onSubmit = () => {
    if (this.checkEmpty()) {
      this.itemList.push([this.key.toString(), this.amount + '원', this.moneyPick, this.incomePick, this.detail])
      this.key++;
      alert('완료되었습니다.')
      localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(this.itemList);
    }
  }
  public checkEmpty(): boolean {
    if (this.amount == '') {
      alert('금액을 입력하세요!')
    } else if (this.incomePick == '') {
      alert('수입과 지출 중 한 가지를 선택하세요!')
    } else if (this.moneyPick == '') {
      alert('카드와 현금 중 한 가지를 선택하세요!')
    } else if (this.detail == '') {
      alert('상세 정보를 입력하세요!')
    } else {
      return true;
    }
    return false;
  }
  private onAmountChange = (amount: string): void => {
    this.amount = amount;
  }
  private onDetailChange = (detail: string): void => {
    this.detail = detail;
  }
  private onMoneyRadioClick = (choice: string) => {
    this.moneyPick = choice;
  }
  private onIncomeRadioClick = (choice: string) => {
    this.incomePick = choice;
  }
  private setYear = (year: string): void => {
    this.year = year;
  }
  private setMonth = (month: string): void => {
    this.month = month;
  }
  private setDay = (day: string): void => {
    this.day = day;
  }
  private listUp = (): void => {
    this.itemList = JSON.parse(localStorage.getItem(this.year + '.' + this.month + '.' + this.day));
    if (this.itemList == null) {
      this.itemList = []
    }
  }
  private onItemDelete = (key: string): void => {
    this.itemList = this.itemList.filter(item => {
      return item[0] != key;
    })
    localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(this.itemList);
  }
  private onItemUpdate = (key: string, amount: string, moneyPick: string, incomePick: string, detail: string): void => {
    this.itemList = this.itemList.map(item => {
      if (item[0] == key) {
        return [key, amount, moneyPick, incomePick, detail];
      }
      return item;
    })
    localStorage[this.year + '.' + this.month + '.' + this.day] = JSON.stringify(this.itemList);
  }
  public view(vnode) {
    return (
      <div className='docs-example'>
        <h1>
          <input type='number' class='date_input' id='date_year' value={this.year} oninput={m.withAttr('value', this.setYear)} />년
          <input type='number' class='date_input' id='date_month' value={this.month} oninput={m.withAttr('value', this.setMonth)} />월
          <input type='number' class='date_input' id='date_day' value={this.day} oninput={m.withAttr('value', this.setDay)} />일
          &nbsp;&nbsp;
          <button type="button" class="btn btn-primary" onclick={this.listUp}>내역 조회</button>
        </h1>
        <input type='number' id='input_amount' className='money_input'
          oninput={m.withAttr('value', this.onAmountChange)} placeholder='금액을 입력하세요' />&nbsp;원
        <SelectView formTitle='카드/현금 선택' subTitle={['카드', '현금']} ids={['credit', 'cash']} onClickEvent={this.onMoneyRadioClick} />
        <hr />
        <SelectView formTitle='수입/지출 선택' subTitle={['수입', '지출']} ids={['income', 'outcome']} onClickEvent={this.onIncomeRadioClick} />
        <h2>상세 정보 입력</h2>
        <textarea rows="3" cols="50" id='input_detail'
          oninput={m.withAttr('value', this.onDetailChange)} placeholder='상세정보를 입력하세요.' />
        <button onclick={this.onSubmit}>등록 하기</button>
        <ItemListView funcUpdate={this.onItemUpdate} funcDelete={this.onItemDelete} itemList={this.itemList} />
      </div>
    )
  }
}

export default Input;