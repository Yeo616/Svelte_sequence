import { writable } from 'svelte/store'

// 이메일 입력 페이지
export const stateText = writable('processing');
export const backColor = writable('black');
export const underText = writable('');
export const text = writable('');
export const linkDisplay = writable('none');

console.log("스토어 호출됨: stateText", stateText)
console.log("스토어 호출됨: backColor", backColor)
console.log("스토어 호출됨: underText", underText)
console.log("스토어 호출됨: text", text)
console.log("스토어 호출됨: linkDisplay", linkDisplay)

// 정보 입력 페이지
export const dataState = writable('processing');
export const dataBackColor = writable('black');
export const dataUnderText = writable('');
export const dataText = writable('');
export const dataLinkDisplay = writable('none');

console.log("스토어 호출됨: stateText", dataState)
console.log("스토어 호출됨: backColor", dataBackColor)
console.log("스토어 호출됨: underText", dataUnderText)
console.log("스토어 호출됨: text", dataText)
console.log("스토어 호출됨: linkDisplay", dataLinkDisplay)

// 이메일 저장
export const email = writable('');
