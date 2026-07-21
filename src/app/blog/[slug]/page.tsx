import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = posts.find((item) => item.slug === slug); return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: "article", images: [post.image], publishedTime: post.published } } : {}; }
export default async function Article({ params }: Props) { const { slug } = await params; const post = posts.find((item) => item.slug === slug); if (!post) notFound(); return <article className="article-page"><header><p className="kicker">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p>{post.excerpt}</p></header><div className="article-image"><Image src={post.image} fill priority alt="" sizes="100vw"/></div><div className="article-body"><p className="article-date">Published {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(post.published))}</p>{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<aside><p className="kicker">Make it personal</p><h2>Build this advice into your own journey.</h2><Link className="button" href="/plan">Request a custom itinerary</Link></aside></div></article>; }
