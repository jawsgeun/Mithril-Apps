/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import './index.css';
import SampleComponent from './SampleComponent';

class App implements m.ClassComponent<{}> {
  private gainedData: string;
  oninit() {
    m.request({
      method: 'GET',
      url: 'http://localhost:3000/',
    }).then((users) => {
      this.gainedData = JSON.stringify(users);
    });
  }
  view() {
    return(
    <div>
      <h1>서버로 부터 받은 데이터 : {this.gainedData}</h1>
      <SampleComponent attr='테스트 속성' />
    </div>
    );
  }
}

m.mount(document.getElementById('app'), App);
