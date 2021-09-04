async function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function stopRaid() {
    isRaidOn = false;
}



function startRaid() {
    let characters = `abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`
    isRaidOn = true
    let urls = [];
    let inpt = document.getElementById("hook-url");
    let message = document.getElementById("message").value;
    let username = document.getElementById("username").value;
    let randomGenerated = "";
    let usernameUsernames = [];
    let pfp = document.getElementById("pfp").value;
    let sleep_ = document.getElementById("sleep").value;


    if(sleep_ < 20) {
        return;
    }

    const allLines = inpt.value.split(/\r\n|\n/);
    // Reading line by line
    allLines.forEach((line) => {
        if(line && line.includes("discord.com/api/webhooks")) {
            urls.push(line)
        }
    });
    for(let i=0;i<urls.length;i++) {
        for(let j=0;j<4;j++) {
            randomGenerated += characters[Math.floor(Math.random() * characters.length)]
        }
        usernameUsernames[i] = `${randomGenerated} | ${username}`   
        randomGenerated = "" 
    }

    while(true) {
        if(!isRaidOn) {
            return
        }
        for(let i=0;i<urls.length;i++) {
            if(!isRaidOn) {
                return
            }
            let formatedMsg = message;

            formatedMsg = message.replace(/{i}/gi, i)

            let request = new XMLHttpRequest();

            request.open("POST",urls[i])

            request.setRequestHeader('Content-type', 'application/json');
            
            let params = {
                avatar_url: pfp,
                username: usernameUsernames[i],
                content: formatedMsg
            }
            
            request.send(JSON.stringify(params))

            sleep(sleep_)

            continue

        }
    }
}
