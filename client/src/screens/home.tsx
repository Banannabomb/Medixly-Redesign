import React, { useContext } from "react";
import ConsultationSectionHeader from "../components/ConsultationSectionHeader";
import HomeConsultationSection from "../components/HomeConsultationSection";
import HomePageHeader from "../components/HomePageHeader";
import Layout from "../components/Layout";
import RecentScansHeader from "../components/RecentScansHeader";
import RecentScansSection from "../components/RecentScansSection";
import Context from "../utils/context";

interface Props {
  navigation: {
    navigate: (
      route: string,
      params?: {
        scan?: {
          url: string;
          date: string;
          diagnosis: string;
          note: string;
        };
        doctor?: {
          name: string;
          phoneNumber: string;
          email: string;
        };
      }
    ) => void;
  };
}

const Home: React.FC<Props> = ({ navigation }) => {
  const { scans, doctors } = useContext(Context);

  return (
    <Layout>
      <>
        <HomePageHeader navigation={navigation} />
        <RecentScansHeader navigation={navigation} />
        <RecentScansSection scans={scans} navigation={navigation} />
        <ConsultationSectionHeader navigation={navigation} />
        <HomeConsultationSection doctors={doctors} navigation={navigation} />
      </>
    </Layout>
  );
};

export default Home;
