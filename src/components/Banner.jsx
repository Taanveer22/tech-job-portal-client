// eslint-disable-next-line no-unused-vars
import { easeOut, motion } from "motion/react";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            src={team1}
            animate={{ y: [50, 100, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="max-w-sm rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-500 shadow-2xl flex-1"
          />
          <motion.img
            src={team2}
            animate={{ x: [50, 100, 50] }}
            transition={{ duration: 10, delay: 5, repeat: Infinity }}
            className="max-w-sm rounded-t-4xl rounded-br-4xl border-l-8 border-b-8 border-blue-500 shadow-2xl flex-1"
          />
          <div className="flex-1">
            <motion.h1
              animate={{
                x: 50,
              }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeOut,
                repeat: Infinity,
              }}
              className="text-5xl font-bold"
            >
              Find
              <motion.span
                animate={{
                  color: ["#D43515", "#15B4D4", "#2ED415"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="ml-5"
              >
                Jobs!
              </motion.span>
            </motion.h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
