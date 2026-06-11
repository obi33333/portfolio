import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haptic Alarm System (Capstone) | Obadiah Bernstein",
  description:
    "Senior immersive media thesis: a haptic alarm system to replace audio alerts in medical environments where alarm fatigue is a real problem.",
};

const TAGS = [
  "Electronics",
  "Physical Computing",
  "Prototyping",
  "Robotics",
  "C++",
  "C#",
  ".NET",
  ".NET MAUI",
  "SQL",
];

function InlineImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-black/10">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-black/45">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function InlineVideo({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-black/10 bg-black w-fit mx-auto">
        <video
          src={src}
          className="mx-auto block max-h-[65vh] w-auto max-w-full"
          controls
          playsInline
          preload="metadata"
          muted
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-black/45">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 text-xl font-semibold tracking-tight text-black/80">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="my-10 border-black/10" />;
}

export default function CapstonePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/projects/robotics"
        className="text-sm text-black/55 transition-colors hover:text-black"
      >
        ← Robotics / Product Production
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
          Robotics / Product Production
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black/85">
          Haptic Alarms
        </h1>
        <p className="mt-2 text-sm text-black/45">Senior year thesis, Chatham University</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/55">
          <span><span className="font-medium text-black/70">Type:</span> Capstone — Hardware, Firmware, Full-Stack Software</span>
          <span><span className="font-medium text-black/70">Timeline:</span> Two Semesters</span>
          <span><span className="font-medium text-black/70">Status:</span> Functional Prototype</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-xs text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <a
            href="/projects/capstone/presentation.pdf"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-black/70 transition hover:border-black/20 hover:text-black"
            target="_blank"
            rel="noreferrer"
          >
            Presentation ↗
          </a>
        </div>
      </header>

      <article className="mt-10 text-base leading-7 text-black/70">
        <InlineImage
          src="/projects/capstone/FobsInChargingStation.jpg"
          alt="Three blue fobs sitting in their 3D-printed charging dock"
        />

        <p>
          I spent the last two semesters researching, designing, and building a system I hope shows
          promise in improving medical spaces. Specifically, the NICU.
        </p>
        <p className="mt-4">
          The NICU, or neonatal intensive care unit, is a dedicated medical space for newborn infants
          who are born ill, prematurely, or with health conditions that require constant care. A
          patient&rsquo;s stay can range from a few days to several months. It is a stressful,
          high-stakes environment for everyone in it, and there is a specific problem I became
          interested in: the constant string of alarms.
        </p>

        <Divider />

        <SectionHeading>The Problem</SectionHeading>

        <p>
          Sound levels in NICUs routinely exceed the 45 dB maximum recommended by the American
          Academy of Pediatrics, with some readings reaching as high as 120 dB. That noise forces
          premature infants into a stress response, burning energy their bodies desperately need for
          growth. Hearing impairment is diagnosed in 2 to 10% of preterm infants, compared to about
          0.1% of the general pediatric population. Parents are affected too, frequently experiencing
          significant stress and in some cases PTSD.
        </p>
        <p className="mt-4">
          But the noise problem has a second dimension that I found even more interesting: it
          undermines the very system it is part of. Studies estimate that 72 to 99% of all patient
          monitoring alarms are either technically false or clinically irrelevant. When nearly every
          alarm is a false alarm, nurses stop hearing the ones that matter. This is alarm fatigue,
          and it is well-documented as a contributor to medical errors and reduced staff performance.
        </p>
        <p className="mt-4">
          There is a real paradox here. Manufacturers design the loudest possible alarms to reduce
          liability if an alert is missed. In doing so, they create an environment where critical
          alerts are more likely to be missed. I found this problem genuinely worth trying to solve.
        </p>
        <p className="mt-4">
          The path forward, as I saw it, had three parts: allow nurses to fine tune monitoring
          equipment to meet patient needs, give nurses remote access to live patient monitoring data,
          and reduce sonic disturbances in the space while still communicating accurate alarm data.
        </p>

        <Divider />

        <SectionHeading>My Idea</SectionHeading>

        <p>
          Not every nurse needs to hear every alarm. A nurse responsible for a few rooms has no
          reason to be disturbed by an event down the hall. The current system broadcasts everything
          to everyone, all the time. What if alarms were delivered directly and silently to the one
          nurse responsible for that patient, with a sonic fallback only if no one responds?
        </p>
        <p className="mt-4">
          My idea is a personalized, lightweight wearable device that alerts nurses of alarms
          directly. I call it a fob. The workflow is designed for the grab-and-go pace of the NICU:
          nurses arrive at the start of their shift, pick up a fob, sign in on a dedicated computer,
          and assign the rooms they will be responsible for. From that point on, if an alarm fires in
          one of their rooms, the fob vibrates and the screen updates with the room number. If
          multiple alarms come in at once, the system prioritizes by severity and displays both. If a
          nurse does not respond in time, the alarm escalates to nearby fobs, and ultimately triggers
          a sonic alarm as a last resort.
        </p>

        <Divider />

        <SectionHeading>Why Doesn&rsquo;t This Already Exist?</SectionHeading>

        <p>
          This was one of the more interesting research threads of the project. The short answer is
          liability. If a piece of medical equipment fails to alert a nurse to a critical event, the
          manufacturer can be held responsible. The industry response has been to make alarms as loud
          and unavoidable as possible, which paradoxically contributes to the fatigue problem.
        </p>
        <p className="mt-4">
          Mallory SonarAlert, a medical alarm component manufacturer, acknowledged in their own
          documentation that the proliferation of audible alarms causes concern about auditory
          overload, but that without industry-wide guidance, manufacturers have continued developing
          proprietary solutions independently. That last part was actually encouraging to me as a
          designer. It suggests that a well-designed, standardized solution could be something
          companies are interested in.
        </p>
        <p className="mt-4">
          The relevant standard is IEC 60601-1-8, which governs alarm systems in medical electrical
          equipment. It classifies alarms by priority, defines acceptable frequency ranges and sound
          levels, and restricts compliant alarms to one of only four fundamental frequencies.
          Getting a product like mine to market would involve working with a manufacturer to ensure
          compliance, or potentially working with accessibility-focused organizations to advocate for
          guideline revisions that formally recognize non-sonic alarm channels.
        </p>

        <Divider />

        <SectionHeading>Building the Fob</SectionHeading>

        <p>
          My original idea was a wristband. That did not work, for reasons I should have caught
          earlier. Nurses cannot wear jewelry or accessories for sanitation and safety reasons. A
          vibrating band on your wrist after a 12-hour shift would also be genuinely uncomfortable.
          After interviewing nurses and designers, I pivoted to a key-fob form factor that could clip
          to a lanyard or pocket and stay out of the way.
        </p>
        <p className="mt-4">A few design priorities shaped the fob:</p>
        <p className="mt-4">
          The device needs to feel unencumbering. I used magnetic USB-C connectors so fobs drop into
          the charging dock without any fiddling and pull out just as easily. Battery life is sized
          to last a full 12-hour shift.
        </p>
        <p className="mt-4">
          The display auto-orients using an MPU-6050 gyroscope and accelerometer, so the screen
          always reads correctly no matter how the fob is being held or worn.
        </p>

        <InlineVideo
          src="/projects/capstone/Gyrodemo.mp4"
          caption="The display stays upright as the fob is rotated in any direction."
        />

        <p>
          The two haptic motors are given physical clearance inside the case, which lets them move
          more freely and produce more vibration amplitude than they would if packed tightly against
          other components. They vibrate without creating a sonic disturbance but are strong enough
          to be clearly noticed.
        </p>
        <p className="mt-4">
          The outside of the device is coated in silicone, which is non-porous and easy to clean,
          meeting basic sanitation requirements for a medical environment.
        </p>

        <InlineImage
          src="/projects/capstone/FobDeconstructed.jpeg"
          alt="The fob case separated into its three layers: silicone outer shell, bezel ring, and the internal electronics chassis"
          caption="The fob case separated into its three layers: silicone outer shell, bezel ring, and the internal electronics chassis."
        />

        <InlineImage
          src="/projects/capstone/InsideFob.jpeg"
          alt="A close-up overhead view of the fob interior showing the round TFT display, haptic motors, gyroscope breakout board, and wiring"
          caption="The fob interior: round TFT display, haptic motors, gyroscope breakout board, and wiring."
        />

        <p>
          Inside, the fob runs on an ESP32 microcontroller, which handles Wi-Fi, the 1.28-inch round
          TFT display, and motor control. A small LiPo battery and charging module round out the
          hardware.
        </p>

        <Divider />

        <SectionHeading>The Listener Devices</SectionHeading>

        <p>
          The listener devices are proof-of-concept hardware meant to simulate integration with
          existing NICU equipment. In a real deployment this would be replaced by direct API access
          to a hospital&rsquo;s monitoring systems. You cannot just attach microcontrollers to
          medical devices and call it a day. But for the purposes of this prototype, they demonstrate
          the detection layer of the pipeline.
        </p>
        <p className="mt-4">
          Each listener is a Wi-Fi-connected ESP32 paired with a sound sensor, housed in a
          3D-printed enclosure lined with layers of sound dampening material: outer fabric,
          closed-cell foam, and ceramic fiber insulation. This reduces false positives from ambient
          room noise. When audio exceeds a set decibel threshold, the device serializes the event as
          a JSON payload and sends it to the API.
        </p>

        <InlineImage
          src="/projects/capstone/AllFobsAndListeners.jpeg"
          alt="All three listener devices open alongside all three fob shells, showing both sets of hardware side by side"
          caption="All three listener devices open alongside all three fob shells."
        />

        <Divider />

        <SectionHeading>The Software</SectionHeading>

        <p>The backend is a REST API connected to a SQL database with four tables.</p>
        <p className="mt-4">
          The <span className="font-medium text-black/80">Users</span> table stores credentials,
          which the sign-in page validates against. The{" "}
          <span className="font-medium text-black/80">RoomAssignment</span> table tracks which rooms
          each nurse is responsible for and whether their session is active.{" "}
          <span className="font-medium text-black/80">NoiseLogs</span> records every detected alarm
          with a timestamp, room number, and a flag indicating whether an active user is assigned to
          that room. <span className="font-medium text-black/80">FobSessions</span> tracks which
          device ID is linked to which user for a given shift.
        </p>
        <p className="mt-4">
          The fob polls the API continuously. When a new entry appears in NoiseLogs for a room in
          its active assignment, it triggers the haptic motors and updates the display immediately.
        </p>
        <p className="mt-4">
          The sign-in website is intentionally simple. I noticed that most medical software leans
          heavily into cold blue and gray tones, which makes sense for sterility but does not do much
          for the people who have to use it all day. I designed the site with calming green tones and
          a minimal layout. The whole goal of this system is to reduce stress, and the interface
          should support that.
        </p>

        <Divider />

        <SectionHeading>Results and What&rsquo;s Next</SectionHeading>

        <p>
          I am pleased with what the system does. The fobs respond to real-time alarm events, the
          pipeline from sensor to database to wearable works end to end, and the gyroscope leveling
          and haptic feedback work as intended. Within the scope of two semesters, I think that is a
          fair amount to accomplish.
        </p>
        <p className="mt-4">
          That said, I am clear-eyed about the gaps. The fob casing needs to get smaller. The
          silicone coating is DIY and does not meet medical-grade standards. I would want custom PCBs
          to replace the hand-wired breakout boards, stronger haptic motors, and real medical API
          connections in place of the listener devices. I would also want to conduct proper playtests
          with nurses in the field and iterate from there.
        </p>
        <p className="mt-4">
          If I were starting over with what I know now, I would redesign the hardware from the
          ground up. But that is how prototyping works, and I think the foundation here is worth
          building on.
        </p>
        <p className="mt-4">
          If you work in healthcare technology, medical device manufacturing, or NICU nursing and
          this project interests you, I would love to hear from you.
        </p>

        <Divider />

        <p className="text-sm text-black/45 italic">
          Built with: ESP32, Arduino framework, SQL, REST API, HTML / CSS / JS
        </p>
      </article>
    </main>
  );
}
