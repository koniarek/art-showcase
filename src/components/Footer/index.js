import React from 'react';
import Navigation from '../../components/Navigation';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Site from '../../components/Site';
import './styles.css';

/*
 * Function: Footer
 * Description: Renders the global footer for the website
 */
const Footer = ({ links, rowSize }) => {
  const footerMessages = [
    'made with',
    'have fun today',
    'it\'s a wonderful world',
    'enjoy',
    'it\'s all good',
  ];

  // Get a random message to render next to the heart
  const messageIndex = Math.floor(Math.random() * footerMessages.length);
  const message = footerMessages[messageIndex];

  // Get the (c) copyright symbol and the current year
  const copyrightSymbol = String.fromCharCode(169);
  const copyrightDate = new Date().getFullYear();

  return (
    <Site.Consumer>
      {({ footer }) => footer && (
        <footer role="contentinfo" className="site-footer">
              <Row rowSize={rowSize}>
                <Column largeSize={9} smallSize={12}>
                  <Navigation
                    position="bottom"
                  />
                </Column>
                <Column largeSize={3} smallSize={12}>
                  <div className="site-footer__message">
                    <object className="site-footer__glyph-heart">
                      <svg width="10px" height="8px" viewBox="0 0 10 10">
                        <path
                          d="M9,0.7c-1-0.9-2.5-0.9-3.5,0L5,1L4,0.6c-0.97-0.9-2.5-0.8-3.5,
                          0c-1,1-1,2.63,0,3.6L5,8l4.17-3.8C10,3.30,10,1.67,9.17,.6z"
                        />
                      </svg>
                    </object>
                    <small>
                      {message}
                    </small>
                  </div>
                  <div className="site-footer__copyright">
                    <small>
                      <span className="site-footer__glyph-copyright">{copyrightSymbol}</span>
                      <span>2012-{copyrightDate} &middot; </span>
                      <a href="/rss.xml">
                        <span>rss</span>
                        <object className="site-footer__glyph-rss">
                          <svg width="10px" height="10px" viewBox="0 0 10 10">
                            <path
                              d="M0,0 C2.75438158,0 5.10964474,0.978065789 7.06578947,
                              2.93421053 C9.02193421,4.89035526 10,7.24561842 10,10 C10,
                              10 8.44736842,10 8.44736842,10 C8.44736842,7.66667105 7.62280263,
                              5.67982895 5.97368421,4.03947368 C4.32456579,2.39911842 2.33332895,
                              1.57894737 0,1.57894737 C0,1.57894737 0,0 0,0 C0,0 0,0 0,0 M0,
                              3.13157895 C1.91227632,3.13157895 3.53947368,3.80263158 4.88157895,
                              5.14473684 C6.22368421,6.48684211 6.89473684,8.10526316 6.89473684,
                              10 C6.89473684,10 5.34210526,10 5.34210526,10 C5.34210526,
                              8.54385526 4.82017105,7.29385526 3.77631579,6.25 C2.73246053,5.20614474 1.47368421,
                              4.68421053 0,4.68421053 C0,4.68421053 0,3.13157895 0,3.13157895 C0,
                              3.13157895 0,3.13157895 0,3.13157895 M1.5,7.02631579 C1.90351316,
                              7.02631579 2.25438158,7.17105263 2.55263158,7.46052632 C2.85088158,7.75 3,
                              8.10526316 3,8.52631579 C3,8.92982895 2.85088158,9.27631579 2.55263158,
                              9.56578947 C2.25438158,9.85526316 1.90351316,10 1.5,10 C1.09648684,
                              10 0.745618421,9.85526316 0.447368421,9.56578947 C0.149118421,
                              9.27631579 0,8.92982895 0,8.52631579 C0,8.10526316 0.149118421,
                              7.75 0.447368421,7.46052632 C0.745618421,7.17105263 1.09648684,
                              7.02631579 1.5,7.02631579 C1.5,7.02631579 1.5,7.02631579 1.5,
                              7.02631579"
                            />
                          </svg>
                        </object>
                      </a>
                    </small>
                  </div>
                </Column>
              </Row>
            </footer>
      )}
    </Site.Consumer>
  );
};

Footer.defaultProps = {
  rowSize: 'large',
};

export default Footer;
