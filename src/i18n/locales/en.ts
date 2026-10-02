const en = {
    nav: {
        home: 'Home',
        aboutMe: 'About Me',
        techStack: 'Tech Stack',
        projects: 'Projects',
        contact: 'Contact',
    },
    header: {
        resume: 'Resume',
        language: 'Language',
    },
    hero: {
        status: 'Currently Online · UTC + 7',
        greeting: "Hello, I'm Jhom",
        role: "I'm a {role}",
    },
    about: {
        whoami: "Hi there!👋{br}I'm {name}.",
        from: 'A {role}{br}from {country}.',
        country: 'Myanmar',
        based: "Currently based in {city}.",
        city: 'Bangkok, Thailand',
        specializing: "Specializing in{br}{field}.",
        toBeAdded: 'to be added later',
        experience: '{years} years of experience{br}in Web Application Development.',
        passionTitle: 'Coding with Passion',
        passionText: "I'm passionate about coding and problem-solving. I approach each project with creativity, strong dedication and commitment to writing clean and maintainable code.",
        swipe: 'Swipe >>>',
        flipCard: 'Flip business card',
    },
    keepCalm: {
        online: 'Online',
        // Revealed piece by piece on scroll; each sentence is followed by a blank line.
        story: [
            'I’m a developer who loves turning an idea into something people can actually use.',
            'I spend most of my days planning, writing code, and working through problems until the picture comes together.',
            'Whether it’s Frontend or Backend, my goal stays the same: software that works well and feels good to use.',
        ],
    },
    techStack: {
        title: 'My Work Experience',
        internship: '(Internship)',
        present: 'present',
        internshipDetail: 'I started with Figma, HTML, CSS, Javascript, React and a few services from Google Cloud.',
        omnistarDetail: 'I mainly worked on the infrastructure side, configuring several databases and administrative tools.',
        clicknextDetail: 'My current tech stack includes Vue, Typescript, Vite, C#, and several database and cache storages. I have also been integrating my workflow with artificial intelligence (AI).',
        currentlyUsing: "Technologies I'm currently using.",
        usedAndFamiliar: "Technologies I've used and am familiar with.",
        familiar: "Technologies I'm familiar with.",
        // 3D tech constellation (TechConstellation.vue)
        // The toggle names the view it switches to.
        gridView: 'Grid view',
        view3d: '3D view',
        webglUnavailable: '3D view is not available in this browser.',
    },
    projects: {
        title: 'My Personal Projects',
        subtitle: 'These are some of my favorite personal projects.',
        tools: 'Tools',
        guitar: 'Guitar',
        fretwizard: 'FretWizard is an interactive fretboard for visualizing different scales, chords, and patterns across the guitar neck.',
        github: 'Please visit my GitHub for more projects.',
    },
    contact: {
        title: '"Let\'s Get In Touch!"',
        intro: 'Reach out to me directly via email, or drop me a message using the form.',
        copy: 'Copy',
        copied: 'Copied!',
        form: {
            title: 'Message Me',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Your Email',
            message: 'Message',
            send: 'Send',
            sending: 'Sending...',
            sent: 'Sent!',
            tryAgain: 'Try again',
            thanks: "Thanks! I'll get back to you soon.",
            error: 'Something went wrong. Please try again.',
        },
    },
};

export type MessageSchema = typeof en;

export default en;
