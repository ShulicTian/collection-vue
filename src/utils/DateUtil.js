export const formateTime = function(time) {
    let date = new Date(time);
    let h = date.getHours();
    let min = date.getMinutes();
    return (h < 10 ? '0' + h : h) + ':' + (min < 10 ? '0' + min : min);
};