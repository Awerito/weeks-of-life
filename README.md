# Weeks of Life

[![Live Demo](https://img.shields.io/badge/demo-weeksoflife.grye.org-blue)](https://weeksoflife.grye.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A visualization of your life in weeks, based on Chilean life expectancy data from the World Bank.

## Features

- Life visualization as a grid of weeks (lived, current, remaining)
- Gender-based life expectancy from World Bank Open Data
- Dark/light theme support
- Downloadable posters (landscape/portrait, light/dark themes) at 2K resolution
- Confetti celebration when you've exceeded average life expectancy

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4

## Development

```bash
yarn install
yarn dev
```

## Production

```bash
yarn build
yarn preview
```

## Docker

```bash
docker build -t weeks-of-life .
docker run -p 80:80 weeks-of-life
```

## License

MIT
