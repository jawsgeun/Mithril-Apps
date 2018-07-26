/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import './index.css';
import SampleComponent from './SampleComponent';

class App implements m.ClassComponent<{}> {
    view() {
      return <SampleComponent attr = '테스트 속성'/>;
    }
}

m.mount(document.getElementById('app'), App);
