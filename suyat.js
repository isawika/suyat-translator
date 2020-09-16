/* suyat.js 

    Translator for Philippine indigenous scripts (aka "suyat") including:
      * Baybayin (Tagalog)
      * Buhid (Mindoro)
      * Hanunoo-Mangyan (Mindoro)
      * Tagbanwa (Palawan)

    Supports batch (process a text file) and live (as you type) translation.
    More info on https://github.com/benbongalon/suyat-translator

   
    Copyright 2020, Ben Bongalon (ben.bongalon@gmail.com)

    Redistribution and use in source and binary forms, with or without modification, 
    are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this 
    list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, 
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors 
    may be used to endorse or promote products derived from this software without 
    specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
    IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
    INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
    DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR 
    OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
    THE POSSIBILITY OF SUCH DAMAGE.
*/


const BAYBAYIN_PROPS = {
    'name': 'baybayin',
    'vowels': ['a', 'e', 'i', 'o', 'u'],
    'consonants': ['b', 'k', 'd', 'g', 'h', 'l','m', 'n', 
                   'ng', 'p', 'r', 's', 't', 'w', 'y'],
    'reVowels' : 'aeiou',
    'reCons' : 'bkdghlmnprstwy',
    'i_kudlit': '&#x1712;',
    'u_kudlit': '&#x1713;',
    'virama': '&#x1714;',
    'VIRAMA_LENGTH': 1,
    'PAD': '',
    'PAD_LENGTH': 0,
    'danda': '&#x1734;',  // single punct '/' (single devanagari danda)
    'danda2': '&#x1735;', // double punct '//' (double devanagari danda)
    'glyphs': {
        'a': '&#x1700;',
        'e': '&#x1701;', // same as 'i'
        'i': '&#x1701;',
        'o': '&#x1702;', // same as 'u'
        'u': '&#x1702;',
        'ba': '&#x170A;',
        'ka': '&#x1703;',
        'da': '&#x1707;',
        'ga': '&#x1704;',
        'ha': '&#x1711;',
        'la': '&#x170E;',
        'ma': '&#x170B;',
        'na': '&#x1708;',
        'nga': '&#x1705;',
        'pa': '&#x1709;',
        'ra': '&#x1707;', // same as 'da'
        'sa': '&#x1710;',
        'ta': '&#x1706;',
        'wa': '&#x170F;',
        'ya': '&#x170C;'
    }
};

const BUHID_PROPS = {
    'name': 'buhid',
    'vowels': ['a', 'e', 'i', 'o', 'u'],
    'consonants': ['b', 'k', 'd', 'g', 'h', 'l','m', 'n', 
                   'ng', 'p', 'r', 's', 't', 'w', 'y'],
    'reVowels' : 'aeiou',
    'reCons' : 'bkdghlmnprstwy',
    'i_kudlit': '&#x1752;',
    'u_kudlit': '&#x1753;',
    'virama': '',  // no virama
    'VIRAMA_LENGTH': 0,
    'PAD': '',
    'PAD_LENGTH': 0,
    'danda': '&#x1734;',  // single punct '/' (single devanagari danda) -> same as Baybayin?
    'danda2': '&#x1735;', // double punct '//' (double devanagari danda) -> same as Baybayin?
    'glyphs': {
        'a': '&#x1740;',
        'e': '&#x1741;', // same as 'i'
        'i': '&#x1741;',
        'o': '&#x1742;', // same as 'u'
        'u': '&#x1742;',
        'ba': '&#x174A;',
        'ka': '&#x1743;',
        'da': '&#x1747;',
        'ga': '&#x1744;',
        'ha': '&#x1751;',
        'la': '&#x174E;',
        'ma': '&#x174B;',
        'na': '&#x1748;',
        'nga': '&#x1745;',
        'pa': '&#x1749;',
        'ra': '&#x174D;',
        'sa': '&#x1750;',
        'ta': '&#x1746;',
        'wa': '&#x174F;',
        'ya': '&#x174C;'
    }
};

const HANUNOO_PROPS = {
    'name': 'hanunoo',
    'vowels': ['a', 'e', 'i', 'o', 'u'],
    'consonants': ['b', 'k', 'd', 'g', 'h', 'l','m', 'n', 
                   'ng', 'p', 'r', 's', 't', 'w', 'y'],
    'reVowels' : 'aeiou',
    'reCons' : 'bkdghlmnprstwy',
    'i_kudlit': '&#x1732;',
    'u_kudlit': '&#x1733;',
    'virama': '&#x1734;',
    'VIRAMA_LENGTH': 1,
    'PAD': '&nbsp;&nbsp;&nbsp;',
    'PAD_LENGTH': 3,
    'danda': '&#x1734;',  // single punct '/' (single devanagari danda) -> same as Baybayin?
    'danda2': '&#x1735;', // double punct '//' (double devanagari danda) -> same as Baybayin?
    'glyphs': {
        'a': '&#x1720;',
        'e': '&#x1721;', // same as 'i'
        'i': '&#x1721;',
        'o': '&#x1722;', // same as 'u'
        'u': '&#x1722;',
        'ba': '&#x172A;',
        'ka': '&#x1723;',
        'da': '&#x1727;',
        'ga': '&#x1724;',
        'ha': '&#x1731;',
        'la': '&#x172E;',
        'ma': '&#x172B;',
        'na': '&#x1728;',
        'nga': '&#x1725;',
        'pa': '&#x1729;',
        'ra': '&#x172D;',
        'sa': '&#x1730;',
        'ta': '&#x1726;',
        'wa': '&#x172F;',
        'ya': '&#x172C;'
    }
};

const TAGBANWA_PROPS = {
    'name': 'tagbanwa',
    'vowels': ['a', 'e', 'i', 'o', 'u'],
    'consonants': ['b', 'k', 'd', 'g', 'l','m', 'n',  // no 'h' and 'r'
                   'ng', 'p', 's', 't', 'w', 'y'],
    'reVowels' : 'aeiou',
    'reCons' : 'bkdglmnpstwy',  // no 'h' and 'r'
    'i_kudlit': '&#x1772;',
    'u_kudlit': '&#x1773;',
    'virama': '',  // no virama
    'VIRAMA_LENGTH': 0,
    'PAD': '',
    'PAD_LENGTH': 0,
    'danda': '&#x1734;',  // single punct '/' (single devanagari danda) -> same as Baybayin?
    'danda2': '&#x1735;', // double punct '//' (double devanagari danda) -> same as Baybayin?
    'glyphs': {
        'a': '&#x1760;',
        'e': '&#x1761;', // same as 'i'
        'i': '&#x1761;',
        'o': '&#x1762;', // same as 'u'
        'u': '&#x1762;',
        'ba': '&#x176A;',
        'ka': '&#x1763;',
        'da': '&#x1767;',
        'ga': '&#x1764;',
        // Tagbanwa alphabet has no 'h'
        'la': '&#x176E;',
        'ma': '&#x176B;',
        'na': '&#x1768;',
        'nga': '&#x1765;',
        'pa': '&#x1769;',
        // Tagbanwa alphabet has no 'r'
        'sa': '&#x1770;',
        'ta': '&#x1766;',
        'wa': '&#x176F;',
        'ya': '&#x176C;'
        // '&#x176D;' is unused/reserved
    }
};


class Suyat {
    constructor(name) {
        var definitions = {
            'baybayin': BAYBAYIN_PROPS,
            'buhid': BUHID_PROPS,
            'hanunoo': HANUNOO_PROPS,
            'tagbanwa': TAGBANWA_PROPS
        };
        var script = definitions[name];

        // Add remaining CV and C syllable combinations of the consonants
        var g = script.glyphs;
        script.consonants.forEach(function(cons) {
            var syl = g[cons + 'a'];  // eg, 'ba'
            g[cons + 'e'] = syl + script.i_kudlit;
            g[cons + 'i'] = syl + script.i_kudlit;
            g[cons + 'o'] = syl + script.u_kudlit;
            g[cons + 'u'] = syl + script.u_kudlit;
            g[cons] = syl + script.virama;
        });
 
        // Dynamically define the class attributes
        for (const [key, value] of Object.entries(script)) {
            this[key] = value;
        }
    }

    isSuyatChar(ch) {
        var re = new RegExp(`[${this.reVowels}${this.reCons}]`, 'i');
        return ch.match(re) != null;
    }
    
    isSuyatVowel(ch) {
        var re = new RegExp(`[${this.reVowels}]`, 'i');
        return ch.match(re) != null;
    }
    
    isSuyatConsonant(ch) {
        var re = new RegExp(`[${this.reCons}]`, 'i');
        return ch.match(re) != null;
    }

    /*****************************************************************************
     *  Live translation functions
     *****************************************************************************/

    computeChangeOnDelete(inputText) {
        // Formulate the EditCommand for updating the output buffer in response to 
        // a letter being deleted in the input. The command consists of two parts:
        //   1. numDelete: number of Unicode characters to delete 
        //   2. syllable:  the new Suyat syllable to translate to a glyph

        var s = inputText;  // still includes character to be deleted
        var consLength = 1 + this.VIRAMA_LENGTH + this.PAD_LENGTH; // consonant size
        var cmd = null;
        var match;

        if (/mga$/i.exec(s)) {  // ma-NGA -> m`g`
            cmd = [2, 'mg'];
        } else if (/nga$/i.exec(s)) {
            cmd = [1, 'ng'];
        } else if (/ng[eiou]$/i.exec(s)) {
            cmd = [2, 'ng'];
        } else if (/ng$/i.exec(s)) { 
            cmd = [consLength, 'n'];
        }    
        if (!cmd) {
            var re = new RegExp(`([${this.reCons}])a$`, 'i');  // [C] -> [C`]
            if ((match = re.exec(s)) != null) {
                cmd = [1, match[1]];
            }
        }
        if (!cmd) {
            var re = new RegExp(`([${this.reCons}])[eiou]$`, 'i');  // [C.] -> [C`]
            if ((match = re.exec(s)) != null) {
                cmd = [2, match[1]];
            }
        } 
        if (!cmd) {
            var re = new RegExp(`([${this.reCons}])$`, 'i');
            if ((match = re.exec(s)) != null) {
                cmd = [consLength, ''];
            }
        } 
        if (!cmd) {
            var re = new RegExp(`([${this.reVowels}])$`, 'i');
            if ((match = re.exec(s)) != null) {
                cmd = [consLength, ''];
            }
        } 
        if (!cmd) {
            var re = new RegExp(`([${this.reCons}])$`, 'i');
            if ((match = re.exec(s)) != null) {
                cmd = [1, ''];
            }
        } 
        if (!cmd) {
            cmd = [0, ''];
        }
        return cmd;
    }

    computeChangeOnAdd(inputText, ch) {
        // Formulate the EditCommand for updating the output buffer in response to 
        // a newly added letter.

        var s = inputText + ch;
        var consLength = 1 + this.VIRAMA_LENGTH + this.PAD_LENGTH; // consonant size
        var cmd = null;
        var match;

        if (/mga$/i.exec(s)) {
            cmd = [2 * consLength, 'mga'];  // m`g` -> mga
        } else if (/ng$/i.exec(s)) {
            cmd = [consLength, 'ng'];  // n` -> NG
        }
        if (!cmd) {
            var re = new RegExp(`(ng[${this.reVowels}])$`, 'i');  // NG` -> NG[V]
            if ((match = re.exec(s)) != null) {
                cmd = [consLength, match[1]];
            }
        } 
        if (!cmd) {
            var re = new RegExp(`([${this.reCons}][${this.reVowels}])$`, 'i');  // [C`] -> [C`][V]
            if ((match = re.exec(s)) != null) {
                cmd = [consLength, match[1]];
            }
        }
        if (!cmd) {
            cmd = [0, ch];  // [V] or non-Suyat char
        }
        return cmd;
    }

    /*****************************************************************************
     *  Batch transliteration functions
     *****************************************************************************/

    wordToSyllables(word) {
        var tokens = [];
        var i = 0;

        while (i < word.length) {
            if (i == word.length - 1) { // last letter
                tokens.push(word[i]);
                break;
            } else if (word[i].match(/^[aeiou]/i)) { // Vowel
                tokens.push(word[i]);
                i += 1;
            } else {
                var str = word.slice(i, i + 3);
                if (str.match(/^ng[aeiou]/i)) { // 'ng' + V                
                    tokens.push(word.substr(i, 3));
                    i += 3;
                } else if (str.match(/^ng/i)) { // 'ng' + C, or word ends in 'ng'                
                    tokens.push(word.substr(i, 2));
                    i += 2;
                } else if (str.match(/^.[aeiou]/i)) { // CV                
                    tokens.push(word.substr(i, 2));
                    i += 2;
                } else {
                    tokens.push(word[i]); // CC: eg, 'paKWan'
                    i += 1;                        
                }
            }
        }
        return tokens;
    }

    syllableToGlyph(syl) {
        syl = syl.toLowerCase();
        var output = '';

        switch (syl) {
            case 'mga':
                output = this.glyphs['ma'] + this.glyphs['nga'];
                break;
            default:
                output = this.glyphs[syl];
                break;
        }
        return output;
    }

    wordToGlyph(word) {
        word = word.toLowerCase();
        var output = '';
        var my = this;

        switch (word) {
            case 'mga':
                output = this.glyphs['ma'] + this.glyphs['nga'];
                break;
            default:
                output = this.wordToSyllables(word)
                            .map(function(syl) {
                                var re = new RegExp(`[${my.reCons}]$`, 'i');
                                if (re.exec(syl)) {
                                    // spaces after virama for nicer kerning
                                    return my.glyphs[syl] + my.PAD;
                                } else {
                                    return my.glyphs[syl]; 
                                }
                            })
                            .join('');
                break;
        }
        return output;
    }

    translateBulk(inputText) {
        var my = this;
        var myoutput = '';
        var tokens = inputText.split(/([#$-\.\w]*[#$-\w])/g);
        tokens.forEach(function(tok) {
            var re = new RegExp(`[^${my.reVowels}${my.reCons}]`, 'i');
            if (tok.match(re)) {
                myoutput += tok;
            } else {
                myoutput += my.wordToGlyph(tok);
            }
        });
        return myoutput;
    }

};
