import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { PrismaClient } from '@prisma/client';

import Spline from '@splinetool/react-spline';

const prisma = new PrismaClient();

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/s7FIrpOBeBysWB4V/scene.splinecode"
        />
      </div>
      <div className="inline-block max-w-xl text-center z-10">
        <span className={`${title()} text-3xl sm:text-4xl md:text-5xl`}>
          Quantum&nbsp;
        </span>
        <span className={`${title({ color: "violet" })} text-3xl sm:text-4xl md:text-5xl`}>
          Encryption&nbsp;
        </span>
        <br />
        <span className={`${title()} text-xl sm:text-2xl md:text-3xl`}>
          Securely manage all your passwords in one place.
        </span>
        <div className={`${subtitle({ class: "mt-4" })} text-base sm:text-lg md:text-xl`}>
          A fast, modern, and encrypted password manager to keep your data safe.
        </div>
      </div>

      <div className="flex gap-3 z-10">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/password-manager"
        >
          Manage
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}