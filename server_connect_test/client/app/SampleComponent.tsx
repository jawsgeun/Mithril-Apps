import * as m from 'mithril';

interface Attrs {
  attr: string;
}
export default class SampleComponent implements m.ClassComponent<Attrs> {
  attrs: Attrs;
  private onUpload = (v: File[]): void => {
    const file: File = v[0];

    const data = new FormData();
    data.append('myfile', file);

    const promise: Promise<{}> = m.request({
      method: 'POST',
      url: 'http://localhost:3000/upload',
      data,
    });
    promise.then(() => {
      console.log('helll');
    });
  }
  view(vnode: m.CVnode<Attrs>) {
    return (<div>
      <form>
        <input type='file' onchange={m.withAttr('files', this.onUpload)} />
      </form>
    </div>
    );
  }
}
