"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  created_at: string;
  form_type: "ot" | "pt" | "slp";
  parent_name: string | null;
  parent_email: string | null;
  phone: string | null;
  child_name: string | null;
  child_age: string | null;
  best_time: string | null;
  insurance: string | null;
  diagnosis: string | null;
  main_concern: string | null;
  top_goal: string | null;
  prev_services: string | null;
  form_data: Record<string, unknown>;
  ai_results: string | null;
  status: "pending_confirmation" | "confirmed" | "followed_up" | "intake_done" | "enrolled";
  internal_notes: string | null;
  client_id: string | null;
};

// ── Common value maps ─────────────────────────────────────────────────────────

const INSURANCE: Record<string, string> = {
  aetna: "Aetna", uhc: "UnitedHealthcare", horizon: "Horizon NJ Health",
  amerihealth: "AmeriHealth NJ", "nj-familycare": "NJ FamilyCare / Medicaid",
  bcbs: "BCBS", cigna: "Cigna", "private-pay": "Private pay", unsure: "Not sure yet",
};

const BEST_TIME: Record<string, string> = {
  morning: "Morning", afternoon: "Afternoon", evening: "Evening", text: "Text is best",
};

const PREV_SERVICES: Record<string, Record<string, string>> = {
  slp: { "yes-school": "Yes — school-based SLP", "yes-private": "Yes — private SLP",
         "yes-ei": "Yes — early intervention", no: "No — first time", unsure: "Not sure" },
  ot:  { "yes-school": "Yes — school-based OT", "yes-private": "Yes — private OT",
         "yes-ei": "Yes — early intervention", "yes-aba": "Yes — ABA therapy",
         no: "No — this is our first time", unsure: "Not sure" },
  pt:  { "yes-school": "Yes — school-based PT", "yes-private": "Yes — private PT",
         "yes-ei": "Yes — early intervention", no: "No — first time", unsure: "Not sure" },
};

const STATUS_LABELS: Record<string, string> = {
  pending_confirmation: "Pending Confirmation",
  confirmed:   "Confirmation Sent",
  followed_up: "Followed Up",
  intake_done: "Intake Done",
  enrolled:    "Enrolled",
};
const STATUS_COLORS: Record<string, string> = {
  pending_confirmation: "bg-gray-50 text-gray-500 ring-gray-200",
  confirmed:   "bg-blue-50 text-blue-700 ring-blue-200",
  followed_up: "bg-amber-50 text-amber-700 ring-amber-200",
  intake_done: "bg-purple-50 text-purple-700 ring-purple-200",
  enrolled:    "bg-green-50 text-green-700 ring-green-200",
};

const FORM_LABELS: Record<string, string> = {
  ot: "Occupational Therapy", pt: "Physical Therapy", slp: "Speech-Language",
};

// ── Form schema ───────────────────────────────────────────────────────────────

type FieldDef = {
  key: string;
  question: string;
  choices?: Record<string, string>;
};
type SectionDef = { title: string; fields: FieldDef[] };

const SLP_SECTIONS: SectionDef[] = [
  { title: "Communication Mode", fields: [
    { key: "comm_mode", question: "How does your child primarily communicate right now?",
      choices: { "verbal-sentences": "Full sentences", "verbal-words": "Single words / phrases",
        emerging: "Emerging — a few words or sounds", nonverbal: "Nonverbal / pre-verbal",
        aac: "AAC device or app", pecs: "PECS / picture exchange",
        signs: "Signs / gestures", mixed: "Mixed / combination" } },
  ]},
  { title: "Expressive Language — What Your Child Says", fields: [
    { key: "slp_express_needs", question: "Expressing basic wants and needs (hungry, tired, help, stop)",
      choices: { "1": "1 — Very hard / rarely", "2": "2 — Usually hard", "3": "3 — Sometimes", "4": "4 — Usually OK", "5": "5 — Easy / consistent" } },
    { key: "slp_sentences", question: "Putting words together into longer sentences",
      choices: { "1": "1 — Not yet", "2": "2 — 2–3 words", "3": "3 — Short phrases", "4": "4 — Sentences with gaps", "5": "5 — Full sentences" } },
    { key: "slp_initiate", question: "Starting conversations or interactions on their own",
      choices: { "1": "1 — Rarely / never", "2": "2 — Occasionally", "3": "3 — Sometimes", "4": "4 — Often", "5": "5 — Consistently" } },
  ]},
  { title: "Receptive Language — What Your Child Understands", fields: [
    { key: "slp_1step", question: 'Following simple 1-step directions ("Come here," "Sit down")',
      choices: { "1": "1 — Rarely", "2": "2 — Sometimes", "3": "3 — Usually with cues", "4": "4 — Usually", "5": "5 — Consistently" } },
    { key: "slp_2step", question: "Following 2-step or multi-step directions",
      choices: { "1": "1 — Not yet", "2": "2 — Rarely", "3": "3 — Sometimes", "4": "4 — Often", "5": "5 — Consistently" } },
    { key: "slp_questions", question: "Understanding who / what / where / why / when questions",
      choices: { "1": "1 — Very hard", "2": "2 — Who/what only", "3": "3 — Most simple questions", "4": "4 — Usually", "5": "5 — All types" } },
  ]},
  { title: "Speech Clarity", fields: [
    { key: "slp_intel_familiar", question: "How well does a familiar person understand your child's speech?",
      choices: { "1": "1 — Rarely", "2": "2 — ~25%", "3": "3 — ~50%", "4": "4 — ~75%", "5": "5 — Mostly clear" } },
    { key: "slp_intel_unfamiliar", question: "How well does an unfamiliar person (teacher, stranger) understand your child?",
      choices: { "1": "1 — Rarely", "2": "2 — ~25%", "3": "3 — ~50%", "4": "4 — ~75%", "5": "5 — Mostly clear" } },
  ]},
  { title: "Social Communication", fields: [
    { key: "slp_pragmatic", question: "Back-and-forth conversation — taking turns, staying on topic",
      choices: { "1": "1 — Very hard", "2": "2 — Usually hard", "3": "3 — Sometimes OK", "4": "4 — Usually OK", "5": "5 — Handles well" } },
  ]},
  { title: "Feeding Concerns", fields: [
    { key: "slp_feeding_yn", question: "Are feeding or swallowing concerns part of why you're reaching out?",
      choices: { yes: "Yes — feeding is a concern", no: "No — not a concern", maybe: "Possibly" } },
    { key: "slp_feeding", question: "Feeding concerns (all that apply)",
      choices: { picky: "Extreme picky eating", textures: "Texture aversions", gagging: "Gagging / vomiting",
        chewing: "Difficulty chewing", swallowing: "Difficulty swallowing", tube: "Tube-fed", none: "None" } },
  ]},
  { title: "Communication Challenges & Impact", fields: [
    { key: "slp_concerns", question: "Main speech & language concerns (all that apply)",
      choices: { "not-talking": "Not talking yet or very few words for their age",
        "hard-to-understand": "People outside the family struggle to understand",
        "lost-words": "Had words and then lost them",
        stuttering: "Stuttering, repetitions, or fluency difficulties",
        voice: "Voice concerns — hoarseness, too loud, too soft",
        "aac-needed": "May benefit from AAC (device, app, PECS)",
        frustration: "Gets very frustrated when they can't communicate",
        "social-comm": "Difficulty with social communication — friendships, conversations",
        "reading-lang": "Language delays affecting reading or learning at school",
        bilingual: "Bilingual / multilingual family — questions about development" } },
    { key: "slp_impact", question: "Where is communication most affecting your child? (all that apply)",
      choices: { school: "School / learning", friendships: "Friendships / play", home: "Home & family",
        community: "Community outings", safety: "Safety concerns",
        emotional: "Emotional regulation", independence: "Independence" } },
  ]},
  { title: "Additional Notes", fields: [
    { key: "slp_anything", question: "Anything else you want our team to know?" },
  ]},
];

const OT_SECTIONS: SectionDef[] = [
  { title: "Diagnosis & Area of Concern", fields: [
    { key: "dx", question: "Diagnosis or area of concern (all that apply)",
      choices: { autism: "Autism / ASD", adhd: "ADHD", "dev-delay": "Developmental delay",
        sensory: "Sensory processing", cp: "Cerebral palsy", ds: "Down syndrome",
        anxiety: "Anxiety", "no-dx": "No diagnosis yet", other: "Other" } },
  ]},
  { title: "Person — Strengths & Personality", fields: [
    { key: "child_strengths", question: "What are your child's greatest strengths?" },
    { key: "personality", question: "How would you describe your child's personality? (all that apply)",
      choices: { sensitive: "Highly sensitive", introverted: "Introverted / quiet",
        extroverted: "Extroverted / social", "routine-driven": "Loves routines",
        curious: "Curious / loves learning", anxious: "Tends toward anxiety",
        energetic: "High energy", literal: "Very literal thinker", empathetic: "Very empathetic" } },
  ]},
  { title: "Fine Motor & Handwriting", fields: [
    { key: "ot_fine_motor", question: "Using hands for precise tasks — buttons, zippers, utensils, scissors",
      choices: { "1": "1 — Very hard / needs full help", "2": "2 — Usually hard", "3": "3 — Sometimes OK", "4": "4 — Usually OK", "5": "5 — Age-appropriate" } },
    { key: "ot_handwriting", question: "Handwriting — letter formation, size, spacing, legibility",
      choices: { "1": "1 — Very hard / avoids", "2": "2 — Significantly behind", "3": "3 — Somewhat behind", "4": "4 — Mostly OK", "5": "5 — Age-appropriate" } },
  ]},
  { title: "Self-Care & Daily Living", fields: [
    { key: "ot_dressing", question: "Dressing independently — putting on / taking off clothes, fasteners",
      choices: { "1": "1 — Needs full help", "2": "2 — Needs significant help", "3": "3 — Needs some help", "4": "4 — Mostly independent", "5": "5 — Fully independent" } },
    { key: "ot_grooming", question: "Grooming — brushing teeth, washing hands/face, hair brushing",
      choices: { "1": "1 — Needs full help", "2": "2 — Needs significant help", "3": "3 — Needs some help", "4": "4 — Mostly independent", "5": "5 — Fully independent" } },
    { key: "ot_feeding", question: "Feeding — using utensils, managing food textures, mealtime behavior",
      choices: { "1": "1 — Very difficult", "2": "2 — Often difficult", "3": "3 — Sometimes difficult", "4": "4 — Mostly OK", "5": "5 — No concerns" } },
  ]},
  { title: "MOHO — Motivation & Routines", fields: [
    { key: "moho_volition", question: "Volition — What motivates your child? How engaged are they in activities they love?",
      choices: { "1": "1 — Very withdrawn / hard to engage", "2": "2 — Occasionally motivated",
        "3": "3 — Motivated for 1–2 things", "4": "4 — Usually engaged", "5": "5 — Highly motivated" } },
    { key: "moho_habituation", question: "Habituation — How well do daily routines and habits function in your household?",
      choices: { "1": "1 — Barely exist / chaos", "2": "2 — Very hard most days", "3": "3 — Some work, some don't",
        "4": "4 — Mostly manageable", "5": "5 — Generally solid" } },
    { key: "moho_interests", question: "What does your child love to do with free time? What brings them real joy?" },
  ]},
  { title: "Sensory Profile", fields: [
    { key: "sen_touch", question: "Touch — sensitivity to clothing tags, textures, unexpected physical contact",
      choices: { over: "Very sensitive", some: "Somewhat sensitive", typical: "Typical", seeks: "Seeks touch / craves input", na: "Not sure" } },
    { key: "sen_sound", question: "Sound — reaction to loud noises, crowded places, background sounds",
      choices: { over: "Very sensitive", some: "Somewhat sensitive", typical: "Typical", seeks: "Seeks loud sounds", na: "Not sure" } },
    { key: "sen_movement", question: "Movement — need to fidget, difficulty sitting still, or avoids movement",
      choices: { high: "Very high need", some: "Moderate need", typical: "Typical", low: "Avoids movement", na: "Not sure" } },
    { key: "sen_overload", question: "Emotional regulation — meltdowns or outbursts triggered by sensory input",
      choices: { "1": "1 — Daily", "2": "2 — Several times a week", "3": "3 — Weekly", "4": "4 — Occasionally", "5": "5 — Rarely" } },
  ]},
  { title: "Environment — Settings & Supports", fields: [
    { key: "env_hard", question: "Which environments are most challenging for your child? (all that apply)",
      choices: { school: "School / classroom", cafeteria: "Cafeteria / lunchroom",
        stores: "Stores / malls / public spaces", parties: "Parties / family gatherings",
        mornings: "Morning routines at home", transitions: "Transitions between activities",
        meals: "Mealtime", community: "Community outings generally" } },
    { key: "env_helps", question: "What currently helps your child regulate? (all that apply)",
      choices: { headphones: "Noise-reducing headphones", weighted: "Weighted blanket / vest",
        fidget: "Fidget tools", "movement-breaks": "Movement breaks",
        "quiet-space": "Quiet / calm-down space", routines: "Predictable routines",
        nothing: "Nothing consistent yet" } },
  ]},
  { title: "Occupation — Daily Life & Roles", fields: [
    { key: "occ_affected", question: "Which daily activities are most affected right now? (all that apply)",
      choices: { "school-tasks": "School or learning tasks — keeping up in class, writing, sitting",
        "morning-routine": "Morning / self-care routines — getting ready is a daily battle",
        "social-play": "Social participation and play with peers",
        "leisure-hobbies": "Leisure activities and hobbies they want to do but struggle with",
        "community-outings": "Community outings — stores, restaurants, parks, events",
        "independence-adl": "Independent daily living — feeding, dressing, hygiene",
        sleep: "Sleep and bedtime routines",
        vocational: "Vocational / pre-employment skills (ages 14+)",
        "life-skills": "Life skills — cooking, money, transportation (transition-age)" } },
  ]},
  { title: "PEO Fit", fields: [
    { key: "peo_p", question: "Person fit — How well do your child's current skills match what is expected of them?",
      choices: { "1": "1 — Very poor fit", "2": "2 — Poor fit", "3": "3 — Partial fit", "4": "4 — Good fit", "5": "5 — Strong fit" } },
    { key: "peo_e", question: "Environment fit — How well do your child's home, school, and community support their needs?",
      choices: { "1": "1 — Very poor fit", "2": "2 — Poor fit", "3": "3 — Partial fit", "4": "4 — Good fit", "5": "5 — Strong fit" } },
    { key: "peo_o", question: "Occupation fit — How well do your child's daily activities match their interests and abilities?",
      choices: { "1": "1 — Very poor fit", "2": "2 — Poor fit", "3": "3 — Partial fit", "4": "4 — Good fit", "5": "5 — Strong fit" } },
  ]},
  { title: "CMOP-E — Family Priorities", fields: [
    { key: "cmop_hope", question: "What gives you the most hope when you think about your child's future? (all that apply)",
      choices: { friendships: "Having real friendships", independence: "Being as independent as possible",
        employment: "Finding work they love", confidence: "Feeling confident and valued",
        community: "Participating in the community", happy: "Being safe and happy",
        communication: "Communicating their needs", "full-life": "Living a full life on their own terms" } },
    { key: "cmop_vision", question: "Where do you see your child in 2–3 years, at their best? (all that apply)",
      choices: { "independent-home": "More independent at home", employed: "Employed or in a program",
        friendships: "Close friendships", mainstream: "Participating in mainstream settings",
        "happy-regulated": "Happy and regulated most days", "self-advocacy": "Advocating for themselves",
        college: "College or vocational program" } },
    { key: "parent_worry", question: "What is your biggest worry as a parent right now? (all that apply)",
      choices: { future: "Worried about the future / adulthood", school: "School isn't doing enough",
        "therapy-work": "Whether therapy will actually work", friends: "My child will never have friends",
        burnout: "My own burnout as a caregiver", "running-out-time": "Running out of time to get support",
        independence: "They won't be able to live independently" } },
    { key: "anything_else", question: "Anything else you want our team to know?" },
  ]},
];

const PT_SECTIONS: SectionDef[] = [
  { title: "Conditions", fields: [
    { key: "conditions", question: "Does your child have any of the following? (all that apply)",
      choices: { "low-tone": "Low muscle tone", "high-tone": "High tone / spasticity",
        "toe-walking": "Toe walking", "flat-feet": "Flat feet / foot pain",
        torticollis: "Torticollis / head tilt", scoliosis: "Scoliosis",
        cp: "Cerebral palsy", orthotics: "Uses orthotics / AFOs",
        "mobility-device": "Uses mobility device", pain: "Pain with movement", none: "None of these" } },
  ]},
  { title: "Gross Motor & Mobility", fields: [
    { key: "pt_walking", question: "Walking, running, and navigating the environment independently",
      choices: { "1": "1 — Significant support needed", "2": "2 — With help", "3": "3 — Independently with difficulty", "4": "4 — Mostly independent", "5": "5 — Age-appropriate" } },
    { key: "pt_stairs", question: "Climbing stairs (up and down), curbs, and uneven surfaces",
      choices: { "1": "1 — Cannot yet", "2": "2 — Two feet / with help", "3": "3 — Two feet / alone", "4": "4 — Alternating / some difficulty", "5": "5 — Fully independent" } },
    { key: "pt_jumping", question: "Jumping, hopping, skipping, and age-appropriate physical play",
      choices: { "1": "1 — Cannot yet", "2": "2 — Minimal / emerging", "3": "3 — Some skills", "4": "4 — Most skills", "5": "5 — Age-appropriate" } },
  ]},
  { title: "Balance & Coordination", fields: [
    { key: "pt_balance", question: "Balance — standing on one foot, navigating obstacles without falling",
      choices: { "1": "1 — Very poor", "2": "2 — Poor", "3": "3 — Fair", "4": "4 — Good", "5": "5 — Age-appropriate" } },
    { key: "pt_coordination", question: "Coordination — catching / kicking a ball, riding a bike, sports",
      choices: { "1": "1 — Very limited", "2": "2 — Limited", "3": "3 — Some skills", "4": "4 — Mostly OK", "5": "5 — Age-appropriate" } },
    { key: "pt_clumsy", question: "Clumsiness — bumping into things, tripping, falling more than peers",
      choices: { "1": "1 — Very frequent", "2": "2 — Often", "3": "3 — Sometimes", "4": "4 — Rarely", "5": "5 — Not an issue" } },
  ]},
  { title: "Strength & Endurance", fields: [
    { key: "pt_strength", question: "Overall muscle strength — does your child seem weaker than peers their age?",
      choices: { "1": "1 — Significantly weaker", "2": "2 — Noticeably weaker", "3": "3 — Somewhat weaker", "4": "4 — About the same", "5": "5 — At or above peers" } },
    { key: "pt_endurance", question: "Endurance — tires quickly during physical activity compared to peers",
      choices: { "1": "1 — Tires very quickly", "2": "2 — Tires quickly", "3": "3 — Average", "4": "4 — Good endurance", "5": "5 — No concerns" } },
  ]},
  { title: "Motor Challenges & Impact", fields: [
    { key: "pt_concerns", question: "Motor challenges (all that apply)",
      choices: { "delayed-milestones": "Delayed motor milestones — not walking, running, or climbing at expected age",
        "falls-frequently": "Falls frequently or is much clumsier than same-aged children",
        "avoids-physical": "Avoids physical activity or seems fearful of movement",
        "gait-abnormal": "Unusual gait — toe walking, waddling, scissor gait, limping",
        posture: "Poor posture — slouching, difficulty maintaining sitting position",
        "sport-school-pe": "Difficulty participating in PE, sports, or playground activities",
        "pain-complaints": "Complaints of leg, back, or joint pain with activity",
        transfers: "Difficulty getting up from floor, in/out of chairs, or on/off toilet",
        "community-access": "Struggles to keep up with family on outings — gets tired quickly",
        "strength-core": "Core weakness — slumps, leans on everything, low endurance" } },
    { key: "pt_impact", question: "Where is motor difficulty most affecting your child? (all that apply)",
      choices: { "school-pe": "School / PE", "play-peers": "Play with peers",
        "home-routines": "Home routines", community: "Community outings",
        sports: "Sports / activities", independence: "Independence", safety: "Safety / fall risk" } },
  ]},
  { title: "Additional Notes", fields: [
    { key: "pt_anything", question: "Anything else you want our team to know?" },
  ]},
];

const FORM_SECTIONS: Record<string, SectionDef[]> = { slp: SLP_SECTIONS, ot: OT_SECTIONS, pt: PT_SECTIONS };

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderAnswer(value: unknown, choices?: Record<string, string>): string | null {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return choices
      ? value.map((v) => choices[String(v)] ?? String(v)).join(" · ")
      : value.join(" · ");
  }
  const str = String(value).trim();
  if (!str || str === "Not answered") return null;
  return choices ? (choices[str] ?? str) : str;
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ── Component ─────────────────────────────────────────────────────────────────

export function IntakeDetailViewer({ id }: { id: string }) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Contact/status edit
  const [contactOpen, setContactOpen] = useState(false);
  const [contactConfirm, setContactConfirm] = useState(false);
  const [contactForm, setContactForm] = useState({ parent_email: "", phone: "", status: "confirmed" });

  // Notes edit
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesText, setNotesText] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/intakes/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setFetchError(d.error);
        else setSubmission(d.submission);
      })
      .catch(() => setFetchError("Failed to load submission."))
      .finally(() => setLoading(false));
  }, [id]);

  function openContactEdit() {
    if (!submission) return;
    const editableStatus = submission.status === "pending_confirmation" ? "confirmed" : submission.status;
    setContactForm({ parent_email: submission.parent_email ?? "", phone: submission.phone ?? "", status: editableStatus });
    setSaveError(null);
    setContactConfirm(false);
    setContactOpen(true);
  }

  function openNotesEdit() {
    if (!submission) return;
    setNotesText(submission.internal_notes ?? "");
    setSaveError(null);
    setNotesOpen(true);
  }

  async function saveContact() {
    if (!submission) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/intakes/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setSaveError(data.error ?? "Save failed"); setContactConfirm(false); return; }
      setSubmission((prev) => prev
        ? { ...prev, parent_email: contactForm.parent_email || null, phone: contactForm.phone || null, status: contactForm.status as Submission["status"] }
        : prev
      );
      setContactOpen(false);
      setContactConfirm(false);
    } catch {
      setSaveError("Network error — please try again.");
      setContactConfirm(false);
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    if (!submission) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/intakes/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internal_notes: notesText }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setSaveError(data.error ?? "Save failed"); return; }
      setSubmission((prev) => prev ? { ...prev, internal_notes: notesText || null } : prev);
      setNotesOpen(false);
    } catch {
      setSaveError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-20 text-brand-navy/50">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple-deep border-t-transparent" />
        Loading submission…
      </div>
    );
  }

  if (fetchError || !submission) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-red-600">{fetchError ?? "Submission not found."}</p>
        <Link href="/admin/dashboard/intakes" className="mt-3 inline-block text-sm text-brand-purple-deep hover:underline">
          ← Back to Intake Forms
        </Link>
      </div>
    );
  }

  const s = submission;
  const sections = FORM_SECTIONS[s.form_type] ?? [];
  const prevLabel = PREV_SERVICES[s.form_type]?.[s.prev_services ?? ""] ?? s.prev_services;

  return (
    <div className="mx-auto max-w-3xl space-y-6 pt-6 pb-16">
      {/* Back + actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/dashboard/intakes"
          className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-brand-navy/50 hover:text-brand-navy"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="truncate">Back to Intake Forms</span>
        </Link>
        <button
          onClick={openContactEdit}
          className="shrink-0 rounded-xl bg-brand-purple-deep px-4 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90"
        >
          Edit
        </button>
      </div>

      {/* Header + notes: side-by-side on desktop, stacked on mobile */}
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        {/* Client info card */}
        <div className="rounded-2xl border border-brand-purple-deep/10 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-purple-deep/10 text-xl font-extrabold text-brand-purple-deep">
              {(s.child_name ?? s.parent_name ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-extrabold text-brand-navy">{s.child_name ?? "—"}</h1>
                {s.child_age && <span className="text-sm text-brand-navy/50">Age {s.child_age}</span>}
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_COLORS[s.status]}`}>
                  {STATUS_LABELS[s.status] ?? s.status}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-brand-navy/60">{s.parent_name ?? "Unknown parent"}</p>
              <p className="mt-1 text-xs text-brand-navy/40">{FORM_LABELS[s.form_type]} · {fmt(s.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Notes card — separate, same row */}
        <div className="flex flex-col rounded-2xl border border-brand-purple-deep/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Internal Notes</h2>
            <button
              onClick={openNotesEdit}
              className="text-[10px] font-semibold text-brand-purple-deep hover:underline"
            >
              {s.internal_notes ? "Edit" : "Add note"}
            </button>
          </div>
          {s.internal_notes ? (
            <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/80">{s.internal_notes}</p>
          ) : (
            <p className="mt-3 flex-1 text-xs italic text-brand-navy/30">No notes yet. Click Add note to get started.</p>
          )}
        </div>
      </div>

      {/* Contact info */}
      <Section title="Contact Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {s.parent_email && <Info label="Email">{s.parent_email}</Info>}
          {s.phone && <Info label="Phone">{s.phone}</Info>}
          {s.best_time && <Info label="Best time to call">{BEST_TIME[s.best_time] ?? s.best_time}</Info>}
          {s.insurance && <Info label="Insurance">{INSURANCE[s.insurance] ?? s.insurance}</Info>}
          {s.diagnosis && <Info label="Diagnosis / area of concern" wide>{s.diagnosis}</Info>}
        </div>
      </Section>

      {/* Main concern */}
      {s.main_concern && (
        <Section title="What Brings Them to Ava's Hub">
          <p className="text-sm leading-relaxed text-brand-navy">{s.main_concern}</p>
        </Section>
      )}

      {/* Top goal */}
      {s.top_goal && (
        <Section title="Top Priority Goal">
          <p className="text-sm leading-relaxed text-brand-navy">{s.top_goal}</p>
        </Section>
      )}

      {/* Previous services */}
      {s.prev_services && (
        <Section title="Previous Services">
          <p className="text-sm text-brand-navy">{prevLabel}</p>
        </Section>
      )}

      {/* Form responses */}
      <div className="rounded-2xl border border-brand-purple-deep/10 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-brand-purple-deep/10 bg-brand-purple-deep/[0.03] px-6 py-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy/60">
            {FORM_LABELS[s.form_type]} Form Responses
          </h2>
        </div>
        <div className="divide-y divide-brand-purple-deep/5">
          {sections.map((sec) => {
            const answered = sec.fields.filter((f) => renderAnswer(s.form_data?.[f.key], f.choices) !== null);
            if (answered.length === 0) return null;
            return (
              <div key={sec.title} className="px-6 py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-purple-deep/60">{sec.title}</p>
                <div className="space-y-3">
                  {answered.map((field) => {
                    const answer = renderAnswer(s.form_data?.[field.key], field.choices);
                    if (!answer) return null;
                    return (
                      <div key={field.key}>
                        <p className="text-xs text-brand-navy/50 leading-snug">{field.question}</p>
                        <p className="mt-0.5 text-sm font-medium text-brand-navy">{answer}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI results */}
      {s.ai_results && (
        <details className="rounded-2xl border border-brand-purple-deep/10 bg-white shadow-sm overflow-hidden">
          <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy list-none flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider">AI-Generated Results Summary</span>
            <span className="text-xs text-brand-navy/40">Click to expand</span>
          </summary>
          <div className="border-t border-brand-purple-deep/5 px-6 pb-6 pt-4">
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-brand-navy/70">{s.ai_results}</pre>
          </div>
        </details>
      )}

      {/* Contact / status edit modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setContactOpen(false); setContactConfirm(false); } }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {!contactConfirm ? (
              <>
                <h2 className="text-lg font-extrabold text-brand-navy">Edit Contact & Status</h2>
                <div className="mt-4 space-y-4">
                  <Field label="Email">
                    <input type="email" value={contactForm.parent_email}
                      onChange={(e) => setContactForm((p) => ({ ...p, parent_email: e.target.value }))}
                      className="w-full rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15" />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" value={contactForm.phone}
                      onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15" />
                  </Field>
                  <Field label="Status">
                    <select value={contactForm.status}
                      onChange={(e) => setContactForm((p) => ({ ...p, status: e.target.value }))}
                      className="w-full rounded-xl border border-brand-purple-deep/20 px-3 py-2 text-sm text-brand-navy focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15">
                      <option value="confirmed">Confirmation Sent</option>
                      <option value="followed_up">Followed Up</option>
                      <option value="intake_done">Intake Done</option>
                      <option value="enrolled">Enrolled</option>
                    </select>
                  </Field>
                </div>
                <div className="mt-5 flex justify-end gap-3">
                  <button onClick={() => setContactOpen(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Cancel</button>
                  <button onClick={() => setContactConfirm(true)} className="rounded-xl bg-brand-purple-deep px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90">Save changes</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-base font-extrabold text-brand-navy">Confirm update</h2>
                <p className="mt-2 text-sm text-brand-navy/60">
                  You're updating contact info for <strong className="text-brand-navy">{s.child_name ?? s.parent_name}</strong>. Make sure the details are correct before saving.
                </p>
                {saveError && <p className="mt-3 text-xs text-red-600">{saveError}</p>}
                <div className="mt-5 flex justify-end gap-3">
                  <button onClick={() => setContactConfirm(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Go back</button>
                  <button onClick={saveContact} disabled={saving} className="rounded-xl bg-brand-purple-deep px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90 disabled:opacity-50">
                    {saving ? "Saving…" : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notes edit modal */}
      {notesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setNotesOpen(false); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold text-brand-navy">Internal Notes</h2>
            <p className="mt-1 text-xs text-brand-navy/50">Only visible to the Ava's Hub team.</p>
            <textarea
              rows={5}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add notes here…"
              className="mt-4 w-full resize-none rounded-xl border border-brand-purple-deep/20 px-3 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/35 focus:border-brand-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple-deep/15"
            />
            {saveError && <p className="mt-2 text-xs text-red-600">{saveError}</p>}
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setNotesOpen(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-brand-navy/60 hover:text-brand-navy">Cancel</button>
              <button onClick={saveNotes} disabled={saving} className="rounded-xl bg-brand-purple-deep px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-deep/90 disabled:opacity-50">
                {saving ? "Saving…" : "Save note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-purple-deep/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">{title}</h2>
      {children}
    </div>
  );
}

function Info({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-navy/40">{label}</p>
      <p className="text-sm text-brand-navy">{children}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-brand-navy/60">{label}</label>
      {children}
    </div>
  );
}
