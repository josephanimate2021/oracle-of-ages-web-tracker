<h1>The Legend of Zelda: Oracle of Ages Tracker<br>(designed for GitHub Pages)</h1>
This is a tracker built entirely from vanila JavaScript that helps you track your progression as you play the game. As of right now, I am focusing on making this tracker work with the randomizer version of Ages 
as that's something that will priortize a tracker the most unlike just playing the normal game.

## Why does this tracker exist? There is already a PopTracker pack out there that perfectly tracks my items just fine.
Well, it does, but the PopTracker pack has so many critical bugs that affect it's usability for new players of the Oracle of Ages Randomizer.
Refer to the video description of this [YouTube Video](https://youtu.be/aJCN1odTCIA) (made by me) so that you can see exactly what I mean. The map is on the bottom left corner of the video.

## Connecting To A Server Outside of Archipelago [IN BETA]
If you are playing an entrance randomizer or something similar in Ages but just can't find a tracker that's user friendly for you, well this one allows you to not only be able to check off items manually, but allows you to rely on a local server to track the game for you!
This is why I have uploaded the Connectors Folder to this source code (from EmoTracker) which will allow you to connect to servers outside of Archipelago so that you have the freedom to do whatever you want. Now of course you can't use Snes9X with gameboy color games, but that's for a concept where I plan on converting this tracker into one where you can load any javascript-made pack into this tracker. Keep in mind that packs made with lua are NOT SUPPORTED! YOU HAVE TO EITHER CREATE YOUR OWN PACK WITH JAVASCRIPT OR CONVERT EXISTING PACKS IN DIFFERENT CODING LANGUAGES TO JAVASCRIPT!!! Now I could do that version where lua packs can be loaded with javascript, but that's for another day. Anyways back on topic, here is how you can connect this tracker to BizHawk:
1. Download the [Connectors.zip](https://josephanimate2021.github.io/oracle-of-ages-web-tracker/Connectors.zip) file.
2. Extract the Connectors.zip file upon download completion.
3. Open BizHawk and then your legally dumped Oracle of Ages rom, whatever it is a randomizer or vanilla game (I may need to add a check for that).
4. Once the rom is open, go into Tools > Lua Console.
5. Once in Lua Console, go to Script -> Open Script
6. Look for the Connector.lua inside the BizHawk folder of the Connectors folder you just extracted. Once you find it, click it and let it do it's thing. I'll put out the rest of the steps once server connection is finished.
