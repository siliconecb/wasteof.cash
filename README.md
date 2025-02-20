![gh banner hero](static/brand/banner.png)

<p align="center">
	<h1 align="center"><b>wasteof.cash</b></h1>
<p align="center">
    a supercharged alternative client for wasteof.money
    <br />
    <br />
    <a href="https://cash.wasteof.me">website</a>
    ·
    <a href="https://cash.wasteof.me/about">about</a>
    ·
    <a href="https://cash.wasteof.me/login">sign in</a>
    ·
    <a href="https://wasteof-cash.wasteof.me">wasteof profile</a>
</p>
<p align="center">
    <img src="https://img.shields.io/github/actions/workflow/status/siliconecb/wasteof.cash/node.js.yml?label=build" alt="workflow">
</p>
<br />
</p>

  
wasteof.cash is a spirited and cutting-edge alternative
client for wasteof.money with <ins>**superpowers.**</ins>

- pretty ui ✨
- real-time post stats
- post scheduling
- extended top users
- messages + group chats
- post bookmarks
- better filters on search/explore

## disclaimer

> this project is still in beta and under active development, major and potentially catastrophic changes may occur (occasionally). if you find any bugs or security vulnerabilities, open a PR/issue for bugs and report to the appropriate contact methods at <a href="https://cash.wasteof.me/security">/security.txt</a> for security vulns.

## the stack 😎

- **SvelteKit** - the website
- **Hono** - event/backend api
- **Koa** - underlying web framework (prod server)
- **Postgres** - stores information on features specific to wasteof.cash
- **Drizzle ORM** - bridges the database and frontend

### more

- TailwindCSS
- GSAP
- Rome (linting)

## beta testing
the site will be open to select beta testers soon, stay tuned!

## roadmap
- [x] landing page
- [x] login page
- [x] database setup
- [ ] feed page
- [ ] explore, search, messages, profiles, and settings page
- [ ] real-time post stats
- [ ] post bookmarks
- [ ] extended explore page
- [ ] post scheduling
- [ ] truncate reposts
- [ ] blacklist/block users
- [ ] user/group DMs
> - [ ] (potential) AI powered explore/search page 👀

# privacy
wasteof.cash will never store wasteof.money credentials¹, read the <a href="https://cash.wasteof.me/privacy">privacy policy</a> for more details.

> ¹wasteof.cash will only ever store user tokens temporarily ONLY when given express permission by the user to post to wasteof.money at a later date (post scheduling feature)

## contributing
open a pull request or just yell at me about bugs lol

## development

```bash
mv .env.template .env
npm ci
npm run pg:generate
npm run pg:migrate
vite build
vite dev --host
```
<br />
<br />
<br />
<p align="center">
    wasteof.cash :)
    <br />
    <br />
    <a href="https://cash.wasteof.me/privacy">privacy</a>
    ·
    <a href="https://cash.wasteof.me/terms">terms</a>
    ·
    <a href="https://cash.wasteof.me/security">security</a>
  </p>
</p>
