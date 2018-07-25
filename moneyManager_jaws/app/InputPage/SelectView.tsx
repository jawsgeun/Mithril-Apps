import * as m from 'mithril';
import './Input.css';
import './SelectView.css';

interface Attrs {
  formTitle: string;
  subTitle: string[];
  ids: string[];
  onClickEvent: (v: string) => void;
}

export default class SelectView implements m.ClassComponent<Attrs> {
  attrs: Attrs;
  private propsFunc: (v: string) => void;
  public oninit(vnode: m.CVnode<Attrs>) {
    this.propsFunc = vnode.attrs.onClickEvent;
  }
  private onClick = (v: string): void => {
    switch (v) {
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
    const radioElement = [];
    for (let i: number = 0; i < vnode.attrs.ids.length; i++) {
      radioElement.push(
        <div>
          <input type='radio' value={vnode.attrs.ids[i]} name='radio' onchange={m.withAttr('value', this.onClick)} />
          &nbsp;&nbsp;
          <label class='radio_label'>{vnode.attrs.subTitle[i]}</label>
        </div>,
      );
    }
    return (
      <form className='form_select'>
        <fieldset>
          <label class='input_label'>{vnode.attrs.formTitle}</label>
          {radioElement}
        </fieldset>
      </form>
    );
  }
}
