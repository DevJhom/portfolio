// Transcription of MainPage.vue's own template, rendered as the #home backdrop.
// Keep this in sync when the hero markup changes — a backdrop that contradicts the
// hero text rendered on top of it is worse than no backdrop at all.
export type Kind = 'tag' | 'attr' | 'str' | 'cmt' | 'punc';

// A token with no kind is plain text content and inherits the block's base colour.
export type Token = [text: string, kind?: Kind];

export const sourceLines: Token[][] = [
    [['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"my-container"', 'str'], ['>', 'punc']],
    [['    '], ['<', 'punc'], ['NavBar', 'tag'], [' :active-section', 'attr'], ['=', 'punc'], ['"activeSection"', 'str'], ['/>', 'punc']],
    [['    '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"logo animate-on-hover"', 'str'], ['>', 'punc']],
    [['        '], ['<', 'punc'], ['a', 'tag'], [' href', 'attr'], ['=', 'punc'], ['"#home"', 'str'], [' class', 'attr'], ['=', 'punc'], ['"logo-link"', 'str'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['img', 'tag'], [' src', 'attr'], ['=', 'punc'], ['"/letter-j.png"', 'str'], [' alt', 'attr'], ['=', 'punc'], ['"DevJhom Logo"', 'str'], [' class', 'attr'], ['=', 'punc'], ['"logo-img"', 'str'], [' height', 'attr'], ['=', 'punc'], ['"35"', 'str'], [' width', 'attr'], ['=', 'punc'], ['"35"', 'str'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['h4', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"logo-text ms-1"', 'str'], ['>', 'punc'], ['DevJhom'], ['</', 'punc'], ['h4', 'tag'], ['>', 'punc']],
    [['        '], ['</', 'punc'], ['a', 'tag'], ['>', 'punc']],
    [['        '], ['<', 'punc'], ['span', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"logo-dot"', 'str'], ['></', 'punc'], ['span', 'tag'], ['>', 'punc']],
    [['    '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['    '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"my-resume"', 'str'], [' @click', 'attr'], ['=', 'punc'], ['"downloadResume()"', 'str'], ['>', 'punc']],
    [['        '], ['<', 'punc'], ['Download', 'tag'], ['/>', 'punc']],
    [['        '], ['<', 'punc'], ['h4', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"ms-1"', 'str'], ['>', 'punc'], ['Download Resume'], ['</', 'punc'], ['h4', 'tag'], ['>', 'punc']],
    [['    '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['    '], ['<!-- HOME -->', 'cmt']],
    [['    '], ['<', 'punc'], ['div', 'tag'], [' id', 'attr'], ['=', 'punc'], ['"home"', 'str'], ['>', 'punc']],
    [['        '], ['<', 'punc'], ['section', 'tag'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"hero-content"', 'str'], ['>', 'punc']],
    [['                '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"hero-status"', 'str'], ['>', 'punc']],
    [['                    '], ['<', 'punc'], ['span', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"hero-status-dot"', 'str'], ['></', 'punc'], ['span', 'tag'], ['>', 'punc']],
    [['                    '], ['<', 'punc'], ['span', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"hero-status-text"', 'str'], ['>', 'punc'], ['Currently Online · Bangkok, TH'], ['</', 'punc'], ['span', 'tag'], ['>', 'punc']],
    [['                    '], ['<', 'punc'], ['span', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"hero-status-line"', 'str'], ['></', 'punc'], ['span', 'tag'], ['>', 'punc']],
    [['                '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['                '], ['<', 'punc'], ['h1', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"introduction-text"', 'str'], ['>', 'punc']],
    [["                    Hello, I'm Jhom"]],
    [['                '], ['</', 'punc'], ['h1', 'tag'], ['>', 'punc']],
    [['                '], ['<', 'punc'], ['div', 'tag'], [' :class', 'attr'], ['=', 'punc'], ['"{typewriter: isTyping}"', 'str'], [' class', 'attr'], ['=', 'punc'], ['"introduction-text"', 'str'], ['>', 'punc']],
    [['                    '], ['<', 'punc'], ['h2', 'tag'], ['>', 'punc'], ["I'm a "], ['<', 'punc'], ['span', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"text-animation"', 'str'], ['>', 'punc'], ['Software Developer'], ['</', 'punc'], ['span', 'tag'], ['></', 'punc'], ['h2', 'tag'], ['>', 'punc']],
    [['                '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['            '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['Transition', 'tag'], [' name', 'attr'], ['=', 'punc'], ['"fade"', 'str'], ['>', 'punc']],
    [['                '], ['<', 'punc'], ['small', 'tag'], [' v-if', 'attr'], ['=', 'punc'], ['"showScrollToExplore"', 'str'], [' class', 'attr'], ['=', 'punc'], ['"scroll-to-explore animate-on-hover"', 'str'], ['>', 'punc']],
    [['                    '], ['<', 'punc'], ['a', 'tag'], [' href', 'attr'], ['=', 'punc'], ['"#about-me"', 'str'], ['>', 'punc'], ['<', 'punc'], ['DownArrow', 'tag'], ['/>', 'punc'], ['</', 'punc'], ['a', 'tag'], ['>', 'punc']],
    [['                '], ['</', 'punc'], ['small', 'tag'], ['>', 'punc']],
    [['            '], ['</', 'punc'], ['Transition', 'tag'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"cursor-area-1"', 'str'], ['></', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['div', 'tag'], [' class', 'attr'], ['=', 'punc'], ['"cursor-area-2"', 'str'], ['></', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['        '], ['</', 'punc'], ['section', 'tag'], ['>', 'punc']],
    [['    '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
    [['    '], ['<!-- ABOUT ME -->', 'cmt']],
    [['    '], ['<', 'punc'], ['div', 'tag'], [' id', 'attr'], ['=', 'punc'], ['"about-me"', 'str'], ['>', 'punc']],
    [['        '], ['<', 'punc'], ['section', 'tag'], ['>', 'punc']],
    [['            '], ['<', 'punc'], ['AboutMe', 'tag'], [' :active-section', 'attr'], ['=', 'punc'], ['"activeSection"', 'str'], ['/>', 'punc']],
    [['        '], ['</', 'punc'], ['section', 'tag'], ['>', 'punc']],
    [['    '], ['</', 'punc'], ['div', 'tag'], ['>', 'punc']],
];
