---
layout: post
title: Gimp and Python Plugins
bodyid: post
categories: writings
tags: [ugh]
---

I was trying to install a Python plugin for GIMP the other day and run into a frustrating issue. The plugin in question was <a href="http://registry.gimp.org/node/28112" target="_blank">this</a>. I copied the Python plugin the the ~/Library/Application Support/GIMP/2.8/plug-ins (or whatever it is) folder, and started up GIMP. The plugin did not show up in the filters menu, which caused me to start mucking around. Read through Stackoverflow that a good way to debug GIMP is starting it up from the cli so that is what I did. I saw that GIMP was complaining of a syntax error, namely:

{% highlight python %}
Traceback (most recent call last):
  File "/Users/basset/Library/Application Support/GIMP/2.8/plug-ins/gimp_seamless_advanced.py", line 44, in <module>
    from gimpfu import *
ImportError: No module named gimpfu
{% endhighlight %}

So I thought the plugin might have had just a bad indent or whitespacing or whatever. So I ran PythonTidy on it, and tried again. Alas, same error. I was getting a bit pissed at this point. Finally I thought it could possibly be some sort of caching issue, so I backed up the plugins folder, uninstalled GIMP and it's associated files, and reinstalled it, started it once to re-initialize the Application Support folder, and copied the plugins back in. Restarted GIMP again, and boom, there the plugin was. I'm only left to assume that the first time you copy a plugin into GIMP and it tries to register it, it compiles it, and keeps the compiled file around for some reason. Who knows. At least it is working now.
