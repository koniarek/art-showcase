[home]: https://pburtchaell.com
[react]: https://reactjs.org/
[react-router]: https://reacttraining.com/react-router/
[redux]: http://redux.js.org/
[gatsby]: https://www.gatsbyjs.org/
[netlify-cms]: https://www.netlifycms.org/
[npm]: http://npmjs.org/
[yarn]: https://yarnpkg.com/en/
[eslint]: https://eslint.org/
[din]: https://typekit.com/fonts/din-2014

# pburtchaell.com

[pburtchaell.com][home] is my personal website and portfolio. It is a fun, endless project I continue to work on, switching from stack to stack, adding features, cutting features and constantly iterating.

I keep this project open source because you might be curious to read through the code. Perhaps it will be useful for you if you are working on a similar project. If you have questions, feel free to reach out to me on [Messenger](https://m.me/pburtchaell), [Twitter](https://twitter.com/pburtchaell) or [email](mailto:patrick@pburtchaell.com).

## Getting Started

1. Install: `npm ci`
2. Create an `.env` file with a `GITHUB_ACCESS_TOKEN`
3. Develop: `npm run develop`
4. Build: `npm run build`

Other:

- Lint JS code style: `npm run lint`
- Fix JS code style: `npm run prettify`

## Colophon

### Typography

- [DIN 2014 from Adobe Typekit][din]

### Tools & Libraries

- [React][react]: JavaScript library for building user interfaces
- [Gatsby][gatsby]: static site generator for React
- [Yarn][yarn]: JavaScript package manager (works with [npm][npm])
- [ESLint][eslint]: JavaScript and JSX code style, following the [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Netlify CMS][netlify-cms]: static site host, CMS, and DNS

### Gatsby

[Gatsby][gatsby] is an open source static site generator. Under the hood, it uses libraries like [React][react], [React Router][react-router] and [Redux][redux].

Here's a break down of how files are organized:

```
src
├── assets      # Static files like images/videos
├── components  # Presentational React components used by pages/layouts/templates
├── content     # Static files like Markdown, YAML or JSONy
├── html.js     # HTML template used by Gatsby for all pages
├── layouts     # React components used by Gatsby pages
├── pages       # React components rendered by Gatsby as standalone pages, e.g., an About page
├── styles      # Plain CSS styles
└── templates   # React components rendered by Gatsby as templated pages, e.g., blog posts or projects
```

### Netlify

[Netlify CMS][netlify-cms] is a quick, easy and lightweight content management system that works well with Markdown files.

### Gatsby Plugins

- [gatsby-link][1]: enables React Router with enhancements for Gatsby
- [gatsby-plugin-netlify][2]: generates redirect and header files for Netlify
- [gatsby-plugin-netlify-cms][3]: generates admin backend files for Netlify
- [gatsby-plugin-react-helmet][4]: generates document head for Gatsby pages
- [gatsby-plugin-react-next][5]: enables the latest version of React
- [gatsby-plugin-sharp][6]: exposes methods from [Sharp](https://github.com/lovell/sharp)
- [gatsby-remark-images][7]: processes images in Markdown
- [gatsby-remark-smartypants][8]: enables improved Markdown typography
- [gatsby-source-filesystem][9]: enables Gatsby to load files off the disk
- [gatsby-transformer-remark][10]: transforms Markdown files to HTML
- [gatsby-transformer-sharp][11]: processes images with Sharp
- [gatsby-remark-prismjs][12]: enables Markdown code highlighting

[1]: https://www.npmjs.com/package/gatsby-link
[2]: https://www.npmjs.com/package/gatsby-plugin-netlify
[3]: https://www.npmjs.com/package/gatsby-plugin-netlify-cms
[4]: https://www.npmjs.com/package/gatsby-plugin-react-helmet
[5]: https://www.npmjs.com/package/gatsby-plugin-react-next
[6]: https://www.npmjs.com/package/gatsby-plugin-sharp
[7]: https://www.npmjs.com/package/gatsby-remark-images
[8]: https://www.npmjs.com/package/gatsby-remark-smartypants
[9]: https://www.npmjs.com/package/gatsby-source-filesystem
[10]: https://www.npmjs.com/package/gatsby-transformer-remark
[11]: https://www.npmjs.com/package/gatsby-transformer-sharp
[12]: https://www.npmjs.com/package/gatsby-remark-prismjs

### Gatsby Reference

These resources were helpful reference in starting with Gatsby:

- [Gatsby Netlify starter project][12]
- [Netlify CMS example project][13]

[12]: https://github.com/AustinGreen/gatsby-starter-netlify-cms
[13]: https://github.com/netlify/netlify-cms/example

### Code Style

For JS, I follow the [Airbnb Style Guide](https://github.com/airbnb/javascript) (2018) with a few slight modifications to the rules. The modifications are written in my [package.json](/package.json) file.

For HTML and CSS, I use the original [Block Element Modifier (BEM)](https://tech.yandex.com/bem/) (n.d.) method to name classes. This "original method" was developed by the Yandex team, linked above. Redesigned versions of BEM, like those used by [CSS Wizardy](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) (2013) and [Nicolas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) (2012), in my opinion, are better suited for larger projects and not well suited for a small project like my website.

I like the BEM method because it translates well to React patterns. At the core of BEM are Blocks, a "functionally independent page component that can be reused", exactly like a React component. Further more, blocks "can be nested in each other", exactly like React component children. A quick read though [the BEM documentation](https://en.bem.info/methodology/quick-start/) gives other comparisons.

BEM is also quite simple as a method. I don't need to think a lot about how to apply it and that's good.

In order ot keep styles reusable and portable, I write plain CSS. Preprocessors--like Sass--don't provide significant value because the styles for my website are simple. If I use preprocessors, I have more development tools to implement and maintain over time.

I do, however, use new CSS features like [variables](https://caniuse.com/#feat=css-variables), [flexbox layout](https://caniuse.com/#feat=flexbox) (this is hardly new in 2018) and [grid layout](https://caniuse.com/#feat=css-grid).

### Thanks

I'm inspired by the design--and especially the information architecture--of the following sites:

- [Frank Chimero](https://frankchimero.com/)
- [CSS Wizardry](https://csswizardry.com/)
- [Brad Frost](http://bradfrost.com/)
- [Rasmus Andersson](https://rsms.me/)
- [Daniel Eden](https://daneden.me/)
- [Christine Cha](https://christinecha.com/)
- [Paul Stamatiou](https://paulstamatiou.com/)

Thanks also goes to:

- [Hunter Caron](https://github.com/huntercaron) for open sourcing [Boiled](https://github.com/huntercaron/boiled), the Gatsby boilerplate my initial Gatsby config was based on.
- [Daniel Bruce](http://www.danielbruce.se/) for open sourcing [the Entypo icons](https://github.com/danielbruce/entypo).

## License

Copyright (c) 2013-2018 Patrick Burtchaell.

[Code licensed with the MIT License (MIT)](/CODE-LICENSE).

[Content not licensed](/CONTENT-LICENSE).
