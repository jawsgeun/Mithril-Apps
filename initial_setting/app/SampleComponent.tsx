import * as m from 'mithril';
import * as stream from 'mithril/stream';

interface Attrs {
  attr: string;
}
export default class SampleComponent implements m.ClassComponent<Attrs> {
  attrs: Attrs;
  private val: stream.Stream<string> = stream('');
  private val2: stream.Stream<string> = stream('');
  oninit() {
    this.val2 = this.val.map((v: string): string => {
      return (v.concat('tnrms'));
    });
  }
  onupdate() {
    console.log(this.val2());
  }
  view(vnode: m.CVnode<Attrs>) {
    return (
    <div>
      <input type='text' value={this.val()} oninput={m.withAttr('value', this.val)}/>
    </div>
    );
  }
}
