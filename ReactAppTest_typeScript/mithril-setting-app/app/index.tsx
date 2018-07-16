import * as m from 'mithril';

class App implements m.ClassComponent<{}> {
  view() {
        return <div>Hello Mithril with JSX</div>;
  }
}

m.mount(document.getElementById('app'), App);