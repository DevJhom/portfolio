import type { MessageSchema } from './en';

const th: MessageSchema = {
    nav: {
        home: 'หน้าแรก',
        aboutMe: 'เกี่ยวกับ',
        techStack: 'เทคโนโลยี',
        projects: 'โปรเจกต์',
        contact: 'ติดต่อ',
    },
    header: {
        resume: 'เรซูเม่',
        language: 'ภาษา',
    },
    hero: {
        status: 'ออนไลน์ · กรุงเทพฯ, ประเทศไทย',
        greeting: 'สวัสดีครับ ผมชื่อ Jhom',
        role: 'ผมเป็น {role}',
    },
    about: {
        whoami: 'สวัสดีครับ!👋{br}ผม {name}',
        from: 'ผมเป็น {role}{br}จากประเทศเมียนมา',
        based: 'ปัจจุบันผมอาศัยอยู่ที่ {city} ประเทศไทย',
        city: 'กรุงเทพฯ',
        specializing: 'เชี่ยวชาญด้าน{br}{field}',
        toBeAdded: 'จะเพิ่มเติมภายหลัง',
        experience: '{years} ปี กับประสบการณ์ ในการพัฒนาเว็บแอปพลิเคชัน',
        passionTitle: 'สร้างและพัฒนาด้วย Passion',
        passionText: 'ผมมีความหลงใหลในการเขียนโค้ดและการแก้ปัญหา โดยเข้าหาทุกโปรเจกต์ด้วยความคิดสร้างสรรค์ ความทุ่มเท และความใส่ใจในการเขียนโค้ดที่สะอาดและดูแลรักษาง่าย',
        swipe: 'ปัด >>>',
    },
    keepCalm: {
        online: 'ออนไลน์',
        story: [
            'ผมเป็นนักพัฒนาที่หลงใหลในการผสมผสานความคิดสร้างสรรค์เข้ากับเทคโนโลยี เพื่อสร้างสรรค์โซลูชันใหม่ ๆ',
            'ไม่ว่าจะเป็นการเขียนโค้ดที่สะอาดและมีประสิทธิภาพ หรือการรับมือกับปัญหาที่ซับซ้อน ผมสนุกกับการเปลี่ยนไอเดียให้กลายเป็นประสบการณ์ดิจิทัลที่สร้างผลลัพธ์ได้จริง',
            'ด้วยพื้นฐานที่แข็งแกร่งด้าน Full-stack development ผมมุ่งมั่นส่งมอบงานที่ทั้งใช้งานได้ดีและน่าสนใจ',
        ],
    },
    techStack: {
        title: 'ประสบการณ์การทำงาน',
        internship: '(ฝึกงาน)',
        present: 'ปัจจุบัน',
        internshipDetail: 'ผมเริ่มต้นด้วย Figma, HTML, CSS, Javascript, React และ service บางส่วนจาก Google Cloud',
        omnistarDetail: 'ผมทำงานด้าน infrastructure เป็นหลัก โดยใช้งาน database และเครื่องมือ administrative หลายตัว',
        clicknextDetail: 'Tech stack ปัจจุบันของผมคือ Vue, Typescript, Vite, C# และ database กับ cache เช่น MongoDB, SQL Server, Redis และปัจจุบันผมมีการเริ่มนำเครื่องมือช่วยพัฒนาเช่น Vim และ AI มาประยุกต์ใช้กับการทำงาน',
        currentlyUsing: 'เทคโนโลยีที่ผมใช้อยู่ในปัจจุบัน',
        usedAndFamiliar: 'เทคโนโลยีที่ผมเคยใช้และคุ้นเคย',
        familiar: 'เทคโนโลยีที่ผมคุ้นเคย',
    },
    projects: {
        title: 'โปรเจกต์ส่วนตัว',
        subtitle: 'โปรเจกต์ส่วนตัวของผมบางส่วนที่ผมชื่นชอบ',
        tools: 'เครื่องมือ',
        guitar: 'กีตาร์',
        fretwizard: 'FretWizard เป็นเครื่องมือ interactive สำหรับดู คอร์ด สเกล และ pattern ต่างๆ บนกีตาร์',
        github: 'แวะไปดูโปรเจกต์อื่นๆ ได้ที่ GitHub',
    },
    contact: {
        title: 'ติดต่อผม',
        intro: 'สามารถติดต่อผมได้ทางอีเมล หรือส่งข้อความผ่านแบบฟอร์มได้เลย',
        copy: 'คัดลอก',
        copied: 'คัดลอกแล้ว!',
        form: {
            title: 'ส่งข้อความถึงผม',
            firstName: 'ชื่อ',
            lastName: 'นามสกุล',
            email: 'อีเมลของคุณ',
            message: 'ข้อความ',
            send: 'ส่ง',
            sending: 'กำลังส่ง...',
            sent: 'ส่งแล้ว!',
            tryAgain: 'ลองอีกครั้ง',
            thanks: 'ขอบคุณครับ! ผมจะติดต่อกลับโดยเร็วที่สุด',
            error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        },
    },
};

export default th;
