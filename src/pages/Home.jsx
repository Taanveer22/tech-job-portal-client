import Banner from "../components/Banner";
import HotJobs from "../components/HotJobs";

const Home = () => {
  return (
    <section className="max-w-7xl w-11/12 mx-auto">
      <div className="mb-8 lg:mb-16">
        <Banner></Banner>
      </div>

      <div className="">
        <HotJobs></HotJobs>
      </div>
    </section>
  );
};

export default Home;
