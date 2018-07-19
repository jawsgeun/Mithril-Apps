/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import './index.css';

class App implements m.ClassComponent<{}> {
    view() {
      return <div class='message'>Hello Mithril with JSX</div>;
    }
}

m.mount(document.getElementById('app'), App);