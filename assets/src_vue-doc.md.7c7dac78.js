import{_ as e,o as s,c as a,Q as n}from"./chunks/framework.df4a10e8.js";const o="/assets/404-image.1ec1f764.png",l="/assets/main.31fcae69.jpg",t="/assets/sdk-platforms.f7901ea1.jpg",c="/assets/tools.95f98066.jpg",R=JSON.parse('{"title":"框架","description":"","frontmatter":{},"headers":[],"relativePath":"src/vue-doc.md","filePath":"src/vue-doc.md"}'),r={name:"src/vue-doc.md"},p=n(`<h1 id="框架" tabindex="-1">框架 <a class="header-anchor" href="#框架" aria-label="Permalink to &quot;框架&quot;">​</a></h1><h2 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h2><h3 id="表单问题" tabindex="-1">表单问题 <a class="header-anchor" href="#表单问题" aria-label="Permalink to &quot;表单问题&quot;">​</a></h3><p>ElementUI 表单校验 number 类型的浮点数，因为 v-model 返回的是字符串，加修饰符 .number 后无法输入小数点，故需要手写自定义校验规则。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">const fn = (rule, value, callback) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (!value) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        return callback(new Error(&quot;xxxx&quot;)); </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    let reg = /^\\d*(\\.?\\d+)$/; </span></span>
<span class="line"><span style="color:#E1E4E8;">    if (!reg.test(value)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        return callback(new Error(&quot;xxx&quot;)) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    return callback(); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">const fn = (rule, value, callback) { </span></span>
<span class="line"><span style="color:#24292E;">    if (!value) { </span></span>
<span class="line"><span style="color:#24292E;">        return callback(new Error(&quot;xxxx&quot;)); </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    let reg = /^\\d*(\\.?\\d+)$/; </span></span>
<span class="line"><span style="color:#24292E;">    if (!reg.test(value)) { </span></span>
<span class="line"><span style="color:#24292E;">        return callback(new Error(&quot;xxx&quot;)) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    return callback(); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-label="Permalink to &quot;路由&quot;">​</a></h3><ol><li>动态路由加载的时候，刷新后会出现 404，404 的路由组件务必要放在最后。<img src="`+o+`" alt="An image" width="50%" height="auto"></li><li>懒加载 + 异步（请求）会导致通过 ref 方式获取数据有问题（第一次 undefined，更新后还是拿不到，人才公园 SwiperImg 组件）。 <ul><li>解决办法，正常引入组件或者更改逻辑使用 emit。</li></ul></li><li>this.$router.replace({ path: &quot;/home&quot; }); // 首次登录会报错。原因：多次重定向，login -&gt; / -&gt; /baseData -&gt; /home，加上 catch 强制忽略掉, 具体参考：<a href="https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a?rq=1" target="_blank" rel="noreferrer">stackoverflow</a><br> 解决办法： <ul><li><code>this.$router.replace({ path: &quot;/home&quot; }).catch(_ =&gt; {});</code></li><li><code>this.$router.push({ path: &quot;/home&quot;, replace: true })</code></li><li><code>router-link</code></li></ul></li><li>路由重复 push/replace 报错 <code>NavigationDuplicated:Avoided redundant navigation！</code></li></ol><div class="language-router.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">router.js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import VueRouter from &quot;vue-router&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">Vue.use(VueRouter);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const originalPush = VueRouter.prototype.push;</span></span>
<span class="line"><span style="color:#e1e4e8;">VueRouter.prototype.push = function push(location, onResolve, onReject) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (onResolve || onReject)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return originalPush.call(this, location, onResolve, onReject);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return originalPush.call(this, location).catch((err) =&gt; err);</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const originalReplace = VueRouter.prototype.replace;</span></span>
<span class="line"><span style="color:#e1e4e8;">VueRouter.prototype.replace = function replace(location, onResolve, onReject) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (onResolve || onReject)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return originalReplace.call(this, location, onResolve, onReject);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return originalReplace.call(this, location).catch((err) =&gt; err);</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import VueRouter from &quot;vue-router&quot;;</span></span>
<span class="line"><span style="color:#24292e;">Vue.use(VueRouter);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const originalPush = VueRouter.prototype.push;</span></span>
<span class="line"><span style="color:#24292e;">VueRouter.prototype.push = function push(location, onResolve, onReject) {</span></span>
<span class="line"><span style="color:#24292e;">  if (onResolve || onReject)</span></span>
<span class="line"><span style="color:#24292e;">    return originalPush.call(this, location, onResolve, onReject);</span></span>
<span class="line"><span style="color:#24292e;">  return originalPush.call(this, location).catch((err) =&gt; err);</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const originalReplace = VueRouter.prototype.replace;</span></span>
<span class="line"><span style="color:#24292e;">VueRouter.prototype.replace = function replace(location, onResolve, onReject) {</span></span>
<span class="line"><span style="color:#24292e;">  if (onResolve || onReject)</span></span>
<span class="line"><span style="color:#24292e;">    return originalReplace.call(this, location, onResolve, onReject);</span></span>
<span class="line"><span style="color:#24292e;">  return originalReplace.call(this, location).catch((err) =&gt; err);</span></span>
<span class="line"><span style="color:#24292e;">};</span></span></code></pre></div><h2 id="react" tabindex="-1">React <a class="header-anchor" href="#react" aria-label="Permalink to &quot;React&quot;">​</a></h2><h3 id="react-native-初识-令人深刻的环境配置" tabindex="-1">react-native 初识：令人深刻的环境配置 <a class="header-anchor" href="#react-native-初识-令人深刻的环境配置" aria-label="Permalink to &quot;react-native 初识：令人深刻的环境配置&quot;">​</a></h3><p>准备环境：react-native版本 <code>0.72.2</code>，node版本 <code>16.14.0</code>, JDK <code>11.0.21</code><a href="https://www.oracle.com/java/technologies/downloads/#java11" target="_blank" rel="noreferrer">下载地址</a>，这里JDK安装不做赘述，网上搜索下有很多文章。</p><ol><li>安装 Android Studio <a href="https://developer.android.com/studio?hl=zh-cn" target="_blank" rel="noreferrer">地址</a>，一路<code>next</code>。</li><li>安装 the Android SDK，<code>New Project</code>，我选择<code>No Activity</code>，进去之后，找到<code>File</code>-&gt;<code>Close Project</code>，回到主界面 <img src="`+l+'" alt="main"></li><li>进入到 <code>Android SDK</code> 之后，在<code>SDK Platforms</code>找到<code>Android 13.0(&quot;Tiramisu&quot;)</code>，操作如图所示<img src="'+t+'" alt="platform"></li><li>进入到 <code>SDK Tools</code>，在<code>Android SDK Build-Tools 34</code>中勾选<code>33.0.0</code>。点击Apply，等待安装。 PS：查看自己的<code>Android SDK Location</code>目录，如果没有<code>tools</code>这个目录的，可以进行以下操作<img src="'+c+'" alt="tools"></li><li>配置环境变量 <code>ANDROID_HOME</code>，路径为 <code>Android SDK Location</code>。之后在<code>path</code>中加入<code>%ANDROID_HOME%\\platform-tools</code>、<code>%ANDROID_HOME%\\emulator</code>、<code>%ANDROID_HOME%\\tools</code>、<code>%ANDROID_HOME%\\tools\\bin</code>。我看官方文档只是添加了<code>platform-tools</code>，没实践，怕有坑。</li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>如果您之前安装了全局 <code>react-native-cli</code> 软件包，请将其删除，因为它可能会导致意外问题: <code>npm uninstall -g react-native-cli @react-native-community/cli</code></p></div><ol start="6"><li><code>npx react-native@0.72.2 init AwesomeProject</code></li></ol>',14),i=[p];function d(u,h,y,v,g,m){return s(),a("div",null,i)}const f=e(r,[["render",d]]);export{R as __pageData,f as default};
