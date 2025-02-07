import Link from "next/link";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-black text-white flex justify-center items-center">
      <p className="px-5 py-5 text-center text-sm">
        All rights reserved. Built with🔥{date} <br /> &copy; By{" "}
        <Link
          className="underline"
          href={"https://github.com/hasibmuhammad"}
          target="_blank"
        >
          Hasib Muhammad
        </Link>{" "}
      </p>
    </footer>
  );
};

export default Footer;
