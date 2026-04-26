import React from 'react';

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

type TopBroker = {
  name: string;
  logoSrc?: string;
  websiteUrl?: string;
  leverage: string;
  deposit: string;
  spreads: string;
  location: string;
  instruments: string;
  platforms: string;
  fundingMethods: string;
};

const topBrokers: TopBroker[] = [
  {
    name: 'Exness',
    logoSrc: '/assets/logo/exness logo.png',
    websiteUrl: 'https://www.exness.com',
    leverage: '1:Unlimited',
    deposit: '$10',
    spreads: 'From 0.0 pips',
    location: 'Cyprus, UK',
    instruments: 'Forex, Metals, Crypto, Indices, Energies',
    platforms: 'MT4, MT5, WebTrader',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'Tickmill',
    logoSrc: '/assets/logo/tickmill logo.png',
    websiteUrl: 'https://www.tickmill.com',
    leverage: '1:500',
    deposit: '$100',
    spreads: 'From 0.0 pips',
    location: 'UK, Seychelles',
    instruments: 'Forex, Metals, Indices, Bonds',
    platforms: 'MT4, MT5',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'Pepperstone',
    logoSrc: '/assets/logo/pepperstone logo.jpg',
    websiteUrl: 'https://www.pepperstone.com',
    leverage: '1:500',
    deposit: '$200',
    spreads: 'From 0.0 pips',
    location: 'Australia, UK',
    instruments: 'Forex, Metals, Crypto, Indices, Energies',
    platforms: 'MT4, MT5, cTrader, TradingView',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'eToro',
    logoSrc: '/assets/logo/eToro logo.png',
    websiteUrl: 'https://www.etoro.com',
    leverage: '1:30 (EU), 1:400 (Global)',
    deposit: '$50',
    spreads: 'Variable',
    location: 'Cyprus, UK, Australia',
    instruments: 'Stocks, Crypto, Forex, ETFs, Commodities',
    platforms: 'eToro Platform, Mobile App',
    fundingMethods: 'Bank Wire, Credit Card, PayPal, E-wallets'
  },
  {
    name: 'XTB',
    logoSrc: '/assets/logo/XTB logo.png',
    websiteUrl: 'https://www.xtb.com',
    leverage: '1:500',
    deposit: '$0',
    spreads: 'From 0.1 pips',
    location: 'Poland, UK',
    instruments: 'Forex, Indices, Commodities, Stocks, Crypto',
    platforms: 'xStation 5, MT4',
    fundingMethods: 'Bank Wire, Credit Card, E-wallets'
  },
  {
    name: 'AvaTrade',
    logoSrc: '/assets/logo/Ava trade logo.png',
    websiteUrl: 'https://www.avatrade.com',
    leverage: '1:400',
    deposit: '$100',
    spreads: 'From 0.9 pips',
    location: 'Ireland, Australia, Japan',
    instruments: 'Forex, Stocks, Crypto, Commodities, Indices',
    platforms: 'MT4, MT5, AvaTradeGo, WebTrader',
    fundingMethods: 'Bank Wire, Credit Card, PayPal, E-wallets'
  }
];

const featuredBrokers: TopBroker[] = [
  {
    name: 'IC Markets',
    logoSrc: '/assets/logo/ic logo.jpg',
    websiteUrl: 'https://www.icmarkets.com',
    leverage: '1:500',
    deposit: '$200',
    spreads: 'From 0.0 pips',
    location: 'Australia, Seychelles',
    instruments: 'Forex, Metals, Crypto, Indices, Energies',
    platforms: 'MT4, MT5, cTrader',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'Alpari',
    logoSrc: '/assets/logo/alpari logo.jpg',
    websiteUrl: 'https://alpari.com',
    leverage: '1:1000',
    deposit: '$1',
    spreads: 'From 0.0 pips',
    location: 'Mauritius',
    instruments: 'Forex, Metals, Crypto, Indices',
    platforms: 'MT4, MT5, BinaryTrader',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'FXTM',
    logoSrc: '/assets/logo/fxtm logo.png',
    websiteUrl: 'https://www.forextime.com',
    leverage: '1:1000',
    deposit: '$10',
    spreads: 'From 0.0 pips',
    location: 'UK, Cyprus, Mauritius',
    instruments: 'Forex, Metals, Crypto, Indices, Energies',
    platforms: 'MT4, MT5, FXTM Trader',
    fundingMethods: 'Bank Wire, Credit Card, Crypto, E-wallets'
  },
  {
    name: 'IG',
    logoSrc: '/assets/logo/ig logo.jpg',
    websiteUrl: 'https://www.ig.com',
    leverage: '1:200',
    deposit: '$250',
    spreads: 'Variable',
    location: 'UK, Australia, Singapore',
    instruments: 'Forex, Stocks, Indices, Crypto, Commodities',
    platforms: 'IG Platform, MT4, ProRealTime',
    fundingMethods: 'Bank Wire, Credit Card, PayPal'
  },
  {
    name: 'Plus500',
    logoSrc: '/assets/logo/plus500 logo.jpg',
    websiteUrl: 'https://www.plus500.com',
    leverage: '1:300',
    deposit: '$100',
    spreads: 'Variable',
    location: 'UK, Cyprus, Israel',
    instruments: 'Forex, Stocks, Crypto, ETFs, Options',
    platforms: 'Plus500 Platform, Mobile App',
    fundingMethods: 'Bank Wire, Credit Card, PayPal, E-wallets'
  }
];

function BrokersPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('/assets/images/brokers-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/90"></div>
      <div className="relative py-8 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:gap-10">
          <div className="grid gap-6 lg:gap-5 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-300/90">RECOMMENDED BROKERS</div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-white lg:text-4xl">Recommend A Broker For Me</h1>
              <p className="mt-4 text-sm leading-7 text-white/85">
                How do I choose a Forex Broker or a trading platform? In order to find the most reliable and the best Forex Trading Provider, we
                have researched and compared dozens of Forex Brokers with their trading conditions and compiled a detailed review of the most
                popular Forex brokers. We are here to assist you in your selection and answer most of your questions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#home" className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 sm:px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400">
                  Take Recommendation Survey
                </a>
                <a href="#/" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 sm:px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                  Back to Home
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-emerald-400/30 bg-emerald-400/15 p-4 sm:p-5">
                <div className="text-sm font-semibold text-white">Quick action</div>
                <div className="mt-2 text-sm text-white/70">Want a recommendation in under a minute?</div>
                <div className="mt-5">
                  <a href="#home" className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400">
                    Recommend A Broker For Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-emerald-300/90">WHY CHOOSE A BROKER WITH HELP FROM US</div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">We are traders ourselves</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  Having someone reviewing a broker that has never traded with his own money would make sense? We have walked what we talk about.
                </div>
              </Card>

              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">Support Us</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  The best way to support our team is to open an account with our affiliate links. This way we will keep the site clean from Google Ads.
                </div>
              </Card>

              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">it's quality, not quantity</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  We are trying to keep our reviews' word count to a number that someone can digest. We are not an online encyclopedia!
                </div>
              </Card>

              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">Selection of Brokers</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  Are there better brokers than the ones we recommend? Yes, since there are thousands of them. We remove the noise for you, so you can focus on trading.
                </div>
              </Card>

              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">We are here to help</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  Believe it or not, this website is curated by real traders. Feel free to reach out in case you believe we can provide a useful angle to your question.
                </div>
              </Card>

              <Card className="border-white/20 bg-white/10">
                <div className="text-base font-semibold text-white">We love communitties</div>
                <div className="mt-2 text-sm leading-7 text-white/85">
                  We are a community of traders, exchanging ideas and sometimes we try to sync, you remember the GameStop case right?
                </div>
              </Card>
            </div>
          </div>

          <div className="grid gap-5">
            {topBrokers.map((b) => (
              <Card key={b.name} className="p-0 border-white/20 bg-white/10">
                <div className="rounded-2xl p-7">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-lg font-semibold text-white">{b.name}</div>
                      <div className="mt-2 text-sm text-white/75">Leverage: {b.leverage}</div>
                    </div>

                    {b.logoSrc ? (
                      <img src={b.logoSrc} alt={b.name} className="h-16 w-auto object-contain sm:h-20" loading="lazy" />
                    ) : (
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/80">
                        {b.name.slice(0, 1)}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <div className="text-xs text-white/50">Minimum Deposit</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.deposit}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Spreads</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.spreads}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Location</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.location}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Instruments</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.instruments}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Platforms</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.platforms}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Funding Methods</div>
                      <div className="mt-1 text-sm font-medium text-white">{b.fundingMethods}</div>
                    </div>
                  </div>

                  {b.websiteUrl ? (
                    <div className="mt-6 flex items-center justify-between">
                      <a
                        href={b.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
                      >
                        Visit {b.name}
                      </a>
                      <div className="text-xs text-white/55">Affiliate supported</div>
                    </div>
                  ) : (
                    <div className="mt-6 text-sm text-white/50">Website not provided</div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-emerald-300/90">FEATURED BROKERS</div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBrokers.map((b) => (
                <Card key={b.name} className="p-0 border-white/20 bg-white/10">
                  <div className="rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-base font-semibold text-white">{b.name}</div>
                        <div className="mt-1 text-xs text-white/75">Leverage: {b.leverage}</div>
                        <div className="mt-3 text-xs text-white/50">Min Deposit: {b.deposit}</div>
                      </div>
                      {b.logoSrc ? (
                        <img src={b.logoSrc} alt={b.name} className="h-12 w-auto object-contain" loading="lazy" />
                      ) : (
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white/80">
                          {b.name.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    {b.websiteUrl ? (
                      <div className="mt-4">
                        <a
                          href={b.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400"
                        >
                          Visit {b.name}
                        </a>
                      </div>
                    ) : (
                      <div className="mt-4 text-xs text-white/50">Website not provided</div>
                    )}
                    <div className="text-xs text-white/55">Affiliate supported</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default BrokersPage;
