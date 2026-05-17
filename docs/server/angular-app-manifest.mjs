
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/portfolio"
  },
  {
    "renderMode": 2,
    "redirectTo": "/portfolio",
    "route": "/portfolio/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16075, hash: 'e93842ff22f642d8410ae92e69d6db22d6fc825f08b9690d0cd1dfd110973022', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1313, hash: '803a91dc86b736fbd7aa6f0cfe6f3dbc670aa5e90fb9761d39cf3320668b1b2e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 75910, hash: '16424514ab7a452b7f4d96bc0918d0d166a96918565e0590389acfb0dd0dfa1e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-AZDKNRYL.css': {size: 15247, hash: 'bbWMdnryqEM', text: () => import('./assets-chunks/styles-AZDKNRYL_css.mjs').then(m => m.default)}
  },
};
