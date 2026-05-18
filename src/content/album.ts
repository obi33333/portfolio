export type AlbumTrack = {
  title: string;
  artists?: string[];
  description: string;
  src?: string;
  format?: "mp3" | "wav";
  isBonus?: boolean;
};

export const ALBUM = {
  title: "Art is an Offer",
  about: [
    "This album is a project I have been working on for about 9 months, titled Art is an Offer. It is EDM mixed with acoustic instruments and vocals.",
    "More than anything, this album was a fun way to spend time making art with my friends.",
    "The meaning of this album for me came from a conversation with my stepdad where he explained that you never know what can matter to people — and that art is an offer.",
  ],
  modelSrc: "/album/model/album.glb",
  tracks: [
    {
      title: "Looking Glass",
      artists: ["fawn"],
      description:
        "Based on the story of Alice in Wonderland. Made with my partner handling vocals.",
      src: "/album/tracks/looking glass.mp3",
      format: "mp3",
    },
    {
      title: "See Tracks Think Train",
      artists: ["vvails", "disuko", "moe"],
      description:
        "Made this song for fun before I had the idea to make an album. I invited friends from a band I know to play on it.",
      src: "/album/tracks/See Tracks Think Train.mp3",
      format: "mp3",
    },
    {
      title: "Song For The Trees",
      artists: ["moe", "Harley", "disuko", "honeytea"],
      description:
        "Written as a conversation between an old tree and a young tree. Combines EDM production with analog techniques and instruments.",
      src: "/album/tracks/Song For The Trees.mp3",
      format: "mp3",
    },
    {
      title: "Phone Call / Voicemail",
      description:
        "An interlude created using a custom VST I programmed that lets me define harmonic ratios on sine waves.",
      src: "/album/tracks/Phone call-Voicemail.mp3",
      format: "mp3",
    },
    {
      title: "Graduation Song",
      artists: ["liam", "fawn", "disuko"],
      description:
        "A song about finishing school and processing the emotions surrounding graduation.",
      src: "/album/tracks/Graduation Song.mp3",
      format: "mp3",
    },
    {
      title: "Losing Meaning",
      artists: ["liam", "fawn"],
      description:
        "Came from a late-night session at 412 Studios where we were experimenting without intending to make a full song.",
      src: "/album/tracks/Lost Meaning.wav",
      format: "wav",
    },
    {
      title: "Nonexistent Interlude",
      description: "Work in progress.",
    },
  ] satisfies AlbumTrack[],
  bonusTracks: [
    {
      title: "Homeswitcher",
      artists: ["fawn", "disuko"],
      description:
        "A full remake of one of my favorite songs, recreated just for fun.",
      src: "/album/tracks/HomeSwitcher.wav",
      format: "wav",
      isBonus: true,
    },
    {
      title: "Graduation Song (Disuko Version)",
      artists: ["disuko"],
      description:
        "I produced and mixed the vocals, then sent them to disuko, who later returned this alternate version.",
      src: "/album/tracks/Graduation Song Disuko Version.mp3",
      format: "mp3",
      isBonus: true,
    },
    {
      title: "Glowing Screens",
      artists: ["fawn", "disuko"],
      description: "My first attempt at creating botanica-inspired music.",
      src: "/album/tracks/Glowing Screens.wav",
      format: "wav",
      isBonus: true,
    },
    {
      title: "Moving Out",
      artists: ["disuko"],
      description:
        "A nostalgic collage of influential songs transformed into a dariacore-inspired track.",
      src: "/album/tracks/moving out.mp3",
      format: "mp3",
      isBonus: true,
    },
  ] satisfies AlbumTrack[],
};
