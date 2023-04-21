import GA from "./GoogleAnalytics";
import Plausible from "./Plausible";
import SimpleAnalytics from "./SimpleAnalytics";
import Posthog from "./Posthog";
import siteMetadata from "@/data/siteMetadata";

const isProduction = process.env.NODE_ENV === "production";

export const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && (
        <Plausible />
      )}
      {isProduction && siteMetadata.analytics.simpleAnalytics && (
        <SimpleAnalytics />
      )}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
      {isProduction && siteMetadata.analytics.posthogAnalyticsId && <Posthog />}
    </>
  );
};
