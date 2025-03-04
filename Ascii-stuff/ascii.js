const border_style_1 =`
╔═╗
║ ║
╚═╝
`;

const border_style_2 =`
┌─┐
│ │
└─┘
`;

const border_style_3 =`
◢─◣
┃  ┃
◥─◤
`;

const border_style_4 =`
⌜⠀⌝
┋ ┋
⌞⠀⌟
`;

const border_style_5 =`
◜⠀◝ 
⠀  ⠀
◟⠀◞ 
`;

const cat_friends = `
     、 へ    <3   ╱|、、
    ૮  -  ՛ )     (\`  -  7
     /  ⁻  ៸|      |、 ⁻〵
乀 (ˍ,  ل  ل      じしˍ ,)ノ

`;


const buttonGroups = [
    { selector: '.ascii-button-1', style: border_style_1 },
    { selector: '.ascii-button-2', style: border_style_2 },
    { selector: '.ascii-button-3', style: border_style_3 },
    { selector: '.ascii-button-4', style: border_style_4 },
    { selector: '.ascii-button-5', style: border_style_5 }
];












insertAscii({
    asciiArt:cat_friends, 
    className:".cat-friends"
});

animateLoadLoop({
    barStyle: `▂▃▅▆▇`,
    classname: ".load-loop-1",
    speed: 100,
    barLoop: true,
    barCount: 5,
    unicodefix: false
});

animateLoadLoop({
    barStyle: `▁▂▃▄▅▆▇█`,
    classname: ".load-loop-2",
    speed: 25,
    barLoop: true,
    barCount: 3,
    unicodefix: true,
    unicodeStep: 5
});

animateLoadLoop({
    barStyle: `▁▂▃▄▅▆▇█`,
    classname: ".load-loop-3",
    speed: 75,
    barLoop: true,
    barCount: 12,
    unicodefix: true
});

animateLoadLoop({
    barStyle: `░░░▒▒▓`,
    classname: ".load-loop-4",
    speed: 50,
    barLoop: true,
    barSliceStart : false, 
    barSliceEnd : true, 
    barCount: 5,
    unicodefix: false
});

animateLoadLoop({
    barStyle: `◜◠◝◞◡◟`,
    classname: ".load-loop-5",
    speed: 100,
    barLoop: false
});

animateLoadLoop({
    barStyle: `◢◣◤◥`,
    classname: ".load-loop-6",
    speed: 50,
    barLoop: false,
    barCount: 3,
    unicodefix: false,
    unicodeStep: 0
});

animateLoadLoop({
    barStyle: `⎺⎻⎼⎽`,
    classname: ".load-loop-7",
    speed : 40, 
    barLoop : true, 
    barSliceStart : false, 
    barSliceEnd : false, 
    barCount : 12, 
    unicodefix : false, 
    unicodeStep : 1
});


const prelines = document.querySelectorAll('.lined-pre');


document.addEventListener("DOMContentLoaded", function () {
    const titleElements = document.querySelectorAll(".wave");

    titleElements.forEach(title => {
        title.addEventListener("click", (event) => {
            const preElements = title.querySelectorAll("pre");
            const clickedPre = event.target.closest('pre'); 

            const clickedIndex = Array.from(preElements).indexOf(clickedPre);

            preElements.forEach((pre, index) => {
                const delay = Math.abs(index - clickedIndex) * 50; 

                setTimeout(() => {
                    pre.style.transform = "translateX(-9px)";
                    pre.style.transition = "transform 0.2s cubic-bezier(0.420, -0.050, 0.350, 1.650)";

                    setTimeout(() => {
                        pre.style.transform = "translateX(5px)";
                    }, 50);

                    setTimeout(() => {
                        pre.style.transform = "translateX(0)";
                    }, 100);

                }, delay);
            });
        });
    });
});

buttonGroups.forEach(({ selector, style }) => {
    applyAsciiBoxes(document.querySelectorAll(selector), style);
});

prelines.forEach(element => {
    const content = element.textContent;
    const lines = content.split('\n');
    const wrappedLines = lines.map(line => `<pre>${line}</pre>`).join('');
    element.innerHTML = wrappedLines;
});




function trimAsciiBox(asciiBox){
    return asciiBox.trim().split(/\s+/).join('').split('').map(num => num.trim());
}

function generateAsciiBox(text, borderStyle) {
    const asciiBorderParts = trimAsciiBox(borderStyle);

    if (asciiBorderParts.length !== 8) {
        console.error("Border style must have exactly 8 parts.");
        return text;
    }

    const [TL, TM, TR, ML, MR, BL, BM, BR] = asciiBorderParts;
    
    const TM2 = TM.repeat(text.length + 2);
    const BM2 = BM.repeat(text.length + 2);

    const top =     `${TL}${TM2}${TR}`;
    const middle =  `${ML} ${text} ${MR}`;
    const bottom =  `${BL}${BM2}${BR}`;

    return `${top}\n${middle}\n${bottom}`;
}

function applyAsciiBoxes(buttons, style) {
    buttons.forEach(button => {
        let buttonText = button.textContent.trim();
        button.classList.add("ascii-button");
        button.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word;">${generateAsciiBox(buttonText, style)}</pre>`;

    });
}

function addAscii(classes, asciiArt) {
    classes.forEach(element => {
    const pre = document.createElement('pre');

    pre.textContent = asciiArt;
    element.appendChild(pre);
});
}

function insertAscii({
    asciiArt, 
    className
    }) {
    const elements = document.querySelectorAll(className);
    elements.forEach(element => {
        element.style.whiteSpace = 'pre';
        element.textContent = asciiArt;
    });

}

function animateLoadLoop({
    barStyle, 
    classname, 
    speed = 100, 
    barLoop = false, 
    barSliceStart = false, 
    barSliceEnd = false, 
    barCount = 1, 
    unicodefix = false, 
    unicodeStep = 1

    }){


    if (barLoop) {
        barStyle = barStyle + [...barStyle].reverse().join("");
    }
    
    if (barSliceEnd) {
        const middleIndex = Math.floor(barStyle.length / 2);
        barStyle = barStyle.slice(0, middleIndex) + barStyle.slice(middleIndex + 1);
    }

    if (barSliceStart) {
        barStyle = barStyle.slice(0, -1);
    }

    const barArray = barStyle.split('');
    let currentIndex = 0;
    
    function updateBars() {
        document.querySelectorAll(classname).forEach(container => {
            container.classList.add('ascii_load_loop');

            if (unicodefix) {
                container.classList.add('unicode-fix');
            }

            let displayBars = '';
            for (let i = 0; i < barCount; i++) {
                const barIndex = (currentIndex + i * unicodeStep) % barArray.length;
                displayBars += barArray[barIndex] + ' ';
            }
            container.textContent = displayBars.trim();
        });
        
        currentIndex = (currentIndex + 1) % barArray.length;
    }
    
    setInterval(updateBars, speed);
}

