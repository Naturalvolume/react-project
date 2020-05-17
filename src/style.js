import { createGlobalStyle } from 'styled-components';
// 全局样式设置，消去浏览器默认样式的影响
// 相当于把全局样式当成一个组件导出
export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	html, body {
		background: #EEFFFF;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		text-decoration: none;
		color: #DBF0F0;
  }
  // 定义字体图标的unicode的编码
  @font-face {font-family: "iconfont";
    src: url('iconfont.eot?t=1589678884477'); /* IE9 */
    src: url('iconfont.eot?t=1589678884477#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANwAAsAAAAAB+gAAAMhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDHIMOATYCJAMQCwoABCAFhG0HTRsFBxHVmzPIfhzGjul3S65Lx00yRKn+cxBPdrzzdvcuewiICqCKCmrj7oMuE5fwbW6GrlERhik5D/6X70jHAtL8CoCDY6ZL8TybzSUjrKnAxq0Dimoa2Qbygv4L7BzC7wSchgA+HeiHTJw8cyEWgzJJANm5bcs6bEiByUkXLIKbstIgd3Gw6prKgTv27+Vzf7GgcDTKzLmbJ21k7LuR7+bos9FZVpoImO3pAGkdaKAfYEC2phrWo91APzT+p79hMGCxKGirY9a7OVFErLkIrPovDwSFBnFRUkMABlJQw7uROhkC72aRoeDdnBQ0wAkZb4H6wFEgkbDthisc3LCJFzYPQ6PMXlFevqS0dFFJycKysn2L48vF4i0O0KIP3Cgfs2jLs7hz8Tdiz8YsTinp9LB0Unp510dlq/J5viilyGZXHb1W7hcPCd4Wtqfk+gmZlvytsrI1gfiLGkqDpRwdH6923rmz0+AqkYYcv3dy37y8Pt02D1VX3ry5glzFSnWFrEM3d3uUnkAU/2DAYDW6TdzcqVMdRxfNtXtktpssYxcuHCsFGtXqLWMnP51wj0X6UUXFI4OrRSpKWRTb8bdmh7kFc3EOLh+Q5S4YG2v+/jXIjWUacnwrZ86MVeTxY6jKGncgewGIfukr2pYmaDVzLIA+qxJu5d+QlWvnrWk48psNDABV7950I0eUYCjPuB/MD/PGMUuWmC9bURrz5uiMn9MwnjszTQE+PhCBpQl1bYial/aBYENMCRT1aA8aSzekwfYDh4CB4GIZAz59mbI+oCn70YjxgD5cAhAa8RwUDYgHTSNykQZbCw4t+AoujUSDz2JpumPA0kOCmEAoGQ2oPwR9VKupWTjpN3TvLCnItnEvpBbcMA9TNLxjRWpjTvu4hdmCpaPABudhzgecdETUPHjmcx1Hm/ahQR+lE0wglIwGUH8g6KNaszaL2Pdv6N5ZUk7RD+ULqYXugZmBqQRyF9RSRcfyTvu4BWYLWDoKsMEwzPkAzvRhETUP+Bq+c2VUK9mygqF/UTnCdYCPMsiIEi1GHLx1d/aMba8Ybsks6peuAwAAAA==') format('woff2'),
    url('iconfont.woff?t=1589678884477') format('woff'),
    url('iconfont.ttf?t=1589678884477') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('iconfont.svg?t=1589678884477#iconfont') format('svg'); /* iOS 4.1- */
}
  // 设置字体图标的大小
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
