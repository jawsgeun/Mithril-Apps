import * as m from 'mithril'

interface IAttrs {
  attr : string;
}
export default class SampleComponent implements m.ClassComponent<IAttrs>{
  __attrs : IAttrs;
  view(vnode : m.CVnode<IAttrs>){

  }
}