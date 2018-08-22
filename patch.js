"use strict";

const PRIMITIVE_TYPES = new Set(['string', 'number', 'boolean']);

function easy_patch(document, patch) {
    // Checks validity of arguments
    if (get_type(document) !== "Object") {
        throw new Error (`Expected first argument to be of type 'Object', got ${get_type(document)}`);
    }
    else if(get_type(patch) !== "Object") {
        throw new Error (`Expected second argument to be of type 'Object', got ${get_type(patch)}`);
    }

    for (let key in patch) {
        patch_key(document, key, patch[key]);
    }
    return document;
}

easy_patch.ADD = Symbol('add');

function patch_key(document, key, value) {
    if (get_type(value) === "Array" && typeof value[0] === "symbol") {
        value.slice(1).forEach(item => {
            document[key].push(item);
        });
    }
    else if (PRIMITIVE_TYPES.has(typeof value)) {
        document[key] = value;
    } else {
        if (!(key in document)) {
            document[key] = new Object();
        }
        for(let k in value) {
            patch_key(document[key], k, value[k]);
        }
    }
}

function get_type (value) {
    if (!value) {
        return "undefined";
    }
    return value.constructor.toString().replace("function ", "").replace(" { [native code] }", "").replace("()", "");
}

module.exports = easy_patch;