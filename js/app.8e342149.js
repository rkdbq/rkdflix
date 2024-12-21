(function(){"use strict";var e={5139:function(e,t,o){var n=o(3751),i=(o(4114),o(641)),a=o(953),r=o(33),s=o.p+"img/logo.d67acdb3.png",l=o(6278),u=o(5220);const c=["disabled"];function d(e,t,o,n,a,r){return(0,i.uX)(),(0,i.CE)("button",{onClick:t[0]||(t[0]=(...e)=>o.onClick&&o.onClick(...e)),disabled:o.disabled},[(0,i.RG)(e.$slots,"default",{},void 0,!0)],8,c)}var v={name:"rkdButton",props:{onClick:Function,disabled:{type:Boolean,default:!1},widthSize:{type:Number,default:120}}},p=o(6262);const g=(0,p.A)(v,[["render",d],["__scopeId","data-v-5cd1cc54"]]);var m=g,h=o(5597),f=o(6188);const k={class:"app-container"},w={key:0,class:"header-container"},b={class:"nav-main"},_={class:"nav-user"},y={key:0,class:"user-info"},I={key:1,class:"user-info"},L={class:"logout-button"},E={class:"main-content"};var C={__name:"App",setup(e){const t=(0,u.lq)(),o=(0,u.rd)(),n=(0,i.EW)((()=>"/sign-in"===t.path)),c=(0,i.EW)((()=>"/error"===t.path)),d=(0,l.Pj)(),v=(0,i.EW)((()=>d.state.user.userId)),p=(0,i.EW)((()=>d.state.user.nickname)),g=()=>{localStorage.removeItem("remember_me"),localStorage.removeItem("access_token"),o.push("/sign-in")};return(0,i.sV)((()=>{null===d.state.user.userId&&o.push("/sign-in");const e=()=>{console.error("오프라인 상태 감지!"),o.push("/error")};return window.addEventListener("offline",e),()=>{window.removeEventListener("offline",e)}})),(e,t)=>{const o=(0,i.g2)("RouterLink"),l=(0,i.g2)("RouterView");return(0,i.uX)(),(0,i.CE)("div",k,[n.value||c.value?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("header",w,[(0,i.Lk)("nav",b,[(0,i.bF)(o,{class:"nav-item nav-route",to:"/"},{default:(0,i.k6)((()=>t[0]||(t[0]=[(0,i.Lk)("span",null,[(0,i.Lk)("img",{class:"logo",src:s,alt:"홈"})],-1)]))),_:1}),(0,i.bF)(o,{class:"nav-item nav-route",to:"/"},{default:(0,i.k6)((()=>[(0,i.bF)((0,a.R1)(h.gc),{icon:(0,a.R1)(f.muz)},null,8,["icon"]),t[1]||(t[1]=(0,i.eW)()),t[2]||(t[2]=(0,i.Lk)("span",null,"홈",-1))])),_:1}),(0,i.bF)(o,{class:"nav-item nav-route",to:"/popular"},{default:(0,i.k6)((()=>[(0,i.bF)((0,a.R1)(h.gc),{icon:(0,a.R1)(f.kNw)},null,8,["icon"]),t[3]||(t[3]=(0,i.eW)()),t[4]||(t[4]=(0,i.Lk)("span",null,"인기",-1))])),_:1}),(0,i.bF)(o,{class:"nav-item nav-route",to:"/search"},{default:(0,i.k6)((()=>[(0,i.bF)((0,a.R1)(h.gc),{icon:(0,a.R1)(f.MjD)},null,8,["icon"]),t[5]||(t[5]=(0,i.eW)()),t[6]||(t[6]=(0,i.Lk)("span",null,"검색",-1))])),_:1}),(0,i.bF)(o,{class:"nav-item nav-route",to:"/wishlist"},{default:(0,i.k6)((()=>[(0,i.bF)((0,a.R1)(h.gc),{icon:(0,a.R1)(f.qcK)},null,8,["icon"]),t[7]||(t[7]=(0,i.eW)()),t[8]||(t[8]=(0,i.Lk)("span",null,"위시리스트",-1))])),_:1})]),(0,i.Lk)("nav",_,[p.value?((0,i.uX)(),(0,i.CE)("p",y,(0,r.v_)(p.value)+" 님",1)):((0,i.uX)(),(0,i.CE)("p",I,(0,r.v_)(v.value)+" 님",1)),(0,i.Lk)("div",L,[(0,i.bF)(m,{class:"logout-button","on-click":g},{default:(0,i.k6)((()=>t[9]||(t[9]=[(0,i.eW)("로그아웃")]))),_:1})])])])),(0,i.Lk)("main",E,[(0,i.bF)(l)])])}}};const S=C;var O=S,R=o(3464),P=o.n(R);const F={class:"home-container"};function A(e,t,o,n,a,r){const s=(0,i.g2)("MovieBanner"),l=(0,i.g2)("MovieSliderView"),u=(0,i.g2)("Loading");return(0,i.uX)(),(0,i.CE)("div",F,[(0,i.bF)(s,{class:"movie-banner",id:n.firstMovie["now_playing"]["id"],title:n.firstMovie["now_playing"]["title"],"backdrop-path":n.firstMovie["now_playing"]["backdrop_path"],overview:n.firstMovie["now_playing"]["overview"]},null,8,["id","title","backdrop-path","overview"]),(0,i.bF)(l,{"list-name":"Now Playing","movie-items":n.movieItemsMap["now_playing"]},null,8,["movie-items"]),(0,i.bF)(l,{"list-name":"Top Rated","movie-items":n.movieItemsMap["top_rated"]},null,8,["movie-items"]),(0,i.bF)(l,{"list-name":"Upcoming","movie-items":n.movieItemsMap["upcoming"]},null,8,["movie-items"]),(0,i.bF)(u,{isLoading:n.loading},null,8,["isLoading"])])}const M={class:"slider-container"},K={class:"list-name"},x={class:"slider"},W={class:"movie-grid",ref:"slider"};function T(e,t,o,n,a,s){const l=(0,i.g2)("MovieItem");return(0,i.uX)(),(0,i.CE)("div",M,[(0,i.Lk)("h1",K,(0,r.v_)(e.listName),1),(0,i.Lk)("div",x,[(0,i.Lk)("button",{onClick:t[0]||(t[0]=(...t)=>e.prevSlide&&e.prevSlide(...t)),class:"arrow left-arrow"},"❮"),(0,i.Lk)("div",W,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.movieItems,(e=>((0,i.uX)(),(0,i.Wv)(l,{key:e["id"],id:e["id"],title:e["title"],posterPath:e["poster_path"],overview:e["overview"],voteAverage:e["vote_average"],"show-info":!1},null,8,["id","title","posterPath","overview","voteAverage"])))),128))],512),(0,i.Lk)("button",{onClick:t[1]||(t[1]=(...t)=>e.nextSlide&&e.nextSlide(...t)),class:"arrow right-arrow"},"❯")])])}const B={class:"poster-container"},N=["src","alt"],V={key:0,class:"in-wishlist"},X={key:0,class:"title"},U={key:1};function j(e,t,o,a,s,l){return(0,i.uX)(),(0,i.CE)("div",{class:"movie-item",onClick:t[0]||(t[0]=(...e)=>a.toggleToWishlist&&a.toggleToWishlist(...e))},[(0,i.Lk)("div",B,[(0,i.Lk)("img",{src:a.posterUrl,alt:o.title},null,8,N),(0,i.Lk)("p",{style:(0,r.Tr)(a.voteAverageStyle),class:"vote-box"},(0,r.v_)(a.roundedVoteAverage),5),(0,i.bF)(n.eB,null,{default:(0,i.k6)((()=>[a.isInWishlist?((0,i.uX)(),(0,i.CE)("span",V,"*")):(0,i.Q3)("",!0)])),_:1})]),o.showInfo?((0,i.uX)(),(0,i.CE)("p",X,(0,r.v_)(o.title),1)):(0,i.Q3)("",!0),o.showInfo?((0,i.uX)(),(0,i.CE)("p",U,(0,r.v_)(a.truncatedOverview),1)):(0,i.Q3)("",!0)])}const D="https://image.tmdb.org/t/p/original";var $={name:"MovieItem",props:{id:Number,title:String,posterPath:String,overview:{type:String,default:""},voteAverage:Number,showInfo:Boolean},setup(e){const t=(0,l.Pj)(),{id:o,title:n,posterPath:r,overview:s,voteAverage:u}=(0,a.QW)(e),c=(0,i.EW)((()=>D+r.value)),d=(0,i.EW)((()=>Math.round(10*u.value)/10)),v=(0,i.EW)((()=>{let e;return e=d.value>=8?"green":d.value>=4?"orange":"red",{backgroundColor:e,color:"white",padding:"4px 8px",borderRadius:"4px",display:"inline-block",fontWeight:"bold"}})),p=(0,i.EW)((()=>s.value.length>50?s.value.substring(0,50)+"...":s.value)),g=(0,i.EW)((()=>t.state.user.wishlist[o.value])),m=()=>{const e={id:o.value,title:n.value,poster_path:r.value,overview:s.value,vote_average:u.value};t.dispatch("toggleMovieInWishlist",e)};return{posterUrl:c,voteAverageStyle:v,roundedVoteAverage:d,truncatedOverview:p,isInWishlist:g,toggleToWishlist:m}}};const q=(0,p.A)($,[["render",j],["__scopeId","data-v-e4fb6990"]]);var z=q,Q=(0,i.pM)({name:"MovieSliderView",components:{MovieItem:z},props:{listName:{type:String,required:!0},movieItems:{type:Array,required:!0}},setup(){const e=(0,a.KR)(null),t=t=>{e.value&&e.value.scrollBy({top:0,left:t*e.value.clientWidth,behavior:"smooth"})},o=()=>t(1),n=()=>t(-1);return{slider:e,nextSlide:o,prevSlide:n}}});const G=(0,p.A)(Q,[["render",T],["__scopeId","data-v-57fb5e5f"]]);var J=G;const H={key:0,class:"loading-overlay"};function Y(e,t,o,a,r,s){return(0,i.uX)(),(0,i.Wv)(n.eB,{name:"fade"},{default:(0,i.k6)((()=>[o.isLoading?((0,i.uX)(),(0,i.CE)("div",H,t[0]||(t[0]=[(0,i.Lk)("div",{class:"loading-spinner"},"Loading...",-1)]))):(0,i.Q3)("",!0)])),_:1})}var Z={name:"LoadingOverlay",props:{isLoading:{}}};const ee=(0,p.A)(Z,[["render",Y],["__scopeId","data-v-965676dc"]]);var te=ee;const oe={class:"movie-item"},ne={class:"poster-container"},ie=["src","alt"],ae={class:"overlay"},re={class:"title"},se={class:"overview"};function le(e,t,o,n,a,s){return(0,i.uX)(),(0,i.CE)("div",oe,[(0,i.Lk)("div",ne,[(0,i.Lk)("img",{src:e.backdropUrl,alt:e.title,class:(0,r.C4)(["backdrop-image",{loaded:e.isImageLoaded}]),onLoad:t[0]||(t[0]=(...t)=>e.handleImageLoad&&e.handleImageLoad(...t))},null,42,ie),(0,i.Lk)("div",ae,[(0,i.Lk)("h1",re,(0,r.v_)(e.title),1),(0,i.Lk)("p",se,(0,r.v_)(e.overview),1)])])])}const ue="https://image.tmdb.org/t/p/original";var ce=(0,i.pM)({name:"MovieBanner",props:{id:Number,title:String,backdropPath:String,overview:{type:String,default:""},voteAverage:Number},setup(e){const t=(0,i.EW)((()=>ue+e.backdropPath)),o=(0,a.KR)(!1),n=()=>{o.value=!0};return{backdropUrl:t,isImageLoaded:o,handleImageLoad:n}}});const de=(0,p.A)(ce,[["render",le],["__scopeId","data-v-efc883be"]]);var ve=de;const pe="https://api.themoviedb.org/3/movie/",ge={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${{NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_PROD_TMDB_API_KEY}`}};var me={name:"HomePage",components:{MovieBanner:ve,MovieSliderView:J,Loading:te},setup(){const e=(0,a.Kh)({now_playing:[],top_rated:[],upcoming:[]}),t=(0,a.Kh)({now_playing:{},top_rated:{},upcoming:{}}),o=(0,a.KR)(!1),n=n=>{o.value=!0;const i="ko",a=1;fetch(`${pe}${n}?language=${i}&page=${a}`,ge).then((e=>e.json())).then((o=>{e[n]=o["results"],t[n]=o["results"][0]})).catch((e=>console.error(e))).finally((()=>{o.value=!1}))};return(0,i.sV)((()=>{n("now_playing"),n("top_rated"),n("upcoming")})),{movieItemsMap:e,firstMovie:t,loading:o}}};const he=(0,p.A)(me,[["render",A],["__scopeId","data-v-35ef878c"]]);var fe=he;const ke={class:"popular-container"},we={class:"popular-view"},be={class:"select-view-container"},_e={key:0},ye={key:1};function Ie(e,t,o,n,a,r){const s=(0,i.g2)("RkdButton"),l=(0,i.g2)("MovieTableView"),u=(0,i.g2)("MovieScrollView"),c=(0,i.g2)("Loading");return(0,i.uX)(),(0,i.CE)("div",ke,[(0,i.Lk)("div",we,[t[2]||(t[2]=(0,i.Lk)("h1",{class:"category"},"Popular",-1)),(0,i.Lk)("div",be,[(0,i.bF)(s,{"on-click":n.toggleViewOption,disabled:"scroll"===n.viewOption},{default:(0,i.k6)((()=>t[0]||(t[0]=[(0,i.eW)("스크롤")]))),_:1},8,["on-click","disabled"]),(0,i.bF)(s,{"on-click":n.toggleViewOption,disabled:"grid"===n.viewOption},{default:(0,i.k6)((()=>t[1]||(t[1]=[(0,i.eW)("그리드")]))),_:1},8,["on-click","disabled"])])]),"grid"===n.viewOption?((0,i.uX)(),(0,i.CE)("div",_e,[(0,i.bF)(l,{"table-page":n.tablePage,"index-from":n.indexFrom,"index-to":n.indexTo,"movie-items":n.movieItems,"next-page":n.nextPage,"prev-page":n.prevPage},null,8,["table-page","index-from","index-to","movie-items","next-page","prev-page"])])):(0,i.Q3)("",!0),"scroll"===n.viewOption?((0,i.uX)(),(0,i.CE)("div",ye,[(0,i.bF)(u,{"go-top":n.goTop,"movie-items":n.movieItems},null,8,["go-top","movie-items"])])):(0,i.Q3)("",!0),(0,i.bF)(c,{isLoading:n.loading},null,8,["isLoading"])])}const Le={class:"go-top-button"};function Ee(e,t,o,n,a,r){const s=(0,i.g2)("MovieGrid"),l=(0,i.g2)("FontAwesomeIcon"),u=(0,i.g2)("RkdButton");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(s,{"movie-items":e.movieItems,"show-info":e.showInfo},null,8,["movie-items","show-info"]),(0,i.Lk)("div",Le,[(0,i.bF)(u,{"on-click":e.goTop},{default:(0,i.k6)((()=>[(0,i.bF)(l,{icon:e.faArrowUp()},null,8,["icon"])])),_:1},8,["on-click"])])],64)}const Ce={class:"movie-grid-container"},Se={class:"movie-grid"};function Oe(e,t,o,a,r,s){const l=(0,i.g2)("MovieItem");return(0,i.uX)(),(0,i.CE)("div",Ce,[(0,i.Lk)("div",Se,[(0,i.bF)(n.F,{name:"list"},{default:(0,i.k6)((()=>[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.movieItems,(t=>((0,i.uX)(),(0,i.Wv)(l,{key:t["id"],id:t["id"],posterPath:t["poster_path"],voteAverage:t["vote_average"],overview:t["overview"],title:t["title"],"show-info":e.showInfo},null,8,["id","posterPath","voteAverage","overview","title","show-info"])))),128))])),_:1})])])}var Re=(0,i.pM)({name:"MovieGrid",components:{MovieItem:z},props:{movieItems:{type:Array,required:!0},showInfo:{type:Boolean,default:!1}}});const Pe=(0,p.A)(Re,[["render",Oe],["__scopeId","data-v-e5cdc37e"]]);var Fe=Pe,Ae=(0,i.pM)({name:"MovieScrollView",methods:{faArrowUp(){return f.INu}},components:{FontAwesomeIcon:h.gc,RkdButton:m,MovieGrid:Fe},props:{goTop:{type:Function,required:!0},movieItems:{type:Array,required:!0},showInfo:{type:Boolean,default:!1}}});const Me=(0,p.A)(Ae,[["render",Ee],["__scopeId","data-v-734226be"]]);var Ke=Me;const xe={class:"pagination"},We={class:"pagination-info"};function Te(e,t,o,n,a,s){const l=(0,i.g2)("MovieGrid"),u=(0,i.g2)("RkdButton");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(l,{"movie-items":e.slicedMovieItems},null,8,["movie-items"]),(0,i.Lk)("div",xe,[(0,i.bF)(u,{"on-click":e.prevPage,disabled:1===e.tablePage},{default:(0,i.k6)((()=>t[0]||(t[0]=[(0,i.eW)("❮")]))),_:1},8,["on-click","disabled"]),(0,i.Lk)("span",We,"페이지 "+(0,r.v_)(e.tablePage),1),(0,i.bF)(u,{"on-click":e.nextPage,disabled:20===e.tablePage},{default:(0,i.k6)((()=>t[1]||(t[1]=[(0,i.eW)("❯")]))),_:1},8,["on-click","disabled"])])],64)}var Be=(0,i.pM)({name:"MovieTableView",components:{RkdButton:m,MovieGrid:Fe},props:{tablePage:{type:Number,required:!0},indexFrom:{type:Number,required:!0},indexTo:{type:Number,required:!0},movieItems:{type:Array,required:!0},nextPage:{type:Function,required:!0},prevPage:{type:Function,required:!0}},setup(e){const t=(0,i.EW)((()=>e.movieItems.slice(e.indexFrom,e.indexTo)));return{slicedMovieItems:t}}});const Ne=(0,p.A)(Be,[["render",Te],["__scopeId","data-v-6d410296"]]);var Ve=Ne;const Xe="https://api.themoviedb.org/3/movie/popular?language=ko&page=",Ue={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${{NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_PROD_TMDB_API_KEY}`}};var je={name:"PopularMovie",components:{RkdButton:m,MovieTableView:Ve,MovieScrollView:Ke,Loading:te},setup(){const e=(0,a.KR)([]),t=(0,a.KR)(1),o=(0,a.KR)("grid"),n=(0,a.KR)(!0),r=(0,a.KR)(!1),s=(0,a.KR)(0),l=(0,a.KR)(10),u=(0,a.KR)(1),c=(0,i.EW)((()=>Number(s.value+l.value))),d=t=>{r.value=!0;const o=`${Xe}${t}`;fetch(o,Ue).then((e=>e.json())).then((t=>{e.value.push(...t["results"])})).catch((e=>console.error(e))).finally((()=>{r.value=!1}))},v=()=>{c.value+l.value>=e.value.length&&(t.value++,d(t.value)),u.value++,s.value+=l.value},p=()=>{u.value>1&&(u.value--,s.value-=l.value)},g=()=>{window.scrollTo({top:0,behavior:"smooth"})},m=()=>{"scroll"===o.value?h("grid"):h("scroll")},h=n=>{o.value=n,t.value=1,u.value=1,s.value=0,e.value=[],d(t.value),document.body.style.overflow="grid"===n?"hidden":""},f=()=>{if(n.value&&"scroll"===o.value){const e=window.scrollY,o=window.innerHeight,i=document.documentElement.scrollHeight;e+o>=i-5&&(n.value=!1,t.value++,d(t.value),setTimeout((()=>{n.value=!0}),1e3))}},k=()=>{const e=window.innerWidth,t=window.innerHeight,o=.8,n=e>768?200:200*o,i=e>768?300:300*o,a=e>768?20:2,r=e>768?16:2;l.value=Math.floor((e-a+r)/(n+r))*(Math.floor(t/i)-1),l.value=Math.max(1,l.value)};return(0,i.sV)((()=>{h("grid"),window.addEventListener("scroll",f),k()})),(0,i.xo)((()=>{window.removeEventListener("scroll",f),document.body.style.overflow=""})),{movieItems:e,viewOption:o,isScrollListening:n,loading:r,tablePage:u,sliceSize:l,indexFrom:s,indexTo:c,nextPage:v,prevPage:p,goTop:g,toggleViewOption:m}}};const De=(0,p.A)(je,[["render",Ie],["__scopeId","data-v-1bc2f72e"]]);var $e=De;const qe={class:"search-container"},ze={class:"search-view"},Qe={class:"filter-container"};function Ge(e,t,o,n,a,r){const s=(0,i.g2)("Filter"),l=(0,i.g2)("FontAwesomeIcon"),u=(0,i.g2)("RkdButton"),c=(0,i.g2)("MovieScrollView"),d=(0,i.g2)("Loading");return(0,i.uX)(),(0,i.CE)("div",qe,[(0,i.Lk)("div",ze,[t[0]||(t[0]=(0,i.Lk)("h1",{class:"list-name"},"Search",-1)),(0,i.Lk)("div",Qe,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(Object.entries(n.filters),(([e,t])=>((0,i.uX)(),(0,i.Wv)(s,{key:e,"filter-type":e,options:t,"selected-option":n.selectedFilterOption[e],onOnOptionSelected:n.selectOption},null,8,["filter-type","options","selected-option","onOnOptionSelected"])))),128)),(0,i.bF)(u,{"on-click":n.resetFilters},{default:(0,i.k6)((()=>[(0,i.bF)(l,{icon:r.faRotateRight()},null,8,["icon"])])),_:1},8,["on-click"])])]),(0,i.bF)(c,{"go-top":n.goTop,"movie-items":n.movieItems},null,8,["go-top","movie-items"]),(0,i.bF)(d,{isLoading:n.loading},null,8,["isLoading"])])}o(8992),o(3949);const Je={class:"dropdown"},He={key:0,class:"dropdown-menu"};function Ye(e,t,o,n,a,s){const l=(0,i.g2)("RkdButton");return(0,i.uX)(),(0,i.CE)("div",Je,[(0,i.bF)(l,{"on-click":e.toggleDropdown},{default:(0,i.k6)((()=>[(0,i.eW)((0,r.v_)(e.selectedOption),1)])),_:1},8,["on-click"]),e.isOpen?((0,i.uX)(),(0,i.CE)("div",He,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.options,((t,o)=>((0,i.uX)(),(0,i.Wv)(l,{key:o,onClick:o=>e.selectOption(t),class:"dropdown-button"},{default:(0,i.k6)((()=>[(0,i.eW)((0,r.v_)(t),1)])),_:2},1032,["onClick"])))),128))])):(0,i.Q3)("",!0)])}var Ze=(0,i.pM)({name:"FilterDropdown",components:{RkdButton:m},props:{filterType:{type:String,required:!0},options:{type:Array,required:!0},selectedOption:{type:String,required:!0}},setup(e,{emit:t}){const o=(0,a.KR)(!1),n=()=>{o.value=!o.value},i=o=>{t("onOptionSelected",[e.filterType,o]),n()};return{isOpen:o,toggleDropdown:n,selectOption:i}}});const et=(0,p.A)(Ze,[["render",Ye],["__scopeId","data-v-370ed1e9"]]);var tt=et;const ot="https://api.themoviedb.org/3/discover/",nt={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${{NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_PROD_TMDB_API_KEY}`}};var it={name:"SearchMovie",methods:{faRotateRight(){return f.lLb}},components:{FontAwesomeIcon:h.gc,RkdButton:m,MovieScrollView:Ke,Filter:tt,Loading:te},setup(){const e=(0,l.Pj)(),t=(0,a.KR)([]),o=(0,a.KR)(1),n=(0,a.KR)(!0),r=(0,a.KR)(!1),s=(0,a.Kh)({}),u=(0,a.Kh)({"인기순":"popularity","이름순":"title","별점순":"vote_average","개봉순":"primary_release_date"}),c=(0,a.Kh)({"오름차순":"asc","내림차순":"desc"}),d=(0,i.EW)((()=>e.state.user.search)),v=(0,a.Kh)({genre:[],"vote avg":["0-2","2-4","4-6","6-8","8-10"],"sort by":["인기순","이름순","별점순"],"order by":["오름차순","내림차순"]}),p=()=>{e.state.user.search["genre"]="장르",e.state.user.search["vote avg"]="별점",e.state.user.search["sort by"]="기준",e.state.user.search["order by"]="순서",t.value=[],o.value=1,m(o.value)},g=()=>{const e="https://api.themoviedb.org/3/genre/movie/list?language=ko";fetch(e,nt).then((e=>e.json())).then((e=>{e["genres"].forEach((e=>{v["genre"].push(e["name"]),s[e["name"]]=e["id"]}))})).finally((()=>{m(o.value)}))},m=o=>{r.value=!0;const n="movie",i="ko",a=e.state.user.search["genre"],l=e.state.user.search["vote avg"],d=e.state.user.search["sort by"],v=e.state.user.search["order by"];let p=ot+`${n}?language=${i}&page=${o}`;if("장르"!==a&&s[a]&&(p+=`&with_genres=${s[a]}`),"별점"!==l){const e=l.split("-");p+=`&vote_average.gte=${e[0]}&vote_average.lte=${e[1]}`}if("기준"!==d&&"순서"!==v){const e=u[d],t=c[v];p+=`&sort_by=${e}.${t}`}fetch(p,nt).then((e=>e.json())).then((e=>{t.value.push(...e["results"])})).catch((e=>console.error(e))).finally((()=>{r.value=!1}))},h=()=>{window.scrollTo({top:0,behavior:"smooth"})},f=()=>{if(n.value){const e=window.scrollY,t=window.innerHeight,i=document.documentElement.scrollHeight;e+t>=i-5&&(n.value=!1,o.value++,m(o.value),setTimeout((()=>{n.value=!0}),1e3))}},k=n=>{e.dispatch("updateMovieSearchOption",n),t.value=[],o.value=1,m(o.value)};return(0,i.KC)((()=>{g()})),(0,i.sV)((async()=>{window.addEventListener("scroll",f)})),(0,i.xo)((()=>{window.removeEventListener("scroll",f)})),{movieItems:t,currentPage:o,isScrollListening:n,loading:r,genreId:s,sortParams:u,orderParams:c,selectedFilterOption:d,filters:v,resetFilters:p,getGenreList:g,fetchSearchedMovies:m,goTop:h,handleScroll:f,selectOption:k}}};const at=(0,p.A)(it,[["render",Ge],["__scopeId","data-v-1845c72e"]]);var rt=at;const st={class:"wishlist-container"};function lt(e,t,o,n,a,r){const s=(0,i.g2)("MovieScrollView");return(0,i.uX)(),(0,i.CE)("div",st,[t[0]||(t[0]=(0,i.Lk)("div",{class:"wishlist-view"},[(0,i.Lk)("h1",{class:"list-name"},"Wishlist"),(0,i.Lk)("div",{class:"margin-container"})],-1)),(0,i.bF)(s,{"go-top":n.goTop,"movie-items":n.wishlist,"show-info":!1},null,8,["go-top","movie-items"])])}var ut={name:"WishList",components:{MovieScrollView:Ke},setup(){const e=(0,l.Pj)(),t=(0,i.EW)((()=>Object.values(e.state.user.wishlist))),o=()=>{window.scrollTo({top:0,behavior:"smooth"})};return{wishlist:t,goTop:o}}};const ct=(0,p.A)(ut,[["render",lt],["__scopeId","data-v-1fa36fea"]]);var dt=ct;const vt={class:"login-container"},pt={class:"login-box"},gt={key:0,class:"input-box"},mt={class:"input-container"},ht={key:1,class:"input-box"},ft={class:"input-container"},kt={class:"action-buttons"},wt={class:"oauth-button"},bt={class:"toggle-button"};function _t(e,t,o,a,s,l){const u=(0,i.g2)("UserInput"),c=(0,i.g2)("RkdButton");return(0,i.uX)(),(0,i.CE)("div",vt,[t[7]||(t[7]=(0,i.Lk)("div",{class:"background"},null,-1)),(0,i.Lk)("div",pt,[(0,i.bF)(n.eB,{name:"slide-up",mode:"out-in"},{default:(0,i.k6)((()=>[a.isLogin?((0,i.uX)(),(0,i.CE)("div",gt,[t[1]||(t[1]=(0,i.Lk)("h1",null,"로그인",-1)),(0,i.bF)(u,{class:"input-container",placeholder:"아이디","input-field":a.userId,"input-type":"text",onOnChanged:a.onIdChanged},null,8,["input-field","onOnChanged"]),(0,i.bF)(u,{class:"input-container",placeholder:"비밀번호","input-field":a.userPw,"input-type":"password",onOnChanged:a.onPwChanged},null,8,["input-field","onOnChanged"]),(0,i.Lk)("div",mt,[(0,i.bF)(u,{placeholder:"로그인 정보 저장","input-field":a.rememberMe,"input-type":"checkbox",onOnChanged:a.onRememberMeChanged},null,8,["input-field","onOnChanged"]),t[0]||(t[0]=(0,i.Lk)("label",{for:"rememberMe"},"로그인 정보 저장",-1))])])):((0,i.uX)(),(0,i.CE)("div",ht,[t[3]||(t[3]=(0,i.Lk)("h1",null,"회원가입",-1)),(0,i.bF)(u,{class:"input-container",placeholder:"아이디","input-field":a.userId,"input-type":"text",onOnChanged:a.onIdChanged,"validation-message":a.emailError},null,8,["input-field","onOnChanged","validation-message"]),(0,i.bF)(u,{class:"input-container",placeholder:"비밀번호","input-field":a.userPw,"input-type":"password",onOnChanged:a.onPwChanged},null,8,["input-field","onOnChanged"]),(0,i.bF)(u,{class:"input-container",placeholder:"비밀번호 확인","input-field":a.userPwConfirm,"input-type":"password",onOnChanged:a.onPwConfirmChanged,"validation-message":a.pwError},null,8,["input-field","onOnChanged","validation-message"]),(0,i.Lk)("div",ft,[(0,i.bF)(u,{placeholder:"약관 동의","input-field":a.userConditionAgreement,"input-type":"checkbox",onOnChanged:a.onConditionAgreementChanged},null,8,["input-field","onOnChanged"]),t[2]||(t[2]=(0,i.Lk)("label",{for:"userConditionAgreement"},"약관 동의",-1))])]))])),_:1}),(0,i.Lk)("div",kt,[a.isLogin?((0,i.uX)(),(0,i.Wv)(c,{key:0,"on-click":a.LogIn,"width-size":200},{default:(0,i.k6)((()=>t[4]||(t[4]=[(0,i.eW)("로그인")]))),_:1},8,["on-click"])):(0,i.Q3)("",!0),(0,i.Lk)("div",wt,[a.isLogin?((0,i.uX)(),(0,i.Wv)(c,{key:0,"on-click":a.KakaoLogIn,"width-size":200},{default:(0,i.k6)((()=>t[5]||(t[5]=[(0,i.eW)("카카오 로그인")]))),_:1},8,["on-click"])):(0,i.Q3)("",!0)]),a.isLogin?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.Wv)(c,{key:1,"on-click":a.Register,"width-size":200},{default:(0,i.k6)((()=>t[6]||(t[6]=[(0,i.eW)("회원가입")]))),_:1},8,["on-click"]))]),(0,i.Lk)("div",bt,[(0,i.bF)(c,{"on-click":a.Toggle,"width-size":200},{default:(0,i.k6)((()=>[(0,i.eW)((0,r.v_)(a.buttonLabel[Number(!a.isLogin)])+"하기",1)])),_:1},8,["on-click"])])])])}o(4603),o(7566),o(8721);const yt=["type","placeholder"],It={key:0,style:{color:"red"}};function Lt(e,t,o,a,s,l){return(0,i.uX)(),(0,i.CE)("div",null,[(0,i.bo)((0,i.Lk)("input",{type:o.inputType,placeholder:o.placeholder,"onUpdate:modelValue":t[0]||(t[0]=e=>a.inputFieldRef=e)},null,8,yt),[[n.hp,a.inputFieldRef]]),o.validationMessage?((0,i.uX)(),(0,i.CE)("p",It,(0,r.v_)(o.validationMessage),1)):(0,i.Q3)("",!0)])}var Et={name:"UserInput",props:{placeholder:String,inputField:String,inputType:String,validationMessage:String},setup(e,{emit:t}){const o=(0,a.KR)(e.inputField);return(0,i.wB)(o,(()=>{t("onChanged",[o])})),{inputFieldRef:o}}};const Ct=(0,p.A)(Et,[["render",Lt],["__scopeId","data-v-7f5a1226"]]);var St=Ct,Ot={name:"SignIn",components:{RkdButton:m,UserInput:St},setup(){const e=(0,l.Pj)(),t=(0,u.rd)(),o=(0,R.useToast)({position:window.innerWidth>768?"bottom-right":"bottom"}),n=(0,a.KR)(!0),r=(0,a.KR)(["회원가입","로그인"]),s=(0,a.KR)(""),c=(0,a.KR)(""),d=(0,a.KR)(""),v=(0,a.KR)(!1),p=(0,a.KR)(!1),g=(0,a.KR)(""),m=(0,a.KR)("");let h={NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_DEV_KAKAO_CLIENT_ID,f={NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_DEV_KAKAO_REDIRECT_URI;h={NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_PROD_KAKAO_CLIENT_ID,f={NODE_ENV:"production",BASE_URL:"/rkdflix/"}.VUE_APP_PROD_KAKAO_REDIRECT_URI;const k=()=>{const e="https://kauth.kakao.com/oauth/authorize?client_id="+h+"&redirect_uri="+f+"&response_type=code&scope=profile_nickname";window.location.href=e},w=async e=>{try{const t=await fetch("https://kapi.kakao.com/v2/user/me",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:`Bearer ${e}`}}),o=await t.json();return o}catch(t){return o.error("토큰 요청 중 오류가 발생했습니다."),console.error("토큰 요청 중 오류 발생:",t),t}},b=()=>{if(!navigator.onLine)return;if(g.value)return void o.error(g.value);if(!s.value)return void o.error("아이디를 입력해주세요.");if(!c.value)return void o.error("비밀번호를 입력해주세요.");const n=JSON.parse(localStorage.getItem(s.value));if(n&&c.value===n["password"]){if(v.value){const e={id:s.value,password:c.value};localStorage.setItem("remember_me",JSON.stringify(e))}o.success("로그인 성공!"),e.commit("setUser",{userId:s.value,password:n["password"],wishlist:n["wishlist"],search:n["search"],nickname:n["nickname"]}),t.push("/")}else o.error("비밀번호가 일치하지 않습니다.")},_=()=>{n.value=!n.value,s.value="",c.value="",d.value="",p.value=!1},y=(n,i)=>{let a=JSON.parse(localStorage.getItem(n));if(a)o.success("로그인 성공!");else{o.success("회원가입 성공!");const e={password:"kakao",wishlist:{},search:{genre:"장르","vote avg":"별점","sort by":"기준","order by":"순서"},nickname:i};localStorage.setItem(n,JSON.stringify(e)),a=JSON.parse(localStorage.getItem(n))}e.commit("setUser",{userId:n,password:a["password"],wishlist:a["wishlist"],search:a["search"],nickname:a["nickname"]});const r={id:n,password:"kakao"};localStorage.setItem("remember_me",JSON.stringify(r)),t.push("/")},I=()=>{if(g.value)return void o.error(g.value);if(m.value)return void o.error(m.value);if(!s.value)return void o.error("아이디를 입력해주세요.");if(!c.value)return void o.error("비밀번호를 입력해주세요.");if(!p.value)return void o.error("약관에 동의해주세요.");if(localStorage.getItem(s.value))return void o.error("존재하는 아이디입니다.");o.success("회원가입 성공!");const e={password:c.value,wishlist:{},search:{genre:"장르","vote avg":"별점","sort by":"기준","order by":"순서"}};localStorage.setItem(s.value,JSON.stringify(e)),_()},L=e=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,o=(0,a.KR)(e.value&&!t.test(e.value)?"유효한 이메일 형식이 아닙니다.":"");return o.value},E=e=>{s.value=e[0].value,g.value=L(s)},C=(e,t)=>{const o=(0,a.KR)(e.value!==t.value?"비밀번호가 다릅니다.":"");return o.value},S=e=>{c.value=e[0].value,m.value=C(c,d)},O=e=>{d.value=e[0].value,m.value=C(c,d)},P=e=>{v.value=e[0].value},F=e=>{p.value=e[0].value};return(0,i.sV)((async()=>{const e=JSON.parse(localStorage.getItem("remember_me"));if(e)s.value=e["id"],c.value=e["password"],b();else{const e=new URLSearchParams(window.location.search),i=e.get("code");if(i)try{const e=await fetch("https://kauth.kakao.com/oauth/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"authorization_code",client_id:h,redirect_uri:f,code:i})}),t=await e.json();if(200==e.status){if(t.access_token){const e=await w(t.access_token);localStorage.setItem("access_token",t.access_token),console.log(e.id),console.log(e.properties.nickname),y(e.id,e.properties.nickname)}}else o.error(e.statusText)}catch(n){navigator.onLine||(console.error("네트워크 연결 오류:",n),o.error("네트워크 연결에 문제가 있습니다. 인터넷을 확인하세요."),t.push("/error")),console.error("API 호출 오류:",n),o.error("API 호출 중 오류가 발생했습니다.")}window.history.replaceState({},"","/rkdflix/")}})),{isLogin:n,buttonLabel:r,userId:s,userPw:c,userPwConfirm:d,rememberMe:v,userConditionAgreement:p,emailError:g,pwError:m,Toggle:_,LogIn:b,KakaoLogIn:k,Register:I,validateEmail:L,onIdChanged:E,onPwChanged:S,onPwConfirmChanged:O,onRememberMeChanged:P,onConditionAgreementChanged:F}}};const Rt=(0,p.A)(Ot,[["render",_t],["__scopeId","data-v-cf29f484"]]);var Pt=Rt;const Ft={class:"error-page"};function At(e,t,o,n,a,r){const s=(0,i.g2)("RkdButton");return(0,i.uX)(),(0,i.CE)("div",Ft,[t[1]||(t[1]=(0,i.Lk)("h1",null,"네트워크 연결 문제",-1)),t[2]||(t[2]=(0,i.Lk)("p",null,"인터넷 연결이 끊어졌습니다. 연결을 확인한 후 다시 시도해주세요.",-1)),(0,i.bF)(s,{onClick:r.reloadPage},{default:(0,i.k6)((()=>t[0]||(t[0]=[(0,i.eW)("다시 시도")]))),_:1},8,["onClick"])])}var Mt={name:"ErrorPage",components:{RkdButton:m},methods:{reloadPage(){window.location.reload()}}};const Kt=(0,p.A)(Mt,[["render",At],["__scopeId","data-v-113f2c3a"]]);var xt=Kt;const Wt=[{path:"/",component:fe},{path:"/popular",component:$e},{path:"/search",component:rt},{path:"/wishlist",component:dt},{path:"/sign-in",component:Pt},{path:"/error",name:"ErrorPage",component:xt}],Tt=(0,u.aE)({history:(0,u.sC)(),routes:Wt}),Bt=(0,l.y$)({state(){return{user:{userId:null,password:null,wishlist:{},search:{genre:"장르","vote avg":"별점","sort by":"기준","order by":"순서"},nickname:null}}},mutations:{setUser(e,t){e.user=t},toggleToWishlist(e,t){const o=t["id"];e.user.wishlist[o]?delete e.user.wishlist[o]:e.user.wishlist[o]=t},updateSearchOption(e,{key:t,value:o}){e.user.search[t]=o}},actions:{toggleMovieInWishlist({commit:e},t){e("toggleToWishlist",t);const o=Bt.state.user.userId,n={password:Bt.state.user.password,wishlist:Bt.state.user.wishlist,search:Bt.state.user.search,nickname:Bt.state.user.nickname};localStorage.setItem(o,JSON.stringify(n))},updateMovieSearchOption({commit:e},t){const o=t[0],n=t[1];console.log(o),e("updateSearchOption",{key:o,value:n});const i=Bt.state.user.userId,a={password:Bt.state.user.password,wishlist:Bt.state.user.wishlist,search:Bt.state.user.search,nickname:Bt.state.user.nickname};localStorage.setItem(i,JSON.stringify(a))}}});(0,n.Ef)(O).use(Tt).use(Bt).use(P()).mount("#app")}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,i,a){if(!n){var r=1/0;for(c=0;c<e.length;c++){n=e[c][0],i=e[c][1],a=e[c][2];for(var s=!0,l=0;l<n.length;l++)(!1&a||r>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(s=!1,a<r&&(r=a));if(s){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,i,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/rkdflix/"}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,r=n[0],s=n[1],l=n[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(i in s)o.o(s,i)&&(o.m[i]=s[i]);if(l)var c=l(o)}for(t&&t(n);u<r.length;u++)a=r[u],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},n=self["webpackChunkrkdflix"]=self["webpackChunkrkdflix"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[504],(function(){return o(5139)}));n=o.O(n)})();
//# sourceMappingURL=app.8e342149.js.map