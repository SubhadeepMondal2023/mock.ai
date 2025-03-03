"use client";
import React from "react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

const Footer = () => {
  const linkedinProfile = process.env.NEXT_PUBLIC_LINKEDIN_PROFILE;
  const xProfile = process.env.NEXT_PUBLIC_X_PROFILE;
  const githubProfile = process.env.NEXT_PUBLIC_GITHUB_PROFILE;

  return (
    <footer className="bg-blue-900 text-white py-4 flex items-center justify-between px-6">
      <p className="text-sm">© 2025 mock.ai by 'Subhadeep Mondal'. All rights reserved.</p>

      <div className="flex gap-4">
        <a href={linkedinProfile} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl hover:text-blue-500" />
        </a>
        <a href={xProfile} target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-2xl hover:text-gray-400" />
        </a>
        <a href={githubProfile} target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl hover:text-gray-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
