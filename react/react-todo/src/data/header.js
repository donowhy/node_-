

import {AiFillBook, AiFillGithub} from "react-icons/ai";

export const headerMenus = [
    {
        title: "HOME",
        src: "/"
    },
    {
        title: "TODAY",
        src: "/to-do/today"
    },
    {
        title: "TODO",
        src: "/to-do"
    },
    {
        title: "POST",
        src: "/post"
    },
    {
        title: "MEMBER",
        src: "/member"
    },
    {
        title: "MYPAGE",
        src: "/member/my-page"
    },
    {
        title: "SINGUP",
        src: "/sign-up"
    },
    {
        title: "LOGIN",
        src: "/login"
    },
    {
        title: "LOGOUT",
        src: "/logout"
    },
];


export const snsLink = [
    {
        title: "github",
        url: "https://github.com/donowhy",
        icon: <AiFillGithub />
    },
    {
        title: "youtube",
        url: "https://velog.io/@k4minseung",
        icon: <AiFillBook />
    }

]