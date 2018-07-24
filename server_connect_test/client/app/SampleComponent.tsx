import * as m from 'mithril'

interface IAttrs {
  attr: string;
}
export default class SampleComponent implements m.ClassComponent<IAttrs>{
  __attrs: IAttrs;
  private onUpload = (v: File[]): void => {
    const file: File = v[0];
    console.log(file);

    let data = new FormData();
    data.append('myfile', file);

    const promise: Promise<any> = m.request({
      method: 'POST',
      url: 'http://localhost:3000/upload',
      data: data,
    })
    console.log(promise);
  }
  view(vnode: m.CVnode<IAttrs>) {
    return (<div>
      <form>
        <input type='file' onchange={m.withAttr('files', this.onUpload)} />
      </form>
    </div>
    )
  }
}