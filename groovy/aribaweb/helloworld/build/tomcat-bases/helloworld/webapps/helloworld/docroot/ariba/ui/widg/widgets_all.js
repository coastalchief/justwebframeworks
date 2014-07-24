ariba.DragDrop=function(){var R=ariba.Event;
var O=ariba.Debug;
var M=ariba.Request;
var A=ariba.Dom;
var N="awDrp_";
var P="awDrg_";
var Q="awDrgCnt_";
var G="awDrgPrt";
var B="awds_";
var C;
var D;
var F=new Object();
var E;
var I=false;
var L="dropAreaSelected";
var K=10;
var J;
var H={MouseDownEvtHandler:null,getDiv:function(){return D
},releaseDragDiv:function(S){this.disallowZoneHightlight();
this.hideDragScrollDebug();
var T=A.getElementById(D.srcId);
if(T){R.elementInvoke(T,"dragend")
}document.body.removeChild(D);
D=null
},showDragDiv:function(){D.style.visibility="visible";
A.setOpacity(D,50)
},allowZoneHightlight:function(){A.addClass(document.body,"onDrag")
},disallowZoneHightlight:function(){A.removeClass(document.body,"onDrag")
},clearPreviousDrop:function(){if(F.container){A.removeClass(F.container,F.style);
F.container=null;
F.style=null
}},createDragDiv:function(U,Y,T,X){if(D){H.clearDragDrop(U);
return null
}D=document.createElement("div");
D.id="AWDragDiv";
document.body.appendChild(D);
D.style.position="absolute";
D.style.zIndex="249";
D.initX=U.clientX+1;
D.initY=U.clientY+1;
D.style.visibility="hidden";
D.dragObject=Y;
var S=Y.className.split(" ");
for(var W=0;
W<S.length;
W++){if(S[W].indexOf(T)==0){D.dragType=S[W].substr(T.length)
}}D.srcId=X?X:Y.id;
var V=A.containerOffsetSize(Y);
D.style.width=V[0]+"px";
D.style.height=V[1];
return D
},clearDragDrop:function(S){J=false;
if(D){this.releaseDragDiv()
}this.clearPreviousDrop()
},mouseDownEvtWrapper:function(W,T){var V=false;
T=(T)?T:event;
W=(T.target)?T.target:T.srcElement;
J=false;
this.mouseDownEvtHandlerDrag(T);
if(arguments.length>2){var S=arguments[2];
var U=arguments[3];
S.apply(null,U)
}return !V
},mouseDownEvtHandler:function(S){var T=false;
S=(S)?S:event;
this.clearDragDrop(S);
return !T
},mouseUpEvtHandler:function(S){var T=false;
S=(S)?S:event;
if(D){if(D.style.visibility=="visible"){I=true
}this.releaseDragDiv();
T=true
}this.clearPreviousDrop();
if(T){R.cancelBubble(S)
}return !T
},mouseMoveEvtHandler:function(S){var T=false;
S=(S)?S:event;
if(D){if(this.dragDivMoved(S)){this.allowZoneHightlight()
}D.droppable(false);
D.style.left=(S.clientX+A.getPageScrollLeft()+1)+"px";
D.style.top=(S.clientY+A.getPageScrollTop()+1)+"px";
T=true;
this.dragScroll(S)
}this.clearPreviousDrop();
if(T){R.cancelBubble(S)
}return !T
},shouldHandleMouseDown:function(S){var T=(S.target)?S.target:S.srcElement;
return T.tagName=="SELECT"
},mouseDownEvtHandlerDrag:function(T){if(this.shouldHandleMouseDown(T)){return false
}var X=false;
T=(T)?T:event;
var W=(T.target)?T.target:T.srcElement;
I=false;
var Z=A.findParentUsingPredicate(W,function(a){return a.className&&a.className.indexOf(P)!=-1
},true);
if(this.MouseDownEvtHandler==R.getDocHandler("mousedown")&&Z){var V=Z.id;
var S=P;
if(Z.className.indexOf(G)!=-1){var U=A.findParentUsingPredicate(W,function(a){return a.className&&a.className.indexOf(Q)!=-1
},true);
if(U){Z=U;
S=Q
}}var Y=this.createDragDiv(T,Z,S,V);
if(Y){if(Z.tagName=="TR"){Y.innerHTML="<table>"+Z.innerHTML+"</table>"
}else{Y.innerHTML=Z.innerHTML
}Y.style.border="1px solid black";
Y.style.backgroundColor="#FFFFFF";
Y.droppable=function(a){if(a){}else{}};
Y.pageHeight=A.documentElement().scrollHeight;
if(A.isSafari){Y.pageHeight+=Y.clientHeight
}Y.pageWidth=A.documentElement().scrollWidth;
this.clearPreviousDrop();
R.elementInvoke(Z,"dragstart");
X=true
}}if(X){R.cancelBubble(T)
}return !X
},mouseUpEvtHandlerDrag:function(S){var U=false;
S=(S)?S:event;
var T=(S.target)?S.target:S.srcElement;
if(D){if(D.style.visibility!="visible"){this.releaseDragDiv()
}else{I=true;
var V=this.findDropContainer(T,N);
U=this.handleDropAction(V,S,N)
}}if(U){R.cancelBubble(S)
}return !U
},handleDropAction:function(W,S,V){var T=false;
if(this.isDropContainerValid(W,V)){var U=D.srcId+","+W.id;
M.invoke(W,U,S);
this.releaseDragDiv(true);
T=true
}return T
},removeFormField:function(U,S){var T=U[S];
U.removeChild(T)
},findDropContainer:function(S,T){return A.findParentUsingPredicate(S,function(U){return U.className&&U.className.indexOf(T)!=-1
},true)
},dragActive:function(){return(D&&D.style.visibility=="visible")
},dragDivMoved:function(S){if(this.dragActive()){return true
}var V=false;
var U=S.clientX;
var T=S.clientY;
if(U<D.initX){V=(D.initX-U>K)
}else{V=(U-D.initX>K)
}if(!V){if(T<D.initY){V=(D.initY-T>K)
}else{V=(T-D.initY>K)
}}if(V){if(D.style.visibility!="visible"){this.showDragDiv()
}}return V
},isDropContainerValid:function(W,V){if(!D.dragType){return W.className.indexOf(V)==-1
}var S=W.className.split(" ");
for(var U=0;
U<S.length;
U++){if(S[U]&&S[U].indexOf(V)==0){var T=S[U].substr(V.length);
if(T==D.dragType){return true
}}}return false
},dropContainerStyle:function(V){var U=L;
if(V.className){var S=V.className.split(" ");
for(var T=0;
T<S.length;
T++){if(S[T].indexOf(B)==0){U=S[T].substr(B.length);
break
}}}return U
},mouseMoveEvtHandlerDrag:function(S){var V=false;
S=(S)?S:event;
var U=(S.target)?S.target:S.srcElement;
if(D&&this.dragDivMoved(S)){this.allowZoneHightlight();
var W=this.findDropContainer(U,N);
if(this.isDropContainerValid(W,N)){D.droppable(true);
D.style.left=(S.clientX+A.getPageScrollLeft()+1)+"px";
D.style.top=(S.clientY+A.getPageScrollTop()+1)+"px";
if(!F.container||F.container!=W){this.clearPreviousDrop();
var T=this.dropContainerStyle(W);
A.addClass(W,T);
F.container=W;
F.style=T
}V=true
}this.dragScroll(S)
}if(V){R.cancelBubble(S)
}return !V
},hideDragScrollDebug:function(){var S=A.getElementById("awdDragScrollTop");
if(S){S.style.visibility="hidden"
}var V=A.getElementById("awdDragScrollBottom");
if(V){V.style.visibility="hidden"
}var T=A.getElementById("awdDragScrollLeft");
if(T){T.style.visibility="hidden"
}var U=A.getElementById("awdDragScrollRight");
if(U){U.style.visibility="hidden"
}},showDragScrollDebug:function(S,W){var T=A.getElementById("awdDragScrollTop");
if(!T){T=document.createElement("div");
T.id="awdDragScrollTop";
T.style.border="1px red solid";
T.style.position="absolute";
T.style.width=(A.documentElement().clientWidth-2)+"px";
T.style.height=S+"px";
document.body.appendChild(T)
}T.style.left=A.getPageScrollLeft()+"px";
T.style.top=A.getPageScrollTop()+"px";
T.style.visibility="visible";
var X=A.getElementById("awdDragScrollBottom");
if(!X){X=document.createElement("div");
X.id="awdDragScrollBottom";
X.style.border="1px red solid";
X.style.position="absolute";
X.style.width=(A.documentElement().clientWidth-2)+"px";
X.style.height=S+"px";
document.body.appendChild(X)
}X.style.left=A.getPageScrollLeft()+"px";
X.style.top=(A.getPageScrollTop()+A.documentElement().clientHeight-S)+"px";
X.style.visibility="visible";
var U=A.getElementById("awdDragScrollLeft");
if(!U){U=document.createElement("div");
U.id="awdDragScrollLeft";
U.style.border="1px red solid";
U.style.position="absolute";
U.style.width=W+"px";
U.style.height=(A.documentElement().clientHeight-2)+"px";
document.body.appendChild(U)
}U.style.top=A.getPageScrollTop()+"px";
U.style.left=A.getPageScrollLeft()+"px";
U.style.visibility="visible";
var V=A.getElementById("awdDragScrollRight");
if(!V){V=document.createElement("div");
V.id="awdDragScrollRight";
V.style.border="1px red solid";
V.style.position="absolute";
V.style.width=W+"px";
V.style.height=(A.documentElement().clientHeight-2)+"px";
document.body.appendChild(V)
}V.style.top=A.getPageScrollTop()+"px";
V.style.left=(A.getPageScrollLeft()+A.documentElement().clientWidth-W)+"px";
V.style.visibility="visible"
},dragScroll:function(e){if(!D){return 
}var a=100;
var Y=100;
if(e.ctrlKey){this.showDragScrollDebug(a,Y)
}else{this.hideDragScrollDebug()
}var Z=A.documentElement().clientHeight;
var X=D.pageHeight;
var U=A.getPageScrollTop();
if(e.clientY<100&&U!=0){var V=(e.clientY==0)?U:((100-e.clientY)/100)*U;
A.setPageScrollTop(U-V)
}else{if(Z-e.clientY<100&&(X-(U+e.clientY))>5){var T=Z-e.clientY;
var S=X-Z-U;
var V=(e.clientY==Z)?S:((100-T)/100)*S;
A.setPageScrollTop(U+V)
}}var c=A.documentElement().clientWidth;
var b=D.pageWidth;
var W=A.getPageScrollLeft();
if(e.clientX<100&&W!=0){var V=(e.clientX==0)?W:((100-e.clientX)/100)*W;
A.setPageScrollLeft(W-V)
}else{if(c-e.clientX<100&&(b-(W+e.clientX))>5){var T=c-e.clientX;
var S=b-c-W;
var V=(e.clientX==c)?S:((100-T)/100)*S;
A.setPageScrollLeft(W+V)
}}},onClickEvtHandler:function(S){S=(S)?S:event;
var T=false;
if(T){R.cancelBubble(S)
}return !T
},registerDragIcon:function(T,S){O.log("registering image: "+T+" "+A.getElementById(S));
if(!C){C=new Object()
}C[T]=A.getElementById(S)
},registerDropDeniedIcon:function(S){E=A.getElementById(S)
},EOF:0};
R.registerBehaviors({DrG:{mouseover:function(T,S){T.onmousedown=H.mouseDownEvtHandlerDrag.bindEventHandler(H)
}},DrP:{mouseup:function(T,S){return H.mouseUpEvtHandlerDrag(S)
},mousemove:function(T,S){return H.mouseMoveEvtHandlerDrag(S)
},click:function(T,S){return H.onClickEvtHandler(S)
}},DrGP:{mouseover:function(T,S){T.onmousedown=H.mouseDownEvtHandlerDrag.bindEventHandler(H)
},mouseup:function(T,S){return H.mouseUpEvtHandlerDrag(S)
},mousemove:function(T,S){return H.mouseMoveEvtHandlerDrag(S)
},click:function(T,S){return H.onClickEvtHandler(S)
}}});
H.MouseDownEvtHandler=H.mouseDownEvtHandler.bindEventHandler(H);
R.updateDocHandler("mousedown",H.MouseDownEvtHandler);
R.updateDocHandler("mouseup",H.mouseUpEvtHandler.bindEventHandler(H));
R.updateDocHandler("mousemove",H.mouseMoveEvtHandler.bindEventHandler(H));
return H
}();
ariba.Widgets=function(){var M=ariba.Util;
var B=ariba.Dom;
var e=ariba.Event;
var U=ariba.Input;
var Y=ariba.Debug;
var X=ariba.Refresh;
var V=ariba.Request;
var S=0;
var a;
var H;
var f=null;
var Q=null;
var C=false;
var P;
var O=false;
var I;
var L=5000;
var K=15000;
var E=null;
var c="";
var J="PageErrorPanelIsMinimized";
var R="AWPrintPage";
var W=null;
var A;
var N=3;
var T=5;
var G=null;
var Z=null;
var b=null;
var D={mouseover:function(h,g){ariba.Widgets.clearHideHoverCard();
b=setTimeout(function(){ariba.Widgets.displayHoverCard(h)
},500)
},mouseout:function(h,g){if(b){clearTimeout(b);
b=null;
return 
}ariba.Widgets.hideActiveHoverCard()
}};
var F={HoverCardContentBehavior:D,showPanel:function(n,m,h){var l=B.getElementById(n);
l.style.display="";
var g=B.absoluteTop(m)+(m.offsetHeight/3);
var k=B.absoluteLeft(m)+(m.offsetWidth-l.offsetWidth)/2;
g=Math.max(3,B.correctForBottomEdge(g,l));
k=Math.max(3,B.correctForRightEdge(k,l));
B.setAbsolutePosition(l,k,g);
X.displayDiv(l,"",false,h)
},hidePanel:function(h){var g=B.getElementById(h);
if(g){g.style.display="none"
}B.unoverlay(g)
},notImplemented:function(){alert("This feature is under construction and not currently available.");
return false
},btnMouseOver:function(h,g){h.className=g
},btnMouseOut:function(k,h){var g=function(){if(V.isRequestInProgress()){e.registerUpdateCompleteCallback(function(){if(B.elementInDom(k)){k.className=h
}}.bind(this))
}else{if(B.elementInDom(k)){k.className=h
}}}.bind(this);
setTimeout(g,1);
return true
},applyFilterToImages:function(l,k){var g=l.getElementsByTagName("IMG");
for(var h=0;
h<g.length;
h++){g[h].style.filter=k
}},downloadContent:function(g){V.downloadContent(g)
},copyFromDocument:function(l,h){var g=l.getElementById("AWLazyDivSource");
var k=B.getElementById(h);
if(g==null){k.innerHTML="&nbsp;";
k.style.display="none"
}else{k.innerHTML=g.innerHTML;
X.postLoadLazyDiv()
}},disablePage:function(g){if(a){return 
}a=true;
if(Q){U.registerModalDiv(Q)
}if(B.IsIE6Only){U.hideSelects(true)
}},enablePage:function(){if(!a){return 
}if(f){f.style.display="none"
}if(B.IsIE6Only){U.showSelects()
}if(Q){U.unregisterModalDiv(Q)
}a=false
},windowSizeDiv:function(h){function g(){if(!B.elementInDom(h)){e.unregisterOnWindowResize(g);
return 
}var k=B.getWindowSize();
h.style.width=k[0]-2+"px";
h.style.height=k[1]-2+"px"
}e.registerOnWindowResize(g);
g()
},openDialogBox:function(l){l.style.visibility="hidden";
l.style.display=(l.tagName=="TABLE"&&!B.IsIE)?"table":"block";
var k=B.findParentUsingPredicate(l,function(n){return B.hasClass(n,"panelContainer")
});
var h=B.getPageScrollElement();
function g(){if(k){if(B.IsIE6Only){F.windowSizeDiv(k)
}k.style.left=h.scrollLeft+"px";
k.style.top=h.scrollTop+"px";
k.style.display="block";
f=k
}else{B.positionDialogBox(l)
}}g();
var m=h.scrollTop;
e.eventEnqueue(function(){if(h.scrollTop!=m){g()
}})
},panelRegChildWants:function(k,g){if(k&&g>0){var h=k.getAttribute("childrenWant");
if(!h||g>parseInt(h)){k.setAttribute("childrenWant",g)
}}},panelMaxWidth:function(g,m){var l=parseInt(B.effectiveStyle(g,"padding-left"));
var h=B.findChildUsingPredicate(g,function(n){return n.tagName=="TABLE"&&n.className=="dialogWrapper"
});
if(h){var k=B.findParentUsingPredicate(h,function(n){return n.className=="panel"
});
if(k){l+=B.absoluteLeft(h)-B.absoluteLeft(k)
}if(m){l+=B.minInsetWidth(h,m)
}}return B.getWindowSize()[0]-l*2-20
},panelMaxHt:function(h){var g=B.getWindowSize();
return g[1]-2
},checkPanelHeight:function(k){var s=B.findParentUsingPredicate(k,function(t){return B.hasClass(t,"panelContainer")
});
var r=B.findChildUsingPredicate(k,function(t){return t.tagName=="TABLE"
});
if(!r||!s){B.positionDialogBox(k);
return 
}var l=r.offsetHeight;
var h=parseInt(k.style.marginTop)||0;
var g=k.offsetHeight-l-h;
var m=B.getWindowSize();
var p=m[1]-g;
var q=parseInt(s.getAttribute("childrenWant"))||0;
var o=l+q;
o=Math.min(o,p);
var n=Math.floor((p-o)*0.4);
if(n<h||!k.style.marginTop){k.style.marginTop=n+"px";
if(q){e.forceOnWindowResize()
}}s.removeAttribute("childrenWant")
},showDialogDiv:function(n,k,o,m){if(n==null){return 
}if(Q&&Q.awCloseDialogFunc){var l=Q.awCloseDialogFunc();
if(l){return 
}}Q=n;
if(k){k()
}this.openDialogBox(n);
var g=null;
var h=function(){if(!B.elementInDom(n)){e.unregisterOnWindowFixed(n);
if(g){e.unregisterRefreshCallback(g)
}return 
}F.checkPanelHeight(n)
};
e.registerOnWindowFixed(h.bind(this));
g=function(){e.eventEnqueue(h,null,true)
};
e.registerRefreshCallback(g);
h();
n.style.visibility="visible";
this.macMozScrollCheck();
if(o){e.enableDocumentClick(o)
}e.unregisterRefreshCallback(this.checkDialogStillPresent);
e.registerRefreshCallback(this.checkDialogStillPresent);
return false
},macMozScrollCheck:function(){if(!navigator.userAgent.match(/Mozilla.+Macintosh.+Firefox\/2.+/)){return 
}var h=true;
function g(){if(f&&h){f.style.overflow="hidden";
setTimeout(function(){if(f){f.style.overflow="auto"
}},0);
h=false
}}if(!C){C=true;
e.registerHandler("MacId1","onfocusin",g)
}e.eventEnqueue(function(){if(f){f.style.overflow="auto"
}},null,true)
},checkDialogStillPresent:function(){if(Q&&!B.elementInDom(Q)){F.clearDialog()
}},clearDialog:function(){if(Q&&Q.awCloseDialogFunc){Q.awCloseDialogFunc()
}},hideDialogDiv:function(){if(Q){Q.setAttribute("_cfOpen",0);
e.disableDocumentClick();
if(Q.awPreCloseDialogFunc){Q.awPreCloseDialogFunc()
}X.undisplayDiv(Q);
Q=null
}return false
},updateDialogWrapperClass:function(g){if(g){B.addClass(document.body,"dialogContentWrapper")
}else{B.removeClass(document.body,"dialogContentWrapper")
}},hideActiveMenu:function(){},showConfirmation:function(k,h){this.hideActiveMenu();
P=k;
var m=B.getElementById(k);
U.hideSelects(true);
if(!B.boolAttr(m,"_cfOpen",false)){m.setAttribute("_cfOpen","true");
var l=function(){this.disablePage("000");
U.coverDocument(50,50)
}.bind(this);
m.awPreCloseDialogFunc=this.enablePage.bind(this);
m.awCloseDialogFunc=this.cancelConfirmation.bind(this);
var g=B.findParentUsingPredicate(m,function(n){return B.hasClass(n,"panelContainer")
});
B.relocateDiv(g,true);
this.showDialogDiv(m,l,null,true);
if(!h){X.loadLazyChildren(m,this.confirmationLoadLazyDivCallback);
if(!O){e.registerRefreshCallback(this.checkConfirmationDisplay.bind(this));
O=true
}}}},checkConfirmationDisplay:function(){if(P!=null){this.showConfirmation(P,true)
}},confirmationLoadLazyDivCallback:function(h,g){h.innerHTML=g.responseText;
V.evalScriptTags(g.responseText);
X.markDivLoadingDone(h);
U.hideWaitCursor();
if(U.AWAutomationTestModeEnabled){setTimeout(V.setStatusDone.bind(this),0)
}},cancelConfirmation:function(){U.uncoverDocument();
var g=Q;
this.hideDialogDiv();
if(g&&g.parentNode){var h=g.parentNode.id;
B.revertRelocatedCopy(h);
B.removeRelocatedCopy(h)
}P=null
},toggleAboutBox:function(k,g){g=(g)?g:event;
if(g.type=="keydown"&&e.keyCode(g)!=U.KeyCodeEnter){return true
}if(Q){this.hideDialogDiv()
}else{this.hideActiveMenu();
var h=B.getElementById(k);
this.showDialogDiv(h,null,this.hideDialogDiv.bind(this));
if(X.childrenNeedLoading(h)){X.loadLazyChildren(h)
}B.overlay(h);
h.awCloseDialogFunc=this.hideDialogDiv.bind(this)
}e.cancelBubble(g);
return false
},aw01:function(h,g){return this.btnMouseOut(h,g)
},aw02:function(h,g){return this.btnMouseOver(h,g)
},updateTOC:function(h){var g=document.body;
if(h){B.removeClass(g,"tocEmpty")
}else{B.addClass(g,"tocEmpty")
}},blinkItem:function(h,g){e.registerUpdateCompleteCallback(function(){F._blinkItem(h,g*6)
})
},_blinkItem:function(l,k){var h=document.getElementById(l);
if(!h){return 
}h.className=(k%2)?"tocFlashing":"tocItem";
var g=(k%6)==1?4000:200;
if(k){setTimeout(this._blinkItem.bind(this,l,k-1),g)
}},registerHintMessage:function(g){if(!I){I=new Array(g);
e.registerOnWindowResize(this.sizeHintMessages.bind(this))
}else{I[I.length]=g
}e.eventEnqueue(this.sizeHintMessages.bind(this))
},sizeHintMessages:function(){var g=(I)?I.length:0;
while(g--){var h=B.getElementById(I[g]);
if(h&&h.className!="hintBoxOpen"){h.style.overflowY="auto";
if(h.scrollHeight>h.clientHeight){h.className="hintBoxClosed"
}h.style.overflowY="hidden"
}else{I.splice(g,1)
}}},openHintMessage:function(g){Y.log("awOpenHintMessage");
var h=B.findParentUsingPredicate(g,function(k){return(k.className=="hintBoxClosed")
});
h.className="hintBoxOpen";
B.checkWindowScrollbar(true)
},closeHintMessage:function(g){var h=B.findParentUsingPredicate(g,function(k){return(k.className=="hintBoxOpen")
});
h.className="hintBoxClosed";
B.checkWindowScrollbar(true)
},openHintMessageKeyDown:function(g,h){if(e.keyCode(h)==U.KeyCodeEnter){this.openHintMessage(g)
}},closeHintMessageKeyDown:function(g,h){if(e.keyCode(h)==U.KeyCodeEnter){this.closeHintMessage(g)
}},showSpan:function(k){if(document.readyState&&document.readyState!="complete"){return 
}var h=B.getElementById(k);
h.style.display="inline";
var g=h.parentNode;
h.style.top=B.absoluteTop(g);
h.style.left=B.absoluteLeft(g);
B.overlay(h)
},hideSpan:function(h){var g=B.getElementById(h);
g.style.display="none";
B.unoverlay(g)
},popNotification:function(){window.focus();
var k=B.getElementById("AWNotificationDiv");
k.style.display="";
if(k.clientHeight>100){var h=B.findChild(k,"DIV");
h.style.height="100px"
}k.style.display="none";
this.showNotification();
var g=B.getInnerText(k);
var m=g.length/11;
var l=m/200*60000;
if(l<L){l=L
}else{if(l>K){l=K
}}E=setTimeout(this.hideNotification.bind(this),l)
},showNotification:function(){var g=B.getElementById("AWNotificationDiv");
B.fadeInElement(g);
X.displayDiv(g)
},hideNotification:function(){var g=B.getElementById("AWNotificationDiv");
if(g){var h=function(){X.undisplayDiv(g)
};
if(g.filters){B.fadeOutElement(g);
E=setTimeout(h.bind(this),2000)
}else{E=setTimeout(h.bind(this),3000)
}}},closeNotification:function(){clearTimeout(E);
var g=B.getElementById("AWNotificationDiv");
X.undisplayDiv(g)
},restoreNotification:function(h){var g=B.getElementById("AWNotificationDiv");
if(g.filters&&g.filters.blendTrans){g.filters.blendTrans.stop()
}if(E){clearTimeout(E)
}g.style.visibility="visible";
X.displayDiv(g);
e.cancelBubble(h)
},openDocWin:function(g){return B.openWindow("","AribaDocWin",g)
},openWindowForEvent:function(g){if(!g){return false
}var n=e.eventSourceElement(g);
if(!n){return false
}var l="DEBUG: Could not get href from link in Widgets.openWindowForEvent().";
var k=0;
var m=function(o){if(k<5&&"A"!=o.nodeName){k++;
return false
}else{return true
}};
n=B.findParentUsingPredicate(n,m,true);
if(!n||"A"!=n.nodeName){Y.log(l);
return false
}var h=n.href;
if(!h||"#"==h||"#"==h.charAt(h.length-1)){return false
}B.openWindow(h,"_blank");
e.cancelBubble(g);
return false
},gotoDoc:function(h,x,w,n,q,r,u,o,v,l,k){if(c&&!c.closed&&c.location){c.close()
}c=this.openDocWin(k);
var g="";
var m=v.split(",");
for(var p=0;
p<m.length;
p++){g+='<input name="ft" value="'+m[p]+'" type="hidden"/>'
}var t='<html><body onLoad="document.form1.submit();"><form method="post" action="'+h+'" id="form1" name="form1"><input name="ss" value="'+x+'" type="hidden"/><input name="doc" value="'+w+'" type="hidden"/><input name="ut" value="'+n+'" type="hidden"/><input name="un" value="'+q+'" type="hidden"/><input name="rn" value="'+r+'" type="hidden"/><input name="ul" value="'+u+'" type="hidden"/><input name="anId" value="'+o+'" type="hidden"/>'+g+'<input name="area" value="'+l+'" type="hidden"/></form></body>';
try{c.document.write(t)
}catch(s){c.close();
c=this.openDocWin();
c.document.write(t)
}c.document.close();
if(c.focus){c.focus()
}},sizeMsgDiv:function(g){if(!B.boolAttr(g,"_reg",false)){g.setAttribute("_reg","true");
e.registerUpdateCompleteCallback(this.sizeMsgDivUpdate.bind(this),[g])
}this.sizeMsgDivUpdate(g)
},sizeMsgDivUpdate:function(k){Y.log("Updating div("+k.id+"): "+k.id+" class:"+k.className);
var g=0.33;
var h=B.documentClientWidth()*g;
k.style.whiteSpace="nowrap";
if(k.clientWidth>h){k.style.width=h+"px";
k.style.whiteSpace="normal"
}},openPrintWindow:function(k){var h=window.location.protocol+"//"+window.location.host+V.formatUrl(k);
var g=B.openWindow(h,R,"location=0");
if(g){g.focus()
}},printRefresh:function(){top.location.href=top.ariba.Request.appendFrameName(top.Request.AWRefreshUrl)
},printContents:function(){var h=B.getElementById("AWPrintContent");
var g=B.getElementById("BPR_Body");
if(h&&g){h.parentNode.removeChild(h);
g.parentNode.appendChild(h);
g.style.display="none";
B.removeClass(document.body,"hide");
window.setTimeout(this.print.bind(this),100)
}else{alert("Failed to find print wrapper:  AWPrintContent="+h+", BPR_Body="+g)
}},print:function(){window.print();
try{window.opener.ariba.Widgets.printRefresh()
}catch(g){}window.setTimeout(this.postPrint.bind(this),1000)
},postPrint:function(){window.focus();
window.close()
},initErrorPanel:function(){if(B.IsIE&&B.IsIE6Only){e.registerWindowOnScroll(this.updateErrorPanel.bind(this));
e.registerOnWindowFixed(this.updateErrorPanel.bind(this))
}var g=B.getElementById("PageErrorPanel");
g.style.display=""
},updateErrorPanel:function(){var g=B.getElementById("PageErrorPanel");
if(g){g.style.top=B.getPageScrollTop()+"px";
B.overlay(g,true)
}},toggleErrorPanel:function(n){var l=B.getElementById("PageErrorPanel");
var k=B.findChildUsingPredicate(l,function(q){return q.id=="minimizedView"
});
var m=B.findChildUsingPredicate(l,function(q){return q.id=="maximizedView"
});
var h;
if(n=="true"){h="true";
k.style.display="";
m.style.display="none"
}else{h="false";
k.style.display="none";
m.style.display="";
this.slideErrorMessage()
}for(var g=0;
g<document.forms.length;
g++){var p=document.forms[g];
var o=p[J];
if(!o){B.addFormField(p,J,h)
}else{o.value=h
}}},showBubble:function(h){var AA=h.getAttribute("_errorContentDivId");
var q=h.getAttribute("_autoHideBubble");
var l=h.getAttribute("_autoScroll");
var w=h.getAttribute("_customContentDivId");
var v=h.getAttribute("_positionRight");
var AE=B.getElementById(AA);
var AG=B.getElementById(w);
var t=B.getElementById("bubble_tooltip_fade");
var k=B.getElementById("bubble_body");
var z=B.getElementById("bubble_tooltip_content");
var o=B.getElementById("bubble_close_control");
var AF=B.getElementById("bubble_tip_left");
var g=B.getElementById("bubble_tip_right");
var r=B.getElementById("bubble_bottom_left");
var x=B.getElementById("bubble_bottom_right");
t.style.width=130+"px";
var AC=(AE?AE.innerHTML:"")+(AG?AG.innerHTML:"");
z.innerHTML=AC;
t.style.display="block";
if(q=="true"){o.style.display="none"
}else{o.style.display=""
}var s=t.clientWidth;
var m=t.scrollWidth;
if(m>s){t.style.width=m+"px";
z.innerHTML=AC
}if(t.clientHeight>t.clientWidth){t.style.width=Math.max(t.clientWidth*1.6,t.clientHeight)+"px";
z.innerHTML=AC
}var y=B.absoluteLeft(h);
if(v){y+=B.containerOffsetSize(h)[0]
}var p=B.absoluteTop(h)-7;
var n=p-t.offsetHeight+9;
if((y+t.offsetWidth+2)<B.documentElement().clientWidth){y+=3;
AF.style.display="";
r.style.display="";
g.style.display="none";
x.style.display="none"
}else{y-=t.offsetWidth;
AF.style.display="none";
r.style.display="none";
g.style.display="";
x.style.display=""
}B.setAbsolutePosition(t,y,n);
X.displayDiv(k,"block");
if(l=="true"){var AD=B.getPageScrollTop();
var AB=Math.max(n-(B.documentElement().clientHeight/2),0);
if(AD>n){B.setPageScrollTop(AB)
}else{var u=AD+B.documentElement().clientHeight-25;
if(u<p){B.setPageScrollTop(AB)
}}}},hideBubble:function(){var h=B.getElementById("bubble_tooltip_fade");
if(h){X.undisplayDiv(h)
}var g=B.getElementById("bubble_body");
if(g){B.unoverlay(g)
}},showBubbleWithFade:function(h){this.showBubble(h);
var g=h.getAttribute("_errorContentDivId");
var m=B.getElementById(g);
var l=B.getInnerText(m).length/11;
var k=l/200*60000;
if(k<L){k=L
}else{if(k>K){k=K
}}if(W){clearTimeout(W)
}W=setTimeout(this.hideBubble.bind(this),k)
},highLightIndicator:function(g){var h=B.getElementById(g);
if(h){A=g;
e.eventEnqueue(this.highLightIndicatorInternal.bind(this),null,true)
}},highLightIndicatorInternal:function(){var g=B.getElementById(A);
if(g){var h=g.getAttribute("_autoHideBubble");
if(h=="true"){this.showBubbleWithFade(g)
}else{this.showBubble(g)
}}e.unregisterOnWindowFixed(this.highLightIndicatorInternal);
A=null
},containedInConfirmationPanel:function(g){return B.findParentUsingPredicate(g,function(h){return h.className=="panelContainer"
})!=null
},resetSlidingErrorMessage:function(){var h=B.getElementById("slidingErrorMsg");
var g=B.getElementById("slidingErrorMsgContent");
g.style.top=0-g.offsetHeight+"px";
h.style.display="none";
h.style.height="1px"
},slideErrorMessage:function(){this.resetSlidingErrorMessage();
var g=B.getElementById("slidingErrorMsg");
g.style.display="block";
g.style.visibility="visible";
this.slideMover(1)
},slideMover:function(n){var m=B.getElementById("slidingErrorMsg");
var h=B.getElementById("slidingErrorMsgContent");
var g=m.clientHeight;
if(g==0){g=m.offsetHeight
}g=g+(N*n);
var l=true;
if(g>h.offsetHeight){g=h.offsetHeight;
l=false
}if(g<=1){g=1;
l=false
}m.style.height=g+"px";
var k=g-h.offsetHeight;
if(k>0){k=0
}h.style.top=k+"px";
if(l){if(G){clearTimeout(G)
}G=setTimeout(this.slideMover.bind(this,1),T)
}else{if(g<=1){m.style.display="none"
}}},initFooter:function(g){Z=new Object();
Z.footer=B.getElementById("Footer");
Z.floatingFooter=B.getElementById("FloatingFooter");
Z.footerControl=B.getElementById("FooterControl");
Z.footerExpand=B.getElementById("FooterExpand");
Z.footerCollapse=B.getElementById("FooterCollapse");
Z.footerLinks=B.getElementById("FooterLinks");
Z.expanded=false;
Z.displayDoubleHeight=g;
this.updateFooterCollapseHeight();
if(B.IsIE&&B.IsIE6Only){e.registerOnWindowFixed(this.updateFooterBottom.bind(this));
e.fireWindowFixedCallback();
e.registerWindowOnScroll(this.updateFooterBottom.bind(this))
}e.registerOnWindowResize(this.updateFooter.bind(this))
},hideFooter:function(){Z=null
},updateFooterCollapseHeight:function(){var g=Z.displayDoubleHeight?28:16;
g=Math.max(g,Z.footerLinks.scrollHeight+2);
Z.collapseHeight=g+"px";
Z.footer.style.height=Z.collapseHeight
},expandFooter:function(){var g=Z.footer;
g.style.height=g.scrollHeight+"px"
},collapseFooter:function(){var g=Z.footer;
g.style.height=Z.collapseHeight
},updateFooter:function(){if(Z){var l=Z.footer;
var k=Z.footerExpand;
var h=Z.footerCollapse;
var g=Z.footerControl;
this.updateFooterCollapseHeight();
if(Z.footerControl){if(Z.expanded){g.innerHTML=h.innerHTML;
this.expandFooter()
}else{if(l.scrollHeight>l.clientHeight){g.innerHTML=k.innerHTML
}else{g.innerHTML=""
}}}this.updateFloatingFooter()
}},updateFloatingFooter:function(){var h=B.documentElement();
var g=Z.floatingFooter;
var k=Z.footer;
g.innerHTML=k.innerHTML;
g.style.left=B.absoluteLeft(k)+"px";
g.style.width=k.clientWidth+"px";
g.style.height=k.clientHeight+"px";
g.style.overflowY=B.effectiveStyle(k,"overflow-y")
},hideFloatingFooter:function(){if(B.IsIE&&B.IsIE6Only&&Z){var g=Z.floatingFooter;
X.undisplayDiv(g);
g.style.top="0px"
}},updateFooterBottom:function(){if(B.IsIE&&B.IsIE6Only&&Z){var g=Z.floatingFooter;
var h=Z.footer;
g.style.top=document.documentElement.scrollTop+document.documentElement.clientHeight-h.offsetHeight+"px";
g.style.display="";
B.overlay(g)
}},toggleFooter:function(){var m=Z.footer;
var l=Z.footerExpand;
var k=Z.footerCollapse;
var h=Z.footerControl;
var g=B.getElementById("FloatingFooter");
if(Z.expanded){h.innerHTML=l.innerHTML;
m.style.overflowY="hidden";
this.collapseFooter()
}else{h.innerHTML=k.innerHTML;
m.style.overflowY="visible";
this.expandFooter()
}Z.expanded=!Z.expanded;
this.updateFooter();
if(B.IsIE&&B.IsIE6Only){this.updateFooterBottom()
}},toggleFooterKeyDown:function(g){if(e.keyCode(g)==U.KeyCodeEnter){this.toggleFooter()
}},_widgetsHandlers_MARKER:function(){},positionActiveDialogBox:function(){if(Q){B.positionDialogBox(Q)
}},CountDownTimer:null,handlePollEvents:function(l,k){var o=B.getElementById("pollCountDown");
var m=B.getElementById("pollDialog");
var g=o.getAttribute("_in");
var n=function(){clearTimeout(this.CountDownTimer);
this.CountDownTimer=setTimeout(h,1000)
}.bind(this);
if(V.AWPollState==l){if(this.CountDownTimer){clearTimeout(this.CountDownTimer);
this.CountDownTimer=null;
this.hideDialogDiv()
}}else{if(V.AWPollErrorState==l){if(!Q){o.innerHTML=g;
m.awPreCloseDialogFunc=this.enablePage.bind(this);
m.awCloseDialogFunc=this.hideDialogDiv.bind(this);
this.showDialogDiv(m,this.disablePage.bind(this));
function h(){var p=o.innerHTML;
p=parseInt(p);
if(p>0){o.innerHTML=p-1;
n()
}}n()
}}}},ActiveHoverCard:null,HideActiveHoverCardTimeout:null,getHoverCard:function(h){var g=B.find(h,"hcard")[0];
if(!g){g=B.getElementById(h.getAttribute("hoverId"))
}else{h.setAttribute("hoverId",g.id)
}return g
},displayHoverCard:function(g){var r=this.getHoverCard(g);
B.relocateDiv(r);
this._hideActiveHoverCard(r);
var s=0;
var t=0;
var m=g.getAttribute("_pos");
if(m=="bottom"){B.addClass(r,"hoverBottom");
s=B.absoluteTop(g)+g.offsetHeight;
t=B.absoluteLeft(g);
var l=B.getChildren(r);
var k=l.length;
var n=0;
r.style.display="";
for(index=0;
index<k;
index++){var p=l[index];
if(B.hasClass(p,"hcContent")){n=p.offsetWidth;
break
}}if(t+n>=B.documentClientWidth()-20){F.positionHoverCardBottomPointer(g,r,n,"left");
t=B.absoluteLeft(g)+g.offsetWidth-n
}else{F.positionHoverCardBottomPointer(g,r,n,null)
}}else{var s=B.absoluteTop(g)-20;
var q=B.absoluteLeft(g);
var h=g.offsetWidth;
var o=q+h/2;
var t=0;
if(o<=B.documentClientWidth()/2){t=q+h
}else{r.style.display="";
t=q-r.offsetWidth;
B.addClass(r,"hoverLeft")
}}B.setAbsolutePosition(r,t,s);
X.displayDiv(r);
this.ActiveHoverCard=r;
b=null
},positionHoverCardBottomPointer:function(m,k,h,g){var o=B.getChildren(k);
var p=o.length;
for(index=0;
index<p;
index++){var l=o[index];
var n=m.offsetWidth/2+"px";
if(m.offsetWidth>=h){n=h/2+"px"
}if(B.hasClass(l,"hcPointer")||B.hasClass(l,"hcPointerInner")){if(g=="left"){l.style.right=n;
l.style.left="auto"
}else{l.style.left=n;
l.style.right="auto"
}}}},hideActiveHoverCard:function(){this.clearHideHoverCard();
this.HideActiveHoverCardTimeout=setTimeout(this._hideActiveHoverCard.bind(this),200)
},_hideActiveHoverCard:function(h){var g=this.ActiveHoverCard;
if(g&&g!=h){X.undisplayDiv(g);
B.removeClass(g,"hoverLeft")
}},clearHideHoverCard:function(){clearTimeout(this.HideActiveHoverCardTimeout)
},showSpotlights:function(h){var v=this.getSortedSpotlights(h);
var n=this.computeDimCols(v);
if(!n){v=v.sort(this.spotlightTopSort);
n=this.computeDimRows(v)
}if(!n){console.log("Cannot compute dim covers");
return 
}for(var u=0;
u<n.length;
u++){var k=n[u];
if(B.IsIE){this.dimDocument(k,20);
this.dimDocument(k,20)
}else{this.dimDocument(k,50)
}}var x=B.getElementById("spotlights");
var y=B.getDocumentElement();
var m=M.max(y.scrollWidth,y.clientWidth);
var s=0;
for(u=0;
u<v.length;
u++){var g=v[u];
var z=g.top;
var o=g.left;
var w=g.width;
var t=g.height;
var AA=g.elm.getAttribute("_t");
var r=g.elm.getAttribute("_v");
var q=B.createElement('<div class="spotlightText"><h2>'+AA+"</h2>"+r+"</div>");
var p=null;
if(o>=z){q.style.top=z+t+35+"px";
p=B.createElement('<div class="spotlightVLine"></div>');
var l=o+Math.min(50,w/2);
p.style.top=z+t+"px";
p.style.left=l+"px";
p.style.height="40px";
if((o+w/2)>m/2){q.style.right=m-o-w+"px";
if(s%2==1){q.style.top=z-70+"px";
p.style.top=z-25+"px"
}s++
}else{q.style.left=o+20+"px"
}}else{q.style.top=z+35+"px";
q.style.left=o+w+20+"px";
p=B.createElement('<div class="spotlightHLine"></div>');
p.style.top=z+50+"px";
p.style.left=o+w+"px";
p.style.width="25px"
}x.appendChild(q);
x.appendChild(p)
}},dimDocument:function(k,l){if(k.opacity!==undefined){l=k.opacity
}var g=ariba.Input.createCoverDiv(50,l);
var h=g.style;
h.top=k.top+"px";
h.left=k.left+"px";
h.width=k.width+"px";
h.height=k.height+"px";
var m=B.getElementById("spotlights");
m.appendChild(g)
},spotlightLeftSort:function(h,g){return h.left-g.left
},spotlightTopSort:function(h,g){return h.top-g.top
},getSortedSpotlights:function(k){var g=[];
var o=6;
for(var m=0;
m<k.length;
m++){var p=B.getElementById(k[m]);
var n=B.absoluteTop(p)-o;
var l=B.absoluteLeft(p)-o;
var h=M.max(p.clientWidth,p.scrollWidth);
h=h+2*o;
var q=M.max(p.clientHeight,p.scrollHeight);
q=q+2*o;
g.push({elm:p,top:n,left:l,width:h,height:q})
}return g.sort(this.spotlightLeftSort)
},computeDimCols:function(g){var v=B.getDocumentElement();
var o=M.max(v.scrollWidth,v.clientWidth);
var x=M.max(v.scrollHeight,v.clientHeight);
var s=B.getElementById("BPR_Banner");
var y=M.max(s.clientHeight,s.scrollHeight)+10;
var h=[];
var r=0;
var l=0;
var k=0;
var w=0;
for(var n=0;
n<g.length;
n++){var u=g[n];
var t=u.top;
var q=u.left;
var p=u.width;
var m=u.height;
r=y;
k=q-l;
if(k<0){return null
}w=x-r;
h.push({top:r,left:l,width:k,height:w});
l+=k;
k=p;
w=t-r;
h.push({top:r,left:l,width:k,height:w});
r+=w;
w=m;
h.push({top:r,left:l,width:k,height:w,opacity:0});
r+=w;
w=x-r;
h.push({top:r,left:l,width:k,height:w});
l+=k
}r=y;
k=o-l;
w=x-r;
h.push({top:r,left:l,width:k,height:w});
return h
},computeDimRows:function(g){var v=B.getDocumentElement();
var o=M.max(v.scrollWidth,v.clientWidth);
var x=M.max(v.scrollHeight,v.clientHeight);
var s=B.getElementById("BPR_Banner");
var y=M.max(s.clientHeight,s.scrollHeight)+10;
var h=[];
var r=y;
var l=0;
var k=0;
var w=0;
for(var n=0;
n<g.length;
n++){var u=g[n];
var t=u.top;
var q=u.left;
var p=u.width;
var m=u.height;
l=0;
k=o;
w=t-r;
if(w<0){return null
}h.push({top:r,left:l,width:k,height:w});
r+=w;
w=m;
k=q;
h.push({top:r,left:l,width:k,height:w});
l+=k;
k=p;
h.push({top:r,left:l,width:k,height:w,opacity:0});
l+=k;
k=o-l;
h.push({top:r,left:l,width:k,height:w});
r+=w
}l=0;
k=o;
w=x-r;
h.push({top:r,left:l,width:k,height:w});
return h
},EOF:0};
e.registerBehaviors({TBc:{mousedown:function(k,g){var h=k.getAttribute("_cl");
h=h+"Over";
return F.btnMouseOver(k,h)
},focus:function(h,g){return e.behaviors.TBc.mouseover(h,g)
},mouseup:function(k,g){var h=k.getAttribute("_cl");
return F.btnMouseOut(k,h)
},mouseout:function(k,g){var h=k.getAttribute("_cl");
return F.btnMouseOut(k,h)
},blur:function(h,g){return e.behaviors.TBc.mouseout(h,g)
}}});
e.registerBehaviors({TB:{prototype:e.behaviors.TBc,click:function(k,g){var h=k.getAttribute("_cnf");
return(h)?F.showConfirmation(h):e.behaviors.GAT.click(k,g)
},keypress:function(h,g){return(e.keyCode(g)==U.KeyCodeEnter)?e.behaviors.TB.click(h,g):true
}},TFSB:{prototype:e.behaviors.TBc,click:function(k,g){var h=k.getAttribute("_fn");
return V.submitFormObjectNamed(h)
},keypress:function(h,g){return(e.keyCode(g)==U.KeyCodeEnter)?e.behaviors.TFSB.click(h,g):true
}},CHL:{prototype:e.behaviors.HL,click:function(k,g){var h=k.getAttribute("_cnf");
return(h)?F.showConfirmation(h):e.behaviors.HL.click(k,g)
}},HME:{mousedown:function(h,g){return F.openHintMessage(h)
},keydown:function(h,g){return F.openHintMessageKeyDown(h,g)
}},HMC:{mousedown:function(h,g){return F.closeHintMessage(h)
},keydown:function(h,g){return F.closeHintMessageKeyDown(h,g)
}},BI:{mouseover:function(h,g){h.className="tocItemRollover";
return false
},mouseout:function(h,g){h.className="tocItem";
return false
}},OutC:{mouseover:function(h,g){h.className="wizSubstepCurrent nav noWrap";
return false
},mouseout:function(h,g){h.className="wizSubstep nav noWrap";
return false
}},ND:{mouseover:function(h,g){return F.restoreNotification(g)
},mouseout:function(h,g){return F.hideNotification()
}},FT:{mousedown:function(h,g){return F.toggleFooter(g)
},keydown:function(h,g){return F.toggleFooterKeyDown(g)
}},NWL:{click:function(h,g){return F.openWindowForEvent(g)
},keypress:function(h,g){if(g&&(U.KeyCodeEnter==g.keyCode)){return F.openWindowForEvent(g)
}},keydown:function(h,g){if(g&&(U.KeyCodeEnter==g.keyCode)){return F.openWindowForEvent(g)
}}},DrgBub:{prototype:e.behaviors.DrG,dragstart:F.showBubble,dragend:F.hideBubble},HCC:F.HoverCardContentBehavior,HC:{mouseover:function(h,g){ariba.Widgets.clearHideHoverCard()
},mouseout:function(h,g){ariba.Widgets.hideActiveHoverCard()
}}});
return F
}();
ariba.Menu=function(){var H=ariba.Util;
var A=ariba.Event;
var D=ariba.Request;
var C=ariba.Refresh;
var B=ariba.Widgets;
var E=ariba.Dom;
var G=ariba.Input;
var F={AWActiveMenu:null,AWLinkId:null,AWActiveItemId:null,AWMenuOffset:15,activateMenuLink:function(J){var I=J.getAttribute("_activeClass");
if(I){E.addClass(J,I)
}},deactivateMenuLink:function(){if(this.AWLinkId){var J=E.getElementById(this.AWLinkId);
var I=J.getAttribute("_activeClass");
if(I){E.removeClass(J,I)
}}},unhiliteDiv:function(I){if(I!=null){E.removeClass(I,"awmenuCellHilite")
}},hiliteDiv:function(I){if(I!=null){E.addClass(I,"awmenuCellHilite")
}},hideActiveMenu:function(){if(this.AWActiveMenu!=null&&E.elementInDom(this.AWActiveMenu)){A.disableDocumentClick();
C.undisplayDiv(this.AWActiveMenu);
this.deactivateMenuLink()
}this.AWActiveMenu=null;
this.AWActiveItemId=null
},menuItemClicked:function(K,I){var J=E.boolAttr(K,"_sf",true)?E.lookupFormId(K):null;
F.handleClientTrigger(K,I);
if(A.shouldBubble(I)){I.hideActiveMenu=true;
return F.menuClicked(K,K.id,J)
}return false
},menuLinkOnKeyDown:function(J,I,N,M){var K=A.keyCode(M);
var L=E.getElementById(I);
if(this.AWActiveMenu&&this.AWLinkId==N){return F.menuKeyDown(M,L)
}else{if(K==G.KeyCodeEnter){this.clearActiveItem(L);
this.menuLinkOnClick(J,I,N,M,false)
}else{if(K==G.KeyCodeArrowDown){this.menuLinkOnClick(J,I,N,M,true)
}}}return true
},getActiveItem:function(){if(this.AWActiveItemId){return E.getElementById(this.AWActiveItemId)
}return null
},setActiveItem:function(I){this.AWActiveItemId=I
},clearActiveItem:function(L){this.AWActiveItemId=null;
var K=this.menuItems(L);
var J;
for(var I=0;
I<K.length;
I++){this.cellMouseOut(K[I])
}},hiliteMenuItem:function(L,M){if(!M){M=this.menu(L)
}var K=this.menuItems(M);
if(K.length==0){return 
}if(!L){L=K[0]
}var J;
for(var I=0;
I<K.length;
I++){J=K[I];
if(L==J){this.cellMouseOver(J);
this.setActiveItem(J.id)
}else{this.cellMouseOut(J)
}}},menuItems:function(I){return E.findChildrenUsingPredicate(I,function(J){return J.tagName=="A"&&(J.className.indexOf("awmenuCell")>-1||J.className.indexOf("mC")>-1)&&J.getAttribute("skipLink")!="1"
},true)
},menu:function(I){return E.findParentUsingPredicate(I,function(J){return(J.tagName=="DIV"&&J.className&&J.className.indexOf("awmenu")>-1)
})
},menuOnMouseDown:function(I){if(I.hideActiveMenu){this.hideActiveMenu();
A.cancelBubble(I);
return false
}I.keepActiveMenu=true;
return true
},menuLinkOnClick:function(K,J,M,L,I){return this._menuLinkOnClick(null,K,J,M,L)
},_menuLinkOnClick:function(L,K,J,U,N,Q){var V=E.getElementById(J);
var S;
var R;
if(N){S=N.pageX;
R=N.pageY
}E.relocateDiv(V);
if(N&&(S!=N.pageX||R!=N.pageY)){N=new Object();
N.pageX=S;
N.pageY=R
}if(this.AWActiveMenu!=V){this.hideActiveMenu();
V.onmousedown=this.menuOnMouseDown.bindEventHandler(this);
this.AWLinkId=U;
this.AWActiveMenu=V;
if(Q){this.hiliteMenuItem(null,V)
}var I=this.hideActiveMenu.bind(this);
var M=function(W){if(!W.keepActiveMenu){I()
}};
A.enableDocumentClick(M);
E.removeClass(V,"awmenuEx");
this.checkMenuLayout(V);
if(K!=null){V.style.display="";
V.style.top=0;
V.style.left=0;
if(K.offsetHeight==0){K=K.firstChild
}var P=E.absoluteTop(K)+K.offsetHeight;
P=E.correctForBottomEdge(P,V);
if(L=="right"){var T=E.absoluteLeft(K)+K.offsetWidth-V.offsetWidth;
E.setAbsolutePosition(V,T,P)
}else{var T=E.absoluteLeft(K);
T=E.correctForRightEdge(T,V);
E.setAbsolutePosition(V,T,P)
}C.displayDiv(V)
}else{this.positionAndDisplayDiv(V,N)
}}else{this.hideActiveMenu()
}var O=V.getAttribute("_ondisplay");
if(O){A.handleInline(O,N,V)
}A.cancelBubble(N);
return false
},getMenuTarget:function(K,J){var I=(K==null||K=="this"||K=="right")?J:E.getElementById(K);
return I
},checkMenuLayout:function(I,J){if(I.firstChild.className=="awmenu2col"){var N=E.findChild(I,"TD");
var O=H._arrayAdd(H._arrayAdd([],N.childNodes),N.nextSibling.childNodes);
I.removeChild(I.firstChild);
E._appendChildren(I,O)
}I.lazyCallback=this.checkMenuLayout.bind(this);
I.style.display="";
var L=E.getWindowSize()[1]-30;
if(I.offsetHeight<L){return 
}var R=Math.round(I.offsetHeight/2);
var P,T=H._arrayAdd([],I.childNodes),V=0,K;
for(P=0;
P<T.length;
P++){K=T[P];
if(K.nodeType==1){var S=E.elmBottom(K);
if(S>R&&K.offsetTop>30){var Q=E.hasClass(K,"awmenuHead");
if(S>L){if(!V){V=P-1
}break
}if(V&&Q){V=P-1;
break
}if(!V){V=P-(Q?1:0)
}}}}for(P=0;
P<T.length;
P++){K=T[P];
K.parentNode.removeChild(K)
}if(V<=0){I.innerHTML="";
E._appendChildren(I,T)
}else{I.innerHTML='<table class="awmenu2col"><tr><td></td><td style="border:none"></td></tr></table>';
var U=[];
while(V-->=0){U.push(T.shift())
}var M=E.findChild(I,"TD");
E._appendChildren(M,U);
E._appendChildren(M.nextSibling,T)
}},menuKeyDown:function(M,J){var O=true;
var T=A.keyCode(M);
var K=this.getActiveItem();
var R=null;
if(K){R=E.boolAttr(K,"_sf",true)?E.lookupFormId(K):null;
if(A.keyCode(M)==G.KeyCodeEnter||A.keyCode(M)==G.KeyCodeTab){F.handleClientTrigger(K,M)
}}if(!A.shouldBubble(M)){return false
}if(T==G.KeyCodeEscape){this.hideActiveMenu();
return false
}var S=null;
if(K){S=K.id;
J=this.menu(K)
}var L,I;
if(T==G.KeyCodeEnter&&K){this.menuClicked(K,S,R);
this.hideActiveMenu();
O=false
}else{if(T==G.KeyCodeTab){this.hideActiveMenu();
return true
}else{if(T==G.KeyCodeArrowUp){I=this.menuItems(J);
if(I.length==0){return 
}var N=null;
if(K==I[0]){N=I[I.length-1]
}else{for(L=I.length-1;
L>0;
L--){var Q=I[L];
if(Q==K){N=I[L-1];
break
}}}this.hiliteMenuItem(N,J);
A.cancelBubble(M);
O=false
}else{if(T==G.KeyCodeArrowDown){I=this.menuItems(J);
if(I.length==0){return 
}var P=null;
if(K==null){P=I[0]
}else{if(K==I[I.length-1]){P=I[0]
}else{for(L=0;
L<I.length-1;
L++){var Q=I[L];
if(Q==K){P=I[L+1];
break
}}}}this.hiliteMenuItem(P,J);
A.cancelBubble(M);
O=false
}}}}if(!O){A.cancelBubble(M)
}return false
},menuClicked:function(N,M,L){var K=null;
if(N){K=N.getAttribute("_t")
}var J=(this.AWLinkId==null)?M:this.AWLinkId+","+M;
if(L!=null){D.submitFormForElementName(L,J,null,K)
}else{var I=D.formatUrl(J);
D.setDocumentLocation(I,K)
}this.AWLinkId=null;
this.AWActiveItemId=null;
return false
},menuButtonOver:function(I){I.className="btnOnBrand";
return false
},menuButtonOut:function(I){I.className="btnOffBrand";
return false
},cellMouseOver:function(J,I){this.hiliteDiv(J);
return false
},cellMouseOut:function(I){this.unhiliteDiv(I);
return false
},handleClientTrigger:function(K,I){var J=K.getAttribute("_ct");
if(J){A.handleInline(J,I,K)
}},unsupportedBrowser:function(){alert("PopupMenus not supported on this browser")
},positionAndDisplayDiv:function(I,J){this.positionMenu(I,J);
E.fadeInElement(I);
C.displayDiv(I)
},EOF:0};
H.extend(B,{hideActiveMenu:function(){F.hideActiveMenu()
}});
if(E.isIPad){H.extend(F,function(){return{getMenuTarget:function(J,I){return I
},EOF:0}
}())
}if(E.IsIE){H.extend(F,function(){H.extend(C,{_reloMenu:function(J,I){F.AWActiveMenu=J;
J.style.top=I.style.top;
J.style.left=I.style.left;
this.displayDiv(J)
},preDisplayDiv:function(I){if(I.className=="awmenu"){I.awOnOverlayUpdate=this._reloMenu.bind(this)
}}});
return{menuTop_IE:function(M,N,J){var I=N.srcElement;
var K=E.absoluteTop(I.offsetParent)+N.offsetY;
var L=E.correctForBottomEdge(K,M);
if(L==K){K-=this.AWMenuOffset
}else{K=L
}return K
},menuLeft_IE:function(M,N,J){var I=N.srcElement;
var L=E.absoluteLeft(I.offsetParent)+N.offsetX;
var K=E.correctForRightEdge(L,M);
if(K==L){L-=this.AWMenuOffset
}else{L=K
}return L
},positionMenu:function(L,M){L.style.display="";
var I=E.documentElement();
var J=this.menuTop_IE(L,M,I);
var K=this.menuLeft_IE(L,M,I);
E.setAbsolutePosition(L,K,J)
},EOF:0}
}())
}if(E.IsIEonMac){H.extend(F,function(){var I=null;
return{menuLinkOnClick:function(M,J,O,N){var L=E.getElementById(J);
var K=E.getElementById("awpopupDiv");
if(this.AWActiveMenu==null){this.hideActiveMenu();
this.AWLinkId=O;
this.AWActiveMenu=L;
I=K;
A.enableDocumentClick(this.hideActiveMenu.bind(this));
this.positionDisplayMacIE(L,K,N)
}else{this.hideActiveMenu()
}A.cancelBubble(N);
return false
},hideActiveMenu:function(){if(I!=null){A.disableDocumentClick();
C.undisplayDiv(I)
}I=null;
this.AWActiveMenu=null
},positionDisplayMacIE:function(K,J,L){this.positionMenuMacIE(K,J,L);
C.displayDiv(J)
},positionMenuMacIE:function(K,J,N){var M=N.clientX+E.documentElement().scrollLeft;
var L=N.clientY+E.documentElement().scrollTop;
if((M-15)>=0){M=M-15
}if((L-15)>=0){L=L-15
}var O='<table><tr><td class="awmenuCell">'+K.innerHTML+"</td></tr></table>";
J.style.zIndex=1000000;
J.innerHTML=O;
J.style.position="absolute";
J.style.left=M+"px";
J.style.top=L+"px"
},EOF:0}
}())
}if(!E.IsIE){H.extend(F,function(){return{positionMenu_NS6:function(J,M){var O=J.style;
var I=O.display;
if(I=="none"){O.display=""
}var Q=M.pageY;
var L=M.pageX;
var K=J.offsetHeight;
var N=J.offsetWidth;
O.top=0;
var R;
var P=M.clientY+K;
if(P>window.innerHeight){R=P-window.innerHeight;
Q=Q-R
}Q=Q-this.AWMenuOffset;
if(Q<0){Q=0
}O.left=0;
P=M.clientX+N;
if(P>window.innerWidth){R=P-window.innerWidth;
L=L-R
}L=L-this.AWMenuOffset;
if(L<0){L=0
}E.setAbsolutePosition(J,L,Q);
O.display=I
},positionMenu:function(J,I){if(E.IsNS6){this.positionMenu_NS6(J,I)
}else{this.unsupportedBrowser()
}},EOF:0}
}())
}F.PML={click:function(M,I){ariba.Widgets.hideActiveHoverCard();
F.activateMenuLink(M);
var J=true;
var L=M.getAttribute("_pos");
var K=F.getMenuTarget(L,M);
J=F._menuLinkOnClick(L,K,M.getAttribute("_mid"),M.id,I);
return J
},keydown:function(J,I){F.activateMenuLink(J);
return F.menuLinkOnKeyDown(J,J.getAttribute("_mid"),J.id,I)
}};
A.registerBehaviors({PML:F.PML,PMI_NoHover:{mousedown:function(J,I){return F.menuItemClicked(J,I)
}}});
A.registerBehaviors({PMI:{prototype:A.behaviors.PMI_NoHover,mousedown:function(J,I){return F.menuItemClicked(J,I)
},mouseover:function(J,I){return F.hiliteMenuItem(J,null)
}}});
A.registerBehaviors({PMIO:{prototype:A.behaviors.PMI,mousedown:function(K,I){var J=E.findParentUsingPredicate(K,function(L){return E.hasClass(L,"awmenu")
});
E.addClass(J,"awmenuEx");
F.checkMenuLayout(J);
E.repositionDivToWindow(J);
return A.cancelBubble(I)
},keydown:function(J,I){return A.behaviors.PMIO.mousedown(J,I)
}}});
return F
}();
ariba.Chooser=function(){var I=ariba.Util;
var D=ariba.Menu;
var K=ariba.Event;
var J=ariba.Debug;
var C=ariba.Dom;
var A=ariba.Request;
var E=ariba.Input;
var B=new Object();
var H=new Object();
var F=new Object();
var G={initChooser:function(R,Q,M,L,P,O){var N=new Object();
B[R]=N;
N.chooserId=R;
N.isInvalid=L;
N.searchPattern="";
N.skipBlur=false;
N.multiSelect=Q;
N.textTimeoutId=null;
N.keyDownTimeoutId=null;
N.basic=O;
N.initialized=false;
if(P){K.forceOnWindowResize()
}},fullInit:function(M){var N=C.getElementById(M.chooserId);
M.wrapper=N;
M.noSelectionValue=N.getAttribute("_ns");
M.menuPositionObj=C.findChild(N,"TR",false);
M.textField=C.findChild(N,"INPUT",false);
M.initValue=M.textField.value;
M.modeLink=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chModeLink")
});
M.pickListImage=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chPickListImg")
});
M.searchImage=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chSearchImg")
});
M.menu=C.findChildUsingPredicate(N,function(O){return O.tagName=="DIV"&&C.hasClass(O,"awmenu")
});
M.menuLinks=D.menuItems(M.menu);
if(!M.basic){var L=C.findChildUsingPredicate(M.menu,function(O){return O.tagName=="DIV"&&C.hasClass(O,"chSearchLink")
});
M.searchLink=L.parentNode;
M.validSelection=this.hasSelection(M)&&!M.isInvalid
}M.selectionContainer=C.findChildUsingPredicate(N,function(O){return O.tagName=="SPAN"&&C.hasClass(O,"chSelections")
});
M.matchesContainer=C.findChildUsingPredicate(N,function(O){return O.tagName=="SPAN"&&C.hasClass(O,"chMatches")
});
M.fullMatchCheckbox=C.findChildUsingPredicate(N,function(O){return O.tagName=="INPUT"&&C.hasClass(O,"chfullMatch")
});
this.chooserPickListMode(M);
if(M.multiSelect){M.multiSelectTextRegion=C.findChildUsingPredicate(N,function(O){return O.tagName=="TD"&&C.hasClass(O,"chMultiSelected")
});
M.addLink=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chAddLink")
});
M.addOffImage=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chAddOffImg")
});
M.addOnImage=C.findChildUsingPredicate(N,function(O){return O.tagName=="IMG"&&C.hasClass(O,"chAddOnImg")
});
M.addModeCheckbox=C.findChildUsingPredicate(N,function(O){return O.tagName=="INPUT"&&C.hasClass(O,"chAddMode")
});
M.recentSelections=C.findChildrenUsingPredicate(N,function(O){return O.tagName=="TR"&&C.hasClass(O,"chMultiRow")
});
M.moreSelectedRow=C.findChildUsingPredicate(N,function(O){return O.tagName=="TR"&&C.hasClass(O,"chMoreSelectedRow")
});
if(M.moreSelectedRow){M.moreSelected=C.findChildUsingPredicate(M.moreSelectedRow,function(O){return O.tagName=="SPAN"&&C.hasClass(O,"chMoreSelected")
});
M.moreSelectedPlusOne=C.findChildUsingPredicate(M.moreSelectedRow,function(O){return O.tagName=="SPAN"&&C.hasClass(O,"chMoreSelectedPlusOne")
});
M.moreSelectedPlusTwo=C.findChildUsingPredicate(M.moreSelectedRow,function(O){return O.tagName=="SPAN"&&C.hasClass(O,"chMoreSelectedPlusTwo")
});
if(M.moreSelected.innerHTML==""){M.moreSelectedRow.style.display="none"
}M.moreSelectedRow.style.height=M.recentSelections[1].offsetHeight+"px"
}M.maxRecentSelection=parseInt(N.getAttribute("_mrs"));
this.chooserAddMode(M)
}M.initialized=true
},hasSelection:function(M){var L=M.textField.value;
return L!=""&&L!=M.noSelectionValue
},initiallyHadSelection:function(M){var L=M.initValue;
return L!=""&&L!=M.noSelectionValue
},getChooserInfo:function(M){var L=C.findParentUsingPredicate(M,function(N){return N.tagName=="SPAN"&&C.hasClass(N,"chWrapper")
},true);
return B[L.id]
},chooserSetFocus:function(L,N){var M=function(){L.textField.focus();
if(!N){L.textField.select()
}};
setTimeout(M.bind(this),1)
},chooserMenuTrigger:function(Q,S){var M=D.menu(Q);
var N=this.selectionIndex(Q);
var L=D.menuItems(M);
for(var O=0;
O<L.length;
O++){if(L[O]==Q){N.value=O;
break
}}var P=this.selectionListName(Q);
var U=this.selectionList(Q);
U.value=P;
var T=K.keyCode(S);
if(T==E.KeyCodeTab){var R=C.boolAttr(Q,"_sf",true)?C.lookupFormId(Q):null;
D.menuClicked(Q,Q.id,R)
}},chooserRemoveClick:function(N){var L=K.eventSourceElement(N);
var M=C.findParentUsingPredicate(L,function(P){return(P.tagName=="SPAN"&&C.hasClass(P,"chSelectionContainer"))
});
var O=C.findChildUsingPredicate(M,function(P){return(P.tagName=="INPUT"&&C.hasClass(P,"chRemove"))
});
O.checked=true
},selectionIndex:function(M){var L=C.findParentUsingPredicate(M,function(N){return(N.tagName=="SPAN"&&C.hasClass(N,"chSelectionContainer"))
});
return C.findChildUsingPredicate(L,function(N){return(N.tagName=="INPUT"&&C.hasClass(N,"chSelectIndex"))
})
},selectionListName:function(L){var M=C.findParentUsingPredicate(L,function(N){return(N.tagName=="SPAN"&&C.hasClass(N,"chList"))
});
return M.getAttribute("chlname")
},selectionList:function(M){var L=C.findParentUsingPredicate(M,function(O){return(O.tagName=="SPAN"&&C.hasClass(O,"chSelectionContainer"))
});
var N=C.findChildUsingPredicate(L,function(O){return(O.tagName=="INPUT"&&C.hasClass(O,"chSelectList"))
});
return N
},setAddMode:function(M,L){if(M.addModeCheckbox){M.addModeCheckbox.checked=L
}},addMode:function(L){if(L.addModeCheckbox){return L.addModeCheckbox.checked
}return false
},checkChooserText:function(L){if(!L.validSelection){if(this.initiallyHadSelection(L)){if(L.multiSelect){L.validSelection=true;
L.textField.value=L.initValue;
this.setAddMode(L,false);
this.chooserAddMode(L)
}}else{C.addClass(L.textField,"chNoSelection");
if(L.textField.value!=L.noSelectionValue){L.textField.value=L.noSelectionValue
}}this.chooserPickListMode(L)
}if(L.validSelection){C.removeClass(L.textField,"chNoSelection");
C.addClass(L.textField,"chValidSelection")
}return false
},chooserPickListMode:function(L){L.mode=H;
L.matchesContainer.innerHTML="";
if(!L.basic){L.modeLink.src=L.pickListImage.src;
L.modeLink.title=L.pickListImage.title;
L.selectionContainer.style.display=""
}L.searchPattern="";
this.chooserPickListLinks(L,"0")
},chooserAutoCompleteMode:function(L){L.mode=F;
if(!L.basic){L.modeLink.src=L.searchImage.src;
L.modeLink.title=L.searchImage.title
}L.selectionContainer.style.display="none";
this.chooserPickListLinks(L,"1");
L.validSelection=false;
C.removeClass(L.textField,"chValidSelection")
},chooserHideShow:function(L,M){if(L){L.style.display="none"
}if(M){M.style.display=""
}K.forceOnWindowResize()
},previousRow:function(L){return L.previousSibling.tagName=="TR"?L.previousSibling:L.previousSibling.previousSibling
},chooserHideShowSelected:function(M,L){var N=null;
if(M){M.style.display="none";
N=this.previousRow(M);
N.style.display="none"
}if(L){L.style.display="";
N=this.previousRow(L);
N.style.display=""
}K.forceOnWindowResize()
},chooserAddMode:function(M){if(!M.multiSelect){return 
}var R=M.addLink;
var P=M.recentSelections;
var L=P[0];
var O=null;
var Q=null;
var S=P.length==M.maxRecentSelection&&M.moreSelected.innerHTML=="";
var N=P.length==M.maxRecentSelection-1&&M.moreSelected!=null;
if(N||S){O=P[P.length-1]
}if(S){Q=P[P.length-2]
}if(M.validSelection){R.src=M.addOnImage.src;
R.title=M.addOnImage.title;
R.parentNode.setAttribute("href","#");
this.chooserHideShowSelected(L,O);
if(N){this.chooserHideShow(M.moreSelectedPlusOne,M.moreSelected)
}if(S){this.chooserHideShow(M.moreSelectedPlusTwo,Q);
M.moreSelectedRow.style.display="none"
}}else{R.src=M.addOffImage.src;
R.title=M.addOffImage.title;
R.parentNode.removeAttribute("href");
this.chooserHideShowSelected(O,L);
if(N){this.chooserHideShow(M.moreSelected,M.moreSelectedPlusOne)
}if(S){this.chooserHideShow(Q,M.moreSelectedPlusTwo);
M.moreSelectedRow.style.display=""
}}},chooserPickListLinks:function(L,N){for(var M=0;
M<L.menuLinks.length-1;
M++){L.menuLinks[M].setAttribute("skipLink",N)
}},displayChooserMenu:function(L){if(!D.AWActiveMenu||D.AWActiveMenu!=L.menu){D.menuLinkOnClick(L.menuPositionObj,L.menu.id,L.textField.id,null,!L.basic)
}},chooserFocus:function(O,M){var N=this.getChooserInfo(O);
if(!N){return 
}if(!N.initialized){this.fullInit(N)
}this.cancelChooserBlurTimeout(N);
var L=K.eventSourceElement(M);
J.log("focus "+L.tagName+" "+L.id+" "+O.tagName,5);
if(N.mode==H&&L==N.textField){if(!this.hasSelection(N)){C.removeClass(N.textField,"chNoSelection");
N.textField.value="";
N.searchPattern=""
}}return false
},isValidChooser:function(L){return L.textField.parentNode
},chooserBlur:function(Q,M){var N=this.getChooserInfo(Q);
var L=K.eventSourceElement(M);
var P=K.keyCode(M);
J.log("blur "+L.tagName+" "+L.id+" "+Q.tagName+" "+N.skipBlur,5);
J.log("blur "+this.addMode(N),5);
if(!N.skipBlur){D.hideActiveMenu();
var O=function(){if(this.isValidChooser(N)){if(!N.multiSelect||!this.addMode(N)){if(((this.hasSelection(N)||this.initiallyHadSelection(N))&&(N.textField.value!=N.initValue))||N.isInvalid){this.initChooserFullMatch(N)
}else{this.checkChooserText(N)
}}else{if(!this.hasSelection(N)&&!N.isInvalid){this.checkChooserText(N)
}else{this.initChooserFullMatch(N)
}}}};
this.cancelChooserBlurTimeout(N);
N.textTimeoutId=setTimeout(O.bind(this),200)
}N.skipBlur=false;
return true
},cancelChooserBlurTimeout:function(L){if(L.textTimeoutId){clearTimeout(L.textTimeoutId);
L.textTimeoutId=null
}},cancelChooserFetchTimeout:function(L){if(L.keyDownTimeoutId){clearTimeout(L.keyDownTimeoutId);
L.keyDownTimeoutId=null
}},chooserSearch:function(N,M){var L=K.eventSourceElement(M);
if(L==N.textField||L==N.modeLink||L==N.modeLink.parentNode){K.elementInvoke(N.searchLink,"mousedown");
K.cancelBubble(M)
}return false
},chooserClick:function(O,M){var N=this.getChooserInfo(O);
if(!N.initialized){this.fullInit(N)
}var L=K.eventSourceElement(M);
this.cancelChooserBlurTimeout(N);
this.cancelChooserFetchTimeout(N);
if(L==N.modeLink){if(N.mode==F){this.chooserSearch(N,M)
}else{this.displayChooserMenu(N)
}}else{if(L==N.addLink){if(N.validSelection){N.validSelection=false;
this.chooserAddMode(N);
N.textField.value="";
this.chooserSetFocus(N);
N.validSelection=false;
this.setAddMode(N,true)
}}else{N.textField.select()
}}K.cancelBubble(M);
return false
},chooserKeyDown:function(Q,N){var V=this.getChooserInfo(Q);
var T=K.keyCode(N);
var O=K.eventSourceElement(N);
this.cancelChooserFetchTimeout(V);
if(O==V.textField&&Q==V.textField){V.skipBlur=T==E.KeyCodeEnter;
if(D.AWActiveMenu&&D.AWLinkId==V.textField.id){var U=D.getActiveItem();
var L=null;
if(!V.basic){L=V.searchLink.id
}if(T==E.KeyCodeEnter&&U&&D.AWActiveItemId!=L){this.chooserMenuTrigger(U,N);
var S=C.lookupFormId(V.textField);
var R=V.textField.id;
A.submitFormForElementName(S,R,N,null);
D.hideActiveMenu()
}else{D.menuKeyDown(N,V.menu);
var M=D.menuItems(V.menu);
if(M.length>1){V.skipBlur=T==E.KeyCodeTab
}}}J.log("skipBlur "+V.skipBlur+" keycode "+T)
}if(!K.shouldBubble(N)){return false
}if(T==E.KeyCodeEnter){if(O==V.textField&&Q==V.textField){if(V.basic){K.cancelBubble(N);
D.hideActiveMenu();
var S=C.lookupFormId(V.textField);
var R=V.textField.id;
A.submitFormForElementName(S,R,N,null)
}else{return this.chooserSearch(V,N)
}}else{if(V.addLink){if(O==V.addLink||O==V.addLink.parentNode){if(V.validSelection){V.validSelection=false;
this.chooserAddMode(V);
V.textField.value="";
this.chooserSetFocus(V);
V.validSelection=false;
this.setAddMode(V,true)
}}}}}else{if(T==E.KeyCodeEscape){if(O==V.textField&&Q==V.textField){if(this.initiallyHadSelection(V)){this.chooserPickListMode(V);
V.validSelection=false;
this.checkChooserText(V)
}return false
}return false
}else{if(V.mode==H){if(T==E.KeyCodeArrowDown){this.displayChooserMenu(V);
K.cancelBubble(N)
}}function P(){var W=V.textField.value;
C.removeClass(V.textField,"chInvalidSelection");
if(V.mode==H){if(W!=""){if(V.isInvalid||V.initValue!=W&&W!=V.noSelectionValue){this.chooserAutoCompleteMode(V)
}}}if(V.mode==F){if(W.length==0){D.hideActiveMenu();
V.searchPattern=W;
this.chooserPickListMode(V)
}else{if(W==V.searchPattern){return true
}else{this.cancelChooserFetchTimeout(V);
V.keyDownTimeoutId=this.initChooserFetchList(V,1)
}}}return false
}if(O==V.textField&&Q==V.textField){if(!A.isRequestInProgress()){setTimeout(P.bind(this),1)
}}}}},initChooserFetchList:function(N,O){var P=N.textField.value;
var M=function(Q){if(P==N.textField.value&&Q.responseText.indexOf("chooser match")>-1){N.matchesContainer.innerHTML=Q.responseText;
var R=D.menuItems(N.menu);
var S=true;
var T=R.length>=2;
if(N.basic){S=R.length>0;
T=false
}if(S){this.displayChooserMenu(N)
}else{D.hideActiveMenu()
}if(T){D.hiliteMenuItem(R[0],N.menu)
}}};
var L=function(){N.searchPattern=P;
var Q=A.formatInPageRequestUrl(N.wrapper.id);
Q=Q+"&chsp="+encodeURIComponent(P);
if(this.addMode(N)){Q=Q+"&chadd=1"
}A.initiateXMLHttpRequest(Q,M.bind(this))
};
return setTimeout(L.bind(this),O)
},initChooserFullMatch:function(L){var O=L.textField.value;
var N=function(P){var Q=A.createRequestIFrame("AWRefreshFrame");
var R=Q.document;
R.open();
R.write(P.responseText);
R.close()
};
var M=function(){if(A.isRequestInProgress()){return 
}L.searchPattern=O;
var P=L.textField.form;
L.fullMatchCheckbox.checked=true;
C.addFormField(P,"chsp",O);
A.submitForm(P,null,null,true)
};
return setTimeout(M.bind(this),1)
},chooserMouseOver:function(O,L){var N=this.getChooserInfo(O);
this.cancelChooserFetchTimeout(N);
var M=C.findChildrenUsingPredicate(O,function(P){return P.tagName=="IMG"
});
M[0].src=M[2].src;
M[0].title=M[2].title
},chooserMouseOut:function(N,L){var M=C.findChildrenUsingPredicate(N,function(O){return O.tagName=="IMG"
});
M[0].src=M[1].src;
M[0].title=M[1].title
},EOF:0};
if(C.isIPad){I.extend(G,function(){return{displayChooserMenu:function(L){D.menuLinkOnClick(L.menuPositionObj,L.menu.id,L.textField.id,null,!L.basic)
},EOF:0}
}())
}ariba.Event.registerBehaviors({CH:{click:function(M,L){return G.chooserClick(M,L)
},keydown:function(M,L){return G.chooserKeyDown(M,L)
}},CHM:{mouseover:function(M,L){return G.chooserMouseOver(M,L)
},mouseout:function(M,L){return G.chooserMouseOut(M,L)
},focus:function(M,L){return G.chooserFocus(M,L)
}},CHR:{click:function(M,L){G.chooserRemoveClick(L);
return K.behaviors.GAT.click(M,L)
}}});
return G
}();
ariba.Datatable=function(){var D=ariba.Util;
var l=ariba.Dom;
var g=ariba.Event;
var v=ariba.Request;
var n=ariba.DragDrop;
var p=ariba.Input;
var X=ariba.Widgets;
var J=ariba.Debug;
var A=new Object();
var Q;
var H;
var I=false;
var B=false;
var E=false;
var u=false;
var b="awtForceDrag";
var T=0;
var o;
var R=l.IsIE;
var q=18;
var S=25;
var G=null;
var K=250;
var U;
var C;
var W=0;
var k=1;
var Y=2;
var s=3;
var M=4;
var c=5;
var P=6;
var f="tableRowDragHover ";
var a="tableRowSelected ";
var V="tableRowHover ";
var e="awtDrg_";
var r="awtDrp_";
var h=0;
var L=false;
var m;
var O=new Object();
var Z="numTables";
var F=function(w){var y=(w.srcElement)?w.srcElement:w.target;
var z=y.getAttribute("_tbId");
var x=ariba.Datatable.infoForScrollableTable(z);
J.log("Click!!!");
return ariba.Datatable.maxMin(x)
};
var t=function(){var x=this.getAttribute("_tbId");
var w=ariba.Datatable.infoForScrollableTable(x);
if(w.head){w.head.scrollLeft=w.body.scrollLeft
}ariba.Datatable.handleVerticalScroll(w)
};
var N={registerTableInfo:function(y,x){A[y]=x;
var w=l.findParentUsingPredicate(x.wrapperTable,function(z){return l.hasClass(z,"flexContainer")
});
if(w&&!w.getAttribute("_cid")){w.setAttribute("_cid",T++)
}x.flexContainer=w;
x.positioningParent=(!x.flexContainer)?null:l.findParentUsingPredicate(x.flexContainer,function(z){return l.hasClass(z,"panelContainer")
});
if(!x.positioningParent){x.positioningParent=l.positioningParent(x.flexContainer)
}else{D.incrementAttribute(x.positioningParent,Z)
}x.bodyHt=0
},registerNonScrollTableId:function(x,w,z,AA,AB){var AC=l.getElementById(x);
var y=this.wrapperForBody(AC);
var AE=A[x];
if(!AE||(y!=AE.wrapperTable)||(AC!=AE.bodyTable)){AE=new Object();
AE.isDraggable=w;
AE.wrapperTable=y;
AE.bodyTable=AC;
AE.isScrollTable=false;
AE.disableRowSelection=z;
AE.checkNbsps=!AA;
AE.checkSelectionStyle=AB;
this.registerTableInfo(x,AE)
}var AD=AE.bodyTable;
if(AD==null){alert("can't find table in wrapperTable: "+x)
}this.setupTable(AE)
},wrapperForBody:function(w){return l.findParentUsingPredicate(w,function(x){return x.tagName=="TABLE"&&x.getAttribute("minHeight")
})
},registerScrollTable:function(w,z,AC,AD,y){var AE=l.getElementById(w);
var x=this.wrapperForBody(AE);
var AG=A[w];
J.log("*** awtRegisterScrollTable: "+w);
if(!AG||(AE!=AG.bodyTable)){AG=new Object();
AG.disableRowSelection=z;
AG.checkNbsps=!AC;
AG.checkSelectionStyle=AD;
AG.bodyTable=AE;
AG.wrapperTable=x;
AG.head=l.findChildUsingPredicate(x,function(AH){return AH.tagName=="DIV"&&AH.className=="tableHead"
});
AG.headTable=l.findChild(AG.head,"TABLE");
AG.body=l.findParent(AG.bodyTable,"DIV");
AG.minHeight=parseInt(x.getAttribute("minHeight"));
AG.maxHeight=parseInt(x.getAttribute("maxHeight"));
AG.isScrollTable=true;
this.registerTableInfo(w,AG);
if(!E){E=true
}var AA=(y==null);
var AF=(AA?x:((y.length)?l.getElementById(y):null));
if(AF){var AB=l.findChildUsingPredicate(AF,function(AH){return AH.tagName=="TD"&&AH.className=="awtMMNone"
});
if(AG.mmControl!=AB){AG.mmControl=AB;
if(AG.mmControl){AG.mmControl.setAttribute("_tbId",w);
AG.mmControl.onclick=F.bindEventHandler(null)
}}}}this.registerPostLoad()
},updateScrollTable:function(y,w,AD,x,AC,z,AE,AG,AF,AB,AA){var AH=this.infoForTable(y);
if(!AH){return 
}AH.isDraggable=w;
AH.isMaximizedId=(AD=="")?null:AD;
AH.maximize=(AD)?(l.elementValue(AD)=="true"):false;
AH.rowIdToForceVisible=(AB=="")?null:AB;
if(x){AH.topCount=parseInt(x);
AH.bottomCount=parseInt(AC);
AH.topIndexId=z;
AH.topOffsetId=AE;
AH.leftPosId=AG;
AH.scrollFaultActionId=AF;
AH.repositionScroll=true
}AH.updateSelectAllActionId=AA;
this.registerPostLoad()
},registerPostLoad:function(){if(!I){I=true;
g.registerUpdateCompleteCallback(this.postLoad.bind(this))
}},infoForScrollableTable:function(x){var w=this.infoForTable(x);
return(w&&w.isScrollTable)?w:null
},infoForTable:function(x){var w=A[x];
if(!l.getElementById(x)){delete A[x];
return null
}return w
},setupTable:function(x){var w=x.bodyTable;
if(!w.onmouseover){w.onmouseover=this.mouseOverEventHandler.bindEventHandler(this);
w.onmouseout=this.mouseOutEventHandler.bindEventHandler(this);
w.onclick=this.rowClickedEventHandler.bindEventHandler(this);
w.onmousedown=this.mouseDownEvtHandler.bindEventHandler(this);
w.onmouseup=this.mouseUpEvtHandler.bindEventHandler(this);
w.onmousemove=this.mouseMoveEvtHandler.bindEventHandler(this);
if(l.IsIE){w.onselectstart=function(y){N.selectStartEvtHandler(y)
}
}}if(x.checkSelectionStyle){this._updateSelections(x)
}if(x.checkNbsps){J.log("adding nbsps to body");
this.addNbsps(w)
}},addNbsps:function(AA){var AB=AA.rows;
for(var z=0;
z<AB.length;
z++){var y=AB[z].cells;
if(y){for(var x=0;
x<y.length;
x++){var w=y[x];
var AC=w.childNodes.length;
if(AC==0){w.innerHTML="&nbsp;"
}else{if(AC==1){var AD=w.childNodes[0];
if(((AD.tagName=="SPAN")||(AD.tagName=="A"))&&AD.childNodes.length==0){w.innerHTML="&nbsp;"
}}}}}}},setupScrollTable:function(w){if(w.bodyTable.rows.length==0){w.isScrollTable=false
}else{if(!w.scrollSetup){w.scrollSetup=true;
var AE=w.bodyTable.rows[0].cells;
var x=document.createElement("TR");
x.className="AWTColAlignRow";
if(w.headTable){var AN=w.headTable.rows;
var AJ=AN[0];
var AM=!AJ.getAttribute("_awtspacer");
if(w.checkNbsps){this.addNbsps(w.headTable)
}var AK=document.createElement("TR");
var AC=AJ.cells;
var AF=AC.length-(AM?0:1);
for(var AI=0;
AI<AF;
AI++){var y=AC[AI];
var AB=document.createElement("TD");
AB.appendChild(document.createTextNode(""));
var AD=y.offsetWidth;
AB.style.paddingRight=AD+"px";
AB.width=y.width;
x.appendChild(AB);
var z=document.createElement("TH");
z.appendChild(document.createTextNode(""));
AK.appendChild(z)
}var AB=document.createElement("TD");
AB.appendChild(document.createTextNode(""));
AB.className="spacer";
x.appendChild(AB);
if(AM){var AL=0;
for(var AI=0;
AI<AN.length;
AI++){if(AL>1){AL--
}else{var AA=AN[AI];
if(AA&&AA.cells&&AA.cells.length>0){var AH=AA.cells[AA.cells.length-1];
AL=AH.rowSpan;
var z=document.createElement(AH.tagName);
z.appendChild(document.createTextNode(""));
if(AI>0){z.innerHTML="&nbsp;"
}z.className=AH.className+" thSpacer";
if(AL){z.rowSpan=AL
}AA.appendChild(z)
}}}AK.appendChild(document.createElement("TH"));
w.headTable.tBodies[0].insertBefore(AK,w.headTable.rows[0]);
w.headTable.style.width="auto";
AK.setAttribute("_awtspacer",1)
}}else{for(var AI=0;
AI<(AE.length+1);
AI++){var AB=document.createElement("TD");
AB.appendChild(document.createTextNode(""));
if(AI==AE.length){AB.className="spacer"
}x.appendChild(AB)
}}w.bodyTable.tBodies[0].insertBefore(x,w.bodyTable.rows[0]);
var AG=l.elementIntValue(w.leftPosId);
if(AG>0){w.body.scrollLeft=AG
}w.body.setAttribute("_tbId",w.bodyTable.id);
w.body.onscroll=t
}}this.setupTable(w)
},handleDataTableException:function(w,y){var x="datatable exception: "+w+", id: "+y;
J.log(x);
if(v.AWDebugEnabled){alert(x)
}},postLoad:function(){p.setShowWaitCursorDisabled(false);
J.log("awtPostLoad running...");
var x=new Array();
for(var AA in A){try{var y=this.infoForScrollableTable(AA);
if(y){this.setupScrollTable(y);
if(y.topIndexId){x.push(y)
}}}catch(z){this.handleDataTableException(z,AA)
}}for(var w=0;
w<x.length;
w++){try{this.setupScrollFaulting(x[w])
}catch(z){this.handleDataTableException(z,"")
}}g.eventEnqueue(this.windowResized.bind(this));
if(!u){g.registerOnWindowResize(this.windowResized.bind(this));
u=true
}I=false;
B=false;
if(!o){this.scrollHidePanel()
}else{var y=o;
o=null;
setTimeout(function(){N.processScrollFault(y)
},0)
}},fixHeadingWidths:function(AF){if(!AF.headTable){return 
}var AD=AF.headTable.rows[0].cells;
var w=AF.bodyTable.rows;
var AC=w[0].cells;
J.log("Setting header cell widths...");
var AA=0;
var AB=(w.length>1&&w[1].cells.length>0)&&l.hasClass(w[1].cells[0],"empty");
if(!AB){for(var z=0;
z<AC.length-1;
z++){var y=AD[z];
var AE=AC[z];
var x=AE.offsetWidth;
AA+=x;
y.style.paddingRight=x+"px"
}AD[AD.length-1].style.paddingRight="100px"
}else{AF.headTable.style.width="100%"
}},fixAllHeadingWidths:function(){for(var y in A){try{var x=this.infoForScrollableTable(y);
if(x){this.fixHeadingWidths(x)
}}catch(w){this.handleDataTableException(w,y)
}}},spacerWd:function(w){return(R&&l.hasClass(w.wrapperTable,"yScroll"))?q+1:1
},desiredWidth:function(AB){var z=AB.bodyTable.rows[0].cells;
var AA=z[z.length-1];
var x=AA.clientWidth;
var y=this.spacerWd(AB);
var w=AB.bodyTable.offsetWidth;
return w-x+y
},checkWidthStrut:function(AE,AD,AB){if(AD==l.documentElement()){return 
}var w=X.panelMaxWidth(AD,AE.wrapperTable);
var AA=D.getIntAttribute(AD,Z)<=1;
var AC=this.avgRowHeight(AE)>35;
if(AC&&AA){AB*=1.3
}var y=(l.absoluteLeft(AE.bodyTable)-l.absoluteLeft(AE.wrapperTable))*2;
AB=Math.min(AB+y,w);
var z=AE.wrapperTable.parentNode.nextSibling;
var x=parseInt(z.style.width)||0;
if(AB>0&&x!=AB){z.style.width=AB+"px"
}},innerSize:function(z){var x=(l.isSafari)?z.offsetWidth:z.clientWidth;
var y=(l.isSafari)?z.offsetHeight:z.clientHeight;
return[x-parseInt(l.effectiveStyle(z,"padding-left"))-parseInt(l.effectiveStyle(z,"padding-right")),y-parseInt(l.effectiveStyle(z,"padding-top"))-parseInt(l.effectiveStyle(z,"padding-bottom"))]
},computeMinMaxHt:function(AA,y){var AB=new Object();
var z=null;
if(!l.IsIE&&!AA.didSize){z=AA.body.style.height;
AA.body.style.height="1px";
AA.didSize=true
}var w=AA.bodyTable.offsetHeight;
var x=AA.wrapperTable.offsetHeight-AA.body.offsetHeight;
if(y-2>AA.bodyTable.parentNode.offsetWidth){w+=q
}AB.maxHt=w+x;
AB.minHt=(AA.maximize)?Math.min(AB.maxHt,Math.max(document.documentElement.clientHeight-20,AA.minHeight)):Math.min(AB.maxHt,AA.minHeight+x);
AB.desiredWidth=y;
if(z){AA.body.style.height=z
}return AB
},maxMin:function(w){w.maximize=!(w.maximize);
l.setElementValue(w.isMaximizedId,((w.maximize)?"true":"false"));
w.newScrollTop=w.body.scrollTop;
g.eventEnqueue(this.windowResized.bind(this));
if(w.maximize){l.setPageScrollTop(l.absoluteTop(w.wrapperTable)-10)
}return false
},windowResized:function(){this.fixAllHeadingWidths();
var z=false;
var y=new Object();
for(var w in A){try{var x=this.infoForScrollableTable(w);
if(x){var AB=(x.flexContainer)?x.flexContainer.getAttribute("_cid"):"00";
var AD=(y[AB]||(y[AB]=new Object()));
AD[w]=x;
if(!z){X.hideFloatingFooter();
z=true
}}}catch(AC){this.handleDataTableException(AC,w)
}}for(var AA in y){this.windowResizedForGroup(y[AA])
}if(this.checkWindowScrollbar(true)){for(var AA in y){for(var w in y[AA]){try{var AE=this.infoForScrollableTable(w);
if(AE){this.fixHeadingWidths(AE)
}}catch(AC){this.handleDataTableException(AC,w)
}}}}},windowResizedForGroup:function(AP){var AC=0;
var AK=0;
var AZ=0;
var Ac=0;
var AE=document.documentElement;
var AT=[];
J.log("<b><u>**** Datatable Resizing Group</u></b>");
for(var AS in AP){try{J.log("Table <b>"+AS+"</b>");
var x=this.infoForScrollableTable(AS);
if(!x){continue
}var AV=x.wrapperTable;
var y=this.desiredWidth(x);
this.checkWidthStrut(x,x.positioningParent,y);
var AY=this.computeMinMaxHt(x,y);
AK+=AV.offsetHeight;
AT[AS]=AY;
AZ+=(AY.maxHt-AY.minHt);
AC+=AY.minHt
}catch(Ad){this.handleDataTableException(Ad,AS)
}}var AU=x.flexContainer;
var AE=x.positioningParent;
var w=0;
if(AU){J.log("flexContainer.clientHeight="+AU.clientHeight+", offsetHeight="+AU.offsetHeight);
if(l.hasClass(AE,"panelContainer")){J.log("&&&& PanelContainer is positioning parent -- height="+AE.offsetHeight);
w=X.panelMaxHt(AE)
}var z=AU;
while(z){var AM=l.findParentUsingPredicate(z,function(Ag){return Ag.tagName=="TD"
})||document.documentElement;
if(AM){J.log("flexBox.clientHeight="+AM.clientHeight+", offsetHeight="+AM.offsetHeight);
Ac+=this.innerSize(AM)[1]-z.offsetHeight
}z=l.findParentUsingPredicate(z,function(Ag){return l.hasClass(Ag,"flexContainer")
});
if(z&&!l.findParentUsingPredicate(z,function(Ag){return Ag==AE
})){z=null
}}}if(w==0){w=AE.clientHeight
}var AQ=(AE.tagName=="HTML")?document.body:((AE.childNodes.length==1)?AE.childNodes[0]:AE);
var AH=AQ.offsetHeight;
Ac+=w-AH;
J.log("positioningParent.clientHeight:"+w+", content:"+AH);
J.log("--- Resize!  offsetHeight="+w+", totalUsed="+AK+", totalReq="+AC+", windowExtra="+Ac);
Ac=Ac+AK-AC-8;
var AA=0;
for(var AS in AP){try{J.log("** Table: <b>"+AS+"</b>");
var x=this.infoForScrollableTable(AS);
if(!x){continue
}var AY=AT[AS];
var AV=x.wrapperTable;
var AL=x.body;
var Ab=AY.maxHt;
var AI=AY.minHt;
var AR=(Ab-AI);
var AJ=((Ac>0)&&(AR>0))?(AI+Math.round(AR*1/AZ*Ac)):AI;
var AO=Math.min(Ab,AJ);
if(x.maxHeight){AO=Math.min(AO,x.maxHeight)
}var AN=AO-(AV.offsetHeight-AL.offsetHeight);
var AX=Ab>AO;
if(AX){AA+=(Ab-AO)
}J.log("newHeight="+AO+", maxHeight="+Ab+"  (showVertScroll:"+AX+")");
if(AN!=x.bodyHt||AY.desiredWidth!=x.desiredWidth){x.bodyHt=AN;
x.desiredWidth=AY.desiredWidth;
var AF=x.bodyTable.rows[0].cells;
var AW=AF[AF.length-1];
var Ae=AW.clientWidth;
var AG=x.bodyTable.offsetWidth-Ae;
var Aa=AL.offsetWidth;
var AD=AG-Aa;
var Af=(AD>2);
J.log("bodyHt ("+AS+") = "+AN);
AL.style.height=AN+"px";
if(AX){if(!l.hasClass(AL,"yScroll")){l.addClass(AL,"yScroll")
}}else{AL.scrollTop=0;
if(x.head){x.head.scrollTop=0
}l.removeClass(AL,"yScroll")
}if(Af){if(!l.hasClass(AL,"xScroll")){AL.style.overflowY="auto";
l.addClass(AL,"xScroll");
AL.style.overflowY=""
}}else{AL.scrollLeft=0;
if(x.head){x.head.scrollLeft=0
}l.removeClass(AL,"xScroll")
}if(x.mmControl){var AB=(x.maximize)?"awtMMMax":((AX)?"awtMMScroll":"awtMMNone");
if(x.mmControl.className!=AB){x.mmControl.className=AB
}}this.checkWidthStrut(x,AE,this.desiredWidth(x));
this.fixHeadingWidths(x)
}this.tryScrollSet(x)
}catch(Ad){this.handleDataTableException(Ad,AS)
}}X.panelRegChildWants(AE,AA)
},tryScrollSet:function(AE,x){var AA=AE.body;
var y;
if(AE.rowIdToForceVisible&&(y=l.getElementById(AE.rowIdToForceVisible))){J.log("<b>Force Visible:</b><pre>"+l.getOuterHTML(y)+"</pre>");
var AF=AA.offsetHeight;
if(y.offsetTop>AA.scrollTop&&(y.offsetTop+y.offsetHeight)<=(AA.scrollTop+AF)){J.log("Bailing on scroll pos set...:  scrollHeight="+AF+", visRow.offsetTop="+y.offsetTop+", tableInfo.body.scrollTop="+AA.scrollTop);
AE.newScrollTop=AE.rowIdToForceVisible=null;
return 
}var AC=this.firstRealRow(AE);
var AB=(AC)?AC.offsetTop:0;
var w=this.lastRealRow(AE);
var AD=(w)?w.offsetTop+w.offsetHeight:AA.offsetHeight;
J.log("<b>Row Pos: "+y.offsetTop+"</b>, topPos: "+AB+", bottomPos: "+AD);
var z=Math.floor(y.offsetTop-(AF*0.4));
if(z<AB){z=AB
}if(z+AF>AD){z=AD-AF
}J.log("rowIdToForceVisible -- scrollTop: "+z);
AE.newScrollTop=z?z:1
}if(AE.newScrollTop){AA.scrollTop=AE.newScrollTop
}if(!x&&(AE.newScrollTop||AE.rowIdToForceVisible)){setTimeout(function(){N.tryScrollSet(AE,true)
},1)
}else{AE.newScrollTop=AE.rowIdToForceVisible=null
}},avgRowHeight:function(y){var w=y.bodyTable.offsetHeight;
var x=y.bodyTable.rows.length;
if(y.topRow){w-=y.topRow.offsetHeight;
x--
}if(y.bottomRow){w-=y.bottomRow.offsetHeight;
x--
}return(x>0)?w/x:0
},fixSpacerRow:function(AA,AB,AE,z,w){if(w>0){var AC=null;
if(!AE){AC=AE=document.createElement("TR");
var x=this.firstRealRow(AA);
AC.className=x?x.className:"tableRow1";
AE.setAttribute("dr","1");
var y=document.createElement("TD");
y.className="rowLines";
y.innerHTML="&nbsp";
AE.appendChild(y);
y.colSpan=AB.rows[0].childNodes.length
}else{if((z&&(AB.tBodies[0].childNodes[1]!=AE))||(!z&&(AB.tBodies[0].lastChild!=AE))){AC=AE;
AB.tBodies[0].removeChild(AE)
}}if(AC){if(z&&AB.rows.length>1){AB.tBodies[0].insertBefore(AC,AB.rows[1])
}else{AB.tBodies[0].appendChild(AC)
}}var AD=(w>0)?(w*S):0;
AE.firstChild.style.height=AD+"px"
}else{if(AE){AB.tBodies[0].removeChild(AE)
}AE=null
}return AE
},setupScrollFaulting:function(AA){J.log("****** awtSetupScrollFaulting --- topCount: "+AA.topCount+", topIndex: "+AA.topIndexId+" = "+l.elementIntValue(AA.topIndexId));
AA.topRow=this.fixSpacerRow(AA,AA.bodyTable,AA.topRow,true,AA.topCount);
AA.bottomRow=this.fixSpacerRow(AA,AA.bodyTable,AA.bottomRow,false,AA.bottomCount);
if(AA.continueScroll){AA.continueScroll=null;
o=AA;
return 
}if(AA.rowIdToForceVisible){return 
}if(!AA.repositionScroll){return 
}AA.repositionScroll=false;
var z=l.elementIntValue(AA.topIndexId);
var y=l.elementIntValue(AA.topOffsetId);
if(z==0&&y==0&&AA.body.scrollTop==0){return 
}var x=this.posOfRow(AA,z)-y;
var w=null;
if(AA.bottomIndex){w=this.posOfRow(AA,AA.bottomIndex,true)-AA.bottomOffset
}if(AA.scrollType&&(AA.scrollType=="up"||AA.scrollType=="bottom")){AA.newScrollTop=w-AA.body.offsetHeight;
J.log("tableInfo.scrollType = "+AA.scrollType+" -- "+AA.body.scrollTop)
}else{AA.newScrollTop=x;
J.log("setting toppos = "+x)
}},checkWindowScrollbar:function(x,w){return l.checkWindowScrollbar(x,w)
},checkWindowScrollbarOnRefresh:function(){this.checkWindowScrollbar(true)
},handleVerticalScroll:function(w){if(I||!w.scrollFaultActionId||w.newScrollTop){return 
}if(w.topCount==0&&w.body.scrollTop==0){return 
}if(B){}U=(new Date()).getTime();
if(!G){G=setTimeout(function(){N.checkScrollFault(w)
},K)
}},checkScrollFault:function(x){G=null;
var w=(new Date()).getTime()-U;
if(w<K){J.log("Premature firing! "+w+" -- rescheduling");
G=setTimeout(function(){N.checkScrollFault(x)
},K-w);
return 
}if(B){J.log("continue scroll");
x.continueScroll=this.calculateScrollFault(x);
this.scrollShowPanel(x);
return 
}J.log("awtCheckScrollFault!!");
this.processScrollFault(x)
},processScrollFault:function(x){if(I||B){return 
}var w=this.calculateScrollFault(x);
J.log("Datatable.ProcessScrollFault() -- processing... TopRow: "+w[Y]+", pos="+x.body.scrollTop);
l.setElementValue(x.topIndexId,w[Y]);
l.setElementValue(x.topOffsetId,w[s]);
l.setElementValue(x.leftPosId,x.body.scrollLeft);
delete x.scrollType;
if(w[W]!=0){if(B){return 
}x.bottomIndex=w[M];
x.bottomOffset=w[c];
x.scrollType=w[k];
x.repositionScroll=true;
this.scrollFaultAction(x)
}else{this.scrollHidePanel()
}},scrollFaultAction:function(x){B=true;
var w=l.getElementById(x.topIndexId).form;
this.scrollShowPanel(x);
p.setShowWaitCursorDisabled(true);
g.registerUpdateCompleteCallback(function(){if(B){J.log("--> SCROLL FAULT UPDATE COMPLETE");
B=false;
this.scrollHidePanel();
setTimeout(function(){x=this.infoForTable(x.bodyTable.id);
this.handleVerticalScroll(x)
}.bind(this),10)
}}.bind(this));
v.senderClicked(x.scrollFaultActionId,w.id,null,null,null,null)
},firstRealRow:function(y){var x=y.bodyTable.rows;
var w=(y.topRow)?2:1;
return(w<x.length)?x[w]:null
},lastRealRow:function(y){var x=y.bodyTable.rows;
var z=x.length-1;
var w=(y.bottomRow)?z-1:z;
return(w>0)?x[w]:null
},calculateScrollFault:function(w){var AQ=new Array(P);
var AI=w.body;
var AB=AI.scrollTop;
var AG=w.bodyTable.rows;
var AN=AI.offsetHeight;
var AM;
var AH=0,y=-1,AJ,AE=-1,z;
var AC=AG.length-1;
for(AM=0;
AM<=AC;
AM++){var AF=AG[AM];
if(AF.getAttribute("dr")=="1"){AH++;
var x=AF.offsetTop-AB;
while(AM+1<=AC&&AG[AM+1].getAttribute("dr")!="1"){AM++
}var AD=AG[AM].offsetTop-AB+AG[AM].offsetHeight;
if(y==-1&&((x>=0)||(AD>=0))){y=AH;
AJ=x
}if(AE==-1&&((AD>=AN)||(AM==AC))){AE=AH;
z=x-AN
}}}var AO=false;
var AK=false;
var AL=(w.topRow)?2:1;
var AA=w.topCount;
if(w.topRow&&(y<=1)){AO=true;
AQ[k]="up";
if(y==1){if(AJ>0){y=0
}else{y=Math.floor(-1*AJ/S);
AJ+=(y*S);
AO=true
}}if(w.topRow&&AE<=1){AQ[k]="top"
}else{AE+=AA-AL
}}else{if(w.bottomRow&&(y==AH)){AQ[k]="bottom";
var AP=Math.floor(-1*AJ/S);
y=AA+AH-AL+AP;
AJ+=(AP*S);
AK=true;
AP=Math.floor(-1*z/S);
AE=AA+AH-AL+AP;
z+=(AP*S)
}else{if(y!=0){y+=(AA-AL)
}}}if(w.bottomRow&&(AE==AH)){AK=true;
if(AQ[k]!="bottom"){AQ[k]="down";
AE=null;
z=0
}}AQ[Y]=y;
AQ[s]=AJ;
AQ[M]=AE;
AQ[c]=z;
AQ[W]=AO?-1:(AK?1:0);
return AQ
},posOfRow:function(AB,y,w){var AA=AB.topCount;
if(y<AA){return(y*S)
}else{y=y-AA+(AB.topRow?2:1);
var z=AB.bodyTable.rows;
var x;
for(x=0;
x<z.length;
x++){var AC=z[x];
if(AC.getAttribute("dr")=="1"){y--
}if(y<=0){return AC.offsetTop
}}if(w){var AC=z[z.length-1];
return AC.offsetTop+AC.offsetHeight
}else{return z[z.length-1].offsetTop+((y-1)*S)
}}},scrollShowPanel:function(w){p.disableInput(false);
var x=w.body,z=x.scrollLeft,y=x.scrollTop;
C=setTimeout(function(){C=null;
X.showPanel("awtFaultingPanel",w.body,true);
if(z||y){x.scrollLeft=z;
x.scrollTop=y
}}.bind(this),2000)
},scrollHidePanel:function(){if(C){clearTimeout(C)
}C=null;
X.hidePanel("awtFaultingPanel");
p.enableInput()
},rowSibling:function(x,w){do{x=(w>0)?x.nextSibling:x.previousSibling
}while(x&&x.tagName!="TR");
return x
},addRowStyle:function(x,y,w){do{if(y.className&&y.className.indexOf(x)==-1){y.className=x+y.className
}y=this.rowSibling(y,1)
}while(y&&!this.isPrimaryRow(y)&&!w)
},removeRowStyle:function(w,x){do{this.removeClassPrefix(x,w);
x=this.rowSibling(x,1)
}while(x&&!this.isPrimaryRow(x))
},removeClassPrefix:function(y,x){var w=y.className;
if(w&&w.substring(0,x.length)==x){y.className=w.substring(x.length,w.length)
}},isPrimaryRow:function(x){var w=x.getAttribute("_AWTIsPrimaryRow");
if(w){return w=="1"
}if(x.getAttribute("dr")=="1"){x.setAttribute("_AWTIsPrimaryRow","1")
}else{if((x.cells&&x.cells.length>0&&x.className&&x.className.indexOf("firstRow")==-1)||this.rowSelectElement(x)){x.setAttribute("_AWTIsPrimaryRow","1")
}else{x.setAttribute("_AWTIsPrimaryRow","1");
var y=this.rowSibling(x,-1);
if(!((y&&y.cells&&y.cells.length>0&&y.cells[0].nodeName=="TH")||(y&&y.className&&y.className.indexOf("AWTColAlignRow")!=-1))){x.setAttribute("_AWTIsPrimaryRow","0")
}}}return x.getAttribute("_AWTIsPrimaryRow")=="1"
},rowForChild:function(y,x){var z=l.findParentUsingPredicate(y,function(AA){return AA.nodeName=="TR"&&AA.parentNode.parentNode.className=="tableBody"
},x);
var w;
while(z&&!this.isPrimaryRow(z)&&(w=this.rowSibling(z,-1))){z=w
}return z
},tableInfoForRow:function(x){var w=l.findParentUsingPredicate(x,function(y){return y.nodeName=="TABLE"&&y.className.indexOf("tableBody")!=-1
});
return this.infoForTable(w.id)
},mouseOverEventHandler:function(w){var w=(w)?w:event;
var y=(w.target)?w.target:w.srcElement;
var x=this.rowForChild(y);
if(x){if(!this.isRowSelected(x)){if(!n.getDiv()){this.addRowStyle(V,x)
}}}},mouseOutEventHandler:function(w){w=(w)?w:event;
var y=(w.target)?w.target:w.srcElement;
var x=this.rowForChild(y);
if(x){if(n.getDiv()){this.removeRowStyle(f,x)
}else{this.removeRowStyle(V,x)
}}},rowClickedEventHandler:function(AH){AH=(AH)?AH:event;
var AG=(AH.target)?AH.target:AH.srcElement;
var AE=false;
var AJ=this.rowForChild(AG,true);
if(AJ&&Q){var AI=this.tableInfoForRow(AJ);
var AF=AI.bodyTable;
var y=this.isRowSelected(AJ);
var AC=this.rowSelectElement(AJ);
if(AI.disableRowSelection||L||AG.tagName=="TEXTAREA"){L=false;
AE=false
}else{if(this.isSelectElement(AG)||(H&&H.nodeName=="INPUT"&&AG.tagName=="INPUT")){var x=H?this.isSelectElement(H):true;
this.setRowSelect(AJ,y,x,AI);
this.updateSelectAll(AI);
AE=false
}else{if(AG.tagName=="A"){AE=false
}else{if(AC&&!AC.disabled){var z=AC&&l.isVisible(AC);
var AD=l.findRowIndex(AJ.id,AF);
var w=this.isMultiSelect(AJ);
var AB=false;
if(w){if(AH.shiftKey){this.clearSelection(AI);
if(AI.lastSelectionIndex!=-1){this.setSelection(AF,AI.lastSelectionIndex,AD,AI);
AB=true
}else{AI.lastSelectionIndex=AD
}}else{var AA=false;
if(!AH.ctrlKey&&!z){if(y&&this.selectionCount(AI)[1]==1){AA=true
}else{this.clearSelection(AI)
}}if(!AA){this.setRowSelect(AJ,!y,false,AI);
this.updateSelectAll(AI);
AI.lastSelectionIndex=AD;
AB=true
}}}else{if(!y){this.clearSelection(AI);
this.setRowSelect(AJ,true,false,AI);
AI.lastSelectionIndex=AD;
AB=true
}}if(AB){if(AC){g.elementInvoke(AC,"click")
}}AE=true
}}}}}this.clearMouseDown();
if(AE){g.cancelBubble(AH)
}return !AE
},clearSelection:function(y){var x=y.bodyTable.rows;
for(var w=0;
w<x.length;
w++){this.setRowSelect(x[w],false,false,y)
}this.updateSelectAll(y)
},setSelection:function(z,AC,w,AB){var AA=z.rows;
if(AC>w){var y=w;
w=AC;
AC=y
}for(var x=AC;
x<=w;
x++){if(this.isPrimaryRow(AA[x])){this.setRowSelect(AA[x],true,false,AB)
}}this.updateSelectAll(AB)
},updateRowSelectColor:function(w,x){if(x){this.addRowStyle(a,w)
}else{this.removeRowStyle(a,w);
this.removeRowStyle(V,w)
}},selectionCount:function(AB){var AA=AB.bodyTable.rows;
var z=this.selectAllForTable(AB);
var y=0,x=0;
for(var w=0;
w<AA.length;
w++){if(AA[w].cells){var AC=this.rowSelectElement(AA[w]);
if(AC&&AC!=z){y++;
if(AC.checked){x++
}}}}return[y,x]
},updateSelectAll:function(y){var x=this.selectAllForTable(y);
if(x&&!x.checked){var w=this.selectionCount(y);
if(w[0]>0&&w[0]==w[1]){if(y.topRow||y.bottomRow){v.senderClicked(y.updateSelectAllActionId,x.form.id,null,null,null,null)
}else{x.checked=true
}}}},selectAllForTable:function(x){var w;
if(x.headTable){w=this.rowSelectElement(x.headTable.rows[1],true)
}if(!w){w=this.rowSelectElement(x.bodyTable.rows[0],true)
}return w
},updateSelections:function(w){var x=this.infoForTable(w);
return this._updateSelections(x)
},_updateSelections:function(z){J.log("_awtUpdateSelections");
if(!z.disableRowSelection){var w=z.bodyTable;
for(var y=0;
y<w.rows.length;
y++){var AA=w.rows[y];
if(this.isPrimaryRow(AA)){var x=this.isRowSelected(AA,true);
this.updateRowSelectColor(AA,x)
}}}},setRowSelect:function(AA,AC,z,y){var AB=this.rowSelectElement(AA);
if(AB&&AB.disabled){if(z){AB.checked=AC;
this.updateRowSelectColor(AA,AC)
}return 
}var w=(AB&&AB.tagName=="INPUT"&&AB.type=="checkbox");
if(!w){if(!y){y=this.tableInfoForRow(AA)
}if(y){if(y.lastSelectedRow){this.updateRowSelectColor(y.lastSelectedRow,false)
}y.lastSelectedRow=AA
}}else{var x=this.selectAllForTable(y);
if(!AC&&x&&x.checked){x.checked=false
}}if(AB&&(AB.checked!=AC||z)){AB.checked=AC;
this.updateRowSelectColor(AA,AC)
}},isSelectElement:function(w){return w.tagName=="INPUT"&&(w.type=="checkbox"||w.type=="radio")
},rowSelectElement:function(z,x){if(x){z._AWTSelectElement=null
}if(z._AWTSelectElement){return(z._AWTSelectElement!=O)?z._AWTSelectElement:null
}var w=null;
var y=z.cells?z.cells[h]:null;
if(y&&y.childNodes){w=l.findChildUsingPredicate(y,this.isSelectElement.bind(this))
}z._AWTSelectElement=(w!=null)?w:O;
return w
},isRowSelected:function(x,w){var y=this.rowSelectElement(x,w);
return y?y.checked:false
},isMultiSelect:function(w){var x=this.rowSelectElement(w);
if(x){if(x.tagName=="INPUT"&&x.type=="checkbox"){return true
}}return false
},mouseDownEvtHandler:function(AB){if(n.shouldHandleMouseDown(AB)){return false
}var z=false;
AB=(AB)?AB:event;
var AA=(AB.target)?AB.target:AB.srcElement;
Q=true;
H=AA;
L=false;
if((AA.tagName=="INPUT"||AA.tagName=="TEXTAREA")&&AA.className.indexOf(b)==-1){if(z){g.cancelBubble(AB)
}return !z
}var AE=this.rowForChild(AA);
if(AE){var AD=this.tableInfoForRow(AE);
if(AD.isDraggable&&AE.className&&AE.className.indexOf(e)!=-1){var x=AE.id;
if(!D.isNullOrUndefined(x)&&x!=""){var AC=n.createDragDiv(AB,AE,e);
if(!AC){this.removeRowStyle(f,AE)
}else{AC.style.border="1px #333333 solid";
AC.style.width=AE.scrollWidth;
var y=AE.parentNode.parentNode.cloneNode(false);
var w=document.createElement("tbody");
w.appendChild(AE.cloneNode(true));
y.appendChild(w);
AC.appendChild(y);
AC.droppable=function(AF){if(AF){AC.style.border="1px #333333 solid"
}else{AC.style.border="1px red solid"
}};
AC.nextSrcId=AA.parentNode.nextSibling?AA.parentNode.nextSibling.id:null
}z=true
}}}if(z){g.cancelBubble(AB)
}return !z
},mouseUpEvtHandler:function(w){var z=false;
w=(w)?w:event;
var y=(w.target)?w.target:w.srcElement;
var AB;
var AA=n.getDiv();
if(AA&&(AB=this.rowForChild(y))){var x=AB.id;
if(AA.srcId==x){if(n.dragActive()){z=true
}this.removeClassPrefix(l.getElementById(AA.srcId),V);
n.releaseDragDiv()
}else{if(AA.srcId!=x&&AA.nextSrcId!=x){this.removeRowStyle(f,AB);
z=n.handleDropAction(AB,w,r)
}}if(z){this.clearMouseDown()
}}if(z){g.cancelBubble(w)
}return !z
},clearMouseDown:function(){Q=false;
H=null
},mouseMoveEvtHandler:function(w){w=(w)?w:event;
var AA=(w.target)?w.target:w.srcElement;
var z=false;
var AC=n.getDiv();
if(AC&&n.dragDivMoved(w)){var AB=n.findDropContainer(AA,r);
if(AB&&n.isDropContainerValid(AB,r)){AC.droppable(true);
AC.style.left=(w.clientX+document.body.scrollLeft+1)+"px";
AC.style.top=(w.clientY+l.getPageScrollTop()+1)+"px";
var y=this.rowForChild(AA);
if(y){if(!this.isRowSelected(y)){var x=y.id;
if(x!=AC.srcId&&x!=AC.nextSrcId){this.addRowStyle(f,y,true)
}}}z=true
}}if(z){g.cancelBubble(w)
}return !z
},selectStartEvtHandler:function(w){w=(w)?w:event;
var y=(w.target)?w.target:w.srcElement;
var x=!!(n.getDiv()||w.shiftKey||w.ctrlKey);
L=!x;
if(x){g.cancelBubble(w)
}return !x
},showMouseDragIcon:function(){if(!m){m=l.getElementById("AWDragImage")
}m.style.visibility="visible"
},updateMouseDragIcon:function(z){var w=z.clientX+document.body.scrollLeft;
var AA=z.clientY+l.getPageScrollTop();
m.style.left=w+10;
m.style.top=AA+10
},hideMouseDragIcon:function(){if(m){m.style.top=0;
m.style.left=0;
m.style.visibility="hidden"
}},EOF:0};
g.registerRefreshCallback(function(){g.eventEnqueue(N.checkWindowScrollbarOnRefresh.bind(N))
});
g.registerOnWindowResize(N.checkWindowScrollbarOnRefresh.bind(N));
return N
}();
ariba.Calendar=function(){var D=ariba.Util;
var E=ariba.Menu;
var Q=ariba.Handlers;
var X=ariba.Event;
var S=ariba.Request;
var A=ariba.Dom;
if(typeof AWPreviousYearTitle=="undefined"){AWPreviousYearTitle="Need to localize AWPreviousYearTitle in dateformat.js under ariba/resource/en_US/widg/"
}if(typeof AWPreviousMonthTitle=="undefined"){AWPreviousMonthTitle="Need to localize AWPreviousMonthTitle in dateformat.js under ariba/resource/en_US/widg/"
}if(typeof AWNextMonthTitle=="undefined"){AWNextMonthTitle="Need to localize AWNextMonthTitle in dateformat.js under ariba/resource/en_US/widg/"
}if(typeof AWNextYearTitle=="undefined"){AWNextYearTitle="Need to localize AWNextYearTitle in dateformat.js under ariba/resource/en_US/widg/"
}var O="today";
var M="selectedDay";
var I="calendar_focus";
var N="calendar_disabled";
var W="calendarPreviousYear";
var K="calendarPreviousMonth";
var J="calendarNextMonth";
var G="calendarNextYear";
var R="awcaly";
var U="awcalm";
var T="awcald";
var C=/\{AWShortMonth\}/;
var F=/\{AWMonth\}/;
var P=/\{AWShortYear\}/;
var B=/\{AWYear\}/;
var V="yMEdhHKkmsSazFDwG";
var H="0123456789";
var L={Control:function(Y,b,Z,e,a){this.getTable=function(){if(!this._reuse){return A.getElementById(this._containerId)
}else{if(!this._calTable){var f=A.getElementById("calendar_menu");
this._calTable=A.findChild(f,"TABLE",false)
}}return this._calTable
};
this._reuse=e;
this._dateTextFieldId=a;
this._containerId=Y;
if(e){var c=A.getElementById(this._containerId);
c._awcalendar=this
}else{this.getTable()._awcalendar=this
}this._calendarDate=null;
this._selectedDate=b;
this.prepCalendar=function(f){this._enabledDays=[true,true,true,true,true,true,true];
if(f.length==0){return 
}var g=f.split(",");
for(i=0;
i<g.length;
i++){if(g[i]=="-*"){for(j=0;
j<7;
j++){this._enabledDays[j]=false
}continue
}var h=Math.abs(g[i]);
if(h>0&&h<8){this._enabledDays[h-1]=g[i]>0
}}};
this.prepCalendar(Z);
this.setCalendarDate=function(f){var g=f.getFullYear();
var h=f.getMonth();
this._calendarDate=new Date(g,(h+1),0)
};
this.showDay=function(f){return this._enabledDays[f]
};
this.renderMonthYear=function(){var f=this.getTable().tBodies[0];
var h=f.rows[0];
var g=h.cells[2];
A.setInnerText(g,L.formatMonthYear(AWCalendarLabelPattern,this._calendarDate));
this.renderNavigationTitle(h,W,AWPreviousYearTitle);
this.renderNavigationTitle(h,K,AWPreviousMonthTitle);
this.renderNavigationTitle(h,J,AWNextMonthTitle);
this.renderNavigationTitle(h,G,AWNextYearTitle)
};
this.renderNavigationTitle=function(h,f,g){var k=A.findChildUsingPredicate(h,function(l){return l.tagName=="IMG"&&l.className==f
});
if(k){k.alt=g;
k.title=g
}};
this.renderDayNames=function(){var h=this.getTable().tBodies[1];
var l=h.rows;
var g=A.getRowCells(l[0]);
for(var k=0;
k<g.length;
k++){var f=k+AWDayOfWeekStart;
if(f>6){f-=7
}g[k].innerHTML=AWShortWeekdayNames[f]
}};
this.renderDays=function(){var q=this._selectedDate.getDate();
var AA=this._selectedDate.getMonth();
var x=this._selectedDate.getFullYear();
var l=this._calendarDate.getMonth();
var t=this._calendarDate.getFullYear();
var AB=new Date();
var k=AB.getFullYear();
var y=AB.getMonth();
var w=AB.getDate();
var g=this._calendarDate.getDate();
var n=this._calendarDate.getDay();
var z=n-(g%7)+1-AWDayOfWeekStart;
if(0>z){z+=7
}var s=1-z;
var f=this.getTable().tBodies[2];
var u=f.rows;
for(var v=0;
6>v;
v++){var o=u[v];
var m=o.cells;
for(var r=0;
7>r;
r++){var h=m[r];
A.setInnerText(h,"");
if(s>0&&s<=g){if(this.showDay(r)){var p=document.createElement("A");
p.href="#";
h.appendChild(p);
A.setInnerText(p,s)
}else{A.setInnerText(h,s)
}}if(s==w&&l==y&&t==k){A.addClass(h,O)
}else{A.removeClass(h,O);
A.removeClass(h,O)
}if(!this.showDay(r)){A.addClass(h,N)
}else{A.removeClass(h,N);
A.removeClass(h,N)
}if((q==s)&&(AA==l)&&(x==t)){A.addClass(h,M)
}else{A.removeClass(h,M);
A.removeClass(h,M);
A.removeClass(h,I);
A.removeClass(h,I)
}s+=1
}}};
this.renderCalendar=function(f){this.setCalendarDate(f);
this.getTable()._awcalendar=this;
this.renderMonthYear();
this.renderDayNames();
this.renderDays()
};
this.incrementMonth=function(f){var g=this._calendarDate;
g=new Date(g.getFullYear(),g.getMonth()+f,1);
this.renderCalendar(g)
};
if(!this._reuse){this.renderCalendar(this._selectedDate)
}},calMouseOver:function(a){a=a?a:event;
var Z=X.eventSourceElement(a);
if(Z.tagName=="A"&&A.getInnerText(Z)!=""){var Y=A.findParent(Z,"TD",true);
A.addClass(Y,I)
}},calMouseOut:function(a){a=a?a:event;
var Z=X.eventSourceElement(a);
if(Z.tagName=="A"){var Y=A.findParent(Z,"TD",true);
A.removeClass(Y,I)
}},calMouseDown:function(e){e=e?e:event;
var g=X.eventSourceElement(e);
var Y=A.getInnerText(g);
if(g.tagName=="A"&&Y!=""){var l=A.findParent(g,"TABLE",true);
var b=l._awcalendar;
var Z=b._calendarDate;
var k=l.id;
var c=l;
if(l._awcalendar._reuse){k=l._awcalendar._containerId;
c=A.getElementById(k)
}var h=A.lookupFormId(c);
var m=A.getElementById(h);
if(m!=null){var f=A.addFormField(m,R,Z.getFullYear());
A.addFormField(m,U,Z.getMonth());
A.addFormField(m,T,Y);
S.submitFormForElementName(h,k);
if(A.IsIE){f.removeNode()
}else{m.removeChild(f)
}}else{var a=S.formatUrl(k);
a=a+"&"+R+"="+Z.getFullYear()+"&"+U+"="+Z.getMonth()+"&"+T+"="+Y;
S.setDocumentLocation(a,null)
}}},CalendarForElement:function(Y){var Z=A.findParent(Y,"TABLE",true);
return Z._awcalendar
},previousMonthClicked:function(a,Y){var Z=this.CalendarForElement(Y);
Z.incrementMonth(-1);
a=a?a:event;
X.cancelBubble(a)
},nextMonthClicked:function(a,Y){var Z=this.CalendarForElement(Y);
Z.incrementMonth(1);
a=a?a:event;
X.cancelBubble(a)
},previousYearClicked:function(a,Y){var Z=this.CalendarForElement(Y);
Z.incrementMonth(-12);
a=a?a:event;
X.cancelBubble(a)
},nextYearClicked:function(a,Y){var Z=this.CalendarForElement(Y);
Z.incrementMonth(12);
a=a?a:event;
X.cancelBubble(a)
},dateFieldOnClick:function(h,b){var f=A.findParent(h,"NOBR",false);
var a=A.findChild(f,"INPUT",false);
var c=a.getAttribute("awdidChange");
var e=h.getAttribute("awmenuId");
var Z=A.getElementById(e);
if(c=="1"){var g=a.form.id;
var Y=a.name;
Q.textFieldRefresh(g,Y)
}else{if(h._awcalendar){this.showCalendar(h.id)
}}return false
},timeFieldOnClick:function(c,f){var Y=A.findParent(c,"NOBR",false);
var a=A.findChild(Y,"INPUT",false);
var Z=a.getAttribute("awdidChange");
var g=c.getAttribute("awmenuId");
E.menuLinkOnClick(c,g,null,f);
if(Z=="1"){var e=a.form.id;
var b=a.name;
Q.textFieldRefresh(e,b)
}return false
},dateTextChanged:function(Y){Y.setAttribute("awdidChange","1")
},timeTextChanged:function(Y){Y.setAttribute("awdidChange","1")
},dateFieldMouseDown:function(Z){Z.hideActiveMenu=true;
var Y=X.eventSourceElement(Z);
var c=A.getInnerText(Y);
var b=A.findParent(Y,"TABLE",false);
var a=A.getElementById(b._awcalendar._dateTextFieldId);
if(Y.tagName=="A"&&c!=""){a.value=""
}return this.calMouseDown(Z)
},showCalendar:function(Z){var Y=A.getElementById(Z);
var a=Y.getAttribute("awmenuId");
E.hideActiveMenu();
if(Y._awcalendar){Y._awcalendar.renderCalendar(Y._awcalendar._selectedDate);
E.menuLinkOnClick(Y,a,null,null)
}},onTimeChange:function(f,e){if(E.AWActiveMenu==null){return 
}var Z=E.AWActiveMenu.id;
E.hideActiveMenu();
var c=f.name;
var b=A.lookupFormId(f);
var a=A.getElementById(b);
if(a!=null){var Y=A.addFormField(a,"awtimeChooserSelected",Z);
S.submitFormForElementName(b,c);
if(A.IsIE){Y.removeNode()
}else{a.removeChild(Y)
}}},computeDaysInMonth:function(Z){var Y=new Date(Z.getFullYear(),Z.getMonth(),Z.getDate());
Y.setDate(32);
return 32-Y.getDate()
},getMonthName:function(Y){var Z=Y.getMonth();
return AWMonthNames[Z]
},formatMonthYear:function(Z,a){var c=a.getMonth();
var Y=new String(a.getFullYear());
var b=Z.replace(C,AWShortMonthNames[c]);
b=b.replace(F,AWMonthNames[c]);
b=b.replace(P,Y.substr(2));
b=b.replace(B,Y);
return b
},parseDateWithPattern:function(Z,a){var Y=this.parseDateFormatPattern(a);
this.parseDateWithPatternArray(Z,Y)
},parseDateWithPatternArray:function(l,a){if(l.length==0){return new Date()
}var h=-1;
var e=-1;
var g=-1;
var b=0;
for(var Z=0;
Z<a.length;
Z++){var f=a[Z];
var n=f.length;
var q=f.charAt(0);
if(V.indexOf(q)==-1){b=l.indexOf(f,b);
b+=n
}else{if(q=="y"){var c=l.substr(b,n);
g=D.parseInt(c);
if(n==2){g+=2000
}b+=n
}else{if(q=="M"){if(n==3){var o=l.substr(b,n);
e=this.lookupShortMonthNameIndex(o);
b+=n
}else{if(n==2){var m=l.substr(b,n);
e=D.parseInt(m);
b+=n
}else{if(n==1){var k=D.indexOfCharNotInSet(l,b+1,H);
if(k==-1){k=l.length
}if((k-b)>2){k=b+2
}var m=l.substring(b,k);
e=D.parseInt(m);
b+=m.length
}}}}else{if(q=="d"){if(n==2){var p=l.substr(b,n);
h=D.parseInt(p);
b+=n
}else{if(n==1){var k=D.indexOfCharNotInSet(l,b+1,H);
if(k==-1){k=l.length
}if((k-b)>2){k=b+2
}var p=l.substring(b,k);
h=D.parseInt(p);
b+=p.length
}}}}}}}var Y=new Date();
if(g==-1){g=Y.getFullYear()
}if(e==-1){e=Y.getMonth()
}if(h==-1){h=Y.getDate()
}return new Date(g,e-1,h)
},parseDateFormatPattern:function(f){var Y=new Array();
var e=null;
for(var Z=0;
Z<f.length;
){var b=f.charAt(Z);
if(V.indexOf(b)!=-1){var c=D.indexOfNotChar(f,Z+1,b);
if(c==-1){c=f.length
}e=f.substring(Z,c)
}else{var a=D.indexOfCharInSet(f,Z+1,V);
if(a==-1){a=f.length
}e=f.substring(Z,a)
}Y[Y.length]=e;
Z+=e.length
}return Y
},lookupShortMonthNameIndex:function(Z){for(var Y=0;
Y<AWShortMonthNames.length;
Y++){if(Z==AWShortMonthNames[Y]){return Y+1
}}return -1
},formatDate:function(a,g){if(null==g){return""
}var b=new String();
var c=new Boolean(false);
var h="";
var f=0;
var Z=1;
for(var e=0;
e<g.length;
e++){var Y=g.charAt(e);
if(true==c){if(Y=="'"){c=false;
if(0==f){b=b+Y
}else{f=0
}Z=0
}else{b=b+Y;
f++
}}else{if("'"==Y){c=true;
if(f>0){b=b+this.subFormat(h,f,a);
f=0;
h=""
}if(0==Z){b=b+Y;
f=1
}}else{if((Y>="a"&&Y<="z")||(Y>="A"&&Y<="Z")){if(Y!=h&&f>0){b=b+this.subFormat(h,f,a);
h=Y;
f=1
}else{if(Y!=h){h=Y
}f++
}}else{if(f>0){b=b+this.subFormat(h,f,a);
b=b+Y;
h="";
f=0
}else{b=b+Y
}}}Z++
}}if(f>0){b=b+this.subFormat(h,f,a)
}return b
},subFormat:function(a,b,Z){var c="";
switch(a){case"y":if(b>=4){c=Z.getFullYear()
}else{c=Z.getYear()
}break;
case"M":if(b>=4){c=AWMonthNames[Z.getMonth()]
}else{if(b==3){c=AWShortMonthNames[Z.getMonth()]
}else{c=Z.getMonth()+1;
if(b>1){if(c<10){c="0"+c
}}}}break;
case"E":if(b>=4){c=AWWeekdayNames[Z.getDay()]
}else{c=AWShortWeekdayNames[Z.getDay()]
}break;
case"K":case"h":c=d.getHours();
if(c>12){c-=12
}if(b>1){if(c<10){c="0"+c
}}break;
case"k":case"H":c=Z.getHours();
if(b>1){if(c<10){c="0"+c
}}break;
case"d":c=Z.getDate();
if(b>1){if(c<10){c="0"+c
}}break;
case"m":c=Z.getMinutes();
if(b>1){if(c<10){c="0"+c
}}break;
case"s":c=Z.getSeconds();
if(b>1){if(c<10){c="0"+c
}}break;
case"a":var Y=Z.getHours();
if(Y<12){c=AWAMString
}else{c=AWPMString
}break;
default:break
}return c
},dateFieldClicked:function(Z,c,a){var Y=A.getElementById(a);
var b=null;
if(c!=null&&c.length>0){b=this.formatDate(Z,c)
}else{b=Z.toString()
}Y.value=b
},dateFieldInit:function(Z,b){var Y=A.getElementById(Z);
var a=D.strTrim(Y.value);
return this.parseDate(a,b)
},EOF:0};
if(A.isIPad){D.extend(L,function(){return{showCalendar:function(Z){var Y=A.getElementById(Z);
var a=Y.getAttribute("awmenuId");
if(Y._awcalendar){Y._awcalendar.renderCalendar(Y._awcalendar._selectedDate);
E.menuLinkOnClick(Y,a,null,null)
}},EOF:0}
}())
}X.registerBehaviors({CPY:{mousedown:function(Z,Y){return X.cancelBubble(Y)
},mouseup:function(Z,Y){return L.previousYearClicked(Y,Z)
}},CPM:{mousedown:function(Z,Y){return X.cancelBubble(Y)
},mouseup:function(Z,Y){return L.previousMonthClicked(Y,Z)
}},CNM:{mousedown:function(Z,Y){return X.cancelBubble(Y)
},mouseup:function(Z,Y){return L.nextMonthClicked(Y,Z)
}},CNY:{mousedown:function(Z,Y){return X.cancelBubble(Y)
},mouseup:function(Z,Y){return L.nextYearClicked(Y,Z)
}},CB:{mouseover:function(Z,Y){return L.calMouseOver(Y)
},mouseout:function(Z,Y){return L.calMouseOut(Y)
},mousedown:function(Z,Y){return L.calMouseDown(Y)
}}});
ariba.Event.registerBehaviors({DFB:{prototype:X.behaviors.CB,mousedown:function(Z,Y){return L.dateFieldMouseDown(Y)
}}});
return L
}();