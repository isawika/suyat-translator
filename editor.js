/* editor.js - code for reading the keyboard and updating the Hanunoo output textbox */

const source = '#input1';
const target = '#output1';
const baybayin = new Suyat('baybayin');
const buhid = new Suyat('buhid');
const hanunoo = new Suyat('hanunoo');
const tagbanwa = new Suyat('tagbanwa');
var script = baybayin;


function setScript(name) {
    switch (name) {
        case 'baybayin':  script = baybayin; break;
        case 'buhid':  script = buhid; break;
        case 'hanunoo':  script = hanunoo; break;
        case 'tagbanwa':  script = tagbanwa; break;
    }
    $(source).val('');
    $(target).html('');
}

$(document).ready(function(){
    $('#missing-fonts-help').hide();
});


// Use stealth mode for Wordpress-compatibility
// https://premium.wpmudev.org/blog/adding-jquery-scripts-wordpress/
(function($) {  
    var inTextPrevious = null;

    $(source).on('keydown', function(evt) {
        // Cache the input buffer so we can later examine what changed
        inTextPrevious = $(source).val();
    });

    $(source).on('input', function(evt) {
        var inText = $(source).val();
        var outText = $(target).val();
        var workBuffer = inTextPrevious;

        if (inText.length > inTextPrevious.length) {
            var newChars = inText.slice(inTextPrevious.length);
            for (ch of newChars) {
                if (script.isSuyatChar(ch)) {
                    var cmd = script.computeChangeOnAdd(workBuffer, ch);
                    var numDelete = cmd[0];
                    var syllable = cmd[1];
                    if (numDelete > 0) {
                        outText = outText.slice(0, -numDelete);
                    }
                    outText += script.wordToGlyph(syllable);
                } else {
                    // Output non-Filipino characters as is
                    outText += ch;
                }
                workBuffer += ch;
            }
            $(target).html(outText);

        } else if (inText.length == inTextPrevious.length - 1) { 
            var lastChar = inTextPrevious.charAt(inTextPrevious.length - 1);

            if (script.isSuyatChar(lastChar)) {
                var cmd = script.computeChangeOnDelete(inTextPrevious);
                var numDelete = cmd[0];
                var newChars = cmd[1];
                if (numDelete > 0) {
                    outText = outText.slice(0, -numDelete);
                }
                outText += script.wordToGlyph(newChars);        
                $(target).html(outText);
            } else {
                // Delete the last non-Hanunoo character
                $(target).html(outText.slice(0, -1));
            }

        } else {
            var outbuf = script.translateBulk(inText);
            $(target).html(outbuf);
        }
    });


})( jQuery );