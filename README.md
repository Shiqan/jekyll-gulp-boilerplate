# Jekyll+Gulp boilerplate

AMP & PWA [Jekyll](http://jekyllrb.com) boilerplate powered by [Gulp](http://gulpjs.com/). It provides a [Bulma](https://bulma.io) theme based on two templates created by [CssNinja](https://github.com/cssninjaStudio/). Search is provided by [Algolia](https://www.algolia.com/).


## Getting started
```bash

# Build image
docker build -t jekyll .

# Build container
docker run -d -p 3000:3000 --name=jekyll -t jekyll 

# To debug enter container
docker exec -it jekyll bash

# Rebuild image & container
sh _scripts/rebuild-docker.sh true
```
## Or without docker
**Step 1:** Install [Ruby](https://www.ruby-lang.org/en/) then run `gem install bundler && bundle install`.

**Step 2.** Install [Node.js](https://nodejs.org/en/), then run `npm install -g gulp && npm install`.

**Step 3.** To run, use default gulp task: `gulp`. 

## Usage

> `gulp [--prod]`

This is the default command, it will build your assets and site with development settings. Use the `--prod` flag to generate your site for production usage. See the gulp directory for more tasks.


## Plugins Used
- [Jekyll Sitemap](https://github.com/jekyll/jekyll-sitemap)
- [Jekyll SEO tag](https://github.com/jekyll/jekyll-seo-tag)
- [Jekyll Paginate v2](https://github.com/sverrirs/jekyll-paginate-v2)
- [Jemoji](https://github.com/jekyll/jemoji)
- [Jekyll Algolia](https://github.com/algolia/jekyll-algolia)
- [Jekyll Tagging](https://github.com/toshimaru/jekyll-tagging-related_posts)
- [Jekyll Archives](https://github.com/jekyll/jekyll-archives)

## License

Licensed under the [MIT License](LICENSE).
