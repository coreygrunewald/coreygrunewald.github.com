---
layout: post
title: emacs: evil keybindings for git-timemachine
bodyid: post
categories: writings
tags: [emacs, code, git]
---

The other night, I added [git-timemachine](https://github.com/pidu/git-timemachine) to my [emacs config](https://github.com/coreygrunewald/emacs.d). I ran into a small issue though, it seems my key bindings weren't getting applied. After a bit of Gooogle-fu, I stumbled across this [issue](https://bitbucket.org/lyro/evil/issue/130/evil-define-key-can-no-longer-bind-key-in). The reasoning made sense, and thus, a solution was born:

{% highlight lisp %}
(use-package git-timemachine
  :ensure git-timemachine
  :config
  (progn
    (add-hook 'git-timemachine-mode-hook
              (lambda() (evil-normalize-keymaps)))
    (after 'evil
      (evil-set-initial-state 'git-timemachine-mode 'normal)
      (evil-define-key 'normal git-timemachine-mode-map (kbd "<up>") 'git-timemachine-show-next-revision)
      (evil-define-key 'normal git-timemachine-mode-map (kbd "<down>") 'git-timemachine-show-previous-revision)
      (evil-define-key 'normal git-timemachine-mode-map (kbd "q") 'git-timemachine-quit)
      (evil-define-key 'normal git-timemachine-mode-map (kbd "<right>") 'git-timemachine-kill-abbreviated-revision)
      (evil-define-key 'normal git-timemachine-mode-map (kbd "<left>") 'git-timemachine-kill-revision))
    ))
{% endhighlight %}

For whatever reason, when enabling git-timemachine-mode, evil doesn't pick up the addition of an active minor mode, hence not refreshing the keymaps (or something like that). Calling "(evil-normalize-keymaps)" in the mode hook gets things working properly.