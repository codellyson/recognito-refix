/* eslint-disable @next/next/no-img-element */
import { animated, useTransition } from "@react-spring/web";
import { useRouter } from "next/router";
import { CompleteJobList } from "./completed-job-list";
import { PlaygroundJobList } from "./job-list";
import { OCRGround } from "./ocr-ground";

export const MainPlayground = () => {
  const pages = [
    {
      name: "job-list",
      component: <PlaygroundJobList />,
    },
    {
      name: "ocr-ground",
      component: <OCRGround />,
    },
    {
      name: "completed-job-list",
      component: <CompleteJobList />,
    },
  ];

  const router = useRouter();
  const { screen } = router.query;

  const transition = useTransition(screen, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  return (
    <div className="mx-auto flex w-[700px] max-w-[768px] flex-col items-center  gap-4 rounded-xl ">
      {transition((style, item) => {
        const Page = pages.find((page) => page.name === item)?.component;
        return <animated.div style={style}>{Page && Page}</animated.div>;
      })}
    </div>
  );
};
