import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { profileData } from '../../data/profileData';
import { Mail, Linkedin, Github, ArrowRight, Sparkles } from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: profileData.email,
    href: `mailto:${profileData.email}`,
    description: "Drop me a line",
    color: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "LinkedIn Profile",
    href: profileData.linkedIn,
    description: "Let's connect professionally",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "GitHub Profile",
    href: "https://github.com/rhish9h",
    description: "Check out my code",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  }
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          The Journey Continues
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let's continue building amazing things together. Reach out for collaborations, opportunities, or just a friendly conversation.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
      </motion.div>

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="journey-card group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all text-left"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className={`p-3 rounded-xl bg-muted w-fit mb-4 group-hover:bg-white/50 transition-colors`}>
                <link.icon className={`h-5 w-5 ${link.iconColor}`} />
              </div>
              <h3 className="font-semibold mb-1">{link.label}</h3>
              <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>{link.label === "Email" ? "Send email" : "Visit profile"}</span>
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Journey conclusion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-muted/50 to-accent/5 border"
      >
        <p className="text-lg font-medium mb-2">Thanks for scrolling through my journey!</p>
        <p className="text-muted-foreground">
          I'm always excited to discuss new opportunities and collaborations.
        </p>
      </motion.div>
    </div>
  );
}
