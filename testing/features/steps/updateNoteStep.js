const { Given, When, Then } = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");


// ========== update user ===========
Given('the put api url is {string}', url => {
    this.noteUpdateUrl = url
});

When('update note id is {string}', id => {
    this.noteId = id
})

When('new data is', docString => {
    this.newData = docString
})

When('send {string} request to given url and given data to noteId', async (method) => {
    await fetch(`${this.noteUpdateUrl}${this.noteId}`, {
        method: method,
        body: this.newData,
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    })
    .then(res => res.json())
    .then(result => this.result = result)
    .catch(err => err)
})

Then('I will get update note', (_id,title,details,category) => {
    assert.equal(_id, this.result._id);
    assert.equal(title, this.result.title);
    assert.equal(details, this.result.details);
    assert.equal(category, this.result.category);
})

