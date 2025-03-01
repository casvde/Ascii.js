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

const catAssci_1 = document.querySelectorAll('.cat-friend');



const prelines = document.querySelectorAll('.lined-pre');



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

addAscii(catAssci_1, cat_friends)









