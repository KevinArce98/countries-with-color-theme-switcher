# Frontend Mentor - REST Countries API with color theme switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Links

- Solution URL: [Solution](https://www.frontendmentor.io/solutions/countries-with-color-theme-switcher--sQ8QOZGA)
- Live Site URL: [Demo](https://kevinarce98.github.io/countries-with-color-theme-switcher)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Open-source language
- [CSS](https://sass-lang.com/) - CSS preprocessor
- [Tailwind](https://tailwindcss.com/) - CSS framework

### What I learned

I learned about customs hooks of react and about typescript

```js
const useDarkMode = (): [boolean, (value: boolean) => void] => {
    const [enabledState, setEnabledState] = useLocalStorage<boolean>("dark-mode-enabled", false);
    const prefersDarkMode = usePrefersDarkMode();
    const enabled = enabledState ?? prefersDarkMode;
    useEffect(
        () => {
            const className = "dark-mode";
            const element = window.document.body;
            if (enabled) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },
        [enabled] 
    );
    return [enabled, setEnabledState];
}
```

## Author
- Frontend Mentor - [@KevinArce98](https://www.frontendmentor.io/profile/KevinArce98)
- Linkedin - [@KevinArce98](https://www.linkedin.com/in/kevinarce98/)
- Twitter - [@KevinArce981](https://twitter.com/KevinArce981)