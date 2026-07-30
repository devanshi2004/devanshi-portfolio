/* ==========================================================================
   DEVANSHI BHATT - PORTFOLIO & LIVE RESUME ENGINE
   Spotlight tracking, Scroll Animations, Modal Lightbox, Live CV Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. RADIAL SPOTLIGHT CURSOR FOLLOWER
       ---------------------------------------------------------------------- */
    const spotlight = document.getElementById('spotlight');
    
    if (spotlight) {
        window.addEventListener('mousemove', (e) => {
            spotlight.style.setProperty('--x', `${e.clientX}px`);
            spotlight.style.setProperty('--y', `${e.clientY}px`);
        });
    }

    /* ----------------------------------------------------------------------
       2. MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       3. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION LINK OBSERVER
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    /* ----------------------------------------------------------------------
       4. ANIMATE SKILL PROGRESS BARS ON SCROLL
       ---------------------------------------------------------------------- */
    const progressBars = document.querySelectorAll('.progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => skillObserver.observe(bar));

    /* ----------------------------------------------------------------------
       5. CERTIFICATE LIGHTBOX MODAL
       ---------------------------------------------------------------------- */
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPdfBtn = document.getElementById('modal-pdf-btn');
    const modalClose = document.getElementById('modal-close');
    const viewCertButtons = document.querySelectorAll('.btn-view-cert');

    viewCertButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.getAttribute('data-img');
            const pdfSrc = btn.getAttribute('data-pdf');
            const title = btn.getAttribute('data-title');

            if (modal && modalImg && modalTitle) {
                modalImg.src = imgSrc;
                modalTitle.textContent = title;

                if (modalPdfBtn) {
                    if (pdfSrc) {
                        modalPdfBtn.href = pdfSrc;
                        modalPdfBtn.style.display = 'inline-flex';
                    } else {
                        modalPdfBtn.style.display = 'none';
                    }
                }

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    /* ----------------------------------------------------------------------
       6. STAT COUNTERS ANIMATION
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const hasPlus = el.textContent.includes('+');
                
                let count = 0;
                const duration = 1500;
                const stepTime = 50;
                const steps = duration / stepTime;
                const increment = target / steps;

                if (target === 0) {
                    el.textContent = hasPlus ? "0+" : "0";
                    counterObserver.unobserve(el);
                    return;
                }

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        el.textContent = `${target}${hasPlus ? '+' : ''}`;
                        clearInterval(timer);
                    } else {
                        el.textContent = `${Math.floor(count)}${hasPlus ? '+' : ''}`;
                    }
                }, stepTime);

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    /* ----------------------------------------------------------------------
       7. COMPLETE LIVE RESUME GENERATOR ENGINE (PRINT & DOWNLOAD TXT)
       ---------------------------------------------------------------------- */
    const resumeModal = document.getElementById('resume-modal');
    const resumePaper = document.getElementById('resume-paper');
    const btnOpenResume = document.getElementById('btn-open-resume');
    const btnHeroResumes = document.querySelectorAll('.btn-hero-resume');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const btnPrintResume = document.getElementById('btn-print-resume');
    const btnDownloadTxt = document.getElementById('btn-download-txt-resume');

    function renderLiveResume() {
        if (!resumePaper) return;

        const name = 'Devanshi Bhatt';
        const designations = 'Computer Engineering Graduate | AI/ML Enthusiast | Python & Full-Stack Developer';
        
        const email = 'bhattdevanshi2004@gmail.com';
        const phone = '+91 9428661407';
        const location = 'Rajkot, Gujarat, India';
        const linkedin = 'https://www.linkedin.com/in/devanshi-bhatt-86b47631b/';
        const github = 'https://github.com/devanshi2004';

        const summary = "Computer Engineering graduate with hands-on expertise in Artificial Intelligence, Machine Learning, Python, and Full-Stack Web Development (Node.js, Express.js, MongoDB, REST APIs). Skilled in developing deep learning CNN models using TensorFlow and OpenCV, and building scalable web applications. Passionate about Generative AI, Agentic AI, RAG, and intelligent software engineering.";

        // Education
        const eduHTML = `
            <div class="cv-item">
                <div class="cv-item-title">Bachelor of Engineering in Computer Engineering</div>
                <div class="cv-item-sub">VVP Engineering College, Rajkot | CGPA: 8.83 (Full-Time)</div>
                <div class="cv-text">Computer Engineering specialization with strong foundations in AI, Machine Learning, Data Structures, and Software Development.</div>
            </div>
            <div class="cv-item">
                <div class="cv-item-title">Diploma in Computer Engineering</div>
                <div class="cv-item-sub">A. V. Parekh Technical Institute, Rajkot | CGPA: 8.74 (Full-Time)</div>
                <div class="cv-text">Core programming foundations, computer fundamentals, database management, and networking concepts.</div>
            </div>
        `;

        // Projects
        const projHTML = `
            <div class="cv-item">
                <div class="cv-item-title">Digit Prediction System — AI & Deep Learning</div>
                <div class="cv-text">Developed a deep learning CNN model recognizing handwritten digits using TensorFlow, Keras, and OpenCV. Implemented complete preprocessing, training, evaluation, and image recognition pipeline.</div>
                <div class="cv-item-sub" style="margin-top:2px;">Tech: <strong>Python, TensorFlow, Keras, OpenCV</strong> | Code: <a href="https://github.com/devanshi2004/digit_prediction" target="_blank">github.com/devanshi2004/digit_prediction</a></div>
            </div>
            <div class="cv-item">
                <div class="cv-item-title">Deep Blue Mind — AI for Ocean Conservation</div>
                <div class="cv-text">AI-powered web platform supporting UN SDG 14 for marine conservation awareness via intelligent chatbot and real-time environmental insights.</div>
                <div class="cv-item-sub" style="margin-top:2px;">Tech: <strong>Python, OpenAI, Dialogflow, TensorFlow.js, HTML/CSS/JS, NOAA/UNEP/Kaggle APIs</strong> | Code: <a href="https://github.com/devanshi2004/deep-blue-mind" target="_blank">github.com/devanshi2004/deep-blue-mind</a></div>
            </div>
            <div class="cv-item">
                <div class="cv-item-title">Handcrafted Harmony — Full Stack E-Commerce Platform</div>
                <div class="cv-text">Full-stack web application connecting artisans with customers. Implemented JWT authentication, role-based login, product management, and order processing.</div>
                <div class="cv-item-sub" style="margin-top:2px;">Tech: <strong>HTML, CSS, JS, Node.js, Express.js, MongoDB, JWT, REST APIs</strong> | Code: <a href="https://github.com/devanshi2004/Crafters_corner" target="_blank">github.com/devanshi2004/Crafters_corner</a></div>
            </div>
        `;

        // Skills
        const skillsHTML = `
            <div class="cv-skill-line"><strong>Programming Languages:</strong> Python (95%), Java (85%), JavaScript (85%), HTML (95%), CSS (90%), C (80%), C++ (80%)</div>
            <div class="cv-skill-line"><strong>Artificial Intelligence & ML:</strong> TensorFlow (90%), Machine Learning (85%), OpenCV (85%), NumPy (85%), Pandas (85%), Scikit-Learn (75%), Data Preprocessing (85%)</div>
            <div class="cv-skill-line"><strong>Web Development & APIs:</strong> Node.js (90%), Express.js (90%), MongoDB (90%), REST APIs (90%), Flask (75%)</div>
            <div class="cv-skill-line"><strong>Developer Tools:</strong> VS Code (95%), Git (90%), GitHub (90%), Postman (90%)</div>
            <div class="cv-skill-line"><strong>Professional Competencies:</strong> Problem Solving (95%), Analytical Thinking (95%), Quick Learner (95%), Collaboration (90%), Communication (85%)</div>
        `;

        // All 17 Certifications List
        const certListHTML = `
            <ul style="padding-left: 18px; font-size: 0.84rem; color: #334155;">
                <li>IBM CSRBOX Artificial Intelligence Virtual Internship (IBM CSRBOX)</li>
                <li>Analyze Text with Azure AI Language in Foundry Tools (Microsoft)</li>
                <li>Analyze Text with Azure Language in FoundryTools (Microsoft Azure)</li>
                <li>Describe the Core Architectural Components of Azure (Microsoft Azure)</li>
                <li>Designing Agent Architecture & SDLC Integration (AI Agent Academy)</li>
                <li>Develop a Speech-Capable Generative AI Application (Microsoft Azure)</li>
                <li>Text Analysis Agent with Azure Language MCP Server (Microsoft Azure / MCP)</li>
                <li>Foundations of Agentic AI in GitHub (GitHub)</li>
                <li>Become an AI Agent Architect (AI Agent Academy)</li>
                <li>From Learner to Builder: AI Agent Developer (AI Agent Academy)</li>
                <li>Getting Started with Artificial Intelligence (IBM / CSRBOX)</li>
                <li>Introduction to Artificial Intelligence (IBM / CSRBOX)</li>
                <li>Large Language Model Basics (IBM / CSRBOX)</li>
                <li>Mastering the Art of Prompting (IBM / CSRBOX)</li>
                <li>The Rise of Multi-Agent Systems (AI Agent Academy)</li>
                <li>Tooling, MCP & Agent Execution Environments (Microsoft Azure / MCP)</li>
                <li>Unleashing the Power of AI Agents (AI Agent Academy)</li>
            </ul>
        `;

        // Render Complete Paper
        resumePaper.innerHTML = `
            <div class="cv-header">
                <h1 class="cv-name">${name}</h1>
                <div class="cv-tagline">${designations}</div>
                <div class="cv-contacts">
                    <span><i class="fa-solid fa-envelope"></i> ${email}</span> |
                    <span><i class="fa-solid fa-phone"></i> ${phone}</span> |
                    <span><i class="fa-solid fa-location-dot"></i> ${location}</span> |
                    <span><i class="fa-brands fa-github"></i> github.com/devanshi2004</span> |
                    <span><i class="fa-brands fa-linkedin"></i> linkedin.com/in/devanshi-bhatt-86b47631b</span>
                </div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Professional Summary</div>
                <div class="cv-text">${summary}</div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Education</div>
                ${eduHTML}
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Technical Projects</div>
                ${projHTML}
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Skills & Capabilities</div>
                ${skillsHTML}
            </div>

            <div class="cv-section">
                <div class="cv-section-title">Certifications (17 Verified Credentials)</div>
                ${certListHTML}
            </div>
        `;
    }

    function openResumeModal() {
        renderLiveResume();
        if (resumeModal) {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
        }
    }

    if (btnOpenResume) {
        btnOpenResume.addEventListener('click', openResumeModal);
    }

    btnHeroResumes.forEach(btn => {
        btn.addEventListener('click', openResumeModal);
    });

    if (resumeModalClose && resumeModal) {
        resumeModalClose.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
        });
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                resumeModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (btnPrintResume) {
        btnPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    // Save Plain Text (.txt) Resume File Download
    if (btnDownloadTxt) {
        btnDownloadTxt.addEventListener('click', () => {
            const textContent = `DEVANSHI BHATT
Computer Engineering Graduate | AI/ML Enthusiast | Python & Full-Stack Developer
Email: bhattdevanshi2004@gmail.com | Phone: +91 9428661407 | Location: Rajkot, Gujarat, India
GitHub: https://github.com/devanshi2004 | LinkedIn: https://www.linkedin.com/in/devanshi-bhatt-86b47631b/

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Computer Engineering graduate with hands-on experience in Artificial Intelligence, Machine Learning, Python, and Full-Stack Development. Developed AI applications using TensorFlow, OpenCV, and deep learning alongside scalable web applications with Node.js, Express.js, and MongoDB.

================================================================================
EDUCATION
================================================================================
1. Bachelor of Engineering in Computer Engineering
   VVP Engineering College, Rajkot, Gujarat
   CGPA: 8.83 (Full-Time)
   Highlights: Computer Engineering specialization, AI/ML foundations, project-based learning.

2. Diploma in Computer Engineering
   A. V. Parekh Technical Institute, Rajkot, Gujarat
   CGPA: 8.74 (Full-Time)
   Highlights: Programming foundations, databases, and networking concepts.

================================================================================
TECHNICAL PROJECTS
================================================================================
1. Digit Prediction System
   Description: Deep learning CNN application for handwritten digit recognition.
   Technologies: Python, TensorFlow, Keras, OpenCV
   GitHub: https://github.com/devanshi2004/digit_prediction

2. Deep Blue Mind — AI for Ocean Conservation
   Description: AI-powered web platform supporting UN SDG 14 with marine chatbot & real-time APIs.
   Technologies: Python, OpenAI, Dialogflow, TensorFlow.js, HTML, CSS, JS, NOAA/UNEP APIs
   GitHub: https://github.com/devanshi2004/deep-blue-mind

3. Handcrafted Harmony
   Description: Full-stack artisan e-commerce platform with JWT auth and order management.
   Technologies: HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, JWT, REST APIs
   GitHub: https://github.com/devanshi2004/Crafters_corner

================================================================================
SKILLS & COMPETENCIES
================================================================================
• Programming Languages: Python (95%), Java (85%), JavaScript (85%), HTML (95%), CSS (90%), C (80%), C++ (80%)
• Artificial Intelligence: TensorFlow (90%), Machine Learning (85%), OpenCV (85%), NumPy (85%), Pandas (85%), Scikit-Learn (75%), Data Preprocessing (85%)
• Web Development: Node.js (90%), Express.js (90%), MongoDB (90%), REST APIs (90%), Flask (75%)
• Developer Tools: Git (90%), GitHub (90%), VS Code (95%), Postman (90%)
• Professional Skills: Problem Solving (95%), Analytical Thinking (95%), Communication (85%), Collaboration (90%), Quick Learner (95%)

================================================================================
CERTIFICATIONS (17 COMPLETED)
================================================================================
1. IBM CSRBOX Artificial Intelligence Virtual Internship (IBM CSRBOX)
2. Analyze Text with Azure AI Language in Foundry Tools (Microsoft)
3. Analyze text with Azure Language in FoundryTools (Microsoft Azure)
4. Describe the core architectural components of Azure (Microsoft Azure)
5. Designing Agent Architecture and SDLC Integration (AI Agent Academy)
6. Develop a speech-capable generative AI application (Microsoft Azure)
7. Develop a text analysis agent with the Azure Language MCP server (Microsoft Azure / MCP)
8. Foundations of Agentic AI in GitHub (GitHub)
9. From Learner to Builder Become an AI Agent Architect (AI Agent Academy)
10. From Learner to Builder Become an AI Agent (AI Agent Academy)
11. Getting Started with Artificial Intelligence (IBM / CSRBOX)
12. Introduction to Artificial Intelligence (IBM / CSRBOX)
13. Large Language Model Basics (IBM / CSRBOX)
14. Mastering the Art of Prompting (IBM / CSRBOX)
15. The rise of multiagent systems (AI Agent Academy)
16. Tooling, MCP, and Agent Execution Environments (Microsoft Azure / MCP)
17. Unleashing the Power of AI Agents (AI Agent Academy)
`;

            const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Devanshi_Bhatt_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    /* ----------------------------------------------------------------------
       8. CONTACT FORM ENGINE (REAL EMAIL & WHATSAPP DELIVERY)
       ---------------------------------------------------------------------- */
    const btnSendEmail = document.getElementById('btn-send-email');
    const btnSendWhatsApp = document.getElementById('btn-send-whatsapp');
    const statusBanner = document.getElementById('contact-status-banner');

    function showStatus(message, type) {
        if (!statusBanner) return;
        statusBanner.className = `status-banner ${type}`;
        statusBanner.innerHTML = message;
        statusBanner.style.display = 'flex';
        setTimeout(() => {
            statusBanner.style.display = 'none';
        }, 7000);
    }

    // Direct Email Submission via FormSubmit API + Mailto Fallback
    if (btnSendEmail) {
        btnSendEmail.addEventListener('click', async () => {
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || 'New Contact Request';
            const message = document.getElementById('message')?.value.trim() || '';

            if (!name || !email || !message) {
                showStatus('<i class="fa-solid fa-circle-exclamation"></i> Please fill in your Name, Email, and Message before sending.', 'error');
                return;
            }

            btnSendEmail.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Email...';
            btnSendEmail.disabled = true;

            try {
                // Post form data to FormSubmit.co AJAX endpoint to bhattdevanshi2004@gmail.com
                const response = await fetch('https://formsubmit.co/ajax/bhattdevanshi2004@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `[Portfolio Contact] ${subject}`,
                        message: message
                    })
                });

                if (response.ok) {
                    showStatus('<i class="fa-solid fa-circle-check"></i> Success! Your message has been sent to bhattdevanshi2004@gmail.com', 'success');
                    document.getElementById('contact-form')?.reset();
                } else {
                    throw new Error('Server returned non-200 response');
                }
            } catch (err) {
                // Fallback to direct client mailto
                showStatus('<i class="fa-solid fa-envelope"></i> Opening your email client to complete sending...', 'info');
                const mailtoUrl = `mailto:bhattdevanshi2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.open(mailtoUrl, '_blank');
            } finally {
                btnSendEmail.innerHTML = '<i class="fa-solid fa-envelope"></i> Send via Email';
                btnSendEmail.disabled = false;
            }
        });
    }

    // Direct WhatsApp / Phone Message Handler to +91 9428661407
    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', () => {
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';

            if (!name || !email || !message) {
                showStatus('<i class="fa-solid fa-circle-exclamation"></i> Please fill in your Name, Email, and Message before sending via WhatsApp.', 'error');
                return;
            }

            const waText = `Hi Devanshi,\n\n` +
                           `*Name:* ${name}\n` +
                           `*Email:* ${email}\n` +
                           `*Subject:* ${subject || 'Portfolio Inquiry'}\n\n` +
                           `*Message:*\n${message}`;

            const waUrl = `https://api.whatsapp.com/send?phone=919428661407&text=${encodeURIComponent(waText)}`;
            
            showStatus('<i class="fa-brands fa-whatsapp"></i> Opening WhatsApp to send message to +91 9428661407...', 'info');
            window.open(waUrl, '_blank');
        });
    }
});
