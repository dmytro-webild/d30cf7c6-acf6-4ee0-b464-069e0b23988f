import HeroSplitHorizon from "@/components/sections/hero/HeroSplitHorizon";
import ServicesStackedChannels from "@/components/sections/features/ServicesStackedChannels";
import GallerySurveyStack from "@/components/sections/gallery/GallerySurveyStack";
import ProcessTransectRail from "@/components/sections/features/ProcessTransectRail";
import FaqLogIndex from "@/components/sections/faq/FaqLogIndex";
import ContactBeaconForm from "@/components/sections/contact/ContactBeaconForm";
import TerrainDotStage from "@/components/kit/TerrainDotStage";
import LoaderCrosshairLock from "@/components/loaders/LoaderCrosshairLock";

export default function HomePage() {
  return (
    <>
      <TerrainDotStage />

      <LoaderCrosshairLock
        brand="LuroCraft"
        coordinates="N 43.65 / W 79.38"
      />

      <div id="hero" data-webild-section="HeroSplitHorizon" data-webild-section-id="HeroSplitHorizon-1" data-section="hero" className="relative z-10" data-terrain="rise" data-scene>
        <HeroSplitHorizon
          titleTop="Never Miss"
          titleBottom="Another Customer Call."
          description="Your AI receptionist answers calls, books appointments, and handles customer inquiries 24/7 — so you can focus on growing your business."
          readout={{
            value: "24/7 AI",
            label: "Zero missed leads and instant booking"
          }}
          beacon={{
            label: "Toronto HQ",
            coordinates: "N 43.65 / W 79.38",
            elevation: 149
          }}
          primaryButton={{
            text: "Book a Free Demo",
            href: "#contact"
          }}
          secondaryButton={{
            text: "How It Works",
            href: "#process"
          }}
          scrollLabel="Explore features"
          introDelay={1.6}
        />
      </div>

      <div id="services" data-webild-section="ServicesStackedChannels" data-webild-section-id="ServicesStackedChannels-1" data-section="services" className="relative z-10" data-terrain="valley">
        <ServicesStackedChannels
          label="CAPABILITIES"
          title="Built for high-volume business calls"
          items={[
            {
              title: "24/7 CALL ANSWERING",
              description: "Answers every incoming call on the first ring 24/7 with zero delay.",
              channel: "CH 01"
            },
            {
              title: "APPOINTMENT BOOKING",
              description: "Syncs directly with your calendar to schedule appointments automatically.",
              channel: "CH 02"
            },
            {
              title: "NATURAL HUMAN SPEECH",
              description: "Delivers fluid human-like conversations tuned to your specific business.",
              channel: "CH 03"
            },
            {
              title: "SIMULTANEOUS CALLS",
              description: "Handles infinite simultaneous calls so your callers never hear a busy signal.",
              channel: "CH 04"
            },
            {
              title: "CALENDAR INTEGRATION",
              description: "Prevents double booking by updating schedules and CRM records instantly.",
              channel: "CH 05"
            }
          ]}
          note="Never miss a qualified lead again."
          linkButton={{
            text: "Book a Free Demo",
            href: "#contact"
          }}
        />
      </div>

      <div id="gallery" data-webild-section="GallerySurveyStack" data-webild-section-id="GallerySurveyStack-1" data-section="gallery" className="relative z-10" data-terrain="valley" data-scene>
        <GallerySurveyStack
          label="INDUSTRIES SERVED"
          title="Tailored AI voice workflows"
          linkButton={{
            text: "Book a Free Demo",
            href: "#contact"
          }}
          items={[
            {
              title: "Chiropractic booking automation",
              category: "Chiropractic",
              meta: "2,400 calls / month",
              imageSrc: "https://img.b2bpic.net/free-photo/physical-therapist-looking-male-athlete-with-cervical-collar-filling-medical-form-reception-counter-hospital_662251-1713.jpg",
              imageAlt: "Physical therapist looking at patient at reception desk"
            },
            {
              title: "Dental emergency call routing",
              category: "Dental",
              meta: "0s average hold time",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3K0aa19UHoT6DytXIGbvco08Y93/uploaded-1795457563208-fzaoa89i.png",
              imageAlt: "Dental receptionist consulting patient"
            },
            {
              title: "HVAC dispatch & scheduling",
              category: "HVAC",
              meta: "100% lead capture",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3K0aa19UHoT6DytXIGbvco08Y93/uploaded-1792082906184-telyfxng.png",
              imageAlt: "HVAC technician scheduling on digital tablet"
            },
            {
              title: "Plumbing inquiry booking",
              category: "Plumbing",
              meta: "3x lead conversion",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3K0aa19UHoT6DytXIGbvco08Y93/uploaded-1791855090107-w75vsijh.png",
              imageAlt: "Plumbing service call scheduling"
            },
            {
              title: "Landscaping estimate scheduling",
              category: "Landscaping",
              meta: "24/7 instant intake",
              imageSrc: "https://img.b2bpic.net/free-photo/analyzing-statistics_1098-12863.jpg?_wi=1",
              imageAlt: "Landscaping business manager reviewing schedule"
            },
            {
              title: "Salon appointment matrix",
              category: "Salons & Spas",
              meta: "99% calendar accuracy",
              imageSrc: "https://img.b2bpic.net/free-photo/woman-watching-tablet-while-chilling-sofa_23-2147670449.jpg",
              imageAlt: "Salon appointment booking on tablet"
            }
          ]}
        />
      </div>

      <div id="process" data-webild-section="ProcessTransectRail" data-webild-section-id="ProcessTransectRail-1" data-section="process" className="relative z-10" data-terrain="valley" data-scene>
        <ProcessTransectRail
          label="HOW IT WORKS"
          title="Get started in 3 simple steps"
          items={[
            {
              title: "1. Forward your phone line",
              description: "Connect your existing business phone number to LuroCraft using simple conditional call forwarding in seconds.",
              imageSrc: "https://img.b2bpic.net/free-photo/analyzing-statistics_1098-12863.jpg?_wi=2",
              imageAlt: "Call line forwarding configuration"
            },
            {
              title: "2. Configure AI & calendar",
              description: "Upload your business FAQs, operating hours, and sync your calendar so your AI receptionist knows how to book.",
              imageSrc: "https://img.b2bpic.net/free-photo/women-sideways-working-from-their-desk_23-2148463301.jpg",
              imageAlt: "Configuring AI assistant rules"
            },
            {
              title: "3. Activate 24/7 AI coverage",
              description: "Launch instant call answering to capture every customer lead, answer inquiries, and book appointments 24/7.",
              imageSrc: "https://img.b2bpic.net/free-photo/mid-section-woman-using-digital-tablet_1170-484.jpg",
              imageAlt: "24/7 AI receptionist active coverage"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqLogIndex" data-webild-section-id="FaqLogIndex-1" data-section="faq" className="relative z-10" data-terrain="valley">
        <FaqLogIndex
          title="FAQ"
          button={{
            text: "Book a Free Demo",
            href: "#contact"
          }}
          items={[
            {
              title: "How quickly can I get set up?",
              description: "Deployment takes less than 15 minutes by setting up standard call forwarding on your existing business phone line."
            },
            {
              title: "What phone numbers work with LuroCraft?",
              description: "LuroCraft works with any existing business landline, mobile phone, or VoIP service provider."
            },
            {
              title: "Does it integrate with my calendar and CRM?",
              description: "Yes, we offer native real-time sync with GoHighLevel, Google Calendar, Outlook, HubSpot, and top CRM platforms."
            },
            {
              title: "Can the AI receptionist handle simultaneous calls?",
              description: "Yes, LuroCraft handles unlimited simultaneous incoming calls so your callers never hear a busy signal."
            },
            {
              title: "How does automated appointment booking work?",
              description: "The AI checks your live calendar availability and schedules, confirms, or updates bookings directly during the call."
            },
            {
              title: "What if a caller asks something unexpected?",
              description: "The AI receptionist is trained on your specific documentation to handle almost any inquiry, and can seamlessly forward complex calls to your team."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactBeaconForm" data-webild-section-id="ContactBeaconForm-1" data-section="contact" className="relative z-10" data-terrain="calm">
        <ContactBeaconForm
          title="Book a Free AI Receptionist Demo"
          fields={[
            {
              name: "name",
              label: "Full name",
              type: "text",
              placeholder: "Your name",
              required: true
            },
            {
              name: "email",
              label: "Work email",
              type: "email",
              placeholder: "hello@lurocraft.com",
              required: true
            },
            {
              name: "phone",
              label: "Phone number",
              type: "tel",
              placeholder: "Your phone number",
              required: true
            },
            {
              name: "industry",
              label: "Industry",
              type: "text",
              placeholder: "Chiropractic, Dental, Plumbing, HVAC, Landscaping, or Salon"
            }
          ]}
          submitText="Book Free Demo"
          successText="Request received. We will contact you shortly to schedule your demo."
          imageSrc="https://img.b2bpic.net/free-photo/laptop-phone-notebook-office-desk_181624-25209.jpg"
          imageAlt="Laptop, phone, and notebook on office desk"
          meta="24/7 AI Communication Platform"
        />
      </div>
    </>
  );
}

