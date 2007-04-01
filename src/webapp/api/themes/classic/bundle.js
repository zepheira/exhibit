

/* exhibit-theme.js */

Exhibit.Theme={urlPrefix:Exhibit.urlPrefix+"themes/classic/",createTranslucentImage:function(url){return SimileAjax.Graphics.createTranslucentImage(Exhibit.Theme.urlPrefix+url);},createPopupMenuDom:function(element){var div=document.createElement("div");div.className="exhibit-menu-popup exhibit-ui-protection";var dom={elmt:div,close:function(){document.body.removeChild(this.elmt);},open:function(){var self=this;this.layer=SimileAjax.WindowManager.pushLayer(function(){self.close();},true);var docWidth=document.body.offsetWidth;var docHeight=document.body.offsetHeight;var coords=SimileAjax.DOM.getPageCoordinates(element);div.style.top=(coords.top+element.scrollHeight)+"px";div.style.right=(docWidth-(coords.left+element.scrollWidth))+"px";document.body.appendChild(this.elmt);},appendMenuItem:function(label,icon,onClick){var self=this;var a=document.createElement("a");a.className="exhibit-menu-item";a.href="javascript:";SimileAjax.WindowManager.registerEvent(a,"click",function(elmt,evt,target){onClick(elmt,evt,target);SimileAjax.WindowManager.popLayer(self.layer);SimileAjax.DOM.cancelEvent(evt);return false;});var div=document.createElement("div");a.appendChild(div);div.appendChild(SimileAjax.Graphics.createTranslucentImage(icon!=null?icon:(Exhibit.Theme.urlPrefix+"images/blank-16x16.png")));div.appendChild(document.createTextNode(label));this.elmt.appendChild(a);},appendSeparator:function(){var hr=document.createElement("hr");this.elmt.appendChild(hr);}};return dom;},createCopyButton:function(all){var button=document.createElement("button");button.className="exhibit-copyButton screen";button.innerHTML=all?Exhibit.l10n.copyAllButtonLabel:Exhibit.l10n.copyButtonLabel;return button;},createCopyDialogBox:function(string){var template={tag:"div",className:"exhibit-copyDialog exhibit-ui-protection",children:[{tag:"button",field:"closeButton",children:[Exhibit.l10n.copyDialogBoxCloseButtonLabel]},{tag:"p",children:[Exhibit.l10n.copyDialogBoxPrompt]},{tag:"div",field:"textAreaContainer"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.textAreaContainer.innerHTML="<textarea wrap='off' rows='15'>"+string+"</textarea>";dom.close=function(){document.body.removeChild(dom.elmt);};dom.open=function(){dom.elmt.style.top=(document.body.scrollTop+100)+"px";document.body.appendChild(dom.elmt);dom.layer=SimileAjax.WindowManager.pushLayer(function(){dom.close();},false);var textarea=dom.textAreaContainer.firstChild;textarea.select();SimileAjax.WindowManager.registerEvent(dom.closeButton,"click",function(elmt,evt,target){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;},dom.layer);SimileAjax.WindowManager.registerEvent(textarea,"keyup",function(elmt,evt,target){if(evt.keyCode==27){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;}
return true;},dom.layer);};return dom;},createFocusDialogBox:function(itemID,exhibit,configuration){var template={tag:"div",className:"exhibit-focusDialog exhibit-ui-protection",children:[{tag:"div",className:"exhibit-focusDialog-viewContainer",field:"viewContainer"},{tag:"div",className:"exhibit-focusDialog-controls",children:[{tag:"button",field:"closeButton",children:[Exhibit.l10n.focusDialogBoxCloseButtonLabel]}]}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.close=function(){document.body.removeChild(dom.elmt);};dom.open=function(){dom.layer=SimileAjax.WindowManager.pushLayer(function(){dom.close();},false);var lens=new Exhibit.Lens(itemID,dom.viewContainer,exhibit,configuration);dom.elmt.style.top=(document.body.scrollTop+100)+"px";document.body.appendChild(dom.elmt);SimileAjax.WindowManager.registerEvent(dom.closeButton,"click",function(elmt,evt,target){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;},dom.layer);};return dom;},createBusyIndicator:function(){var urlPrefix=Exhibit.Theme.urlPrefix;var containerDiv=document.createElement("div");if(SimileAjax.Graphics.pngIsTranslucent){var topDiv=document.createElement("div");topDiv.style.height="33px";topDiv.style.background="url("+urlPrefix+"images/message-top-left.png) top left no-repeat";topDiv.style.paddingLeft="44px";containerDiv.appendChild(topDiv);var topRightDiv=document.createElement("div");topRightDiv.style.height="33px";topRightDiv.style.background="url("+urlPrefix+"images/message-top-right.png) top right no-repeat";topDiv.appendChild(topRightDiv);var middleDiv=document.createElement("div");middleDiv.style.background="url("+urlPrefix+"images/message-left.png) top left repeat-y";middleDiv.style.paddingLeft="44px";containerDiv.appendChild(middleDiv);var middleRightDiv=document.createElement("div");middleRightDiv.style.background="url("+urlPrefix+"images/message-right.png) top right repeat-y";middleRightDiv.style.paddingRight="44px";middleDiv.appendChild(middleRightDiv);var contentDiv=document.createElement("div");middleRightDiv.appendChild(contentDiv);var bottomDiv=document.createElement("div");bottomDiv.style.height="55px";bottomDiv.style.background="url("+urlPrefix+"images/message-bottom-left.png) bottom left no-repeat";bottomDiv.style.paddingLeft="44px";containerDiv.appendChild(bottomDiv);var bottomRightDiv=document.createElement("div");bottomRightDiv.style.height="55px";bottomRightDiv.style.background="url("+urlPrefix+"images/message-bottom-right.png) bottom right no-repeat";bottomDiv.appendChild(bottomRightDiv);}else{containerDiv.style.border="2px solid #7777AA";containerDiv.style.padding="20px";containerDiv.style.background="white";SimileAjax.Graphics.setOpacity(containerDiv,90);var contentDiv=document.createElement("div");containerDiv.appendChild(contentDiv);}
containerDiv.className="exhibit-busyIndicator";contentDiv.className="exhibit-busyIndicator-content";var img=document.createElement("img");img.src=urlPrefix+"images/progress-running.gif";contentDiv.appendChild(img);contentDiv.appendChild(document.createTextNode(" "+Exhibit.l10n.busyIndicatorMessage));return containerDiv;}};

/* lens-theme.js */

Exhibit.Lens.theme={createEditButton:function(label){var button=document.createElement("button");button.className="exhibit-lens-editButton";button.innerHTML=label!=null?label:Exhibit.Lens.l10n.editButtonLabel;return button;},createSaveButton:function(label){var button=document.createElement("button");button.className="exhibit-lens-saveButton";button.innerHTML=label!=null?label:Exhibit.Lens.l10n.saveButtonLabel;return button;}}

/* map-view-theme.js */

Exhibit.MapView.theme=new Object();Exhibit.MapView.theme.constructDom=function(div,uiContext){var l10n=Exhibit.MapView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-mapView-mappableDetails",field:"mappableDiv"}]},{tag:"div",className:"exhibit-mapView-mapContainer",field:"mapContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:function(){dom.map.checkResize();}},dom.mapContainer,uiContext);dom.mapDiv=dom.resizableDivWidget.getContentDiv();dom.mapDiv.className="exhibit-mapView-map";dom.legendWidget=Exhibit.LegendWidget.create({markerGenerator:function(color){var shape="square";return SimileAjax.Graphics.createTranslucentImage(Exhibit.MapView._markerUrlPrefix+
[shape,color,["m",shape,color,"legend.png"].join("-")].join("/"));}},dom.legendDiv,uiContext);dom.setMappableCounts=function(resultsCount,mappableCount){if(mappableCount!=resultsCount){dom.mappableDiv.style.display="block";dom.mappableDiv.innerHTML=l10n.formatMappableCount(mappableCount);}else{dom.mappableDiv.style.display="none";}};dom.getMapDiv=function(){return dom.mapDiv;};return dom;};

/* ordered-view-frame-theme.js */

Exhibit.OrderedViewFrame.theme=new Object();Exhibit.OrderedViewFrame.theme.createHeaderDom=function(exhibit,headerDiv,onThenSortBy,onGroupToggle,onShowDuplicatesToggle,generatedContentElmtRetriever){var l10n=Exhibit.OrderedViewFrame.l10n;var headerTemplate={elmt:headerDiv,className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",field:"sortControlsDiv",className:"exhibit-collectionView-header-sortControls",children:l10n.createSortingControlsTemplate(Exhibit.UI.makeActionLink(l10n.thenSortByLabel,onThenSortBy)).concat([" \u2022 ",{tag:"span",field:"groupSpan",className:"exhibit-collectionView-header-groupControls",children:[{elmt:Exhibit.Theme.createTranslucentImage("images/option.png"),field:"groupOption",style:{display:"none"}},{elmt:Exhibit.Theme.createTranslucentImage("images/option-check.png"),field:"groupOptionChecked",style:{display:"none"}}," ",l10n.groupedAsSorted]}," \u2022 ",{tag:"span",field:"duplicateSpan",className:"exhibit-collectionView-header-duplicateControls",children:[{elmt:Exhibit.Theme.createTranslucentImage("images/option.png"),field:"duplicateOption",style:{display:"none"}},{elmt:Exhibit.Theme.createTranslucentImage("images/option-check.png"),field:"duplicateOptionChecked",style:{display:"none"}}," ",l10n.showDuplicates]}])}]};var dom=SimileAjax.DOM.createDOMFromTemplate(headerTemplate);SimileAjax.WindowManager.registerEvent(dom.groupSpan,"click",onGroupToggle);SimileAjax.WindowManager.registerEvent(dom.duplicateSpan,"click",onShowDuplicatesToggle);dom.setOrders=function(orderDoms){dom.ordersSpan.innerHTML="";var addDelimiter=Exhibit.l10n.createListDelimiter(dom.ordersSpan,orderDoms.length);for(var i=0;i<orderDoms.length;i++){addDelimiter();dom.ordersSpan.appendChild(orderDoms[i].elmt);}
addDelimiter();};dom.setGrouped=function(grouped){dom.groupOption.style.display=grouped?"none":"inline";dom.groupOptionChecked.style.display=grouped?"inline":"none";};dom.setShowDuplicates=function(show){dom.duplicateOption.style.display=show?"none":"inline";dom.duplicateOptionChecked.style.display=show?"inline":"none";};dom.enableThenByAction=function(enabled){Exhibit.UI.enableActionLink(dom.thenByLink,enabled);};return dom;};Exhibit.OrderedViewFrame.theme.createOrderDom=function(label,onPopup){var a=Exhibit.UI.makeActionLink(label,onPopup);return{elmt:a};}
Exhibit.OrderedViewFrame.theme.createFooterDom=function(exhibit,footerDiv,onShowAll,onDontShowAll){var l10n=Exhibit.OrderedViewFrame.l10n;var footerTemplate={elmt:footerDiv,className:"exhibit-collectionView-footer screen",children:[]};var dom=SimileAjax.DOM.createDOMFromTemplate(footerTemplate);dom.setCounts=function(count,limitCount,showAll,canToggle){dom.elmt.innerHTML="";if(canToggle&&count>limitCount){if(showAll){dom.elmt.appendChild(Exhibit.UI.makeActionLink(l10n.formatDontShowAll(limitCount),onDontShowAll));}else{dom.elmt.appendChild(Exhibit.UI.makeActionLink(l10n.formatShowAll(count),onShowAll));}}};return dom;}

/* pivot-table-view-theme.js */

Exhibit.PivotTableView.theme=new Object();Exhibit.PivotTableView.theme.constructDom=function(div){var l10n=Exhibit.PivotTableView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",field:"collectionSummaryDiv"},{tag:"div",field:"tableContainer",className:"exhibit-pivotTableView-tableContainer"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};

/* scatter-plot-view-theme.js */

Exhibit.ScatterPlotView.theme=new Object();Exhibit.ScatterPlotView.theme.constructDom=function(div,onResize,uiContext){var l10n=Exhibit.ScatterPlotView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-scatterPlotView-mappableDetails",field:"plottableDiv"}]},{tag:"div",field:"plotOuterContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:onResize},dom.plotOuterContainer,uiContext);dom.plotContainer=dom.resizableDivWidget.getContentDiv();dom.plotContainer.className="exhibit-scatterPlotView-plotContainer";dom.legendWidget=Exhibit.LegendWidget.create({},dom.legendDiv,uiContext);dom.setPlottableCounts=function(resultsCount,plottableCount){if(plottableCount!=resultsCount){dom.plottableDiv.style.display="block";dom.plottableDiv.innerHTML=l10n.formatMappableCount(plottableCount);}else{dom.plottableDiv.style.display="none";}};return dom;};

/* tabular-view-theme.js */

Exhibit.TabularView.theme=new Object();Exhibit.TabularView.theme.createDom=function(div){var l10n=Exhibit.TabularView.l10n;var headerTemplate={elmt:div,className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",field:"bodyDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(headerTemplate);};Exhibit.TabularView.theme.createColumnHeader=function(exhibit,th,label,sort,sortAscending,sortFunction){var l10n=Exhibit.TabularView.l10n;var template={elmt:th,className:sort?"exhibit-tabularView-columnHeader-sorted":"exhibit-tabularView-columnHeader",title:sort?l10n.columnHeaderReSortTooltip:l10n.columnHeaderSortTooltip,children:[label]};if(sort){template.children.push({elmt:Exhibit.Theme.createTranslucentImage(sortAscending?"images/up-arrow.png":"images/down-arrow.png")});}
SimileAjax.WindowManager.registerEvent(th,"click",sortFunction,null);var dom=SimileAjax.DOM.createDOMFromTemplate(template);return dom;};

/* thumbnail-view-theme.js */

Exhibit.ThumbnailView.theme=new Object();Exhibit.ThumbnailView.theme.constructGroup=function(groupLevel,label){var l10n=Exhibit.ThumbnailView.l10n;var template={tag:"div",className:"exhibit-thumbnailView-group",children:[{tag:"h"+(groupLevel+1),children:[label,{tag:"span",className:"exhibit-collectionView-group-count",children:[" (",{tag:"span",field:"countSpan"},")"]}],field:"header"},{tag:"div",className:"exhibit-collectionView-group-content",field:"contentDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};Exhibit.ThumbnailView.theme.constructItemContainer=function(){var div=document.createElement("div");div.className="exhibit-thumbnailView-body";return div;};

/* tile-view-theme.js */

Exhibit.TileView.theme=new Object();Exhibit.TileView.theme.constructGroup=function(groupLevel,label){var l10n=Exhibit.TileView.l10n;var template={tag:"div",className:"exhibit-collectionView-group",children:[{tag:"h"+(groupLevel+1),children:[label,{tag:"span",className:"exhibit-collectionView-group-count",children:[" (",{tag:"span",field:"countSpan"},")"]}],field:"header"},{tag:"div",className:"exhibit-collectionView-group-content",field:"contentDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};Exhibit.TileView.theme.constructTable=function(){var table=document.createElement("table");table.className="exhibit-tileView-body";return table;};

/* timeline-view-theme.js */

Exhibit.TimelineView.theme=new Object();Exhibit.TimelineView.theme.markers=[{color:"FF9000",textColor:"000000"},{color:"5D7CBA",textColor:"000000"},{color:"A97838",textColor:"000000"},{color:"8B9BBA",textColor:"000000"},{color:"BF955F",textColor:"000000"},{color:"003EBA",textColor:"FFFFFF"},{color:"29447B",textColor:"FFFFFF"},{color:"543C1C",textColor:"FFFFFF"}];Exhibit.TimelineView.theme.constructDom=function(div,uiContext){var l10n=Exhibit.TimelineView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-timelineView-plottableDetails",field:"plottableDiv"}]},{tag:"div",className:"exhibit-timelineView-timelineContainer",field:"timelineContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:function(){dom.timeline.layout();}},dom.timelineContainer,uiContext);dom.timelineDiv=dom.resizableDivWidget.getContentDiv();dom.timelineDiv.className="exhibit-timelineView-timeline";dom.legendWidget=Exhibit.LegendWidget.create({},dom.legendDiv,uiContext);dom.setPlottableCounts=function(resultsCount,plottableCount,originalCount){if(plottableCount!=resultsCount){dom.plottableDiv.style.display="block";dom.plottableDiv.innerHTML=l10n.formatMappableCount(plottableCount);}else{dom.plottableDiv.style.display="none";}};dom.getTimelineDiv=function(){return dom.timelineDiv;};return dom;};

/* view-panel-theme.js */

Exhibit.ViewPanel.theme=new Object();Exhibit.ViewPanel.theme.constructDom=function(div,viewLabels,viewTooltips,onSelectView){var l10n=Exhibit.ViewPanel.l10n;var template={elmt:div,className:"exhibit-viewPanel exhibit-ui-protection",children:[{tag:"div",className:"exhibit-viewPanel-viewSelection",field:"viewSelectionDiv"},{tag:"div",className:"exhibit-viewPanel-viewContainer",field:"viewContainerDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.getViewContainer=function(){return dom.viewContainerDiv;};dom.setViewIndex=function(index){if(viewLabels.length>1){dom.viewSelectionDiv.innerHTML="";var appendView=function(i){var selected=(i==index);if(i>0){dom.viewSelectionDiv.appendChild(document.createTextNode(" \u2022 "));}
var span=document.createElement("span");span.className=selected?"exhibit-viewPanel-viewSelection-selectedView":"exhibit-viewPanel-viewSelection-view";span.title=viewTooltips[i];span.innerHTML=viewLabels[i];if(!selected){var handler=function(elmt,evt,target){onSelectView(i);SimileAjax.DOM.cancelEvent(evt);return false;}
SimileAjax.WindowManager.registerEvent(span,"click",handler);}
dom.viewSelectionDiv.appendChild(span);};for(var i=0;i<viewLabels.length;i++){appendView(i);}}};return dom;};

/* exhibit-theme.js */

Exhibit.Theme={urlPrefix:Exhibit.urlPrefix+"themes/classic/",createTranslucentImage:function(url){return SimileAjax.Graphics.createTranslucentImage(Exhibit.Theme.urlPrefix+url);},createPopupMenuDom:function(element){var div=document.createElement("div");div.className="exhibit-menu-popup exhibit-ui-protection";var dom={elmt:div,close:function(){document.body.removeChild(this.elmt);},open:function(){var self=this;this.layer=SimileAjax.WindowManager.pushLayer(function(){self.close();},true);var docWidth=document.body.offsetWidth;var docHeight=document.body.offsetHeight;var coords=SimileAjax.DOM.getPageCoordinates(element);div.style.top=(coords.top+element.scrollHeight)+"px";div.style.right=(docWidth-(coords.left+element.scrollWidth))+"px";document.body.appendChild(this.elmt);},appendMenuItem:function(label,icon,onClick){var self=this;var a=document.createElement("a");a.className="exhibit-menu-item";a.href="javascript:";SimileAjax.WindowManager.registerEvent(a,"click",function(elmt,evt,target){onClick(elmt,evt,target);SimileAjax.WindowManager.popLayer(self.layer);SimileAjax.DOM.cancelEvent(evt);return false;});var div=document.createElement("div");a.appendChild(div);div.appendChild(SimileAjax.Graphics.createTranslucentImage(icon!=null?icon:(Exhibit.Theme.urlPrefix+"images/blank-16x16.png")));div.appendChild(document.createTextNode(label));this.elmt.appendChild(a);},appendSeparator:function(){var hr=document.createElement("hr");this.elmt.appendChild(hr);}};return dom;},createCopyButton:function(all){var button=document.createElement("button");button.className="exhibit-copyButton screen";button.innerHTML=all?Exhibit.l10n.copyAllButtonLabel:Exhibit.l10n.copyButtonLabel;return button;},createCopyDialogBox:function(string){var template={tag:"div",className:"exhibit-copyDialog exhibit-ui-protection",children:[{tag:"button",field:"closeButton",children:[Exhibit.l10n.copyDialogBoxCloseButtonLabel]},{tag:"p",children:[Exhibit.l10n.copyDialogBoxPrompt]},{tag:"div",field:"textAreaContainer"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.textAreaContainer.innerHTML="<textarea wrap='off' rows='15'>"+string+"</textarea>";dom.close=function(){document.body.removeChild(dom.elmt);};dom.open=function(){dom.elmt.style.top=(document.body.scrollTop+100)+"px";document.body.appendChild(dom.elmt);dom.layer=SimileAjax.WindowManager.pushLayer(function(){dom.close();},false);var textarea=dom.textAreaContainer.firstChild;textarea.select();SimileAjax.WindowManager.registerEvent(dom.closeButton,"click",function(elmt,evt,target){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;},dom.layer);SimileAjax.WindowManager.registerEvent(textarea,"keyup",function(elmt,evt,target){if(evt.keyCode==27){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;}
return true;},dom.layer);};return dom;},createFocusDialogBox:function(itemID,exhibit,configuration){var template={tag:"div",className:"exhibit-focusDialog exhibit-ui-protection",children:[{tag:"div",className:"exhibit-focusDialog-viewContainer",field:"viewContainer"},{tag:"div",className:"exhibit-focusDialog-controls",children:[{tag:"button",field:"closeButton",children:[Exhibit.l10n.focusDialogBoxCloseButtonLabel]}]}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.close=function(){document.body.removeChild(dom.elmt);};dom.open=function(){dom.layer=SimileAjax.WindowManager.pushLayer(function(){dom.close();},false);var lens=new Exhibit.Lens(itemID,dom.viewContainer,exhibit,configuration);dom.elmt.style.top=(document.body.scrollTop+100)+"px";document.body.appendChild(dom.elmt);SimileAjax.WindowManager.registerEvent(dom.closeButton,"click",function(elmt,evt,target){SimileAjax.WindowManager.popLayer(dom.layer);SimileAjax.DOM.cancelEvent(evt);return false;},dom.layer);};return dom;},createBusyIndicator:function(){var urlPrefix=Exhibit.Theme.urlPrefix;var containerDiv=document.createElement("div");if(SimileAjax.Graphics.pngIsTranslucent){var topDiv=document.createElement("div");topDiv.style.height="33px";topDiv.style.background="url("+urlPrefix+"images/message-top-left.png) top left no-repeat";topDiv.style.paddingLeft="44px";containerDiv.appendChild(topDiv);var topRightDiv=document.createElement("div");topRightDiv.style.height="33px";topRightDiv.style.background="url("+urlPrefix+"images/message-top-right.png) top right no-repeat";topDiv.appendChild(topRightDiv);var middleDiv=document.createElement("div");middleDiv.style.background="url("+urlPrefix+"images/message-left.png) top left repeat-y";middleDiv.style.paddingLeft="44px";containerDiv.appendChild(middleDiv);var middleRightDiv=document.createElement("div");middleRightDiv.style.background="url("+urlPrefix+"images/message-right.png) top right repeat-y";middleRightDiv.style.paddingRight="44px";middleDiv.appendChild(middleRightDiv);var contentDiv=document.createElement("div");middleRightDiv.appendChild(contentDiv);var bottomDiv=document.createElement("div");bottomDiv.style.height="55px";bottomDiv.style.background="url("+urlPrefix+"images/message-bottom-left.png) bottom left no-repeat";bottomDiv.style.paddingLeft="44px";containerDiv.appendChild(bottomDiv);var bottomRightDiv=document.createElement("div");bottomRightDiv.style.height="55px";bottomRightDiv.style.background="url("+urlPrefix+"images/message-bottom-right.png) bottom right no-repeat";bottomDiv.appendChild(bottomRightDiv);}else{containerDiv.style.border="2px solid #7777AA";containerDiv.style.padding="20px";containerDiv.style.background="white";SimileAjax.Graphics.setOpacity(containerDiv,90);var contentDiv=document.createElement("div");containerDiv.appendChild(contentDiv);}
containerDiv.className="exhibit-busyIndicator";contentDiv.className="exhibit-busyIndicator-content";var img=document.createElement("img");img.src=urlPrefix+"images/progress-running.gif";contentDiv.appendChild(img);contentDiv.appendChild(document.createTextNode(" "+Exhibit.l10n.busyIndicatorMessage));return containerDiv;}};

/* lens-theme.js */

Exhibit.Lens.theme={createEditButton:function(label){var button=document.createElement("button");button.className="exhibit-lens-editButton";button.innerHTML=label!=null?label:Exhibit.Lens.l10n.editButtonLabel;return button;},createSaveButton:function(label){var button=document.createElement("button");button.className="exhibit-lens-saveButton";button.innerHTML=label!=null?label:Exhibit.Lens.l10n.saveButtonLabel;return button;}}

/* map-view-theme.js */

Exhibit.MapView.theme=new Object();Exhibit.MapView.theme.constructDom=function(div,uiContext){var l10n=Exhibit.MapView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-mapView-mappableDetails",field:"mappableDiv"}]},{tag:"div",className:"exhibit-mapView-mapContainer",field:"mapContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:function(){dom.map.checkResize();}},dom.mapContainer,uiContext);dom.mapDiv=dom.resizableDivWidget.getContentDiv();dom.mapDiv.className="exhibit-mapView-map";dom.legendWidget=Exhibit.LegendWidget.create({markerGenerator:function(color){var shape="square";return SimileAjax.Graphics.createTranslucentImage(Exhibit.MapView._markerUrlPrefix+
[shape,color,["m",shape,color,"legend.png"].join("-")].join("/"));}},dom.legendDiv,uiContext);dom.setMappableCounts=function(resultsCount,mappableCount){if(mappableCount!=resultsCount){dom.mappableDiv.style.display="block";dom.mappableDiv.innerHTML=l10n.formatMappableCount(mappableCount);}else{dom.mappableDiv.style.display="none";}};dom.getMapDiv=function(){return dom.mapDiv;};return dom;};

/* ordered-view-frame-theme.js */

Exhibit.OrderedViewFrame.theme=new Object();Exhibit.OrderedViewFrame.theme.createHeaderDom=function(exhibit,headerDiv,onThenSortBy,onGroupToggle,onShowDuplicatesToggle,generatedContentElmtRetriever){var l10n=Exhibit.OrderedViewFrame.l10n;var headerTemplate={elmt:headerDiv,className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",field:"sortControlsDiv",className:"exhibit-collectionView-header-sortControls",children:l10n.createSortingControlsTemplate(Exhibit.UI.makeActionLink(l10n.thenSortByLabel,onThenSortBy)).concat([" \u2022 ",{tag:"span",field:"groupSpan",className:"exhibit-collectionView-header-groupControls",children:[{elmt:Exhibit.Theme.createTranslucentImage("images/option.png"),field:"groupOption",style:{display:"none"}},{elmt:Exhibit.Theme.createTranslucentImage("images/option-check.png"),field:"groupOptionChecked",style:{display:"none"}}," ",l10n.groupedAsSorted]}," \u2022 ",{tag:"span",field:"duplicateSpan",className:"exhibit-collectionView-header-duplicateControls",children:[{elmt:Exhibit.Theme.createTranslucentImage("images/option.png"),field:"duplicateOption",style:{display:"none"}},{elmt:Exhibit.Theme.createTranslucentImage("images/option-check.png"),field:"duplicateOptionChecked",style:{display:"none"}}," ",l10n.showDuplicates]}])}]};var dom=SimileAjax.DOM.createDOMFromTemplate(headerTemplate);SimileAjax.WindowManager.registerEvent(dom.groupSpan,"click",onGroupToggle);SimileAjax.WindowManager.registerEvent(dom.duplicateSpan,"click",onShowDuplicatesToggle);dom.setOrders=function(orderDoms){dom.ordersSpan.innerHTML="";var addDelimiter=Exhibit.l10n.createListDelimiter(dom.ordersSpan,orderDoms.length);for(var i=0;i<orderDoms.length;i++){addDelimiter();dom.ordersSpan.appendChild(orderDoms[i].elmt);}
addDelimiter();};dom.setGrouped=function(grouped){dom.groupOption.style.display=grouped?"none":"inline";dom.groupOptionChecked.style.display=grouped?"inline":"none";};dom.setShowDuplicates=function(show){dom.duplicateOption.style.display=show?"none":"inline";dom.duplicateOptionChecked.style.display=show?"inline":"none";};dom.enableThenByAction=function(enabled){Exhibit.UI.enableActionLink(dom.thenByLink,enabled);};return dom;};Exhibit.OrderedViewFrame.theme.createOrderDom=function(label,onPopup){var a=Exhibit.UI.makeActionLink(label,onPopup);return{elmt:a};}
Exhibit.OrderedViewFrame.theme.createFooterDom=function(exhibit,footerDiv,onShowAll,onDontShowAll){var l10n=Exhibit.OrderedViewFrame.l10n;var footerTemplate={elmt:footerDiv,className:"exhibit-collectionView-footer screen",children:[]};var dom=SimileAjax.DOM.createDOMFromTemplate(footerTemplate);dom.setCounts=function(count,limitCount,showAll,canToggle){dom.elmt.innerHTML="";if(canToggle&&count>limitCount){if(showAll){dom.elmt.appendChild(Exhibit.UI.makeActionLink(l10n.formatDontShowAll(limitCount),onDontShowAll));}else{dom.elmt.appendChild(Exhibit.UI.makeActionLink(l10n.formatShowAll(count),onShowAll));}}};return dom;}

/* pivot-table-view-theme.js */

Exhibit.PivotTableView.theme=new Object();Exhibit.PivotTableView.theme.constructDom=function(div){var l10n=Exhibit.PivotTableView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",field:"collectionSummaryDiv"},{tag:"div",field:"tableContainer",className:"exhibit-pivotTableView-tableContainer"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};

/* scatter-plot-view-theme.js */

Exhibit.ScatterPlotView.theme=new Object();Exhibit.ScatterPlotView.theme.constructDom=function(div,onResize,uiContext){var l10n=Exhibit.ScatterPlotView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-scatterPlotView-mappableDetails",field:"plottableDiv"}]},{tag:"div",field:"plotOuterContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:onResize},dom.plotOuterContainer,uiContext);dom.plotContainer=dom.resizableDivWidget.getContentDiv();dom.plotContainer.className="exhibit-scatterPlotView-plotContainer";dom.legendWidget=Exhibit.LegendWidget.create({},dom.legendDiv,uiContext);dom.setPlottableCounts=function(resultsCount,plottableCount){if(plottableCount!=resultsCount){dom.plottableDiv.style.display="block";dom.plottableDiv.innerHTML=l10n.formatMappableCount(plottableCount);}else{dom.plottableDiv.style.display="none";}};return dom;};

/* tabular-view-theme.js */

Exhibit.TabularView.theme=new Object();Exhibit.TabularView.theme.createDom=function(div){var l10n=Exhibit.TabularView.l10n;var headerTemplate={elmt:div,className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",field:"bodyDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(headerTemplate);};Exhibit.TabularView.theme.createColumnHeader=function(exhibit,th,label,sort,sortAscending,sortFunction){var l10n=Exhibit.TabularView.l10n;var template={elmt:th,className:sort?"exhibit-tabularView-columnHeader-sorted":"exhibit-tabularView-columnHeader",title:sort?l10n.columnHeaderReSortTooltip:l10n.columnHeaderSortTooltip,children:[label]};if(sort){template.children.push({elmt:Exhibit.Theme.createTranslucentImage(sortAscending?"images/up-arrow.png":"images/down-arrow.png")});}
SimileAjax.WindowManager.registerEvent(th,"click",sortFunction,null);var dom=SimileAjax.DOM.createDOMFromTemplate(template);return dom;};

/* thumbnail-view-theme.js */

Exhibit.ThumbnailView.theme=new Object();Exhibit.ThumbnailView.theme.constructGroup=function(groupLevel,label){var l10n=Exhibit.ThumbnailView.l10n;var template={tag:"div",className:"exhibit-thumbnailView-group",children:[{tag:"h"+(groupLevel+1),children:[label,{tag:"span",className:"exhibit-collectionView-group-count",children:[" (",{tag:"span",field:"countSpan"},")"]}],field:"header"},{tag:"div",className:"exhibit-collectionView-group-content",field:"contentDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};Exhibit.ThumbnailView.theme.constructItemContainer=function(){var div=document.createElement("div");div.className="exhibit-thumbnailView-body";return div;};

/* tile-view-theme.js */

Exhibit.TileView.theme=new Object();Exhibit.TileView.theme.constructGroup=function(groupLevel,label){var l10n=Exhibit.TileView.l10n;var template={tag:"div",className:"exhibit-collectionView-group",children:[{tag:"h"+(groupLevel+1),children:[label,{tag:"span",className:"exhibit-collectionView-group-count",children:[" (",{tag:"span",field:"countSpan"},")"]}],field:"header"},{tag:"div",className:"exhibit-collectionView-group-content",field:"contentDiv"}]};return SimileAjax.DOM.createDOMFromTemplate(template);};Exhibit.TileView.theme.constructTable=function(){var table=document.createElement("table");table.className="exhibit-tileView-body";return table;};

/* timeline-view-theme.js */

Exhibit.TimelineView.theme=new Object();Exhibit.TimelineView.theme.markers=[{color:"FF9000",textColor:"000000"},{color:"5D7CBA",textColor:"000000"},{color:"A97838",textColor:"000000"},{color:"8B9BBA",textColor:"000000"},{color:"BF955F",textColor:"000000"},{color:"003EBA",textColor:"FFFFFF"},{color:"29447B",textColor:"FFFFFF"},{color:"543C1C",textColor:"FFFFFF"}];Exhibit.TimelineView.theme.constructDom=function(div,uiContext){var l10n=Exhibit.TimelineView.l10n;var template={elmt:div,children:[{tag:"div",className:"exhibit-collectionView-header",children:[{tag:"div",field:"collectionSummaryDiv"},{tag:"div",className:"exhibit-timelineView-plottableDetails",field:"plottableDiv"}]},{tag:"div",className:"exhibit-timelineView-timelineContainer",field:"timelineContainer"},{tag:"div",field:"legendDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.resizableDivWidget=Exhibit.ResizableDivWidget.create({onResize:function(){dom.timeline.layout();}},dom.timelineContainer,uiContext);dom.timelineDiv=dom.resizableDivWidget.getContentDiv();dom.timelineDiv.className="exhibit-timelineView-timeline";dom.legendWidget=Exhibit.LegendWidget.create({},dom.legendDiv,uiContext);dom.setPlottableCounts=function(resultsCount,plottableCount,originalCount){if(plottableCount!=resultsCount){dom.plottableDiv.style.display="block";dom.plottableDiv.innerHTML=l10n.formatMappableCount(plottableCount);}else{dom.plottableDiv.style.display="none";}};dom.getTimelineDiv=function(){return dom.timelineDiv;};return dom;};

/* view-panel-theme.js */

Exhibit.ViewPanel.theme=new Object();Exhibit.ViewPanel.theme.constructDom=function(div,viewLabels,viewTooltips,onSelectView){var l10n=Exhibit.ViewPanel.l10n;var template={elmt:div,className:"exhibit-viewPanel exhibit-ui-protection",children:[{tag:"div",className:"exhibit-viewPanel-viewSelection",field:"viewSelectionDiv"},{tag:"div",className:"exhibit-viewPanel-viewContainer",field:"viewContainerDiv"}]};var dom=SimileAjax.DOM.createDOMFromTemplate(template);dom.getViewContainer=function(){return dom.viewContainerDiv;};dom.setViewIndex=function(index){if(viewLabels.length>1){dom.viewSelectionDiv.innerHTML="";var appendView=function(i){var selected=(i==index);if(i>0){dom.viewSelectionDiv.appendChild(document.createTextNode(" \u2022 "));}
var span=document.createElement("span");span.className=selected?"exhibit-viewPanel-viewSelection-selectedView":"exhibit-viewPanel-viewSelection-view";span.title=viewTooltips[i];span.innerHTML=viewLabels[i];if(!selected){var handler=function(elmt,evt,target){onSelectView(i);SimileAjax.DOM.cancelEvent(evt);return false;}
SimileAjax.WindowManager.registerEvent(span,"click",handler);}
dom.viewSelectionDiv.appendChild(span);};for(var i=0;i<viewLabels.length;i++){appendView(i);}}};return dom;};