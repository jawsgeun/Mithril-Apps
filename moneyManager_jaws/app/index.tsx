/// <reference path='index.d.ts'/>

import 'bootstrap/dist/css/bootstrap.min.css';
import * as m from 'mithril';
import Content from './Common/Content';
import Input from './InputPage/Input';
import Statistics from './StatisticsPage/Statistics';

m.route(document.body, '/input', {
  '/input': {
    view() {
      return <Content><Input /></Content>;
    },
  },
  '/stat': {
    view() {
      return <Content><Statistics /></Content>;
    },
  },
});
