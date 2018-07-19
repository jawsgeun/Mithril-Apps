import * as m from 'mithril'
import SelectView from './SelectView'
import './Input.css'
import ItemListView from './ItemListView'
import ItemViewModel from './ItemViewModel'

class Input implements m.ClassComponent<{}>{
  private amount: string = '';
  private moneyPick: string = '';
  private incomePick: string = '';
  private detail: string = '';

  private dumpData: Array<Array<string>> = [
    ['3000원', '현금', '수입', 'test1'],
    ['4000원', '현금', '지출', 'test2'],
    ['5000원', '카드', '수입', 'test3'],
  ]
  private itemList: Array<ItemViewModel>;
  public oninit(vnode) {
    vnode.state.date = Input.convertDate(new Date());
    this.itemList = this.dumpData.map((v: Array<string>) => {
      return new ItemViewModel(v[0], v[1], v[2], v[3]);
    })
  }
  public onSubmit = () => {
    if (this.checkEmpty()) {
      this.itemList.push(new ItemViewModel(this.amount, this.moneyPick, this.incomePick, this.detail))
      alert('완료되었습니다.')
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
  private onAmountChange = (e: KeyboardEvent): void => {
    this.amount = (e.target as HTMLInputElement).value;
  }
  private onDetailChange = (e: KeyboardEvent): void => {
    this.detail = (e.target as HTMLTextAreaElement).value;
  }
  private onMoneyRadioClick = (choice: string) => {
    this.moneyPick = choice;
  }
  private onIncomeRadioClick = (choice: string) => {
    this.incomePick = choice;
  }
  public view(vnode) {
    return (
      <div className='docs-example'>
        <h1>
          {vnode.state.date}&nbsp;&nbsp;
          <button>달력에서 조회</button>
        </h1>
        <input type='number' id='input_amount' className='money_input'
          onchange={this.onAmountChange} placeholder='금액을 입력하세요' />&nbsp;원
        <SelectView formTitle='카드/현금 선택' subTitle={['카드', '현금']} ids={['credit', 'cash']} onClickEvent={this.onMoneyRadioClick} />
        <hr />
        <SelectView formTitle='수입/지출 선택' subTitle={['수입', '지출']} ids={['income', 'outcome']} onClickEvent={this.onIncomeRadioClick} />
        <h2>상세 정보 입력</h2>
        <textarea rows="3" cols="50" id='input_detail' 
          onchange={this.onDetailChange} placeholder='상세정보를 입력하세요.' />
        <ItemListView itemList={this.itemList} />
        <button onclick={this.onSubmit}>등록 하기</button>
      </div>
    )
  }
  public static convertDate(date: Date): string {
    return date.getFullYear() + '년' +
      (date.getMonth() + 1) + '월' +
      date.getDate() + '일';
  }
}

export default Input;