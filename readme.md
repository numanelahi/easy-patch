# easy-patch
> Easy to use and compact implementation of JSON-patch [(RFC6902)](https://tools.ietf.org/html/rfc6902)

## Why use easy patch
With easy-patch you don't have to convert your patch object to and array of operation. All of that is implicitly handled by easy-patch. 

## Install
`npm i easy-patch`

## Usage
```javascript
const easy_patch = require('easy-patch');

let document = {
                name: "Numan",
                age: 25,
                address: {
                    city: "Srinagar",
                    state: "J and K",
                    phone: "0123456789"
                },
                tags: [{name:'node'}, {name:'npm'}]
            },
     patch_one = {
                 designation: "Software Engineer",
                 address: {
                     city: "Bangalore",
                     state: "Karnataka"
                 },
                 tags: [{name: 'mocha', type: 'testing'},{name:'npm', type: 'package manager'}, {name: 'yarn', type: 'package manager'}]
             },
     patch_two = {
                 tags: [easy_patch.ADD, {name: 'deep learning', type: 'data science'}] //Adding operation name as first element to array: patch.tags.unshift(easy_patch.ADD)
             },
     patch_three = {
            tags: {0: {name: 'jasmine'}}
     };


// patch_one adds `designation` attribute,
// update `address.city` and `address.state` attributes, updates 
// `name` attribute and adds `type` attribute to the first and second
// elements of `tags` array of the document
document = easy_patch(document, patch_one);
console.log(document);
/**
 * document = {
 *          name: "Numan",
 *          age: 25,
 *          designation: "Software Engineer",
 *          address: {
 *              city: "Bangalore",
 *              state: "Karnataka",
 *              phone: "0123456789"
 *          },
 *          tags: [{name:'mocha', type: 'testing'}, 
 *                 {name:'npm', type: 'package manager'}, 
 *                 {name: 'yarn', type: 'package manager'}]
 *      }
 */


// patch_two adds an extra element to tags array without removing the elements that are already there
// because we have added `easy_patch.ADD` operator as the first element to `tags` array in patch_two
document = easy_patch(document, patch_two);
console.log(document);
/*
 * document = {
 *          name: "Numan",
 *          age: 25,
 *          designation: "Software Engineer",
 *          address: {
 *              city: "Bangalore",
 *              state: "Karnataka",
 *              phone: "0123456789"
 *          },
 *          tags: [{name:'mocha', type: 'testing'}, 
 *                 {name:'npm', type: 'package manager'}, 
 *                 {name: 'yarn', type: 'package manager'},
 *                 {name: 'deep learning', type: 'data science'}]
 *      }
 */


// patch_three updates the `name` attribute of first element of `tags` array
// without altering the rest
document = easy_patch(document, patch_three);
console.log(document);
/*
 * document = {
 *          name: "Numan",
 *          age: 25,
 *          designation: "Software Engineer",
 *          address: {
 *              city: "Bangalore",
 *              state: "Karnataka",
 *              phone: "0123456789"
 *          },
 *          tags: [{name:'jasmine', type: 'testing'}, 
 *                 {name:'npm', type: 'package manager'}, 
 *                 {name: 'yarn', type: 'package manager'},
 *                 {name: 'deep learning', type: 'data science'}]
 *      }
 */
```