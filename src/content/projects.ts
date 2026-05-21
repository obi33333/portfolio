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
      "A real-time audio-reactive painterly visualizer built in TouchDesigner. Blends procedural generation with physical paint simulation and adapts to any song you load.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding"],
    preview: { type: "image", src: "/projects/harmonic-hues/cover.jpg", alt: "Harmonic Hues visualizer still" },
    media: [{ type: "video", src: "/projects/harmonic-hues/demo.mp4" }],
    body: [
      "Harmonic Hues is a painterly audio visualizer built in TouchDesigner that combines procedural and physical paint effects to create an evolving canvas driven entirely by music.",
      "The system is fully dynamic — users can load any song and the visuals automatically adjust color, motion, texture density, and brushstroke behavior to the audio input. No manual configuration required between tracks.",
      "The project draws on both computational aesthetics and the physical feel of wet paint, creating a visual style that sits somewhere between generative art and traditional painting.",
    ],
  },
  {
    slug: "crt-game",
    category: "one-day",
    title: "CRT Game",
    summary:
      "A community-based plant growth simulation displayed on three salvaged CRT televisions. Passersby press a physical button to collaboratively grow a shared digital plant.",
    tags: ["Unity", "Game Dev", "Physical Computing", "Installation"],
    preview: { type: "image", src: "/projects/crt-game/cover.jpg", alt: "CRT Game on television screens" },
    media: [{ type: "gif", src: "/projects/crt-game/demo.mp4" }],
    body: [
      "Built during a student worker position with the Immersive Media department, CRT Game was designed to run continuously on three CRT televisions in the Art and Design building — TVs that remained there thanks to a bit of persuasion with a professor.",
      "The simulation is community-driven: anyone passing by can hit a physical button to interact, with each press having a probabilistic chance of growing the shared plant. The experience accumulates over time, shaped entirely by foot traffic and curiosity.",
      "The project explores passive, low-friction interaction design — making participation feel natural and discovery-driven rather than instructional.",
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
      "Oba is a character I've been doodling for years — a small figure that appears across sketchbooks and margins. This project started with the simple want to have him walk around my screen.",
      "I found an original Japanese Shimeji-ee desktop pet application from the early 2000s and converted its character assets to Oba, redrawing each animation frame to match the character's design vocabulary.",
      "The result is a small, persistent desktop companion that walks, climbs windows, and reacts to the environment — a piece of personal character work made interactive.",
    ],
  },
  {
    slug: "custom-lively-wallpapers",
    category: "one-day",
    title: "Custom Lively Wallpapers",
    summary:
      "An interactive desktop wallpaper with integrated Spotify controls and a diegetic clock, built by extending an open-source Lively Wallpaper using Three.js.",
    tags: ["3D", "Creative Coding"],
    preview: { type: "image", src: "/projects/custom-lively-wallpapers/cover.png", alt: "Living room wallpaper preview" },
    media: [{ type: "video", src: "/projects/custom-lively-wallpapers/demo.mp4" }],
    body: [
      "I wanted a desktop wallpaper that could control Spotify and tell me the time without breaking the visual atmosphere of the environment — a diegetic interface rather than a widget overlay.",
      "Unable to find an existing wallpaper that did this, I took the source code of a free Lively Wallpaper and extended it, adding Spotify playback controls and a clock rendered natively within the Three.js scene.",
      "The project sits at the intersection of UI design and ambient computing — making a tool feel like part of the environment rather than something imposed on top of it.",
    ],
  },
  {
    slug: "indy-film",
    category: "one-day",
    title: "Indie Film Project",
    summary:
      "A self-directed Blender animation series imagining fish flying through the sky. An early exploration of 3D storytelling using free Sketchfab assets.",
    tags: ["Blender", "3D", "Animation"],
    preview: { type: "image", src: "/projects/indy-film/preview.png", alt: "Indie Film Project render still" },
    media: [
      { type: "gif", src: "/projects/indy-film/birds.mp4" },
      { type: "video", src: "/projects/indy-film/skyfish.mp4" },
    ],
    body: [
      "Made fairly early in my Blender journey, this series started with a single image: fish, drifting through open sky instead of water. I wanted to see if I could build a world around that idea.",
      "Using free models from Sketchfab and techniques I was still actively learning, I produced a series of short animated clips exploring the concept across different environments and moods.",
      "Looking back, this project captures something important — the willingness to commit to a strange idea before having the technical chops to fully execute it, and learning by doing rather than waiting.",
    ],
  },
  {
    slug: "live-texture-painting",
    category: "one-day",
    title: "Live Texture Painting",
    summary:
      "A live texture painting experiment in Blender using real watercolor paints and a webcam as input. A series of still life models painted and rendered simultaneously.",
    tags: ["Blender", "3D", "Creative Coding"],
    preview: { type: "gif", src: "/projects/live-texture-painting/demo.mp4" },
    media: [
      { type: "video", src: "/projects/live-texture-painting/timelapse.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip3.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip4.mp4" },
    ],
    body: [
      "This project explores the overlap between physical and digital mark-making. Using a webcam to capture live watercolor painting sessions, I fed that footage directly into Blender as texture input, painting 3D models in real time.",
      "The result is a series of still life renders where the surface texture is a literal record of physical brushwork — watercolor on paper, translated into geometry.",
      "I also captured time-lapse recordings of the modeling and painting sessions together, documenting the dual-medium process as its own kind of artifact.",
    ],
  },
  {
    slug: "pinball-game",
    category: "one-day",
    title: "Pinball Game",
    summary:
      "A body-controlled pinball game built in Unity, where force sensing resistors connected to a microcontroller let players use physical pressure to operate the flippers.",
    tags: ["Unity", "Electronics", "Physical Computing", "Game Dev"],
    preview: { type: "image", src: "/projects/pinball-game/cover.jpg", alt: "Pinball game setup photo" },
    media: [{ type: "video", src: "/projects/pinball-game/demo.mp4" }],
    body: [
      "This project started with a question: what if pinball flippers responded to how hard you press, rather than just whether you press? Force sensing resistors (FSRs) connected to a microcontroller feed analog pressure data to Unity via serial, giving players a tactile, physical relationship with the game.",
      "The hardware setup is deliberately minimal — a few sensors and some wire — keeping the focus on the interaction design rather than the physical build.",
      "The project sits in the space between game development and interaction design, exploring how physical feedback loops change the feel of a digital game.",
    ],
  },
  {
    slug: "poems",
    category: "one-day",
    keepAudio: true,
    title: "Poems",
    summary:
      "A series of Blender renders paired with original poetry and music composed in FL Studio. Visual compositing done in Premiere Pro.",
    tags: ["Blender", "3D", "Animation"],
    preview: { type: "image", src: "/projects/poems/cover.jpg", alt: "Poems visual still" },
    media: [
      { type: "video", src: "/projects/poems/demo.mp4", caption: "Poem 1" },
      { type: "video", src: "/projects/poems/poem2.mp4", caption: "Poem 2" },
      { type: "video", src: "/projects/fish-poem/demo.mp4", caption: "Fish Poem" },
    ],
    body: [
      "Each piece in this series begins with a poem — written first, then translated into a Blender render and a piece of music in FL Studio. The visual and audio work serves the text rather than the other way around.",
      "The renders use a range of Blender techniques, from volumetric lighting to stylized shading, chosen specifically to match the emotional register of each poem.",
      "Compositing in Premiere Pro brought the final elements together, treating the renders, music, and text as a unified audiovisual artifact rather than separate outputs.",
    ],
  },
  {
    slug: "renders",
    category: "one-day",
    title: "Renders",
    summary:
      "A personal collection of Blender renders spanning college, from early stylistic explorations to polished stills and a LookingGlass display diorama.",
    tags: ["Blender", "3D"],
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
      "This collection spans roughly four years of Blender work made in personal time — renders that weren't assignments, weren't client work, just practice and exploration.",
      "The range is intentional: early freshman-year renders sit alongside more polished recent work. The progression is visible, and I think that's worth showing.",
      "The most recent piece in the collection is a Snoopy render made specifically for a LookingGlass display — a holographic light-field display that shows the scene as a physical diorama you can look around.",
    ],
  },
  {
    slug: "rotoscope",
    category: "one-day",
    title: "Rotoscope",
    summary:
      "A rotoscoped animation made in Blender's 2D animation toolkit during sophomore year. A focused dive into frame-by-frame technique.",
    tags: ["Blender", "Animation"],
    preview: { type: "image", src: "/projects/rotoscope/cover.png", alt: "Rotoscope animation still" },
    media: [{ type: "gif", src: "/projects/rotoscope/demo.mp4" }],
    body: [
      "Made as an exercise in Blender's Grease Pencil 2D animation system, this rotoscope project involved tracing and re-interpreting live footage frame by frame within a 3D environment.",
      "At the time this was a new discipline — the patience required for frame-by-frame work, and the particular aesthetic that emerges when human motion is filtered through a handmade mark.",
      "The project opened up a working relationship with 2D animation inside 3D space that has informed several projects since.",
    ],
  },
  {
    slug: "tell-me-whats-real",
    category: "one-day",
    keepAudio: true,
    title: "Tell Me What's Real",
    summary:
      "A music video made for Angelo (Disuko Music) using After Effects, Premiere Pro, TouchDesigner, and Blender. A full-pipeline collaborative creative project.",
    tags: ["Blender", "TouchDesigner", "Animation", "Music Video"],
    preview: { type: "image", src: "/projects/tell-me-whats-real/cover.jpg", alt: "Tell Me What's Real music video still" },
    media: [{ type: "video", src: "/projects/tell-me-whats-real/demo.mp4" }],
    body: [
      "Angelo (Disuko Music) and I made this song together, and afterward I produced the music video. The brief was loose, the aesthetic direction entirely open.",
      "The video pulls from four different production environments — After Effects for compositing and motion graphics, TouchDesigner for real-time generative elements, Blender for 3D sequences, and Premiere Pro for the final edit and color.",
      "Working across that many tools in one project required careful pipeline thinking, but the variety gave the video a layered visual texture that a single-tool approach wouldn't have produced.",
    ],
  },
  {
    slug: "touchdesigner-visualizers",
    category: "one-day",
    keepAudio: true,
    title: "TouchDesigner Visualizers",
    summary:
      "A personal collection of audio visualizers built in TouchDesigner as ongoing creative practice. Made in free time and refined over time.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding"],
    preview: { type: "image", src: "/projects/touchdesigner-visualizers/cover.jpg", alt: "TouchDesigner visualizer still" },
    media: [{ type: "video", src: "/projects/touchdesigner-visualizers/demo.mp4" }],
    body: [
      "These visualizers are personal work — made in free time, not for a course or client, just because building reactive audiovisual systems in TouchDesigner is genuinely enjoyable.",
      "The collection represents an ongoing practice of learning the tool by using it: experimenting with different feedback structures, audio analysis techniques, and visual languages.",
      "For a period these ran on three CRT TVs in an apartment. That context is gone now, but the practice continues.",
    ],
  },
  {
    slug: "trust-fall",
    category: "one-day",
    keepAudio: true,
    title: "Trust Fall",
    summary:
      "A live-cut music video built in TouchDesigner, Unity, and Premiere Pro. Scenes were switched live during performance to create the final edit.",
    tags: ["TouchDesigner", "Unity", "Music Video", "Live Performance"],

    preview: { type: "image", src: "/projects/trust-fall/cover.jpg", alt: "Trust Fall music video still" },
    media: [{ type: "video", src: "/projects/trust-fall/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=ppWb32owQPo" },
    body: [
      "Trust Fall was created as a music video, but the production process is more accurately described as a live performance — scenes built in TouchDesigner and Unity were switched and layered in real time, with the cuts captured as the final video.",
      "This approach removes the conventional editing step and replaces it with a live decision-making process, where the final piece is as much a performance as a production.",
      "The result has a specific kind of energy — the transitions feel live because they are live, and the visual grammar reflects the imperfect responsiveness of a human operator in the moment.",
    ],
  },

  {
    slug: "oscilloscope",
    category: "one-day",
    keepAudio: true,
    title: "Oscilloscope",
    summary:
      "A custom VST programmed in FL Studio that converts stereo audio into XY data and plays it back on an oscilloscope as real-time vector graphics. Includes SVGs rendered as oscilloscope visuals.",
    tags: ["Audio Visualization", "Creative Coding"],
    preview: { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
    media: [
      { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
      { type: "video", src: "/projects/oscilloscope/demo.mp4" },
    ],
    body: [
      "This project started with a question: what if music could be drawn? I programmed a VST plugin in FL Studio that converts a song's stereo audio signal — left and right channels — directly into XY coordinates fed to an oscilloscope.",
      "The result is a real-time visual output on the oscilloscope driven entirely by the audio data. The waveform becomes the image. I also pushed SVG files through the same process, converting vector graphics into XY data and displaying them on the scope as oscilloscope visuals.",
      "The project sits at the intersection of audio engineering, programming, and analog hardware — using an oscilloscope not as a measurement tool but as a display medium.",
    ],
  },

  // ── Film / VFX ───────────────────────────────────────────────────────────────
  {
    slug: "aces-wired",
    category: "film-vfx",
    keepAudio: true,
    title: "Aces Wired",
    summary:
      "A short film set in a neon-lit dystopian future where four gambling addicts must expose a rigged poker system. A senior-year collaborative project using Premiere Pro, After Effects, and Blender.",
    tags: ["Blender", "3D", "VFX"],
    timeframe: "Senior year, Chatham University",
    preview: { type: "image", src: "/projects/aces-wired/cover.jpg", alt: "Aces Wired film still" },
    media: [{ type: "video", src: "/projects/aces-wired/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=Mjet_qw9yPs" },
    body: [
      "Aces Wired follows four gambling addicts trapped in a high-stakes poker game in a neon-lit dystopian future. To survive, they must overcome their mutual distrust and work together to expose the real cheater — and dismantle the rigged system controlling their fate.",
      "Made in collaboration with two other students for an advanced visual effects course during senior year at Chatham University, the project required coordinating across narrative, production design, and post-production workflows simultaneously.",
      "The pipeline combined Premiere Pro for editing, After Effects for compositing and grade, and Blender for 3D environment extensions and VFX elements. The finished piece is a complete short film from script to final color.",
    ],
  },
  {
    slug: "are-you-engaged",
    category: "film-vfx",
    title: "Are You Engaged?",
    summary:
      "A multi-screen audiovisual installation across three stacked CRT televisions offering satirical, surrealist, and serious commentary on media consumption, political news, and online echo chambers.",
    tags: ["TouchDesigner", "Installation"],
    preview: { type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" },
    media: [{ type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" }],
    links: { youtube: "https://www.youtube.com/watch?v=XI30lZMrOoA" },
    body: [
      "ARE YOU ENGAGED? / I AM NOT ENGAGED is an audiovisual installation displayed on three vertically stacked CRT televisions. The piece uses the format of modern media — short-form content, political news, algorithmic feeds — as both subject and structure.",
      "The work operates across multiple tonal registers: satire, surrealism, and direct commentary coexist within the same run-time. The effect is deliberate — mirroring the disorienting tonal flatness of the media landscape it critiques.",
      "Produced using Premiere Pro, TouchDesigner, and After Effects, the three-screen format distributes the viewer's attention across channels the way actual media consumption does, forcing choices about where to look and what to absorb.",
    ],
  },
  {
    slug: "handmade-animations",
    category: "film-vfx",
    keepAudio: true,
    title: "Handmade Animations",
    summary:
      "Frame-by-frame hand animation made for a handmade animation course. The first traditional animation work produced entirely by hand.",
    tags: ["Animation"],
    preview: { type: "image", src: "/projects/handmade-animations/cover.jpg", alt: "Handmade animation still" },
    media: [{ type: "video", src: "/projects/handmade-animations/demo.mp4" }],
    body: [
      "This was the first piece of animation I made entirely by hand, frame by frame — no digital assist, no interpolation. Produced for a handmade animation course, it was an introduction to the discipline of traditional technique.",
      "The process was instructive in ways that working digitally is not: the constraint of physical media forces commitment to each frame, and the errors are visible in a way that software can mask.",
      "The piece represents a foundation — understanding where the medium came from before working with digital tools that abstract it.",
    ],
  },
  {
    slug: "vfx-kill-robot",
    category: "film-vfx",
    title: "SciFi VFX",
    summary:
      "A Blender VFX composite using Mixamo character animations and an Ian Hubert-inspired handheld camera workflow. Made in third year as a personal skills push.",
    tags: ["Blender", "Animation", "VFX"],
    preview: { type: "video", src: "/projects/vfx-kill-robot/demo.mp4" },
    media: [{ type: "video", src: "/projects/vfx-kill-robot/maniacSMALL.mp4" }],
    body: [
      "This VFX shot was made entirely in Blender, integrating a Mixamo-rigged and animated character into live-action footage using an Ian Hubert-inspired production approach.",
      "Ian Hubert's workflow prioritizes speed and a specific handheld aesthetic — imperfect, kinetic, and cinematic — over technical perfection. Adopting it meant learning to use Blender's camera tracking and compositing tools together as a unified pipeline.",
      "Made in third year for personal growth rather than a course, this project was about proving a capability: taking a VFX shot from plate to finished composite independently.",
    ],
  },
  {
    slug: "vfx-spaceship",
    category: "film-vfx",
    title: "VFX Spaceship",
    summary:
      "A sci-fi VFX sequence built in Blender using techniques from Ian Hubert's production workflow. A personal exploration of fantastical environments and practical-looking composites.",
    tags: ["Blender", "3D", "VFX"],
    preview: { type: "gif", src: "/projects/vfx-spaceship/demo.mp4" },
    media: [{ type: "gif", src: "/projects/vfx-spaceship/demo.mp4" }],
    body: [
      "Sci-fi has always been a reference point for me — the way it uses visual spectacle to locate viewers in impossible places. This project was an attempt to build that feeling using only Blender and publicly available techniques.",
      "Drawing heavily from Ian Hubert's unlisted YouTube tutorials, the project focuses on the combination of handheld camera aesthetics with high-production-value 3D environments — making the fantastical feel grounded.",
      "This is a project with a clear future: the techniques here are a foundation to continue iterating on as skills develop. The core question — how do you make a spaceship feel real — remains interesting.",
    ],
  },

  // ── Robotics / Product Production ────────────────────────────────────────────
  {
    slug: "capstone",
    category: "robotics",
    title: "Haptic Alarm System (Capstone)",
    summary:
      "Senior immersive media thesis project: a haptic-based alarm system designed to replace audio alerts in critical medical environments such as the NICU.",
    tags: ["Electronics", "Physical Computing", "Prototyping"],
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
      "My capstone thesis project for immersive media is a haptic-based alarm system aimed at replacing the alarm system in medical environments like the NICU.",
      "Audio alarms in clinical spaces are pervasive and overlapping, leading to alarm fatigue — where staff become desensitized over time. The system replaces audio alerts with targeted haptic feedback delivered through a wearable fob, letting staff respond to distinct signals without adding to the noise.",
      "Built with Arduino hardware for the haptic actuators and a C# and .NET backend for alarm routing and priority management.",
    ],
  },
  {
    slug: "clocky-internship",
    category: "robotics",
    title: "Clocky — Alarm Clock R&D",
    summary:
      "Mechanical engineering internship with Clocky, focused on developing a next-generation consumer alarm clock from concept through iterative hardware prototyping.",
    tags: ["Electronics", "Prototyping"],
    preview: { type: "image", src: "/projects/clocky-internship/coverimage.png", alt: "Clocky prototype photo" },
    media: [{ type: "video", src: "/projects/clocky-internship/demo.mp4" }],
    body: [
      "Clocky is best known for the alarm clock that runs away and hides when you hit snooze. The internship involved working on their next product — a new alarm clock concept developed from scratch.",
      "The work spanned the full early-stage product development loop: ideation, constraint mapping, physical prototyping, and iterative testing. Documentation from multiple proof-of-concept stages was maintained throughout.",
      "Working in a small hardware company means wearing many hats — the internship covered mechanical design, basic electronics, and the kind of cross-functional problem solving that consumer product development requires.",
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
      "Jimmy is a robot designed around one biological concept: homeostasis. Using a solar panel and a photocell, the robot continuously seeks light sources to maintain its charge — approximating the self-sustaining drive found in living systems.",
      "The machine learning component governs the navigation and search behavior, letting the robot adapt its light-seeking strategy based on environmental feedback rather than following a fixed algorithm.",
      "After the academic work was done, Jimmy was repurposed as a cat toy. He was well received. Both applications — homeostatic robot and autonomous cat entertainment — were successful, which feels like a meaningful outcome.",
    ],
  },
  {
    slug: "knights-of-isiah",
    category: "robotics",
    title: "Knights of Isiah",
    summary:
      "A custom Raspberry Pi multitool built for a friend, featuring RFID scanning, a virtual pet, infrared signal cloning, and a microphone-based frequency reader.",
    tags: ["Electronics", "Physical Computing", "Prototyping"],
    preview: { type: "image", src: "/projects/knights-of-isiah/cover.png", alt: "Knights of Isiah device photo" },
    media: [
      { type: "video", src: "/projects/knights-of-isiah/doc1.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc2.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc3.mp4" },
    ],
    body: [
      "Knights of Isiah is a multitool built specifically for one person: our friend Isiah. Two classmates and I collaborated to design and build a device that combined four distinct capabilities into a single handheld form factor.",
      "The feature set — RFID scanning, a virtual pet, infrared signal cloning, and a microphone-based frequency reader — was chosen to match Isiah's interests and daily contexts. The design problem was as much about knowing the user as it was about knowing the hardware.",
      "Built around a Raspberry Pi 3, the project required integrating multiple hardware modules, writing drivers for each, and designing a unified interface that made four different tools feel like one coherent device.",
    ],
  },
  {
    slug: "plunter",
    category: "robotics",
    keepAudio: true,
    title: "Plunter",
    summary:
      "A robot that translates houseplant moisture data into natural speech using an AI voice model trained on a professor's voice. Built with Raspberry Pi and Arduino Uno.",
    tags: ["Electronics", "Physical Computing", "Machine Learning"],
    preview: { type: "image", src: "/projects/plunter/cover.png", alt: "Plunter robot photo" },
    media: [
      { type: "video", src: "/projects/plunter/demo.mp4" },
      { type: "video", src: "/projects/plunter/clip2.mp4" },
    ],
    body: [
      "Plunter addresses a simple premise: most people don't know what their houseplant needs, and most sensor readouts don't communicate in a way that feels meaningful. The goal was to bridge that gap.",
      "Using a Raspberry Pi and Arduino Uno, the system reads soil moisture levels and translates them into spoken language via an AI-generated voice model — trained specifically on a professor's voice, which adds an incongruous pedagogical quality to the plant's communications.",
      "The project sits at the edge of ambient computing and speculative design: a plant that speaks, in someone else's voice, about its own needs. It works. It is also a little strange.",
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
      "Trash Bot was built to answer a question: could I design, wire, and program a functional robot in four hours using only what was on hand? The answer was yes.",
      "Two ultrasonic sensors serve as eyes, feeding distance data to an Arduino Uno that handles motor control and navigation. The chassis is cardboard — functional, not precious. The solar panel on top is real and operational.",
      "The project is about the discipline of constraint: limited time, limited materials, a clear goal. Trash Bot exists because making a thing quickly and learning from it beats planning indefinitely.",
    ],
  },

  // ── Professional Experience ──────────────────────────────────────────────────
  {
    slug: "clayze-ta",
    category: "professional",
    title: "Teaching Assistant — Clayze Program",
    summary:
      "Full-time Teaching Assistant for a joint CMU / Chatham University immersive media program (2022–2024), coaching students in 3D modeling, Arduino, RealSense, LookingGlass, and Meta Quest development.",
    tags: ["Electronics", "3D", "Physical Computing"],
    timeframe: "2022–2024",
    preview: { type: "image", src: "/projects/clayze-ta/thumb.jpg", alt: "Clayze program in session" },
    media: [{ type: "gif", src: "/projects/clayze-ta/demo.mp4" }],
    links: {
      article: "https://www.pulse.chatham.edu/blog-stories/immersive-media-imm-academic-visit-day-chatham-university-3d-models-clayze",
    },
    body: [
      "The Clayze Teaching Assistant role was a full-time position supporting a joint program funded by the Frank-Ratchye Studio for Creative Inquiry at Carnegie Mellon University and Chatham University's Extended Reality Technology Center.",
      "The work involved coaching students to build novel 3D modeling tools using the Clayze package, Intel RealSense depth cameras, LookingGlass holographic displays, Arduino microcontrollers, and Meta Quest headsets — often simultaneously, often in the same session.",
      "Teaching complex technical systems to beginners requires translating between the logic of the tool and the intuition of the learner. That translation work — making things feel approachable without hiding what they actually are — is something I came to care about and get better at across the two years.",
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
      "My friend Angelo (Disuko Music) hosted a rave and asked me to handle the visual environment. The brief was to create projection content that felt native to the Disuko aesthetic — using existing brand art as source material rather than building from scratch.",
      "Working in TouchDesigner, I built a real-time visual system that remixed and animated Disuko's existing artwork, synchronized to the event's audio environment.",
      "Live visual work operates under different constraints than studio production: you're making decisions in public, in real time, with no second takes. The system needs to be stable, expressive, and controllable under pressure.",
    ],
  },
  {
    slug: "projection-mapping-show",
    category: "professional",
    keepAudio: true,
    title: "Projection Mapping — Library Show",
    summary:
      "Produced and operated a large-scale projection show on the front of the university library for the Immersive Media department, curating and preparing student artwork for architectural display.",
    tags: ["Projection Mapping", "Live Performance"],
    preview: { type: "image", src: "/projects/projection-mapping-show/CoverImage.png", alt: "Library projection show" },
    media: [{ type: "video", src: "/projects/projection-mapping-show/20240419_010326000_iOS.mov" }],
    body: [
      "As part of my role with the Immersive Media department, I was put in charge of a large-scale projection show displayed on the front facade of the university library.",
      "The job involved two distinct phases: curation and production. I collected student artwork from across the department, selected and prepared pieces for display at architectural scale, and then managed the technical setup and operation of the show itself.",
      "Running a large-format projection show is a coordination problem as much as a technical one — managing multiple sources, adapting to the physical geometry of the building, and ensuring the presentation matches the intent of the work being shown.",
    ],
  },
  {
    slug: "olkes-collection",
    category: "professional",
    title: "The Olkes Collection",
    summary:
      "Hired to photoscan and retexture a collection of African artifacts using industry-standard techniques, producing high-fidelity 3D models in FBX, GLB, PLY, and STL formats.",
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
      "The Olkes Collection is a set of African artifacts that required high-fidelity digital preservation. I was hired to photoscan each piece and produce retextured 3D models suitable for archival, display, and further research use.",
      "The collection included a three-headed helmet mask, a cultivators staff, and several additional objects. Each piece was captured with a high volume of overlapping photographs from multiple angles, processed into a point cloud, and then reconstructed as a textured mesh.",
      "The workflow used industry-standard photogrammetry and retexturing techniques, with Polycam for the capture and scan processing phase. The resulting meshes were cleaned, UV-unwrapped, and retextured before being exported. Final outputs were delivered in FBX, GLB, PLY, and STL formats to support a range of downstream use cases — from web embedding to physical reproduction.",
      "Working with culturally significant artifacts puts a specific kind of responsibility on the technical process: accuracy matters not just as a craft standard but because the models become a record. The goal is fidelity — to the object, to its material character, and to the people it belongs to.",
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
