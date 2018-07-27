import * as m from 'mithril';
import './Header.css';

class Header implements m.Component<{}> {
  onClickInput = () => {
    m.route.set('/input');
  }
  onClickStat = () => {
    m.route.set('/stat');
  }
  view() {
    return (
      <div class='menu'>
        <div class='menu-item' onclick={this.onClickInput}>수입 / 지출 입력</div>
        <div class='menu-item' onclick={this.onClickStat}>통계</div>
      </div>
    );
  }
}

export default Header;
