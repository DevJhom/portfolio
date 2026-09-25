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
        status: 'Currently Online · Bangkok, TH',
        greeting: "Hello, I'm Jhom",
        role: "I'm a {role}",
    },
    about: {
        whoami: "Hi there!👋{br}I'm {name}.",
        from: 'A {role}{br}from Myanmar.',
        based: "I'm based in {city}, Thailand.",
        city: 'Bangkok',
        specializing: 'Specializing in{br}{field}.',
        toBeAdded: 'to be added later',
        experience: '{years} years experience{br}in Web Application Development.',
        passionTitle: 'Coding with Passion',
        passionText: "I'm passionate about coding and problem-solving, approaching each project with a creative mindset, a strong dedication and a commitment to writing clean, maintainable codes.",
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
        internshipDetail: 'I used Wordpress, HTML, CSS, Javascript, MySQL and Google Cloud.',
        omnistarDetail: 'I worked on the infrastructure side, configuring SQL databases and managing deployments.',
        clicknextDetail: 'My current tech stack includes Vue, Typescript, SCSS, C# and Microsoft SQL Server, as well as Git and Vim as development tools.',
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
            error: 'Something went wrong. Please try again or copy my email.',
        },
    },
};

export type MessageSchema = typeof en;

export default en;
