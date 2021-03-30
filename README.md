# Cloud Native Security Map

This is the repo for the web dev of the Cloud Native Security Map (https://github.com/cncf/sig-security/issues/348).

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Production server:
run `npm run build` to build and `npm start` or start server statically with something like `python -m SimpleHTTPServer`.

## Adding content
Content can be added as markdown-files. See `content/`

```
---
title: "Example-post"
date: "2020-10-01"
category: "Runtime"
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et massa cursus, lobortis felis eget, convallis mauris. Mauris condimentum vel odio ac vulputate. Pellentesque in vulputate dolor
```

To enable syntax highlighting, set the language after the backticks in a codeblock: 
\`\`\`jsx

import React from "react";

const CoolComponent = () => <div>I'm a cool component!!</div>;

export default CoolComponent;
\`\`\`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
