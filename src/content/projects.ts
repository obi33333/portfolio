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
      "A real-time audio-reactive painterly visualizer built in TouchDesigner.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding", "Animation", "Installation", "Prototyping"],
    preview: { type: "image", src: "/projects/harmonic-hues/cover.jpg", alt: "Harmonic Hues visualizer still" },
    media: [{ type: "video", src: "/projects/harmonic-hues/demo.mp4" }],
    body: [
      "Built in TouchDesigner as an audio-reactive paint visualizer. Load any song and the colors, textures, and motion respond to it automatically.",
      "No presets or manual adjustments needed between tracks. The system adapts on its own.",
      "The goal was for it to feel like physical paint, not a generic digital visualizer.",
    ],
  },
  {
    slug: "crt-game",
    category: "one-day",
    title: "CRT Game",
    summary:
      "A plant growth simulation running on three CRT televisions. Passersby press a physical button to grow a shared digital plant.",
    tags: ["Unity", "Game Dev", "Physical Computing", "Installation", "Animation"],
    preview: { type: "image", src: "/projects/crt-game/cover.jpg", alt: "CRT Game on television screens" },
    media: [{ type: "gif", src: "/projects/crt-game/demo.mp4" }],
    body: [
      "Three CRT televisions installed in the Art and Design building ran this piece continuously for a semester.",
      "Anyone walking by could press a physical button. Each press had a chance to grow a shared plant that accumulated over time.",
      "No instructions, no explanation needed. The button was just there.",
    ],
  },
  {
    slug: "desktop-pet",
    category: "one-day",
    title: "Desktop Pet",
    summary:
      "A custom Shimeji desktop companion based on Oba, a personal doodle character. Adapted from a 2000s Japanese desktop pet application.",
    tags: ["Animation", "Creative Coding"],
    preview: { type: "image", src: "/projects/desktop-pet/DesktopPetCoverImage.png", alt: "Desktop Pet character screenshot" },
    media: [{ type: "video", src: "/projects/desktop-pet/demo.mp4" }],
    body: [
      "Oba is a character I have been drawing since high school. This project was about getting him to live on my computer.",
      "I found a Shimeji desktop pet application from the early 2000s and redrew all the character assets to match Oba's design.",
      "He walks around the screen, climbs windows, and falls off things.",
    ],
  },
  {
    slug: "custom-lively-wallpapers",
    category: "one-day",
    title: "Custom Lively Wallpapers",
    summary:
      "A desktop wallpaper with built-in Spotify controls and a diegetic clock, extended from an open-source Lively Wallpaper using Three.js.",
    tags: ["3D", "Creative Coding", "Prototyping"],
    preview: { type: "image", src: "/projects/custom-lively-wallpapers/cover.png", alt: "Living room wallpaper preview" },
    media: [{ type: "video", src: "/projects/custom-lively-wallpapers/demo.mp4" }],
    body: [
      "I wanted a wallpaper that could control Spotify and show the time without adding a widget overlay on top of the scene.",
      "I extended the source of an existing Lively Wallpaper and added both features directly into the Three.js scene.",
      "The clock and music controls are part of the environment. Still what I use on my desktop.",
    ],
  },
  {
    slug: "indy-film",
    category: "one-day",
    title: "Indie Film Project",
    summary:
      "A short Blender animation series about fish flying through open sky. Made early in my 3D journey using free Sketchfab models.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "image", src: "/projects/indy-film/preview.png", alt: "Indie Film Project render still" },
    media: [
      { type: "gif", src: "/projects/indy-film/birds.mp4" },
      { type: "video", src: "/projects/indy-film/skyfish.mp4" },
    ],
    body: [
      "Started as a single image in my head: fish drifting through sky instead of water. I wanted to build that world.",
      "I was still learning Blender at the time and used free Sketchfab models. It became a series of short clips across different environments.",
      "Technically rough, but I finished it. I committed to a strange idea before I knew how to pull it off.",
    ],
  },
  {
    slug: "live-texture-painting",
    category: "one-day",
    title: "Live Texture Painting",
    summary:
      "A live texture painting experiment using real watercolor and a webcam as input to Blender. Physical brushwork applied to 3D models in real time.",
    tags: ["Blender", "3D", "Creative Coding", "Prototyping"],
    preview: { type: "gif", src: "/projects/live-texture-painting/demo.mp4" },
    media: [
      { type: "video", src: "/projects/live-texture-painting/timelapse.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip3.mp4" },
      { type: "video", src: "/projects/live-texture-painting/clip4.mp4" },
    ],
    body: [
      "I set up a webcam over a watercolor painting session and fed the footage into Blender as a live texture input.",
      "Whatever I painted on paper appeared on the 3D model surface in real time.",
      "The result is a series of still life renders where the texture is an actual record of physical brushwork.",
    ],
  },
  {
    slug: "pinball-game",
    category: "one-day",
    title: "Pinball Game",
    summary:
      "A pinball game where force sensing resistors let players use physical pressure on the flippers. Built in Unity with Arduino hardware.",
    tags: ["Unity", "Electronics", "Physical Computing", "Game Dev", "Installation", "Prototyping"],
    preview: { type: "image", src: "/projects/pinball-game/cover.jpg", alt: "Pinball game setup photo" },
    media: [{ type: "video", src: "/projects/pinball-game/demo.mp4" }],
    body: [
      "Force sensing resistors on each flipper send pressure readings to Unity over serial. How hard you press changes how the flipper behaves.",
      "The hardware is minimal, just a few sensors and some wire. The focus was on the interaction, not the physical build.",
      "Players who figure out the pressure sensitivity play very differently from those who do not.",
    ],
  },
  {
    slug: "poems",
    category: "one-day",
    keepAudio: true,
    title: "Poems",
    summary:
      "A series of Blender renders paired with original poetry and music composed in FL Studio.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "image", src: "/projects/poems/cover.jpg", alt: "Poems visual still" },
    media: [
      { type: "video", src: "/projects/poems/demo.mp4", caption: "Poem 1" },
      { type: "video", src: "/projects/poems/poem2.mp4", caption: "Poem 2" },
      { type: "video", src: "/projects/fish-poem/demo.mp4", caption: "Fish Poem" },
    ],
    body: [
      "Each piece starts as a written poem. The Blender render and the FL Studio music are built around the text.",
      "Starting from language keeps the visual choices grounded. They have to mean something specific.",
      "Final compositing in Premiere Pro. The goal was for all three parts to feel like one thing.",
    ],
  },
  {
    slug: "renders",
    category: "one-day",
    title: "Renders",
    summary:
      "A personal collection of Blender renders from college, from early experiments through polished stills and a LookingGlass holographic diorama.",
    tags: ["Blender", "3D", "Animation"],
    preview: { type: "image", src: "/projects/renders/preview.png", alt: "Oba character render" },
    media: [
      {
        type: "image",
        src: "/projects/renders/oba-silly.png",
        alt: "Bar renders",
        caption: "Bar renders. Made freshman year, just exploring the software and learning what Blender could do.",
      },
      {
        type: "gif",
        src: "/projects/renders/bar-close.mp4",
        caption: "BarClose. A close-up render from the same bar scene, freshman year.",
      },
      {
        type: "gif",
        src: "/projects/renders/cartoon-ocean.mp4",
        caption: "CartoonOcean. Freshman year, learning modeling techniques and experimenting with stylized shading.",
      },
      {
        type: "gif",
        src: "/projects/renders/oba-rebel.mp4",
        caption: "ObaRebel. Made in free time, trying to push the limits of my style and see what works.",
      },
      {
        type: "gif",
        src: "/projects/renders/oba-material.mp4",
        caption: "ObaMaterial. Free time exploration, seeing what works and what is too strange.",
      },
      {
        type: "gif",
        src: "/projects/renders/snoopy.mp4",
        caption: "Snoopy. Made to be displayed on a LookingGlass holographic display as a 3D diorama you can look around.",
      },
    ],
    body: [
      "Personal Blender work made over four years in free time. Not assignments, just things I wanted to make.",
      "Early freshman-year renders sit alongside more recent work. The progression is intentional and visible.",
      "The most recent piece is a Snoopy scene built for a LookingGlass display, a light-field device that shows the scene as a holographic diorama.",
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
      "Made in Blender's Grease Pencil system, tracing and re-interpreting live footage frame by frame inside a 3D environment.",
      "Frame-by-frame work forces commitment to every drawing in a way that interpolation does not.",
      "This introduced a way of working I have come back to since. 2D animation inside 3D space is a combination I find genuinely useful.",
    ],
  },
  {
    slug: "tell-me-whats-real",
    category: "one-day",
    keepAudio: true,
    title: "Tell Me What's Real",
    summary:
      "A music video for Angelo (Disuko Music) using After Effects, Premiere Pro, TouchDesigner, and Blender.",
    tags: ["Blender", "TouchDesigner", "Animation", "Music Video", "Audio Visualization", "VFX"],
    preview: { type: "image", src: "/projects/tell-me-whats-real/cover.jpg", alt: "Tell Me What's Real music video still" },
    media: [{ type: "video", src: "/projects/tell-me-whats-real/demo.mp4" }],
    body: [
      "Angelo and I made this song together. I produced the music video after.",
      "Production used After Effects, TouchDesigner, Blender, and Premiere Pro. Using all four required careful pipeline work, but gave the final piece a layered visual quality.",
      "The creative direction was open. That made it possible to try things a tighter brief would have cut.",
    ],
  },
  {
    slug: "touchdesigner-visualizers",
    category: "one-day",
    keepAudio: true,
    title: "TouchDesigner Visualizers",
    summary:
      "A personal collection of audio visualizers built in TouchDesigner. Ongoing practice made in free time.",
    tags: ["TouchDesigner", "Audio Visualization", "Creative Coding"],
    preview: { type: "image", src: "/projects/touchdesigner-visualizers/cover.jpg", alt: "TouchDesigner visualizer still" },
    media: [{ type: "video", src: "/projects/touchdesigner-visualizers/demo.mp4" }],
    body: [
      "Personal work made in free time. No course, no client, just practice with reactive audiovisual systems.",
      "Each one explores a different setup: different feedback structures, different audio analysis, different visual approaches.",
      "For a while these ran on three CRT TVs in an apartment. The TVs are gone. The practice continues.",
    ],
  },
  {
    slug: "trust-fall",
    category: "one-day",
    keepAudio: true,
    title: "Trust Fall",
    summary:
      "A live-cut music video performed in real time using TouchDesigner and Unity. Every cut was made live during the song.",
    tags: ["TouchDesigner", "Unity", "Music Video", "Live Performance", "Animation", "Audio Visualization"],
    preview: { type: "image", src: "/projects/trust-fall/cover.jpg", alt: "Trust Fall music video still" },
    media: [{ type: "video", src: "/projects/trust-fall/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=ppWb32owQPo" },
    body: [
      "The video was performed before it was finished. Scenes built in TouchDesigner and Unity were switched live during the song and captured as the final piece.",
      "There was no editing after the fact. Every cut is a real-time decision made while the music was playing.",
      "The imperfection in the transitions is real. That energy would be hard to recreate in post.",
    ],
  },
  {
    slug: "oscilloscope",
    category: "one-day",
    keepAudio: true,
    title: "Oscilloscope",
    summary:
      "A custom VST in FL Studio that converts stereo audio into XY coordinates and draws it on a real oscilloscope in real time.",
    tags: ["Audio Visualization", "Creative Coding", "Animation", "Prototyping"],
    preview: { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
    media: [
      { type: "gif", src: "/projects/oscilloscope/preview.mp4" },
      { type: "video", src: "/projects/oscilloscope/demo.mp4" },
    ],
    body: [
      "A VST plugin in FL Studio that converts stereo audio channels into XY coordinates fed directly to an oscilloscope. The audio draws itself on screen in real time.",
      "I also pushed SVG files through the same pipeline, converting vector graphics into audio data to display them on the scope.",
      "Started as a curiosity. Ended up feeling like a different medium.",
    ],
  },

  // ── Film / VFX ───────────────────────────────────────────────────────────────
  {
    slug: "aces-wired",
    category: "film-vfx",
    keepAudio: true,
    title: "Aces Wired",
    summary:
      "A short film about four gambling addicts who must expose a rigged poker system to survive. Made senior year at Chatham University.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    timeframe: "Senior year, Chatham University",
    preview: { type: "image", src: "/projects/aces-wired/cover.jpg", alt: "Aces Wired film still" },
    media: [{ type: "video", src: "/projects/aces-wired/demo.mp4" }],
    links: { youtube: "https://www.youtube.com/watch?v=Mjet_qw9yPs" },
    body: [
      "Four gambling addicts trapped in a high-stakes game in a dystopian future. They have to work together to expose the real cheater and the system behind it. Made with two other students for an advanced VFX course senior year at Chatham.",
      "Pipeline used Premiere Pro for editing, After Effects for compositing and grade, and Blender for 3D environment extensions and effects work.",
      "A complete short film from script to final color.",
    ],
  },
  {
    slug: "are-you-engaged",
    category: "film-vfx",
    title: "Are You Engaged?",
    summary:
      "A multi-screen installation across three stacked CRT televisions. Satirical and direct commentary on media consumption and online echo chambers.",
    tags: ["TouchDesigner", "Installation", "VFX"],
    preview: { type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" },
    media: [{ type: "image", src: "/projects/are-you-engaged/cover.jpg", alt: "Are You Engaged installation still" }],
    links: { youtube: "https://www.youtube.com/watch?v=XI30lZMrOoA" },
    body: [
      "Three vertically stacked CRT televisions running simultaneous channels of media content. Satire, surrealism, and straight commentary all play at the same time.",
      "The format mirrors how media consumption actually works. Everything competes for attention with equal weight.",
      "Made with Premiere Pro, TouchDesigner, and After Effects.",
    ],
  },
  {
    slug: "handmade-animations",
    category: "film-vfx",
    keepAudio: true,
    title: "Handmade Animations",
    summary:
      "Frame-by-frame hand animation made for a handmade animation course. No digital assist.",
    tags: ["Animation"],
    preview: { type: "image", src: "/projects/handmade-animations/cover.jpg", alt: "Handmade animation still" },
    media: [{ type: "video", src: "/projects/handmade-animations/demo.mp4" }],
    body: [
      "The first animation I made entirely by hand, frame by frame, with no digital tools.",
      "Every mark is committed. You cannot undo a frame once it is drawn.",
      "Working this way changed how I approach digital animation. Understanding the foundation matters.",
    ],
  },
  {
    slug: "vfx-kill-robot",
    category: "film-vfx",
    title: "SciFi VFX",
    summary:
      "A Blender VFX composite integrating a Mixamo character into live footage. Made third year as a personal skills push.",
    tags: ["Blender", "Animation", "VFX"],
    preview: { type: "gif", src: "/projects/vfx-kill-robot/demo.mp4" },
    media: [{ type: "gif", src: "/projects/vfx-kill-robot/maniacSMALL.mp4" }],
    body: [
      "A Mixamo-rigged character composited into live footage entirely in Blender. Made third year to prove I could take a shot from plate to finished composite on my own.",
      "Used Ian Hubert's production approach, which prioritizes speed and kinetic energy over technical perfection.",
      "Getting the CG to feel present in real space is the whole challenge of this kind of shot.",
    ],
  },
  {
    slug: "vfx-spaceship",
    category: "film-vfx",
    title: "VFX Spaceship",
    summary:
      "A sci-fi VFX sequence built in Blender. High-production-value environments with a handheld, grounded feel.",
    tags: ["Blender", "3D", "Animation", "VFX"],
    preview: { type: "gif", src: "/projects/vfx-spaceship/demo.mp4" },
    media: [{ type: "gif", src: "/projects/vfx-spaceship/demo.mp4" }],
    body: [
      "Built in Blender using techniques from Ian Hubert's tutorial series. The focus is on making fantastical environments feel grounded through handheld camera work and smart compositing.",
      "Sci-fi visual effects have been a reference point for a long time. This was an attempt to build that feeling from scratch.",
      "The techniques here are a foundation to keep building on.",
    ],
  },

  // ── Robotics / Product Production ────────────────────────────────────────────
  {
    slug: "capstone",
    category: "robotics",
    title: "Haptic Alarm System (Capstone)",
    summary:
      "Senior immersive media thesis: a haptic alarm system to replace audio alerts in medical environments where alarm fatigue is a real problem.",
    tags: ["Electronics", "Physical Computing", "Prototyping", "Robotics", "C++", "C#", ".NET", ".NET MAUI", "SQL"],
    timeframe: "Senior year thesis, Chatham University",
    preview: { type: "image", src: "/projects/capstone/cover.jpg", alt: "Haptic fob device photo" },
    media: [
      { type: "gif", src: "/projects/capstone/demo.mp4" },
      { type: "image", src: "/projects/capstone/img2.jpeg", alt: "Haptic fob device" },
      { type: "image", src: "/projects/capstone/img563.jpeg", alt: "Device detail" },
      { type: "image", src: "/projects/capstone/img565.jpeg", alt: "Final prototype" },
    ],
    links: { pdf: "/projects/capstone/presentation.pdf" },
    body: [
      "A haptic alarm system designed to replace audio alerts in medical environments like the NICU.",
      "Alarm fatigue is a real problem in clinical spaces. Too many overlapping sounds and staff stop responding to individual alerts. This system routes alerts to a wearable haptic fob instead, giving staff distinct signals without adding more noise to the room.",
      "Built on Arduino hardware for haptic output. The backend uses C++, C#, and .NET for alarm routing and priority management, with SQL for data logging and an HTML interface for configuration.",
    ],
  },
  {
    slug: "clocky-internship",
    category: "robotics",
    title: "Clocky — Alarm Clock R&D",
    summary:
      "Mechanical engineering internship with Clocky, developing a next-generation consumer alarm clock through hardware prototyping.",
    tags: ["Electronics", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/clocky-internship/coverimage.png", alt: "Clocky prototype photo" },
    media: [{ type: "video", src: "/projects/clocky-internship/demo.mp4" }],
    body: [
      "Clocky makes the alarm clock that runs away when you hit snooze. The internship was on their next product, built from scratch.",
      "The work covered ideation, prototyping, testing, and documentation across the early development stages.",
      "Small hardware companies need generalists. I covered mechanical design, basic electronics, and cross-functional problem solving.",
    ],
  },
  {
    slug: "jimmy",
    category: "robotics",
    keepAudio: true,
    title: "Jimmy",
    summary:
      "A machine learning robot built around homeostasis. Uses a solar panel and photocell to seek light and self-sustain.",
    tags: ["Electronics", "Robotics", "Machine Learning"],
    preview: { type: "video", src: "/projects/jimmy/demo.mp4" },
    media: [{ type: "video", src: "/projects/jimmy/demo.mp4" }],
    body: [
      "Jimmy is built around one concept: homeostasis. He has a solar panel and a photocell and spends his time seeking light sources to stay charged.",
      "The machine learning component governs his navigation. He adapts based on what he finds and improves at locating light over time.",
      "After the academic work was done, Jimmy became a cat toy. Both roles worked out well.",
    ],
  },
  {
    slug: "knights-of-isiah",
    category: "robotics",
    title: "Knights of Isiah",
    summary:
      "A custom Raspberry Pi multitool built for a friend, with RFID scanning, a virtual pet, infrared cloning, and a frequency reader.",
    tags: ["Electronics", "Physical Computing", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/knights-of-isiah/cover.png", alt: "Knights of Isiah device photo" },
    media: [
      { type: "video", src: "/projects/knights-of-isiah/doc1.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc2.mp4" },
      { type: "video", src: "/projects/knights-of-isiah/doc3.mp4" },
    ],
    body: [
      "Built with two classmates for our friend Isiah. The device has four functions: RFID scanning, a virtual pet, infrared signal cloning, and a microphone-based frequency reader.",
      "Built on a Raspberry Pi 3. Required writing drivers for each hardware module and designing a unified interface for four different tools.",
      "Building for a specific person is different from building for an abstract user. Every decision is more concrete.",
    ],
  },
  {
    slug: "plunter",
    category: "robotics",
    keepAudio: true,
    title: "Plunter",
    summary:
      "A robot that reads houseplant soil moisture and speaks it out loud through an AI voice model trained on a professor's voice.",
    tags: ["Electronics", "Physical Computing", "Machine Learning", "Installation", "Prototyping", "Robotics"],
    preview: { type: "image", src: "/projects/plunter/cover.png", alt: "Plunter robot photo" },
    media: [
      { type: "video", src: "/projects/plunter/demo.mp4" },
      { type: "video", src: "/projects/plunter/clip2.mp4" },
    ],
    body: [
      "Most people do not know what their houseplant needs. Most sensors give you a number that does not mean much. Plunter turns the data into speech.",
      "Built with a Raspberry Pi and Arduino Uno. The system reads soil moisture and speaks it through an AI voice model trained on a professor's voice.",
      "It works. It is also strange to have a plant talk to you in your professor's voice.",
    ],
  },
  {
    slug: "trash-bot",
    category: "robotics",
    title: "Trash Bot",
    summary:
      "A functional robot built in four hours from cardboard, ultrasonic sensors, and an Arduino. The solar panel actually works.",
    tags: ["Electronics", "Robotics", "Physical Computing", "Prototyping"],
    preview: { type: "video", src: "/projects/trash-bot/demo.mp4" },
    media: [{ type: "video", src: "/projects/trash-bot/demo.mp4" }],
    body: [
      "I wanted to know if I could design, wire, and program a working robot in four hours using only what was on hand.",
      "Two ultrasonic sensors feed distance data to an Arduino Uno for motor control and navigation. The chassis is cardboard. The solar panel works.",
      "Constraints are useful. Four hours and scrap materials produced something that moves through space and avoids obstacles.",
    ],
  },

  // ── Professional Experience ──────────────────────────────────────────────────
  {
    slug: "wj-beitler",
    category: "professional",
    title: ".NET MAUI Developer & IT Analyst — W.J. Beitler",
    summary:
      "App developer and IT analyst at W.J. Beitler, a trucking company. Building mobile interfaces in .NET MAUI and maintaining internal systems.",
    tags: [".NET MAUI", "SQL", "Mobile Development", "C#", "IT"],
    timeframe: "2025–Present",
    preview: { type: "image", src: "/projects/wj-beitler/thumb.jpg", alt: "W.J. Beitler app screenshot" },
    media: [{ type: "video", src: "/projects/wj-beitler/AppDemo2026.mp4" }],
    body: [
      "I work at W.J. Beitler as a .NET MAUI developer and IT analyst. W.J. Beitler is a trucking company.",
      "On the development side I write XAML pages and UI components, integrate custom libraries, and use SQL Management Studio to track operational data. I also wrote batch tools to automate ADB device connections for the team.",
      "I have also been refactoring legacy Web API controller classes to align with a code-generation-based architecture.",
    ],
  },
  {
    slug: "clayze-ta",
    category: "professional",
    title: "Teaching Assistant — Clayze Program",
    summary:
      "Full-time Teaching Assistant for a joint CMU and Chatham University immersive media program from 2022 to 2024.",
    tags: ["Electronics", "3D", "Physical Computing", "Installation"],
    timeframe: "2022–2024",
    preview: { type: "image", src: "/projects/clayze-ta/thumb.jpg", alt: "Clayze program in session" },
    media: [{ type: "gif", src: "/projects/clayze-ta/demo.mp4" }],
    links: {
      article: "https://www.pulse.chatham.edu/blog-stories/immersive-media-imm-academic-visit-day-chatham-university-3d-models-clayze",
    },
    body: [
      "Full-time TA for two years on a joint program between Carnegie Mellon's Frank-Ratchye Studio for Creative Inquiry and Chatham University's Extended Reality Technology Center.",
      "Supported students building 3D modeling tools using the Clayze package across Intel RealSense cameras, LookingGlass holographic displays, Arduino, and Meta Quest headsets.",
      "Teaching technical systems to beginners is mostly a translation problem. Two years of that work changed how I explain and build things.",
    ],
  },
  {
    slug: "projection-mapping-rave",
    category: "professional",
    keepAudio: true,
    title: "Projection Mapping — Disuko Rave",
    summary:
      "Live projection visuals for a Disuko Music rave, built in TouchDesigner using existing brand assets.",
    tags: ["TouchDesigner", "Projection Mapping", "Live Performance"],
    preview: { type: "image", src: "/projects/projection-mapping-rave/thumb.jpg", alt: "Projection mapping at the Disuko rave" },
    media: [{ type: "video", src: "/projects/projection-mapping-rave/demo.mp4" }],
    body: [
      "My friend Angelo hosted a rave and asked me to run the visual environment. The brief was to use existing Disuko brand art rather than designing from scratch.",
      "I built a real-time system in TouchDesigner that remixed and animated the artwork, synchronized to the room audio.",
      "Live visual work means making decisions in real time in front of people. The system has to be stable and flexible at the same time.",
    ],
  },
  {
    slug: "projection-mapping-show",
    category: "professional",
    keepAudio: true,
    title: "Projection Mapping — Library Show",
    summary:
      "Large-scale projection show on the front of the university library, curating and displaying student artwork at architectural scale.",
    tags: ["TouchDesigner", "Projection Mapping", "Live Performance"],
    preview: { type: "image", src: "/projects/projection-mapping-show/CoverImage.png", alt: "Library projection show" },
    media: [{ type: "video", src: "/projects/projection-mapping-show/20240419_010326000_iOS.mov" }],
    body: [
      "I ran a projection show on the front facade of the university library as part of my role with the Immersive Media department.",
      "The job had two parts: curating student artwork from across the department and preparing it for architectural scale, then managing the technical setup and operation of the show itself.",
      "Getting work made for screens to read correctly on the side of a building requires different thinking at every stage.",
    ],
  },
  {
    slug: "olkes-collection",
    category: "professional",
    title: "The Olkes Collection",
    summary:
      "Photoscanned and retextured a collection of African artifacts, producing high-fidelity 3D models in multiple formats for archival and research.",
    tags: ["3D"],
    preview: { type: "image", src: "/projects/olkes-collection/preview.png", alt: "Three heads mask 3D render" },
    media: [
      { type: "gif", src: "/projects/olkes-collection/demo.mp4", caption: "Polycam scan preview, turntable render of the three heads mask" },
      { type: "image", src: "/projects/olkes-collection/three_heads_gpu.png", alt: "Three heads mask render", caption: "Three Heads Mask, image-textured 3D render" },
      { type: "image", src: "/projects/olkes-collection/mask_render.png", alt: "Three heads mask image texture render", caption: "Three Heads Mask, image texture applied" },
      { type: "image", src: "/projects/olkes-collection/mask_final.png", alt: "Mask final render", caption: "Helmet Mask, final textured render" },
      { type: "image", src: "/projects/olkes-collection/staff_render.png", alt: "Staff render", caption: "Cultivators Staff, final textured render" },
      { type: "image", src: "/projects/olkes-collection/three_heads_cpu.png", alt: "Three heads render CPU", caption: "Three Heads Mask, alternate render pass" },
    ],
    links: { model: "/projects/olkes-collection/three_heads.glb" },
    body: [
      "Hired to photoscan a collection of African artifacts and produce 3D models for archival and research use. The collection included a three-headed helmet mask, a cultivators staff, and several other pieces.",
      "Each object was photographed from hundreds of angles, processed into a point cloud, and reconstructed as a textured mesh. Polycam handled capture and processing. Blender handled cleanup, UV unwrapping, and retexturing. Deliverables went out in FBX, GLB, PLY, and STL.",
      "Accuracy matters more than usual when the models become a long-term record of culturally significant objects.",
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
