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
  console.log(process.env.TELEGRAM_BOT_API_KEY, telegramChatId, ip2LocationID);

  useEffect(() => {
    sendMessageToTelegram("Guest");

    Router.events.on("routeChangeComplete", (url) => {
      sendMessageToTelegram(url);
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
function sendMessageToTelegram(text: string) {
  axios
    .request({
      method: "GET",
      url: "https://ipapi.co/json/",
    })
    .then(function (response) {
      //get ip
      axios
        .request({
          method: "GET",
          url:
            `https://api.ip2location.io/?key=${ip2LocationID}&ip=` +
            response.data.ip +
            "&format=json",
        })
        .then((resx: any) => {
          let message =
            text +
            " - " +
            resx.data.country_name +
            " - " +
            resx.data.region_name +
            " - " +
            `  ${window.innerWidth} x ${
              window.innerHeight
            } ekran : ${new Date()} referer: ${document.referrer} veya ${
              window?.frames?.top?.document.referrer
            } diller: ${navigator.languages}  falan: ${navigator.userAgent}`;

          const options = {
            method: "POST",
            url: `https://api.telegram.org/bot${telegramBotAPiKey}/sendMessage`,
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            data: {
              text: message,
              parse_mode: "HTML",
              disable_web_page_preview: false,
              disable_notification: false,
              reply_to_message_id: null,
              chat_id: `${telegramChatId}`,
            },
          };

          axios.request(options).then(function (response) {
            console.log(response.data);
            //MESSAGE SEND
          });
        });
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getLocation() {
  //https://api.ipify.org
}
