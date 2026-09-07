(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const dt="resolveiq_jwt",ut="resolveiq_user";class nr{constructor(){this.token=localStorage.getItem(dt)||null;try{this.user=JSON.parse(localStorage.getItem(ut))||null}catch{this.user=null}this.listeners=[]}isAuthenticated(){return!!this.token}getToken(){return this.token}getUser(){return this.user}getRole(){return this.user?this.user.role:null}getEmail(){return this.user?this.user.email:null}login(t,n,i){this.token=t,this.user={email:n,role:i},localStorage.setItem(dt,t),localStorage.setItem(ut,JSON.stringify(this.user)),this.notify()}logout(){this.token=null,this.user=null,localStorage.removeItem(dt),localStorage.removeItem(ut),this.notify()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(n=>n!==t)}}notify(){this.listeners.forEach(t=>t(this.user))}}const $=new nr;class ir{constructor(){this.container=null}init(){this.container=document.getElementById("toast-container")}show(t,n="info",i=4e3){if(!this.container&&(this.init(),!this.container))return;const r=document.createElement("div");r.className=`toast toast-${n}`;let o="";n==="success"?o='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>':n==="error"?o='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':n==="warning"?o='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>':o='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',r.innerHTML=`
      <div style="flex-shrink:0;display:flex;align-items:center;">${o}</div>
      <div style="flex-grow:1;line-height:1.4;">${rr(t)}</div>
    `,this.container.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateY(-10px)",setTimeout(()=>r.remove(),250)},i)}success(t){this.show(t,"success")}error(t){this.show(t,"error",5e3)}warning(t){this.show(t,"warning")}info(t){this.show(t,"info")}}function rr(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}const y=new ir;function Ze(e){if(!e)return"";const t=e.replace("_"," ");return`
    <span class="badge badge-status-${e}">
      <span class="badge-dot"></span>
      ${t}
    </span>
  `}function et(e){return e?`
    <span class="badge badge-priority-${e}">
      ${e}
    </span>
  `:""}function tt(e){return e?`
    <span class="badge badge-category">
      ${e.toLowerCase()}
    </span>
  `:""}function jn(e){return e?`
    <span class="badge badge-role-${e}">
      ${e}
    </span>
  `:""}function de(){const e=$.isAuthenticated(),t=$.getRole(),n=$.getEmail();let i="#/";return t==="ADMIN"?i="#/admin":t==="AGENT"?i="#/agent":t==="CUSTOMER"&&(i="#/customer"),`
    <header class="landing-navbar">
      <div class="container landing-nav-inner">
        <a href="${e?i:"#/"}" class="brand-logo">
          <div class="brand-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <span>Resolve<strong style="color:var(--primary-400);">IQ</strong></span>
          ${e&&t?jn(t):""}
        </a>

        <nav class="nav-links">
          ${e?`
            <a href="${i}" class="nav-link">Workspace</a>
            ${t==="ADMIN"?'<a href="#/admin" class="nav-link">Engine Telemetry</a>':""}
          `:`
            <a href="#how-it-works" class="nav-link">How It Works</a>
            <a href="#roles" class="nav-link">Role Experience</a>
            <a href="#architecture" class="nav-link">Architecture</a>
            <a href="#tech" class="nav-link">Technology</a>
          `}
        </nav>

        <div class="flex items-center gap-3">
          ${e?`
            <div class="user-profile-summary" style="margin-right:0.5rem;">
              <div class="user-avatar">${n?n[0].toUpperCase():"U"}</div>
              <div class="user-info-text">
                <span class="user-email-text">${sr(n)}</span>
              </div>
            </div>
            <button id="nav-logout-btn" class="btn btn-secondary btn-sm" title="Sign Out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          `:`
            <a href="#/login" class="btn btn-secondary btn-sm">Sign In</a>
            <a href="#/signup" class="btn btn-primary btn-sm">Get Started</a>
          `}
        </div>
      </div>
    </header>
  `}function ue(){const e=document.getElementById("nav-logout-btn");e&&e.addEventListener("click",()=>{$.logout(),window.location.hash="#/login"})}function sr(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}var or=typeof globalThis<"u"?globalThis:typeof window<"u"||typeof window<"u"?window:typeof self<"u"?self:{};function ar(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var At={exports:{}};(function(e,t){(function(n,i){i(t)})(or,function(n){function i(v,s){v.terminate=function(){const c=()=>{};this.onerror=c,this.onmessage=c,this.onopen=c;const l=new Date,m=Math.random().toString().substring(2,8),f=this.onclose;this.onclose=C=>{const x=new Date().getTime()-l.getTime();s(`Discarded socket (#${m})  closed after ${x}ms, with code/reason: ${C.code}/${C.reason}`)},this.close(),f==null||f.call(v,{code:4001,reason:`Quick discarding socket (#${m}) without waiting for the shutdown sequence.`,wasClean:!1})}}const r={LF:`
`,NULL:"\0"};class o{get body(){return!this._body&&this.isBinaryBody&&(this._body=new TextDecoder().decode(this._binaryBody)),this._body||""}get binaryBody(){return!this._binaryBody&&!this.isBinaryBody&&(this._binaryBody=new TextEncoder().encode(this._body)),this._binaryBody}constructor(s){const{command:c,headers:l,body:m,binaryBody:f,escapeHeaderValues:C,skipContentLengthHeader:x}=s;this.command=c,this.headers=Object.assign({},l||{}),f?(this._binaryBody=f,this.isBinaryBody=!0):(this._body=m||"",this.isBinaryBody=!1),this.escapeHeaderValues=C||!1,this.skipContentLengthHeader=x||!1}static fromRawFrame(s,c){const l={},m=f=>f.replace(/^\s+|\s+$/g,"");for(const f of s.headers.reverse()){f.indexOf(":");const C=m(f[0]);let x=m(f[1]);c&&s.command!=="CONNECT"&&s.command!=="CONNECTED"&&(x=o.hdrValueUnEscape(x)),l[C]=x}return new o({command:s.command,headers:l,binaryBody:s.binaryBody,escapeHeaderValues:c})}toString(){return this.serializeCmdAndHeaders()}serialize(){const s=this.serializeCmdAndHeaders();return this.isBinaryBody?o.toUnit8Array(s,this._binaryBody).buffer:s+this._body+r.NULL}serializeCmdAndHeaders(){const s=[this.command];this.skipContentLengthHeader&&delete this.headers["content-length"];for(const c of Object.keys(this.headers||{})){const l=this.headers[c];this.escapeHeaderValues&&this.command!=="CONNECT"&&this.command!=="CONNECTED"?s.push(`${c}:${o.hdrValueEscape(`${l}`)}`):s.push(`${c}:${l}`)}return(this.isBinaryBody||!this.isBodyEmpty()&&!this.skipContentLengthHeader)&&s.push(`content-length:${this.bodyLength()}`),s.join(r.LF)+r.LF+r.LF}isBodyEmpty(){return this.bodyLength()===0}bodyLength(){const s=this.binaryBody;return s?s.length:0}static sizeOfUTF8(s){return s?new TextEncoder().encode(s).length:0}static toUnit8Array(s,c){const l=new TextEncoder().encode(s),m=new Uint8Array([0]),f=new Uint8Array(l.length+c.length+m.length);return f.set(l),f.set(c,l.length),f.set(m,l.length+c.length),f}static marshall(s){return new o(s).serialize()}static hdrValueEscape(s){return s.replace(/\\/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/:/g,"\\c")}static hdrValueUnEscape(s){return s.replace(/\\r/g,"\r").replace(/\\n/g,`
`).replace(/\\c/g,":").replace(/\\\\/g,"\\")}}const a=0,d=10,h=13,p=58;class k{constructor(s,c){this.onFrame=s,this.onIncomingPing=c,this._encoder=new TextEncoder,this._decoder=new TextDecoder,this._token=[],this._initState()}parseChunk(s,c=!1){let l;if(typeof s=="string"?l=this._encoder.encode(s):l=new Uint8Array(s),c&&l[l.length-1]!==0){const m=new Uint8Array(l.length+1);m.set(l,0),m[l.length]=0,l=m}for(let m=0;m<l.length;m++){const f=l[m];this._onByte(f)}}_collectFrame(s){if(s!==a&&s!==h){if(s===d){this.onIncomingPing();return}this._onByte=this._collectCommand,this._reinjectByte(s)}}_collectCommand(s){if(s!==h){if(s===d){this._results.command=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaders;return}this._consumeByte(s)}}_collectHeaders(s){if(s!==h){if(s===d){this._setupCollectBody();return}this._onByte=this._collectHeaderKey,this._reinjectByte(s)}}_reinjectByte(s){this._onByte(s)}_collectHeaderKey(s){if(s===p){this._headerKey=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaderValue;return}this._consumeByte(s)}_collectHeaderValue(s){if(s!==h){if(s===d){this._results.headers.push([this._headerKey,this._consumeTokenAsUTF8()]),this._headerKey=void 0,this._onByte=this._collectHeaders;return}this._consumeByte(s)}}_setupCollectBody(){const s=this._results.headers.filter(c=>c[0]==="content-length")[0];s?(this._bodyBytesRemaining=parseInt(s[1],10),this._onByte=this._collectBodyFixedSize):this._onByte=this._collectBodyNullTerminated}_collectBodyNullTerminated(s){if(s===a){this._retrievedBody();return}this._consumeByte(s)}_collectBodyFixedSize(s){if(this._bodyBytesRemaining--===0){this._retrievedBody();return}this._consumeByte(s)}_retrievedBody(){this._results.binaryBody=this._consumeTokenAsRaw();try{this.onFrame(this._results)}catch(s){console.log("Ignoring an exception thrown by a frame handler. Original exception: ",s)}this._initState()}_consumeByte(s){this._token.push(s)}_consumeTokenAsUTF8(){return this._decoder.decode(this._consumeTokenAsRaw())}_consumeTokenAsRaw(){const s=new Uint8Array(this._token);return this._token=[],s}_initState(){this._results={command:void 0,headers:[],binaryBody:void 0},this._token=[],this._headerKey=void 0,this._onByte=this._collectFrame}}n.StompSocketState=void 0,function(v){v[v.CONNECTING=0]="CONNECTING",v[v.OPEN=1]="OPEN",v[v.CLOSING=2]="CLOSING",v[v.CLOSED=3]="CLOSED"}(n.StompSocketState||(n.StompSocketState={})),n.ActivationState=void 0,function(v){v[v.ACTIVE=0]="ACTIVE",v[v.DEACTIVATING=1]="DEACTIVATING",v[v.INACTIVE=2]="INACTIVE"}(n.ActivationState||(n.ActivationState={})),n.ReconnectionTimeMode=void 0,function(v){v[v.LINEAR=0]="LINEAR",v[v.EXPONENTIAL=1]="EXPONENTIAL"}(n.ReconnectionTimeMode||(n.ReconnectionTimeMode={})),n.TickerStrategy=void 0,function(v){v.Interval="interval",v.Worker="worker"}(n.TickerStrategy||(n.TickerStrategy={}));class u{constructor(s,c=n.TickerStrategy.Interval,l){this._interval=s,this._strategy=c,this._debug=l,this._workerScript=`
    var startTime = Date.now();
    setInterval(function() {
        self.postMessage(Date.now() - startTime);
    }, ${this._interval});
  `}start(s){this.stop(),this.shouldUseWorker()?this.runWorker(s):this.runInterval(s)}stop(){this.disposeWorker(),this.disposeInterval()}shouldUseWorker(){return typeof Worker<"u"&&this._strategy===n.TickerStrategy.Worker}runWorker(s){this._debug("Using runWorker for outgoing pings"),this._worker||(this._worker=new Worker(URL.createObjectURL(new Blob([this._workerScript],{type:"text/javascript"}))),this._worker.onmessage=c=>s(c.data))}runInterval(s){if(this._debug("Using runInterval for outgoing pings"),!this._timer){const c=Date.now();this._timer=setInterval(()=>{s(Date.now()-c)},this._interval)}}disposeWorker(){this._worker&&(this._worker.terminate(),delete this._worker,this._debug("Outgoing ping disposeWorker"))}disposeInterval(){this._timer&&(clearInterval(this._timer),delete this._timer,this._debug("Outgoing ping disposeInterval"))}}class g{constructor(s){this.versions=s}supportedVersions(){return this.versions.join(",")}protocolVersions(){return this.versions.map(s=>`v${s.replace(".","")}.stomp`)}}g.V1_0="1.0",g.V1_1="1.1",g.V1_2="1.2",g.default=new g([g.V1_2,g.V1_1,g.V1_0]);class S{get connectedVersion(){return this._connectedVersion}get connected(){return this._connected}constructor(s,c,l){this._client=s,this._webSocket=c,this._connected=!1,this._serverFrameHandlers={CONNECTED:m=>{this.debug(`connected to server ${m.headers.server}`),this._connected=!0,this._connectedVersion=m.headers.version,this._connectedVersion===g.V1_2&&(this._escapeHeaderValues=!0),this._setupHeartbeat(m.headers),this.onConnect(m)},MESSAGE:m=>{const f=m.headers.subscription,C=this._subscriptions[f]||this.onUnhandledMessage,x=m,O=this,P=this._connectedVersion===g.V1_2?x.headers.ack:x.headers["message-id"];x.ack=(ce={})=>O.ack(P,f,ce),x.nack=(ce={})=>O.nack(P,f,ce),C(x)},RECEIPT:m=>{const f=this._receiptWatchers[m.headers["receipt-id"]];f?(f(m),delete this._receiptWatchers[m.headers["receipt-id"]]):this.onUnhandledReceipt(m)},ERROR:m=>{this.onStompError(m)}},this._counter=0,this._subscriptions={},this._receiptWatchers={},this._partialData="",this._escapeHeaderValues=!1,this._lastServerActivityTS=Date.now(),this.debug=l.debug,this.stompVersions=l.stompVersions,this.connectHeaders=l.connectHeaders,this.disconnectHeaders=l.disconnectHeaders,this.heartbeatIncoming=l.heartbeatIncoming,this.heartbeatToleranceMultiplier=l.heartbeatGracePeriods,this.heartbeatOutgoing=l.heartbeatOutgoing,this.splitLargeFrames=l.splitLargeFrames,this.maxWebSocketChunkSize=l.maxWebSocketChunkSize,this.forceBinaryWSFrames=l.forceBinaryWSFrames,this.logRawCommunication=l.logRawCommunication,this.appendMissingNULLonIncoming=l.appendMissingNULLonIncoming,this.discardWebsocketOnCommFailure=l.discardWebsocketOnCommFailure,this.onConnect=l.onConnect,this.onDisconnect=l.onDisconnect,this.onStompError=l.onStompError,this.onWebSocketClose=l.onWebSocketClose,this.onWebSocketError=l.onWebSocketError,this.onUnhandledMessage=l.onUnhandledMessage,this.onUnhandledReceipt=l.onUnhandledReceipt,this.onUnhandledFrame=l.onUnhandledFrame,this.onHeartbeatReceived=l.onHeartbeatReceived,this.onHeartbeatLost=l.onHeartbeatLost}start(){const s=new k(l=>{const m=o.fromRawFrame(l,this._escapeHeaderValues);this.logRawCommunication||this.debug(`<<< ${m}`),(this._serverFrameHandlers[m.command]||this.onUnhandledFrame)(m)},()=>{this.debug("<<< PONG"),this.onHeartbeatReceived()});this._webSocket.onmessage=l=>{if(this.debug("Received data"),this._lastServerActivityTS=Date.now(),this.logRawCommunication){const m=l.data instanceof ArrayBuffer?new TextDecoder().decode(l.data):l.data;this.debug(`<<< ${m}`)}s.parseChunk(l.data,this.appendMissingNULLonIncoming)},this._webSocket.onclose=l=>{this.debug(`Connection closed to ${this._webSocket.url}`),this._cleanUp(),this.onWebSocketClose(l)},this._webSocket.onerror=l=>{this.onWebSocketError(l)};const c=()=>{const l=Object.assign({},this.connectHeaders);this.debug("Web Socket Opened..."),l["accept-version"]=this.stompVersions.supportedVersions(),l["heart-beat"]=[this.heartbeatOutgoing,this.heartbeatIncoming].join(","),this._transmit({command:"CONNECT",headers:l})};this._webSocket.readyState===n.StompSocketState.OPEN?c():this._webSocket.onopen=c}_setupHeartbeat(s){if(s.version!==g.V1_1&&s.version!==g.V1_2||!s["heart-beat"])return;const[c,l]=s["heart-beat"].split(",").map(m=>parseInt(m,10));if(this.heartbeatOutgoing!==0&&l!==0){const m=Math.max(this.heartbeatOutgoing,l);this.debug(`send PING every ${m}ms`),this._pinger=new u(m,this._client.heartbeatStrategy,this.debug),this._pinger.start(()=>{this._webSocket.readyState===n.StompSocketState.OPEN&&(this._webSocket.send(r.LF),this.debug(">>> PING"))})}if(this.heartbeatIncoming!==0&&c!==0){const m=Math.max(this.heartbeatIncoming,c);this.debug(`check PONG every ${m}ms`),this._ponger=setInterval(()=>{const f=Date.now()-this._lastServerActivityTS;f>m*this.heartbeatToleranceMultiplier&&(this.debug(`did not receive server activity for the last ${f}ms`),this.onHeartbeatLost(),this._closeOrDiscardWebsocket())},m)}}_closeOrDiscardWebsocket(){this.discardWebsocketOnCommFailure?(this.debug("Discarding websocket, the underlying socket may linger for a while"),this.discardWebsocket()):(this.debug("Issuing close on the websocket"),this._closeWebsocket())}forceDisconnect(){this._webSocket&&(this._webSocket.readyState===n.StompSocketState.CONNECTING||this._webSocket.readyState===n.StompSocketState.OPEN)&&this._closeOrDiscardWebsocket()}_closeWebsocket(){this._webSocket.onmessage=()=>{},this._webSocket.close()}discardWebsocket(){typeof this._webSocket.terminate!="function"&&i(this._webSocket,s=>this.debug(s)),this._webSocket.terminate()}_transmit(s){const{command:c,headers:l,body:m,binaryBody:f,skipContentLengthHeader:C}=s,x=new o({command:c,headers:l,body:m,binaryBody:f,escapeHeaderValues:this._escapeHeaderValues,skipContentLengthHeader:C});let O=x.serialize();if(this.logRawCommunication?this.debug(`>>> ${O}`):this.debug(`>>> ${x}`),this.forceBinaryWSFrames&&typeof O=="string"&&(O=new TextEncoder().encode(O)),typeof O!="string"||!this.splitLargeFrames)this._webSocket.send(O);else{let P=O;for(;P.length>0;){const ce=P.substring(0,this.maxWebSocketChunkSize);P=P.substring(this.maxWebSocketChunkSize),this._webSocket.send(ce),this.debug(`chunk sent = ${ce.length}, remaining = ${P.length}`)}}}dispose(){if(this.connected)try{const s=Object.assign({},this.disconnectHeaders);s.receipt||(s.receipt=`close-${this._counter++}`),this.watchForReceipt(s.receipt,c=>{this._closeWebsocket(),this._cleanUp(),this.onDisconnect(c)}),this._transmit({command:"DISCONNECT",headers:s})}catch(s){this.debug(`Ignoring error during disconnect ${s}`)}else(this._webSocket.readyState===n.StompSocketState.CONNECTING||this._webSocket.readyState===n.StompSocketState.OPEN)&&this._closeWebsocket()}_cleanUp(){this._connected=!1,this._pinger&&(this._pinger.stop(),this._pinger=void 0),this._ponger&&(clearInterval(this._ponger),this._ponger=void 0)}publish(s){const{destination:c,headers:l,body:m,binaryBody:f,skipContentLengthHeader:C}=s,x=Object.assign({destination:c},l);this._transmit({command:"SEND",headers:x,body:m,binaryBody:f,skipContentLengthHeader:C})}watchForReceipt(s,c){this._receiptWatchers[s]=c}subscribe(s,c,l={}){l=Object.assign({},l),l.id||(l.id=`sub-${this._counter++}`),l.destination=s,this._subscriptions[l.id]=c,this._transmit({command:"SUBSCRIBE",headers:l});const m=this;return{id:l.id,unsubscribe(f){return m.unsubscribe(l.id,f)}}}unsubscribe(s,c={}){c=Object.assign({},c),delete this._subscriptions[s],c.id=s,this._transmit({command:"UNSUBSCRIBE",headers:c})}begin(s){const c=s||`tx-${this._counter++}`;this._transmit({command:"BEGIN",headers:{transaction:c}});const l=this;return{id:c,commit(){l.commit(c)},abort(){l.abort(c)}}}commit(s){this._transmit({command:"COMMIT",headers:{transaction:s}})}abort(s){this._transmit({command:"ABORT",headers:{transaction:s}})}ack(s,c,l={}){l=Object.assign({},l),this._connectedVersion===g.V1_2?l.id=s:l["message-id"]=s,l.subscription=c,this._transmit({command:"ACK",headers:l})}nack(s,c,l={}){return l=Object.assign({},l),this._connectedVersion===g.V1_2?l.id=s:l["message-id"]=s,l.subscription=c,this._transmit({command:"NACK",headers:l})}}class T{get webSocket(){var s;return(s=this._stompHandler)==null?void 0:s._webSocket}get disconnectHeaders(){return this._disconnectHeaders}set disconnectHeaders(s){this._disconnectHeaders=s,this._stompHandler&&(this._stompHandler.disconnectHeaders=this._disconnectHeaders)}get connected(){return!!this._stompHandler&&this._stompHandler.connected}get connectedVersion(){return this._stompHandler?this._stompHandler.connectedVersion:void 0}get active(){return this.state===n.ActivationState.ACTIVE}_changeState(s){this.state=s,this.onChangeState(s)}constructor(s={}){this.stompVersions=g.default,this.connectionTimeout=0,this.reconnectDelay=5e3,this._nextReconnectDelay=0,this.maxReconnectDelay=15*60*1e3,this.reconnectTimeMode=n.ReconnectionTimeMode.LINEAR,this.heartbeatIncoming=1e4,this.heartbeatToleranceMultiplier=2,this.heartbeatOutgoing=1e4,this.heartbeatStrategy=n.TickerStrategy.Interval,this.splitLargeFrames=!1,this.maxWebSocketChunkSize=8*1024,this.forceBinaryWSFrames=!1,this.appendMissingNULLonIncoming=!1,this.discardWebsocketOnCommFailure=!1,this.state=n.ActivationState.INACTIVE;const c=()=>{};this.debug=c,this.beforeConnect=c,this.onConnect=c,this.onDisconnect=c,this.onUnhandledMessage=c,this.onUnhandledReceipt=c,this.onUnhandledFrame=c,this.onHeartbeatReceived=c,this.onHeartbeatLost=c,this.onStompError=c,this.onWebSocketClose=c,this.onWebSocketError=c,this.logRawCommunication=!1,this.onChangeState=c,this.connectHeaders={},this._disconnectHeaders={},this.configure(s)}configure(s){Object.assign(this,s),this.maxReconnectDelay>0&&this.maxReconnectDelay<this.reconnectDelay&&(this.debug(`Warning: maxReconnectDelay (${this.maxReconnectDelay}ms) is less than reconnectDelay (${this.reconnectDelay}ms). Using reconnectDelay as the maxReconnectDelay delay.`),this.maxReconnectDelay=this.reconnectDelay)}activate(){const s=()=>{if(this.active){this.debug("Already ACTIVE, ignoring request to activate");return}this._changeState(n.ActivationState.ACTIVE),this._nextReconnectDelay=this.reconnectDelay,this._connect()};this.state===n.ActivationState.DEACTIVATING?(this.debug("Waiting for deactivation to finish before activating"),this.deactivate().then(()=>{s()})):s()}async _connect(){if(await this.beforeConnect(this),this._stompHandler){this.debug("There is already a stompHandler, skipping the call to connect");return}if(!this.active){this.debug("Client has been marked inactive, will not attempt to connect");return}this.connectionTimeout>0&&(this._connectionWatcher&&clearTimeout(this._connectionWatcher),this._connectionWatcher=setTimeout(()=>{this.connected||(this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`),this.forceDisconnect())},this.connectionTimeout)),this.debug("Opening Web Socket...");const s=this._createWebSocket();this._stompHandler=new S(this,s,{debug:this.debug,stompVersions:this.stompVersions,connectHeaders:this.connectHeaders,disconnectHeaders:this._disconnectHeaders,heartbeatIncoming:this.heartbeatIncoming,heartbeatGracePeriods:this.heartbeatToleranceMultiplier,heartbeatOutgoing:this.heartbeatOutgoing,heartbeatStrategy:this.heartbeatStrategy,splitLargeFrames:this.splitLargeFrames,maxWebSocketChunkSize:this.maxWebSocketChunkSize,forceBinaryWSFrames:this.forceBinaryWSFrames,logRawCommunication:this.logRawCommunication,appendMissingNULLonIncoming:this.appendMissingNULLonIncoming,discardWebsocketOnCommFailure:this.discardWebsocketOnCommFailure,onConnect:c=>{if(this._connectionWatcher&&(clearTimeout(this._connectionWatcher),this._connectionWatcher=void 0),this._nextReconnectDelay=this.reconnectDelay,!this.active){this.debug("STOMP got connected while deactivate was issued, will disconnect now"),this._disposeStompHandler();return}this.onConnect(c)},onDisconnect:c=>{this.onDisconnect(c)},onStompError:c=>{this.onStompError(c)},onWebSocketClose:c=>{this._stompHandler=void 0,this.state===n.ActivationState.DEACTIVATING&&this._changeState(n.ActivationState.INACTIVE),this.onWebSocketClose(c),this.active&&this._schedule_reconnect()},onWebSocketError:c=>{this.onWebSocketError(c)},onUnhandledMessage:c=>{this.onUnhandledMessage(c)},onUnhandledReceipt:c=>{this.onUnhandledReceipt(c)},onUnhandledFrame:c=>{this.onUnhandledFrame(c)},onHeartbeatReceived:()=>{this.onHeartbeatReceived()},onHeartbeatLost:()=>{this.onHeartbeatLost()}}),this._stompHandler.start()}_createWebSocket(){let s;if(this.webSocketFactory)s=this.webSocketFactory();else if(this.brokerURL)s=new WebSocket(this.brokerURL,this.stompVersions.protocolVersions());else throw new Error("Either brokerURL or webSocketFactory must be provided");return s.binaryType="arraybuffer",s}_schedule_reconnect(){this._nextReconnectDelay>0&&(this.debug(`STOMP: scheduling reconnection in ${this._nextReconnectDelay}ms`),this._reconnector=setTimeout(()=>{this.reconnectTimeMode===n.ReconnectionTimeMode.EXPONENTIAL&&(this._nextReconnectDelay=this._nextReconnectDelay*2,this.maxReconnectDelay!==0&&(this._nextReconnectDelay=Math.min(this._nextReconnectDelay,this.maxReconnectDelay))),this._connect()},this._nextReconnectDelay))}async deactivate(s={}){var f;const c=s.force||!1,l=this.active;let m;if(this.state===n.ActivationState.INACTIVE)return this.debug("Already INACTIVE, nothing more to do"),Promise.resolve();if(this._changeState(n.ActivationState.DEACTIVATING),this._nextReconnectDelay=0,this._reconnector&&(clearTimeout(this._reconnector),this._reconnector=void 0),this._stompHandler&&this.webSocket.readyState!==n.StompSocketState.CLOSED){const C=this._stompHandler.onWebSocketClose;m=new Promise((x,O)=>{this._stompHandler.onWebSocketClose=P=>{C(P),x()}})}else return this._changeState(n.ActivationState.INACTIVE),Promise.resolve();return c?(f=this._stompHandler)==null||f.discardWebsocket():l&&this._disposeStompHandler(),m}forceDisconnect(){this._stompHandler&&this._stompHandler.forceDisconnect()}_disposeStompHandler(){this._stompHandler&&this._stompHandler.dispose()}publish(s){this._checkConnection(),this._stompHandler.publish(s)}_checkConnection(){if(!this.connected)throw new TypeError("There is no underlying STOMP connection")}watchForReceipt(s,c){this._checkConnection(),this._stompHandler.watchForReceipt(s,c)}subscribe(s,c,l={}){return this._checkConnection(),this._stompHandler.subscribe(s,c,l)}unsubscribe(s,c={}){this._checkConnection(),this._stompHandler.unsubscribe(s,c)}begin(s){return this._checkConnection(),this._stompHandler.begin(s)}commit(s){this._checkConnection(),this._stompHandler.commit(s)}abort(s){this._checkConnection(),this._stompHandler.abort(s)}ack(s,c,l={}){this._checkConnection(),this._stompHandler.ack(s,c,l)}nack(s,c,l={}){this._checkConnection(),this._stompHandler.nack(s,c,l)}}class R{}class ae{}class Me{constructor(s){this.client=s}get outgoing(){return this.client.heartbeatOutgoing}set outgoing(s){this.client.heartbeatOutgoing=s}get incoming(){return this.client.heartbeatIncoming}set incoming(s){this.client.heartbeatIncoming=s}}class Z extends T{constructor(s){super(),this.maxWebSocketFrameSize=16*1024,this._heartbeatInfo=new Me(this),this.reconnect_delay=0,this.webSocketFactory=s,this.debug=(...c)=>{console.log(...c)}}_parseConnect(...s){let c,l,m,f={};if(s.length<2)throw new Error("Connect requires at least 2 arguments");if(typeof s[1]=="function")[f,l,m,c]=s;else switch(s.length){case 6:[f.login,f.passcode,l,m,c,f.host]=s;break;default:[f.login,f.passcode,l,m,c]=s}return[f,l,m,c]}connect(...s){const c=this._parseConnect(...s);c[0]&&(this.connectHeaders=c[0]),c[1]&&(this.onConnect=c[1]),c[2]&&(this.onStompError=c[2]),c[3]&&(this.onWebSocketClose=c[3]),super.activate()}disconnect(s,c={}){s&&(this.onDisconnect=s),this.disconnectHeaders=c,super.deactivate()}send(s,c={},l=""){c=Object.assign({},c);const m=c["content-length"]===!1;m&&delete c["content-length"],this.publish({destination:s,headers:c,body:l,skipContentLengthHeader:m})}set reconnect_delay(s){this.reconnectDelay=s}get ws(){return this.webSocket}get version(){return this.connectedVersion}get onreceive(){return this.onUnhandledMessage}set onreceive(s){this.onUnhandledMessage=s}get onreceipt(){return this.onUnhandledReceipt}set onreceipt(s){this.onUnhandledReceipt=s}get heartbeat(){return this._heartbeatInfo}set heartbeat(s){this.heartbeatIncoming=s.incoming,this.heartbeatOutgoing=s.outgoing}}class X{static client(s,c){c==null&&(c=g.default.protocolVersions());const l=()=>{const m=X.WebSocketClass||WebSocket;return new m(s,c)};return new Z(l)}static over(s){let c;return typeof s=="function"?c=s:(console.warn("Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over"),c=()=>s),new Z(c)}}X.WebSocketClass=null,n.Client=T,n.CompatClient=Z,n.FrameImpl=o,n.Parser=k,n.Stomp=X,n.StompConfig=R,n.StompHeaders=ae,n.Versions=g})})(At,At.exports);var cr=At.exports,zn={exports:{}},It={};window.crypto&&window.crypto.getRandomValues?It.randomBytes=function(e){var t=new Uint8Array(e);return window.crypto.getRandomValues(t),t}:It.randomBytes=function(e){for(var t=new Array(e),n=0;n<e;n++)t[n]=Math.floor(Math.random()*256);return t};var lr=It,fn="abcdefghijklmnopqrstuvwxyz012345",he={string:function(e){for(var t=fn.length,n=lr.randomBytes(e),i=[],r=0;r<e;r++)i.push(fn.substr(n[r]%t,1));return i.join("")},number:function(e){return Math.floor(Math.random()*e)},numberString:function(e){var t=(""+(e-1)).length,n=new Array(t+1).join("0");return(n+this.number(e)).slice(-t)}};(function(e){var t=he,n={},i=!1,r=window.chrome&&window.chrome.app&&window.chrome.app.runtime;e.exports={attachEvent:function(a,d){typeof window.addEventListener<"u"?window.addEventListener(a,d,!1):window.document&&window.attachEvent&&(window.document.attachEvent("on"+a,d),window.attachEvent("on"+a,d))},detachEvent:function(a,d){typeof window.addEventListener<"u"?window.removeEventListener(a,d,!1):window.document&&window.detachEvent&&(window.document.detachEvent("on"+a,d),window.detachEvent("on"+a,d))},unloadAdd:function(a){if(r)return null;var d=t.string(8);return n[d]=a,i&&setTimeout(this.triggerUnloadCallbacks,0),d},unloadDel:function(a){a in n&&delete n[a]},triggerUnloadCallbacks:function(){for(var a in n)n[a](),delete n[a]}};var o=function(){i||(i=!0,e.exports.triggerUnloadCallbacks())};r||e.exports.attachEvent("unload",o)})(zn);var Y=zn.exports,dr=function(t,n){if(n=n.split(":")[0],t=+t,!t)return!1;switch(n){case"http":case"ws":return t!==80;case"https":case"wss":return t!==443;case"ftp":return t!==21;case"gopher":return t!==70;case"file":return!1}return t!==0},Kt={},ur=Object.prototype.hasOwnProperty,hr;function vn(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch{return null}}function gn(e){try{return encodeURIComponent(e)}catch{return null}}function mr(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var r=vn(i[1]),o=vn(i[2]);r===null||o===null||r in n||(n[r]=o)}return n}function pr(e,t){t=t||"";var n=[],i,r;typeof t!="string"&&(t="?");for(r in e)if(ur.call(e,r)){if(i=e[r],!i&&(i===null||i===hr||isNaN(i))&&(i=""),r=gn(r),i=gn(i),r===null||i===null)continue;n.push(r+"="+i)}return n.length?t+n.join("&"):""}Kt.stringify=pr;Kt.parse=mr;var qn=dr,nt=Kt,fr=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,Fn=/[\n\r\t]/g,vr=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,Vn=/:\d+$/,gr=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,yr=/^[a-zA-Z]:/;function Yt(e){return(e||"").toString().replace(fr,"")}var $t=[["#","hash"],["?","query"],function(t,n){return U(n.protocol)?t.replace(/\\/g,"/"):t},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],yn={hash:1,query:1};function Gn(e){var t;typeof window<"u"||typeof window<"u"?t=window:typeof self<"u"?t=self:t={};var n=t.location||{};e=e||n;var i={},r=typeof e,o;if(e.protocol==="blob:")i=new j(unescape(e.pathname),{});else if(r==="string"){i=new j(e,{});for(o in yn)delete i[o]}else if(r==="object"){for(o in e)o in yn||(i[o]=e[o]);i.slashes===void 0&&(i.slashes=vr.test(e.href))}return i}function U(e){return e==="file:"||e==="ftp:"||e==="http:"||e==="https:"||e==="ws:"||e==="wss:"}function Xn(e,t){e=Yt(e),e=e.replace(Fn,""),t=t||{};var n=gr.exec(e),i=n[1]?n[1].toLowerCase():"",r=!!n[2],o=!!n[3],a=0,d;return r?o?(d=n[2]+n[3]+n[4],a=n[2].length+n[3].length):(d=n[2]+n[4],a=n[2].length):o?(d=n[3]+n[4],a=n[3].length):d=n[4],i==="file:"?a>=2&&(d=d.slice(2)):U(i)?d=n[4]:i?r&&(d=d.slice(2)):a>=2&&U(t.protocol)&&(d=n[4]),{protocol:i,slashes:r||U(i),slashesCount:a,rest:d}}function br(e,t){if(e==="")return t;for(var n=(t||"/").split("/").slice(0,-1).concat(e.split("/")),i=n.length,r=n[i-1],o=!1,a=0;i--;)n[i]==="."?n.splice(i,1):n[i]===".."?(n.splice(i,1),a++):a&&(i===0&&(o=!0),n.splice(i,1),a--);return o&&n.unshift(""),(r==="."||r==="..")&&n.push(""),n.join("/")}function j(e,t,n){if(e=Yt(e),e=e.replace(Fn,""),!(this instanceof j))return new j(e,t,n);var i,r,o,a,d,h,p=$t.slice(),k=typeof t,u=this,g=0;for(k!=="object"&&k!=="string"&&(n=t,t=null),n&&typeof n!="function"&&(n=nt.parse),t=Gn(t),r=Xn(e||"",t),i=!r.protocol&&!r.slashes,u.slashes=r.slashes||i&&t.slashes,u.protocol=r.protocol||t.protocol||"",e=r.rest,(r.protocol==="file:"&&(r.slashesCount!==2||yr.test(e))||!r.slashes&&(r.protocol||r.slashesCount<2||!U(u.protocol)))&&(p[3]=[/(.*)/,"pathname"]);g<p.length;g++){if(a=p[g],typeof a=="function"){e=a(e,u);continue}o=a[0],h=a[1],o!==o?u[h]=e:typeof o=="string"?(d=o==="@"?e.lastIndexOf(o):e.indexOf(o),~d&&(typeof a[2]=="number"?(u[h]=e.slice(0,d),e=e.slice(d+a[2])):(u[h]=e.slice(d),e=e.slice(0,d)))):(d=o.exec(e))&&(u[h]=d[1],e=e.slice(0,d.index)),u[h]=u[h]||i&&a[3]&&t[h]||"",a[4]&&(u[h]=u[h].toLowerCase())}n&&(u.query=n(u.query)),i&&t.slashes&&u.pathname.charAt(0)!=="/"&&(u.pathname!==""||t.pathname!=="")&&(u.pathname=br(u.pathname,t.pathname)),u.pathname.charAt(0)!=="/"&&U(u.protocol)&&(u.pathname="/"+u.pathname),qn(u.port,u.protocol)||(u.host=u.hostname,u.port=""),u.username=u.password="",u.auth&&(d=u.auth.indexOf(":"),~d?(u.username=u.auth.slice(0,d),u.username=encodeURIComponent(decodeURIComponent(u.username)),u.password=u.auth.slice(d+1),u.password=encodeURIComponent(decodeURIComponent(u.password))):u.username=encodeURIComponent(decodeURIComponent(u.auth)),u.auth=u.password?u.username+":"+u.password:u.username),u.origin=u.protocol!=="file:"&&U(u.protocol)&&u.host?u.protocol+"//"+u.host:"null",u.href=u.toString()}function wr(e,t,n){var i=this;switch(e){case"query":typeof t=="string"&&t.length&&(t=(n||nt.parse)(t)),i[e]=t;break;case"port":i[e]=t,qn(t,i.protocol)?t&&(i.host=i.hostname+":"+t):(i.host=i.hostname,i[e]="");break;case"hostname":i[e]=t,i.port&&(t+=":"+i.port),i.host=t;break;case"host":i[e]=t,Vn.test(t)?(t=t.split(":"),i.port=t.pop(),i.hostname=t.join(":")):(i.hostname=t,i.port="");break;case"protocol":i.protocol=t.toLowerCase(),i.slashes=!n;break;case"pathname":case"hash":if(t){var r=e==="pathname"?"/":"#";i[e]=t.charAt(0)!==r?r+t:t}else i[e]=t;break;case"username":case"password":i[e]=encodeURIComponent(t);break;case"auth":var o=t.indexOf(":");~o?(i.username=t.slice(0,o),i.username=encodeURIComponent(decodeURIComponent(i.username)),i.password=t.slice(o+1),i.password=encodeURIComponent(decodeURIComponent(i.password))):i.username=encodeURIComponent(decodeURIComponent(t))}for(var a=0;a<$t.length;a++){var d=$t[a];d[4]&&(i[d[1]]=i[d[1]].toLowerCase())}return i.auth=i.password?i.username+":"+i.password:i.username,i.origin=i.protocol!=="file:"&&U(i.protocol)&&i.host?i.protocol+"//"+i.host:"null",i.href=i.toString(),i}function kr(e){(!e||typeof e!="function")&&(e=nt.stringify);var t,n=this,i=n.host,r=n.protocol;r&&r.charAt(r.length-1)!==":"&&(r+=":");var o=r+(n.protocol&&n.slashes||U(n.protocol)?"//":"");return n.username?(o+=n.username,n.password&&(o+=":"+n.password),o+="@"):n.password?(o+=":"+n.password,o+="@"):n.protocol!=="file:"&&U(n.protocol)&&!i&&n.pathname!=="/"&&(o+="@"),(i[i.length-1]===":"||Vn.test(n.hostname)&&!n.port)&&(i+=":"),o+=i+n.pathname,t=typeof n.query=="object"?e(n.query):n.query,t&&(o+=t.charAt(0)!=="?"?"?"+t:t),n.hash&&(o+=n.hash),o}j.prototype={set:wr,toString:kr};j.extractProtocol=Xn;j.location=Gn;j.trimLeft=Yt;j.qs=nt;var Jn=j,xr=Jn,B={getOrigin:function(e){if(!e)return null;var t=new xr(e);if(t.protocol==="file:")return null;var n=t.port;return n||(n=t.protocol==="https:"?"443":"80"),t.protocol+"//"+t.hostname+":"+n},isOriginEqual:function(e,t){var n=this.getOrigin(e)===this.getOrigin(t);return n},isSchemeEqual:function(e,t){return e.split(":")[0]===t.split(":")[0]},addPath:function(e,t){var n=e.split("?");return n[0]+t+(n[1]?"?"+n[1]:"")},addQuery:function(e,t){return e+(e.indexOf("?")===-1?"?"+t:"&"+t)},isLoopbackAddr:function(e){return/^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(e)||/^\[::1\]$/.test(e)}},Lt={exports:{}};typeof Object.create=="function"?Lt.exports=function(t,n){n&&(t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:Lt.exports=function(t,n){if(n){t.super_=n;var i=function(){};i.prototype=n.prototype,t.prototype=new i,t.prototype.constructor=t}};var w=Lt.exports,_={};function it(){this._listeners={}}it.prototype.addEventListener=function(e,t){e in this._listeners||(this._listeners[e]=[]);var n=this._listeners[e];n.indexOf(t)===-1&&(n=n.concat([t])),this._listeners[e]=n};it.prototype.removeEventListener=function(e,t){var n=this._listeners[e];if(n){var i=n.indexOf(t);if(i!==-1){n.length>1?this._listeners[e]=n.slice(0,i).concat(n.slice(i+1)):delete this._listeners[e];return}}};it.prototype.dispatchEvent=function(){var e=arguments[0],t=e.type,n=arguments.length===1?[e]:Array.apply(null,arguments);if(this["on"+t]&&this["on"+t].apply(this,n),t in this._listeners)for(var i=this._listeners[t],r=0;r<i.length;r++)i[r].apply(this,n)};var Qn=it,Er=w,rt=Qn;function J(){rt.call(this)}Er(J,rt);J.prototype.removeAllListeners=function(e){e?delete this._listeners[e]:this._listeners={}};J.prototype.once=function(e,t){var n=this,i=!1;function r(){n.removeListener(e,r),i||(i=!0,t.apply(this,arguments))}this.on(e,r)};J.prototype.emit=function(){var e=arguments[0],t=this._listeners[e];if(t){for(var n=arguments.length,i=new Array(n-1),r=1;r<n;r++)i[r-1]=arguments[r];for(var o=0;o<t.length;o++)t[o].apply(this,i)}};J.prototype.on=J.prototype.addListener=rt.prototype.addEventListener;J.prototype.removeListener=rt.prototype.removeEventListener;_.EventEmitter=J;var Bt={exports:{}},bn=window.WebSocket||window.MozWebSocket;bn?Bt.exports=function(t){return new bn(t)}:Bt.exports=void 0;var Sr=Bt.exports,Kn=Y,_r=B,Cr=w,Yn=_.EventEmitter,Zn=Sr,wn=function(){};function G(e,t,n){if(!G.enabled())throw new Error("Transport created when disabled");Yn.call(this);var i=this,r=_r.addPath(e,"/websocket");r.slice(0,5)==="https"?r="wss"+r.slice(5):r="ws"+r.slice(4),this.url=r,this.ws=new Zn(this.url,[],n),this.ws.onmessage=function(o){wn("message event",o.data),i.emit("message",o.data)},this.unloadRef=Kn.unloadAdd(function(){i.ws.close()}),this.ws.onclose=function(o){wn("close event",o.code,o.reason),i.emit("close",o.code,o.reason),i._cleanup()},this.ws.onerror=function(o){i.emit("close",1006,"WebSocket connection broken"),i._cleanup()}}Cr(G,Yn);G.prototype.send=function(e){var t="["+e+"]";this.ws.send(t)};G.prototype.close=function(){var e=this.ws;this._cleanup(),e&&e.close()};G.prototype._cleanup=function(){var e=this.ws;e&&(e.onmessage=e.onclose=e.onerror=null),Kn.unloadDel(this.unloadRef),this.unloadRef=this.ws=null,this.removeAllListeners()};G.enabled=function(){return!!Zn};G.transportName="websocket";G.roundTrips=2;var Tr=G,Ar=w,ei=_.EventEmitter,Ir=function(){};function ie(e,t){ei.call(this),this.sendBuffer=[],this.sender=t,this.url=e}Ar(ie,ei);ie.prototype.send=function(e){this.sendBuffer.push(e),this.sendStop||this.sendSchedule()};ie.prototype.sendScheduleWait=function(){var e=this,t;this.sendStop=function(){e.sendStop=null,clearTimeout(t)},t=setTimeout(function(){e.sendStop=null,e.sendSchedule()},25)};ie.prototype.sendSchedule=function(){Ir("sendSchedule",this.sendBuffer.length);var e=this;if(this.sendBuffer.length>0){var t="["+this.sendBuffer.join(",")+"]";this.sendStop=this.sender(this.url,t,function(n){e.sendStop=null,n?(e.emit("close",n.code||1006,"Sending error: "+n),e.close()):e.sendScheduleWait()}),this.sendBuffer=[]}};ie.prototype._cleanup=function(){this.removeAllListeners()};ie.prototype.close=function(){this._cleanup(),this.sendStop&&(this.sendStop(),this.sendStop=null)};var $r=ie,Lr=w,ti=_.EventEmitter,Br=function(){};function st(e,t,n){ti.call(this),this.Receiver=e,this.receiveUrl=t,this.AjaxObject=n,this._scheduleReceiver()}Lr(st,ti);st.prototype._scheduleReceiver=function(){var e=this,t=this.poll=new this.Receiver(this.receiveUrl,this.AjaxObject);t.on("message",function(n){e.emit("message",n)}),t.once("close",function(n,i){Br("close",n,i,e.pollIsClosing),e.poll=t=null,e.pollIsClosing||(i==="network"?e._scheduleReceiver():(e.emit("close",n||1006,i),e.removeAllListeners()))})};st.prototype.abort=function(){this.removeAllListeners(),this.pollIsClosing=!0,this.poll&&this.poll.abort()};var Rr=st,Or=w,Nr=B,Zt=$r,Hr=Rr;function en(e,t,n,i,r){var o=Nr.addPath(e,t),a=this;Zt.call(this,e,n),this.poll=new Hr(i,o,r),this.poll.on("message",function(d){a.emit("message",d)}),this.poll.once("close",function(d,h){a.poll=null,a.emit("close",d,h),a.close()})}Or(en,Zt);en.prototype.close=function(){Zt.prototype.close.call(this),this.removeAllListeners(),this.poll&&(this.poll.abort(),this.poll=null)};var ni=en,Pr=w,Mr=B,ii=ni;function Dr(e){return function(t,n,i){var r={};typeof n=="string"&&(r.headers={"Content-type":"text/plain"});var o=Mr.addPath(t,"/xhr_send"),a=new e("POST",o,n,r);return a.once("finish",function(d){if(a=null,d!==200&&d!==204)return i(new Error("http status "+d));i()}),function(){a.close(),a=null;var d=new Error("Aborted");d.code=1e3,i(d)}}}function ri(e,t,n,i){ii.call(this,e,t,Dr(i),n,i)}Pr(ri,ii);var me=ri,Ur=w,si=_.EventEmitter;function Te(e,t){si.call(this);var n=this;this.bufferPosition=0,this.xo=new t("POST",e,null),this.xo.on("chunk",this._chunkHandler.bind(this)),this.xo.once("finish",function(i,r){n._chunkHandler(i,r),n.xo=null;var o=i===200?"network":"permanent";n.emit("close",null,o),n._cleanup()})}Ur(Te,si);Te.prototype._chunkHandler=function(e,t){if(!(e!==200||!t))for(var n=-1;;this.bufferPosition+=n+1){var i=t.slice(this.bufferPosition);if(n=i.indexOf(`
`),n===-1)break;var r=i.slice(0,n);r&&this.emit("message",r)}};Te.prototype._cleanup=function(){this.removeAllListeners()};Te.prototype.abort=function(){this.xo&&(this.xo.close(),this.emit("close",null,"user"),this.xo=null),this._cleanup()};var ot=Te,oi=_.EventEmitter,Wr=w,ai=Y,jr=B,Se=window.XMLHttpRequest,ht=function(){};function z(e,t,n,i){var r=this;oi.call(this),setTimeout(function(){r._start(e,t,n,i)},0)}Wr(z,oi);z.prototype._start=function(e,t,n,i){var r=this;try{this.xhr=new Se}catch{}if(!this.xhr){this.emit("finish",0,"no xhr support"),this._cleanup();return}t=jr.addQuery(t,"t="+ +new Date),this.unloadRef=ai.unloadAdd(function(){r._cleanup(!0)});try{this.xhr.open(e,t,!0),this.timeout&&"timeout"in this.xhr&&(this.xhr.timeout=this.timeout,this.xhr.ontimeout=function(){ht("xhr timeout"),r.emit("finish",0,""),r._cleanup(!1)})}catch{this.emit("finish",0,""),this._cleanup(!1);return}if((!i||!i.noCredentials)&&z.supportsCORS&&(this.xhr.withCredentials=!0),i&&i.headers)for(var o in i.headers)this.xhr.setRequestHeader(o,i.headers[o]);this.xhr.onreadystatechange=function(){if(r.xhr){var a=r.xhr,d,h;switch(ht("readyState",a.readyState),a.readyState){case 3:try{h=a.status,d=a.responseText}catch{}h===1223&&(h=204),h===200&&d&&d.length>0&&r.emit("chunk",h,d);break;case 4:h=a.status,h===1223&&(h=204),(h===12005||h===12029)&&(h=0),ht("finish",h,a.responseText),r.emit("finish",h,a.responseText),r._cleanup(!1);break}}};try{r.xhr.send(n)}catch{r.emit("finish",0,""),r._cleanup(!1)}};z.prototype._cleanup=function(e){if(this.xhr){if(this.removeAllListeners(),ai.unloadDel(this.unloadRef),this.xhr.onreadystatechange=function(){},this.xhr.ontimeout&&(this.xhr.ontimeout=null),e)try{this.xhr.abort()}catch{}this.unloadRef=this.xhr=null}};z.prototype.close=function(){this._cleanup(!0)};z.enabled=!!Se;var kn=["Active"].concat("Object").join("X");!z.enabled&&kn in window&&(Se=function(){try{return new window[kn]("Microsoft.XMLHTTP")}catch{return null}},z.enabled=!!new Se);var ci=!1;try{ci="withCredentials"in new Se}catch{}z.supportsCORS=ci;var li=z,zr=w,Xe=li;function tn(e,t,n,i){Xe.call(this,e,t,n,i)}zr(tn,Xe);tn.enabled=Xe.enabled&&Xe.supportsCORS;var at=tn,qr=w,nn=li;function rn(e,t,n){nn.call(this,e,t,n,{noCredentials:!0})}qr(rn,nn);rn.enabled=nn.enabled;var Ae=rn,Ie={isOpera:function(){return window.navigator&&/opera/i.test(window.navigator.userAgent)},isKonqueror:function(){return window.navigator&&/konqueror/i.test(window.navigator.userAgent)},hasDomain:function(){if(!window.document)return!0;try{return!!window.document.domain}catch{return!1}}},Fr=w,di=me,Vr=ot,Rt=at,Gr=Ae,Xr=Ie;function pe(e){if(!Gr.enabled&&!Rt.enabled)throw new Error("Transport created when disabled");di.call(this,e,"/xhr_streaming",Vr,Rt)}Fr(pe,di);pe.enabled=function(e){return e.nullOrigin||Xr.isOpera()?!1:Rt.enabled};pe.transportName="xhr-streaming";pe.roundTrips=2;pe.needBody=!!window.document;var Jr=pe,ui=_.EventEmitter,Qr=w,hi=Y,Kr=Ie,Yr=B,Zr=function(){};function re(e,t,n){var i=this;ui.call(this),setTimeout(function(){i._start(e,t,n)},0)}Qr(re,ui);re.prototype._start=function(e,t,n){var i=this,r=new window.XDomainRequest;t=Yr.addQuery(t,"t="+ +new Date),r.onerror=function(){i._error()},r.ontimeout=function(){i._error()},r.onprogress=function(){Zr("progress",r.responseText),i.emit("chunk",200,r.responseText)},r.onload=function(){i.emit("finish",200,r.responseText),i._cleanup(!1)},this.xdr=r,this.unloadRef=hi.unloadAdd(function(){i._cleanup(!0)});try{this.xdr.open(e,t),this.timeout&&(this.xdr.timeout=this.timeout),this.xdr.send(n)}catch{this._error()}};re.prototype._error=function(){this.emit("finish",0,""),this._cleanup(!1)};re.prototype._cleanup=function(e){if(this.xdr){if(this.removeAllListeners(),hi.unloadDel(this.unloadRef),this.xdr.ontimeout=this.xdr.onerror=this.xdr.onprogress=this.xdr.onload=null,e)try{this.xdr.abort()}catch{}this.unloadRef=this.xdr=null}};re.prototype.close=function(){this._cleanup(!0)};re.enabled=!!(window.XDomainRequest&&Kr.hasDomain());var sn=re,es=w,mi=me,ts=ot,Ot=sn;function $e(e){if(!Ot.enabled)throw new Error("Transport created when disabled");mi.call(this,e,"/xhr_streaming",ts,Ot)}es($e,mi);$e.enabled=function(e){return e.cookie_needed||e.nullOrigin?!1:Ot.enabled&&e.sameScheme};$e.transportName="xdr-streaming";$e.roundTrips=2;var pi=$e,fi=window.EventSource,ns=w,vi=_.EventEmitter,is=fi,xn=function(){};function Le(e){vi.call(this);var t=this,n=this.es=new is(e);n.onmessage=function(i){xn("message",i.data),t.emit("message",decodeURI(i.data))},n.onerror=function(i){xn("error",n.readyState);var r=n.readyState!==2?"network":"permanent";t._cleanup(),t._close(r)}}ns(Le,vi);Le.prototype.abort=function(){this._cleanup(),this._close("user")};Le.prototype._cleanup=function(){var e=this.es;e&&(e.onmessage=e.onerror=null,e.close(),this.es=null)};Le.prototype._close=function(e){var t=this;setTimeout(function(){t.emit("close",null,e),t.removeAllListeners()},200)};var rs=Le,ss=w,gi=me,os=rs,as=at,cs=fi;function fe(e){if(!fe.enabled())throw new Error("Transport created when disabled");gi.call(this,e,"/eventsource",os,as)}ss(fe,gi);fe.enabled=function(){return!!cs};fe.transportName="eventsource";fe.roundTrips=2;var En=fe,mt,Sn;function yi(){return Sn||(Sn=1,mt="1.6.1"),mt}var bi={exports:{}};(function(e){var t=Y,n=Ie;e.exports={WPrefix:"_jp",currentWindowId:null,polluteGlobalNamespace:function(){e.exports.WPrefix in window||(window[e.exports.WPrefix]={})},postMessage:function(i,r){window.parent!==window&&window.parent.postMessage(JSON.stringify({windowId:e.exports.currentWindowId,type:i,data:r||""}),"*")},createIframe:function(i,r){var o=window.document.createElement("iframe"),a,d,h=function(){clearTimeout(a);try{o.onload=null}catch{}o.onerror=null},p=function(){o&&(h(),setTimeout(function(){o&&o.parentNode.removeChild(o),o=null},0),t.unloadDel(d))},k=function(g){o&&(p(),r(g))},u=function(g,S){setTimeout(function(){try{o&&o.contentWindow&&o.contentWindow.postMessage(g,S)}catch{}},0)};return o.src=i,o.style.display="none",o.style.position="absolute",o.onerror=function(){k("onerror")},o.onload=function(){clearTimeout(a),a=setTimeout(function(){k("onload timeout")},2e3)},window.document.body.appendChild(o),a=setTimeout(function(){k("timeout")},15e3),d=t.unloadAdd(p),{post:u,cleanup:p,loaded:h}},createHtmlfile:function(i,r){var o=["Active"].concat("Object").join("X"),a=new window[o]("htmlfile"),d,h,p,k=function(){clearTimeout(d),p.onerror=null},u=function(){a&&(k(),t.unloadDel(h),p.parentNode.removeChild(p),p=a=null,CollectGarbage())},g=function(R){a&&(u(),r(R))},S=function(R,ae){try{setTimeout(function(){p&&p.contentWindow&&p.contentWindow.postMessage(R,ae)},0)}catch{}};a.open(),a.write('<html><script>document.domain="'+window.document.domain+'";<\/script></html>'),a.close(),a.parentWindow[e.exports.WPrefix]=window[e.exports.WPrefix];var T=a.createElement("div");return a.body.appendChild(T),p=a.createElement("iframe"),T.appendChild(p),p.src=i,p.onerror=function(){g("onerror")},d=setTimeout(function(){g("timeout")},15e3),h=t.unloadAdd(u),{post:S,cleanup:u,loaded:k}}},e.exports.iframeEnabled=!1,window.document&&(e.exports.iframeEnabled=(typeof window.postMessage=="function"||typeof window.postMessage=="object")&&!n.isKonqueror())})(bi);var Be=bi.exports,ls=w,wi=_.EventEmitter,ds=yi(),Nt=B,ki=Be,xi=Y,us=he,ye=function(){};function q(e,t,n){if(!q.enabled())throw new Error("Transport created when disabled");wi.call(this);var i=this;this.origin=Nt.getOrigin(n),this.baseUrl=n,this.transUrl=t,this.transport=e,this.windowId=us.string(8);var r=Nt.addPath(n,"/iframe.html")+"#"+this.windowId;this.iframeObj=ki.createIframe(r,function(o){i.emit("close",1006,"Unable to load an iframe ("+o+")"),i.close()}),this.onmessageCallback=this._message.bind(this),xi.attachEvent("message",this.onmessageCallback)}ls(q,wi);q.prototype.close=function(){if(this.removeAllListeners(),this.iframeObj){xi.detachEvent("message",this.onmessageCallback);try{this.postMessage("c")}catch{}this.iframeObj.cleanup(),this.iframeObj=null,this.onmessageCallback=this.iframeObj=null}};q.prototype._message=function(e){if(ye("message",e.data),!Nt.isOriginEqual(e.origin,this.origin)){ye("not same origin",e.origin,this.origin);return}var t;try{t=JSON.parse(e.data)}catch{ye("bad json",e.data);return}if(t.windowId!==this.windowId){ye("mismatched window id",t.windowId,this.windowId);return}switch(t.type){case"s":this.iframeObj.loaded(),this.postMessage("s",JSON.stringify([ds,this.transport,this.transUrl,this.baseUrl]));break;case"t":this.emit("message",t.data);break;case"c":var n;try{n=JSON.parse(t.data)}catch{ye("bad json",t.data);return}this.emit("close",n[0],n[1]),this.close();break}};q.prototype.postMessage=function(e,t){this.iframeObj.post(JSON.stringify({windowId:this.windowId,type:e,data:t||""}),this.origin)};q.prototype.send=function(e){this.postMessage("m",e)};q.enabled=function(){return ki.iframeEnabled};q.transportName="iframe";q.roundTrips=2;var Ei=q,on={isObject:function(e){var t=typeof e;return t==="function"||t==="object"&&!!e},extend:function(e){if(!this.isObject(e))return e;for(var t,n,i=1,r=arguments.length;i<r;i++){t=arguments[i];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}},hs=w,De=Ei,ms=on,pt=function(e){function t(n,i){De.call(this,e.transportName,n,i)}return hs(t,De),t.enabled=function(n,i){if(!window.document)return!1;var r=ms.extend({},i);return r.sameOrigin=!0,e.enabled(r)&&De.enabled()},t.transportName="iframe-"+e.transportName,t.needBody=!0,t.roundTrips=De.roundTrips+e.roundTrips-1,t.facadeTransport=e,t},ps=w,ee=Be,fs=B,Si=_.EventEmitter,vs=he,gs=function(){};function H(e){Si.call(this);var t=this;ee.polluteGlobalNamespace(),this.id="a"+vs.string(6),e=fs.addQuery(e,"c="+decodeURIComponent(ee.WPrefix+"."+this.id)),gs("using htmlfile",H.htmlfileEnabled);var n=H.htmlfileEnabled?ee.createHtmlfile:ee.createIframe;window[ee.WPrefix][this.id]={start:function(){t.iframeObj.loaded()},message:function(i){t.emit("message",i)},stop:function(){t._cleanup(),t._close("network")}},this.iframeObj=n(e,function(){t._cleanup(),t._close("permanent")})}ps(H,Si);H.prototype.abort=function(){this._cleanup(),this._close("user")};H.prototype._cleanup=function(){this.iframeObj&&(this.iframeObj.cleanup(),this.iframeObj=null),delete window[ee.WPrefix][this.id]};H.prototype._close=function(e){this.emit("close",null,e),this.removeAllListeners()};H.htmlfileEnabled=!1;var _n=["Active"].concat("Object").join("X");if(_n in window)try{H.htmlfileEnabled=!!new window[_n]("htmlfile")}catch{}H.enabled=H.htmlfileEnabled||ee.iframeEnabled;var ys=H,bs=w,Ht=ys,ws=Ae,_i=me;function Re(e){if(!Ht.enabled)throw new Error("Transport created when disabled");_i.call(this,e,"/htmlfile",Ht,ws)}bs(Re,_i);Re.enabled=function(e){return Ht.enabled&&e.sameOrigin};Re.transportName="htmlfile";Re.roundTrips=2;var Cn=Re,ks=w,Ci=me,xs=ot,Pt=at,Ti=Ae;function Oe(e){if(!Ti.enabled&&!Pt.enabled)throw new Error("Transport created when disabled");Ci.call(this,e,"/xhr",xs,Pt)}ks(Oe,Ci);Oe.enabled=function(e){return e.nullOrigin?!1:Ti.enabled&&e.sameOrigin?!0:Pt.enabled};Oe.transportName="xhr-polling";Oe.roundTrips=2;var Tn=Oe,Es=w,Ai=me,Ss=pi,_s=ot,An=sn;function Ne(e){if(!An.enabled)throw new Error("Transport created when disabled");Ai.call(this,e,"/xhr",_s,An)}Es(Ne,Ai);Ne.enabled=Ss.enabled;Ne.transportName="xdr-polling";Ne.roundTrips=2;var Cs=Ne,ke=Be,Ii=he,Ts=Ie,As=B,Is=w,$i=_.EventEmitter,$s=function(){};function L(e){var t=this;$i.call(this),ke.polluteGlobalNamespace(),this.id="a"+Ii.string(6);var n=As.addQuery(e,"c="+encodeURIComponent(ke.WPrefix+"."+this.id));window[ke.WPrefix][this.id]=this._callback.bind(this),this._createScript(n),this.timeoutId=setTimeout(function(){t._abort(new Error("JSONP script loaded abnormally (timeout)"))},L.timeout)}Is(L,$i);L.prototype.abort=function(){if(window[ke.WPrefix][this.id]){var e=new Error("JSONP user aborted read");e.code=1e3,this._abort(e)}};L.timeout=35e3;L.scriptErrorTimeout=1e3;L.prototype._callback=function(e){this._cleanup(),!this.aborting&&(e&&this.emit("message",e),this.emit("close",null,"network"),this.removeAllListeners())};L.prototype._abort=function(e){this._cleanup(),this.aborting=!0,this.emit("close",e.code,e.message),this.removeAllListeners()};L.prototype._cleanup=function(){if(clearTimeout(this.timeoutId),this.script2&&(this.script2.parentNode.removeChild(this.script2),this.script2=null),this.script){var e=this.script;e.parentNode.removeChild(e),e.onreadystatechange=e.onerror=e.onload=e.onclick=null,this.script=null}delete window[ke.WPrefix][this.id]};L.prototype._scriptError=function(){var e=this;this.errorTimer||(this.errorTimer=setTimeout(function(){e.loadedOkay||e._abort(new Error("JSONP script loaded abnormally (onerror)"))},L.scriptErrorTimeout))};L.prototype._createScript=function(e){var t=this,n=this.script=window.document.createElement("script"),i;if(n.id="a"+Ii.string(8),n.src=e,n.type="text/javascript",n.charset="UTF-8",n.onerror=this._scriptError.bind(this),n.onload=function(){t._abort(new Error("JSONP script loaded abnormally (onload)"))},n.onreadystatechange=function(){if($s("onreadystatechange",n.readyState),/loaded|closed/.test(n.readyState)){if(n&&n.htmlFor&&n.onclick){t.loadedOkay=!0;try{n.onclick()}catch{}}n&&t._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"))}},typeof n.async>"u"&&window.document.attachEvent)if(Ts.isOpera())i=this.script2=window.document.createElement("script"),i.text="try{var a = document.getElementById('"+n.id+"'); if(a)a.onerror();}catch(x){};",n.async=i.async=!1;else{try{n.htmlFor=n.id,n.event="onclick"}catch{}n.async=!0}typeof n.async<"u"&&(n.async=!0);var r=window.document.getElementsByTagName("head")[0];r.insertBefore(n,r.firstChild),i&&r.insertBefore(i,r.firstChild)};var Ls=L,Bs=he,In=B,Rs=function(){},A,xe;function Os(e){try{return window.document.createElement('<iframe name="'+e+'">')}catch{var t=window.document.createElement("iframe");return t.name=e,t}}function Ns(){A=window.document.createElement("form"),A.style.display="none",A.style.position="absolute",A.method="POST",A.enctype="application/x-www-form-urlencoded",A.acceptCharset="UTF-8",xe=window.document.createElement("textarea"),xe.name="d",A.appendChild(xe),window.document.body.appendChild(A)}var Hs=function(e,t,n){A||Ns();var i="a"+Bs.string(8);A.target=i,A.action=In.addQuery(In.addPath(e,"/jsonp_send"),"i="+i);var r=Os(i);r.id=i,r.style.display="none",A.appendChild(r);try{xe.value=t}catch{}A.submit();var o=function(a){r.onerror&&(r.onreadystatechange=r.onerror=r.onload=null,setTimeout(function(){r.parentNode.removeChild(r),r=null},500),xe.value="",n(a))};return r.onerror=function(){o()},r.onload=function(){o()},r.onreadystatechange=function(a){Rs("onreadystatechange",i,r.readyState),r.readyState==="complete"&&o()},function(){o(new Error("Aborted"))}},Ps=w,Li=ni,Ms=Ls,Ds=Hs;function se(e){if(!se.enabled())throw new Error("Transport created when disabled");Li.call(this,e,"/jsonp",Ds,Ms)}Ps(se,Li);se.enabled=function(){return!!window.document};se.transportName="jsonp-polling";se.roundTrips=1;se.needBody=!0;var Us=se,Ws=[Tr,Jr,pi,En,pt(En),Cn,pt(Cn),Tn,Cs,pt(Tn),Us],_e=Array.prototype,an=Object.prototype,js=Function.prototype,Ce=String.prototype,ft=_e.slice,cn=an.toString,Bi=function(e){return an.toString.call(e)==="[object Function]"},zs=function(t){return cn.call(t)==="[object Array]"},Ri=function(t){return cn.call(t)==="[object String]"},qs=Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch{return!1}}(),Mt;qs?Mt=function(e,t,n,i){!i&&t in e||Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:!0,value:n})}:Mt=function(e,t,n,i){!i&&t in e||(e[t]=n)};var He=function(e,t,n){for(var i in t)an.hasOwnProperty.call(t,i)&&Mt(e,i,t[i],n)},Oi=function(e){if(e==null)throw new TypeError("can't convert "+e+" to object");return Object(e)};function Fs(e){var t=+e;return t!==t?t=0:t!==0&&t!==1/0&&t!==-1/0&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t}function Vs(e){return e>>>0}function vt(){}He(js,{bind:function(t){var n=this;if(!Bi(n))throw new TypeError("Function.prototype.bind called on incompatible "+n);for(var i=ft.call(arguments,1),r=function(){if(this instanceof h){var p=n.apply(this,i.concat(ft.call(arguments)));return Object(p)===p?p:this}else return n.apply(t,i.concat(ft.call(arguments)))},o=Math.max(0,n.length-i.length),a=[],d=0;d<o;d++)a.push("$"+d);var h=Function("binder","return function ("+a.join(",")+"){ return binder.apply(this, arguments); }")(r);return n.prototype&&(vt.prototype=n.prototype,h.prototype=new vt,vt.prototype=null),h}});He(Array,{isArray:zs});var $n=Object("a"),Ni=$n[0]!=="a"||!(0 in $n),Gs=function(t){var n=!0,i=!0;return t&&(t.call("foo",function(r,o,a){typeof a!="object"&&(n=!1)}),t.call([1],function(){i=typeof this=="string"},"x")),!!t&&n&&i};He(_e,{forEach:function(t){var n=Oi(this),i=Ni&&Ri(this)?this.split(""):n,r=arguments[1],o=-1,a=i.length>>>0;if(!Bi(t))throw new TypeError;for(;++o<a;)o in i&&t.call(r,i[o],o,n)}},!Gs(_e.forEach));var Xs=Array.prototype.indexOf&&[0,1].indexOf(1,2)!==-1;He(_e,{indexOf:function(t){var n=Ni&&Ri(this)?this.split(""):Oi(this),i=n.length>>>0;if(!i)return-1;var r=0;for(arguments.length>1&&(r=Fs(arguments[1])),r=r>=0?r:Math.max(0,i+r);r<i;r++)if(r in n&&n[r]===t)return r;return-1}},Xs);var Ln=Ce.split;"ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1?function(){var e=/()??/.exec("")[1]===void 0;Ce.split=function(t,n){var i=this;if(t===void 0&&n===0)return[];if(cn.call(t)!=="[object RegExp]")return Ln.call(this,t,n);var r=[],o=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.extended?"x":"")+(t.sticky?"y":""),a=0,d,h,p,k;for(t=new RegExp(t.source,o+"g"),i+="",e||(d=new RegExp("^"+t.source+"$(?!\\s)",o)),n=n===void 0?-1>>>0:Vs(n);(h=t.exec(i))&&(p=h.index+h[0].length,!(p>a&&(r.push(i.slice(a,h.index)),!e&&h.length>1&&h[0].replace(d,function(){for(var u=1;u<arguments.length-2;u++)arguments[u]===void 0&&(h[u]=void 0)}),h.length>1&&h.index<i.length&&_e.push.apply(r,h.slice(1)),k=h[0].length,a=p,r.length>=n)));)t.lastIndex===h.index&&t.lastIndex++;return a===i.length?(k||!t.test(""))&&r.push(""):r.push(i.slice(a)),r.length>n?r.slice(0,n):r}}():"0".split(void 0,0).length&&(Ce.split=function(t,n){return t===void 0&&n===0?[]:Ln.call(this,t,n)});var Js=Ce.substr,Qs="".substr&&"0b".substr(-1)!=="b";He(Ce,{substr:function(t,n){return Js.call(this,t<0&&(t=this.length+t)<0?0:t,n)}},Qs);var Ue=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,gt,Ks=function(e){var t,n={},i=[];for(t=0;t<65536;t++)i.push(String.fromCharCode(t));return e.lastIndex=0,i.join("").replace(e,function(r){return n[r]="\\u"+("0000"+r.charCodeAt(0).toString(16)).slice(-4),""}),e.lastIndex=0,n},Ys={quote:function(e){var t=JSON.stringify(e);return Ue.lastIndex=0,Ue.test(t)?(gt||(gt=Ks(Ue)),t.replace(Ue,function(n){return gt[n]})):t}},yt=function(){},Zs=function(e){return{filterToEnabled:function(t,n){var i={main:[],facade:[]};return t?typeof t=="string"&&(t=[t]):t=[],e.forEach(function(r){if(r&&!(r.transportName==="websocket"&&n.websocket===!1)){if(t.length&&t.indexOf(r.transportName)===-1){yt("not in whitelist",r.transportName);return}r.enabled(n)?(yt("enabled",r.transportName),i.main.push(r),r.facadeTransport&&i.facade.push(r.facadeTransport)):yt("disabled",r.transportName)}}),i}}},Dt={};["log","debug","warn"].forEach(function(e){var t;try{t=window.console&&window.console[e]&&window.console[e].apply}catch{}Dt[e]=t?function(){return window.console[e].apply(window.console,arguments)}:e==="log"?function(){}:Dt.log});var eo=Dt;function oe(e){this.type=e}oe.prototype.initEvent=function(e,t,n){return this.type=e,this.bubbles=t,this.cancelable=n,this.timeStamp=+new Date,this};oe.prototype.stopPropagation=function(){};oe.prototype.preventDefault=function(){};oe.CAPTURING_PHASE=1;oe.AT_TARGET=2;oe.BUBBLING_PHASE=3;var ln=oe,Hi=window.location||{protocol:"http:",href:"http://localhost/",hash:""},to=w,Pi=ln;function Mi(){Pi.call(this),this.initEvent("close",!1,!1),this.wasClean=!1,this.code=0,this.reason=""}to(Mi,Pi);var no=Mi,io=w,Di=ln;function Ui(e){Di.call(this),this.initEvent("message",!1,!1),this.data=e}io(Ui,Di);var ro=Ui,Wi=_.EventEmitter,so=w;function Pe(){var e=this;Wi.call(this),this.to=setTimeout(function(){e.emit("finish",200,"{}")},Pe.timeout)}so(Pe,Wi);Pe.prototype.close=function(){clearTimeout(this.to)};Pe.timeout=2e3;var oo=Pe,ji=_.EventEmitter,ao=w,co=on;function dn(e,t){ji.call(this);var n=this,i=+new Date;this.xo=new t("GET",e),this.xo.once("finish",function(r,o){var a,d;if(r===200){if(d=+new Date-i,o)try{a=JSON.parse(o)}catch{}co.isObject(a)||(a={})}n.emit("finish",a,d),n.removeAllListeners()})}ao(dn,ji);dn.prototype.close=function(){this.removeAllListeners(),this.xo.close()};var zi=dn,bt,Bn;function qi(){if(Bn)return bt;Bn=1;var e=w,t=_.EventEmitter,n=Ae,i=zi;function r(o){var a=this;t.call(this),this.ir=new i(o,n),this.ir.once("finish",function(d,h){a.ir=null,a.emit("message",JSON.stringify([d,h]))})}return e(r,t),r.transportName="iframe-info-receiver",r.prototype.close=function(){this.ir&&(this.ir.close(),this.ir=null),this.removeAllListeners()},bt=r,bt}var Fi=_.EventEmitter,lo=w,uo=Y,Vi=Ei,ho=qi();function ct(e,t){var n=this;Fi.call(this);var i=function(){var r=n.ifr=new Vi(ho.transportName,t,e);r.once("message",function(o){if(o){var a;try{a=JSON.parse(o)}catch{n.emit("finish"),n.close();return}var d=a[0],h=a[1];n.emit("finish",d,h)}n.close()}),r.once("close",function(){n.emit("finish"),n.close()})};window.document.body?i():uo.attachEvent("load",i)}lo(ct,Fi);ct.enabled=function(){return Vi.enabled()};ct.prototype.close=function(){this.ifr&&this.ifr.close(),this.removeAllListeners(),this.ifr=null};var mo=ct,Gi=_.EventEmitter,po=w,fo=B,Rn=sn,On=at,vo=Ae,go=oo,Nn=mo,We=zi;function F(e,t){var n=this;Gi.call(this),setTimeout(function(){n.doXhr(e,t)},0)}po(F,Gi);F._getReceiver=function(e,t,n){return n.sameOrigin?new We(t,vo):On.enabled?new We(t,On):Rn.enabled&&n.sameScheme?new We(t,Rn):Nn.enabled()?new Nn(e,t):new We(t,go)};F.prototype.doXhr=function(e,t){var n=this,i=fo.addPath(e,"/info");this.xo=F._getReceiver(e,i,t),this.timeoutRef=setTimeout(function(){n._cleanup(!1),n.emit("finish")},F.timeout),this.xo.once("finish",function(r,o){n._cleanup(!0),n.emit("finish",r,o)})};F.prototype._cleanup=function(e){clearTimeout(this.timeoutRef),this.timeoutRef=null,!e&&this.xo&&this.xo.close(),this.xo=null};F.prototype.close=function(){this.removeAllListeners(),this._cleanup(!1)};F.timeout=8e3;var yo=F,wt,Hn;function bo(){if(Hn)return wt;Hn=1;var e=Be;function t(n){this._transport=n,n.on("message",this._transportMessage.bind(this)),n.on("close",this._transportClose.bind(this))}return t.prototype._transportClose=function(n,i){e.postMessage("c",JSON.stringify([n,i]))},t.prototype._transportMessage=function(n){e.postMessage("t",n)},t.prototype._send=function(n){this._transport.send(n)},t.prototype._close=function(){this._transport.close(),this._transport.removeAllListeners()},wt=t,wt}var kt,Pn;function wo(){if(Pn)return kt;Pn=1;var e=B,t=Y,n=bo(),i=qi(),r=Be,o=Hi,a=function(){};return kt=function(d,h){var p={};h.forEach(function(u){u.facadeTransport&&(p[u.facadeTransport.transportName]=u.facadeTransport)}),p[i.transportName]=i;var k;d.bootstrap_iframe=function(){var u;r.currentWindowId=o.hash.slice(1);var g=function(S){if(S.source===parent&&(typeof k>"u"&&(k=S.origin),S.origin===k)){var T;try{T=JSON.parse(S.data)}catch{a("bad json",S.data);return}if(T.windowId===r.currentWindowId)switch(T.type){case"s":var R;try{R=JSON.parse(T.data)}catch{a("bad json",T.data);break}var ae=R[0],Me=R[1],Z=R[2],X=R[3];if(ae!==d.version)throw new Error('Incompatible SockJS! Main site uses: "'+ae+'", the iframe: "'+d.version+'".');if(!e.isOriginEqual(Z,o.href)||!e.isOriginEqual(X,o.href))throw new Error("Can't connect to different domain from within an iframe. ("+o.href+", "+Z+", "+X+")");u=new n(new p[Me](Z,X));break;case"m":u._send(T.data);break;case"c":u&&u._close(),u=null;break}}};t.attachEvent("message",g),r.postMessage("s")}},kt}var ko=Jn,xo=w,Mn=he,Eo=Ys,we=B,So=Y,_o=Zs,Co=on,To=Ie,Ao=eo,un=ln,Xi=Qn,je=Hi,Io=no,Dn=ro,$o=yo,W=function(){},Ji;function b(e,t,n){if(!(this instanceof b))return new b(e,t,n);if(arguments.length<1)throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");Xi.call(this),this.readyState=b.CONNECTING,this.extensions="",this.protocol="",n=n||{},n.protocols_whitelist&&Ao.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead."),this._transportsWhitelist=n.transports,this._transportOptions=n.transportOptions||{},this._timeout=n.timeout||0;var i=n.sessionId||8;if(typeof i=="function")this._generateSessionId=i;else if(typeof i=="number")this._generateSessionId=function(){return Mn.string(i)};else throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");this._server=n.server||Mn.numberString(1e3);var r=new ko(e);if(!r.host||!r.protocol)throw new SyntaxError("The URL '"+e+"' is invalid");if(r.hash)throw new SyntaxError("The URL must not contain a fragment");if(r.protocol!=="http:"&&r.protocol!=="https:")throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '"+r.protocol+"' is not allowed.");var o=r.protocol==="https:";if(je.protocol==="https:"&&!o&&!we.isLoopbackAddr(r.hostname))throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");t?Array.isArray(t)||(t=[t]):t=[];var a=t.sort();a.forEach(function(h,p){if(!h)throw new SyntaxError("The protocols entry '"+h+"' is invalid.");if(p<a.length-1&&h===a[p+1])throw new SyntaxError("The protocols entry '"+h+"' is duplicated.")});var d=we.getOrigin(je.href);this._origin=d?d.toLowerCase():null,r.set("pathname",r.pathname.replace(/\/+$/,"")),this.url=r.href,W("using url",this.url),this._urlInfo={nullOrigin:!To.hasDomain(),sameOrigin:we.isOriginEqual(this.url,je.href),sameScheme:we.isSchemeEqual(this.url,je.href)},this._ir=new $o(this.url,this._urlInfo),this._ir.once("finish",this._receiveInfo.bind(this))}xo(b,Xi);function Qi(e){return e===1e3||e>=3e3&&e<=4999}b.prototype.close=function(e,t){if(e&&!Qi(e))throw new Error("InvalidAccessError: Invalid code");if(t&&t.length>123)throw new SyntaxError("reason argument has an invalid length");if(!(this.readyState===b.CLOSING||this.readyState===b.CLOSED)){var n=!0;this._close(e||1e3,t||"Normal closure",n)}};b.prototype.send=function(e){if(typeof e!="string"&&(e=""+e),this.readyState===b.CONNECTING)throw new Error("InvalidStateError: The connection has not been established yet");this.readyState===b.OPEN&&this._transport.send(Eo.quote(e))};b.version=yi();b.CONNECTING=0;b.OPEN=1;b.CLOSING=2;b.CLOSED=3;b.prototype._receiveInfo=function(e,t){if(this._ir=null,!e){this._close(1002,"Cannot connect to server");return}this._rto=this.countRTO(t),this._transUrl=e.base_url?e.base_url:this.url,e=Co.extend(e,this._urlInfo);var n=Ji.filterToEnabled(this._transportsWhitelist,e);this._transports=n.main,W(this._transports.length+" enabled transports"),this._connect()};b.prototype._connect=function(){for(var e=this._transports.shift();e;e=this._transports.shift()){if(W("attempt",e.transportName),e.needBody&&(!window.document.body||typeof window.document.readyState<"u"&&window.document.readyState!=="complete"&&window.document.readyState!=="interactive")){this._transports.unshift(e),So.attachEvent("load",this._connect.bind(this));return}var t=Math.max(this._timeout,this._rto*e.roundTrips||5e3);this._transportTimeoutId=setTimeout(this._transportTimeout.bind(this),t);var n=we.addPath(this._transUrl,"/"+this._server+"/"+this._generateSessionId()),i=this._transportOptions[e.transportName],r=new e(n,this._transUrl,i);r.on("message",this._transportMessage.bind(this)),r.once("close",this._transportClose.bind(this)),r.transportName=e.transportName,this._transport=r;return}this._close(2e3,"All transports failed",!1)};b.prototype._transportTimeout=function(){this.readyState===b.CONNECTING&&(this._transport&&this._transport.close(),this._transportClose(2007,"Transport timed out"))};b.prototype._transportMessage=function(e){var t=this,n=e.slice(0,1),i=e.slice(1),r;switch(n){case"o":this._open();return;case"h":this.dispatchEvent(new un("heartbeat")),W("heartbeat",this.transport);return}if(i)try{r=JSON.parse(i)}catch{}if(!(typeof r>"u"))switch(n){case"a":Array.isArray(r)&&r.forEach(function(o){W("message",t.transport),t.dispatchEvent(new Dn(o))});break;case"m":W("message",this.transport),this.dispatchEvent(new Dn(r));break;case"c":Array.isArray(r)&&r.length===2&&this._close(r[0],r[1],!0);break}};b.prototype._transportClose=function(e,t){if(W("_transportClose",this.transport),this._transport&&(this._transport.removeAllListeners(),this._transport=null,this.transport=null),!Qi(e)&&e!==2e3&&this.readyState===b.CONNECTING){this._connect();return}this._close(e,t)};b.prototype._open=function(){W("_open",this._transport&&this._transport.transportName,this.readyState),this.readyState===b.CONNECTING?(this._transportTimeoutId&&(clearTimeout(this._transportTimeoutId),this._transportTimeoutId=null),this.readyState=b.OPEN,this.transport=this._transport.transportName,this.dispatchEvent(new un("open")),W("connected",this.transport)):this._close(1006,"Server lost session")};b.prototype._close=function(e,t,n){W("_close",this.transport,e,t,n,this.readyState);var i=!1;if(this._ir&&(i=!0,this._ir.close(),this._ir=null),this._transport&&(this._transport.close(),this._transport=null,this.transport=null),this.readyState===b.CLOSED)throw new Error("InvalidStateError: SockJS has already been closed");this.readyState=b.CLOSING,setTimeout((function(){this.readyState=b.CLOSED,i&&this.dispatchEvent(new un("error"));var r=new Io;r.wasClean=n||!1,r.code=e||1e3,r.reason=t,this.dispatchEvent(r),this.onmessage=this.onclose=this.onerror=null}).bind(this),0)};b.prototype.countRTO=function(e){return e>100?4*e:300+e};var Lo=function(e){return Ji=_o(e),wo()(b,e),b},Bo=Ws,Ro=Lo(Bo);"_sockjs_onload"in window&&setTimeout(window._sockjs_onload,1);const Oo=ar(Ro),No="/api";class xt extends Error{constructor(t,n,i=null){super(n),this.status=t,this.data=i}}async function ze(e,t={}){const n=`${No}${e}`,i={"Content-Type":"application/json",...t.headers||{}},r=$.getToken();r&&(i.Authorization=`Bearer ${r}`);const o={...t,headers:i};try{const a=await fetch(n,o);if(a.status===204)return null;const d=a.headers.get("content-type"),h=d&&d.includes("application/json"),p=h?await a.json():await a.text();if(!a.ok){a.status===401&&$.logout();let k="An unexpected error occurred";throw h&&p&&p.message?k=p.message:typeof p=="string"&&p.length>0&&(k=p),new xt(a.status,k,p)}return p}catch(a){throw a instanceof xt?a:new xt(0,a.message||"Network error: could not connect to server")}}const E={get:e=>ze(e,{method:"GET"}),post:(e,t)=>ze(e,{method:"POST",body:JSON.stringify(t)}),put:(e,t)=>ze(e,{method:"PUT",body:t?JSON.stringify(t):void 0}),delete:e=>ze(e,{method:"DELETE"})},hn={getConcurrencyStatus:()=>E.get("/admin/system/concurrency"),getAllUsers:()=>E.get("/admin/users"),createAgent:e=>E.post("/admin/agents",e)};class Ho{constructor(){this.stompClient=null,this.subscribers=[],this.pollingInterval=null,this.latestStats={queueSize:0,activeWorkers:0,processedTickets:0,failedTickets:0},this.isConnected=!1}subscribe(t){return this.subscribers.push(t),t(this.latestStats,this.isConnected),this.subscribers.length===1&&this.start(),()=>{this.subscribers=this.subscribers.filter(n=>n!==t),this.subscribers.length===0&&this.stop()}}broadcast(t){this.latestStats={...this.latestStats,...t},this.subscribers.forEach(n=>n(this.latestStats,this.isConnected))}start(){try{this.stompClient=new cr.Client({webSocketFactory:()=>new Oo("/ws"),reconnectDelay:5e3,debug:()=>{},onConnect:()=>{this.isConnected=!0,this.stompClient.subscribe("/topic/concurrency-stats",t=>{try{const n=JSON.parse(t.body);this.broadcast(n)}catch(n){console.error("Failed to parse concurrency stats message",n)}})},onDisconnect:()=>{this.isConnected=!1},onStompError:()=>{this.isConnected=!1}}),this.stompClient.activate()}catch(t){console.warn("WebSocket init fallback to polling",t),this.isConnected=!1}this.poll(),this.pollingInterval=setInterval(()=>this.poll(),2500)}async poll(){if($.getRole()==="ADMIN")try{const t=await hn.getConcurrencyStatus();t&&this.broadcast(t)}catch{}}stop(){if(this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.stompClient){try{this.stompClient.deactivate()}catch{}this.stompClient=null}this.isConnected=!1}}const Ki=new Ho;let Ut="customer",Et=null;function Po(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-pill">
            <span class="pulse-dot"></span>
            <span>Concurrent Support Orchestration Engine</span>
          </div>

          <h1 class="hero-title">
            Ultra-fast ticket resolution powered by <span class="text-gradient">concurrency & automation</span>
          </h1>

          <p class="hero-subtitle">
            ResolveIQ dynamically prioritizes, escalates, and orchestrates high-volume customer support tickets across multi-threaded background workers and intelligent agent workload balancing.
          </p>

          <div class="hero-cta-group">
            <a href="#/signup" class="btn btn-primary btn-lg">
              Start Free Today
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#/login" class="btn btn-secondary btn-lg">Access Workspace</a>
          </div>

          <!-- Architecture Visualizer Preview -->
          <div class="arch-visualizer" id="architecture">
            <div class="arch-header">
              <div style="text-align:left;">
                <h4 style="margin-bottom:0.25rem;">Live Concurrency Engine</h4>
                <p style="font-size:0.85rem;color:var(--text-secondary);">Real-time metrics streamed via WebSocket STOMP</p>
              </div>
              <div class="live-indicator">
                <span class="pulse-dot"></span>
                <span>Active Telemetry</span>
              </div>
            </div>

            <div class="arch-pipeline">
              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  <span>Priority Queue</span>
                </div>
                <div class="arch-node-value" id="landing-queue-size">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Comparable priority tasks</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  <span>Worker Threads</span>
                </div>
                <div class="arch-node-value" id="landing-active-workers">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Fixed thread pool workers</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>Processed</span>
                </div>
                <div class="arch-node-value" id="landing-processed">0</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">NLP escalation & SLA mapped</div>
              </div>

              <div class="arch-node">
                <div class="arch-node-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>Load Balancer</span>
                </div>
                <div class="arch-node-value" style="color:var(--accent-emerald);">OPTIMAL</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.35rem;">Auto-assigned least-busy agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="section" id="how-it-works">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">System Pipeline</span>
            <h2 class="section-title">How Tickets Flow Through The Engine</h2>
            <p class="section-desc">From initial customer ingestion to resolution and feedback loop, every transition is governed by concurrency guarantees.</p>
          </div>

          <div class="flow-grid">
            <div class="flow-step-card">
              <div class="step-number">01</div>
              <h4>Ingestion & Post-Commit Enqueue</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Customers submit support requests. Spring's <code>TransactionSynchronizationManager</code> ensures tickets are enqueued into <code>TicketQueueManager</code> only after the DB transaction commits.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">02</div>
              <h4>NLP Escalation & SLA Computing</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Concurrent <code>TicketWorker</code> threads inspect incoming tickets for critical keywords ("down", "emergency", "urgent") and dynamically escalate to URGENT with a 2-hour SLA deadline.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">03</div>
              <h4>Optimistic Auto-Assignment</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                A scheduled background engine evaluates agent workloads and matches unclaimed tickets to the least-busy agent using JPA optimistic locking version controls.
              </p>
            </div>

            <div class="flow-step-card">
              <div class="step-number">04</div>
              <h4>Resolution & Feedback Loop</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">
                Agents resolve issues triggering idempotent asynchronous notifications. Customers close tickets, submit star ratings (1-5), and provide feedback to drive agent performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Role-Based Experience Section -->
      <section class="section" id="roles">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Role-Based Workspaces</span>
            <h2 class="section-title">Tailored Portals for Every Stakeholder</h2>
            <p class="section-desc">Experience purpose-built interfaces with strict zero-trust authorization enforcement.</p>
          </div>

          <div class="role-tabs">
            <button class="role-tab-btn active" data-role="customer">Customer Experience</button>
            <button class="role-tab-btn" data-role="agent">Support Agent Portal</button>
            <button class="role-tab-btn" data-role="admin">Admin Mission Control</button>
          </div>

          <div id="role-card-display" class="role-card-content">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>

      <!-- Core Features Grid -->
      <section class="section" id="features">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Enterprise Capabilities</span>
            <h2 class="section-title">Engineered for High Throughput</h2>
            <p class="section-desc">Backed by production-proven backend concurrency patterns and real REST endpoints.</p>
          </div>

          <div class="flow-grid">
            <div class="flow-step-card">
              <div style="color:var(--primary-400);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h4>Optimistic Locking Defense</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Prevents race conditions when multiple agents attempt to claim the same ticket at the exact same millisecond.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-cyan);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h4>Dynamic SLA Computation</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Automatically calculates due dates anchored to ticket creation: 2h (Urgent), 8h (High), 24h (Medium), 72h (Low).</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-emerald);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h4>Real-Time Ticket Comments</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Collaborative discussion threads on every ticket, allowing customers and assigned agents to communicate in context.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-amber);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h4>Agent Rating Analytics</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Customers rate resolved tickets from 1-5 stars. Agents view live rolling average metrics on their personal dashboard.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--accent-rose);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h4>Audit Trail Integrity</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Immutable ticket history logs every status update, auto-escalation, assignment, and manual edit with precise timestamps.</p>
            </div>

            <div class="flow-step-card">
              <div style="color:var(--primary-300);margin-bottom:0.75rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              </div>
              <h4>Resilient Multi-Thread Workers</h4>
              <p style="font-size:0.9rem;margin-top:0.5rem;">Background workers gracefully handle unexpected exceptions without dying, ensuring continuous queue throughput.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology & Trust Section -->
      <section class="section" id="tech">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Technology Architecture</span>
            <h2 class="section-title">Built On Modern Enterprise Foundations</h2>
            <p class="section-desc">Full-stack harmony between modern reactive frontend and robust Java backend.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1.5rem;text-align:center;">
            <div class="card">
              <h3 style="color:var(--primary-400);margin-bottom:0.5rem;">Spring Boot 3</h3>
              <p style="font-size:0.875rem;">Robust REST APIs, JPA Hibernate ORM, and Spring Security with stateless JWT authorization.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-cyan);margin-bottom:0.5rem;">MySQL 8 + Optimistic Locks</h3>
              <p style="font-size:0.875rem;">ACID transactions with @Version column ensuring zero ticket assignment collisions.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-emerald);margin-bottom:0.5rem;">STOMP WebSocket</h3>
              <p style="font-size:0.875rem;">Live pub/sub broadcasting engine metrics directly to admin dashboards with zero lag.</p>
            </div>
            <div class="card">
              <h3 style="color:var(--accent-amber);margin-bottom:0.5rem;">Vite Vanilla Frontend</h3>
              <p style="font-size:0.875rem;">Blazing fast modular JavaScript SPA with responsive custom CSS design system.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="section" style="background:linear-gradient(180deg, transparent, rgba(99,102,241,0.06));text-align:center;padding:6rem 0;">
        <div class="container">
          <h2 style="font-size:2.5rem;margin-bottom:1rem;">Ready to experience high-concurrency support?</h2>
          <p style="font-size:1.15rem;color:var(--text-secondary);max-width:600px;margin:0 auto 2.5rem;">
            Sign up now to submit support requests, or sign in as an Agent or Administrator to manage operations.
          </p>
          <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
            <a href="#/signup" class="btn btn-primary btn-lg">Create Free Account</a>
            <a href="#/login" class="btn btn-secondary btn-lg">Sign In To Workspace</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand-logo" style="margin-bottom:1rem;">
              <div class="brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <span>Resolve<strong style="color:var(--primary-400);">IQ</strong></span>
            </div>
            <p style="font-size:0.9rem;max-width:320px;color:var(--text-muted);">
              Enterprise-grade concurrent customer support ticket processing system with real-time priority queues and automated workload balancing.
            </p>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">Navigation</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><a href="#how-it-works" class="nav-link">How It Works</a></li>
              <li><a href="#roles" class="nav-link">Role Portals</a></li>
              <li><a href="#features" class="nav-link">Features</a></li>
              <li><a href="#tech" class="nav-link">Technology</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">Portals</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><a href="#/login" class="nav-link">Customer Workspace</a></li>
              <li><a href="#/login" class="nav-link">Agent Workbench</a></li>
              <li><a href="#/login" class="nav-link">Admin Telemetry</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9rem;margin-bottom:1rem;text-transform:uppercase;color:var(--text-primary);">System</h4>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
              <li><span style="color:var(--accent-emerald);font-weight:600;">● Engine Online</span></li>
              <li><span style="color:var(--text-muted);">Port 8080 Active</span></li>
              <li><span style="color:var(--text-muted);">WebSocket /ws Live</span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ResolveIQ. All rights reserved.</span>
          <span>High-Throughput Concurrent Support Platform</span>
        </div>
      </div>
    </footer>
  `,ue(),Mo(),Yi(Ut),Et&&Et(),Et=Ki.subscribe(t=>{const n=document.getElementById("landing-queue-size"),i=document.getElementById("landing-active-workers"),r=document.getElementById("landing-processed");n&&(n.innerText=t.queueSize??0),i&&(i.innerText=t.activeWorkers??0),r&&(r.innerText=t.processedTickets??0)}))}function Mo(){const e=document.querySelectorAll(".role-tab-btn");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(n=>n.classList.remove("active")),t.classList.add("active"),Ut=t.getAttribute("data-role"),Yi(Ut)})})}function Yi(e){const t=document.getElementById("role-card-display");t&&(e==="customer"?t.innerHTML=`
      <div>
        <span class="badge badge-role-CUSTOMER" style="margin-bottom:0.75rem;">Customer Portal</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Create, track, and rate your support requests in real-time</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Customers have full transparency over their ticket lifecycle with instant auto-assignment and SLA countdowns.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Instant ticket submission with priority and category selection</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live SLA countdown and automated urgent keyword detection</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Interactive comments thread to communicate directly with support staff</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Star rating (1-5) and feedback submission once ticket is resolved</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/signup" class="btn btn-primary">Create Customer Account</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Live Customer Preview</div>
        <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;margin-bottom:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <span style="font-weight:700;font-size:0.95rem;">API Gateway Timeout</span>
            <span class="badge badge-priority-URGENT">URGENT</span>
          </div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Production services timing out on checkout endpoint.</p>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:var(--text-muted);">
            <span>Status: <strong style="color:var(--status-in-progress);">IN PROGRESS</strong></span>
            <span>SLA: 1h 45m left</span>
          </div>
        </div>
      </div>
    `:e==="agent"?t.innerHTML=`
      <div>
        <span class="badge badge-role-AGENT" style="margin-bottom:0.75rem;">Support Agent Workbench</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Claim tickets, transition statuses, and track your performance</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Agents can browse the global unclaimed queue or work their auto-assigned queue with race-condition prevention.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>One-click ticket claiming with conflict-free optimistic locking</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Status workflow control (ASSIGNED &rarr; IN_PROGRESS &rarr; RESOLVED)</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live rolling average rating score tracking agent satisfaction</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Full audit history inspection for complete context</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/login" class="btn btn-primary">Agent Sign In</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Agent KPI Overview</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
          <div style="background:var(--bg-surface);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Average Rating</div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--accent-amber);">★ 4.8 / 5.0</div>
          </div>
          <div style="background:var(--bg-surface);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Active Assigned</div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary-400);">3 Tickets</div>
          </div>
        </div>
      </div>
    `:t.innerHTML=`
      <div>
        <span class="badge badge-role-ADMIN" style="margin-bottom:0.75rem;">Admin Mission Control</span>
        <h3 style="font-size:1.75rem;margin-bottom:0.75rem;">Complete system oversight, live telemetry, and agent provisioning</h3>
        <p style="color:var(--text-secondary);font-size:1rem;line-height:1.6;">
          Administrators monitor real-time queue health, inspect background threads, and manage system users.
        </p>

        <ul class="role-features-list">
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Live concurrency telemetry stream monitoring worker pool and queues</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Provision new support agents instantly with secure password hashing</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Complete user directory browsing across all roles</span>
          </li>
          <li class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Audit bypass permission to inspect comments and history on any ticket</span>
          </li>
        </ul>

        <div style="margin-top:2rem;">
          <a href="#/login" class="btn btn-primary">Admin Login</a>
        </div>
      </div>

      <div style="background:var(--bg-canvas);border:1px solid var(--border-medium);border-radius:var(--radius-lg);padding:1.5rem;">
        <div style="font-size:0.8rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:1rem;">Telemetry Snapshot</div>
        <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem;">
            <span>Worker Pool Status</span>
            <span style="color:var(--accent-emerald);font-weight:700;">HEALTHY (5/5)</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
            <span>Auto-Assignment Delay</span>
            <span style="font-weight:700;">10,000ms</span>
          </div>
        </div>
      </div>
    `)}const Wt={login:e=>E.post("/auth/login",e),register:e=>E.post("/auth/register",e)};function Do(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <div style="flex-grow:1;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;">
      <div class="card" style="width:100%;max-width:440px;padding:2.5rem;box-shadow:var(--shadow-xl);">
        <div style="text-align:center;margin-bottom:2rem;">
          <div class="brand-mark" style="margin:0 auto 1rem;width:44px;height:44px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h2 style="font-size:1.65rem;margin-bottom:0.35rem;">Welcome back</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);">Sign in to access your role-specific dashboard</p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" id="login-email" class="form-input" placeholder="name@company.com" required autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="login-password">
              <span>Password</span>
            </label>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" />
          </div>

          <div id="login-error-container" style="display:none;margin-bottom:1rem;" class="form-error"></div>

          <button type="submit" id="login-submit-btn" class="btn btn-primary w-full" style="padding:0.8rem;margin-top:0.5rem;">
            Sign In
          </button>
        </form>

        <!-- Quick Demo Profiles for instant testing -->
        <div style="margin-top:1.75rem;padding-top:1.25rem;border-top:1px solid var(--border-subtle);text-align:center;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.75rem;">
            Quick Demo Profiles
          </div>
          <div style="display:flex;gap:0.5rem;justify-content:center;">
            <button type="button" class="btn btn-secondary btn-sm demo-fill-btn" data-email="race-customer@test.com" data-pass="password123">
              Customer
            </button>
            <button type="button" class="btn btn-secondary btn-sm demo-fill-btn" data-email="race-agent-1@test.com" data-pass="password123">
              Agent
            </button>
          </div>
        </div>

        <div style="margin-top:1.5rem;text-align:center;font-size:0.875rem;color:var(--text-secondary);">
          Don't have an account? <a href="#/signup" style="font-weight:600;">Sign up</a>
        </div>
      </div>
    </div>
  `,ue(),Uo())}function Uo(){const e=document.getElementById("login-form"),t=document.getElementById("login-error-container"),n=document.getElementById("login-submit-btn");document.querySelectorAll(".demo-fill-btn").forEach(i=>{i.addEventListener("click",()=>{document.getElementById("login-email").value=i.getAttribute("data-email"),document.getElementById("login-password").value=i.getAttribute("data-pass"),t&&(t.style.display="none")})}),e&&e.addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("login-email").value.trim(),o=document.getElementById("login-password").value;if(!(!r||!o)){n.disabled=!0,n.innerText="Authenticating...",t&&(t.style.display="none");try{const a=await Wt.login({email:r,password:o});$.login(a.token,a.email,a.role),y.success(`Welcome back, ${a.email}`),a.role==="ADMIN"?window.location.hash="#/admin":a.role==="AGENT"?window.location.hash="#/agent":window.location.hash="#/customer"}catch(a){t&&(t.innerText=a.message||"Invalid email or password",t.style.display="block"),y.error(a.message||"Login failed")}finally{n.disabled=!1,n.innerText="Sign In"}}})}function Wo(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <div style="flex-grow:1;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;">
      <div class="card" style="width:100%;max-width:460px;padding:2.5rem;box-shadow:var(--shadow-xl);">
        <div style="text-align:center;margin-bottom:2rem;">
          <div class="brand-mark" style="margin:0 auto 1rem;width:44px;height:44px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h2 style="font-size:1.65rem;margin-bottom:0.35rem;">Create an account</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);">Join ResolveIQ to submit and track support tickets</p>
        </div>

        <form id="signup-form">
          <div class="form-group">
            <label class="form-label" for="signup-name">Full Name</label>
            <input type="text" id="signup-name" class="form-input" placeholder="Alex Morgan" required autocomplete="name" />
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-email">Email Address</label>
            <input type="email" id="signup-email" class="form-input" placeholder="alex@example.com" required autocomplete="email" />
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-password">
              <span>Password</span>
              <span style="font-weight:400;font-size:0.75rem;color:var(--text-muted);">Min. 6 characters</span>
            </label>
            <input type="password" id="signup-password" class="form-input" placeholder="••••••••" required minlength="6" autocomplete="new-password" />
          </div>

          <div id="signup-error-container" style="display:none;margin-bottom:1rem;" class="form-error"></div>

          <button type="submit" id="signup-submit-btn" class="btn btn-primary w-full" style="padding:0.8rem;margin-top:0.5rem;">
            Create Account
          </button>
        </form>

        <div style="margin-top:1.5rem;text-align:center;font-size:0.875rem;color:var(--text-secondary);">
          Already have an account? <a href="#/login" style="font-weight:600;">Sign in</a>
        </div>
      </div>
    </div>
  `,ue(),jo())}function jo(){const e=document.getElementById("signup-form"),t=document.getElementById("signup-error-container"),n=document.getElementById("signup-submit-btn");e&&e.addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("signup-name").value.trim(),o=document.getElementById("signup-email").value.trim(),a=document.getElementById("signup-password").value;if(!(!r||!o||!a)){if(a.length<6){t&&(t.innerText="Password must be at least 6 characters long",t.style.display="block");return}n.disabled=!0,n.innerText="Creating Account...",t&&(t.style.display="none");try{await Wt.register({name:r,email:o,password:a}),y.success("Account created successfully! Logging you in...");const d=await Wt.login({email:o,password:a});$.login(d.token,d.email,d.role),window.location.hash="#/customer"}catch(d){t&&(t.innerText=d.message||"Registration failed",t.style.display="block"),y.error(d.message||"Registration failed")}finally{n.disabled=!1,n.innerText="Create Account"}}})}const ve={createTicket:e=>E.post("/tickets",e),getMyTickets:()=>E.get("/tickets/my"),getTicketById:e=>E.get(`/tickets/${e}`),updateTicket:(e,t)=>E.put(`/tickets/${e}`,t),closeTicket:e=>E.put(`/tickets/${e}/close`),cancelTicket:e=>E.put(`/tickets/${e}/cancel`),rateTicket:(e,t)=>E.put(`/tickets/${e}/rate`,t)},jt={getComments:e=>E.get(`/tickets/${e}/comments`),addComment:(e,t)=>E.post(`/tickets/${e}/comments`,{message:t})},zo={getHistory:e=>E.get(`/tickets/${e}/history`)};let te=null,M="comments";async function le(e,t=null){te=e,M="comments";const n=document.getElementById("modal-container");if(!n)return;n.innerHTML=`
    <div class="drawer-backdrop" id="ticket-drawer-backdrop">
      <div class="drawer-panel" id="ticket-drawer-panel">
        <div class="drawer-header">
          <div style="display:flex;flex-direction:column;gap:0.35rem;overflow:hidden;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="ticket-id">#${e.id}</span>
              ${Ze(e.status)}
              ${et(e.priority)}
              ${tt(e.category)}
            </div>
            <h3 style="font-size:1.25rem;font-weight:700;word-break:break-word;">${ne(e.title)}</h3>
          </div>
          <button class="modal-close" id="drawer-close-btn" aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="drawer-body">
          <!-- Metadata overview -->
          <div style="background:var(--bg-surface-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1.25rem;">
            <div class="drawer-section-title">Description</div>
            <p style="color:var(--text-primary);white-space:pre-wrap;font-size:0.95rem;line-height:1.6;margin-bottom:1.25rem;">
              ${ne(e.description)}
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:1rem;font-size:0.825rem;color:var(--text-muted);border-top:1px solid var(--border-subtle);padding-top:1rem;">
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">Created</span>
                <span>${Je(e.createdAt)}</span>
              </div>
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">SLA Deadline</span>
                <span style="color:${e.dueBy?"var(--accent-amber)":"var(--text-muted)"};font-weight:600;">
                  ${e.dueBy?Je(e.dueBy):"Pending assignment"}
                </span>
              </div>
              <div>
                <span style="display:block;color:var(--text-secondary);font-weight:600;">Assigned Agent</span>
                <span>${e.assignedAgentId?`#${e.assignedAgentId}`:"Unassigned"}</span>
              </div>
              ${e.rating?`
                <div>
                  <span style="display:block;color:var(--text-secondary);font-weight:600;">Customer Rating</span>
                  <span style="color:var(--accent-amber);font-weight:700;">★ ${e.rating}/5</span>
                </div>
              `:""}
            </div>
            ${e.feedback?`
              <div style="margin-top:0.75rem;padding:0.75rem;background:rgba(245,158,11,0.08);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text-secondary);">
                <strong style="color:var(--accent-amber);">Customer Feedback:</strong> "${ne(e.feedback)}"
              </div>
            `:""}
          </div>

          <!-- Tabs: Comments & Audit History -->
          <div>
            <div style="display:flex;gap:1rem;border-bottom:1px solid var(--border-subtle);margin-bottom:1.25rem;">
              <button class="nav-link ${M==="comments"?"active":""}" id="tab-btn-comments" style="padding-bottom:0.6rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${M==="comments"?"var(--primary-500)":"transparent"};color:${M==="comments"?"var(--text-primary)":"var(--text-muted)"};">
                Discussion & Comments
              </button>
              <button class="nav-link ${M==="history"?"active":""}" id="tab-btn-history" style="padding-bottom:0.6rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${M==="history"?"var(--primary-500)":"transparent"};color:${M==="history"?"var(--text-primary)":"var(--text-muted)"};">
                Audit Timeline
              </button>
            </div>

            <div id="drawer-tab-content">
              <div class="skeleton skeleton-card"></div>
            </div>
          </div>
        </div>

        <div class="drawer-footer" id="drawer-actions-footer">
          <!-- Dynamic Action Buttons will render here -->
        </div>
      </div>
    </div>
  `;const i=document.getElementById("ticket-drawer-backdrop"),r=document.getElementById("drawer-close-btn"),o=()=>qo();r.addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()}),document.getElementById("tab-btn-comments").addEventListener("click",()=>{M="comments",St()}),document.getElementById("tab-btn-history").addEventListener("click",()=>{M="history",St()}),St()}function qo(){const e=document.getElementById("modal-container");e&&(e.innerHTML=""),te=null}async function St(){const e=document.getElementById("drawer-tab-content"),t=document.getElementById("tab-btn-comments"),n=document.getElementById("tab-btn-history");if(!(!e||!te))if(M==="comments"){t.style.borderBottomColor="var(--primary-500)",t.style.color="var(--text-primary)",n.style.borderBottomColor="transparent",n.style.color="var(--text-muted)",e.innerHTML='<div class="skeleton skeleton-card"></div>';try{const i=await jt.getComments(te.id);Zi(e,i)}catch(i){e.innerHTML=`<div class="form-error">Failed to load comments: ${ne(i.message)}</div>`}}else{n.style.borderBottomColor="var(--primary-500)",n.style.color="var(--text-primary)",t.style.borderBottomColor="transparent",t.style.color="var(--text-muted)",e.innerHTML='<div class="skeleton skeleton-card"></div>';try{const i=await zo.getHistory(te.id);Fo(e,i)}catch(i){e.innerHTML=`<div class="form-error">Failed to load audit history: ${ne(i.message)}</div>`}}}function Zi(e,t){let n=`
    <div class="comments-container">
      ${t.length===0?`
        <div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.875rem;">
          No comments yet. Start the conversation below.
        </div>
      `:t.map(r=>`
        <div class="comment-bubble">
          <div class="comment-header">
            <span style="font-weight:700;color:var(--text-primary);">User #${r.userId}</span>
            <span style="color:var(--text-muted);font-size:0.75rem;">${Je(r.createdAt)}</span>
          </div>
          <div class="comment-message">${ne(r.message)}</div>
        </div>
      `).join("")}

      <form id="drawer-add-comment-form" style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem;">
        <textarea id="comment-input" class="form-textarea" placeholder="Write an internal note or reply to customer..." style="min-height:80px;" required></textarea>
        <div style="display:flex;justify-content:flex-end;">
          <button type="submit" class="btn btn-primary btn-sm" id="submit-comment-btn">Post Comment</button>
        </div>
      </form>
    </div>
  `;e.innerHTML=n;const i=document.getElementById("drawer-add-comment-form");i&&i.addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("comment-input"),a=document.getElementById("submit-comment-btn"),d=o.value.trim();if(d){a.disabled=!0,a.innerText="Posting...";try{await jt.addComment(te.id,d),y.success("Comment added");const h=await jt.getComments(te.id);Zi(e,h)}catch(h){y.error(h.message),a.disabled=!1,a.innerText="Post Comment"}}})}function Fo(e,t){if(!t||t.length===0){e.innerHTML=`
      <div style="text-align:center;padding:1.5rem;color:var(--text-muted);font-size:0.875rem;">
        No audit entries recorded yet.
      </div>
    `;return}e.innerHTML=`
    <div class="timeline-container">
      ${t.map(n=>`
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-title">${ne(Vo(n.action))}</div>
          <div style="font-size:0.825rem;color:var(--text-secondary);">
            ${n.oldStatus&&n.newStatus?`Status: <span style="font-family:var(--font-mono);">${n.oldStatus} &rarr; ${n.newStatus}</span>`:""}
            ${n.oldPriority&&n.newPriority?`Priority: <span style="font-family:var(--font-mono);">${n.oldPriority} &rarr; ${n.newPriority}</span>`:""}
          </div>
          <div class="timeline-time">${Je(n.timestamp)} • Actor ID: ${n.changedBy}</div>
        </div>
      `).join("")}
    </div>
  `}function Vo(e){return e?e.replace(/_/g," "):"Update Recorded"}function Je(e){if(!e)return"—";try{return new Date(e).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}function ne(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}let Fe=null;function ge({title:e="Confirmation",bodyHtml:t="",confirmText:n="Confirm",confirmClass:i="btn-primary",cancelText:r="Cancel",onConfirm:o=null}){const a=document.getElementById("modal-container");if(!a)return;Fe=o,a.innerHTML=`
    <div class="modal-backdrop" id="active-modal-backdrop">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${qe(e)}</h3>
          <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${t}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modal-cancel-btn">${qe(r)}</button>
          <button type="button" class="btn ${i}" id="modal-confirm-btn">${qe(n)}</button>
        </div>
      </div>
    </div>
  `;const d=document.getElementById("active-modal-backdrop"),h=document.getElementById("modal-close-btn"),p=document.getElementById("modal-cancel-btn"),k=document.getElementById("modal-confirm-btn"),u=()=>_t();h.addEventListener("click",u),p.addEventListener("click",u),d.addEventListener("click",S=>{S.target===d&&u()});const g=S=>{S.key==="Escape"&&(u(),document.removeEventListener("keydown",g))};document.addEventListener("keydown",g),k.addEventListener("click",async()=>{if(typeof Fe=="function"){k.disabled=!0,k.innerHTML="Processing...";try{await Fe()!==!1&&_t()}catch(S){console.error("Modal confirm error:",S)}finally{k.disabled=!1,k.innerHTML=qe(n)}}else _t()})}function _t(){const e=document.getElementById("modal-container");e&&(e.innerHTML=""),Fe=null}function qe(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}function lt({title:e="No records found",description:t="There are no items to display at this time.",actionText:n=null,actionId:i=null}){return`
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h4 class="empty-title">${Ct(e)}</h4>
      <p class="empty-desc">${Ct(t)}</p>
      ${n&&i?`
        <button id="${i}" class="btn btn-primary btn-sm">
          ${Ct(n)}
        </button>
      `:""}
    </div>
  `}function Ct(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}let I=[],zt="ALL",qt="ALL",Ft="";async function Go(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Customer Support Workspace</h1>
            <p class="page-subtitle">Submit, track, and manage your technical and billing support requests</p>
          </div>
          <button id="btn-create-ticket" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Create New Ticket</span>
          </button>
        </div>

        <!-- Metrics Overview -->
        <div class="metrics-grid" id="customer-metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Total Tickets</span>
              <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-total">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Active / Open</span>
              <div class="metric-icon" style="background:rgba(56,189,248,0.15);color:var(--status-open);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-active">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Resolved</span>
              <div class="metric-icon" style="background:rgba(52,211,153,0.15);color:var(--status-resolved);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-resolved">0</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Closed & Rated</span>
              <div class="metric-icon" style="background:rgba(245,158,11,0.15);color:var(--accent-amber);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <div class="metric-value" id="metric-closed">0</div>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="filter-bar">
          <div class="filter-pills" id="status-filter-pills">
            <button class="filter-pill active" data-status="ALL">All</button>
            <button class="filter-pill" data-status="OPEN">Open</button>
            <button class="filter-pill" data-status="ASSIGNED">Assigned</button>
            <button class="filter-pill" data-status="IN_PROGRESS">In Progress</button>
            <button class="filter-pill" data-status="RESOLVED">Resolved</button>
            <button class="filter-pill" data-status="CLOSED">Closed</button>
            <button class="filter-pill" data-status="CANCELLED">Cancelled</button>
          </div>

          <div style="display:flex;align-items:center;gap:0.75rem;">
            <select id="priority-filter-select" class="form-select" style="width:auto;padding:0.45rem 0.85rem;font-size:0.85rem;">
              <option value="ALL">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <input type="text" id="ticket-search-input" class="form-input" placeholder="Search tickets..." style="width:240px;padding:0.45rem 0.85rem;font-size:0.85rem;" />
          </div>
        </div>

        <!-- Tickets Container -->
        <div id="customer-tickets-container">
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `,ue(),Jo(),V())}async function V(){const e=document.getElementById("customer-tickets-container");if(e)try{const t=await ve.getMyTickets();I=Array.isArray(t)?t:[],I.sort((n,i)=>i.id-n.id),Xo(),Ve()}catch(t){e.innerHTML=`
      <div class="card" style="padding:2rem;text-align:center;border-color:rgba(244,63,94,0.3);">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load tickets</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${Qe(t.message)}</p>
        <button id="btn-retry-tickets" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;const n=document.getElementById("btn-retry-tickets");n&&n.addEventListener("click",V)}}function Xo(){const e=document.getElementById("metric-total"),t=document.getElementById("metric-active"),n=document.getElementById("metric-resolved"),i=document.getElementById("metric-closed");e&&(e.innerText=I.length,t.innerText=I.filter(r=>["OPEN","ASSIGNED","IN_PROGRESS"].includes(r.status)).length,n.innerText=I.filter(r=>r.status==="RESOLVED").length,i.innerText=I.filter(r=>r.status==="CLOSED").length)}function Ve(){const e=document.getElementById("customer-tickets-container");if(!e)return;const t=I.filter(n=>{if(zt!=="ALL"&&n.status!==zt||qt!=="ALL"&&n.priority!==qt)return!1;if(Ft){const i=Ft.toLowerCase(),r=(n.title||"").toLowerCase().includes(i),o=(n.description||"").toLowerCase().includes(i),a=n.id.toString().includes(i);if(!r&&!o&&!a)return!1}return!0});if(t.length===0){e.innerHTML=lt({title:"No tickets found",description:I.length===0?"You have not submitted any support requests yet.":"No tickets match the selected filters.",actionText:I.length===0?"Create Your First Ticket":null,actionId:"empty-create-ticket-btn"});const n=document.getElementById("empty-create-ticket-btn");n&&n.addEventListener("click",er);return}e.innerHTML=`
    <div class="tickets-grid">
      ${t.map(n=>`
        <div class="ticket-item-card" data-id="${n.id}">
          <div class="ticket-info-main">
            <div class="ticket-header-row">
              <span class="ticket-id">#${n.id}</span>
              ${Ze(n.status)}
              ${et(n.priority)}
              ${tt(n.category)}
            </div>
            <div class="ticket-title">${Qe(n.title)}</div>
            <div class="ticket-meta-row">
              <span>Created ${Un(n.createdAt)}</span>
              ${n.dueBy?`<span>SLA Due: <strong>${Un(n.dueBy)}</strong></span>`:""}
              ${n.rating?`<span style="color:var(--accent-amber);font-weight:700;">★ ${n.rating}/5</span>`:""}
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            ${n.status==="OPEN"?`
              <button class="btn btn-secondary btn-sm action-edit-btn" data-id="${n.id}" title="Edit Ticket">Edit</button>
              <button class="btn btn-danger btn-sm action-cancel-btn" data-id="${n.id}" title="Cancel Ticket">Cancel</button>
            `:""}

            ${n.status==="RESOLVED"?`
              <button class="btn btn-primary btn-sm action-close-btn" data-id="${n.id}">Close Ticket</button>
            `:""}

            ${n.status==="CLOSED"&&!n.rating?`
              <button class="btn btn-secondary btn-sm action-rate-btn" data-id="${n.id}" style="color:var(--accent-amber);border-color:rgba(245,158,11,0.4);">
                ★ Rate
              </button>
            `:""}

            <button class="btn btn-secondary btn-sm action-view-btn" data-id="${n.id}">
              Details &rarr;
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `,e.querySelectorAll(".ticket-item-card").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.getAttribute("data-id")),r=I.find(o=>o.id===i);r&&le(r,V)})}),e.querySelectorAll(".action-view-btn").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const r=Number(n.getAttribute("data-id")),o=I.find(a=>a.id===r);o&&le(o,V)})}),e.querySelectorAll(".action-edit-btn").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const r=Number(n.getAttribute("data-id")),o=I.find(a=>a.id===r);o&&Qo(o)})}),e.querySelectorAll(".action-cancel-btn").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const r=Number(n.getAttribute("data-id"));Ko(r)})}),e.querySelectorAll(".action-close-btn").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const r=Number(n.getAttribute("data-id"));Yo(r)})}),e.querySelectorAll(".action-rate-btn").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();const r=Number(n.getAttribute("data-id")),o=I.find(a=>a.id===r);o&&Zo(o)})})}function Jo(){const e=document.getElementById("btn-create-ticket");e&&e.addEventListener("click",er);const t=document.querySelectorAll(".filter-pill");t.forEach(r=>{r.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("active")),r.classList.add("active"),zt=r.getAttribute("data-status"),Ve()})});const n=document.getElementById("priority-filter-select");n&&n.addEventListener("change",r=>{qt=r.target.value,Ve()});const i=document.getElementById("ticket-search-input");i&&i.addEventListener("input",r=>{Ft=r.target.value.trim(),Ve()})}function er(){ge({title:"Create Support Ticket",bodyHtml:`
    <form id="modal-create-ticket-form">
      <div class="form-group">
        <label class="form-label" for="create-title">Ticket Subject / Title</label>
        <input type="text" id="create-title" class="form-input" placeholder="e.g. Payment Gateway failing with 504 timeout" required />
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group">
          <label class="form-label" for="create-priority">Initial Priority</label>
          <select id="create-priority" class="form-select" required>
            <option value="LOW">Low (72h SLA)</option>
            <option value="MEDIUM" selected>Medium (24h SLA)</option>
            <option value="HIGH">High (8h SLA)</option>
            <option value="URGENT">Urgent (2h SLA)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="create-category">Category</label>
          <select id="create-category" class="form-select" required>
            <option value="TECHNICAL" selected>Technical</option>
            <option value="PAYMENT">Payment</option>
            <option value="LOGIN">Login</option>
            <option value="ACCOUNT">Account</option>
            <option value="REFUND">Refund</option>
            <option value="ORDER">Order</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="create-desc">Description</label>
        <textarea id="create-desc" class="form-textarea" placeholder="Detailed description of the issue or request..." style="min-height:120px;" required></textarea>
        <span style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">
          Tip: Words like "down", "urgent", or "emergency" are automatically detected by workers for priority escalation.
        </span>
      </div>
    </form>
  `,confirmText:"Submit Ticket",confirmClass:"btn-primary",onConfirm:async()=>{const t=document.getElementById("create-title").value.trim(),n=document.getElementById("create-priority").value,i=document.getElementById("create-category").value,r=document.getElementById("create-desc").value.trim();if(!t||!r)return y.error("Title and description are required"),!1;try{return await ve.createTicket({title:t,priority:n,category:i,description:r}),y.success("Ticket created & queued for worker processing!"),V(),!0}catch(o){return y.error(o.message||"Failed to create ticket"),!1}}})}function Qo(e){const t=`
    <form id="modal-edit-ticket-form">
      <div class="form-group">
        <label class="form-label" for="edit-title">Ticket Subject / Title</label>
        <input type="text" id="edit-title" class="form-input" value="${Qe(e.title)}" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="edit-desc">Description</label>
        <textarea id="edit-desc" class="form-textarea" style="min-height:120px;" required>${Qe(e.description)}</textarea>
      </div>
    </form>
  `;ge({title:`Edit Ticket #${e.id}`,bodyHtml:t,confirmText:"Save Changes",confirmClass:"btn-primary",onConfirm:async()=>{const n=document.getElementById("edit-title").value.trim(),i=document.getElementById("edit-desc").value.trim();if(!n||!i)return y.error("Title and description are required"),!1;try{return await ve.updateTicket(e.id,{title:n,description:i}),y.success("Ticket updated"),V(),!0}catch(r){return y.error(r.message||"Failed to update ticket"),!1}}})}function Ko(e){ge({title:"Cancel Support Ticket",bodyHtml:`<p>Are you sure you want to cancel Ticket #${e}? This transition cannot be undone.</p>`,confirmText:"Yes, Cancel Ticket",confirmClass:"btn-danger",onConfirm:async()=>{try{return await ve.cancelTicket(e),y.success(`Ticket #${e} cancelled`),V(),!0}catch(t){return y.error(t.message||"Could not cancel ticket"),!1}}})}function Yo(e){ge({title:"Close Resolved Ticket",bodyHtml:`<p>Mark Ticket #${e} as CLOSED? Once closed, you will be able to rate the support agent's performance.</p>`,confirmText:"Close Ticket",confirmClass:"btn-primary",onConfirm:async()=>{try{return await ve.closeTicket(e),y.success(`Ticket #${e} closed!`),V(),!0}catch(t){return y.error(t.message||"Could not close ticket"),!1}}})}function Zo(e){const t=`
    <form id="modal-rate-form">
      <p style="margin-bottom:1rem;color:var(--text-secondary);font-size:0.9rem;">
        How satisfied were you with the resolution of Ticket #${e.id}?
      </p>

      <div class="form-group">
        <label class="form-label" for="rate-score">Star Rating (1 - 5)</label>
        <select id="rate-score" class="form-select" required>
          <option value="5" selected>★★★★★ - 5 (Excellent)</option>
          <option value="4">★★★★☆ - 4 (Good)</option>
          <option value="3">★★★☆☆ - 3 (Average)</option>
          <option value="2">★★☆☆☆ - 2 (Poor)</option>
          <option value="1">★☆☆☆☆ - 1 (Unacceptable)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="rate-feedback">Optional Feedback / Comments</label>
        <textarea id="rate-feedback" class="form-textarea" placeholder="Share your experience with the support agent..."></textarea>
      </div>
    </form>
  `;ge({title:`Rate Service on Ticket #${e.id}`,bodyHtml:t,confirmText:"Submit Rating",confirmClass:"btn-primary",onConfirm:async()=>{const n=Number(document.getElementById("rate-score").value),i=document.getElementById("rate-feedback").value.trim();try{return await ve.rateTicket(e.id,{rating:n,feedback:i||null}),y.success("Thank you! Your feedback has been recorded."),V(),!0}catch(r){return y.error(r.message||"Could not submit rating"),!1}}})}function Un(e){if(!e)return"—";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}function Qe(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}const Ee={getAvailableTickets:()=>E.get("/agent/tickets"),getMyAssignedTickets:()=>E.get("/agent/tickets/assigned"),claimTicket:e=>E.put(`/agent/tickets/${e}/claim`),updateStatus:(e,t)=>E.put(`/agent/tickets/${e}/status`,{status:t}),getAverageRating:()=>E.get("/agent/rating")};let N="assigned",Q=[],K=[],Ge=null;async function ea(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Support Agent Workbench</h1>
            <p class="page-subtitle">Process incoming tickets, progress resolution workflows, and track customer satisfaction</p>
          </div>
          <button id="btn-refresh-agent-queue" class="btn btn-secondary btn-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            <span>Refresh Queue</span>
          </button>
        </div>

        <!-- Agent KPI Banner -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Average Satisfaction</span>
              <div class="metric-icon" style="background:rgba(245,158,11,0.15);color:var(--accent-amber);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-rating" style="color:var(--accent-amber);">—</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Based on customer closed ratings</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">My Assigned Queue</span>
              <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-assigned-count">0</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Active tickets assigned to you</div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Global Unclaimed</span>
              <div class="metric-icon" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            </div>
            <div class="metric-value" id="kpi-unclaimed-count">0</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Available for claiming</div>
          </div>
        </div>

        <!-- Workbench Tabs -->
        <div style="display:flex;align-items:center;gap:1rem;border-bottom:1px solid var(--border-subtle);margin-bottom:1.5rem;">
          <button class="nav-link ${N==="assigned"?"active":""}" id="agent-tab-assigned" style="padding-bottom:0.75rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${N==="assigned"?"var(--primary-500)":"transparent"};color:${N==="assigned"?"var(--text-primary)":"var(--text-muted)"};">
            My Assigned Tickets (<span id="tab-count-assigned">0</span>)
          </button>
          <button class="nav-link ${N==="available"?"active":""}" id="agent-tab-available" style="padding-bottom:0.75rem;background:none;border:none;cursor:pointer;font-weight:700;border-bottom:2px solid ${N==="available"?"var(--primary-500)":"transparent"};color:${N==="available"?"var(--text-primary)":"var(--text-muted)"};">
            Available Unclaimed Queue (<span id="tab-count-available">0</span>)
          </button>
        </div>

        <!-- Workbench Content Container -->
        <div id="agent-content-container">
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `,ue(),oa(),D())}async function D(){const e=document.getElementById("agent-content-container");if(e)try{const[t,n,i]=await Promise.all([Ee.getMyAssignedTickets(),Ee.getAvailableTickets(),Ee.getAverageRating()]);Q=t||[],Q.sort((r,o)=>o.id-r.id),K=n||[],K.sort((r,o)=>o.id-r.id),Ge=i,ta(),Ke()}catch(t){e.innerHTML=`
      <div class="card" style="padding:2rem;text-align:center;border-color:rgba(244,63,94,0.3);">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load agent queue</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${mn(t.message)}</p>
        <button id="btn-retry-agent" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;const n=document.getElementById("btn-retry-agent");n&&n.addEventListener("click",D)}}function ta(){const e=document.getElementById("kpi-rating"),t=document.getElementById("kpi-assigned-count"),n=document.getElementById("kpi-unclaimed-count"),i=document.getElementById("tab-count-assigned"),r=document.getElementById("tab-count-available");if(e){const o=Number(Ge);e.innerText=!isNaN(o)&&Ge!==null&&Ge!==""?`★ ${o.toFixed(1)} / 5.0`:"No ratings yet"}t&&(t.innerText=Q.length),n&&(n.innerText=K.length),i&&(i.innerText=Q.length),r&&(r.innerText=K.length)}function Ke(){const e=document.getElementById("agent-content-container");e&&(N==="assigned"?na(e):ia(e))}function na(e){if(Q.length===0){e.innerHTML=lt({title:"No tickets assigned to you",description:"You currently have no active assigned tickets. Check the unclaimed queue to pick up new work!",actionText:"Browse Unclaimed Queue",actionId:"btn-switch-to-available"});const t=document.getElementById("btn-switch-to-available");t&&t.addEventListener("click",()=>{N="available",Vt(),Ke()});return}e.innerHTML=`
    <div class="tickets-grid">
      ${Q.map(t=>`
        <div class="ticket-item-card" data-id="${t.id}">
          <div class="ticket-info-main">
            <div class="ticket-header-row">
              <span class="ticket-id">#${t.id}</span>
              ${Ze(t.status)}
              ${et(t.priority)}
              ${tt(t.category)}
            </div>
            <div class="ticket-title">${mn(t.title)}</div>
            <div class="ticket-meta-row">
              <span>Customer ID: #${t.customerId}</span>
              <span>Created ${Ye(t.createdAt)}</span>
              ${t.dueBy?`<span>SLA Due: <strong>${Ye(t.dueBy)}</strong></span>`:""}
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            ${t.status==="ASSIGNED"?`
              <button class="btn btn-primary btn-sm btn-status-progress" data-id="${t.id}" data-status="IN_PROGRESS">
                Start Working &rarr;
              </button>
            `:""}

            ${t.status==="IN_PROGRESS"?`
              <button class="btn btn-primary btn-sm btn-status-resolve" data-id="${t.id}" data-status="RESOLVED" style="background:var(--accent-emerald);">
                ✓ Mark Resolved
              </button>
            `:""}

            <button class="btn btn-secondary btn-sm btn-view-drawer" data-id="${t.id}">
              Details & Comments &rarr;
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `,ra(e)}function ia(e){if(K.length===0){e.innerHTML=lt({title:"Queue is clean!",description:"There are no unclaimed tickets waiting in the queue. Outstanding work is fully allocated."});return}e.innerHTML=`
    <div class="tickets-grid">
      ${K.map(t=>`
        <div class="ticket-item-card" data-id="${t.id}">
          <div class="ticket-info-main">
            <div class="ticket-header-row">
              <span class="ticket-id">#${t.id}</span>
              ${Ze(t.status)}
              ${et(t.priority)}
              ${tt(t.category)}
            </div>
            <div class="ticket-title">${mn(t.title)}</div>
            <div class="ticket-meta-row">
              <span>Created ${Ye(t.createdAt)}</span>
              ${t.dueBy?`<span>SLA Deadline: <strong>${Ye(t.dueBy)}</strong></span>`:""}
              <span style="color:var(--accent-emerald);font-weight:600;">● Unassigned</span>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:0.5rem;" onclick="event.stopPropagation();">
            <button class="btn btn-primary btn-sm btn-claim-ticket" data-id="${t.id}">
              ⚡ Claim Ticket
            </button>
            <button class="btn btn-secondary btn-sm btn-view-drawer" data-id="${t.id}">
              Inspect &rarr;
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `,sa(e)}function ra(e){e.querySelectorAll(".ticket-item-card").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-id")),i=Q.find(r=>r.id===n);i&&le(i,D)})}),e.querySelectorAll(".btn-view-drawer").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const i=Number(t.getAttribute("data-id")),r=Q.find(o=>o.id===i);r&&le(r,D)})}),e.querySelectorAll(".btn-status-progress, .btn-status-resolve").forEach(t=>{t.addEventListener("click",async n=>{n.stopPropagation();const i=Number(t.getAttribute("data-id")),r=t.getAttribute("data-status");t.disabled=!0,t.innerText="Updating...";try{await Ee.updateStatus(i,r),y.success(`Ticket #${i} transitioned to ${r}`),D()}catch(o){y.error(o.message||"Status transition failed"),t.disabled=!1,t.innerText="Retry"}})})}function sa(e){e.querySelectorAll(".ticket-item-card").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-id")),i=K.find(r=>r.id===n);i&&le(i,D)})}),e.querySelectorAll(".btn-view-drawer").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const i=Number(t.getAttribute("data-id")),r=K.find(o=>o.id===i);r&&le(r,D)})}),e.querySelectorAll(".btn-claim-ticket").forEach(t=>{t.addEventListener("click",async n=>{n.stopPropagation();const i=Number(t.getAttribute("data-id"));t.disabled=!0,t.innerText="Claiming...";try{await Ee.claimTicket(i),y.success(`Successfully claimed Ticket #${i}!`),D()}catch(r){y.error(r.message||"Conflict: another agent just claimed this ticket."),D()}})})}function oa(){const e=document.getElementById("btn-refresh-agent-queue");e&&e.addEventListener("click",D);const t=document.getElementById("agent-tab-assigned"),n=document.getElementById("agent-tab-available");t&&t.addEventListener("click",()=>{N="assigned",Vt(),Ke()}),n&&n.addEventListener("click",()=>{N="available",Vt(),Ke()})}function Vt(){const e=document.getElementById("agent-tab-assigned"),t=document.getElementById("agent-tab-available");N==="assigned"?(e&&(e.style.borderBottomColor="var(--primary-500)",e.style.color="var(--text-primary)"),t&&(t.style.borderBottomColor="transparent",t.style.color="var(--text-muted)")):(t&&(t.style.borderBottomColor="var(--primary-500)",t.style.color="var(--text-primary)"),e&&(e.style.borderBottomColor="transparent",e.style.color="var(--text-muted)"))}function Ye(e){if(!e)return"—";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}function mn(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}function aa(e){const t=document.getElementById(e);return t?(t.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
      <div style="display:flex;align-items:center;gap:0.6rem;">
        <span class="pulse-dot"></span>
        <span style="font-weight:700;font-size:0.95rem;letter-spacing:0.02em;">Worker Pool Concurrency Telemetry</span>
      </div>
      <span id="telemetry-status-badge" class="badge" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald);">
        LIVE STREAM
      </span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Priority Queue Size</span>
          <div class="metric-icon" style="background:rgba(99,102,241,0.15);color:var(--primary-400);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-queue-size">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Tickets awaiting worker dequeue</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Active Workers</span>
          <div class="metric-icon" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-active-workers">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Threads actively computing SLA/Escalation</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Processed Tickets</span>
          <div class="metric-icon" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-processed-tickets">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Successfully escalated & SLA timed</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">Failed Tasks</span>
          <div class="metric-icon" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        </div>
        <div class="metric-value" id="stat-failed-tickets">0</div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">Non-blocking isolated task exceptions</div>
      </div>
    </div>
  `,Ki.subscribe(i=>{const r=document.getElementById("stat-queue-size"),o=document.getElementById("stat-active-workers"),a=document.getElementById("stat-processed-tickets"),d=document.getElementById("stat-failed-tickets");r&&(r.innerText=i.queueSize??0),o&&(o.innerText=i.activeWorkers??0),a&&(a.innerText=i.processedTickets??0),d&&(d.innerText=i.failedTickets??0)})):void 0}let tr=[],Gt="ALL",Xt="",Tt=null;async function ca(){const e=document.getElementById("app");e&&(e.innerHTML=`
    ${de()}

    <main class="app-main">
      <div class="workspace-content">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Admin Mission Control</h1>
            <p class="page-subtitle">Real-time worker concurrency telemetry, agent provisioning, and user access oversight</p>
          </div>
          <button id="btn-provision-agent" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            <span>Provision Support Agent</span>
          </button>
        </div>

        <!-- Live Concurrency Telemetry Widget -->
        <div id="admin-telemetry-container" style="margin-bottom:2.5rem;"></div>

        <!-- User Management Header & Filters -->
        <div class="page-header" style="margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.35rem;">System User Directory</h3>
            <p style="font-size:0.875rem;color:var(--text-secondary);">Browse all provisioned customers, agents, and administrators</p>
          </div>

          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <div class="filter-pills" id="admin-role-filter-pills">
              <button class="filter-pill active" data-role="ALL">All Users</button>
              <button class="filter-pill" data-role="CUSTOMER">Customers</button>
              <button class="filter-pill" data-role="AGENT">Agents</button>
              <button class="filter-pill" data-role="ADMIN">Admins</button>
            </div>

            <input type="text" id="admin-user-search" class="form-input" placeholder="Search by name or email..." style="width:240px;padding:0.45rem 0.85rem;font-size:0.85rem;" />
          </div>
        </div>

        <!-- Users Table -->
        <div class="table-wrapper" id="admin-users-table-container">
          <div class="skeleton skeleton-card"></div>
        </div>
      </div>
    </main>
  `,ue(),la(),Tt&&Tt(),Tt=aa("admin-telemetry-container"),pn())}async function pn(){const e=document.getElementById("admin-users-table-container");if(e)try{tr=await hn.getAllUsers(),Jt()}catch(t){e.innerHTML=`
      <div style="padding:2rem;text-align:center;">
        <h4 style="color:var(--accent-rose);margin-bottom:0.5rem;">Failed to load user directory</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">${Qt(t.message)}</p>
        <button id="btn-retry-users" class="btn btn-secondary btn-sm">Retry</button>
      </div>
    `;const n=document.getElementById("btn-retry-users");n&&n.addEventListener("click",pn)}}function Jt(){const e=document.getElementById("admin-users-table-container");if(!e)return;const t=tr.filter(n=>{if(Gt!=="ALL"&&n.role!==Gt)return!1;if(Xt){const i=Xt.toLowerCase(),r=(n.username||"").toLowerCase().includes(i),o=(n.email||"").toLowerCase().includes(i),a=n.id.toString().includes(i);if(!r&&!o&&!a)return!1}return!0});if(t.length===0){e.innerHTML=lt({title:"No users found",description:"No accounts match the selected role or search query."});return}e.innerHTML=`
    <table class="data-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name / Username</th>
          <th>Email Address</th>
          <th>Assigned Role</th>
          <th style="text-align:right;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(n=>`
          <tr>
            <td style="font-family:var(--font-mono);font-weight:700;color:var(--text-muted);">#${n.id}</td>
            <td style="font-weight:600;color:var(--text-primary);">${Qt(n.username||"—")}</td>
            <td>${Qt(n.email)}</td>
            <td>${jn(n.role)}</td>
            <td style="text-align:right;">
              <span class="badge" style="background:rgba(16,185,129,0.12);color:var(--accent-emerald);">Active</span>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function la(){const e=document.getElementById("btn-provision-agent");e&&e.addEventListener("click",da);const t=document.querySelectorAll("#admin-role-filter-pills .filter-pill");t.forEach(i=>{i.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),i.classList.add("active"),Gt=i.getAttribute("data-role"),Jt()})});const n=document.getElementById("admin-user-search");n&&n.addEventListener("input",i=>{Xt=i.target.value.trim(),Jt()})}function da(){ge({title:"Provision New Support Agent",bodyHtml:`
    <form id="modal-provision-agent-form">
      <p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:1.25rem;">
        Provisioning an agent grants access to the Support Agent Workbench, ticket claiming, and status workflow transitions.
      </p>

      <div class="form-group">
        <label class="form-label" for="agent-name">Agent Full Name</label>
        <input type="text" id="agent-name" class="form-input" placeholder="Sam Vance" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="agent-email">Agent Email Address</label>
        <input type="email" id="agent-email" class="form-input" placeholder="sam.vance@company.com" required />
      </div>

      <div class="form-group">
        <label class="form-label" for="agent-password">Initial Password</label>
        <input type="password" id="agent-password" class="form-input" placeholder="••••••••" required minlength="6" />
        <span style="font-size:0.75rem;color:var(--text-muted);margin-top:0.25rem;">Min. 6 characters. Passwords are securely hashed with BCrypt.</span>
      </div>
    </form>
  `,confirmText:"Provision Agent",confirmClass:"btn-primary",onConfirm:async()=>{const t=document.getElementById("agent-name").value.trim(),n=document.getElementById("agent-email").value.trim(),i=document.getElementById("agent-password").value;if(!t||!n||!i)return y.error("All fields are required"),!1;if(i.length<6)return y.error("Password must be at least 6 characters"),!1;try{return await hn.createAgent({name:t,email:n,password:i}),y.success(`Agent ${t} provisioned successfully!`),pn(),!0}catch(r){return y.error(r.message||"Failed to provision agent"),!1}}})}function Qt(e){const t=document.createElement("div");return t.textContent=e||"",t.innerHTML}function ua(){window.addEventListener("hashchange",Wn),$.subscribe(()=>{!$.isAuthenticated()&&ha(window.location.hash)&&(window.location.hash="#/login")}),Wn()}function ha(e){const t=e.replace(/^#/,"").split("?")[0]||"/";return["/customer","/agent","/admin"].some(n=>t.startsWith(n))}function Wn(){const t=(window.location.hash||"#/").replace(/^#/,"").split("?")[0]||"/",n=$.isAuthenticated(),i=$.getRole();if(window.scrollTo({top:0,behavior:"instant"}),t==="/"||t===""){Po();return}if(t==="/login"){if(n){be(i);return}Do();return}if(t==="/signup"){if(n){be(i);return}Wo();return}if(t==="/customer"){if(!n){y.warning("Please sign in to access your customer workspace"),window.location.hash="#/login";return}if(i!=="CUSTOMER"&&i!=="ADMIN"){y.error("Access Denied: Customer workspace is restricted to customer accounts"),be(i);return}Go();return}if(t==="/agent"){if(!n){y.warning("Please sign in to access the agent workbench"),window.location.hash="#/login";return}if(i!=="AGENT"){y.error("Access Denied: Support Agent workbench requires ROLE_AGENT permissions"),be(i);return}ea();return}if(t==="/admin"){if(!n){y.warning("Admin authentication required"),window.location.hash="#/login";return}if(i!=="ADMIN"){y.error("Access Denied: Admin Mission Control requires ROLE_ADMIN permissions"),be(i);return}ca();return}ma(t)}function be(e){e==="ADMIN"?window.location.hash="#/admin":e==="AGENT"?window.location.hash="#/agent":window.location.hash="#/customer"}function ma(e){const t=document.getElementById("app");t&&(t.innerHTML=`
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;">
      <div class="card" style="max-width:440px;padding:3rem;">
        <h1 style="font-size:3.5rem;color:var(--primary-400);margin-bottom:0.5rem;">404</h1>
        <h3 style="margin-bottom:0.75rem;">Page Not Found</h3>
        <p style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:2rem;">
          The route <code>${pa(e)}</code> does not exist in ResolveIQ.
        </p>
        <a href="#/" class="btn btn-primary">Return to Homepage</a>
      </div>
    </div>
  `)}function pa(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}document.addEventListener("DOMContentLoaded",()=>{y.init(),ua()});
