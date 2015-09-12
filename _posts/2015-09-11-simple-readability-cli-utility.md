---
layout: post
title: simple CLI utility for sending articles to Readability
bodyid: post
categories: writings
tags: [code, cli]
---

I had some weirdness occur with the Readability chrome extension, so I decided to just whip up a simple cli utility.

The heavy lifting is done by the great [readability-api](https://github.com/robinjmurphy/node-readability-api) node module.

Add your credentials / keys as environment variables, this script to your $PATH, and your good to go.

{% highlight javascript %}
#! /usr/local/bin/node

var readability = require('readability-api');
var url = process.argv[2];
var READABILITY_CONSUMER_KEY = process.env.READABILITY_CONSUMER_KEY;
var READABILITY_CONSUMER_SECRET = process.env.READABILITY_CONSUMER_SECRET;
var READABILITY_PARSER_TOKEN = process.env.READABILITY_PARSER_TOKEN;
var READABILITY_PASSWORD = process.env.READABILITY_PASSWORD;

if (!url || !READABILITY_CONSUMER_KEY || !READABILITY_PARSER_TOKEN || !READABILITY_CONSUMER_SECRET || !READABILITY_PASSWORD) {
    console.log('Necessary arguments not provided.');
}

readability.configure({
    consumer_key: READABILITY_CONSUMER_KEY,
    consumer_secret: READABILITY_CONSUMER_SECRET,
    parser_token: READABILITY_PARSER_TOKEN
});

readability.xauth(READABILITY_CONSUMER_KEY, READABILITY_PASSWORD, function (err, tokens) {
    // Use tokens.oauth_token and tokens.oauth_token_secret when creating a Reader API client
    var reader = new readability.reader({
        access_token: tokens.oauth_token,
        access_token_secret: tokens.oauth_token_secret
    });

    // Add a bookmark - returns the created bookmark
    reader.addBookmark(url, function (err, bookmark) {
        if (err) {
            console.error('Error creating bookmark.', err);
            return;
        }

        console.log('Added bookmark.');
    });
});
{% endhighlight %}
