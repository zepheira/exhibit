/*==================================================
 *  Exhibit.ViewPanel Norwegian (Bokm�l) localization
 *==================================================
 */

if (!("l10n" in Exhibit.ViewPanel)) {
    Exhibit.ViewPanel.l10n = {};
}

Exhibit.ViewPanel.l10n.createSelectViewActionTitle = function(viewLabel) {
    return "velg " + viewLabel + " visning";
};
Exhibit.ViewPanel.l10n.missingViewClassMessage = " The specification for one of the views is missing the viewClass field.";
Exhibit.ViewPanel.l10n.viewClassNotFunctionMessage = function(expr) {
    return "Din attributtverdi for viewClass '" + expr + "' som du har valgt\n" +
        "gir ikke et gyldig resultat fra Javascriptfunksjonen.";
};
Exhibit.ViewPanel.l10n.badViewClassMessage = function(expr) {
    return "The viewClass attribute value '" + expr + "' you have specified\n" +
        "for one of the views is not a valid Javascript expression.";
};
