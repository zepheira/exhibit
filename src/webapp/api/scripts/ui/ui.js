/*======================================================================
 *  Exhibit UI Utilities
 *======================================================================
 */
Exhibit.UI = new Object();

/*----------------------------------------------------------------------
 *  Component instantiation functions
 *----------------------------------------------------------------------
 */
Exhibit.UI.create = function(configuration, elmt, uiContext) {
    if ("role" in configuration) {
        var role = configuration.role;
        if (role != null && role.startsWith("exhibit-")) {
            role = role.substr("exhibit-".length);
        }
        
        switch (role) {
        case "lens":
            Exhibit.UIContext.registerLens(configuration, uiContext.getLensRegistry());
            return null;
        case "view":
            return Exhibit.UI.createView(configuration, elmt, uiContext);
        case "facet":
            return Exhibit.UI.createFacet(configuration, elmt, uiContext);
        case "viewPanel":
            return Exhibit.ViewPanel.create(configuration, elmt, uiContext);
        case "logo":
            return Exhibit.Logo.create(configuration, elmt, uiContext);
        case "hiddenContent":
            elmt.style.display = "none";
            return null;
        }
    }
    return null;
};

Exhibit.UI.createFromDOM = function(elmt, uiContext) {
    var role = Exhibit.getRoleAttribute(elmt);
    switch (role) {
    case "lens":
        Exhibit.UIContext.registerLensFromDOM(elmt, uiContext.getLensRegistry());
        return null;
    case "view":
        return Exhibit.UI.createViewFromDOM(elmt, null, uiContext);
    case "facet":
        return Exhibit.UI.createFacetFromDOM(elmt, null, uiContext);
    case "viewPanel":
        return Exhibit.ViewPanel.createFromDOM(elmt, uiContext);
    case "logo":
        return Exhibit.Logo.createFromDOM(elmt, uiContext);
    case "hiddenContent":
        elmt.style.display = "none";
        return null;
    }
    return null;
};

Exhibit.UI.createView = function(configuration, elmt, uiContext) {
    var viewClass = "viewClass" in configuration ? configuration.viewClass : Exhibit.TileView;
    return viewClass.create(configuration, elmt, uiContext);
};

Exhibit.UI.createViewFromDOM = function(elmt, container, uiContext) {
    var viewClassString = Exhibit.getAttribute(elmt, "viewClass");
    var viewClass = Exhibit.TileView;
    
    if (viewClassString != null && viewClassString.length > 0) {
        viewClass = Exhibit.UI.viewClassNameToViewClass(viewClassString);
        if (viewClass == null) {
            SimileAjax.Debug.warn("Unknown viewClass " + viewClassString);
        }
    }
    return viewClass.createFromDOM(elmt, container, uiContext);
};

Exhibit.UI.viewClassNameToViewClass = function(name) {
    return Exhibit.UI._stringToObject(name, "View");
};

Exhibit.UI.createFacet = function(configuration, elmt, uiContext) {
    var facetClass = "facetClass" in configuration ? configuration.facetClass : Exhibit.ListFacet;
    return facetClass.create(configuration, elmt, container, uiContext);
};

Exhibit.UI.createFacetFromDOM = function(elmt, container, uiContext) {
    var facetClassString = Exhibit.getAttribute(elmt, "facetClass");
    var facetClass = Exhibit.ListFacet;
    if (facetClassString != null && facetClassString.length > 0) {
        facetClass = Exhibit.UI._stringToObject(facetClassString, "Facet");
        if (facetClass == null) {
            SimileAjax.Debug.warn("Unknown facetClass " + facetClassString);
        }
    }
    
    return facetClass.createFromDOM(elmt, container, uiContext);
};

Exhibit.UI._stringToObject = function(name, suffix) {
    if (!name.startsWith("Exhibit.")) {
        if (!name.endsWith(suffix)) {
            try {
                return eval("Exhibit." + name + suffix);
            } catch (e) {
                // ignore
            }
        }
        
        try {
            return eval("Exhibit." + name);
        } catch (e) {
            // ignore
        }
    }
    
    if (!name.endsWith(suffix)) {
        try {
            return eval(name + suffix);
        } catch (e) {
            // ignore
        }
    }
    
    try {
        return eval(name);
    } catch (e) {
        // ignore
    }
    
    return null;
};

/*----------------------------------------------------------------------
 *  Help and Debugging
 *----------------------------------------------------------------------
 */
Exhibit.UI.docRoot = "http://simile.mit.edu/wiki/";
Exhibit.UI.validator = "http://simile.mit.edu/babel/validator";

Exhibit.UI.showHelp = function(message, url, target) {
    target = (target) ? target : "_blank";
    if (url != null) {
        if (window.confirm(message + "\n\n" + Exhibit.l10n.showDocumentationMessage)) {
            window.open(url, target);
        }
    } else {
        window.alert(message);
    }
};

Exhibit.UI.showJavascriptExpressionValidation = function(message, expression) {
    var target = "_blank";
    if (window.confirm(message + "\n\n" + Exhibit.l10n.showJavascriptValidationMessage)) {
        window.open(Exhibit.UI.validator + "?expresson=" + encodeURIComponent(expression), target);
    }
};

Exhibit.UI.showJsonFileValidation = function(message, url) {
    var target = "_blank";
    if (url.indexOf("file:") == 0) {
        if (window.confirm(message + "\n\n" + Exhibit.l10n.showJsonValidationFormMessage)) {
            window.open(Exhibit.UI.validator, target);
        }
    } else {
        if (window.confirm(message + "\n\n" + Exhibit.l10n.showJsonValidationMessage)) {
            window.open(Exhibit.UI.validator + "?url=" + url, target);
        }
    }
};

/*----------------------------------------------------------------------
 *  Status Indication and Feedback
 *----------------------------------------------------------------------
 */
Exhibit.UI._busyIndicator = null;
Exhibit.UI._busyIndicatorCount = 0;

Exhibit.UI.showBusyIndicator = function() {
    Exhibit.UI._busyIndicatorCount++;
    if (Exhibit.UI._busyIndicatorCount > 1) {
        return;
    }
    
    if (Exhibit.UI._busyIndicator == null) {
        Exhibit.UI._busyIndicator = Exhibit.Theme.createBusyIndicator();
    }
    
    var scrollTop = ("scrollTop" in document.body) ?
        document.body.scrollTop :
        document.body.parentNode.scrollTop;
    var height = ("innerHeight" in window) ?
        window.innerHeight :
        ("clientHeight" in document.body ?
            document.body.clientHeight :
            document.body.parentNode.clientHeight);
        
    var top = Math.floor(scrollTop + height / 3);
    
    Exhibit.UI._busyIndicator.style.top = top + "px";
    document.body.appendChild(Exhibit.UI._busyIndicator);
};

Exhibit.UI.hideBusyIndicator = function() {
    Exhibit.UI._busyIndicatorCount--;
    if (Exhibit.UI._busyIndicatorCount > 0) {
        return;
    }
    
    try {
        document.body.removeChild(Exhibit.UI._busyIndicator);
    } catch(e) {
        // silent
    }
};

/*----------------------------------------------------------------------
 *  Common UI Generation
 *----------------------------------------------------------------------
 */
Exhibit.UI.protectUI = function(elmt) {
    SimileAjax.DOM.appendClassName(elmt, "exhibit-ui-protection");
};

Exhibit.UI.makeActionLink = function(text, handler, layer) {
    var a = document.createElement("a");
    a.href = "javascript:";
    a.className = "exhibit-action";
    a.innerHTML = text;
    
    var handler2 = function(elmt, evt, target) {
        if ("true" != elmt.getAttribute("disabled")) {
            handler(elmt, evt, target);
        }
    }
    SimileAjax.WindowManager.registerEvent(a, "click", handler2, layer);
    
    return a;
};

Exhibit.UI.enableActionLink = function(a, enabled) {
    a.setAttribute("disabled", enabled ? "false" : "true");
    a.className = enabled ? "exhibit-action" : "exhibit-action-disabled";
};

Exhibit.UI.makeItemSpan = function(itemID, label, uiContext, layer) {
    if (label == null) {
        label = database.getObject(itemID, "label");
        if (label == null) {
            label = itemID;
        }
    }
    
    var a = SimileAjax.DOM.createElementFromString(document,
        "<a href=\"" + Exhibit.Persistence.getItemLink(itemID) + "\" class='exhibit-item'>" + label + "</a>");
        
    var handler = function(elmt, evt, target) {
        Exhibit.UI.showItemInPopup(itemID, elmt, uiContext);
    }
    SimileAjax.WindowManager.registerEvent(a, "click", handler, layer);
    
    return a;
};

Exhibit.UI.makeValueSpan = function(label, valueType, layer) {
    var span = document.createElement("span");
    span.className = "exhibit-value";
    if (valueType == "url") {
        span.innerHTML = 
            "<a href=\"" + label + "\" target='_blank'>" +
                (label.length > 50 ? 
                    label.substr(0, 20) + " ... " + label.substr(label.length - 20) :
                    label) +
            "</a>";
    } else {
        span.innerHTML = label;
    }
    return span;
};

Exhibit.UI.showItemInPopup = function(itemID, elmt, uiContext) {
    var coords = SimileAjax.DOM.getPageCoordinates(elmt);
    var bubble = SimileAjax.Graphics.createBubbleForPoint(
        document, 
        coords.left + Math.round(elmt.offsetWidth / 2), 
        coords.top + Math.round(elmt.offsetHeight / 2), 
        uiContext.getSetting("bubbleWidth"),
        uiContext.getSetting("bubbleHeight")
    );
    
    var itemLensDiv = document.createElement("div");
    var itemLens = uiContext.getLensRegistry().createLens(itemID, itemLensDiv, uiContext);
    bubble.content.appendChild(itemLensDiv);
};

Exhibit.UI.makeCopyButton = function(itemID, database, layer) {
    var button = Exhibit.Theme.createCopyButton(false);
    var handler = function(elmt, evt, target) {
        Exhibit.UI._showCopyMenu(elmt, itemID, database);
    }
    SimileAjax.WindowManager.registerEvent(button, "click", handler);
        
    return button;
};

Exhibit.UI._showCopyMenu = function(elmt, itemID, database) {
    var popupDom = Exhibit.Theme.createPopupMenuDom(elmt);
    
    var makeMenuItem = function(exporter) {
        popupDom.appendMenuItem(
            exporter.getLabel(),
            null,
            function() {
                var text = exporter.exportOne(itemID, database);
                Exhibit.Theme.createCopyDialogBox(text).open();
            }
        );
    }
    
    var exporters = Exhibit.getExporters();
    for (var i = 0; i < exporters.length; i++) {
        makeMenuItem(exporters[i]);
    }
    
    popupDom.open();
};

