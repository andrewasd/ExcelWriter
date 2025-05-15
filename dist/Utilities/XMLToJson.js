"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLToJson4 = exports.XMLToJson2 = exports.XMLToJson = void 0;
const XMLToJson = (xml) => {
    let result = {};
    if (!xml.children) {
        result[xml.tag] = xml.text || undefined;
        return result;
    }
    let childObjects = xml.children.map(child => (0, exports.XMLToJson)(child));
    let firstTagName = xml.children[0].tag;
    // check if all children have the same tag name
    if (childObjects.every(child => Object.keys(child)[0] === firstTagName)) {
        result[xml.tag] = childObjects;
    }
    else {
        result[xml.tag] = childObjects.reduce((acc, child) => {
            return Object.assign(Object.assign({}, acc), child);
        }, {});
    }
    return result;
};
exports.XMLToJson = XMLToJson;
const XMLToJson2 = (xml) => {
    let result = {};
    if (!xml.children) {
        result[xml.tag] = xml.text || undefined;
        return result;
    }
    let childObjects = xml.children.map(child => (0, exports.XMLToJson)(child));
    let firstTagName = xml.children[0].tag;
    // check if all children have the same tag name
    if (childObjects.every(child => Object.keys(child)[0] === firstTagName)) {
        result[xml.tag] = childObjects;
    }
    else {
        result[xml.tag] = childObjects.reduce((acc, child) => {
            return Object.assign(Object.assign({}, acc), child);
        }, {});
        // check if there is a single nested xmlattribute with no other children
        if (Object.keys(result[xml.tag]).length === 1 &&
            Object.keys(result[xml.tag])[0] === 'xmlattribute' &&
            typeof result[xml.tag]['xmlattribute'] === 'string') {
            return result[xml.tag]['xmlattribute'];
        }
    }
    return result;
};
exports.XMLToJson2 = XMLToJson2;
const XMLToJson4 = (xml) => {
    let result = {};
    if (!xml.children) {
        result[xml.tag] = xml.text || undefined;
        return result;
    }
    let childObjects = xml.children.map(child => (0, exports.XMLToJson4)(child));
    let tagNames = childObjects.map(child => Object.keys(child)[0]);
    // check if all tag names are the same
    let sameTagNames = tagNames.every(tagName => tagName === tagNames[0]);
    if (sameTagNames) {
        let tagName = tagNames[0];
        let tagValues = childObjects.map(child => child[tagName]);
        if (tagValues.every(value => typeof value !== 'object')) {
            result[xml.tag] = tagValues;
        }
        else {
            result[xml.tag] = tagValues.reduce((acc, value) => {
                return Object.assign(Object.assign({}, acc), value);
            }, {});
        }
    }
    else {
        let groupedObjects = {};
        childObjects.forEach(child => {
            let tagName = Object.keys(child)[0];
            if (groupedObjects[tagName]) {
                groupedObjects[tagName].push(child[tagName]);
            }
            else {
                groupedObjects[tagName] = [child[tagName]];
            }
        });
        result[xml.tag] = Object.entries(groupedObjects).reduce((acc, [tagName, tagValues]) => {
            if (tagValues.every((value) => typeof value !== 'object')) {
                acc[tagName] = tagValues;
            }
            else {
                acc[tagName] = tagValues.reduce((acc, value) => {
                    return Object.assign(Object.assign({}, acc), value);
                }, {});
            }
            return acc;
        }, []);
    }
    return result;
};
exports.XMLToJson4 = XMLToJson4;
//# sourceMappingURL=XMLToJson.js.map