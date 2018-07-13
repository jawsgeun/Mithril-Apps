/// <reference path='index.d.ts'/>

import * as m from 'mithril'
import styles = require('./index.css');
class App implements m.ClassComponent<{}>{
  view(){
    return <div class={styles.message}>Hello Mithril with JSX</div>
  }
}

m.mount(document.getElementById('app'),App);