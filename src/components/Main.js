import 'normalize.css';
import 'styles/App.scss';
import 'styles/_avalanche.scss';

import { FacebookButton, TwitterButton, VKontakteButton } from 'react-social';
import Map from './Map';

import React from 'react';

import lang_bel from 'file!../images/bel.svg'
import lang_eng from 'file!../images/eng.svg'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '-čy',
      lang: 'Eng'
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  changeQuery(e) {
    let changes = e.target.value || e.target.dataset.value || '';
    if (this.state.lang === 'Bel') {
      changes = changes.replace('ъ', '\'');
      changes = changes.replace('щ', 'ў');
      changes = changes.replace('и', 'і');
    }
    if (this.state.lang === 'Eng') {
      changes = changes.replace('c^', 'č');
      changes = changes.replace('s^', 'š');
      changes = changes.replace('z^', 'ž');
      changes = changes.replace('l\'', 'ĺ');
      changes = changes.replace('n\'', 'ń');
      changes = changes.replace('c\'', 'ć');
      changes = changes.replace('z\'', 'ź');
      changes = changes.replace('u^', 'ŭ');
    }
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
    const url = 'http://trafimovi.ch/town-names';
    switch(this.state.lang) {
      case 'Eng':
        return (
          <div className="wrapper">
            <header>
              <div className="grid">
                <div className="5/6 grid__cell">
                  <h1>The visualisation of&nbsp;city and&nbsp;village names in&nbsp;Belarus</h1>
                </div>
                <div className="1/6 grid__cell">
                  <ul className="lang">
                    <li><a onClick={this.changeLang} data-lang="Bel"><img src={lang_bel} alt="The coat of arms of Belarus" height="24" />Бел</a></li>
                    <li className="selected"><a data-lang="Eng"><img src={lang_eng} alt="The coat of arms of England" height="24" />Eng</a></li>
                  </ul>
                </div>
              </div>
            </header>
            <article>
              <div className="grid">
                <div className="3/16 1/1--handheld 1/3--lap 1/1--thumb grid__cell">
                  <section className="form">
                    <h3>Pattern</h3>
                    <input type="text" onChange={this.changeQuery} value={this.state.query} placeholder="several letters" />
                  </section>
                  <section className="examples">
                    <h3>Examples:</h3>
                    <ul>
                      {this.props.examples[this.state.lang].map((e, i) => {
                        return (<li key={i}><a onClick={this.changeQuery} data-value={e}>{e}</a></li>)
                      })}
                    </ul>
                  </section>
                </div>
                <div className="8/16 1/1--handheld 2/3--lap 1/1--thumb grid__cell">
                  <Map data={this.props.data} query={this.state.query} lang={this.state.lang} path={this.props.path} total={this.props.total} />
                </div>
                <div className="5/16 1/1--handheld 2/3--lap 1/1--thumb grid__cell">
                  <aside className="help">
                    <p>This map shows which morphological features are characteristic for different regions of Belarus. Set up patterns this way:</p>
                    <dl>
                      <dt><strong>-čy</strong></dt>
                      <dd>“čy” at the end of the name</dd>
                      <dt><strong>čy-</strong></dt>
                      <dd>at the beginning</dd>
                      <dt><strong>-čy-</strong></dt>
                      <dd>in the middle</dd>
                      <dt><strong>čy</strong></dt>
                      <dd>anywhere</dd>
                      <dt><strong>-čy/-šy</strong></dt>
                      <dd>“čy” or “šy” at the end of name</dd>
                    </dl>
                    <p className="double">(Use <strong className="key"> ^ </strong> and <strong className="key"> ' </strong> keys to add these nice diacritical marks to the letters.)</p>
                    <p>The color represents how often the name with the pattern comes across in this area: the darker, the more.</p>
                    <p>Click points on the map to see names of all cities and villages with the choosen pattern in selected area.</p>
                  </aside>
                </div>
              </div>
            </article>
            <footer>
              <div className="grid">
                <div className="5/16 1/2--handheld 1/1--thumb grid__cell">
                  <h3>Data sources</h3>
                  <ul>
                    <li>The list of cities and villages: <a href="http://opendata.by/dataset/106">Opendata.by</a></li>
                    <li>Geo-coordinates: <a href="http://overpass-turbo.eu">OverPass Turbo</a></li>
                  </ul>
                </div>
                <div className="6/16 1/2--handheld 1/1--thumb grid__cell">
                  <h3>Inspired by</h3>
                  <ul>
                    <li>
                      <a href="http://truth-and-beauty.net/experiments/ach-ingen-zell/"><em>-ach, -ingen, -zell</em><br />by Moritz
                        Stefaner</a>
                    </li>
                  </ul>
                </div>
                <div className="5/16 1/1--handheld 1/1--thumb grid__cell">
                  <p><a href="http://trafimovi.ch">Ihar Trafimovich</a>, 2016</p>
                  <div className="likes">
                    <div className="likes">
                      <FacebookButton url={url}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z"/></svg>
                        <span>Share</span>
                      </FacebookButton>
                      <TwitterButton url={url}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353z"/></svg>
                        <span>Tweet</span>
                      </TwitterButton>
                      <VKontakteButton url={url}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zm.452 11.394l-1.603.022s-.345.068-.8-.243c-.598-.41-1.164-1.48-1.604-1.342-.446.144-.432 1.106-.432 1.106s.003.206-.1.315c-.11.12-.326.144-.326.144H7.87s-1.582.095-2.975-1.356c-1.52-1.583-2.862-4.723-2.862-4.723s-.078-.206.006-.305c.094-.112.35-.12.35-.12l1.716-.01s.162.026.277.11c.095.07.15.202.15.202s.276.7.643 1.335c.716 1.238 1.05 1.508 1.293 1.376.353-.193.247-1.75.247-1.75s.006-.565-.178-.817c-.145-.194-.415-.25-.534-.267-.096-.014.062-.238.267-.338.31-.15.853-.16 1.497-.153.502.004.646.035.842.083.59.143.39.694.39 2.016 0 .422-.075 1.018.23 1.215.13.085.453.013 1.256-1.352.38-.647.666-1.407.666-1.407s.062-.136.16-.194c.098-.06.232-.04.232-.04l1.804-.012s.542-.065.63.18c.092.257-.203.857-.94 1.84-1.21 1.612-1.345 1.46-.34 2.394.96.89 1.16 1.325 1.192 1.38.4.66-.44.71-.44.71z"/></svg>
                        <span>Vodka</span>
                      </VKontakteButton>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        );
      case 'Bel':
        return (
          <div className="wrapper">
            <header>
              <div className="grid">
                <div className="5/6 grid__cell">
                  <h1>Візуалізацыя назваў населеных пунктаў Беларусі</h1>
                </div>
                <div className="1/6 grid__cell">
                  <ul className="lang">
                    <li className="selected"><a data-lang="Bel"><img src={lang_bel} alt="Герб Беларусі" height="24" />Бел</a></li>
                    <li><a onClick={this.changeLang} data-lang="Eng"><img src={lang_eng} alt="Герб Англіі" height="24" />Eng</a></li>
                  </ul>
                </div>
              </div>
            </header>
            <article>
              <div className="grid">
                <div className="3/16 1/1--handheld 1/3--lap 1/1--thumb grid__cell">
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
                <div className="8/16 1/1--handheld 2/3--lap 1/1--thumb grid__cell">
                  <Map data={this.props.data} query={this.state.query} lang={this.state.lang} path={this.props.path} total={this.props.total} />
                </div>
                <div className="5/16 1/1--handheld 1/1--lap 1/1--thumb grid__cell">
                  <aside className="help">
                    <p>Гэтая мапа паказвае, якія марфалагічныя асаблівасьці ўласьцівыя розным рэгіёнам Беларусі. Шукайце паводле ўзору:</p>
                    <dl>
                      <dt><strong>-чы</strong></dt>
                      <dd>&laquo;чы&raquo; у канцы назвы</dd>
                      <dt><strong>чы-</strong></dt>
                      <dd>у пачатку слова</dd>
                      <dt><strong>-чы-</strong></dt>
                      <dd>у сярэдзіне слова</dd>
                      <dt><strong>чы</strong></dt>
                      <dd>у любым месцы</dd>
                      <dt><strong>-чы/-шы</strong></dt>
                      <dd>&laquo;чы&raquo; альбо &laquo;шы&raquo; ў канцы назвы</dd>
                    </dl>
                    <p>Па колеры можна ўбачыць, ці часта назва з такім патэрнам сустракаецца на гэтай тэрыторыі: чым цямнейшы
                      колер, тым часцей сустракаецца.</p>
                    <p>Клікайце кропкі на мапе, каб убачыць назвы ўсіх населеных пунктаў з абраным патэрнам на азначанай тэрыторыі.</p>
                  </aside>
                </div>
              </div>
            </article>
            <footer>
              <div className="grid">
                <div className="5/16 1/2--handheld 1/1--thumb grid__cell">
                  <h3>Крыніцы дадзеных</h3>
                  <ul>
                    <li>Cпіс населеных пунктаў: <a href="http://opendata.by/dataset/106">Opendata.by</a></li>
                    <li>Геакаардынаты: <a href="http://overpass-turbo.eu">OverPass Turbo</a></li>
                  </ul>
                </div>
                <div className="6/16 1/2--handheld 1/1--thumb grid__cell">
                  <h3>Ідея</h3>
                  <ul>
                    <li>
                      <a href="http://truth-and-beauty.net/experiments/ach-ingen-zell/"><em>-ach, -ingen, -zell</em><br />by Moritz
                        Stefaner</a>
                    </li>
                  </ul>
                </div>
                <div className="5/16 1/1--handheld 1/1--thumb grid__cell">
                  <p><a href="http://trafimovi.ch">Ігар Трафімовіч</a>, 2016</p>
                  <div className="likes">
                    <FacebookButton url={url}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z"/></svg>
                      <span>Расшарыць</span>
                    </FacebookButton>
                    <TwitterButton url={url}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353z"/></svg>
                      <span>Ціўцьнуць</span>
                    </TwitterButton>
                    <VKontakteButton url={url}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h10c2 0 3-1 3-3V3c0-2-1-3-3-3zm.452 11.394l-1.603.022s-.345.068-.8-.243c-.598-.41-1.164-1.48-1.604-1.342-.446.144-.432 1.106-.432 1.106s.003.206-.1.315c-.11.12-.326.144-.326.144H7.87s-1.582.095-2.975-1.356c-1.52-1.583-2.862-4.723-2.862-4.723s-.078-.206.006-.305c.094-.112.35-.12.35-.12l1.716-.01s.162.026.277.11c.095.07.15.202.15.202s.276.7.643 1.335c.716 1.238 1.05 1.508 1.293 1.376.353-.193.247-1.75.247-1.75s.006-.565-.178-.817c-.145-.194-.415-.25-.534-.267-.096-.014.062-.238.267-.338.31-.15.853-.16 1.497-.153.502.004.646.035.842.083.59.143.39.694.39 2.016 0 .422-.075 1.018.23 1.215.13.085.453.013 1.256-1.352.38-.647.666-1.407.666-1.407s.062-.136.16-.194c.098-.06.232-.04.232-.04l1.804-.012s.542-.065.63.18c.092.257-.203.857-.94 1.84-1.21 1.612-1.345 1.46-.34 2.394.96.89 1.16 1.325 1.192 1.38.4.66-.44.71-.44.71z"/></svg>
                      <span>Падзяліцца</span>
                    </VKontakteButton>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )
    }
  }
}

export default AppComponent;
