// blogData.js - Shared blog data
// Place this file in: src/pages/public/Blogs/blogData.js

export const defaultBlogPosts = [
  {
    id: 1,
    slug: "schools-need-passionate-educators",
    image: "image-news03.jpg",
    title: "Schools Today Need More Than Degrees — They Need Passionate Educators",
    subtitle: "School Development, Hiring Trends",
    excerpt: "Schools no longer look for teachers who simply hold degrees — they look for educators who bring passion, purpose, and presence into every classroom.",
    date: "November 20, 2024",
    comments: 14,
    authorImage: "avatar-03.jpg",
    authorName: "EdProfio Team",
    tags: ["education", "hiring", "teachers"],
    content: `<p>The education world is changing faster than ever. Schools no longer look for teachers who simply hold degrees — they look for educators who bring passion, purpose, and presence into every classroom.</p><p>Because what truly inspires learning is not a certificate…It's a teacher who cares, connects, and ignites curiosity.</p><h3>❤️ Passion Is the Power Behind Great Teaching</h3><p>Passionate educators transform classrooms into communities of learning. They don't just deliver lessons — they create experiences.</p><p>Such teachers naturally:</p><ul><li>Build warm, trusting relationships with students</li><li>Make learning exciting and memorable</li><li>Teach life skills that go beyond textbooks</li><li>Encourage creativity, confidence, and critical thinking</li></ul><p>Their passion becomes the spark that fuels student growth — academically and personally.</p><h3>🧠 The New-Age Educator: Skills That Matter Most</h3><p>Modern teaching requires a blend of heart and ability. Here are the skills that define today's most effective teachers:</p><table class="table table-bordered my-4"><thead><tr><th>Skill</th><th>Why It Matters</th></tr></thead><tbody><tr><td>Emotional Intelligence</td><td>Helps understand student behaviour, emotions & challenges</td></tr><tr><td>Collaboration</td><td>Strengthens teamwork with staff, parents & stakeholders</td></tr><tr><td>Tech Integration</td><td>Enables interactive, efficient & future-ready teaching</td></tr><tr><td>Differentiation</td><td>Ensures every student learns at the right pace & method</td></tr></tbody></table><blockquote><q>"Passion is contagious. A passionate staff elevates the entire school environment — from classrooms to corridors."</q></blockquote><h3>🔗 EdProfio Helps Schools Find Talent That Truly Makes a Difference</h3><p>At EdProfio, we believe every child deserves a teacher who teaches with heart. That's why we go beyond basic qualifications.</p><p>We assess educators on:</p><ul><li>✔ Teaching mindset</li><li>✔ Passion and motivation</li><li>✔ Adaptability to modern classrooms</li><li>✔ Cultural and value alignment</li></ul><p><strong>Great schools grow with great teachers. And EdProfio is here to build that bridge.</strong></p>`
  },
  {
    id: 2,
    slug: "build-strong-teacher-profile",
    image: "image-news11.jpg",
    title: "How Teachers Can Build a Strong, Impactful Professional Profile Online",
    subtitle: "Education Careers, Teacher Growth",
    excerpt: "A strong professional profile is more than a digital resume — it is your personal brand as an educator.",
    date: "November 18, 2024",
    comments: 8,
    authorImage: "avatar-03.jpg",
    authorName: "EdProfio Team",
    tags: ["careers", "professional development", "teachers"],
    content: `<p>In today's competitive education landscape, a strong professional profile is more than a digital resume — it is your personal brand as an educator.</p><h3>✨ Why Your Professional Profile Matters More Than Ever</h3><p>Your profile is the first checkpoint for school recruiters. It reflects:</p><ul><li>How effectively you create student impact</li><li>How confident and organized you are as an educator</li><li>How well you adapt to modern teaching environments</li><li>How committed you are to continuous learning</li></ul><h3>📝 What Every Teacher Should Include in Their Profile</h3><h4>✔ 1. A Purposeful Bio</h4><p>Craft a warm, concise introduction that captures your teaching philosophy, expertise, and what makes you unique.</p><h4>✔ 2. Skills That Schools Value</h4><p>Highlight subject expertise, pedagogical approaches, teaching tools, classroom management strengths, and student-centric methodologies.</p><blockquote><q>"Use powerful action words such as: implemented, facilitated, enhanced, designed, evaluated, improved, introduced."</q></blockquote><h3>🌐 Highlight Your EdTech Strengths</h3><ul><li>Learning Management Systems (LMS)</li><li>Smart classroom tools</li><li>Digital worksheets and assessments</li><li>Virtual teaching platforms</li></ul><p><strong>Don't just apply for jobs. Build a brand. Build credibility. Build your future.</strong></p>`
  },
  {
    id: 3,
    slug: "edprofio-platform-for-educators",
    image: "image-news04.jpg",
    title: "EdProfio: A Growing Platform for Today's Educators",
    subtitle: "Platform Features, Career Growth",
    excerpt: "Join a community connected to 26 educational partners and explore 12+ career opportunities tailored to diverse skill sets.",
    date: "November 15, 2024",
    comments: 12,
    authorImage: "avatar-03.jpg",
    authorName: "EdProfio Team",
    tags: ["platform", "careers", "opportunities"],
    content: `<p>Join a community connected to 26 educational partners and explore 12+ career opportunities tailored to diverse skill sets.</p><h3>Your Future — Just a Tap Away</h3><p>EdProfio offers powerful features to accelerate your teaching career:</p><ul><li>✔ <strong>Smart Job Matching</strong> - AI-powered recommendations</li><li>✔ <strong>Instant Notifications</strong> - Never miss an opportunity</li><li>✔ <strong>Easy Apply</strong> - One-click applications</li><li>✔ <strong>Verified Employers & Candidates</strong> - Trust at every step</li></ul><h3>Browse by Jobs Category</h3><ul><li>Primary Education Teachers</li><li>Secondary Education Specialists</li><li>Special Education Experts</li><li>Educational Leadership</li><li>EdTech Specialists</li></ul><p><strong>Join EdProfio today and transform the way you grow your teaching career!</strong></p>`
  }
];

// Get all blogs (default + custom from localStorage)
export const getAllBlogs = () => {
  try {
    const customBlogs = JSON.parse(localStorage.getItem('customBlogs') || '[]');
    return [...defaultBlogPosts, ...customBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading blogs:', error);
    return defaultBlogPosts;
  }
};

// Get blog by slug
export const getBlogBySlug = (slug) => {
  const allBlogs = getAllBlogs();
  const blog = allBlogs.find(blog => blog.slug === slug);
  console.log('getBlogBySlug - Looking for:', slug);
  console.log('getBlogBySlug - Found:', blog);
  return blog;
};

// Save new blog to localStorage
export const saveBlog = (blogData) => {
  try {
    const customBlogs = JSON.parse(localStorage.getItem('customBlogs') || '[]');
    customBlogs.push(blogData);
    localStorage.setItem('customBlogs', JSON.stringify(customBlogs));
    return true;
  } catch (error) {
    console.error('Error saving blog:', error);
    return false;
  }
};