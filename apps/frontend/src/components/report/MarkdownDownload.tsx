import {
  Download,
} from "lucide-react";

interface Props {
  markdown: string;
}

export default function MarkdownDownload({
  markdown,
}: Props) {
  function download() {
    const blob = new Blob([markdown], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;
    anchor.download =
      "engineering-report.md";

    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
    >
      <Download size={18} />

      Download Markdown
    </button>
  );
}