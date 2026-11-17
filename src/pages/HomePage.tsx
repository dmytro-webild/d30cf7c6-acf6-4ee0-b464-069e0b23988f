import HeroSplitHorizon from "@/components/sections/hero/HeroSplitHorizon";
import ServicesStackedChannels from "@/components/sections/features/ServicesStackedChannels";
import GallerySurveyStack from "@/components/sections/gallery/GallerySurveyStack";
import ProcessTransectRail from "@/components/sections/features/ProcessTransectRail";
import PricingSpecSheet from "@/components/sections/pricing/PricingSpecSheet";
import FaqLogIndex from "@/components/sections/faq/FaqLogIndex";
import ContactBeaconForm from "@/components/sections/contact/ContactBeaconForm";
import TerrainDotStage from "@/components/kit/TerrainDotStage";
import LoaderCrosshairLock from "@/components/loaders/LoaderCrosshairLock";

export default function HomePage() {
  return (
    <>
      <TerrainDotStage

      />

      <LoaderCrosshairLock
        brand="LuroCraft"
        coordinates="N 30.26 / W 97.74"
      />

      <div id="hero" data-webild-section="HeroSplitHorizon" data-webild-section-id="HeroSplitHorizon-1" data-section="hero" className="relative z-10" data-terrain="rise" data-scene>
        <HeroSplitHorizon
          titleTop="Never Miss"
          titleBottom="Customer Calls"
          description="Your AI receptionist answers calls, books appointments, and handles customer inquiries 24/7."
          readout={{
            value: "24/7 AI",
            label: "Zero missed leads and instant booking"
          }}
          beacon={{
            label: "Austin HQ",
            coordinates: "N 30.26 / W 97.74",
            elevation: 149
          }}
          primaryButton={{
            text: "Book Free Demo",
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
              title: "CALL ANSWERING",
              description: "Answers every incoming call on the first ring 24/7.",
              channel: "CH 01"
            },
            {
              title: "AUTO BOOKING",
              description: "Syncs with GoHighLevel to book appointments automatically.",
              channel: "CH 02"
            },
            {
              title: "NATURAL SPEECH",
              description: "Delivers fluid human-like dialogue tuned to your business.",
              channel: "CH 03"
            },
            {
              title: "PARALLEL CALLS",
              description: "Handles infinite simultaneous calls with zero hold times.",
              channel: "CH 04"
            },
            {
              title: "CALENDAR SYNC",
              description: "Prevents double booking by updating schedules instantly.",
              channel: "CH 05"
            }
          ]}
          note="Never miss a qualified lead again."
          linkButton={{
            text: "Book Free Demo",
            href: "#contact"
          }}
        />
      </div>

      <div id="gallery" data-webild-section="GallerySurveyStack" data-webild-section-id="GallerySurveyStack-1" data-section="gallery" className="relative z-10" data-terrain="valley" data-scene>
        <GallerySurveyStack
          label="Industry solutions"
          title="Tailored AI voice workflows"
          linkButton={{
            text: "Book demo",
            href: "#contact"
          }}
          items={[
            {
              title: "Chiropractic booking automation",
              category: "Healthcare",
              meta: "2,400 calls / month",
              imageSrc: "https://img.b2bpic.net/free-photo/physical-therapist-looking-male-athlete-with-cervical-collar-filling-medical-form-reception-counter-hospital_662251-1713.jpg",
              imageAlt: "Physical therapist looking at male athlete with cervical collar filling medical form at reception counter in hospital"
            },
            {
              title: "Dental emergency call routing",
              category: "Dental",
              meta: "0s average hold time",
              imageSrc: "https://img.b2bpic.net/free-photo/indian-medic-consulting-her-patient-medical-facility-copy-space_482257-118298.jpg",
              imageAlt: "Indian medic consulting her patient in medical facility next to copy space"
            },
            {
              title: "HVAC dispatch & scheduling",
              category: "Field service",
              meta: "100% capture rate",
              imageSrc: "https://img.b2bpic.net/free-photo/elevated-view-senior-man-holding-digital-tablet_23-2147859719.jpg",
              imageAlt: "Elevated view of senior man holding digital tablet"
            },
            {
              title: "Plumbing inquiry booking",
              category: "Home services",
              meta: "3x lead conversion",
              imageSrc: "https://img.b2bpic.net/free-photo/senior-holding-mockup-tablet_23-2148346198.jpg",
              imageAlt: "Senior holding a mockup tablet"
            },
            {
              title: "Salon appointment matrix",
              category: "Wellness",
              meta: "99% calendar accuracy",
              imageSrc: "https://img.b2bpic.net/free-photo/woman-watching-tablet-while-chilling-sofa_23-2147670449.jpg",
              imageAlt: "Woman watching tablet while chilling on sofa"
            }
          ]}
        />
      </div>

      <div id="process" data-webild-section="ProcessTransectRail" data-webild-section-id="ProcessTransectRail-1" data-section="process" className="relative z-10" data-terrain="valley" data-scene>
        <ProcessTransectRail
          label="Simple Setup"
          title="Live in under 15 minutes"
          items={[
            {
              title: "Forward your call line",
              description: "Connect your existing business phone line to LuroCraft using standard conditional call forwarding in seconds.",
              imageSrc: "https://img.b2bpic.net/free-photo/analyzing-statistics_1098-12863.jpg",
              imageAlt: "Analyzing statistics"
            },
            {
              title: "Configure AI rules",
              description: "Upload your custom FAQs, office hours, and greeting rules to train your dedicated voice agent.",
              imageSrc: "https://img.b2bpic.net/free-photo/women-sideways-working-from-their-desk_23-2148463301.jpg",
              imageAlt: "Women sideways working from their desk"
            },
            {
              title: "Sync your calendar",
              description: "Link your booking platform so your receptionist schedules appointments in real time without phone tag.",
              imageSrc: "https://img.b2bpic.net/free-photo/mid-section-woman-using-digital-tablet_1170-484.jpg",
              imageAlt: "Mid-section of woman using digital tablet"
            },
            {
              title: "Activate 24/7 coverage",
              description: "Launch instant call answering to capture every prospective client, day or night.",
              imageSrc: "https://img.b2bpic.net/free-photo/programmers-data-center-using-mockup-tablet-observing-equipment-analytics_482257-125853.jpg",
              imageAlt: "Programmers in data center using mockup tablet observing equipment analytics"
            }
          ]}
        />
      </div>

      <div id="pricing" data-webild-section="PricingSpecSheet" data-webild-section-id="PricingSpecSheet-1" data-section="pricing" className="relative z-10" data-terrain="valley">
        <PricingSpecSheet
          label="Flexible Plans"
          title="Transparent plans for growing service businesses"
          items={[
            {
              title: "Starter Plan",
              price: "$199",
              period: "per month",
              description: "Always-on voice AI answering and appointment scheduling for small teams.",
              features: [
                {
                  label: "Monthly Calls",
                  value: "500 minutes"
                },
                {
                  label: "Setup Time",
                  value: "Under 15 mins"
                },
                {
                  label: "Integrations",
                  value: "Calendar & CRM"
                },
                {
                  label: "Support",
                  value: "24/7 Automated"
                }
              ],
              button: {
                text: "Book Demo",
                href: "#contact"
              }
            },
            {
              title: "Enterprise Plan",
              price: "Custom",
              period: "per month",
              description: "High-volume call routing with custom integrations and dedicated support.",
              features: [
                {
                  label: "Monthly Calls",
                  value: "Unlimited"
                },
                {
                  label: "Setup Time",
                  value: "Custom Setup"
                },
                {
                  label: "Integrations",
                  value: "Custom API"
                },
                {
                  label: "Support",
                  value: "Dedicated Manager"
                }
              ],
              button: {
                text: "Contact Sales",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqLogIndex" data-webild-section-id="FaqLogIndex-1" data-section="faq" className="relative z-10" data-terrain="valley">
        <FaqLogIndex
          label="Questions"
          title="Everything you need to know"
          button={{
            text: "Book a Demo",
            href: "#contact"
          }}
          items={[
            {
              title: "How quickly can I setup?",
              description: "Deployment takes less than 15 minutes after connecting your existing phone lines to LuroCraft."
            },
            {
              title: "Does it integrate with my CRM?",
              description: "Yes, we offer native integrations with GoHighLevel, HubSpot, and most popular business CRM platforms."
            },
            {
              title: "Is the pricing monthly?",
              description: "Yes, all plans are flexible month-to-month subscriptions starting at $199 per month with no long-term contracts."
            },
            {
              title: "What if the AI doesn't know an answer?",
              description: "The AI is trained on your specific documentation to handle almost any query, and can forward complex calls directly to your team."
            },
            {
              title: "Can the AI receptionist handle simultaneous calls?",
              description: "Yes, LuroCraft handles unlimited simultaneous incoming calls so your callers never hear a busy signal."
            },
            {
              title: "How does automated appointment booking work?",
              description: "The AI syncs directly with your GoHighLevel calendar in real time to schedule, confirm, and update bookings during the call."
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
              placeholder: "Dental, HVAC, Plumbing, or Salon"
            }
          ]}
          submitText="Book Free Demo"
          successText="Request received. We will contact you soon."
          imageSrc="https://img.b2bpic.net/free-photo/laptop-phone-notebook-office-desk_181624-25209.jpg"
          imageAlt="Laptop, phone, and notebook on the office desk"
          meta="24/7 AI Communication Platform"
        />
      </div>
    </>
  );
}
