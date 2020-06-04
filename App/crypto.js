var sha1 = require('sha1');


class Crypto {
    hashSha1(string) {
        return sha1(string).toLowerCase();
    }
    decipherCharacter(character, numero_casas) {
        var decipheredCharacter, decipheredUnicode;
        var unicode = character.charCodeAt(0);

        var decipheredCharacter = character;

        /** Check if the character is a point or a number */
        if (!(unicode < 97)) {
            decipheredUnicode = unicode - numero_casas;
            if (decipheredUnicode < 97) {
                decipheredCharacter = String.fromCharCode(122 - (96 - decipheredUnicode));
            } else {
                decipheredCharacter = String.fromCharCode(decipheredUnicode);
            }
        }
        return decipheredCharacter;
    }

    decipher(string, numero_casas) {
        var length = string.length;
        var character;
        var decipheredString = "";
        for (var i = 0; i < length; i++) {
            character = string.charAt(i);
            decipheredString += this.decipherCharacter(character, numero_casas);
        }
        return decipheredString;
    }
}
module.exports = new Crypto();