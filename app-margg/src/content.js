// All copy for the page lives here so it is easy to replace.
import home from "../assets/screens/home.png"
import roadmap from "../assets/screens/roadmap.png"
import interview from "../assets/screens/interview.png"
import mentor from "../assets/screens/mentor.png"
import quiz from "../assets/screens/quiz.png"
import robot from "../assets/screens/robot.png"
import scroll from "../assets/icons/scroll.svg"
import messageProgramming from "../assets/icons/message-programming.svg"
import penTool from "../assets/icons/pen-tool.svg"
import driver from "../assets/icons/driver.svg"
import cloud from "../assets/icons/cloud.svg"
import chart from "../assets/icons/chart.svg"
import lock from "../assets/icons/lock.svg"

export const screens = { home, roadmap, interview, mentor, quiz, robot }

export const brand = { name: "Margg", tagline: "Curated routes for curious minds." }

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Our Products", href: "#product" },
  { label: "Contact Us", href: "#contact" },
]

export const hero = {
  title: "Unleash your full potential",
  text: "Your path to mastery is driven by discipline, top-notch lectures, personalised mentorship, and a community that pushes you forward.",
  // The first icon is the one that starts highlighted; the highlight then cycles through the list
  tiles: [
    { label: "Frontend Developer", icon: scroll },
    { label: "Mobile Developer", icon: messageProgramming },
    { label: "UI/UX Designer", icon: penTool },
    { label: "Backend Developer", icon: driver },
    { label: "Cloud Engineer", icon: cloud },
    { label: "Data Analyst", icon: chart },
    { label: "Cyber Security", icon: lock },
    { label: "Data Analyst", icon: chart },
    { label: "DevOps Engineer", icon: driver },
    { label: "Security Analyst", icon: lock },
    { label: "Cloud Architect", icon: cloud },
    { label: "Machine Learning", icon: chart },
  ],
}

export const stats = [
  { value: 43, suffix: "+", label: "University Partners" },
  { value: 12, suffix: "K+", label: "Students Enrolled" },
  { value: 35, suffix: "", label: "Outstanding Mentors" },
  { value: 7.5, suffix: "K", label: "Student Placements" },
]

export const intro = {
  title: ["Supercharge", "Your Learning Potential"],
  text: "Step out of the ordinary and into a place where roadmaps are designed for you, and interview prep is just a click away",
}

export const why = "Why Margg is a smarter choice ?"

export const features = [
  { key: "roadmap", title: "Roadmap Based Learning", text: "Choose your career, and we’ll map out your road to victory", screen: roadmap },
  { key: "interview", title: "Interview Material", text: "Boost your interview game with insider expert-led notes, quizzes, and mock interviews that bring results", screen: interview },
  { key: "mentor", title: "One-on-One Mentorship", text: "Unlock expert mentorship with personalised coaching and live doubt clearing on video calls!", screen: mentor },
]

export const community = [
  { name: "Maya", text: "Dropping helpful resources" },
  { name: "Aryan", text: "Ask me anything" },
  { name: "Divya", text: "Sharing career tips" },
  { name: "Aditi", text: "Open to collaborate" },
  { name: "Neha", text: "Sharing job leads" },
]

export const testimonials = [
  { name: "Ananya Rao", role: "Frontend Intern", text: "This learning app is amazing, especially the notes feature! Having all my course highlights in one place makes reviewing a breeze." },
  { name: "Rohan Kapoor", role: "Final-year Student", text: "This learning app is out of this world. Keep the courses aside, I take up a course based on my career choice!!" },
  { name: "Isha Verma", role: "Product Designer", text: "OH MY GOD!! This app!!! I can’t praise enough!" },
  { name: "Kabir Nair", role: "Data Analyst", text: "Margg is so good. Learning was never this fun and addicting!!" },
  { name: "Meera Iyer", role: "UX Researcher", text: "The app looks soooo cool!! Just like me!" },
  { name: "Dr. Sameer Joshi", role: "Research Scholar", text: "Wish something like this was there when I was preparing for my doctorate degree. Books weren’t this fun." },
  { name: "Tara Menon", role: "Software Engineer", text: "This app provides me with notes, interview prep material and one-on-one mentorship!! What can be better than that??" },
  { name: "Vikram Shah", role: "Mentee", text: "The mentors are very friendly and helpful!! They helped in landing a job too." },
  { name: "Priya Desai", role: "Career Switcher", text: "This app is even cooler than my workplace. Do you need any other validation to use it??" },
]
export const marquee = "This is what they say about us!!"

export const download = {
  title: "Download and dive in",
  text: "First step towards your dream career",
  button: "Download App",
  href: "#",
}

export const footerPitch = "Unlock the Road to Successful Career"

export const contactIntro = {
  title: "Your feedback fuels our growth.",
  text: "Whether you're a student with a question, an educator with a suggestion, or a partner looking to collaborate — we're always eager to hear from you.",
}

export const roles = [
  {
    key: "learners", title: "Learners", icon: "cap",
    text: "Have questions about your course, progress, or certification? Reach out and we’ll get you the support you need.",
    fields: [
      { name: "name", label: "Full Name", placeholder: "Full name" },
      { name: "phone", label: "Phone Number", placeholder: "Phone number", type: "tel" },
      { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
      { name: "college", label: "College Name", options: ["University of Delhi", "Anna University", "VIT", "Other"] },
      { name: "branch", label: "Branch", options: ["B.Tech", "B.Sc", "BCA", "MCA", "Other"] },
      { name: "year", label: "Year of Passing", options: ["2025", "2026", "2027", "2028"] },
    ],
    newsletter: "Stay in the Loop! Subscribe to our newsletter and be the first to know about exciting features and exclusive collaborations.",
  },
  {
    key: "instructors", title: "Instructors", icon: "user",
    text: "Interested in joining our platform or facing technical issues while managing your content? We’re just a message away",
    fields: [
      { name: "name", label: "Full Name", placeholder: "Full name" },
      { name: "phone", label: "Phone Number", placeholder: "Phone number", type: "tel" },
      { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
      { name: "expertise", label: "Area of Expertise", options: ["Web Development", "Data Science", "Design", "Cloud & DevOps", "Other"] },
      { name: "experience", label: "Years of Experience", options: ["1–3", "4–6", "7–10", "10+"] },
      { name: "profile", label: "Profile Link", placeholder: "linkedin.com/in/you" },
    ],
    newsletter: "Keep me posted about instructor programmes and platform updates.",
  },
  {
    key: "partners", title: "Partners", icon: "briefcase",
    text: "Let’s explore how we can grow together. We welcome institutions, companies, and collaborators to connect with our team.",
    fields: [
      { name: "name", label: "Contact Person", placeholder: "Full name" },
      { name: "phone", label: "Phone Number", placeholder: "Phone number", type: "tel" },
      { name: "email", label: "Work Email", placeholder: "you@company.com", type: "email" },
      { name: "org", label: "Organisation", placeholder: "Organisation name" },
      { name: "type", label: "Partner Type", options: ["University", "Company", "Community", "Other"] },
      { name: "size", label: "Team Size", options: ["1–10", "11–50", "51–200", "200+"] },
    ],
    newsletter: "Send me partnership news and opportunities.",
  },
]

export const footer = {
  address: "Bengaluru | Hyderabad",
  phones: "+91 90000 00000  |  +91 90000 00001",
  email: "hello@margg.app",
  copyright: "© 2025 Margg Technologies. All Rights Reserved.",
  links: [
    { label: "Privacy Policies", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
  built: "Built in India with ♥ & code",
}
