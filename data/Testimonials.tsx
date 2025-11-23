export interface Testimonial {
  id: number,
  title: string;
  content: string;
  image: string;
  client: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    title: "Masters' Union Partnership",
    content: "Team K have been an integral part of our YouTube podcast journey at Masters' Union. The edits are consistently sharp, clean, and aligned with the tone we aim for — it's been a solid long-term partnership.",
    client: "Veda Hrudya Nadendla\nHead of Brand, Masters' Union",
    image: '/static/creators/veda.jpg'
  },
  {
    id: 2,
    title: "Dr. Cuterus Support",
    content: "Krishn has been incredible with editing support — our reels and videos look sharper, feel better, and always land on time. Super reliable and always on point with the final cut.",
    client: "Dr. Tanaya\nDr. Cuterus",
    image: "/static/creators/Dr_Cuterus.png"
  },
  {
    id: 3,
    title: "Think School Collaboration",
    content: "They have been a huge support on the editing front. Clean, on-brand, and always on time — they made our ad creatives sharper and our process smoother.",
    client: "Parsh Kothari\nCo-founder, Think School",
    image: "/static/creators/parsh.jpg"
  },
  {
    id: 4,
    title: "Rigi Scale Success",
    content: "The Team helped us scale video production like never before — over 300 videos a month, without compromising on quality. Super dependable, super efficient.",
    client: "Kaashvi Saxena\nFounders Office, Rigi",
    image: "/static/creators/kaashvi.jpg"
  },
  {
    id: 5,
    title: "PocketFM AI Integration",
    content: "Team K helped us speed up our Gen AI video process massively. Krishn and the team brought in the right tools, the right mindset, and moved fast — exactly what we needed.",
    client: "Saket Khandelwal\nGrowth Manager, PocketFM",
    image: "/static/creators/saket.jpg"
  },
  {
    id: 6,
    title: "One Percent Club Transformation",
    content: "Working with Team K has been effortless and effective. They completely transformed how we repurpose podcast content — making it sharper, more engaging, and truly platform-first. Grateful for the support and consistency.",
    client: "Sharan Hegde\nFounder, One Percent Club",
    image: "/static/creators/Sharan_Hedge.png"
  },
  {
    id: 7,
    title: "Agency Tikao Innovation",
    content: "Team K has been our go-to for exploring the edge of AI in content. From animation to Gen AI tools — Krishn and his team helped us move fast, test fearlessly, and stay ahead of the curve. Super collaborative and always in build mode.",
    client: "Vivek Bhatia\nAgency Tikao",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 8,
    title: "Trifid Media Growth",
    content: "Built both pages with Team K from the ground up. No ads, no hacks — just real content and real growth. Krishn and the team understood the vision and executed like they were building it for themselves.",
    client: "Mahdi Shafiei\nCo-founder, Trifid Media",
    image: "/static/creators/Mahdi_Shafei.png"
  }
]; 