import * as m from 'mithril';
import { Selection } from '../Input';
import '../Input.css';
import './SelectView.css';

interface Attrs {
  formTitle: string;
  titleData: Selection[];
  onClickEvent: (v: string) => void;
}

export default class SelectView implements m.ClassComponent<Attrs> {
  attrs: Attrs;
  private propsFunc: (v: string) => void;
  public oninit(vnode: m.CVnode<Attrs>) {
    this.propsFunc = vnode.attrs.onClickEvent;
  }
  public view(vnode: m.CVnode<Attrs>) {
    const radioElement = [];
    for (const val of vnode.attrs.titleData) {
      radioElement.push(
        <div>
          <input type='radio' value={val.id} name='radio' onchange={m.withAttr('value', this.propsFunc)} />
          &nbsp;&nbsp;
          <label class='radio_label'>{val.title}</label>
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
