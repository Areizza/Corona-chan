# Corona-chan
Play a survival pandemic game on your Discord server with a cute bot! :heart:

![Corona-chan](https://cdn.discordapp.com/attachments/710957737420390440/711365566878711858/corona-chan_S.png)

Corona-chan is a **Discord bot** that allows users who join to play a game simulating a server-wide pandemic. She comes equipped with a Yandere personality and a strong desire to share her "love" with all the players.

The game starts with one infected player randomly selected from the joined users. The infection can spread to other players if they speak in the same channel within a certain time period as the infected player, with heightened probability if they tag the infected or are tagged by the infected (i.e. simulating direct contact). Players also start the game with items in their personal inventory that may help or hinder them in staying safe from the virus.

**:mask: Obtainable items include:**
- regular masks
- N95 masks
- hand sanitizer
- gloves
- disinfecting wipes
- essential oils
- vitamins
- home remedies
- alcohol
- toilet paper
- ventilators

Once infected, the player's lifespan begins counting down towards a chance of either dying or recovering, as dependent on their current items at hand. If the player successfully recovers, they become immune to the virus and Corona-chan will send them a sad message. If the player dies, their items are not retrievable.

The game ends when the virus is eradicated when there are no more infected users (i.e. all infected have either died or recovered, and other users are healthy).

## :heart_eyes: Invite Corona-chan
Corona-chan is not currently hosted on a server. You will need to host the bot yourself and invite the bot with your own Client ID (replace CLIENTID) and required permissions using the link below:

`https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=268504064`

Login to Discord and navigate to your **Applications** on the [Discord Developer Portal](https://discord.com/developers/applications) to see your list of Discord applications. Create a new application for Corona-chan.
![Applications](https://cdn.discordapp.com/attachments/711038166793977906/711742498686632017/unknown.png)

Select the Corona-chan app and go to the **General Information** tab. This is where you can find the **Client ID**. Replace `CLIENTID` in the invite URL with your app's Client ID.
![GeneralInformation](https://cdn.discordapp.com/attachments/711038166793977906/711744964048060486/unknown.png)

Corona-chan requires the **Permission Integer** `268504064` which allows following permissions (see **Bot** tab):
- [x]  Manage Roles
- [x]  View Channels
- [x]  Send Messages
- [x]  Read Message History

## :yum: Quick Start
*Node v12.0+ is required*

Create an `auth.json` file in the top level directory, using `auth-sample.json` as a sample.

Paste the bot's **Authorization Token** into this file.
This can be found on the **Bot** tab of the Corona-chan application on the Discord Developer Portal.

Run the following commands
```
$ npm install
$ node bot.js
```
**:heartpulse: Corona-chan should now be live and ready for action! :heartpulse:**
