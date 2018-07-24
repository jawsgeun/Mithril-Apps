/// <reference path='index.d.ts'/>

import * as m from 'mithril';
import SampleComponent from './SampleComponent'
import './index.css';

class App implements m.ClassComponent<{}> {
  private gainedData: string;
  oninit() {
    m.request({
      method: "GET",
      url: "http://localhost:3000/",
    }).then((users) => {
      this.gainedData = JSON.stringify(users);
    })
  }
  view() {
    console.log(this.gainedData);
    return(
    <div>
      <h1>서버로 부터 받은 데이터 : {this.gainedData}</h1>
      <SampleComponent attr='테스트 속성' />
    </div>
    )
  }
}

m.mount(document.getElementById('app'), App);