import Link from 'next/link';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const btnSocialMedia = [
    {
      name: 'Github',
      href: 'https://github.com/HalysonSA',
      icon: <FaGithub size={24} className="text-white" />,
    },
    {
      name: 'Whatsapp',
      href: 'https://api.whatsapp.com/send?phone=5584999743434&text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20agendamento',
      icon: <FaWhatsapp size={24} className="text-white" />,
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/halysonsa/',
      icon: <FaLinkedin size={24} className="text-white" />,
    },
  ];

  const btnSocialMediaList = btnSocialMedia.map((btn) => {
    return (
      <Link
        key={btn.name}
        href={btn.href}
        className="flex flex-row items-center gap-2 p-2 text-white rounded-full bg-cyan-600 hover:bg-cyan-500"
      >
        {btn.icon}
      </Link>
    );
  });

  return (
    <footer className="flex items-center justify-center w-full mt-10 select-none h-44 bg-cyan-800">
      <div className="flex flex-col items-center justify-center w-full gap-5 max-w-screen-2xl">
        <div className="flex flex-row items-center gap-5">
          {btnSocialMediaList}
        </div>
        <label className="text-center text-white">© 2023 Halyson Santos</label>
      </div>
    </footer>
  );
}
