import NavBar from "@/components/navbar/navbar";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function CommentIcon() {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fill="black" d="m4.827 7.138l.445.227zm.441 11.594l.354.353zm12.594-2.559l-.227-.445zm1.311-1.311l-.445-.227zm0-7.724l-.445.227zm-1.311-1.311l.227-.446zm-11.724 0l.227.445zm1.07 10.966l.353.353zM5 10.3c0-.848 0-1.455.04-1.93c.038-.469.11-.766.232-1.005l-.89-.454c-.206.403-.296.847-.34 1.378C4 8.814 4 9.469 4 10.3zm0 1.2v-1.2H4v1.2zm-1 0v5h1v-5zm0 5v1.914h1V16.5zm0 1.914c0 .846 1.023 1.27 1.622.671l-.707-.707a.059.059 0 0 1 .028-.013a.046.046 0 0 1 .026.002a.059.059 0 0 1 .03.046zm1.622.671l1.939-1.939l-.707-.707l-1.94 1.94zM14.7 16H7.914v1H14.7zm2.935-.273c-.239.122-.536.195-1.005.234c-.476.039-1.082.039-1.93.039v1c.832 0 1.486 0 2.011-.043c.531-.043.975-.133 1.378-.338zm1.092-1.092a2.5 2.5 0 0 1-1.092 1.092l.454.892a3.5 3.5 0 0 0 1.53-1.53zM19 11.7c0 .848 0 1.455-.04 1.93c-.038.469-.11.766-.233 1.005l.892.454c.205-.403.295-.847.338-1.378c.043-.525.043-1.18.043-2.011zm0-1.4v1.4h1v-1.4zm-.273-2.935c.122.239.195.536.234 1.005C19 8.845 19 9.452 19 10.3h1c0-.832 0-1.486-.043-2.011c-.043-.531-.133-.975-.338-1.378zm-1.092-1.093a2.5 2.5 0 0 1 1.092 1.093l.892-.454a3.5 3.5 0 0 0-1.53-1.53zM14.7 6c.848 0 1.454 0 1.93.04c.469.038.766.11 1.005.232l.454-.89c-.403-.206-.847-.296-1.378-.34C16.186 5 15.531 5 14.7 5zM9.3 6h5.4V5H9.3zm-2.935.272c.239-.121.536-.194 1.005-.233C7.845 6 8.452 6 9.3 6V5c-.832 0-1.486 0-2.011.043c-.531.043-.975.133-1.378.338zM5.272 7.365a2.5 2.5 0 0 1 1.093-1.093l-.454-.89a3.5 3.5 0 0 0-1.53 1.529zm2.289 9.781A.5.5 0 0 1 7.914 17v-1a1.5 1.5 0 0 0-1.06.44z"></path><path stroke="black" strokeLinecap="round" strokeLinejoin="round" d="M8.5 9.5h7m-7 3h5"></path></g></svg>);
}

function ArrowDownIcon() {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="black" d="m15 8l-4.03 6L7 8z"></path></svg>);
}

function FilterIcon() {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 5s4-2 14-2s14 2 14 2L19 18v9l-6 3V18z"></path></svg>);
}

const faculties = ['engineering', 'science', 'art', 'medical', 'law', 'business']
const semesters = ['Sem1', 'Sem2', 'Sem3', 'Summer']
const courseList = [
    {
        'courseCode': 'COMP1001',
        'title': 'Introduction to Computer Science',
        'school': 'Sch of Computer Science',
        'commentCount': '20',
    },
    {
        "courseCode": "COMP1002",
        "title": "Data Structures",
        "school": "Sch of Computer Science",
        "commentCount": "10",
    },
    {
        "courseCode": "COMP1003",
        "title": "Algorithm Design and Analysis",
        "school": "Sch of Computer Science",
        "commentCount": "5",
    },
    {
        "courseCode": "COMP1004",
        "title": "Operating Systems",
        "school": "Sch of Computer Science",
        "commentCount": "15",
    },
    {
        "courseCode": "COMP1005",
        "title": "Software Engineering",
        "school": "Sch of Computer Science",
        "commentCount": "25",
    },
    {
        "courseCode": "COMP1002",
        "title": "Data Structures",
        "school": "Sch of Computer Science",
        "commentCount": "10",
    },
    {
        "courseCode": "COMP1003",
        "title": "Algorithm Design and Analysis",
        "school": "Sch of Computer Science",
        "commentCount": "5",
    },
    {
        "courseCode": "COMP1004",
        "title": "Operating Systems",
        "school": "Sch of Computer Science",
        "commentCount": "15",
    },
    {
        "courseCode": "COMP1005",
        "title": "Software Engineering",
        "school": "Sch of Computer Science",
        "commentCount": "25",
    },
]

function Courses() {
    const { t } = useTranslation();
    return (
        <div className="flex">
            <NavBar currentPath="/courses"/>
            <div className="w-full h-full py-10 pl-14 text-left">
                <div className="flex items-center">
                    <Label className="text-3xl font-black text-secondary">{t('course-search')}</Label>
                    <Separator orientation="vertical" className="h-6 mx-5 bg-secondary w-[2px]"/>
                    <Popover>
                        <PopoverTrigger className="flex">
                            <Label className="text-secondary mr-2">{t('course-search-filter')}</Label>
                            <FilterIcon/>
                        </PopoverTrigger>
                        <PopoverContent className="mt-2 w-fit">
                            <div className="flex flex-col">
                                <Label className="text-md text-secondary">{t('course-search-filter-faculty')}</Label>
                                <div className="flex flex-wrap ml-2 w-96 my-2">
                                    {faculties.map((faculty) => {
                                        return <Badge variant="outline" className="mr-2 my-1 py-2 px-4 rounded-sm w-fit bg-background">{faculty}</Badge>
                                    })}
                                </div>

                                <Label className="text-md text-secondary mt-2 w-full">{t('course-search-filter-semester')}</Label>
                                <div className="flex flex-wrap ml-2 w-80 my-2">
                                    {semesters.map((sem) => {
                                        return <Badge variant="outline" className="mr-2 my-1 py-2 px-4 rounded-sm w-fit bg-background">{sem}</Badge>
                                    })}
                                </div>

                                <Label className="text-md text-secondary mt-2">{t('course-search-filter-class-time')}</Label>
                                <div className="flex ml-2 w-96 my-2 items-center">
                                    <Badge variant="outline" className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background">{t('course-search-filter-class-select-weekday')}
                                        <ArrowDownIcon/>
                                    </Badge>
                                    <Badge variant="outline" className="mr-2 my-1 py-2 px-2 rounded-sm w-fit bg-background">{t('course-search-filter-class-select-start-time')}
                                        <ArrowDownIcon/>
                                    </Badge>
                                    <p>-</p>
                                    <Badge variant="outline" className="mx-2 my-1 py-2 px-2 rounded-sm w-fit bg-background">{t('course-search-filter-class-select-end-time')}
                                        <ArrowDownIcon/>
                                    </Badge>
                                </div>

                                <Label className="text-md text-secondary mt-2">{t('course-search-filter-workload')}</Label>
                                <div className="flex ml-2 w-96 my-2 items-center">
                                    <Badge variant="outline" className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background">{t('course-search-filter-workload-select')}
                                        <ArrowDownIcon/>
                                    </Badge>
                                </div>
                                
                                <Label className="text-md text-secondary mt-2">{t('course-search-filter-recomendation')}</Label>
                                <div className="flex ml-2 w-96 my-2 items-center">
                                    <Badge variant="outline" className="mr-6 my-1 py-2 px-2 rounded-sm w-fit bg-background">{t('course-search-filter-recomendation-select')}
                                        <ArrowDownIcon/>
                                    </Badge>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex">
                    <div className="flex-col mt-10 w-full max-w-[1000px] min-w-[600px] shrink">
                        <Input placeholder={t('course-search-placeholder')} className="w-full bg-primary border-none py-6 px-8"/>
                        <ScrollArea className="mt-5 h-3/4 w-full bg-primary rounded-lg p-4 overflow-scroll">
                            {courseList.map((course) => {
                                return (
                                    <>
                                        <div className="flex justify-between items-center py-1 px-4 h-full">
                                            <div className="flex flex-col my-1">
                                                <Label className="font-bold leading-7">{course.courseCode} - {course.title}</Label>
                                                <Label className="text-sm text-muted">{course.school}</Label>
                                            </div>
                                            <div className="flex items-center justify-start w-12">
                                                <CommentIcon/>
                                                <Label className="text-xs ml-1">{course.commentCount}</Label>
                                            </div>
                                        </div>
                                        <Separator/>
                                    </>
                                );
                            })}
                        </ScrollArea>
                    </div>
                    <div className="w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default Courses;