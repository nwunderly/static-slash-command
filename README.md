# Static Slash Command

A Cloudflare Worker that serves a single Discord bot slash command through a GitHub Pages site.

**This project is a meme.**


### Worker:

This worker handles authorization based on the url public key parameter, and as such can be used for any number of distinct bots.

`https://static-slash-command.nwunderly.workers.dev/?public_key=INSERT_PUBLIC_KEY&url=INSERT_STATIC_FILE_URL`


### Pages:

`https://nwunderly.github.io/static-slash-command/command.json`
