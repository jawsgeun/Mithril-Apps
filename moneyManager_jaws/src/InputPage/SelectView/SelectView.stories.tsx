declare var require: any;

import { action } from '@storybook/addon-actions';
import withBackgrounds from '@storybook/addon-backgrounds/mithril';
import { text, withKnobs } from '@storybook/addon-knobs/mithril';
import { storiesOf } from '@storybook/mithril';
import * as m from 'mithril';
import { Selection } from '../Input';
import SelectView from './SelectView';

const formTitle = '카드/현금 선택';
const SelectionTwo: Selection[] = [
  {
    title: '카드',
    id: 'credit',
  },
  {
    title: '현금',
    id: 'cash',
  },
];

const formTitle3 = '3가지 선택';
const SelectionThree: Selection[] = SelectionTwo.concat(
  {
    title: '기타',
    id: 'etc',
  },
);

const clickAction = action('click');

storiesOf('SelectView')
  .addDecorator(withKnobs)
  .addDecorator(withBackgrounds([
    { name: 'white', value: '#ffffff', default: true },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ]))
  .add('with two items', () => {
    const formTitleKnob = text('formTitle', formTitle);
    return {
      view: () => <SelectView formTitle={formTitleKnob} titleData={SelectionTwo} onClickEvent={(v: string) => { clickAction(v); }} />,
    };
  })
  .add('with three items', () => ({
    view: () => <SelectView formTitle={formTitle3} titleData={SelectionThree} onClickEvent={(v: string) => { clickAction(v); }} />,
  }));
