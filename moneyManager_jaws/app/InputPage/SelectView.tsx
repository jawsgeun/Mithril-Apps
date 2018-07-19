import * as m from 'mithril'

interface Attrs {
  formTitle: string;
  subTitle: Array<string>;
  ids: Array<string>;
  onClickEvent: Function;
}

export default class SelectView implements m.ClassComponent<Attrs> {
  __attrs: Attrs;
  private propsFunc: Function;
  public oninit(vnode: m.CVnode<Attrs>) {
    this.propsFunc = vnode.attrs.onClickEvent;
  }
  private onClick = (e: KeyboardEvent): void => {
    switch ((e.target as HTMLInputElement).id) {
      case 'cash':
        this.propsFunc('현금');
        break;
      case 'credit':
        this.propsFunc('카드');
        break;
      case 'income':
        this.propsFunc('수입');
        break;
      case 'outcome':
        this.propsFunc('지출');
        break;
    }

  }
  public view(vnode: m.CVnode<Attrs>) {
    return (
      <form className='form_select'>
        <fieldset>
          <legend>{vnode.attrs.formTitle}</legend>
          <div>
            <input type='radio' id={vnode.attrs.ids[0]} name='radio' onchange={this.onClick} />
            <label>{vnode.attrs.subTitle[0]}</label>&nbsp;&nbsp;&nbsp;
            </div>
          <div>
            <input type='radio' id={vnode.attrs.ids[1]} name='radio' onchange={this.onClick} />
            <label>{vnode.attrs.subTitle[1]}</label>
          </div>
        </fieldset>
      </form>
    )
  }
}