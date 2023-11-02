import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { Logo } from "../Assets";
import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className="p-2 bg-primary sm:p-4 w-full">
      <div className="flex justify-center md:justify-start items-center">
        <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} className="mb-3 md:mb-0">
          <Link to="/" className="flex gap-8 items-center">
            <motion.img
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              src={Logo}
              className="w-10 md:w-36 object-contain"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-headingColor">
              Nem nướng Cô Lê
            </span>
          </Link>
        </motion.div>
      </div>
      <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <span className="text-sm text-gray-500 text-center dark:text-gray-400">
          © {" "}
          {
            new Date().getFullYear()
          }
          {" "}Tuấn Anh™. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
