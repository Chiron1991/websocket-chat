export function promptNickname() {
    let nickname = "";
    while (nickname === "") {
        nickname = prompt("Enter your nickname:", "");
    }
    return nickname;
}