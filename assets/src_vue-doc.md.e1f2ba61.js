import{_ as s,o as e,c as n,Q as a}from"./chunks/framework.e4fdc785.js";const l=""+new URL("404-image.1ec1f764.png",import.meta.url).href,v=JSON.parse('{"title":"Vue","description":"","frontmatter":{},"headers":[],"relativePath":"src/vue-doc.md","filePath":"src/vue-doc.md"}'),o={name:"src/vue-doc.md"},p=a(`<h1 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h1><h2 id="表单问题" tabindex="-1">表单问题 <a class="header-anchor" href="#表单问题" aria-label="Permalink to &quot;表单问题&quot;">​</a></h2><p>ElementUI 表单校验 number 类型的浮点数，因为 v-model 返回的是字符串，加修饰符 .number 后无法输入小数点，故需要手写自定义校验规则。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">const fn = (rule, value, callback) { </span></span>
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
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-label="Permalink to &quot;路由&quot;">​</a></h2><ol><li>动态路由加载的时候，刷新后会出现 404，404 的路由组件务必要放在最后。<img src="`+l+`" alt="An image" width="50%" height="auto"></li><li>懒加载 + 异步（请求）会导致通过 ref 方式获取数据有问题（第一次 undefined，更新后还是拿不到，人才公园 SwiperImg 组件）。 <ul><li>解决办法，正常引入组件或者更改逻辑使用 emit。</li></ul></li><li>this.$router.replace({ path: &quot;/home&quot; }); // 首次登录会报错。原因：多次重定向，login -&gt; / -&gt; /baseData -&gt; /home，加上 catch 强制忽略掉, 具体参考：<a href="https://stackoverflow.com/questions/62223195/vue-router-uncaught-in-promise-error-redirected-from-login-to-via-a?rq=1" target="_blank" rel="noreferrer">stackoverflow</a><br> 解决办法： <ul><li><code>this.$router.replace({ path: &quot;/home&quot; }).catch(_ =&gt; {});</code></li><li><code>this.$router.push({ path: &quot;/home&quot;, replace: true })</code></li><li><code>router-link</code></li></ul></li><li>路由重复 push/replace 报错 <code>NavigationDuplicated:Avoided redundant navigation！</code></li></ol><div class="language-router.js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">router.js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import VueRouter from &quot;vue-router&quot;;</span></span>
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
<span class="line"><span style="color:#24292e;">};</span></span></code></pre></div>`,7),t=[p];function c(r,i,u,h,d,y){return e(),n("div",null,t)}const E=s(o,[["render",c]]);export{v as __pageData,E as default};
