import * as m from 'mithril';
import Header from './Header';

class Content implements m.ClassComponent<{}> {
  view(vnode) {
    return (
      <div>
        <Header />
        {vnode.children}
      </div>
    );
  }
}

export default Content;
