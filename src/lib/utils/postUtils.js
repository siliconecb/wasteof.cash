// @ts-nocheck
import { escape } from "html-escaper";

export function gettime(time) {
  const now = new Date().getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}mo`;
  if (weeks > 0) return `${weeks}w`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export function timetooltip(time) {
  const epochTime = Number(time);
  const date = new Date(epochTime);

  const timez = new Date()
    .toLocaleTimeString("en-US", { timeZoneName: "short" })
    .split(" ")[2];
  const year = date.getFullYear();
  const month = date.toLocaleString("default", {
    month: "long",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${month} ${day}, ${year} ${formattedHours}:${String(minutes).padStart(
    2,
    "0"
  )} ${ampm} ${timez}`;
}

export function unescape(content) {
  return content.replace(/\\u[\dA-F]{4}/gi, (match) =>
    String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
  );
}

export function realcontentstuff(text, color) {
  const escaped = escape(text);
  const highlight = hexToRgba(color, 0.3);

  return escaped
    .replace(
      /&lt;h2&gt;(.*?)&lt;\/h2&gt;/g,
      '<span class="text-2xl font-[850] block my-2">$1</span>'
    )
    .replace(
      /&lt;strong&gt;(.*?)&lt;\/strong&gt;/g,
      '<span class="font-bold">$1</span>'
    )
    .replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/g, '<span class="italic">$1</span>')
    .replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, '<span class="underline">$1</span>')
    .replace(
      /&lt;s&gt;(.*?)&lt;\/s&gt;/g,
      '<span class="line-through">$1</span>'
    )
    .replace(/&lt;p&gt;(.*?)&lt;\/p&gt;/g, '<span class="block my-2">$1</span>')
    .replace(
      /&lt;mark&gt;(.*?)&lt;\/mark&gt;/g,
      `<span style="background-color: ${highlight};">$1</span>`
    )
    .replace(/&lt;img(.*?)&gt;/g, (match, attributes) => {
      const src = attributes.match(/src="([^"]*)"/);
      const alt = attributes.match(/alt="([^"]*)"/);
      return `<img src="${src ? src[1] : ""}" alt="${
        alt ? alt[1] : ""
      }" class="max-w-full h-auto">`;
    })
    .replace(
      /&lt;blockquote&gt;(.*?)&lt;\/blockquote&gt;/gs,
      '<div class="flex my-2">' +
        '<div class="w-1 bg-[#737373] mr-3 flex-shrink-0"></div>' +
        '<div class="flex-grow py-1 italic text-[#e8e8e8]">$1</div>' +
        "</div>"
    )
    .replace(
      /&lt;pre&gt;&lt;code&gt;([\s\S]*?)&lt;\/code&gt;&lt;\/pre&gt;/g,
      (match, p1) => {
        const codeContent = p1.replace(/\\n/g, "<br>");
        return (
          `<pre class="bg-[#1B1B1B] rounded-md p-4 my-2 overflow-x-auto">` +
          `<code style="font-family: '__chivo_7c2c76', monospace;">${codeContent}</code>` +
          `</pre>`
        );
      }
    )
    .replace(
      /&lt;code&gt;(.*?)&lt;\/code&gt;/g,
      '<span class="font-bold" style="font-family: \'__chivo_7c2c76\', monospace;">`$1`</span>'
    )
    .replace(/&lt;ol&gt;.*?&lt;\/ol&gt;/gs, (match) => {
      const lis = match.match(/&lt;li&gt;(.*?)&lt;\/li&gt;/g);
      if (lis) {
        const numberedList = lis.map(
          (li, index) =>
            `<div class="flex items-center"><span class="mr-1 leading-none text-[#a8a8a8] user-select-none">${
              index + 1
            }. </span><span>${li
              .replace(/&lt;li&gt;/, "")
              .replace(/&lt;\/li&gt;/, "")}</span></div>`
        );
        return numberedList.join("");
      }
      return "";
    })
    .replace(/&lt;ul&gt;.*?&lt;\/ul&gt;/gs, (match) => {
      const lis = match.match(/&lt;li&gt;(.*?)&lt;\/li&gt;/g);
      if (lis) {
        const bulletList = lis.map(
          (li) =>
            `<div class="flex items-center"><span class="mr-1 leading-none text-[#a8a8a8] user-select-none">•</span><span>${li
              .replace(/&lt;li&gt;/, "")
              .replace(/&lt;\/li&gt;/, "")}</span></div>`
        );
        return bulletList.join("");
      }
      return "";
    })
    .replace(
      /&lt;li&gt;(.*?)&lt;\/li&gt;/g,
      '<div class="flex items-center"><span class="mr-1 leading-none text-[#a8a8a8] user-select-none">•</span><span>$1</span></div>'
    )
    .replace(/\n/g, "<br>");
}

// don't get mad the true colors don't look good with the wasteof.cash site color scheme
export function tmapcolor(color) {
  const colorMap = {
    red: "#EE4545",
    orange: "#ED8E49",
    yellow: "#E5D240",
    green: "#77EC7F",
    teal: "#60EAFF",
    cyan: "#51FFF0",
    blue: "#5CAAFC",
    indigo: "#7275FF",
    violet: "#8D57BC",
    purple: "#9330DC",
    fuchsia: "#FF57E9",
    pink: "#FF7DFF",
    gray: "#9F9F9F",
  };

  return colorMap[color] || "#000000";
}

// fuck me bro i forgot i had the borders in rgba not hex so im doing this instead of redoing it
export function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
