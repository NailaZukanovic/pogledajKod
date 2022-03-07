const { Given, When, Then } = require("cucumber");
const assert = require("assert");
const fetch = require("node-fetch");

// ==== Add User ============
Given("the post api url is {string}", url => {
  this.url = url
});

When("data is", (data)=> {
    this.data = data
})

When("send {string} request to given url and given data", async (method) => {
  await fetch(this.url, {
    method: method,
    body: this.data,
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  })
    .then(res => res.json())
    .then(result => this.data = result)
    .catch(err => console.log("when Error: - ", err));
});

Then("I get note details _id {string} and title {string} and details {string} and category {string}", (_id,title,details,category) => {
    assert.equal(JSON.stringify({_id,title,details,category}), JSON.stringify({_id: this.data._id, title: this.data.title, details: this.data.details, category: this.data.category}))
});
