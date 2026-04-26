import { useEffect, useMemo, useState } from 'react';
import BrokersPage from './BrokersPage';
import GuidancePage from './GuidancePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import NewsPage from './NewsPage';

type FaqItem = {
  question: string;
  answer: string;
};

type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
  created_at?: string | null;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  images?: string[] | null;
  tags?: string[] | null;
  published_at?: string | null;
  created_at?: string | null;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? '';
const apiUrl = (path: string) => `${API_BASE}${path}`;

const brokers = [
  {
    name: 'Exness',
    note: 'Popular for tight spreads and fast execution.',
    logoSrc: '/assets/logo/exness logo.png',
    websiteUrl: 'https://www.exness.com/'
  },
  {
    name: 'TickMill',
    note: 'Strong for low-cost trading and advanced accounts.',
    logoSrc: '/assets/logo/tickmill logo.png',
    websiteUrl: 'https://www.tickmill.com/'
  },
  {
    name: 'Pepperstone',
    note: 'Well-known for platforms and trader tooling.',
    logoSrc: '/assets/logo/pepperstone logo.jpg',
    websiteUrl: 'https://pepperstone.com/'
  },
  {
    name: 'eToro',
    note: 'Social investing features and broad market access.',
    logoSrc: '/assets/logo/eToro logo.png',
    websiteUrl: 'https://www.etoro.com/'
  },
  {
    name: 'XTB',
    note: 'Education-first approach with robust research.',
    logoSrc: '/assets/logo/XTB logo.png',
    websiteUrl: 'https://www.xtb.com/'
  },
  {
    name: 'AvaTrade',
    note: 'Global brand with multi-asset offerings.',
    logoSrc: '/assets/logo/Ava trade logo.png',
    websiteUrl: 'https://www.avatrade.com/'
  }

];

function formatDate(input?: string | null) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function BlogListPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogListItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl('/api/blogs'));
        const data = (await res.json()) as { blogs?: BlogListItem[]; message?: string };
        if (!res.ok) throw new Error(data?.message || 'Failed to load blog posts');
        if (!cancelled) setPosts(data.blogs || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load blog posts');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/blog background.jpg')" }}>
      <div className="absolute inset-0 bg-black/85"></div>
      <div className="relative py-8 sm:py-10 lg:py-12">
        <Container>
          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">Forex Trading News</h1>
            <p className="mt-4 text-sm leading-7 text-white/85 max-w-2xl mx-auto">
              Stay updated with the latest forex trading insights, market analysis, and expert opinions from our team.
            </p>
          </div>
          {loading ? (
            <div className="text-center text-sm text-white/80">Loading…</div>
          ) : error ? (
            <div className="text-center text-sm text-red-200">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-sm text-white/80">No posts yet.</div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <a
                  key={p.id}
                  href={`#/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur transition hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  {p.cover_image ? (
                    <div className="aspect-[16/9] w-full bg-white/5 overflow-hidden">
                      <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-emerald-900/30 to-blue-900/30 flex items-center justify-center">
                      <span className="text-4xl text-white/20 font-serif">FT</span>
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(p.published_at)}
                    </div>
                    <div className="mt-3 text-base sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition">{p.title}</div>
                    {p.excerpt ? <div className="mt-2 text-sm leading-6 text-white/75 line-clamp-3">{p.excerpt}</div> : null}
                    {p.tags && p.tags.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

function BlogPostPage({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl(`/api/blogs/${encodeURIComponent(slug)}`));
        const data = (await res.json()) as { blog?: BlogPost; message?: string };
        if (!res.ok) throw new Error(data?.message || 'Failed to load post');
        if (!cancelled) setPost(data.blog || null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load post');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/blog background.jpg')" }}>
      <div className="absolute inset-0 bg-black/85"></div>
      <div className="relative py-8 sm:py-10 lg:py-12">
        <Container>
          <a href="#/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </a>

          {loading ? (
            <div className="mt-6 text-center text-sm text-white/80">Loading…</div>
          ) : error ? (
            <div className="mt-6 text-center text-sm text-red-200">{error}</div>
          ) : !post ? (
            <div className="mt-6 text-center text-sm text-white/80">Post not found.</div>
          ) : (
            <article className="mt-6 sm:mt-8">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur shadow-2xl">
                {post.cover_image ? (
                  <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-white/5">
                    <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-gradient-to-br from-emerald-900/30 to-blue-900/30 flex items-center justify-center">
                    <span className="text-4xl sm:text-6xl text-white/20 font-serif">FT</span>
                  </div>
                )}
                <div className="p-4 sm:p-6 md:p-12">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.published_at)}
                  </div>
                  <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-white lg:text-4xl">{post.title}</h1>

                  {post.tags && post.tags.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 sm:mt-8 border-t border-white/10 pt-6 sm:pt-8">
                    <div
                      className="prose prose-invert prose-headings:text-white prose-p:text-white/85 prose-a:text-emerald-200 prose-strong:text-white prose-li:text-white/85 prose-hr:border-white/10 prose-blockquote:border-emerald-400/30 prose-blockquote:text-white/70 prose-code:text-emerald-300 prose-pre:bg-white/5 prose-sm sm:prose-base"
                      dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    />
                  </div>
                </div>
              </div>
            </article>
          )}
        </Container>
      </div>
    </div>
  );
}

const faqs: FaqItem[] = [
  {
    question:
      'How can you get started with Forex trading? What are the general steps to open a brokerage account?',
    answer:
      'Start by finding a broker and opening a demo account to learn the platform without risking money. After you understand the basics, open a real account and provide identity details, an email, and a funding method. Consider broker reviews, but treat them with caution and verify details directly with the broker.'
  },
  {
    question: 'Why is Forex trading a zero-sum game?',
    answer:
      'Most Forex trades have a counterparty. One side’s gains are typically the other side’s losses. Brokers earn fees, which is a separate component and not strictly zero-sum.'
  },
  {
    question:
      'How much money do I need to invest in Forex trading to start? What is the minimum and the optimum?',
    answer:
      'Some brokers allow very small deposits, but it can make risk management impractical. Many traders choose to start with a larger amount (often cited around 5,000 units of currency) to allow better position sizing and discipline.'
  },
  {
    question: 'Is Forex trading a scam?',
    answer:
      'Forex is a legitimate global market, but scams exist around brokers and “get-rich-quick” offers. Use regulated brokers, verify licensing, and avoid unrealistic promises.'
  },
  {
    question: 'What is Forex trading in plain words?',
    answer:
      'Forex trading is buying and selling currencies in pairs (like EUR/USD). If the first currency strengthens relative to the second, the pair’s price rises, and vice versa.'
  },
  {
    question: 'Is a pip the base metric in Forex trading? What is a pip?',
    answer:
      'A pip is the smallest commonly quoted price move for a currency pair. For most pairs it is 0.0001; for JPY pairs it is often 0.01.'
  },
  {
    question: 'Do I need a bank account to start Forex trading?',
    answer:
      'You typically need a funding method and must complete KYC verification. Many brokers support cards and wallets, but requirements vary by region and broker.'
  }
];

const classNames = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');


function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="text-sm font-semibold tracking-wide text-emerald-300/90">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85">{subtitle}</p> : null}
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        'rounded-2xl border border-white/15 bg-[#050812]/55 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur',
        className
      )}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, href, onClick, type }: { children: React.ReactNode; href?: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  const className =
    'inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-ink-950 shadow-sm shadow-emerald-400/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#050812]';

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type ?? 'button'} onClick={onClick}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/5"
      href={href}
    >
      {children}
    </a>
  );
}

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = [
    { label: 'Home', href: '#/' },
    { label: 'Top Brokers', href: '#/brokers' },
    { label: 'Top Guidance', href: '#/guidance' },
    { label: 'News', href: '#/news' },
    { label: 'Blog', href: '#/blog' },
    { label: 'About', href: '#/about' },
    { label: 'Contact', href: '#/contact' }
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-white/15 bg-[#050812]/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 sm:gap-3">
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-white/20">
              <img src="/assets/logo/main logo.png" alt="Forex Trading Hunters" className="h-full w-full object-contain p-1.5" />
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-semibold text-white">Forex Trading Hunters</div>
              <div className="text-xs text-white/60">Forex trading complete guide</div>
            </div>
          </a>

          <div className="hidden items-center gap-4 lg:gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold text-white/85 hover:text-white">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <SecondaryButton href="#brokers">Get A Broker</SecondaryButton>
            <PrimaryButton href="#guide">Get Started</PrimaryButton>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-semibold text-white/85 hover:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-2">
                <SecondaryButton href="#brokers">Get A Broker</SecondaryButton>
                <PrimaryButton href="#guide">Get Started</PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <div id="home" className="relative overflow-hidden">
      <Container>
        <div className="py-14 sm:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                ARE YOU SOMEONE WITH LITTLE OR NO EXPERIENCE TRADING?
              </h1>

              <p className="mt-6 text-xl font-semibold text-white/90">
                TAKE THIS QUICK RECOMMENDATION SURVEY TO GET A BROKER
              </p>

              <p className="mt-3 text-base text-white/70">
                TAKE LESS THAN A MINUTE
              </p>

              <div className="mt-8">
                <PrimaryButton href="#brokers">TAKE RECOMMENDATION</PrimaryButton>
              </div>
            </div>

            <Card className="relative w-full max-w-2xl overflow-hidden">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black">
                <video
                  src="/assets/videos/home%20video.mp4"
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              </div>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">What do you want to do today?</div>
                  <div className="mt-1 text-xs text-white/60">Choose a path—then get the right broker and material.</div>
                </div>
                <Pill>Quick Start</Pill>
              </div>

              <div className="mt-6 grid gap-3">
                <a href="#guide" className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Trade something</div>
                      <div className="mt-1 text-xs text-white/65">Short term: buying and selling</div>
                    </div>
                    <div className="text-white/50 transition group-hover:text-white/80">→</div>
                  </div>
                </a>

                <a href="#guide" className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Invest in something</div>
                      <div className="mt-1 text-xs text-white/65">Long term: buying and holding</div>
                    </div>
                    <div className="text-white/50 transition group-hover:text-white/80">→</div>
                  </div>
                </a>

                <a href="#faqs" className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">No idea</div>
                      <div className="mt-1 text-xs text-white/65">Tell me the difference</div>
                    </div>
                    <div className="text-white/50 transition group-hover:text-white/80">→</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="text-xs font-semibold text-emerald-200">Risk disclaimer</div>
                <div className="mt-1 text-xs leading-5 text-white/70">
                  CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether
                  you understand how CFDs work and whether you can afford to take the high risk of losing your money.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomeBrokersPreview() {
  return (
    <div id="brokers" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-emerald-300/90">RECOMMENDED BROKERS</div>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Top Brokers</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85">
              We reviewed popular brokers and compiled a detailed comparison to help you choose.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="#/brokers">Open Top Brokers Page</PrimaryButton>
            <SecondaryButton href="#/brokers">Recommend A Broker For Me</SecondaryButton>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brokers.map((b) => (
            <Card key={b.name} className="p-0 ring-1 ring-emerald-400/20 transition hover:ring-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/10">
              <a href={b.websiteUrl} target="_blank" rel="noreferrer" className="block rounded-2xl p-8 transition hover:bg-white/8">
                <div className="flex flex-col items-center gap-6">
                  <img src={b.logoSrc} alt={b.name} className="h-24 w-auto object-contain sm:h-32" loading="lazy" />
                  <div className="text-center">
                    <div className="text-xl font-semibold text-white">{b.name}</div>
                    <div className="mt-2 text-base leading-7 text-white/80">{b.note}</div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">Visit website →</div>
                  <span className="text-xs text-white/60">Affiliate supported</span>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

function FreeGuideForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const canSubmit = name.trim().length > 1 && email.includes('@') && experience.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === 'submitting') return;

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch(apiUrl('/api/lead'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, experience })
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok) {
        setStatus('error');
        setMessage(data.message ?? 'Something went wrong.');
        return;
      }

      setStatus('success');
      setMessage('Success! Check your inbox soon.');
      setName('');
      setEmail('');
      setExperience('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <div id="guide" className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="BEAT THE MARKET MAKER"
          title="TIPS TO A SUCCESSFUL TRADING"
          subtitle="Fill the form to get a free trading guide straight into your inbox"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <label className="text-xs font-semibold text-white/70">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#050812]/60 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#050812]/60 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">Trading Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#050812]/60 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="mt-1 flex items-center justify-between gap-3">
                <PrimaryButton type="submit">Get Your Free Guide</PrimaryButton>
                <div className="text-xs text-white/55">No spam. Unsubscribe anytime.</div>
              </div>

              {message ? (
                <div
                  className={classNames(
                    'rounded-xl border px-3 py-2 text-sm',
                    status === 'success' && 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
                    status === 'error' && 'border-rose-400/20 bg-rose-400/10 text-rose-100',
                    status === 'submitting' && 'border-white/10 bg-white/5 text-white/70'
                  )}
                >
                  {message}
                </div>
              ) : null}
            </form>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/70">Support us</div>
              <div className="mt-1 text-xs leading-5 text-white/65">
                The best way to support our team is to open an account with our affiliate links. This keeps the site clean from intrusive ads.
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            {[{ t: 'We are traders ourselves', d: 'We only review what we understand from experience.' },
              { t: 'Quality, not quantity', d: 'Concise reviews you can actually digest.' },
              { t: 'Selection of brokers', d: 'We focus on a short list that matters.' },
              { t: 'We are here to help', d: 'Reach out—this is a real human-curated site.' }].map((x) => (
              <Card key={x.t} className="p-5">
                <div className="text-sm font-semibold text-white">{x.t}</div>
                <div className="mt-1 text-sm leading-6 text-white/65">{x.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Materials() {
  const [activeTab, setActiveTab] = useState<'books' | 'expos' | 'courses'>('books');

  const books = useMemo(
    () => [
      'The Intelligent Investor: The Classic Best Seller on Value Investing',
      "A Beginner's Guide to the Stock Market",
      'How to Day Trade for a Living',
      'Technical Analysis Explained by Martin Pring',
      'Encyclopedia of Chart Patterns by Thomas Bulkowski',
      'Trading: Technical Analysis Masterclass: Master the financial markets'
    ],
    []
  );

  return (
    <div id="materials" className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="TRADING MATERIALS"
          title=""
          subtitle=""
        />

        <div className="mb-8 flex gap-2">
          {[
            { key: 'books' as const, label: 'BOOKS' },
            { key: 'expos' as const, label: 'EXPOS' },
            { key: 'courses' as const, label: 'COURSES' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={classNames(
                'rounded-xl px-6 py-2.5 text-sm font-semibold transition',
                activeTab === tab.key
                  ? 'bg-emerald-400 text-[#050812]'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'books' && (
          <Card>
            <div className="grid gap-3 sm:grid-cols-2">
              {books.map((b) => (
                <div key={b} className="rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white/90">
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm leading-7 text-white/80">
              Reading books help you clear and sharpen your mind. Although most of the information nowadays is online, it is good to have a paper on your hands when thinking of an investing strategy or a new angle. The most famous traders weren't Googling, they have studied at least the theory with books. Do yourself a favor and pick any book, not even from this list and start reading it, make marks on it, send us a message to discuss some lines from it. It doesn't matter as long as you keep reading new books, this will create a good habit. Some useful books for trading that we do not have in the above list are also psychology books, keep them for later, they are useful but can also be super boring.
            </div>
          </Card>
        )}

        {activeTab === 'expos' && (
          <Card>
            <div className="text-sm text-white/80">
              Trading expos are great opportunities to learn from industry experts, network with other traders, and discover new tools and strategies. Check back soon for upcoming trading expos in your region.
            </div>
          </Card>
        )}

        {activeTab === 'courses' && (
          <Card>
            <div className="text-sm text-white/80">
              Trading courses can help accelerate your learning curve by providing structured education from experienced traders. We recommend courses that focus on risk management, technical analysis, and trading psychology.
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
}

function FeaturedBook() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="FEATURED BOOK"
          title="The Intelligent Investor"
          subtitle="The Classic Best Seller on Value Investing"
        />

        <Card className="max-w-2xl">
          <div className="flex flex-col items-center gap-6">
            <div className="text-sm text-white/80">
              Written by Benjamin Graham, this book teaches the principles of value investing and has been considered the bible of investing since its first publication in 1949.
            </div>
            <a
              href="https://www.amazon.com/Intelligent-Investor-Definitive-Essential-Investors/dp/0060555661"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-8 py-3 text-sm font-semibold text-[#050812] transition hover:bg-emerald-300"
            >
              Buy on Amazon
            </a>
          </div>
        </Card>
      </Container>
    </div>
  );
}

function Reasons() {
  const items = [
    'Global regulated broker',
    'Great tools and training',
    'Comprehensive support',
    'Advanced trading platforms',
    'Uncompromising security',
    'Educational video tutorials',
    'Zero risk with Demo Trading'
  ];

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle eyebrow="6+1 reasons" title="Start with zero risk using demo trading" subtitle="Build muscle memory, learn the platform, and develop discipline before risking capital." />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <div key={x} className="rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-sm text-white/90">
              {x}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton href="#brokers">Start Trading with Demo Account</PrimaryButton>
        </div>
      </Container>
    </div>
  );
}

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faqs" className="py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="Frequently asked questions"
          title="Forex trading, explained clearly"
          subtitle="If you’re new, start here. If you’re experienced, use this as a quick reference and share it with your trading circle."
        />

        <div className="grid gap-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <button
                key={f.question}
                type="button"
                onClick={() => setOpen((v) => (v === idx ? null : idx))}
                className="w-full rounded-2xl border border-white/15 bg-white/8 p-5 text-left transition hover:bg-white/12"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="text-sm font-semibold text-white">{f.question}</div>
                  <div className="mt-0.5 text-white/75">{isOpen ? '−' : '+'}</div>
                </div>
                {isOpen ? <div className="mt-3 text-sm leading-7 text-white/85">{f.answer}</div> : null}
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-white/10 bg-[#050812]/70 py-12 backdrop-blur">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wide text-emerald-300/90">TRADE WITH CONFIDENCE</div>
            <div className="mt-2 text-2xl font-semibold text-white">Forex Trading Hunters</div>
            <div className="mt-3 text-sm leading-6 text-white/75">
              Education-first guidance, broker short-lists, and practical trading materials.
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="#guide">Get Started</PrimaryButton>
              <SecondaryButton href="#brokers">Get A Broker</SecondaryButton>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl border border-white/15 bg-white/8 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="text-xs font-semibold text-white/80">Risk Disclaimer</div>
              <div className="mt-2 text-xs leading-5 text-white/75">
                CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Between 74-89% of retail investor
                accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take
                the high risk of losing your money.
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/8 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="text-xs font-semibold text-white/80">Disclosure</div>
              <div className="mt-2 text-xs leading-5 text-white/75">
                Currency, crypto, stock or other trading finance instrument trading on margin involves high risk, and is not suitable for all
                investors. As a leveraged product losses are able to exceed initial deposits and capital is at risk. Before deciding to trade Forex
                or any other financial instrument you should carefully consider your investment objectives, level of experience, and risk appetite.
                We work hard to offer you valuable information about all of the brokers that we review. In order to provide you with this free
                service we receive advertising fees from brokers, including some of those listed within our rankings and on this page. While we do
                our utmost to ensure that all our data is up-to-date, we encourage you to verify our information with the broker directly.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-white/20">
                  <img src="/assets/logo/main logo.png" alt="Forex Trading Hunters" className="h-full w-full object-contain p-1.5" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">Forex Trading Hunters</div>
                  <div className="text-xs text-white/60">Your trusted forex guide</div>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Comprehensive forex trading guidance, broker reviews, and expert insights to help you navigate the financial markets.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#/" className="text-sm text-white/70 hover:text-emerald-400 transition">Home</a></li>
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">Top Brokers</a></li>
                <li><a href="#/guidance" className="text-sm text-white/70 hover:text-emerald-400 transition">Top Guidance</a></li>
                <li><a href="#/news" className="text-sm text-white/70 hover:text-emerald-400 transition">Financial News</a></li>
                <li><a href="#/blog" className="text-sm text-white/70 hover:text-emerald-400 transition">Blog</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#/about" className="text-sm text-white/70 hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#/contact" className="text-sm text-white/70 hover:text-emerald-400 transition">Contact</a></li>
                <li><a href="#faqs" className="text-sm text-white/70 hover:text-emerald-400 transition">FAQs</a></li>
                <li><a href="#materials" className="text-sm text-white/70 hover:text-emerald-400 transition">Trading Materials</a></li>
              </ul>
            </div>

            {/* Recommended Brokers */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Recommended Brokers</h3>
              <ul className="space-y-3">
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">Avatrade</a></li>
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">TickMill</a></li>
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">Etoro</a></li>
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">Pepperstone</a></li>
                <li><a href="#/brokers" className="text-sm text-white/70 hover:text-emerald-400 transition">XTB</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <div className="text-xs text-white/50">
              © 2026 Forex Trading Hunters. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/50 hover:text-emerald-400 transition">Privacy Policy</a>
              <a href="#" className="text-xs text-white/50 hover:text-emerald-400 transition">Terms of Service</a>
              <a href="#" className="text-xs text-white/50 hover:text-emerald-400 transition">Disclaimer</a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function App() {
  const bgImages = useMemo(() => ['/assets/images/home1.jpg', '/assets/images/home2.jpg', '/assets/images/home3.jpg'], []);
  const [bgIndex, setBgIndex] = useState(0);
  const [page, setPage] = useState<'home' | 'brokers' | 'blog' | 'blog_post' | 'guidance' | 'about' | 'contact' | 'news'>(() => {
    if (window.location.hash.startsWith('#/brokers')) return 'brokers';
    if (window.location.hash.startsWith('#/blog/')) return 'blog_post';
    if (window.location.hash.startsWith('#/blog')) return 'blog';
    if (window.location.hash.startsWith('#/guidance')) return 'guidance';
    if (window.location.hash.startsWith('#/about')) return 'about';
    if (window.location.hash.startsWith('#/contact')) return 'contact';
    if (window.location.hash.startsWith('#/news')) return 'news';
    return 'home';
  });
  const [blogSlug, setBlogSlug] = useState<string | null>(() => {
    if (!window.location.hash.startsWith('#/blog/')) return null;
    const slug = window.location.hash.replace('#/blog/', '').split('?')[0].split('#')[0];
    return slug || null;
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [bgImages.length]);

  useEffect(() => {
    function onHashChange() {
      if (window.location.hash.startsWith('#/brokers')) {
        setPage('brokers');
        setBlogSlug(null);
        return;
      }
      if (window.location.hash.startsWith('#/blog/')) {
        const slug = window.location.hash.replace('#/blog/', '').split('?')[0].split('#')[0];
        setBlogSlug(slug || null);
        setPage('blog_post');
        return;
      }
      if (window.location.hash.startsWith('#/blog')) {
        setPage('blog');
        setBlogSlug(null);
        return;
      }
      if (window.location.hash.startsWith('#/guidance')) {
        setPage('guidance');
        setBlogSlug(null);
        return;
      }
      if (window.location.hash.startsWith('#/about')) {
        setPage('about');
        setBlogSlug(null);
        return;
      }
      if (window.location.hash.startsWith('#/contact')) {
        setPage('contact');
        setBlogSlug(null);
        return;
      }
      if (window.location.hash.startsWith('#/news')) {
        setPage('news');
        setBlogSlug(null);
        return;
      }
      setPage('home');
      setBlogSlug(null);
    }

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="relative min-h-screen">
      {page === 'home' && (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {bgImages.map((src, idx) => (
            <div
              key={src}
              className={classNames(
                'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
                idx === bgIndex ? 'opacity-100' : 'opacity-0'
              )}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="absolute inset-0 bg-[#050812]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050812]/20 via-[#050812]/55 to-[#050812]/75" />
        </div>
      )}

      <Nav />
      {page === 'brokers' ? (
        <BrokersPage />
      ) : page === 'blog' ? (
        <BlogListPage />
      ) : page === 'blog_post' && blogSlug ? (
        <BlogPostPage slug={blogSlug} />
      ) : page === 'guidance' ? (
        <GuidancePage />
      ) : page === 'about' ? (
        <AboutPage />
      ) : page === 'contact' ? (
        <ContactPage />
      ) : page === 'news' ? (
        <NewsPage />
      ) : (
        <>
          <Hero />
          <HomeBrokersPreview />
          <FreeGuideForm />
          <Materials />
          <FeaturedBook />
          <Reasons />
          <Faqs />
        </>
      )}
      <Footer />
    </div>
  );
}
