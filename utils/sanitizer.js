'use strict';

const htmlentitiesenc = require("html-entities");

function encode_output(text) {
    if (text == undefined) {
        return undefined
    }
    let output = htmlentitiesenc.decode(text)
    output = htmlentitiesenc.encode(output)
    return output
}

function encode_special_output(text) {
    if (text == undefined) {
        return undefined
    }
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
    if (input == undefined) {
        return undefined
    }
    return htmlentitiesenc.encode(input)
}

function decode_text(input){
    if (input == undefined) {
        return undefined
    }
    return htmlentitiesenc.decode(input)
}

module.exports = {encode_output, encode_special_output, encode_input, decode_text}