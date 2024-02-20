# [Sprobble.xyz](https://sprobble.xyz)

![Sprobble.xyz Screenshot](/docs/sprobble.png)

Track your Spotify plays with Sprobble!

## Built using

- NextJS
- TailwindCSS
- Shadcn
- Appwrite

## Using Appwrite Cloud

You will need to setup an Appwrite Cloud account. [Sign up here.](https://cloud.appwrite.io/register)
You will also need a Spotify app setup. [Sign up here.](developer.spotify.com)

## Self Hosting

You will need to setup your own [Appwrite](appwrite.io) instance, at this time Appwrite cloud does not support relationships so you will need to self host Appwrite version 1.3.7+ yourself. You can easily self host your own instance of Appwrite using Digital Ocean. [Find that here](https://marketplace.digitalocean.com/apps/appwrite)
You will also need a Spotify app setup. [Sign up here.](developer.spotify.com)

## Once everything above is done, you can run these commands below.

1. appwrite login
2. appwrite deploy collection
   - use **a** to select all collections
3. appwrite deploy function
   - use **a** to select all functions
   - Update env variables based on the example.env files in each function directory.

## Congrats, you're done!
