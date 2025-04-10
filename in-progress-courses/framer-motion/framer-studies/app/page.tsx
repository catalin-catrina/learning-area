"use client";

import LearnFramerMotion from "@/components/LearnFramerMotion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/about">About me</Link>
      <LearnFramerMotion />
    </>
  );
}
