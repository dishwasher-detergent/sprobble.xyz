# [Sprobble.xyz](sprobble.xyz)
![Sprobble.xyz Screenshot](/docs/sprobble.xyz.png)

Track your spotify plays with Sprobble!

## Built using 
- NextJS 13 App Dir
- TailwindCSS
- Appwrite

## Self Hosting
You will need to setup your own [Appwrite](appwrite.io) instance, at this time Appwrite cloud does not support relationships so you will need to self host Appwrite version 1.3.7+ yourself. You can easily self host your own instance of Appwrite using Digital Ocean. [Find that here](https://marketplace.digitalocean.com/apps/appwrite)
You will also need a Spotify app setup. [Sign up here.](developer.spotify.com)

### Appwrite
### collections
```js
{
  name: stats,
  id: stats
},
{
  name: user,
  id: user
},
{
  name: plays,
  id: plays
},
{
  name: album,
  id: album
},
{
  name: artist,
  id: artist
},
{
  name: track,
  id: track
},
```

collection stats attributes
```js
{
  name: number_of_plays,
  type: integer
},
{
  name: time_spent_listening,
  type: string
},
{
  name: user_id,
  type: string
},
{
  name: week_of_year,
  type: integer
},
{
  name: user,
  type: relationship,
  relation: one to many,
  related: user,
  onDelete: set null
},
```

collection user attributes
```js
{
  name: user_id,
  type: string
},
{
  name: name,
  type: string
},
{
  name: created_at,
  type: dateTime
},
{
  name: stats,
  type: relationship,
  relation: one to many,
  related: stats,
  onDelete: set null
},
```

collection plays attributes
```js
{
  name: user_id,
  type: string
},
{
  name: track,
  type: relationship,
  relation: many to one,
  related: track,
  onDelete: set null
},
{
  name: artist,
  type: relationship,
  relation: many to many,
  related: artist,
  onDelete: set null
},
{
  name: album,
  type: relationship,
  relation: many to one,
  related: album,
  onDelete: set null
},
{
  name: played_at,
  type: datetime
},
```

collection album attributes
```js
{
  name: name,
  type: string
},
{
  name: href,
  type: Url
},
{
  name: popularity,
  type: integer
},
{
  name: images,
  type: string[]
},
{
  name: track,
  type: relationship,
  relation: many to one,
  related: track,
  onDelete: set null
},
{
  name: artist,
  type: relationship,
  relation: many to many,
  related: artist,
  onDelete: set null
},
{
  name: plays,
  type: relationship,
  relation: many to one,
  related: plays,
  onDelete: set null
},
{
  name: genres,
  type: string[]
},
```

collection artist attributes
```js
{
  name: name,
  type: string
},
{
  name: href,
  type: Url
},
{
  name: popularity,
  type: integer
},
{
  name: images,
  type: string[]
},
{
  name: track,
  type: relationship,
  relation: many to one,
  related: track,
  onDelete: set null
},
{
  name: plays,
  type: relationship,
  relation: many to one,
  related: plays,
  onDelete: set null
},
{
  name: album,
  type: relationship,
  relation: many to one,
  related: album,
  onDelete: set null
},
{
  name: genres,
  type: string[]
},
```

collection track attributes
```js
{
  name: name,
  type: string
},
{
  name: href,
  type: Url
},
{
  name: popularity,
  type: integer
},
{
  name: explicit,
  type: boolean
},
{
  name: preview,
  type: Url
},
{
  name: duration,
  type: integer
},
{
  name: plays,
  type: relationship,
  relation: many to one,
  related: plays,
  onDelete: set null
},
{
  name: artist,
  type: relationship,
  relation: many to many,
  related: artist,
  onDelete: set null
},
{
  name: album,
  type: relationship,
  relation: many to one,
  related: album,
  onDelete: set null
},
{
  name: genres,
  type: string[]
},
```

### Updating Values
After all collections are created update the appwrite.ts/js files within the main directory and the functions directory.
