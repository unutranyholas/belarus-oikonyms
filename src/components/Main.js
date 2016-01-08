import 'normalize.css';
import 'styles/App.scss';
import 'ilyabirman-likely/release/likely.css';
import 'styles/_avalanche.scss';
import _ from 'lodash';
import likely from 'ilyabirman-likely';
import Map from './Map';

import React from 'react';

import lang_bel from "file!../images/bel.svg"
import lang_eng from "file!../images/eng.svg"

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '-чы',
      lang: 'Bel'
    };

    this.changeQuery = this.changeQuery.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }
  componentDidMount() {
    require('ilyabirman-likely').initiate();
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
  // <li className={(this.state.lang === 'Eng') ? 'selected' : null}><a onClick={this.changeLang} data-lang="Eng"><img src={lang_eng} alt="Герб Англіі" height="24" />Eng</a></li>
  render() {
    return (
      <div className="wrapper">
        <header className="grid">
          <div className="5/6 grid__cell">
            <h1>Візуалізація назваў населеных пунктаў Беларусі</h1>
          </div>
          <div className="1/6 grid__cell">
            <ul className="lang">
              <li className={(this.state.lang === 'Bel') ? 'selected' : null}><a onClick={this.changeLang} data-lang="Bel"><img src={lang_bel} alt="Герб Беларусі" height="24" />Бел</a></li>
              <li style={{opacity: 0.2}}><a data-lang="Eng" title="Coming soon..."><img src={lang_eng} alt="Герб Англіі" height="24" />Eng</a></li>
            </ul>
          </div>
        </header>
        <article className="grid">
          <div className="3/16 1/1--handheld 1/1--thumb grid__cell">
            <section className="form">
              <h3>Патэрн</h3>
              <input type="text" onChange={this.changeQuery} value={this.state.query} placeholder="некалькі літар" />
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
          <div className="8/16 1/1--handheld 1/1--thumb grid__cell">
            <Map data={this.props.data} query={this.state.query} lang={this.state.lang} path={this.props.path} total={this.props.total} />
          </div>
          <div className="5/16 1/1--handheld 1/1--thumb grid__cell">
            <aside className="help">
              <p>Гэтая мапа паказвае, якія марфалагічныя асаблівасьці ўласьцівыя розным рэгіёнам Беларусі. Шукайце паводле ўзору:</p>
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
              <p>Па колеры можна ўбачыць, ці часта назва з такім патэрнам сустракаецца на гэтай тэрыторыі: чым цямнейшы
                колер, тым часцей сустракаецца.</p>
              <p>Клікайце кропкі на мапе, каб убачыць назвы ўсіх населеных пунктаў з абраным патэрнам на азначанай тэрыторыі.</p>
            </aside>
          </div>
        </article>
        <footer className="grid">
          <div className="5/16 1/2--handheld 1/1--thumb grid__cell">
            <h3>Крыніцы дадзеных</h3>
            <ul>
              <li>Cпіс населеных пунктаў: <a href="http://opendata.by/dataset/106">Opendata.by</a></li>
              <li>Геакаардынаты: <a href="http://overpass-turbo.eu">OverPass Turbo</a></li>
            </ul>
          </div>
          <div className="6/16 1/2--handheld 1/1--thumb grid__cell">
            <h3>Інспірэйшн</h3>
            <ul>
              <li>
                <a href="http://truth-and-beauty.net/experiments/ach-ingen-zell/"><em>-ach, -ingen, -zell</em><br />by Moritz
                  Stefaner</a>
              </li>
            </ul>
          </div>
          <div className="5/16 1/1--handheld 1/1--thumb grid__cell">
            <p><a href="http://trafimovi.ch">Ігар Трафімовіч</a>, 2016</p>
            <div className="likely">
              <div className="facebook">Расшарыць</div>
              <div className="twitter">Ціўцьнуць</div>
              <div className="vkontakte">Падзяліцца</div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default AppComponent;
