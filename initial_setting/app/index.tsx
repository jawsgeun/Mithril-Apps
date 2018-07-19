/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import SampleComponent from './SampleComponent'
import './index.css';

class App implements m.ClassComponent<{}> {
    view() {
      return <SampleComponent attr = '테스트 속성'/>;
    }
}

m.mount(document.getElementById('app'), App);