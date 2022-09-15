// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/fav.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/api/postallcards.ts";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/logout.ts";
import * as $7 from "./routes/random.tsx";
import * as $8 from "./routes/random/all.tsx";
import * as $9 from "./routes/tables/[table].tsx";
import * as $10 from "./routes/user.tsx";
import * as $$0 from "./islands/LikeButton.tsx";
import * as $$1 from "./islands/RandomCard.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/fav.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/api/postallcards.ts": $4,
    "./routes/index.tsx": $5,
    "./routes/logout.ts": $6,
    "./routes/random.tsx": $7,
    "./routes/random/all.tsx": $8,
    "./routes/tables/[table].tsx": $9,
    "./routes/user.tsx": $10,
  },
  islands: {
    "./islands/LikeButton.tsx": $$0,
    "./islands/RandomCard.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
