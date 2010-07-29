/*==================================================
 *  Exhibit.Database Norwegian (Bokm�l) localization
 *==================================================
 */

if (!("l10n" in Exhibit.Database)) {
    Exhibit.Database.l10n = {};
}

Exhibit.Database.l10n.itemType = {
    label:          "Objekt",
    pluralLabel:    "Objekter",
    uri:            "http://simile.mit.edu/2006/11/exhibit#Item"
};
Exhibit.Database.l10n.labelProperty = {
    label:                  "merkelapp",
    pluralLabel:            "merkelapper",
    reverseLabel:           "merkelapp for",
    reversePluralLabel:     "merkelapper for"
};
Exhibit.Database.l10n.typeProperty = {
    label:                  "type",
    pluralLabel:            "typer",
    reverseLabel:           "type av",
    reversePluralLabel:     "typer av"
};
Exhibit.Database.l10n.uriProperty = {
    label:                  "URI",
    pluralLabel:            "URIer",
    reverseLabel:           "URI av",
    reversePluralLabel:     "URIs av"
};
Exhibit.Database.l10n.sortLabels = {
    "text": {
        ascending:  "a - �",
        descending: "� - a"
    },
    "number": {
        ascending:  "minste f�rst",
        descending: "st�rste f�rst"
    },
    "date": {
        ascending:  "tidligste f�rst",
        descending: "nyeste f�rst"
    },
    "boolean": {
        ascending:  "usanne f�rst",
        descending: "sanne f�rst"
    },
    "item": {
        ascending:  "a - �",
        descending: "� - a"
    }
};

Exhibit.Database.l10n.labelItemsOfType = function(count, typeID, database, countStyleClass) {
    var label = count == 1 ? Exhibit.Database.l10n.itemType.label :
        Exhibit.Database.l10n.itemType.pluralLabel
        
    var type = database.getType(typeID);
    if (type) {
        label = type.getLabel();
        if (count != 1) {
            var pluralLabel = type.getProperty("pluralLabel");
            if (pluralLabel) {
                label = pluralLabel;
            }
        }
    }
    
    var span = document.createElement("span");
    span.innerHTML = "<span class='" + countStyleClass + "'>" + count + "</span> " + label;
    
    return span;
};
