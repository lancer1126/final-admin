// 导入重置样式
import "../styles/scss/reset.scss";
// 导入公共样式
import "../styles/scss/index.scss";
// 导入tailwind.css，防止vite每次hmr都会请求src/styles/scss/index.scss导致热更新慢的问题
import "../styles/css/tailwind.css";
// 导入字体图标
import "../assets/iconfont/iconfont.js";
import "../assets/iconfont/iconfont.css";

export default function setupAssets() {}
