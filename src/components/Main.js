import 'normalize.css';
import 'avalanche-css/_avalanche.scss';
import 'styles/App.scss';
import _ from 'lodash';
import Map from './Map';

import React from 'react';

import lang_bel from "file!../images/bel.svg"
import lang_eng from "file!../images/eng.svg"

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '-чы',
      lang: 'Eng'
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }
  changeQuery(e) {
    let changes = e.target.value || e.target.dataset.value || '';
    changes = changes.replace('ъ', '\'');
    changes = changes.replace('щ', 'ў');
    changes = changes.replace('и', 'і');
    this.setState({query: changes});
  }

  changeLang(e) {
    const lang = e.target.parentNode.dataset.lang || e.target.dataset.lang;
    this.setState({
      lang: lang,
      query: this.props.examples[lang][0]
    });
  }

  render() {
    return (
      <div className="wrapper">
        <header className="grid">
          <div className="3/4 grid__cell">
            <h1>Візуалізація назваў населеных пунктаў Беларусі</h1>
          </div>
          <div className="1/4 grid__cell">
            <ul className="lang">
              <li className={(this.state.lang === 'Bel') ? 'selected' : null}><a onClick={this.changeLang} data-lang="Bel"><img src={lang_bel} alt="Герб Беларусі" height="24" />Bel</a></li>
              <li className={(this.state.lang === 'Eng') ? 'selected' : null}><a onClick={this.changeLang} data-lang="Eng"><img src={lang_eng} alt="Герб Англіі" height="24" />Eng</a></li>
            </ul>
          </div>
        </header>
        <article className="grid">
          <div className="3/16 grid__cell">
            <section className="form">
              <h3>Патэрн</h3>
              <input type="text" onChange={this.changeQuery} value={this.state.query} />
            </section>
            <section className="examples">
              <h3>Напрыклад:</h3>
              <ul>
                {this.props.examples[this.state.lang].map((e, i) => {
                  return (<li key={i}><a onClick={this.changeQuery} data-value={e}>{e}</a></li>)
                })}
              </ul>
            </section>
          </div>
          <div className="8/16 grid__cell">
            <Map data={this.props.data} query={this.state.query} lang={this.state.lang} path={this.props.path} total={this.props.total} />
          </div>
          <div className="5/16 grid__cell">
            <aside className="help">
              <p>Гэтая мапа дапаможа даследаваць якія марфалагічныя асаблівасці ў назвах населеных пунктаў уласцівы той ці
                іншай
                мясцовасці Беларусі.</p>
              <p>Выкарыстоўвайце наступны сінтаксіс:</p>
              <dl>
                <dt><strong>-чы</strong></dt>
                <dd>&laquo;чы&raquo; у канцы слова</dd>
                <dt><strong>чы-</strong></dt>
                <dd>у пачатку слова</dd>
                <dt><strong>-чы-</strong></dt>
                <dd>у сярэдзіне слова</dd>
                <dt><strong>чы</strong></dt>
                <dd>у любым месцы</dd>
                <dt><strong>-чы/-шы</strong></dt>
                <dd>&laquo;чы&raquo; альбо &laquo;шы&raquo; ў канцы слова</dd>
              </dl>
              <p>Па колеры можна зразумець, як часта назва з такім патэрнам сустракацца на дадзенай тэрыторыі: чым цямней
                колер, тым часцей сустракаецца.</p>
              <p>Клікайце на палігоны на мапе, каб удакладніць дэталі.</p>
            </aside>
            <footer>
              <h3>Крыніцы дадзеных</h3>
              <ul>
                <li>Cпіс населеных пунктаў: <a href="http://opendata.by/dataset/106">Opendata.by</a></li>
                <li>Геакаардынаты: <a href="http://overpass-turbo.eu">OverPass Turbo</a></li>
              </ul>
              <h3>Інспірэйшн</h3>
              <ul>
                <li>
                  <a href="http://truth-and-beauty.net/experiments/ach-ingen-zell/"><em>-ach, -ingen, -zell</em> by Moritz
                    Stefaner</a>
                </li>
              </ul>
              <p><a href="http://trafimovi.ch">Ігар Трафімовіч</a>, 2016</p>
            </footer>
          </div>
        </article>
      </div>
    );
  }
}

export default AppComponent;
