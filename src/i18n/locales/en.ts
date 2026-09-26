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
        based: "I'm currently based in {city}.",
        city: 'Bangkok, Thailand',
        specializing: "I'm specializing in{br}{field}.",
        toBeAdded: 'to be added later',
        experience: '{years} years experience{br}in Web Application Development.',
        passionTitle: 'Coding with Passion',
        passionText: "I'm passionate about coding and problem-solving. I approach each project with creativity, strong dedication and commitment to writing clean and maintainable codes.",
        swipe: 'Swipe >>>',
    },
    keepCalm: {
        online: 'Online',
        // Revealed piece by piece on scroll; each sentence is followed by a blank line.
        story: [
            'I am a passionate developer who thrives on blending creativity with technology to craft innovative solutions.',
            'Whether it’s writing clean, efficient code or tackling complex problems, I enjoy transforming ideas into impactful digital experiences.',
            'With a strong foundation in full-stack development, I aim to deliver work that is both functional and engaging.',
        ],
    },
    techStack: {
        title: 'My Work Experience',
        internship: '(Internship)',
        present: 'present',
        internshipDetail: 'I started with Figma, HTML, CSS, Javascript, React and a few services from Google Cloud.',
        omnistarDetail: 'I mainly worked on the infrastructure side, configuring several databases and administrative tools.',
        clicknextDetail: 'My current tech stack includes Vue, Typescript, Vite, C#, and several database and cache storages. I have also been integrating my workflow with utility tools such as Vim and artificial intelligence (AI).',
        currentlyUsing: "Technologies I'm currently using.",
        usedAndFamiliar: "Technologies I've used and familiar with.",
        familiar: "Technologies I'm familiar with.",
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
