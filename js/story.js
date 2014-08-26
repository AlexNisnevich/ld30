var currentLevel = 0;
var oldLevel = -1;

var beginning = [
  "In a world. . .of broken games. . .one sprite tries to save the fun. . . one to two levels at a time.",
  "SHATTERED WORLDS",
  "Whoa! What happened? All of the games have been destroyed and jumbled all up!",
  "Maybe if I collect all the pieces of the worlds, I can reconstruct them in some way...",
  "Don’t ask me how -- I’m a self aware videogame character! I’ll use my “Sprite Light” or whatever -- don’t worry about it. There’s entire world orders on the line! Come on!"
]

var stories = [
  {
    story : [
      "Home sweet. . .",
      "er",
      "home.",
      "Wait, this isn’t my world, this is “Last of Me and You!”",
      "At least it seems like the zombies are gone. ",
      "Oh look! A shiny thing! My videogame instincts are kicking in to tell me to grab it!"
    ],
    hint : [
      "Oh man, that platform is a big higher than my current altitude. If ONLY I had some sort of way to go in an UP direction!"
    ]
  },
  {
    story : [
      "Whoa! This is another piece of my level! Not exactly a useful one though. Really could have used some crates or something. Even a zombie would have been more helpful than this.",
      "Good thing I picked up those platforms from the last level!"
    ],
    hint : [
      "Oh man, the ONE thing that could have helped was those platforms from the FIRST level. If I had that ONE thing, that would be ONE-derful, and I might have W-ONE. Oh ONE!",
      "Uh, I mean, “oh well!”."
    ]
  },
  {
    story : [
      "Two down! Although this place isn’t as familiar. I’m pretty sure this is a piece of Black Ice 2: SnowMANLIER. Well, I did say I’d put EVERYTHING back together again."
    ],
    hint : [
      "Hmm, that ice is pretty weak. Maybe SnowMAN’s signature move, “Cold Furious Death from Above”, isn’t the best idea here."
    ]
  },
  {
    story : [
      "What?! Even Woodsy’s Bee-utiful Adventure? This is an INNOCENT E-RATED game!!" 
    ],
    hint : [
      "You know what Woodsy always used to say?", 
      "“Eat Kellogg’s Frosted Woodsy Whirls -- Nay-ture are delicious!”",
      "I don’t know about that, but he would also talk about how fun it was to slide across the lakes in the winter. Woodsy sure is a weird old coot!"
    ]
  },
  {
    story : [
      "O.M.G. This is one of my favorite games to visit! I wonder if I’ll meet spaceship racer extraordinaire ZipZoom Glitrock here?? Then I can get his autograph!",
      "Oh yeah, I mean, after I save all these worlds and everything."
    ],
    hint : [
      "They call this game “Space Haste” for a reason.",
      "I don’t have any of Glitrock’s cool space racing gear, but maybe if I can get to a platform on the other side before the space rocks get pulled down by gravity too much..."
    ]
  },
  {
    story : [
      "Oh no! Glitrock and his arch-nemesis Cometal are fighting! I’ve only seen them battle it out on the track. Whoever did this has not only destroyed these games, they’ve destroyed the moral fiber of an intergalactic hero."
    ],
    hint : [
      "It would be nice if there was some constant force that could pull that asteroid down so it wasn’t blocking my way out any longer. Although I may be going out on a limb with that idea. . ."
    ]
  },
  {
    story : [
      "Now that’s my kind of goal—right underneath me, with little work exerted reach it."
    ],
    hint : [
      "Hmm, what’s this? Oh cool, a piece of text from the game!",
      "It says “Even the coldest heart has a weakness, and its always COLD FURIOUS UNRELENTING FORCE FROM ABOVE”, and then it kind of just trails off with a bunch of yelling phonetics."
    ]
  },
  {
    story : [
      "Hmm. It would ALMOST seem like these worlds are trying to help me out with these text hints they’re leaving around, if they weren’t also trying to kill me." 
    ],
    hint : [
      "I can feel the fury of SnowMAN burning inside of me. Glitlock, I’ll save you with sharp icy power!"
    ]
  },
  {
    story : [
      "All these levels I’m carrying around are getting heavy, and still no sign of my world. What happens if this is all that’s left? I mean, I like relaxing in Woodsy’s Meadow as much as the next sprite, but still.",
      "Is this all that’s left for me?" 
    ],
    hint : [
      "Hey look another scrap of text! It reads “Butterflies allow you to rise, but you’ll still need a million tries, without the help of other platform guys”.",
      "Huh, that’s written in the same annoying rhyme scheme that Woodsy speaks in, and is also weirdly specific. I don’t think this is originally from Woodsy’s BEE-utiful Adventure." 
    ]
  },
  {
    story : [
      "No! I must remain positive! Did SnowMAN melt in the face of adversity, even when that adversity was the sun? Even when things seemed hopeless?? No! He persevered, and so will I!" 
    ],
    hint : [
      "Ah! I don’t know if I want to use anti-gravity for this—I don’t want to be any closer to that cold spiky death than I have to be.",
      "I just don’t know if that key is close enough to make it on an Ice Slide alone. . ."
    ]
  },
  {
    story : [
      "Trapped. Starting to get used to this feeling. But there’s also a feeling of finality. Of familiarity.",
      "Could I be near the end of my journey? Am I close to home?"
    ],
    hint : [
      "Oh of course they leave the zombies but none of the high-powered weaponry!",
      "If only there was a way to clear out those zombies so I can get the key. I’ve never really liked violence, but these zombies deserve a death as cold as their clammy flesh. Ugh!" 
    ]
  }
];

function showMessage(lines) {
  var dialog = $("<div class='story-text game-text'>");
  var overlay = $("<div class='story-overlay'>");

  dialog.click(function () {
    dialog.remove();
    overlay.remove();
  });
  overlay.click(function () {
    dialog.remove();
    overlay.remove();
  });
  $("body").append(overlay);
  $("body").append(dialog);
  
  _.each(lines, function (para) {
    var p = $("<p>").text(para);
    dialog.append(p);
  });
}

function showStory() {
  var disabled = $("#no-story").is(":checked");

  if (currentLevel > oldLevel && !disabled) {
    showMessage(stories[currentLevel].story);
    oldLevel = currentLevel;
  }
}

function showHint() {
  showMessage(stories[currentLevel].hint);
}
