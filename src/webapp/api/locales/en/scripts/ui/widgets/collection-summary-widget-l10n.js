/*==================================================
 *  Exhibit.CollectionSummaryWidget Norwegian (Bokm�l) localization
 *==================================================
 */

if (!("l10n" in Exhibit.CollectionSummaryWidget)) {
    Exhibit.CollectionSummaryWidget.l10n = {};
}

Exhibit.CollectionSummaryWidget.l10n.resetFiltersLabel = "Fjern alle filter";
Exhibit.CollectionSummaryWidget.l10n.resetFiltersTooltip = "Fjern alle filter og se de opprinnelige";
Exhibit.CollectionSummaryWidget.l10n.resetActionTitle = "Nullstill alle filter";

Exhibit.CollectionSummaryWidget.l10n.allResultsTemplate =
    "<span class='%0' id='resultDescription'></span>";

Exhibit.CollectionSummaryWidget.l10n.noResultsTemplate =
    "<span class='%0'><span class='%1'>0</span> treff</span> (<span id='resetActionLink'></span>)";

Exhibit.CollectionSummaryWidget.l10n.filteredResultsTemplate =
    "<span class='%0' id='resultDescription'></span> " +
    "filtrert fra <span id='originalCountSpan'>0</span> opprinnelig (<span id='resetActionLink'></span>)";
