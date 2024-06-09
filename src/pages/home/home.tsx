import NavBar from "@/components/navbar/navbar";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
    >
      <path
        fill="black"
        d="M16 2A11.013 11.013 0 0 0 5 13a10.9 10.9 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.9 10.9 0 0 0 27 13A11.013 11.013 0 0 0 16 2m0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4"
      ></path>
      <circle cx={16} cy={13} r={4} fill="none"></circle>
    </svg>
  );
}

// 课程详情
function CourseItem({
  courseCode,
  description,
  startTime,
  endTime,
  type,
  location,
}: {
  courseCode: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
}) {
  return (
    <Card className="w-full h-fit border-none bg-card shadow-none my-4 p-1">
      <CardContent className="flex justify-between p-0 mx-4">
        <div className="flex-1 text-left self-center min-w-40 ">
          <p className="font-bold leading-tight">{courseCode}</p>
          <p className="leading-tight text-sm">{description}</p>
        </div>
        <div className="flex-2 flex items-center">
          <Separator orientation="vertical" className="mx-2 bg-black h-3/4" />
          <div className="text-left mr-4">
            <p className="leading-tight text-sm">{type}</p>
            <p className="leading-tight text-sm">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="flex h-full items-center w-20">
            <LocationIcon />
            <p className="text-sm">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const directory_contents = [
  {
    title: "app",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 48 48"
      >
        <g fill="none" stroke="#7d2882" strokeWidth={4}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 32h10v9H19z"
          ></path>
          <rect width={38} height={24} x={5} y={8} rx={2}></rect>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 27h4M14 41h20"
          ></path>
        </g>
      </svg>
    ),
  },
  {
    title: "food",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 20 20"
      >
        <path
          fill="#7d2882"
          d="M7 4.5c-.3 0-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v3.3c0 .9.7 1.6 1.5 1.7v7c0 .6.4 1 1 1s1-.4 1-1v-7c.8-.1 1.5-.8 1.5-1.7V5c0-.2-.2-.5-.5-.5M9 5v6h1v6c0 .6.4 1 1 1s1-.4 1-1V2c-1.7 0-3 1.3-3 3m7-1c-1.4 0-2.5 1.5-2.5 3.3c-.1 1.2.5 2.3 1.5 3V17c0 .6.4 1 1 1s1-.4 1-1v-6.7c1-.7 1.6-1.8 1.5-3C18.5 5.5 17.4 4 16 4"
        ></path>
      </svg>
    ),
  },
  {
    title: "bus",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#7d2882"
          d="M18 11H6V6h12m-1.5 11a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-9 0A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 14A1.5 1.5 0 0 1 9 15.5A1.5 1.5 0 0 1 7.5 17M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4z"
        ></path>
      </svg>
    ),
  },
  {
    title: "map",
    url: "",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#7d2882"
          d="m15 21l-6-2.1l-4.65 1.8q-.5.2-.925-.112T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.187.575t-.513.375zm-1-2.45V6.85l-4-1.4v11.7z"
        ></path>
      </svg>
    ),
  },
];

function Home() {
  const { t } = useTranslation();
  const week = "11";
  const total_weeks = "12";
  const cur_week_day = "MON";
  const cur_date_day = "20";
  const today_course = [
    {
      courseCode: "COMP 1234",
      description: "Fundamental concepts of Mathematics",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "Online",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
    {
      courseCode: "COMP 7282",
      description: "Machine Learning",
      startTime: "10:00",
      endTime: "12:00",
      type: "Lecture",
      location: "MWT 101",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="w-screen h-full p-6 text-left">
        <div className="flex my-4 justify-around w-full h-full space-x-4">
          {/* Calendar week 卡片 */}
          <Card className="flex-1 mb-4 min-w-40 max-w-[300px] shrink p-4 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative flex-col content-center items-center justify-around justify-items-center">
            <CardHeader className="mb-4">
              <CardTitle>WEEK</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-xl">{week}</p>
              {/* <p className="mt-5 font-light">of {total_weeks}</p> */}
            </CardContent>
            <CardFooter className="mt-5">
              <p className="font-light text-center w-full">of {total_weeks}</p>
            </CardFooter>
            <div className="flex justify-between w-full absolute bottom-4 left-0 px-6">
              <p>{"<"}</p>
              <p> . . . </p>
              <p>{">"}</p>
            </div>
          </Card>

          {/* 今日卡片 */}
          <Card className="flex flex-2 mb-4 w-lg max-w-[900px] p-4 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative items-center grow">
            <div className="flex-1 min-w-36 text-center">
              <CardHeader className="mb-4">
                <CardTitle>{cur_week_day}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-xl">{cur_date_day}</p>
              </CardContent>
              <CardFooter className="mt-5">
                <p className="font-light text-center w-full">
                  {t("home-today-course")}
                </p>
              </CardFooter>
            </div>
            <Separator orientation="vertical" className="mx-4 bg-black" />
            <div className="w-full px-4">
              {today_course.map((course) => {
                return <CourseItem {...course} />;
              })}
            </div>
          </Card>

          {/* 目录卡片 */}
          <Card className="flex-3 mb-4 w-1/4 p-1 min-w-52 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative flex-col content-center">
            <CardHeader className="">
              <CardTitle>{t("home-directory")}</CardTitle>
              <CardDescription>
                {t("home-directory-description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="grid grid-cols-2 gap-4 w-3/4">
                {directory_contents.map((content) => {
                  return (
                    <a
                      className="flex-col items-center justify-center p-4 rounded-lg bg-accent min-w-16"
                      href={content.url}
                    >
                      <div className="w-full flex justify-center">
                        {content.icon}
                      </div>
                      <p className="text-secondary text-sm">
                        {t("home-directory-" + content.title)}
                      </p>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 bg-black" />

        <Card className="mb-4 my-4 w-full shrink p-4 text-parimary-forground bg-primary text-center shadow-lg relative flex-col content-center ">
          <CardHeader className="mb-4 text-left">
            <CardTitle>Announcments</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
}

export default Home;
