import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import LayoutWrapper from "@/components/LayoutWrapper";
import { siteMetadata } from "@/data/siteMetadata";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { useEffect } from "react";
import { Router } from "next/router";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
export async function getServerSideProps(context: any) {
  console.log(context.req.headers.referer);
}
export default function App({ Component, pageProps }: AppProps) {
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
            "https://api.ip2location.io/?key=63F0A9B35D2F7DD492CBBAE9984015ED&ip=" +
            response.data.ip +
            "&format=json",
        })
        .then((resx: any) => {
          console.log("resx", resx);

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
            url: "https://api.telegram.org/bot6230612885%3AAAF2g3FAMhlmKDAZGcMN3CfCkk5vICyw0cg/sendMessage",
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
              chat_id: "1321186972",
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
