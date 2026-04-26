/*
 * DESIGN: Soft Watercolor Garden
 * - Warm pastel palette: mint, lavender, peach, sky blue on warm white
 * - Baloo 2 for headings, Nunito for body text
 * - Organic blob shapes, floating animations, gentle hover effects
 * - Sections: Hero, About, Programs, Activities, Testimonials, Contact
 */

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Heart,
  BookOpen,
  Palette,
  Music,
  TreePine,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  Mail,
  MessageCircle,
} from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663599595198/5HvTohq9TVSbheMwyMMgPc/hero_banner-M6HQqevz9Q4BX8xqVpFWoU.webp";
const ACTIVITIES_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663599595198/5HvTohq9TVSbheMwyMMgPc/activities_banner-ktjn6SgarkUsa9HJrXXiWC.webp";
const CLASSROOM_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663599595198/5HvTohq9TVSbheMwyMMgPc/classroom_illustration-3c63R5nh2yzfCpRwZfWjw3.webp";
const OUTDOOR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663599595198/5HvTohq9TVSbheMwyMMgPc/outdoor_play-EgYUCzXBy38fsqttrainon.webp";
const LOGO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663599595198/5HvTohq9TVSbheMwyMMgPc/logo_bg-dDST6XLme3Q9B8Ga3RUqaj.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Activities", href: "#activities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md shadow-[oklch(0.88_0.08_162)/0.2]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO_IMAGE} alt="Laugh and Learn Nursery Logo" className="w-12 h-12 rounded-full object-cover" />
          <div className="hidden sm:block">
            <div className="font-display font-bold text-lg leading-tight text-[oklch(0.35_0.12_162)]">
              Laugh & Learn
            </div>
            <div className="text-xs text-[oklch(0.55_0.08_290)] font-body font-semibold tracking-wide">
              Nursery · West Bay
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full font-body font-semibold text-sm text-[oklch(0.40_0.05_60)] hover:text-[oklch(0.35_0.14_162)] hover:bg-[oklch(0.88_0.08_162)/0.15] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 px-5 py-2.5 rounded-full bg-[oklch(0.62_0.14_162)] text-white font-display font-semibold text-sm hover:bg-[oklch(0.55_0.16_162)] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-[oklch(0.88_0.08_162)/0.2] transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/98 backdrop-blur-sm border-t border-[oklch(0.92_0.02_80)] px-4 py-4 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-4 rounded-xl font-body font-semibold text-[oklch(0.40_0.05_60)] hover:text-[oklch(0.35_0.14_162)] hover:bg-[oklch(0.88_0.08_162)/0.15] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 py-3 px-4 rounded-xl bg-[oklch(0.62_0.14_162)] text-white font-display font-semibold text-center"
          >
            Enroll Now
          </a>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Laugh and Learn Nursery"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-24 right-[15%] w-16 h-16 rounded-full bg-[oklch(0.88_0.08_290)/0.5] animate-float-slow" style={{ animationDelay: "0s" }} />
      <div className="absolute top-40 right-[30%] w-10 h-10 rounded-full bg-[oklch(0.88_0.08_50)/0.5] animate-float-slow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-32 right-[20%] w-12 h-12 rounded-full bg-[oklch(0.85_0.08_220)/0.5] animate-float-slow" style={{ animationDelay: "0.8s" }} />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.88_0.08_162)/0.8] text-[oklch(0.35_0.14_162)] font-body font-semibold text-sm mb-6">
              <Star size={14} className="fill-[oklch(0.72_0.15_90)] text-[oklch(0.72_0.15_90)]" />
              Rated 4.9/5 by Parents · West Bay, Doha
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-[oklch(0.25_0.05_60)] mb-4"
          >
            Where Little Ones{" "}
            <span className="rainbow-text">Laugh</span>{" "}
            &{" "}
            <span className="text-[oklch(0.55_0.14_162)]">Learn</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="font-body text-lg md:text-xl text-[oklch(0.40_0.04_60)] leading-relaxed mb-8 max-w-xl"
          >
            A nurturing, joyful nursery in the heart of West Bay, Doha — where every child's curiosity is celebrated and every day is a new adventure.
          </motion.p>

          {/* Quick Info Pills */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm text-sm font-body font-semibold text-[oklch(0.40_0.05_60)]">
              <Clock size={15} className="text-[oklch(0.62_0.14_162)]" />
              Opens 6:00 AM
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm text-sm font-body font-semibold text-[oklch(0.40_0.05_60)]">
              <MapPin size={15} className="text-[oklch(0.62_0.14_162)]" />
              Al Mabahej, Doha
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm text-sm font-body font-semibold text-[oklch(0.40_0.05_60)]">
              <Phone size={15} className="text-[oklch(0.62_0.14_162)]" />
              +974 5536 0660
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-[oklch(0.62_0.14_162)] text-white font-display font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Enroll Your Child
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-full bg-white/90 text-[oklch(0.35_0.12_162)] font-display font-bold text-lg border-2 border-[oklch(0.82_0.08_162)] hover:bg-[oklch(0.88_0.08_162)/0.3] hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[oklch(0.55_0.05_60)]"
      >
        <span className="text-xs font-body font-semibold tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "4.9★", label: "Parent Rating", color: "oklch(0.72_0.15_90)" },
    { value: "6 AM", label: "Early Opening", color: "oklch(0.62_0.14_162)" },
    { value: "100%", label: "Dedicated Care", color: "oklch(0.65_0.14_290)" },
    { value: "Doha", label: "West Bay Location", color: "oklch(0.62_0.14_50)" },
  ];

  return (
    <section className="py-8 bg-[oklch(0.62_0.14_162)]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-extrabold text-3xl text-white mb-1">{stat.value}</div>
              <div className="font-body text-sm text-white/80 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[oklch(0.99_0.008_80)]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image with blob shape */}
              <div className="blob-shape overflow-hidden w-full aspect-[4/3] shadow-2xl">
                <img
                  src={CLASSROOM_IMAGE}
                  alt="Nursery Classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.88_0.08_162)] flex items-center justify-center">
                  <Heart size={22} className="text-[oklch(0.55_0.14_162)] fill-[oklch(0.55_0.14_162)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-[oklch(0.28_0.04_60)] text-sm">Trusted by</div>
                  <div className="font-display font-extrabold text-[oklch(0.55_0.14_162)] text-lg">Families in Doha</div>
                </div>
              </div>
              {/* Decorative blob behind */}
              <div className="absolute -top-6 -left-6 w-32 h-32 blob-shape-2 bg-[oklch(0.88_0.08_290)/0.4] -z-10" />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.08_290)/0.4] text-[oklch(0.45_0.14_290)] font-body font-bold text-sm mb-4">
                ✨ About Our Nursery
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.25_0.05_60)] leading-tight mb-6"
            >
              A Place Where Every Child Shines
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-[oklch(0.45_0.04_60)] text-lg leading-relaxed mb-6"
            >
              At Laugh and Learn Nursery, we believe that childhood is a magical time filled with wonder, discovery, and joy. Located in the vibrant West Bay area of Doha, we provide a safe, stimulating, and loving environment where children aged 6 months to 4 years can flourish.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="font-body text-[oklch(0.45_0.04_60)] text-lg leading-relaxed mb-8"
            >
              Our dedicated team of qualified educators creates engaging activities that nurture creativity, social skills, and early learning — all while making sure every child feels loved and valued.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-2 gap-4">
              {[
                { icon: <Heart size={20} />, text: "Caring & Committed Staff", color: "oklch(0.88_0.08_50)" },
                { icon: <BookOpen size={20} />, text: "Play-Based Learning", color: "oklch(0.88_0.08_162)" },
                { icon: <Users size={20} />, text: "Small Class Sizes", color: "oklch(0.88_0.08_290)" },
                { icon: <Award size={20} />, text: "4.9★ Parent Rating", color: "oklch(0.88_0.12_90)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ backgroundColor: `${item.color}` }}
                >
                  <div className="text-[oklch(0.35_0.08_60)]">{item.icon}</div>
                  <span className="font-body font-semibold text-sm text-[oklch(0.30_0.06_60)]">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = [
    {
      title: "Infant Care",
      age: "6 – 18 months",
      description: "Gentle, nurturing care for your youngest ones. We focus on sensory exploration, bonding, and early developmental milestones in a warm, safe setting.",
      icon: "🍼",
      color: "oklch(0.88_0.08_50)",
      borderColor: "oklch(0.72_0.13_50)",
    },
    {
      title: "Toddler Program",
      age: "18 months – 3 years",
      description: "Structured play and discovery activities that encourage language development, motor skills, and social interaction through fun, hands-on experiences.",
      icon: "🧸",
      color: "oklch(0.88_0.08_162)",
      borderColor: "oklch(0.62_0.14_162)",
    },
    {
      title: "Pre-School",
      age: "3 – 4 years",
      description: "School-readiness program focusing on literacy, numeracy, creativity, and independence — preparing children for a confident start in formal education.",
      icon: "🎒",
      color: "oklch(0.88_0.08_290)",
      borderColor: "oklch(0.65_0.14_290)",
    },
    {
      title: "Extended Day",
      age: "All Ages",
      description: "Flexible extended care options starting from 6 AM to accommodate working parents, with enriching afternoon activities and supervised rest time.",
      icon: "🌟",
      color: "oklch(0.88_0.12_90)",
      borderColor: "oklch(0.72_0.15_90)",
    },
  ];

  return (
    <section id="programs" className="py-20 md:py-28 bg-[oklch(0.97_0.015_162)]">
      {/* Wave top */}
      <div className="w-full overflow-hidden -mt-20 mb-12">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 Z" fill="oklch(0.99 0.008 80)" />
        </svg>
      </div>

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.08_162)/0.5] text-[oklch(0.45_0.14_162)] font-body font-bold text-sm mb-4">
            🌱 Our Programs
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.25_0.05_60)] mb-4">
            Programs for Every Stage
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-body text-lg text-[oklch(0.45_0.04_60)] max-w-2xl mx-auto">
            From infants to pre-schoolers, our age-appropriate programs are designed to support each child's unique developmental journey.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-hover rounded-3xl p-6 bg-white shadow-md border-b-4"
              style={{ borderBottomColor: program.borderColor }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: program.color }}
              >
                {program.icon}
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-body font-bold mb-3"
                style={{ backgroundColor: program.color, color: "oklch(0.30 0.06 60)" }}>
                {program.age}
              </div>
              <h3 className="font-display font-bold text-xl text-[oklch(0.25_0.05_60)] mb-3">{program.title}</h3>
              <p className="font-body text-sm text-[oklch(0.50_0.04_60)] leading-relaxed">{program.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="w-full overflow-hidden mt-12 -mb-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="oklch(0.99 0.008 80)" />
        </svg>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const activities = [
    { icon: <Palette size={28} />, title: "Arts & Crafts", desc: "Finger painting, collage, and creative expression to develop fine motor skills and imagination.", color: "oklch(0.88_0.08_50)" },
    { icon: <Music size={28} />, title: "Music & Movement", desc: "Songs, rhythm, and dance that build coordination, language, and a love of music.", color: "oklch(0.88_0.08_290)" },
    { icon: <BookOpen size={28} />, title: "Story Time", desc: "Daily read-alouds that spark imagination and build early literacy foundations.", color: "oklch(0.88_0.08_162)" },
    { icon: <TreePine size={28} />, title: "Outdoor Play", desc: "Supervised outdoor activities in our garden area to develop physical skills and love of nature.", color: "oklch(0.88_0.12_90)" },
    { icon: <Users size={28} />, title: "Social Play", desc: "Group activities that teach sharing, cooperation, and building friendships.", color: "oklch(0.85_0.08_220)" },
    { icon: <Star size={28} />, title: "STEM Exploration", desc: "Age-appropriate science, shapes, and counting activities that build early STEM foundations.", color: "oklch(0.88_0.08_50)" },
  ];

  return (
    <section id="activities" className="py-20 md:py-28 bg-[oklch(0.99_0.008_80)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.08_50)/0.5] text-[oklch(0.45_0.13_50)] font-body font-bold text-sm mb-4">
              🎨 Daily Activities
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.25_0.05_60)] leading-tight mb-6">
              Learning Through Play Every Day
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="font-body text-lg text-[oklch(0.45_0.04_60)] leading-relaxed mb-8">
              Our carefully planned daily schedule balances structured learning with free play, ensuring children develop holistically — cognitively, physically, socially, and emotionally.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {activities.map((activity, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i + 3}
                  className="p-4 rounded-2xl card-hover"
                  style={{ backgroundColor: activity.color }}
                >
                  <div className="text-[oklch(0.35_0.08_60)] mb-2">{activity.icon}</div>
                  <h4 className="font-display font-bold text-sm text-[oklch(0.25_0.05_60)] mb-1">{activity.title}</h4>
                  <p className="font-body text-xs text-[oklch(0.45_0.04_60)] leading-relaxed">{activity.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="blob-shape-2 overflow-hidden aspect-square shadow-2xl">
              <img
                src={ACTIVITIES_IMAGE}
                alt="Children's Activities"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-8 -right-4 w-24 h-24 blob-shape bg-[oklch(0.88_0.08_50)/0.5] animate-float" />
            <div className="absolute -bottom-4 -left-6 w-16 h-16 rounded-full bg-[oklch(0.88_0.08_162)/0.5] animate-float-slow" style={{ animationDelay: "2s" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-[oklch(0.97_0.015_290)]">
      {/* Wave top */}
      <div className="w-full overflow-hidden -mt-20 mb-12">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,0 Z" fill="oklch(0.99 0.008 80)" />
        </svg>
      </div>

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.08_290)/0.5] text-[oklch(0.45_0.14_290)] font-body font-bold text-sm mb-4">
            📸 Our Space
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.25_0.05_60)] mb-4">
            A Peek Inside Our World
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="font-body text-lg text-[oklch(0.45_0.04_60)] max-w-xl mx-auto">
            Our nursery is designed to inspire wonder, creativity, and a love of learning in every corner.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl card-hover aspect-[4/3]"
          >
            <img src={CLASSROOM_IMAGE} alt="Nursery Classroom" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl overflow-hidden shadow-xl card-hover aspect-[4/3]"
          >
            <img src={OUTDOOR_IMAGE} alt="Outdoor Play Area" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-xl card-hover aspect-[4/3]"
          >
            <img src={ACTIVITIES_IMAGE} alt="Learning Activities" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="rounded-3xl overflow-hidden shadow-xl card-hover aspect-[4/3] relative"
          >
            <img src={HERO_IMAGE} alt="Nursery Garden" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.25_0.05_60)/0.5] to-transparent flex items-end p-6">
              <p className="font-display font-bold text-white text-xl">Our Beautiful Garden</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="w-full overflow-hidden mt-12 -mb-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C480,0 960,80 1440,40 L1440,80 L0,80 Z" fill="oklch(0.99 0.008 80)" />
        </svg>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Inabattem",
      text: "Best nursery in Dafna area in terms of price and teaching. Thanks for Ms. Sara and other teachers, who create lots of engaging activities for children. A perfect nursery choice for my son. Brilliantly friendly and committed staff.",
      rating: 5,
      color: "oklch(0.88_0.08_162)",
    },
    {
      name: "Srigith S.",
      role: "Local Guide",
      text: "A great nursery! My child loves it here. The environment is warm and welcoming, and the staff are incredibly caring and attentive.",
      rating: 5,
      color: "oklch(0.88_0.08_290)",
    },
    {
      name: "Maihab Zaidan",
      role: "Local Guide",
      text: "Friendly staff, very good nursery. The team is professional and genuinely cares about each child's development and happiness.",
      rating: 5,
      color: "oklch(0.88_0.08_50)",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.99_0.008_80)]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.12_90)/0.5] text-[oklch(0.45_0.14_90)] font-body font-bold text-sm mb-4">
            💬 What Parents Say
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.25_0.05_60)] mb-4">
            Loved by Families in Doha
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center gap-2 mb-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={24} className="fill-[oklch(0.72_0.15_90)] text-[oklch(0.72_0.15_90)]" />
            ))}
            <span className="font-display font-bold text-2xl text-[oklch(0.35_0.05_60)] ml-2">4.9</span>
          </motion.div>
          <motion.p variants={fadeUp} custom={3} className="font-body text-[oklch(0.55_0.04_60)]">Based on 13 Google Reviews</motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-hover rounded-3xl p-6 bg-white shadow-md border-t-4"
              style={{ borderTopColor: t.color.replace("oklch(", "oklch(").replace(")", ")") }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={16} className="fill-[oklch(0.72_0.15_90)] text-[oklch(0.72_0.15_90)]" />
                ))}
              </div>
              <p className="font-body text-[oklch(0.40_0.04_60)] leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-[oklch(0.30_0.06_60)] text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-[oklch(0.28_0.04_60)]">{t.name}</div>
                  {t.role && <div className="font-body text-xs text-[oklch(0.55_0.04_60)]">{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[oklch(0.62_0.14_162)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-6">
              Ready to Join Our Family?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-white/85 text-lg leading-relaxed mb-8">
              We'd love to welcome your little one to Laugh and Learn Nursery. Reach out to us to schedule a visit, ask questions, or begin the enrollment process.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4">
              {[
                { icon: <Phone size={20} />, label: "Phone", value: "+974 5536 0660", href: "tel:+97455360660" },
                { icon: <MapPin size={20} />, label: "Address", value: "Al Mabahej, West Bay, Doha, Qatar", href: "https://maps.app.goo.gl/6Jx9vSBTj6pUx42N8" },
                { icon: <Clock size={20} />, label: "Hours", value: "Opens 6:00 AM · Monday – Friday", href: null },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 2}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/15 hover:bg-white/25 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-body text-white/70 text-xs font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                        <div className="font-body font-semibold text-white group-hover:underline">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/15">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-body text-white/70 text-xs font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                        <div className="font-body font-semibold text-white">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={LOGO_IMAGE} alt="Logo" className="w-14 h-14 rounded-full" />
              <div>
                <h3 className="font-display font-bold text-xl text-[oklch(0.25_0.05_60)]">Get in Touch</h3>
                <p className="font-body text-sm text-[oklch(0.55_0.04_60)]">We respond quickly!</p>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+97455360660"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[oklch(0.62_0.14_162)] text-white font-display font-bold text-lg hover:bg-[oklch(0.55_0.16_162)] transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                <Phone size={22} />
                Call Us Now
              </a>

              <a
                href="https://wa.me/97455360660"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[oklch(0.55_0.18_162)] text-white font-display font-bold text-lg hover:bg-[oklch(0.48_0.20_162)] transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                <MessageCircle size={22} />
                WhatsApp Us
              </a>

              <a
                href="https://maps.app.goo.gl/6Jx9vSBTj6pUx42N8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[oklch(0.88_0.08_162)] text-[oklch(0.35_0.12_162)] font-display font-bold text-lg hover:bg-[oklch(0.82_0.10_162)] transition-all hover:-translate-y-0.5"
              >
                <MapPin size={22} />
                Get Directions
              </a>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[oklch(0.97_0.015_162)] text-center">
              <p className="font-body text-sm text-[oklch(0.45_0.08_162)] font-semibold">
                📍 Al Mabahej, West Bay, Doha, Qatar
              </p>
              <p className="font-body text-xs text-[oklch(0.55_0.04_60)] mt-1">
                Near Al Sidri Street · Plus Code: 8GX8+7P
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.22_0.04_60)] py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_IMAGE} alt="Logo" className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-display font-bold text-white text-lg">Laugh & Learn</div>
                <div className="font-body text-white/60 text-xs">Nursery · West Bay</div>
              </div>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              A nurturing nursery in the heart of West Bay, Doha — where every child laughs, learns, and grows.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Programs", "Activities", "Gallery", "Contact"].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="block font-body text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+97455360660" className="flex items-center gap-2 font-body text-white/60 hover:text-white text-sm transition-colors">
                <Phone size={14} />
                +974 5536 0660
              </a>
              <div className="flex items-start gap-2 font-body text-white/60 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                Al Mabahej, West Bay, Doha, Qatar
              </div>
              <div className="flex items-center gap-2 font-body text-white/60 text-sm">
                <Clock size={14} />
                Opens 6:00 AM
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/40 text-sm">
            © 2025 Laugh and Learn Nursery - West Bay. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={14} className="fill-[oklch(0.72_0.15_90)] text-[oklch(0.72_0.15_90)]" />
            ))}
            <span className="font-body text-white/60 text-sm ml-1">4.9 on Google Maps</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ProgramsSection />
      <ActivitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
