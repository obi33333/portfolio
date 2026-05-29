export type ProjectMedia = {
  type: "image" | "video" | "gif";
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  category: "one-day" | "robotics" | "film-vfx" | "professional";
  title: string;
  summary: string;
  tags: string[];
  timeframe?: string;
  /** Card thumbnail — image or video. Path relative to /public. */
  preview?: ProjectMedia;
  /** Extra media shown on the detail page below the body text. */
  media?: ProjectMedia[];
  links?: { live?: string; article?: string; repo?: string; github?: string; youtube?: string; pdf?: string; model?: string };
  body: string[];
  /** If true, embedded videos on this project's detail page keep audio unmuted. */
  keepAudio?: boolean;
};

const PROJECTS: Project[] = [
  // ── One Day Projects ────────────────────────────────────────────────────────
  {
    slug: "harmonic-hues",
    category: "one-day",
    keepAudio: true,
    title: "Harmonic Hues",
    summary:
      "A real-time audio-reactive painterly visualizer built in TouchDesigner. Colors mix and move like wet paint in response to whatever song is loaded.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding", "Animation", "Installation", "Prototyping"],
    preview: { type: "image", src: "/projects/harmonic-hues/cover.jpg", alt: "Harmonic Hues visualizer still" },
    media: [{ type: "video", src: "/projects/harmonic-hues/demo.mp4" }],
    body: [
      "Harmonic Hues is a TouchDesigner visualizer I built around the idea of paint being alive — colors mixing and blending in response to whatever song is playing, not just bouncing bars or a spectrum graph.",
      "You load a track and the whole thing adjusts automatically. Color palettes shift, brushstroke density changes, the motion settles into the rhythm. No presets to configure, no knobs to turn.",
      "The aesthetic mattered a lot here. I wanted it to feel like painting, not like a screensaver — something that felt physical even though it was entirely procedural.",
    ],
  },
  {
    slug: "crt-game",
    category: "one-day",
    title: "CRT Game",
    summary:
      "A community plant growth simulation running on three salvaged CRT televisions. Passersby press a physical button to collaboratively grow a shared digital plant.",
    tags: ["Unity", "Game Dev", "Physical Computing", "Installation", "Animation"],
    preview: { type: "image", src: "/projects/crt-game/cover.jpg", alt: "CRT Game on television screens" },
    media: [{ type: "gif", src: "/projects/crt-game/demo.mp4" }],
    body: [
      "I had three CRT TVs in the Art and Design building that weren't being used for anything. After enough convincing, a professor let me keep them there for a semester to run an installation.",
      "Anyone walking through the hallway could hit a physical button to interact with it. Each press had a probabilistic chance of growing the shared plant, so over time the plant reflected everyone who had stopped to push it.",
      "The part I liked most was that nobody had to know what it was or read instructions. The button was just there. Some people pressed it once and kept walking. Some people stood there for a while.",
    ],
  },
  {
    slug: "desktop-pet",
    category: "one-day",
    title: "Desktop Pet",
    summary:
      "A custom Shimeji desktop companion based on Oba, a personal doodle character. Adapted from a vintage early-2000s Japanese desktop pet application.",
    tags: ["Animation", "Creative Coding"],
    preview: { type: "image", src: "/projects/desktop-pet/DesktopPetCoverImage.png", alt: "Desktop Pet character screenshot" },
    media: [{ type: "video", src: "/projects/desktop-pet/demo.mp4" }],
    body: [
      "Oba is a character I've been drawing since high school. He shows up in sketchbooks, margins, random notes. At some point I just wanted him to live on my computer.",
      "I found a Japanese Shimeji desktop pet application from the early 2000s and figured out how to swap out the character assets. Redrew every animation frame to match how Oba actually looks and moves.",
      "He climbs window edges, falls off things, wanders around. It's a small thing but it's satisfying in the way that most character work is satisfying — seeing something you made on paper start moving around on its own.",
    ],
  },
  {
    slug: "custom-lively-wallpapers",
    category: "one-day",
    title: "Custom Lively Wallpapers",
    summary:
      "An interactive desktop wallpaper with Spotify controls and a diegetic clock built inside a Three.js scene. Extended from an open-source Lively Wallpaper.",
    tags: ["3D", "Creative Coding", "Prototyping"],
    preview: { type: "image", src: "/projects/custom-lively-wallpapers/cover.png", alt: "Living room wallpaper preview" },
    media: [{ type: "video", src: "/projects/custom-lively-wallpapers/demo.mp4" }],
    body: [
      "I wanted a wallpaper that could control Spotify and show the time without looking like a widget glued on top of the scene. Everything had to feel like it was part of the room, not something pasted over it.",
      "None of the existing Lively Wallpapers did this, so I pulled the source of one I liked and added the functionality myself — Spotify controls and a clock living inside the Three.js scene rather than on top of it.",
      "It's still what I use on my desktop. The clock is a painting on the wall. The music controls are a stereo on the shelf. A small thing, but one I think about a lot.",
    ],
  },
  {
    slug: "indy-film",
    category: "one-day",
    title: "Indie Film Project",
    summary:
      "A self-directed Blender animation series built around the image of fish flying through open sky. Made early in my 3D journey using free Sketchfab assets.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "image", src: "/projects/indy-film/preview.png", alt: "Indie Film Project render still" },
    media: [
      { type: "gif", src: "/projects/indy-film/birds.mp4" },
      { type: "video", src: "/projects/indy-film/skyfish.mp4" },
    ],
    body: [
      "This started with a single image: fish drifting through open sky instead of water. I wanted to see what that world looked like, so I started building it in Blender.",
      "I was still pretty early in learning the software, so I used free models from Sketchfab and figured things out as I went. It ended up as a series of short clips across different environments and moods.",
      "Looking back, the technical quality is rough. But I'm more proud of this than a lot of things I've made since. I committed to a strange idea before I knew how to pull it off, and I finished it anyway.",
    ],
  },
  {
    slug: "live-texture-painting",
    category: "one-day",
    title: "Live Texture Painting",
    summary:
      "A live texture painting experiment using real watercolor and a webcam as input to Blender. Physical brushwork applied directly to 3D models in real time.",
    tags: ["Blender", "3D", "Creative Coding", "Prototyping"],
    preview: { type: "gif", src: "/projects/live-texture-painting/demo.mp4" },
    media: [
      { type: "video", src: "/projects/live-texture-painting/timelapse.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip3.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip4.mp4" },
    ],
    body: [
      "I set up a webcam over a watercolor painting session and fed the footage directly into Blender as a live texture input. Whatever I painted on paper immediately appeared on the surface of the 3D model.",
      "The result is a series of still life renders where the surface texture is a literal record of physical brushwork. The objects look like they were actually painted because in a way they were.",
      "I also shot time-lapse of the whole process — modeling, painting, and rendering happening at the same time. There's something worth documenting in that overlap.",
    ],
  },
  {
    slug: "pinball-game",
    category: "one-day",
    title: "Pinball Game",
    summary:
      "A body-controlled pinball game where force sensing resistors let players use physical pressure to operate the flippers. Built in Unity with Arduino hardware.",
    tags: ["Unity", "Electronics", "Physical Computing", "Game Dev", "Installation", "Prototyping"],
    preview: { type: "image", src: "/projects/pinball-game/cover.jpg", alt: "Pinball game setup photo" },
    media: [{ type: "video", src: "/projects/pinball-game/demo.mp4" }],
    body: [
      "The idea was simple: what if how hard you pressed the button actually mattered? Force sensing resistors on each flipper send analog pressure readings to Unity over serial, so a light tap and a full press do different things.",
      "The hardware is minimal — a handful of sensors and some wire. The whole point was to keep the physical setup simple enough that the interaction was the interesting part.",
      "It plays very differently from a regular pinball game. People who figure out the pressure sensitivity play more carefully than people who don't.",
    ],
  },
  {
    slug: "poems",
    category: "one-day",
    keepAudio: true,
    title: "Poems",
    summary:
      "A series of Blender renders paired with original poetry and music composed in FL Studio. Each piece starts as text and works outward from there.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "image", src: "/projects/poems/cover.jpg", alt: "Poems visual still" },
    media: [
      { type: "video", src: "/projects/poems/demo.mp4", caption: "Poem 1" },
      { type: "video", src: "/projects/poems/poem2.mp4", caption: "Poem 2" },
      { type: "video", src: "/projects/fish-poem/demo.mp4", caption: "Fish Poem" },
    ],
    body: [
      "Each piece in this series starts with a poem written first, then translated into a Blender render and a piece of music in FL Studio. The visual and audio work is there to serve the text.",
      "I like working in that order. Starting from language keeps the visual choices honest — they have to mean something specific rather than just look good.",
      "Compositing in Premiere Pro brought everything together at the end. The goal was always for the three things to feel like one thing.",
    ],
  },
  {
    slug: "renders",
    category: "one-day",
    title: "Renders",
    summary:
      "A personal collection of Blender renders spanning college — from early stylistic experiments freshman year through polished stills and a LookingGlass holographic diorama.",
    tags: ["Blender", "3D", "Animation"],
    preview: { type: "image", src: "/projects/renders/preview.png", alt: "Oba character render" },
    media: [
      {
        type: "image",
        src: "/projects/renders/oba-silly.png",
        alt: "Bar renders",
        caption: "Bar renders — made freshman year, just exploring the software and learning what Blender could do.",
      },
      {
        type: "gif",
        src: "/projects/renders/bar-close.mp4",
        caption: "BarClose — a close-up render from the same bar scene, freshman year.",
      },
      {
        type: "gif",
        src: "/projects/renders/cartoon-ocean.mp4",
        caption: "CartoonOcean — freshman year, learning modeling techniques and experimenting with stylized shading.",
      },
      {
        type: "gif",
        src: "/projects/renders/oba-rebel.mp4",
        caption: "ObaRebel — made in free time, trying to push the limits of my style and see what works.",
      },
      {
        type: "gif",
        src: "/projects/renders/oba-material.mp4",
        caption: "ObaMaterial — free time exploration, seeing what works and what is too strange.",
      },
      {
        type: "gif",
        src: "/projects/renders/snoopy.mp4",
        caption: "Snoopy — made to be displayed on a LookingGlass holographic display as a 3D diorama you can look around.",
      },
    ],
    body: [
      "A collection of Blender work made in personal time over about four years — not assignments, not client work, just things I wanted to make.",
      "The range is intentional. Early freshman-year renders sit alongside more recent work and I haven't hidden the older stuff. The progression is visible, and I think that's worth showing.",
      "The most recent piece is a Snoopy scene made specifically for a LookingGlass display — a light-field display that shows the scene as a holographic diorama you can look around by moving your head.",
    ],
  },
  {
    slug: "rotoscope",
    category: "one-day",
    title: "Rotoscope",
    summary:
      "A rotoscoped animation made in Blender's Grease Pencil system during sophomore year. Frame-by-frame work inside a 3D environment.",
    tags: ["Blender", "Animation"],
    preview: { type: "image", src: "/projects/rotoscope/cover.png", alt: "Rotoscope animation still" },
    media: [{ type: "gif", src: "/projects/rotoscope/demo.mp4" }],
    body: [
      "Made in Blender's Grease Pencil 2D animation system during sophomore year — tracing and re-interpreting live footage frame by frame inside a 3D environment.",
      "What I got from this project wasn't really the finished animation. It was the patience. Frame-by-frame work forces you to commit to every drawing in a way that interpolation just doesn't.",
      "It opened up a way of working that I've come back to since. 2D animation living inside 3D space is a combination I find genuinely interesting.",
    ],
  },
  {
    slug: "tell-me-whats-real",
    category: "one-day",
    keepAudio: true,
    title: "Tell Me What's Real",
    summary:
      "A music video made for Angelo (Disuko Music) pulling from After Effects, Premiere Pro, TouchDesigner, and Blender. A full-pipeline collaborative project.",
    tags: ["Blender", "TouchDesigner", "Animation", "Music Video", "Audio Visualization", "VFX"],
    preview: { type: "image", src: "/projects/tell-me-whats-real/cover.jpg", alt: "Tell Me What's Real music video still" },
    media: [{ type: "video", src: "/projects/tell-me-whats-real/demo.mp4" }],
    body: [
      "Angelo and I made this song together, and afterward I produced the music video. The creative direction was wide open — which is both the best and the hardest kind of brief to work with.",
      "The production pulled from four different environments: After Effects for compositing and motion graphics, TouchDesigner for real-time generative elements, Blender for 3D sequences, and Premiere Pro for the final edit and color. Using all four in one project required thinking carefully about how things move between them, but the variety gave the final piece a layered quality that a single-tool approach wouldn't have.",
      "Working with someone you trust enough to be experimental with is rare. This project got to be something genuinely strange because of that.",
    ],
  },
  {
    slug: "touchdesigner-visualizers",
    category: "one-day",
    keepAudio: true,
    title: "TouchDesigner Visualizers",
    summary:
      "A personal collection of audio visualizers built in TouchDesigner in free time. Ongoing creative practice with reactive audiovisual systems.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding"],
    preview: { type: "image", src: "/projects/touchdesigner-visualizers/cover.jpg", alt: "TouchDesigner visualizer still" },
    media: [{ type: "video", src: "/projects/touchdesigner-visualizers/demo.mp4" }],
    body: [
      "Personal work — made in free time, for no reason other than that building reactive audiovisual systems is something I genuinely enjoy doing.",
      "Each one is a different experiment: different feedback structures, different audio analysis approaches, different visual languages. TouchDesigner rewards obsessive iteration and that's more or less what this collection documents.",
      "For a stretch of time these ran on three CRT TVs in an apartment. The TVs are gone now. The practice isn't.",
    ],
  },
  {
    slug: "trust-fall",
    category: "one-day",
    keepAudio: true,
    title: "Trust Fall",
    summary:
      "A live-cut music video performed in real time using TouchDesigner and Unity. Every cut in the final video was made live during the song.",
    tags: ["TouchDesigner", "Unity", "Music Video", "Live Performance", "Animation", "Audio Visualization"],

    preview: { type: "image", src: "/projects/trust-fall/cover.jpg", alt: "Trust Fall music video still" },
    media: [{ type: "video", src: "/projects/trust-fall/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=ppWb32owQPo" },
    body: [
      "The final video was performed before it was produced. Scenes built in TouchDesigner and Unity were switched and composited live during the song, with the result captured as the finished piece.",
      "Calling it editing would be wrong — there was no edit after the fact. Every cut in the video is a decision made in real time while the music was playing.",
      "That gives it a specific kind of energy. The transitions feel live because they are. There's an imperfection to it that I think would be very difficult to fake in post.",
    ],
  },

  {
    slug: "oscilloscope",
    category: "one-day",
    keepAudio: true,
    title: "Oscilloscope",
    summary:
      "A custom VST programmed in FL Studio that converts stereo audio into XY coordinates and draws it on a real oscilloscope in real time. Also includes SVGs rendered as oscilloscope visuals.",
    tags: ["Audio Visualization", "Creative Coding", "Animation", "Prototyping"],
    preview: { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
    media: [
      { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
      { type: "video", src: "/projects/oscilloscope/demo.mp4" },
    ],
    body: [
      "I wanted to draw with sound. I programmed a VST plugin in FL Studio that converts a song's stereo channels — left and right — directly into XY coordinates that drive an oscilloscope. The waveform becomes the image.",
      "I also pushed SVG files through the same pipeline, converting vector graphics into audio data and displaying them on the scope as oscilloscope visuals. A drawing becomes a sound becomes a drawing again.",
      "It's one of those projects that ends up somewhere completely different than it starts. I thought it would be a neat trick. It turned into something that felt more like a new medium.",
    ],
  },

  // ── Film / VFX ───────────────────────────────────────────────────────────────
  {
    slug: "aces-wired",
    category: "film-vfx",
    keepAudio: true,
    title: "Aces Wired",
    summary:
      "A short film about four gambling addicts who have to expose a rigged poker system to survive. Made senior year at Chatham University across Premiere Pro, After Effects, and Blender.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    timeframe: "Senior year, Chatham University",
    preview: { type: "image", src: "/projects/aces-wired/cover.jpg", alt: "Aces Wired film still" },
    media: [{ type: "video", src: "/projects/aces-wired/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=Mjet_qw9yPs" },
    body: [
      "Four gambling addicts trapped in a high-stakes poker game in a neon-lit dystopian future. To survive, they have to overcome their distrust of each other and work together to expose the real cheater — and the rigged system behind it. Made in collaboration with two other students for an advanced visual effects course senior year at Chatham.",
      "The pipeline ran across Premiere Pro for editing, After Effects for compositing and grade, and Blender for 3D environment extensions and effects work. Coordinating that across three people over a full semester required a lot of organization at every stage.",
      "It's a complete short film from script to final color. One I'm genuinely proud of as a piece of collaborative work.",
    ],
  },
  {
    slug: "are-you-engaged",
    category: "film-vfx",
    title: "Are You Engaged?",
    summary:
      "A multi-screen audiovisual installation across three stacked CRT televisions. Satirical, surrealist, and direct commentary on media consumption and online echo chambers running simultaneously.",
    tags: ["TouchDesigner", "Installation", "VFX"],
    preview: { type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" },
    media: [{ type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" }],
    links: { youtube: "https://www.youtube.com/watch?v=XI30lZMrOoA" },
    body: [
      "ARE YOU ENGAGED? / I AM NOT ENGAGED runs on three vertically stacked CRT televisions. The format is the argument — three channels of modern media content compressed into the same vertical column, competing for the viewer's attention at once.",
      "The piece runs across three tonal registers simultaneously: satire, surrealism, and straight commentary. The flatness between them is deliberate, mirroring the way actual media consumption makes everything feel equally weighted.",
      "Made with Premiere Pro, TouchDesigner, and After Effects. The three-screen format forces choices about where to look the same way a feed forces you to choose what to scroll past.",
    ],
  },
  {
    slug: "handmade-animations",
    category: "film-vfx",
    keepAudio: true,
    title: "Handmade Animations",
    summary:
      "Frame-by-frame hand animation made for a handmade animation course. The first traditional animation work produced entirely by hand, no digital assist.",
    tags: ["Animation"],
    preview: { type: "image", src: "/projects/handmade-animations/cover.jpg", alt: "Handmade animation still" },
    media: [{ type: "video", src: "/projects/handmade-animations/demo.mp4" }],
    body: [
      "The first animation I ever made entirely by hand, frame by frame, with no digital assist. Made for a handmade animation course.",
      "Working without software removes all the safety nets. Every mark is committed. You can't undo a frame once it's drawn — you can only draw the next one and hope the motion reads.",
      "I approach digital animation differently now because of this. Understanding where the medium comes from changes what tools you reach for.",
    ],
  },
  {
    slug: "vfx-kill-robot",
    category: "film-vfx",
    title: "SciFi VFX",
    summary:
      "A Blender VFX composite integrating a Mixamo-rigged character into live footage using an Ian Hubert-inspired handheld camera workflow. A personal skills push in third year.",
    tags: ["Blender", "Animation", "VFX"],
    preview: { type: "gif", src: "/projects/vfx-kill-robot/demo.mp4" },
    media: [{ type: "gif", src: "/projects/vfx-kill-robot/maniacSMALL.mp4" }],
    body: [
      "A Blender VFX shot — a Mixamo-rigged character integrated into live footage using an Ian Hubert-inspired approach. Made in third year specifically to prove I could take a shot from plate to finished composite on my own.",
      "Ian Hubert's workflow prioritizes speed and kinetic energy over technical perfection. Handheld, imperfect, cinematic. Adopting it meant learning Blender's camera tracking and compositing tools as one connected pipeline rather than separate steps.",
      "The challenge with this kind of shot is making the CG feel present in the space. Getting it wrong is obvious. Getting it right, nobody notices.",
    ],
  },
  {
    slug: "vfx-spaceship",
    category: "film-vfx",
    title: "VFX Spaceship",
    summary:
      "A sci-fi VFX sequence built in Blender using Ian Hubert's production approach. Handheld aesthetics combined with high-production-value 3D environments.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "gif", src: "/projects/vfx-spaceship/demo.mp4" },
    media: [{ type: "gif", src: "/projects/vfx-spaceship/demo.mp4" }],
    body: [
      "Sci-fi is a reference point that comes up in a lot of what I make — the way it puts you in an impossible place and asks you to believe it. I wanted to try building that feeling myself using only Blender and publicly available techniques.",
      "This came out of Ian Hubert's unlisted tutorial series, which is almost entirely about making high-production-value 3D environments feel grounded through handheld camera work and smart compositing choices.",
      "The techniques here are a foundation more than a finished thing. The core question — how do you make a spaceship feel real — is one I keep coming back to.",
    ],
  },

  // ── Robotics / Product Production ────────────────────────────────────────────
  {
    slug: "capstone",
    category: "robotics",
    title: "Haptic Alarm System (Capstone)",
    summary:
      "Senior immersive media thesis: a haptic-based alarm system designed to replace audio alerts in critical medical environments like the NICU, where alarm fatigue is a real problem.",
    tags: ["Electronics", "Physical Computing", "Prototyping", "Robotics"],
    timeframe: "Senior year thesis, Chatham University",
    preview: { type: "image", src: "/projects/capstone/cover.jpg", alt: "Haptic fob device photo" },
    media: [
      { type: "gif", src: "/projects/capstone/demo.mp4" },
      { type: "image", src: "/projects/capstone/img2.jpeg", alt: "Haptic fob device" },
      { type: "image", src: "/projects/capstone/img5.jpeg", alt: "Device assembly" },
      { type: "image", src: "/projects/capstone/img563.jpeg", alt: "Device detail" },
      { type: "image", src: "/projects/capstone/img564.jpeg", alt: "Internal components" },
      { type: "image", src: "/projects/capstone/img565.jpeg", alt: "Final prototype" },
    ],
    links: { pdf: "/projects/capstone/presentation.pdf" },
    body: [
      "My senior thesis for immersive media is a haptic alarm system meant to replace audio alerts in medical environments like the NICU.",
      "The problem it's addressing is alarm fatigue — when so many alarms are going off all the time, clinical staff stop hearing them individually. The system routes alerts to a wearable haptic fob instead, giving staff distinct, private signals without adding more noise to an already loud room.",
      "Built on Arduino hardware for the haptic actuators, with a C# and .NET backend handling alarm routing and priority management.",
    ],
  },
  {
    slug: "clocky-internship",
    category: "robotics",
    title: "Clocky — Alarm Clock R&D",
    summary:
      "Mechanical engineering internship with Clocky, developing a next-generation consumer alarm clock from concept through iterative hardware prototyping.",
    tags: ["Electronics", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/clocky-internship/coverimage.png", alt: "Clocky prototype photo" },
    media: [{ type: "video", src: "/projects/clocky-internship/demo.mp4" }],
    body: [
      "Clocky makes the alarm clock that runs away when you hit snooze. The internship was on their next product — a new concept developed from scratch.",
      "The work covered the full early-stage loop: figuring out what the product should be, building proofs of concept, testing, iterating, and documenting each stage. Small hardware companies need people who can do a lot of different things, and I learned to be useful across the whole stack.",
      "Working on a consumer product through its earliest stages — before there's anything polished to show — is a specific kind of work. You spend a lot of time being uncertain and building anyway.",
    ],
  },
  {
    slug: "jimmy",
    category: "robotics",
    keepAudio: true,
    title: "Jimmy",
    summary:
      "A machine learning robot built around the concept of homeostasis. Uses a solar panel and photocell to seek light and self-sustain. Later repurposed as a cat toy.",
    tags: ["Electronics", "Robotics", "Machine Learning"],
    preview: { type: "video", src: "/projects/jimmy/demo.mp4" },
    media: [{ type: "video", src: "/projects/jimmy/demo.mp4" }],
    body: [
      "Jimmy is built around one concept: homeostasis. He has a solar panel and a photocell, and he spends his time seeking out light sources to keep himself charged.",
      "The machine learning component governs his navigation and search behavior. He adapts based on what he finds rather than following a fixed pattern — he gets better at finding light over time.",
      "After the academic work was done, Jimmy became a cat toy. Both applications turned out to be successful, which feels like the right outcome for a robot designed around self-preservation.",
    ],
  },
  {
    slug: "knights-of-isiah",
    category: "robotics",
    title: "Knights of Isiah",
    summary:
      "A custom Raspberry Pi multitool built for a friend, with RFID scanning, a virtual pet, infrared signal cloning, and a microphone-based frequency reader all in one handheld device.",
    tags: ["Electronics", "Physical Computing", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/knights-of-isiah/cover.png", alt: "Knights of Isiah device photo" },
    media: [
      { type: "video", src: "/projects/knights-of-isiah/doc1.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc2.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc3.mp4" },
    ],
    body: [
      "Two classmates and I built this for our friend Isiah. The design challenge was knowing the user well enough that the device actually matched who he was — RFID scanning, a virtual pet, infrared signal cloning, and a microphone-based frequency reader, all in one handheld form.",
      "We built it on a Raspberry Pi 3, which meant writing drivers for each hardware module and designing an interface that made four very different tools feel like one coherent device.",
      "Building for a specific person is genuinely different from building for an abstract user. When the user is standing in the room watching you work, every decision gets a lot more concrete.",
    ],
  },
  {
    slug: "plunter",
    category: "robotics",
    keepAudio: true,
    title: "Plunter",
    summary:
      "A robot that translates houseplant moisture data into natural speech using an AI voice model trained on a professor's voice. Built with Raspberry Pi and Arduino Uno.",
    tags: ["Electronics", "Physical Computing", "Machine Learning", "Installation", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/plunter/cover.png", alt: "Plunter robot photo" },
    media: [
      { type: "video", src: "/projects/plunter/demo.mp4" },
      { type: "video", src: "/projects/plunter/clip2.mp4" },
    ],
    body: [
      "Most people don't know what their houseplant needs. Most soil moisture sensors give you a number that doesn't mean much. Plunter turns that data into speech.",
      "Using a Raspberry Pi and Arduino Uno, the system reads soil moisture levels and speaks them out loud through an AI-generated voice model — trained specifically on a professor's voice, which gives the plant a distinctly pedagogical quality.",
      "It works, and it is a little strange to have a plant telling you things in your professor's voice. That strangeness felt right for the concept.",
    ],
  },
  {
    slug: "trash-bot",
    category: "robotics",
    title: "Trash Bot",
    summary:
      "A four-hour rapid prototype built from cardboard, ultrasonic sensors, motors, and an Arduino Uno. The solar panel actually works.",
    tags: ["Electronics", "Robotics", "Physical Computing", "Prototyping"],
    preview: { type: "video", src: "/projects/trash-bot/demo.mp4" },
    media: [{ type: "video", src: "/projects/trash-bot/demo.mp4" }],
    body: [
      "I wanted to know if I could design, wire, and program a functional robot in four hours using only what was on hand. The answer was yes.",
      "Two ultrasonic sensors feed distance data to an Arduino Uno that handles motor control and navigation. The body is cardboard. The solar panel on top actually works.",
      "Constraint is a design tool. Four hours and scrap materials produced something that moves through space and avoids obstacles. That's all it needed to do.",
    ],
  },

  // ── Professional Experience ──────────────────────────────────────────────────
  {
    slug: "wj-beitler",
    category: "professional",
    title: ".NET MAUI Developer & IT Analyst — W.J. Beitler",
    summary:
      "App developer and IT analyst at W.J. Beitler, a trucking company. Building mobile frontend interfaces in .NET MAUI, working with SQL, and refactoring legacy backend systems.",
    tags: [".NET MAUI", "SQL", "Mobile Development", "C#", "IT"],
    timeframe: "2025–Present",
    preview: { type: "video", src: "/projects/wj-beitler/demo.mp4" },
    media: [{ type: "video", src: "/projects/wj-beitler/demo.mp4" }],
    body: [
      "I work at W.J. Beitler as a .NET MAUI developer and IT analyst. Beitler is a trucking company, and I've been building out their mobile and internal tooling since 2025.",
      "On the development side, I write the frontend in .NET MAUI — XAML pages, UI components, integrating custom libraries to build out application functionality. I use SQL Management Studio to query and track operational data, and I wrote batch file tools to automate ADB device connections for the team. I also debug scripts, handle testing, and have been refactoring legacy Web API controller classes to bring them in line with a code-generation-based architecture.",
      "It's a mix of building new things and cleaning up old ones, which is pretty much what you'd expect at a company that has been running for a long time.",
    ],
  },
  {
    slug: "clayze-ta",
    category: "professional",
    title: "Teaching Assistant — Clayze Program",
    summary:
      "Full-time Teaching Assistant for a joint CMU / Chatham University immersive media program from 2022 to 2024, coaching students across 3D modeling, Arduino, RealSense, LookingGlass, and Meta Quest.",
    tags: ["Electronics", "3D", "Physical Computing", "Installation"],
    timeframe: "2022–2024",
    preview: { type: "image", src: "/projects/clayze-ta/thumb.jpg", alt: "Clayze program in session" },
    media: [{ type: "gif", src: "/projects/clayze-ta/demo.mp4" }],
    links: {
      article: "https://www.pulse.chatham.edu/blog-stories/immersive-media-imm-academic-visit-day-chatham-university-3d-models-clayze",
    },
    body: [
      "Full-time TA for two years on a joint program between Carnegie Mellon's Frank-Ratchye Studio for Creative Inquiry and Chatham University's Extended Reality Technology Center. The work was supporting students building novel 3D modeling tools with the Clayze package across Intel RealSense depth cameras, LookingGlass holographic displays, Arduino microcontrollers, and Meta Quest headsets.",
      "The thing I kept coming back to was the translation problem: taking a technical system and making it feel approachable without hiding what it actually is. Students who understand the tool work differently than students who've just memorized the steps.",
      "Two years of that work changed how I explain technical things and how I build them. If something is hard to teach, it's usually hard for a reason worth understanding.",
    ],
  },
  {
    slug: "projection-mapping-rave",
    category: "professional",
    keepAudio: true,
    title: "Projection Mapping — Disuko Rave",
    summary:
      "Designed and operated live projection visuals for a rave hosted by Angelo (Disuko Music), built in TouchDesigner using existing Disuko brand assets.",
    tags: ["TouchDesigner", "Projection Mapping", "Live Performance"],
    preview: { type: "image", src: "/projects/projection-mapping-rave/thumb.jpg", alt: "Projection mapping at the Disuko rave" },
    media: [{ type: "video", src: "/projects/projection-mapping-rave/demo.mp4" }],
    body: [
      "Angelo hosted a rave and asked me to handle the visual environment. The brief was to make something that felt native to the Disuko aesthetic — using his existing brand art as source material rather than building from scratch.",
      "I built a real-time system in TouchDesigner that remixed and animated the Disuko artwork, synchronized to the audio in the room.",
      "Live visual work is different from studio work in one important way: you're making decisions in public, in real time, in front of people. The system needs to be stable enough to trust and flexible enough to actually use under pressure.",
    ],
  },
  {
    slug: "projection-mapping-show",
    category: "professional",
    keepAudio: true,
    title: "Projection Mapping — Library Show",
    summary:
      "Produced and operated a large-scale projection show on the front of the university library for the Immersive Media department, curating and preparing student artwork for architectural display.",
    tags: ["TouchDesigner", "Projection Mapping", "Live Performance"],
    preview: { type: "image", src: "/projects/projection-mapping-show/CoverImage.png", alt: "Library projection show" },
    media: [{ type: "video", src: "/projects/projection-mapping-show/20240419_010326000_iOS.mov" }],
    body: [
      "As part of my role with the Immersive Media department, I was put in charge of a large-scale projection show on the front facade of the university library.",
      "The job had two parts: curation and execution. I collected student artwork from across the department, chose and prepared pieces for display at architectural scale, then managed the technical setup and operation of the show itself.",
      "Architectural projection is a coordination problem as much as it is a technical one. Getting work that was made for screens to read correctly on the side of a building requires different thinking at almost every stage.",
    ],
  },
  {
    slug: "olkes-collection",
    category: "professional",
    title: "The Olkes Collection",
    summary:
      "Hired to photoscan and retexture a collection of African artifacts, producing high-fidelity 3D models in FBX, GLB, PLY, and STL formats for archival and research use.",
    tags: ["3D"],
    preview: { type: "image", src: "/projects/olkes-collection/preview.png", alt: "Three heads mask 3D render" },
    media: [
      { type: "gif", src: "/projects/olkes-collection/demo.mp4", caption: "Polycam scan preview — turntable render of the three heads mask" },
      { type: "image", src: "/projects/olkes-collection/three_heads_gpu.png", alt: "Three heads mask render", caption: "Three Heads Mask — image-textured 3D render" },
      { type: "image", src: "/projects/olkes-collection/mask_render.png", alt: "Three heads mask image texture render", caption: "Three Heads Mask — image texture applied" },
      { type: "image", src: "/projects/olkes-collection/mask_final.png", alt: "Mask final render", caption: "Helmet Mask — final textured render" },
      { type: "image", src: "/projects/olkes-collection/staff_render.png", alt: "Staff render", caption: "Cultivators Staff — final textured render" },
      { type: "image", src: "/projects/olkes-collection/three_heads_cpu.png", alt: "Three heads render CPU", caption: "Three Heads Mask — alternate render pass" },
    ],
    links: { model: "/projects/olkes-collection/three_heads.glb" },
    body: [
      "I was hired to photoscan a collection of African artifacts and produce high-fidelity 3D models for archival and research use. The collection included a three-headed helmet mask, a cultivators staff, and several other pieces.",
      "Each object was captured with hundreds of overlapping photographs from multiple angles, processed into a point cloud, and reconstructed as a textured mesh. The pipeline used Polycam for capture and scan processing, then Blender for cleanup, UV unwrapping, and retexturing. Final deliverables went out in FBX, GLB, PLY, and STL to cover a range of downstream use cases — from web embedding to physical reproduction.",
      "Working with culturally significant objects puts real responsibility on the technical process. Accuracy matters here not just as a craft standard — the models become a record of the objects, and that's worth taking seriously.",
    ],
  },
];

export function getAllProjects(): Project[] {
  return [...PROJECTS];
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getRecentProjects(count = 3): Project[] {
  return PROJECTS.slice(0, count);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
