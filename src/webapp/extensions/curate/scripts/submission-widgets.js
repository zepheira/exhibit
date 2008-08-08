Exhibit.Submission = {};

Exhibit.Submission.submissionWidgets = ['submission-property', 'submission-button'];

Exhibit.Submission.enableWidgets = function() {
    Exhibit.UI.findAttribute('ex:role', Exhibit.Submission.submissionWidgets)
        .attr('disabled', false);
}

Exhibit.Submission.disableWidgets = function() {
    Exhibit.UI.findAttribute('ex:role', Exhibit.Submission.submissionWidgets)
        .attr('disabled', true);
}

Exhibit.Submission.resetAfterSubmission = function(uiContext) {
    Exhibit.UI.findAttribute('ex:role', 'submission-property').val("");
    Exhibit.Submission.Properties = {};
    uiContext.getDatabase().resetChanges();
    Exhibit.Submission.enableWidgets();
    Exhibit.ChangeList.showSubmissionText = true;
    uiContext.getDatabase()._listeners.fire("onAfterLoadingItems", []);
};

//=============================================================================
// Submission Properties
//=============================================================================

// Submission Properties are user-defined properties that apply to all
// submitted changes -- timestamp
Exhibit.Submission.Properties = {};

Exhibit.SubmissionProperty = function(elmt, uiContext, settings) {
    elmt.value = ""; // clear bogus autocompletion
    
    if (!settings.propertyName) {
        SimileAjax.Debug.warn("No propertyName given for SubmissionProperty");
    } else {
        SimileAjax.jQuery(elmt).change(function(){
            Exhibit.Submission.Properties[settings.propertyName] = elmt.value;
        });
    }
};

Exhibit.SubmissionProperty._settingSpecs = {
    propertyName: { type: "text" },
    propertyType: { type: "text", defaultValue: "normal" }
};

Exhibit.UI.generateCreationMethods(Exhibit.SubmissionProperty);
Exhibit.UI.registerComponent('submission-property', Exhibit.SubmissionProperty);


//=============================================================================
// Submission Button
//=============================================================================


Exhibit.SubmissionButton = function(elmt, uiContext, settings) {
    var f = function() { 
        Exhibit.Submission.disableWidgets();
        
        var options = Exhibit.SubmissionBackend.getOutputOptions();
        var itemChanges = uiContext.getDatabase().collectChanges();
        var submissionProperties = Exhibit.Submission.Properties;
        
        var changes = Exhibit.SubmissionBackend.formatChanges(itemChanges, submissionProperties, options.timestampName);
        
        var fSuccess = function() {
            alert("Changes successfully made!");
            Exhibit.Submission.resetAfterSubmission(uiContext);
        };
        
        var fError = function() {
            alert('Error submitting data!');
            Exhibit.Submission.enableWidgets();
        };
        
        Exhibit.SubmissionBackend.submitChanges(changes, options, fSuccess, fError);
    };
    SimileAjax.jQuery(elmt).click(f);
}

Exhibit.SubmissionButton._settingSpecs = {};

Exhibit.UI.generateCreationMethods(Exhibit.SubmissionButton);
Exhibit.UI.registerComponent('submission-button', Exhibit.SubmissionButton);