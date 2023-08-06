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

Once everything above is done, you can run these commands below.
1. appwrite login
2. appwrite deploy collection
  a. use **space** to select all collections
4. appwrite deploy function
  a. use **space** to select all functions

## Congrats, you're done!
