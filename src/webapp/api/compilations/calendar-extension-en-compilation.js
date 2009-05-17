﻿

/* compile-prolog.js */
window.Exhibit_CalendarExtension_isCompiled=true;


/* calendar-extension.js */
(function(){var F=("Exhibit_CalendarExtension_isCompiled" in window)&&window.Exhibit_CalendarExtension_isCompiled;
Exhibit.CalendarExtension={params:{bundle:false}};
var G=["date-picker-facet.js","date-picker.js","date-util.js","calendar-view.js"];
var B=["date-picker-facet.css","calendar-view.css"];
var E={bundle:Boolean};
if(typeof Exhibit_CalendarExtension_urlPrefix=="string"){Exhibit.CalendarExtension.urlPrefix=Exhibit_CalendarExtension_urlPrefix;
if("Exhibit_CalendarExtension_parameters" in window){SimileAjax.parseURLParameters(Exhibit_CalendarExtension_parameters,Exhibit.CalendarExtension.params,E);
}}else{var D=SimileAjax.findScript(document,"/calendar-extension.js");
if(D==null){SimileAjax.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Calendar Extension code files"));
return ;
}Exhibit.CalendarExtension.urlPrefix=D.substr(0,D.indexOf("calendar-extension.js"));
SimileAjax.parseURLParameters(D,Exhibit.CalendarExtension.params,E);
}var A=[];
var C=[];
if(Exhibit.CalendarExtension.params.bundle){A.push(Exhibit.CalendarExtension.urlPrefix+"calendar-extension-bundle.js");
C.push(Exhibit.CalendarExtension.urlPrefix+"calendar-extension-bundle.css");
}else{SimileAjax.prefixURLs(A,Exhibit.CalendarExtension.urlPrefix+"scripts/",G);
SimileAjax.prefixURLs(C,Exhibit.CalendarExtension.urlPrefix+"styles/",B);
}if(!F){SimileAjax.includeJavascriptFiles(document,"",A);
SimileAjax.includeCssFiles(document,"",C);
}})();


/* calendar-extension-bundle.js */
Exhibit.CalendarView=function(E,F){this._div=E;
this._uiContext=F;
this._settings={};
this._accessors={getEventLabel:function(A,B,C){C(B.getObject(A,"label"));
},getProxy:function(A,B,C){C(A);
},getColorKey:null,getIconKey:null};
this._currentDate=new Date();
var D=this;
this._listener={onItemsChanged:function(){D._reconstruct();
}};
F.getCollection().addListener(this._listener);
};
Exhibit.CalendarView._settingSpecs={"showToolbox":{type:"boolean",defaultValue:true}};
Exhibit.CalendarView._accessorSpecs=[{accessorName:"getProxy",attributeName:"proxy"},{accessorName:"getDuration",bindings:[{attributeName:"start",type:"date",bindingName:"start"},{attributeName:"end",type:"date",bindingName:"end",optional:true}]},{accessorName:"getColorKey",type:"text"},{accessorName:"getColorKey",attributeName:"colorKey",type:"text"},{accessorName:"getIconKey",attributeName:"iconKey",type:"text"},{accessorName:"getEventLabel",attributeName:"eventLabel",type:"text"},{accessorName:"getHoverText",attributeName:"hoverText",type:"text"}];
Exhibit.CalendarView.create=function(F,G,H){var E=new Exhibit.CalendarView(G,Exhibit.UIContext.create(F,H));
Exhibit.SettingsUtilities.createAccessors(F,Exhibit.CalendarView._accessorSpecs,E._accessors);
Exhibit.SettingsUtilities.collectSettings(F,Exhibit.CalendarView._settingSpecs,E._settings);
Exhibit.CalendarView._configure(E,F);
E._initializeUI();
return E;
};
Exhibit.CalendarView.createFromDOM=function(H,I,J){var G=Exhibit.getConfigurationFromDOM(H);
var F=new Exhibit.CalendarView(I!=null?I:H,Exhibit.UIContext.createFromDOM(H,J));
Exhibit.SettingsUtilities.createAccessorsFromDOM(H,Exhibit.CalendarView._accessorSpecs,F._accessors);
Exhibit.SettingsUtilities.collectSettingsFromDOM(H,Exhibit.CalendarView._settingSpecs,F._settings);
Exhibit.SettingsUtilities.collectSettings(G,Exhibit.CalendarView._settingSpecs,F._settings);
Exhibit.CalendarView._configure(F,G);
F._initializeUI();
return F;
};
Exhibit.CalendarView._configure=function(D,E){Exhibit.SettingsUtilities.createAccessors(E,Exhibit.CalendarView._accessorSpecs,D._accessors);
Exhibit.SettingsUtilities.collectSettings(E,Exhibit.CalendarView._settingSpecs,D._settings);
var F=D._accessors;
D._getDuration=function(A,B,C){F.getProxy(A,B,function(H){F.getDuration(H,B,C);
});
};
};
Exhibit.CalendarView.prototype.dispose=function(){this._uiContext.getCollection().removeListener(this._listener);
this._div.innerHTML="";
if(this._toolboxWidget){this._toolboxWidget.dispose();
this._toolboxWidget=null;
}this._dom=null;
this._div=null;
this._uiContext=null;
};
Exhibit.CalendarView.prototype._initializeUI=function(){var C=this;
var D={elmt:this._div,className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",field:"bodyDiv"}]};
this._dom=SimileAjax.DOM.createDOMFromTemplate(D);
this._collectionSummaryWidget=Exhibit.CollectionSummaryWidget.create({},this._dom.collectionSummaryDiv,this._uiContext);
if(this._settings.showToolbox){this._toolboxWidget=Exhibit.ToolboxWidget.createFromDOM(this._div,this._div,this._uiContext);
this._toolboxWidget.getGeneratedHTML=function(){return C._dom.bodyDiv.innerHTML;
};
}this._reconstruct();
};
Exhibit.CalendarView.prototype.browse=function(B){if(B!==undefined){this._currentDate=Exhibit.DateUtil.parseDate(B);
}this._reconstruct();
};
Exhibit.CalendarView.prototype._reconstruct=function(){var Q=this._dom.bodyDiv;
Q.innerHTML="";
var T=this;
var Z=this._uiContext.getCollection();
var W=this._uiContext.getDatabase();
var P=this._settings;
var b=this._accessors;
var V=Z.countRestrictedItems();
var U={};
if(V>0){var X=Z.getRestrictedItems();
var d=(this._accessors.getColorKey!=null);
var a=(this._accessors.getIconKey!=null&&this._iconCoder!=null);
var Y=(this._accessors.getHoverText!=null);
var R={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var S={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};
var c=function(A,B,F,D,C){var E;
b.getEventLabel(A,W,function(H){E=H;
return true;
});
var G={itemID:A,start:B.start,end:B.end,label:E,icon:D,color:F,hoverText:C,getProperty:function(H){return W.getObject(this._itemID,H);
},fillInfoBubble:function(H,J,I){T._fillInfoBubble(A,H,J,I);
}};
U[A]=G;
};
X.visit(function(I){var H=[];
T._getDuration(I,W,function(J){if("start" in J){H.push(J);
}});
if(H.length>0){var F=null;
var B=null;
var G=null;
if(d){var A=new Exhibit.Set();
b.getColorKey(I,W,function(J){A.add(J);
});
F=T._colorCoder.translateSet(A,R);
}var B=null;
if(a){var C=new Exhibit.Set();
b.getIconKey(I,W,function(J){C.add(J);
});
B=T._iconCoder.translateSet(C,S);
}if(Y){var E=new Exhibit.Set();
b.getHoverText(I,W,function(J){E.add(J);
});
for(var D in E._hash){G=D;
}}for(var D=0;
D<H.length;
D++){c(I,H[D],F,B,G);
}}});
}this._div.style.display="none";
this.buildCal(Q,U);
this._div.style.display="block";
};
Exhibit.CalendarView.daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
Exhibit.CalendarView.prototype.dateToIndex=function(B){return Exhibit.DateUtil.formatDate(B,"yyyyMMdd");
};
Exhibit.CalendarView.prototype.buildCal=function(AA,n){AA.className="exhibit-calendar";
var o=this;
var u=this._currentDate.getFullYear();
var j=this._currentDate.getMonth()+1;
var k=new Date(u,j-1,1);
k.start_dow=k.getDay()+1;
var l=new Date();
var p=(u==l.getFullYear()&&j==l.getMonth()+1)?l.getDate():0;
Exhibit.CalendarView.daysInMonth[1]=(((k.getFullYear()%100!==0)&&(k.getFullYear()%4===0))||(k.getFullYear()%400===0))?29:28;
base=new Date(u,j-1,1);
var AI=new Date(base.setDate(base.getDate()-1));
base=new Date(u,j-1,1);
var AB=new Date(base.setDate(base.getDate()+Exhibit.CalendarView.daysInMonth[j-1]+1));
var AF=document.createElement("table");
AF.setAttribute("cellpadding",0);
AF.setAttribute("cellspacing",0);
AF.className="exhibit-view-month-header";
var y=document.createElement("tbody");
AF.appendChild(y);
var f=document.createElement("tr");
y.appendChild(f);
var q=document.createElement("td");
q.className="previous-month";
var g=document.createElement("a");
g.innerHTML=Exhibit.DateUtil.MONTH_NAMES[AI.getMonth()+12];
g.setAttribute("href","javascript:void");
q.appendChild(g);
f.appendChild(q);
var x=document.createElement("td");
x.innerHTML=Exhibit.DateUtil.MONTH_NAMES[j-1]+", "+u;
x.className="current-month";
x.setAttribute("allign","center");
x.setAttribute("width","100%");
f.appendChild(x);
var AD=document.createElement("td");
AD.className="next-month";
var v=document.createElement("a");
v.innerHTML=Exhibit.DateUtil.MONTH_NAMES[AB.getMonth()+12];
v.setAttribute("href","javascript:void");
AD.appendChild(v);
f.appendChild(AD);
AA.appendChild(AF);
SimileAjax.WindowManager.registerEvent(g,"click",function(B,C,A){o.browse(Exhibit.DateUtil.formatDate(AI,"y-MM-dd"));
});
SimileAjax.WindowManager.registerEvent(v,"click",function(B,C,A){o.browse(Exhibit.DateUtil.formatDate(AB,"y-MM-dd"));
});
var e=document.createElement("table");
e.setAttribute("cellpadding","0");
e.setAttribute("cellspacing","0");
e.className="exhibit-view-month";
var m=document.createElement("tbody");
e.appendChild(m);
var AH=document.createElement("tr");
AH.setAttribute("align","center");
m.appendChild(AH);
for(s=0;
s<7;
s++){var z=document.createElement("td");
z.innerHTML=Exhibit.DateUtil.DAY_NAMES[s];
z.className="day-header";
z.setAttribute("align","center");
AH.appendChild(z);
}var AC=function(D){var C={};
for(itemID in D){var E=D[itemID];
if(E.end==null){var B=o.dateToIndex(E.start);
if(C[B]==undefined){C[B]=[itemID];
}else{C[B].push(itemID);
}}else{var A=new Date(E.start.getFullYear(),E.start.getMonth(),E.start.getDate());
var F=new Date(E.end.getFullYear(),E.start.getMonth(),E.start.getDate());
for(var G=A.valueOf();
G<=F.valueOf();
G+=86400000){var B=o.dateToIndex(new Date(G));
if(C[B]==undefined){C[B]=[itemID];
}else{C[B].push(itemID);
}}}}return C;
};
var AJ=AC(n);
var AE=null;
var t,h,AG,w;
for(i=1;
i<=42;
i++){t=i-k.start_dow;
if(t<0){h=Exhibit.CalendarView.daysInMonth[AI.getMonth()]+t+1;
AG=new Date(AI.getFullYear(),AI.getMonth(),h);
w="previous-month";
}if((t>=0)&&(t<Exhibit.CalendarView.daysInMonth[j-1])){h=i-k.start_dow+1;
AG=new Date(k.getFullYear(),j-1,h);
w=(t==p?"current-month today":"current-month");
}if(t>=Exhibit.CalendarView.daysInMonth[j-1]){h=t-Exhibit.CalendarView.daysInMonth[j-1]+1;
AG=new Date(AB.getFullYear(),AB.getMonth(),h);
w="next-month";
}var r=this.dateToIndex(AG);
td=this.buildCell(AG,w,n,AJ[r]);
if(i==1||i%7==1){if(AE!==null){m.appendChild(AE);
}AE=this.buildRow(AG);
}AE.appendChild(td);
}m.appendChild(AE);
AA.appendChild(e);
return AA;
};
Exhibit.CalendarView.prototype.buildRow=function(I){try{var J=this;
var F=new Date(I.getFullYear(),I.getMonth(),I.getDate());
F=new Date(F.setDate(F.getDate()+6));
var G=SimileAjax.DOM.createDOMFromString("tr","");
G.elmt.align="center";
return G.elmt;
}catch(H){alert("buildRow: "+H.message);
}};
Exhibit.CalendarView.prototype.buildCell=function(Q,S,Z,R){try{var T=this;
var O=document.createElement("td");
var Y=document.createElement("span");
Y.innerHTML=Q.getDate();
Y.className="calendar-date-title";
O.appendChild(Y);
if(R&&R.length){for(var X=0;
X<R.length&&X<4;
X++){var U=Z[R[X]];
var V=document.createElement("span");
V.className="event-title";
var W=document.createElement("a");
W.href=Exhibit.Persistence.getItemLink(U.itemID);
W.setAttribute("ex:itemID",U.itemID);
W.innerHTML=U.label;
V.appendChild(W);
O.appendChild(V);
SimileAjax.WindowManager.registerEvent(W,"click",function(B,C,A){Exhibit.ViewUtilities.openBubbleForItems(B,[B.getAttribute("ex:itemID")],T._uiContext);
});
}if(R.length>4){var P=document.createElement("span");
var b=document.createElement("a");
b.innerHTML="View More +";
b.href="javascript:void";
b.className="view-more";
P.appendChild(b);
SimileAjax.WindowManager.registerEvent(b,"click",function(B,C,A){Exhibit.ViewUtilities.openBubbleForItems(B,R,T._uiContext);
});
O.appendChild(P);
}}O.className=[S,"day",((Q.getDay()===0||Q.getDay()==6)?"weekend":"")].join(" ");
return O;
}catch(a){alert("buildCell: "+a.message);
}};
Exhibit.DatePickerFacet=function(D,C){this._div=D;
this._uiContext=C;
this._beginDate=null;
this._endDate=null;
this._settings={};
this._dom=null;
this._datePicker=null;
this._datePickerTimerLimit=null;
this._datePickerTimer=null;
this._enableDragSelection=null;
this._range={min:null,max:null};
this._dateFormat="y-MM-dd";
};
Exhibit.DatePickerFacet._settingsSpecs={"facetLabel":{type:"text"},"dateFormat":{type:"text"}};
Exhibit.DatePickerFacet.create=function(F,H,E){var E=Exhibit.UIContext.create(F,E);
var G=new Exhibit.DatePickerFacet(H,E);
Exhibit.DatePickerFacet._configure(G,F);
G._initializeUI();
E.getCollection().addFacet(G);
return G;
};
Exhibit.DatePickerFacet.createFromDOM=function(N,K,R){var L=Exhibit.getConfigurationFromDOM(N);
var R=Exhibit.UIContext.createFromDOM(N,R);
var M=new Exhibit.DatePickerFacet((K!==null?K:N),R);
Exhibit.SettingsUtilities.collectSettingsFromDOM(N,Exhibit.DatePickerFacet._settingsSpecs,M._settings);
try{var P=Exhibit.getAttribute(N,"beginDate");
if(P!==null&&P.length>0){M._beginDate=Exhibit.ExpressionParser.parse(P);
}var S=Exhibit.getAttribute(N,"endDate");
if(S!==null&&S.length>0){M._endDate=Exhibit.ExpressionParser.parse(S);
}if(M._endDate===null){M._endDate=M.beginDate;
}var T=Exhibit.getAttribute(N,"timerLimit");
if(T!==null&&T.length>0){M._datePickerTimerLimit=T;
}var O=Exhibit.getAttribute(N,"dragSelection");
if(O!==null&&O.length>0){M._enableDragSelection=(O=="true");
}}catch(Q){SimileAjax.Debug.exception(Q,"DatePickerFacet: Error processing configuration of date range facet");
}Exhibit.DatePickerFacet._configure(M,L);
M._initializeUI();
R.getCollection().addFacet(M);
return M;
};
Exhibit.DatePickerFacet._configure=function(F,G){Exhibit.SettingsUtilities.collectSettings(G,Exhibit.DatePickerFacet._settingsSpecs,F._settings);
if("expression" in G){F._beginDate=Exhibit.ExpressionParser.parse(G.expression);
}if(!("facetLabel" in F._settings)){F._settings.facetLabel="missing ex:facetLabel";
if(F._beginDate!==null&&F._beginDate.isPath()){var E=F._beginDate.getPath().getLastSegment();
var H=F._uiContext.getDatabase().getProperty(E.property);
if(H!==null){F._settings.facetLabel=E.forward?H.getLabel():H.getReverseLabel();
}}}};
Exhibit.DatePickerFacet.prototype._initializeUI=function(){var B=this;
this._dom=this.constructFacetFrame(this._div,this._settings.facetLabel);
if(this._range.min!==null&&this._range.max!==null){this._dom.range_min.value=this._range.min;
this._dom.range_max.value=this._range.max;
}this._datePicker=Exhibit.DatePickerFacet.DatePicker.create(this._dom.DatePicker,this,new Date());
SimileAjax.WindowManager.registerEvent(this._dom.range_min,"keyup",function(E,F,A){B._onDateFieldChange(E,F);
});
SimileAjax.WindowManager.registerEvent(this._dom.range_max,"keyup",function(E,F,A){B._onDateFieldChange(E,F);
});
};
Exhibit.DatePickerFacet.prototype.constructFacetFrame=function(G,I){var J=this;
var F=["<div class='exhibit-facet-header'>","<div class='exhibit-facet-header-filterControl' id='clearSelectionsDiv' title='",Exhibit.FacetUtilities.l10n.clearSelectionsTooltip,"'>","<span id='filterCountSpan'></span>","<img id='checkImage' />","</div>","<span class='exhibit-facet-header-title'>",I,"</span>","</div>","<div class='exhibit-date-picker' id='DatePicker'></div>","<div class='exhibit-date-picker-text'><input type='text' id='range_min' size='10' style='width:auto;'> - ","<input type='text' id='range_max' size='10' style='width:auto;'></div>"].join("");
var H=SimileAjax.DOM.createDOMFromString(G,F,{checkImage:Exhibit.UI.createTranslucentImage("images/black-check.png")});
H.setSelectionCount=function(A,B){this.filterCountSpan.innerHTML=B;
this.clearSelectionsDiv.style.display=A?"block":"none";
};
SimileAjax.WindowManager.registerEvent(H.clearSelectionsDiv,"click",function(B,C,A){J._clearSelections();
});
return H;
};
Exhibit.DatePickerFacet.prototype.hasRestrictions=function(){return(this._range.min!==null&&this._range.max!==null);
};
Exhibit.DatePickerFacet.prototype.clearAllRestrictions=function(){var B=this._range;
if(this.hasRestrictions){this._range={min:null,max:null};
this._notifyCollection();
}this._dom.range_min.value="";
this._dom.range_max.value="";
this._datePicker.update();
this._dom.setSelectionCount(this.hasRestrictions(),0);
return B;
};
Exhibit.DatePickerFacet.prototype.applyRestrictions=function(B){this.setRange(B);
};
Exhibit.DatePickerFacet.prototype.restrict=function(J){if(!this.hasRestrictions()){this._dom.setSelectionCount(this.hasRestrictions(),0);
return J;
}else{var L=SimileAjax.DateTime.parseIso8601DateTime(this._range.min);
var R=SimileAjax.DateTime.parseIso8601DateTime(this._range.max);
this._dom.setSelectionCount(this.hasRestrictions(),Math.floor((R-L)/(24*60*60*1000)));
var P=this._uiContext.getDatabase();
if(this._beginDate!==null&&this._endDate!==null){var M=this._beginDate;
var O=this._endDate;
var Q=new Exhibit.Set();
var K=this._uiContext.getCollection().getAllItems();
SimileAjax.DateTime.incrementByInterval(R,SimileAjax.DateTime.DAY);
K.visit(function(F){var B=false;
var E=M.evaluateOnItem(F,P);
var C=O.evaluateOnItem(F,P);
if(E.size>0){var A=SimileAjax.DateTime.parseIso8601DateTime(E.values.toArray()[0]);
if(A>=L&&A<=R){Q.add(F);
B=true;
}}if(C.size>0){var D=SimileAjax.DateTime.parseIso8601DateTime(C.values.toArray()[0]);
if(D>=L&&D<=R&&!B){Q.add(F);
B=true;
}}if(A&&D&&!B){if((L>=A&&L<=D)||(R>=A&&R<=D)){Q.add(F);
}}});
return Q;
}else{var N=this._beginDate.getPath();
var Q=new Exhibit.Set();
Q.addSet(N.rangeBackward(L,R.setUTCDate(R.getUTCDate()+1),false,J,P).values);
return Q;
}}};
Exhibit.DatePickerFacet.prototype._notifyCollection=function(){this._uiContext.getCollection().onFacetUpdated(this);
};
Exhibit.DatePickerFacet.prototype._clearSelections=function(){this.clearAllRestrictions();
};
Exhibit.DatePickerFacet.prototype.update=function(B){};
Exhibit.DatePickerFacet.prototype._onDateFieldChange=function(H,F){if(this._dom.range_min.value&&Exhibit.DateUtil.parseDate(this._dom.range_min.value)&&this._dom.range_max.value&&Exhibit.DateUtil.parseDate(this._dom.range_max.value)){min_date=Exhibit.DateUtil.parseDate(this._dom.range_min.value);
max_date=Exhibit.DateUtil.parseDate(this._dom.range_max.value);
if(min_date&&max_date){var J=this;
if(max_date<min_date){old_min=this._dom.range_min.value;
this._dom.range_min.value=this._dom.range_max.value;
this._dom.range_max.value=old_min;
}var I={min:this._dom.range_min.value,max:this._dom.range_max.value};
if(I.min!=this._range.min||I.max!=this._range.max){var G=this._range;
SimileAjax.History.addLengthyAction(function(){J.setRange(I);
J._datePicker.update();
},function(){J.setRange(G);
J._datePicker.update();
},"Clear date range search");
}}}};
Exhibit.DatePickerFacet.prototype.setRange=function(B){if(B.min!==null&&B.max!==null){min_date=Exhibit.DateUtil.parseDate(B.min);
max_date=Exhibit.DateUtil.parseDate(B.max);
this._dom.range_min.value=Exhibit.DateUtil.formatDate(min_date,this._dateFormat);
this._dom.range_max.value=Exhibit.DateUtil.formatDate(max_date,this._dateFormat);
}if(B.min!=this._range.min||B.max!=this._range.max){this._range=B;
this._notifyCollection();
}};
Exhibit.DatePickerFacet.prototype.dateInCurrentRange=function(B){if(this._range.min!==null&&this._range.max!==null){min_date=Exhibit.DateUtil.parseDate(this._range.min);
max_date=Exhibit.DateUtil.parseDate(this._range.max);
return(B>=(min_date-24*60*60*1000))&&(B<=max_date);
}else{return false;
}};
Exhibit.DatePickerFacet.prototype.dateRangeInCurrentRange=function(B){return this.dateInCurrentRange(B.min)&&this.dateInCurrentRange(B.max);
};
Exhibit.DatePickerFacet.prototype.changeDate=function(B){this._datePicker.update(Exhibit.DateUtil.parseDate(B));
};
Exhibit.DatePickerFacet.prototype.selectDate=function(D){var C=this;
if(this._datePickerTimer){clearTimeout(this._datePickerTimer);
}if(this._dom.range_min.value.trim()!==""&&this._dom.range_max.value.trim()!==""){this._dom.range_min.value="";
this._dom.range_max.value="";
}if(this._dom.range_min.value.trim()===""&&this._dom.range_max.value.trim()===""){this._datePicker.startHighlighting(D);
if(this._datePickerTimerLimit&&!this._enableDragSelection){this._datePickerTimer=setTimeout(function(){C.selectDate(C._dom.range_min.value);
},this._datePickerTimerLimit);
}}if(this._dom.range_min.value.trim()===""){this._dom.range_min.value=D;
}else{this._dom.range_max.value=D;
this._datePicker.stopHighlighting();
}this._onDateFieldChange();
};
Exhibit.DatePickerFacet.prototype.selectRange=function(D,C){this._dom.range_min.value=D;
this._dom.range_max.value=C;
this._onDateFieldChange();
};
Exhibit.DatePickerFacet.prototype.dateHasItems=function(K){var J=this._uiContext.getDatabase();
var N=J.getAllItems();
var H=new Date(K.getFullYear(),K.getMonth(),K.getDate());
SimileAjax.DateTime.incrementByInterval(H,SimileAjax.DateTime.DAY);
if(this._beginDate!==null&&this._endDate!==null){var L=this._beginDate;
var M=this._endDate;
itemsFound=false;
N.visit(function(C){if(itemsFound){return ;
}var B=L.evaluateOnItem(C,J);
var E=M.evaluateOnItem(C,J);
if(B.size>0){var D=SimileAjax.DateTime.parseIso8601DateTime(B.values.toArray()[0]);
if(D>=K&&D<=H){itemsFound=true;
}}if(E.size>0){var A=SimileAjax.DateTime.parseIso8601DateTime(E.values.toArray()[0]);
if(A>=K&&A<=H&&!itemsFound){itemsFound=true;
}}if(D&&A&&!itemsFound){if((K>=D&&K<=A)||(H>=D&&H<=A)){itemsFound=true;
}}});
return itemsFound;
}else{var I=this._beginDate.getPath();
return I.rangeBackward(K,H,false,N,J).count>0;
}};
Exhibit.DatePickerFacet.prototype.exportFacetSelection=function(){if(this._range.min&&this._range.max){return this._range.min+","+this._range.max;
}};
Exhibit.DatePickerFacet.prototype.importFacetSelection=function(D){var C=D.split(",");
if(C.length>1){this.setRange({min:C[0],max:C[1]});
this._datePicker.update();
}};
Exhibit.DatePickerFacet.DatePicker=function(E,F,D){this._div=E;
this._facet=F;
this._currentDate=D;
this._highlight=false;
};
Exhibit.DatePickerFacet.DatePicker.create=function(E,F,D){DatePicker=new Exhibit.DatePickerFacet.DatePicker(E,F,D);
DatePicker._div.appendChild(DatePicker.buildCal());
return DatePicker;
};
Exhibit.DatePickerFacet.DatePicker.prototype.update=function(B){if(typeof B=="undefined"){B=this._currentDate;
}while(this._div.hasChildNodes()){this._div.removeChild(this._div.lastChild);
}this._currentDate=B;
this._div.appendChild(DatePicker.buildCal());
};
Exhibit.DatePickerFacet.DatePicker.daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
Exhibit.DatePickerFacet.DatePicker.prototype.buildCal=function(){var t=this._currentDate.getFullYear();
var j=this._currentDate.getMonth()+1;
var n=this;
var k=new Date(t,j-1,1);
k.start_dow=k.getDay()+1;
var l=new Date();
var o=(t==l.getFullYear()&&j==l.getMonth()+1)?l.getDate():0;
Exhibit.DatePickerFacet.DatePicker.daysInMonth[1]=(((k.getFullYear()%100!==0)&&(k.getFullYear()%4===0))||(k.getFullYear()%400===0))?29:28;
base=new Date(t,j-1,1);
var AH=new Date(base.setDate(base.getDate()-1));
base=new Date(t,j-1,1);
var AB=new Date(base.setDate(base.getDate()+Exhibit.DatePickerFacet.DatePicker.daysInMonth[j-1]+1));
var AA=document.createElement("div");
var AE=document.createElement("table");
AE.cellpadding=0;
AE.cellspacing=0;
AE.className="exhibit-month-header";
AA.appendChild(AE);
var y=document.createElement("tbody");
AE.appendChild(y);
var f=document.createElement("tr");
y.appendChild(f);
var p=document.createElement("td");
p.className="previous-month";
var g=document.createElement("a");
g.innerHTML=Exhibit.DateUtil.MONTH_NAMES[AH.getMonth()+12];
g.setAttribute("href","javascript:{}");
p.appendChild(g);
f.appendChild(p);
var w=document.createElement("td");
w.innerHTML=Exhibit.DateUtil.MONTH_NAMES[j-1]+", "+t;
w.className="current-month";
w.setAttribute("allign","center");
w.setAttribute("width","100%");
f.appendChild(w);
var AC=document.createElement("td");
AC.className="next-month";
var r=document.createElement("a");
r.innerHTML=Exhibit.DateUtil.MONTH_NAMES[AB.getMonth()+12];
r.setAttribute("href","javascript:{}");
AC.appendChild(r);
f.appendChild(AC);
var e=document.createElement("table");
AA.appendChild(e);
var m=document.createElement("tbody");
e.appendChild(m);
var AG=document.createElement("tr");
AG.setAttribute("align","center");
m.appendChild(AG);
var x=document.createElement("td");
x.setAttribute("align","center");
AG.appendChild(x);
var v=document.createElement("tr");
m.appendChild(v);
var d=document.createElement("td");
d.innerHTML="&nbsp;";
d.className="day-header exhibit-week-selector";
v.appendChild(d);
for(s=0;
s<7;
s++){var z=document.createElement("td");
z.innerHTML="SMTWTFS".substr(s,1);
z.className="day-header";
v.appendChild(z);
}e.className="exhibit-date-picker";
e.setAttribute("cellpadding","0");
e.setAttribute("cellspacing","0");
SimileAjax.WindowManager.registerEvent(g,"click",function(B,C,A){n._facet.changeDate(Exhibit.DateUtil.formatDate(AH,n._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
SimileAjax.WindowManager.registerEvent(r,"click",function(B,C,A){n._facet.changeDate(Exhibit.DateUtil.formatDate(AB,n._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
var AD=null;
var q,h,AF,u;
for(i=1;
i<=42;
i++){q=i-k.start_dow;
if(q<0){h=Exhibit.DatePickerFacet.DatePicker.daysInMonth[AH.getMonth()]+q+1;
AF=new Date(AH.getFullYear(),AH.getMonth(),h);
u="previousMonth";
}if((q>=0)&&(q<Exhibit.DatePickerFacet.DatePicker.daysInMonth[j-1])){h=i-k.start_dow+1;
AF=new Date(k.getFullYear(),j-1,h);
u=(q==o?"currentMonth today":"currentMonth");
}if(q>=Exhibit.DatePickerFacet.DatePicker.daysInMonth[j-1]){h=q-Exhibit.DatePickerFacet.DatePicker.daysInMonth[j-1]+1;
AF=new Date(AB.getFullYear(),AB.getMonth(),h);
u="nextMonth";
}td=this.buildCell(AF,u);
if(i==1||i%7==1){if(AD!==null){m.appendChild(AD);
}AD=this.buildRow(AF);
}AD.appendChild(td);
}m.appendChild(AD);
return AA;
};
Exhibit.DatePickerFacet.DatePicker.prototype.buildRow=function(J){try{var L=this;
var G=new Date(J.getFullYear(),J.getMonth(),J.getDate());
G=new Date(G.setDate(G.getDate()+6));
var H=SimileAjax.DOM.createDOMFromString("tr","");
var K=SimileAjax.DOM.createDOMFromString("td",'<a href="javascript:{}" id="link"><span>></span></a>');
K.elmt.className="exhibit-week-selector";
K.link.className=(this._facet.dateRangeInCurrentRange({min:J,max:G})?"selected":"");
SimileAjax.WindowManager.registerEvent(K.link,"click",function(B,C,A){L._facet.selectRange(Exhibit.DateUtil.formatDate(J,L._facet._dateFormat),Exhibit.DateUtil.formatDate(G,L._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
H.elmt.align="center";
H.elmt.appendChild(K.elmt);
return H.elmt;
}catch(I){alert("buildRow: "+I.message);
}};
Exhibit.DatePickerFacet.DatePicker.prototype.buildCell=function(I,F){try{var J=this;
var G=SimileAjax.DOM.createDOMFromString("td",I.getDate());
G.elmt.className=[F,"day",(this._facet.dateInCurrentRange(I)?"selected":""),((I.getDay()===0||I.getDay()==6)?"weekend":""),(this._facet.dateHasItems(I)?"has-items":"")].join(" ");
G.elmt.id=Exhibit.DateUtil.formatDate(I,J._facet._dateFormat).replace(/[^a-zA-Z 0-9]+/g,"");
G.elmt.setAttribute("ex:date",Exhibit.DateUtil.formatDate(I,J._facet._dateFormat));
if(J._facet._enableDragSelection){SimileAjax.WindowManager.registerEvent(G.elmt,"mousedown",function(B,C,A){J._facet.selectDate(Exhibit.DateUtil.formatDate(I,J._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
SimileAjax.WindowManager.registerEvent(G.elmt,"mouseup",function(B,C,A){J._facet.selectDate(Exhibit.DateUtil.formatDate(I,J._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
}else{SimileAjax.WindowManager.registerEvent(G.elmt,"click",function(B,C,A){J._facet.selectDate(Exhibit.DateUtil.formatDate(I,J._facet._dateFormat));
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
}SimileAjax.WindowManager.registerEvent(G.elmt,"mouseover",function(B,C,A){J.highlight(B);
SimileAjax.DOM.cancelEvent(C);
return false;
},SimileAjax.WindowManager.getBaseLayer());
return G.elmt;
}catch(H){alert("buildCell: "+H.message);
}};
Exhibit.DatePickerFacet.DatePicker.prototype.highlight=function(B){if(this._highlight){$("td.day").each(function(A){$("#"+this.id).removeClass("highlight");
});
center=Exhibit.DateUtil.parseDate(this._highlight);
end=Exhibit.DateUtil.parseDate(Exhibit.getAttribute(B,"ex:date"));
if(end<center){old_end=end;
end=center;
center=old_end;
}while(center<=end){$("#"+Exhibit.DateUtil.formatDate(center,this._facet._dateFormat).replace(/[^a-zA-Z 0-9]+/g,"")).addClass("highlight");
center.setDate(center.getDate()+1);
}}};
Exhibit.DatePickerFacet.DatePicker.prototype.startHighlighting=function(B){this._highlight=B;
dateObj=Exhibit.DateUtil.parseDate(B);
elmtId=Exhibit.DateUtil.formatDate(dateObj,this._facet._dateFormat).replace(/[^a-zA-Z 0-9]+/g,"");
elmt=$("#"+elmtId).addClass("highlight");
};
Exhibit.DatePickerFacet.DatePicker.prototype.stopHighlighting=function(B){this._highlight=false;
};
Exhibit.DateUtil=new Object();
Exhibit.DateUtil.MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
Exhibit.DateUtil.DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
Exhibit.DateUtil.LZ=function(B){return(B<0||B>9?"":"0")+B;
};
Exhibit.DateUtil.isDate=function(E,F){var D=Exhibit.DateUtil.getDateFromFormat(E,F);
if(D==0){return false;
}return true;
};
Exhibit.DateUtil.compareDates=function(I,H,K,J){var L=Exhibit.DateUtil.getDateFromFormat(I,H);
var G=Exhibit.DateUtil.getDateFromFormat(K,J);
if(L==0||G==0){return -1;
}else{if(L>G){return 1;
}}return 0;
};
Exhibit.DateUtil.formatDate=function(AD,AG){AG=AG+"";
var r="";
var h=0;
var AE="";
var w="";
var t=AD.getYear()+"";
var v=AD.getMonth()+1;
var AF=AD.getDate();
var p=AD.getDay();
var q=AD.getHours();
var c=AD.getMinutes();
var n=AD.getSeconds();
var l,k,y,m,AC,x,E,H,M,o,AA,q,AB,u,z,K;
var d=new Object();
if(t.length<4){t=""+(t-0+1900);
}d["y"]=""+t;
d["yyyy"]=t;
d["yy"]=t.substring(2,4);
d["M"]=v;
d["MM"]=Exhibit.DateUtil.LZ(v);
d["MMM"]=Exhibit.DateUtil.MONTH_NAMES[v-1];
d["NNN"]=Exhibit.DateUtil.MONTH_NAMES[v+11];
d["d"]=AF;
d["dd"]=Exhibit.DateUtil.LZ(AF);
d["E"]=Exhibit.DateUtil.DAY_NAMES[p+7];
d["EE"]=Exhibit.DateUtil.DAY_NAMES[p];
d["H"]=q;
d["HH"]=Exhibit.DateUtil.LZ(q);
if(q==0){d["h"]=12;
}else{if(q>12){d["h"]=q-12;
}else{d["h"]=q;
}}d["hh"]=Exhibit.DateUtil.LZ(d["h"]);
if(q>11){d["K"]=q-12;
}else{d["K"]=q;
}d["k"]=q+1;
d["KK"]=Exhibit.DateUtil.LZ(d["K"]);
d["kk"]=Exhibit.DateUtil.LZ(d["k"]);
if(q>11){d["a"]="PM";
}else{d["a"]="AM";
}d["m"]=c;
d["mm"]=Exhibit.DateUtil.LZ(c);
d["s"]=n;
d["ss"]=Exhibit.DateUtil.LZ(n);
while(h<AG.length){AE=AG.charAt(h);
w="";
while((AG.charAt(h)==AE)&&(h<AG.length)){w+=AG.charAt(h++);
}if(d[w]!=null){r=r+d[w];
}else{r=r+w;
}}return r;
};
Exhibit.DateUtil._isInteger=function(E){var F="1234567890";
for(var D=0;
D<E.length;
D++){if(F.indexOf(E.charAt(D))==-1){return false;
}}return true;
};
Exhibit.DateUtil._getInt=function(H,J,I,K){for(var G=K;
G>=I;
G--){var L=H.substring(J,J+G);
if(L.length<I){return null;
}if(Exhibit.DateUtil._isInteger(L)){return L;
}}return null;
};
Exhibit.DateUtil.getDateFromFormat=function(V,c){V=V+"";
c=c+"";
var W=0;
var g=0;
var a="";
var m="";
var X="";
var k,l;
var p=new Date();
var j=p.getYear();
var Y=p.getMonth()+1;
var Z=1;
var o=p.getHours();
var b=p.getMinutes();
var e=p.getSeconds();
var h="";
while(g<c.length){a=c.charAt(g);
m="";
while((c.charAt(g)==a)&&(g<c.length)){m+=c.charAt(g++);
}if(m=="yyyy"||m=="yy"||m=="y"){if(m=="yyyy"){k=4;
l=4;
}if(m=="yy"){k=2;
l=2;
}if(m=="y"){k=2;
l=4;
}j=Exhibit.DateUtil._getInt(V,W,k,l);
if(j==null){return 0;
}W+=j.length;
if(j.length==2){if(j>70){j=1900+(j-0);
}else{j=2000+(j-0);
}}}else{if(m=="MMM"||m=="NNN"){Y=0;
for(var d=0;
d<Exhibit.DateUtil.MONTH_NAMES.length;
d++){var n=Exhibit.DateUtil.MONTH_NAMES[d];
if(V.substring(W,W+n.length).toLowerCase()==n.toLowerCase()){if(m=="MMM"||(m=="NNN"&&d>11)){Y=d+1;
if(Y>12){Y-=12;
}W+=n.length;
break;
}}}if((Y<1)||(Y>12)){return 0;
}}else{if(m=="EE"||m=="E"){for(var d=0;
d<Exhibit.DateUtil.DAY_NAMES.length;
d++){var f=Exhibit.DateUtil.DAY_NAMES[d];
if(V.substring(W,W+f.length).toLowerCase()==f.toLowerCase()){W+=f.length;
break;
}}}else{if(m=="MM"||m=="M"){Y=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(Y==null||(Y<1)||(Y>12)){return 0;
}W+=Y.length;
}else{if(m=="dd"||m=="d"){Z=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(Z==null||(Z<1)||(Z>31)){return 0;
}W+=Z.length;
}else{if(m=="hh"||m=="h"){o=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(o==null||(o<1)||(o>12)){return 0;
}W+=o.length;
}else{if(m=="HH"||m=="H"){o=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(o==null||(o<0)||(o>23)){return 0;
}W+=o.length;
}else{if(m=="KK"||m=="K"){o=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(o==null||(o<0)||(o>11)){return 0;
}W+=o.length;
}else{if(m=="kk"||m=="k"){o=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(o==null||(o<1)||(o>24)){return 0;
}W+=o.length;
o--;
}else{if(m=="mm"||m=="m"){b=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(b==null||(b<0)||(b>59)){return 0;
}W+=b.length;
}else{if(m=="ss"||m=="s"){e=Exhibit.DateUtil._getInt(V,W,m.length,2);
if(e==null||(e<0)||(e>59)){return 0;
}W+=e.length;
}else{if(m=="a"){if(V.substring(W,W+2).toLowerCase()=="am"){h="AM";
}else{if(V.substring(W,W+2).toLowerCase()=="pm"){h="PM";
}else{return 0;
}}W+=2;
}else{if(V.substring(W,W+m.length)!=m){return 0;
}else{W+=m.length;
}}}}}}}}}}}}}}if(W!=V.length){return 0;
}if(Y==2){if(((j%4==0)&&(j%100!=0))||(j%400==0)){if(Z>29){return 0;
}}else{if(Z>28){return 0;
}}}if((Y==4)||(Y==6)||(Y==9)||(Y==11)){if(Z>30){return 0;
}}if(o<12&&h=="PM"){o=o-0+12;
}else{if(o>11&&h=="AM"){o-=12;
}}var q=new Date(j,Y-1,Z,o,b,e);
return q.getTime();
};
Exhibit.DateUtil.parseDate=function(I){var K=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");
dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var N=new Array("generalFormats",K?"dateFirst":"monthFirst",K?"monthFirst":"dateFirst");
var J=null;
for(var L=0;
L<N.length;
L++){var H=window[N[L]];
for(var M=0;
M<H.length;
M++){J=Exhibit.DateUtil.getDateFromFormat(I,H[M]);
if(J!=0){return new Date(J);
}}}return null;
};


/* compile-epilog.js */
(function(){var f=null;
if("SimileWidgets_onLoad" in window){if(typeof SimileWidgets_onLoad=="string"){f=eval(SimileWidgets_onLoad);
SimileWidgets_onLoad=null;
}else{if(typeof SimileWidgets_onLoad=="function"){f=SimileWidgets_onLoad;
SimileWidgets_onLoad=null;
}}}if(f!=null){f();
}})();
