import { atom } from "recoil";

// atom을 사용하여 전역변수 처럼 쓸 수 있다
// key : 고유 이름, dafault : 변수값
export const isDarkAtom = atom({
    key: "isDark",
    default: true,
});

// useRecoilValue(isDarkAtom) => isDarkAtom에 있는 변수를 가져오기
// useSetRecoilState(isDarkAtom) => isDarkAtom에 있는 변수를 변경하기
