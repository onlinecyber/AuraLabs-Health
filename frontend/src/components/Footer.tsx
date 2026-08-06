import Link from "next/link";
import { Activity, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Aura<span className="text-primary">Labs</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              Premium enterprise-grade diagnostic laboratory platform providing accurate, reliable, and fast health checkups at your convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Health Packages", path: "/packages" },
                { name: "Individual Tests", path: "/tests" },
                { name: "Doctor Consultation", path: "/consult" },
                { name: "Home Sample Collection", path: "/checkout" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "Careers", path: "/about" },
                { name: "Corporate Wellness", path: "/about" },
                { name: "Health Blog", path: "/about" },
                { name: "FAQ", path: "/contact" },
                { name: "Privacy Policy", path: "/about" },
                { name: "Terms & Conditions", path: "/about" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Innovation Drive, Tech Park, Cityville 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">support@auralabs.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} AuraLabs Diagnostics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
