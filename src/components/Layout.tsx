import { Outlet } from "react-router-dom";
import NavbarHudCorners from "@/components/navbars/NavbarHudCorners";
import FooterHorizonMark from "@/components/sections/footer/FooterHorizonMark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarHudCorners
          brand="LuroCraft"
          navItems={[
            {
              name: "Home",
              href: "#hero"
            },
            {
              name: "Features",
              href: "#services"
            },
            {
              name: "Gallery",
              href: "#gallery"
            },
            {
              name: "How It Works",
              href: "#process"
            },
            {
              name: "FAQ",
              href: "#faq"
            },
            {
              name: "Contact",
              href: "#contact"
            }
          ]}
          primaryButton={{
            text: "Book Demo",
            href: "#contact"
          }}
          contactLink={{
            text: "hello@lurocraft.com",
            href: "mailto:hello@lurocraft.com"
          }}
          introDelay={1.6}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer" className="relative z-10" data-terrain="calm">
        <FooterHorizonMark
          brand="LuroCraft"
          coordinates="N 30.26 / W 97.74"
          copyright="© 2026 LuroCraft Inc. All rights reserved."
          backToTop={{
            text: "Back to top",
            href: "#hero"
          }}
          legal={[
            {
              text: "Privacy Policy",
              href: "#"
            },
            {
              text: "Terms of Service",
              href: "#"
            }
          ]}
          columns={[
            {
              title: "Platform",
              items: [
                {
                  text: "Features",
                  href: "#services"
                },
                {
                  text: "How It Works",
                  href: "#process"
                },
                {
                  text: "Live AI Demo",
                  href: "#gallery"
                }
              ]
            },
            {
              title: "Company",
              items: [
                {
                  text: "About LuroCraft",
                  href: "#hero"
                },
                {
                  text: "FAQ",
                  href: "#faq"
                },
                {
                  text: "Book a Demo",
                  href: "#contact"
                }
              ]
            },
            {
              title: "Connect",
              items: [
                {
                  text: "LinkedIn",
                  href: "#"
                },
                {
                  text: "Twitter",
                  href: "#"
                },
                {
                  text: "Contact Sales",
                  href: "#contact"
                }
              ]
            }
          ]}
          positionText="Headquarters"
        />
      </footer>
    </div>
  );
}
