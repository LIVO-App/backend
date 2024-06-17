'use strict';

const htmlentitiesenc = require("html-entities");

function encode_output(text) {
    var output = htmlentitiesenc.decode(text)
    output = htmlentitiesenc.encode(text)
    return output
}

function encode_special_output(text) {
    let output
    if (text.includes("<script>") || text.includes("</script>")) {
        output = text.replace("<script>", htmlentitiesenc.encode("<script>"))
        output = output.replace("</script>", htmlentitiesenc.encode("</script>"))
    } else {
        output = text
    }

    return output
}

function encode_input(input) {
    return htmlentitiesenc.encode(input)
}

module.exports = {encode_output, encode_special_output, encode_input}