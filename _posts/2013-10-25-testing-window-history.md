---
layout: post
bodyid: post
title: Testing HTML5 History API in Mocha
categories: writings
tags: [javascript, code, testing]
---

I've been currently writing some tests for a module with mocha/chai/sinon. This module manipulates query string parameters and updates history via (push|pop)State. I ran into a little problem with the following code:

{% highlight js %}
window.history.back();
{% endhighlight %}

Apparently when calling the #back method on the history object, the browser relinquishes control of the JavaScript / UI rendering thread to update the actual location state. So in consequence, you must wrap your assertion in a #setTimeout function, and then call mocha's #done callback to signify test completion.

One funny thing to note is that running tests which generated longer, more complex query strings, I had to increase the length of the timer for #setTimeout. I didn't think diving back into the history state, and rendering long query strings into the address bar would take more time depending upon their length?
