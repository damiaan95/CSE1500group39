function checkValidity(from, to) {
    if(from !== to) {
        return true;
    }
    return false;
}

export function executeMove(from, to) {
    if(checkValidity(from, to)) {
        //to do
    } else {
        return;
    }
}