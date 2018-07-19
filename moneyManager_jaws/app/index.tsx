import * as m from 'mithril';

declare global {
  namespace JSX {
    interface Element extends m.Vnode<any, any> { }
    interface ElementClass extends m.Comp<any, any> { }
    interface ElementAttributesProperty { __attrs: any; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicElements {
      [elementName: string]: m.Attributes;
    }
  }
}
import Content from './Common/Content';
import Input from './InputPage/Input'
import Statistics from './StatisticsPage/Statistics'

m.route(document.body, "/input", {
  "/input": {
    view() {
      return <Content><Input/></Content>
    }
  },
  "/stat": {
    view() {
      return <Content><Statistics/></Content>
    }
  },
})