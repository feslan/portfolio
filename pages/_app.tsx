import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import LayoutWrapper from "@/components/LayoutWrapper";
import { siteMetadata } from "@/data/siteMetadata";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { useEffect } from "react";
import { Router } from "next/router";
import axios from "axios";
const telegramBotAPiKey = process.env.TELEGRAM_BOT_API_KEY;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;
const ip2LocationID = process.env.IP_2_LOCATION_ID;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    var currentDate: Date | any = new Date();
    currentDate = currentDate.toString();

    var previousVisit: any;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      previousVisit = localStorage.getItem("previousVisit");
      if (!previousVisit) {
        localStorage.setItem("previousVisit", currentDate);
        return;
      }
      localStorage.setItem("previousVisit", currentDate + previousVisit);
      if (previousVisit.length > 100) {
        localStorage.setItem("previousVisit", currentDate);
      }
    }
    sendMessageToTelegram(previousVisit, "Guest");

    Router.events.on("routeChangeComplete", (url) => {
      sendMessageToTelegram(previousVisit, url);
    });
  }, [Router.events]);
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <GoogleAnalytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
function sendMessageToTelegram(previousVisit: any, url: string) {
  axios("https://api.incolumitas.com/").then((res) => {
    let text = `location:<b>${res.data.location.country}-${res.data.location.state}  </b>referer:<b>${document.referrer}- ${window?.frames?.top?.document.referrer}</b> URL:<b>${url}</b> previousVisit:<b>${previousVisit}</b>  languages:<b>${navigator.languages}</b>  diger:<b>${navigator.userAgent}</b>`;

    const options = {
      method: "POST",
      url: `https://api.telegram.org/bot${telegramBotAPiKey}/sendMessage`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: false,
        disable_notification: false,
        reply_to_message_id: null,
        chat_id: `${telegramChatId}`,
      },
    };
    axios.request(options).catch((err) => {});
  });

  return;
  axios("https://ipapi.co/json/")
    .then((res: any) => {
      axios
        .request({
          method: "GET",
          url: `https://location-server.onrender.com/?ip=${res.data.ip}&url=${url}&referer=${document.referrer}&referer=${window?.frames?.top?.document.referrer}&diller=${navigator.languages}&useragent=${navigator.userAgent}&previous=${previousVisit}`,
        })
        .then((res) => {})
        .catch((res) => {});
    })
    .catch((err) => {});
}
//http://localhost:27063
