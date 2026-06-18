import { BarChart3, Bell, BookOpen, CalendarDays, HandCoins, Image as ImageIcon, Landmark, Music, Users } from "lucide-react";

export const navItems = [
  ["Home", "home"],
  ["About Ashramam", "about"],
  ["Temples", "temples"],
  ["Festivals", "festivals"],
  ["Spiritual Programs", "programs"],
  ["Gallery", "gallery"],
  ["Donations", "donations"],
  ["Contact Us", "contact"]
] as const;

export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1800&q=85",
    title: "Welcome to Sri Adhinarayana Swamy Rajayogashramam",
    subtitle: "Experience Divine Bliss and Spiritual Growth"
  },
  {
    image: "https://images.unsplash.com/photo-1623059508779-2542c6e83753?auto=format&fit=crop&w=1800&q=85",
    title: "Sacred Sevas, Festivals and Spiritual Learning",
    subtitle: "A serene path for devotion, service and inner discipline"
  },
  {
    image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1800&q=85",
    title: "Join Hands for Dharma and Community Service",
    subtitle: "Support temples, goshala, annadanam and cultural programs"
  }
];

export const temples = [
  {
    name: "Sri Adhinarayana Swamy Temple",
    location: "Main Ashramam Campus",
    image: "https://images.unsplash.com/photo-1609946860441-a51ffcf22208?auto=format&fit=crop&w=900&q=80",
    description: "The principal shrine devoted to divine guidance, meditation and daily archana."
  },
  {
    name: "Sri Lakshmi Ammavari Mandiram",
    location: "East Prakaram",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    description: "A peaceful sanctum for prosperity, compassion and family prayers."
  },
  {
    name: "Navagraha Peetham",
    location: "Temple Garden",
    image: "https://images.unsplash.com/photo-1591523364772-755261d60f9b?auto=format&fit=crop&w=900&q=80",
    description: "Dedicated to planetary harmony with weekly special poojas."
  }
];

export const poojas = ["Abhishekam", "Archana", "Satyanarayana Vratham", "Annadanam Seva", "Goshala Seva"];

export const panchangam = {
  tithi: "Sukla Ekadashi",
  nakshatram: "Anuradha",
  rahukalam: "03:00 PM - 04:30 PM",
  yamagandam: "09:00 AM - 10:30 AM",
  sunrise: "05:45 AM",
  sunset: "06:42 PM"
};

export const festivals = [
  {
    name: "Guru Purnima Mahotsavam",
    date: "2026-07-29T06:00:00",
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=1000&q=80",
    description: "Paduka pooja, bhajans, pravachanam and annadanam."
  },
  {
    name: "Sri Krishna Janmashtami",
    date: "2026-09-04T18:00:00",
    image: "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?auto=format&fit=crop&w=1000&q=80",
    description: "Evening alankaram, devotional music and midnight harathi."
  },
  {
    name: "Karthika Deepotsavam",
    date: "2026-11-24T17:30:00",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=1000&q=80",
    description: "Temple lighting, deepa seva and community prayers."
  }
];

export const quotes = [
  "Serve with humility; devotion becomes light.",
  "Where remembrance is steady, peace becomes natural.",
  "A pure heart is the temple every pilgrim seeks.",
  "Dharma grows through discipline, compassion and gratitude."
];

export const articles = [
  "The Meaning of Daily Archana",
  "Meditation in Rajayoga Tradition",
  "Why Annadanam Is Sacred Service"
];

export const gallery = [
  "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598620617148-c9e8ddee6711?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80"
];

export const adminStats = [
  { label: "Registered Users", value: "12,842", icon: Users, trend: "+18%" },
  { label: "Total Donations", value: "₹42.8L", icon: HandCoins, trend: "+24%" },
  { label: "Temple Visits", value: "86,310", icon: Landmark, trend: "+12%" },
  { label: "Upcoming Festivals", value: "9", icon: CalendarDays, trend: "3 this month" },
  { label: "Total Bookings", value: "3,486", icon: BookOpen, trend: "+31%" },
  { label: "Recent Activities", value: "248", icon: Bell, trend: "Live" }
];

export const adminModules = [
  { title: "Temple Management", icon: Landmark, actions: ["Add Temple", "Edit Info", "Upload Images", "Manage Locations"] },
  { title: "Festival Management", icon: CalendarDays, actions: ["Create Festival", "Publish Alerts", "Manage Registrations", "Upload Banners"] },
  { title: "Spiritual Programs", icon: Music, actions: ["Schedule Events", "Manage Registrations", "Upload Images", "Edit Programs"] },
  { title: "Gallery Management", icon: ImageIcon, actions: ["Upload Media", "Create Albums", "Filter Categories", "Delete Media"] },
  { title: "Donation Management", icon: HandCoins, actions: ["Verify Payments", "Receipts", "Reports", "Payment History"] },
  { title: "Analytics", icon: BarChart3, actions: ["Visitors", "Donations", "Growth", "Popular Pages"] }
];

export const searchIndex = [...temples.map((item) => item.name), ...poojas, ...festivals.map((item) => item.name), "Bhajans", "Discourses", "Stotras", "Razorpay Donations"];
