import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "@/lib/api.ts";
import i18n from "@/i18n.ts";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
// import { Label } from "@/components/ui/label.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
// import moment from "moment";

export default function Article() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  // const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!articleId) return;
    request("/info/article.php", { article_id: articleId }).then((res) => {
      console.log(res);
      setSource(
        res.article_detail.article_content[i18n.language.replace("-", "_")],
      );
      // setDate(moment.unix(res.article_detail.article_create_time).toDate());
    });
  }, [articleId]);

  return (
    <ScrollArea
      className="w-full h-full md:h-screen text-left gap-1"
      scrollHideDelay={100}
    >
      <div className="px-2 md:px-8 md:py-4 w-full relative">
        {/*Header*/}
        <div className="flex my-4 items-start">
          <Button
            className="py-1 px-1 h-fit md:p-1.5"
            onClick={() => {
              window.history.state.idx > 0 ? navigate(-1) : navigate("/home");
            }}
          >
            <ChevronLeftIcon className="w-5 h-5  md:w-7 md:h-7" />
          </Button>
          {/*<Label className="text-sm md:text-sm font-light text-secondary">*/}
          {/*  {date?.toLocaleDateString()}*/}
          {/*</Label>*/}
        </div>

        <MarkdownPreview
          source={source}
          style={{
            padding: 10,
            paddingTop: 0,
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            maxWidth: 800,
            margin: "0 auto",
          }}
          className="w-[calc(100vw-1rem)] md:w-[calc(100vw-9rem-20px)]"
          wrapperElement={{
            "data-color-mode": "light",
          }}
          rehypeRewrite={(node, _, parent) => {
            if (
              parent &&
              "tagName" in node &&
              "tagName" in parent &&
              node.tagName === "a" &&
              /^h([1-6])/.test(parent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
        />
      </div>
    </ScrollArea>
  );
}
