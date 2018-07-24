/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import SampleComponent from './SampleComponent'
import './index.css';

class App implements m.ClassComponent<{}> {
  oninit() {
    m.request({
      method: "GET",
      url: "http://localhost:3000/",
    })
      .then(function (users) {
        console.log(users)
      })
  }
  view() {
    return <SampleComponent attr='테스트 속성' />;
  }
}

m.mount(document.getElementById('app'), App);