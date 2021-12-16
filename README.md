# Summary

This repo contains 3 packages: `@klimadao/site`, `@klimadao/app` and `@klimadao/lib`.

`@klimadao/site` -> klimadao.finance homepage. In the future, we can add the docs and blog as well.

`@klimadao/app` -> dapp.klimadao.finance app, a standalone single-page-app. Should be exportable as a static site for deployment on IPFS.

`@klimadao/lib` -> A shared component and theme library. For now, just a set of resources shared by the above two apps. In the future, this can be extended and published on NPM as a component library for use in other community projects.

# Getting Started

**The DAO is looking for react/typescript devs as well as experienced Solidity devs!** Enjoy a flexible work schedule and work on something truly ambitious and meaningful. Monthly compensation available based on your level of experience and degree of contribution.

If you'd like to just take a ticket or fix a big, go for it (always better to ask first, though).

If you'd like to become a regular contributor to the DAO, [join the contributor discord](https://discord.gg/wuzAzUdcqW) and follow the application instructions.

## Requirements

Take note, this repo utilizes newer features from Node, NPM and the upcoming release of Typescript.

- Node >= v16.x
- NPM >= v8.x (necessary for NPM Workspaces)
- Typescript >= 4.5.0-beta (better ESModules support) `npm install -g typescript@4.5.0-beta`
- VSCode [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- VSCode [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Install dependencies

From the `klimadao/` root folder, _not_ from individual packages:
`npm install`

## Develop

A set of NPM Workspace commands are provided, and can be run from the root folder.

`npm run dev-site`: run the website on localhost:3000

`npm run dev-app`: run the app on localhost:3001

`npm run dev-lib`: Watch for changes in `@klimadao/lib` and recompile on save. Alternatively, run `npm run build-lib` to compile once (this is already done automatically for the above two commands).

# Contribution & Style Guide

## Philosophy

Our first priority is, of course, security and correctness. Our app is used by tens of thousands of people to move large sums of wealth. The pressure is high, serious bugs have the potential to wreck the market cap of our assets and shake the confidence of our community.

However, we are also operating as a DAO. The enthusiasm of our community is our greatest strength. For these reasons, we should also prioritize _dev happiness._ We should avoid bogging ourselves down and making it difficult for newcomers to contribute. We should be able to ship fixes and features quickly.

What is dev-happiness? Readable code. Popular tech stack. Fast build times. Focused, effective code-reviews. This is sometimes contrary to many 'best practices' for professional teams, which often optimize for perfection. **Perfect is the enemy of good!**

Remember: with proper QA, happy devs, and quick iteration speeds, we can very quickly iron out any bugs or quirks that might find their way to production.

### A11y and i18n is important.

The narrative of climate action and profit is enticing to people of all walks of life, all around the world. Do not assume that our users are all young healthy English-speaking crypto-natives.

- Proper screen-readable html attributes and alt text
- Good color contrast, large text
- Complete support for tab-navigation

### Don't obsess over DRY

"Do-it-all-components" and abstractions make you feel like a genius, reduce total lines of code, and can be really awesome... _until they aren't._ Granted, boilerplate and repetitive code can feel _tedious,_ but it is almost always easier to rework— compared to hacking an abstraction to fit an unforeseen use-case.

In addition, even when well done, abstract code always requires extra time and energy for newcomers to understand. In the React context, every level of abstraction means another node in the component tree. Over time, this depth can make code difficult to navigate and maintain.

One practical way to deal with this: don't create abstractions prematurely, wait until you actually have some boilerplate to clean up!

**Required watching [https://overreacted.io/the-wet-codebase/](https://overreacted.io/the-wet-codebase/)**

### Avoid dependencies.

This is a difficult area where dev-happiness and security are at odds. There are some great premade solutions out there, but supply-chain attacks on NPM dependencies are increasingly common. In addition, dependencies frequently go out-of-date or are deprecated by their maintainers.

With Next.js, TypeScript, Emotion, and Ethers.js, we have everything we need to build anything we want. Please don't go installing `react-modal` `react-button` `react-tab` `react-paginate` `react-blah-blah-blah`

Careful exceptions are made for really frustrating stuff like accessible/responsive tooltips (`tippy.js`) and icons (`@mui/icons`)

## Git Conventions

It should be easy to roll-back, cherry-pick, or revert commits. It should be clear where a feature was added, which PR added it, and which release included it.

### NO merge commits!

These can be avoided by using a rebase-merge approach, and by rebasing your feature branch to `staging` before opening a PR. Production (`main`) and staging should have identical commit histories.

PRs are squash-merged to staging, and staging is rebase-merged to main.

### NO working commits (squash-merge PRs)

Making many small commits are great and appreciated by PR reviewers and are generally a good dev practice. But they should not appear on staging or main branches. Feature branches / PRs are squashed and merged to staging as a single, well-named commit.

## Code conventions

### Margin Considered Harmful

Most layouts can be accomplished with less code using `grid`. Use `<Stack />` components for vertical spacing, columns for horizontal spacing. This also maps very nicely to Figma auto-layouts, works in RTL, and doesn't require overrides for start/end elements.

[https://mxstbr.com/thoughts/margin/](https://mxstbr.com/thoughts/margin/)

By nesting stacks, you can accomplish a clean consistent layout with very minimal css!

```css
// 💚
.contentContainer,
header,
main {
  display: grid;
}
.contentContainer {
  gap: 3.2rem;
}
header {
  gap: 0.8rem;
}
main {
  gap: 1.6rem;
}
```

```tsx
// 💚
<div className="contentContainer">
  <header>
    <h1>{title}</h1>
    <p>{subtitle}</h1>
  </header>
  <section>
    {...firstSection}
  <section>
  <section>
    {...secondSection}
  <section>
</div>
```

### Composition > configuration

Props and configs might reduce lines of code, but are difficult to refactor and lead to big complex components.

```tsx
// ❌ bad, configuration via props

<MyPage
  showHeader
  headerTabs={[...]}
  showFooter
  showFooterLogo
>
  {content}
</MyPage>
```

```tsx
// 💚 good, composition of reuseable elements! 👍

<PageContainer>
  <Header>
    <Tab />
    <Tab />
  </Header>
  <Main>{content}</Main>
  <Footer>
    <Logo />
  </Footer>
</PageContainer>
```

### Do not destructure `props`

This helps to prevent name-clashes, demonstrate where a function or value originates, avoids big blocks of code when a component has many props, and requires less refactoring when things props are renamed or removed.

```tsx
// 💚
const MyButton: FC<Props> = (props) => {
  <button onClick={props.onClick}>{props.children}</button>;
};
```

### Use a onEvent/handleEvent naming convention.

I.e. props start with `on` and handlers functions start with `handle`

```tsx
// 💚
const ClickTracker = (props) => {
  const handleClick = (e) => {
    trackClick(e);
    props.onClick(e);
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

### Provide a return type for any functions that have a return value.

Example: easy to assume this is a number, but it's not! Explicit return types prevent confusion. For functional React components, use the `FC<Props>` interface.

```tsx
// 💚
const getQuantity = (): string => {
  return state.quantity;
};

// 💚
const MyButton = (props): FC<Props> => <button {...props} />;
```

### Prefer `params` objects over multiple arguments

```tsx
// 💚
const emitEvent = (params) => {
  props.onEvent({ id: params.id, value: params.value });
};
```
