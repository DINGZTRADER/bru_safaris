import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/blog";

export const metadata: Metadata = { title: "Rwanda & East Africa Safari Journal", description: "Practical, locally informed guidance for planning gorilla trekking and private East Africa safaris.", alternates: { canonical: "/blog" } };
export default function Blog() { return <div className="page"><header className="page-hero"><p className="kicker">Field notes & practical guidance</p><h1>Plan wisely.<br/><em>Travel deeply.</em></h1><p>Clear, useful guidance from the questions thoughtful safari travellers ask most.</p></header><section className="blog-grid">{posts.map((post) => <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}><div><Image src={post.image} fill alt="" sizes="(max-width: 800px) 100vw, 33vw"/></div><article><p className="kicker">{post.category} · {post.readTime}</p><h2>{post.title}</h2><p>{post.excerpt}</p><span className="text-link">Read the guide →</span></article></Link>)}</section></div>; }
