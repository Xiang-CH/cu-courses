import NavBar from "@/components/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 课程详情
function CourseItem({courseCode, description, startTime, endTime, type, location}: {courseCode: string, description: string, startTime: string, endTime: string, type: string, location: string}) {
    return(
        <Card className="w-full min-w-48 h-fit border-none bg-card shadow-none my-4 p-1">
            <CardContent className="flex justify-between p-0 mx-4">
                <div className="flex-1 text-left self-center">
                    <p className="font-bold text-lg leading-tight">{courseCode}</p>
                    <p className="leading-tight text-sm">{description}</p>
                </div>
                <div className="flex-2 flex items-center">
                    <Separator orientation="vertical" className="mx-2 bg-black h-3/4"/>
                    <div className="text-left mr-4">
                        <p className="leading-tight text-sm">{type}</p>
                        <p className="leading-tight text-sm">{startTime} - {endTime}</p>
                    </div>
                    <div className="flex h-full items-center w-16">
                        <p className="text-sm">{location}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function Home() {
    const { t } = useTranslation();
    const week = '11';
    const total_weeks = '12';
    const cur_week_day = "MON";
    const cur_date_day = "20";
    const today_course = [{
        courseCode: "COMP 1234",
        description: "Software Engineering",
        startTime: "10:00",
        endTime: "12:00",
        type: "Lecture",
        location: "Online"
    
    }, {
        courseCode: "COMP 7282",
        description: "Machine Learning",
        startTime: "10:00",
        endTime: "12:00",
        type: "Lecture",
        location: "MWT 101"
    }, {
        courseCode: "COMP 7282",
        description: "Machine Learning",
        startTime: "10:00",
        endTime: "12:00",
        type: "Lecture",
        location: "MWT 101"
    }, {
        courseCode: "COMP 7282",
        description: "Machine Learning",
        startTime: "10:00",
        endTime: "12:00",
        type: "Lecture",
        location: "MWT 101"
    }]

    return (
        <>
            <NavBar/>
            <div className="w-screen h-full p-6 text-left">
                <div className="flex my-4 justify-around w-full h-full">
                    {/* Calendar week 卡片 */}
                    <Card className="flex-1 mr-2 min-w-48 max-w-56 w-1/4 p-4 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative flex-col content-center">
                        <CardHeader className="mb-4">
                            <CardTitle>Week</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-xl">{week}</p>
                            {/* <p className="mt-5 font-light">of {total_weeks}</p> */}
                        </CardContent>
                        <CardFooter className="mt-5">
                            <p className="font-light text-center w-full">of {total_weeks}</p>
                        </CardFooter>
                        <div className="flex justify-between w-full absolute bottom-4 left-0 px-6">
                            <p>{'<'}</p>
                            <p> . . . </p>
                            <p>{'>'}</p>
                        </div>
                    </Card>

                    {/* 今日卡片 */}
                    <Card className="flex flex-2 mx-2 min-w-80 p-4 w-1/2 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative items-center">
                        <div className="flex-1 min-w-36 text-center">
                            <CardHeader className="mb-4">
                                <CardTitle>{cur_week_day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-bold text-xl">{cur_date_day}</p>
                            </CardContent>
                            <CardFooter className="mt-5">
                                <p className="font-light text-center w-full">{t('home-today-course')}</p>
                            </CardFooter>
                        </div>
                        <Separator orientation="vertical" className="mx-4 bg-black"/>
                        <div className="w-full px-4">
                            {today_course.map((course) => {
                                return <CourseItem {...course}/>
                            })}
                        </div>
                    </Card>
                    <Card className="flex-3 ml-2 min-w-48 w-1/4 p-4 text-parimary-forground bg-primary text-center border-black border-3 shadow-lg relative flex-col content-center">

                    </Card>
                </div>
            </div>
        </>
    );
};

export default Home;