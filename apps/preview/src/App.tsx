import {
  Button,
  Card,
  Container,
  FormField,
  Header,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@minco/components';
import { meta } from '@minco/tokens';

const swatches = [
  { name: 'bg', varName: '--color-bg', hex: '#DDEBE3' },
  { name: 'surface', varName: '--color-surface', hex: '#F0F2F1' },
  { name: 'surface-mid', varName: '--color-surface-mid', hex: '#CACCCB' },
  { name: 'surface-input', varName: '--color-surface-input', hex: '#FAFAFA' },
  { name: 'text', varName: '--color-text', hex: '#4B3B26' },
  { name: 'text-muted', varName: '--color-text-muted', hex: '#7A7C7B' },
  { name: 'text-soft', varName: '--color-text-soft', hex: '#9A9C9B' },
  { name: 'brand', varName: '--color-brand', hex: '#5B8C4A' },
  { name: 'on-brand', varName: '--color-on-brand', hex: '#DDEBE3' },
  { name: 'brand-hover', varName: '--color-brand-hover', hex: '#456B38' },
  { name: 'secondary', varName: '--color-secondary', hex: '#C0BAA1' },
  { name: 'on-secondary', varName: '--color-on-secondary', hex: '#4B3B26' },
  { name: 'border', varName: '--color-border', hex: '#4B3B26' },
  { name: 'focus*', varName: '--color-focus', hex: '#5B8C4A' },
] as const;

const typeScale = [
  { label: 'h1 · 2.4rem / 700', level: 1 as const, sample: 'Welcome to Minco' },
  { label: 'h2 · 30px / 600', level: 2 as const, sample: 'About the guesthouse' },
  { label: 'h3 · 24px / 600 · wide', level: 3 as const, sample: 'Section kicker' },
  { label: 'h4 · 20px / 500', level: 4 as const, sample: 'Feature title' },
  { label: 'h5 · 18px / 500', level: 5 as const, sample: 'Supporting heading' },
  { label: 'h6 · 16px / 400', level: 6 as const, sample: 'Small heading' },
];

const spaceSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20] as const;

const sectionStyle = {
  marginBottom: 'var(--space-20)',
} as const;

export function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 90% 55% at 10% -10%, color-mix(in srgb, var(--color-brand) 18%, transparent), transparent 55%),
          radial-gradient(ellipse 70% 45% at 95% 5%, color-mix(in srgb, var(--color-secondary) 35%, transparent), transparent 50%),
          linear-gradient(180deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-surface) 55%, var(--color-bg)) 100%)
        `,
        color: 'var(--color-text)',
        fontFamily: 'var(--font-family-body)',
      }}
    >
      <Container>
        <Header
          brand="Minco"
          brandHref="#top"
          items={[
            { href: '#color', label: 'Color', current: true },
            { href: '#type', label: 'Type' },
            { href: '#buttons', label: 'Buttons' },
            { href: '#forms', label: 'Forms' },
            { href: '#surfaces', label: 'Surfaces' },
          ]}
        />
      </Container>

      {/* Hero — brand first, one composition */}
      <header
        id="top"
        style={{
          position: 'relative',
          minHeight: '72vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBlock: 'var(--space-16) var(--space-20)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(115deg, color-mix(in srgb, var(--color-brand) 22%, transparent) 0%, transparent 45%),
              linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--color-bg) 88%, transparent) 100%),
              repeating-linear-gradient(
                -12deg,
                transparent,
                transparent 28px,
                color-mix(in srgb, var(--color-text) 4%, transparent) 28px,
                color-mix(in srgb, var(--color-text) 4%, transparent) 29px
              )
            `,
            pointerEvents: 'none',
          }}
        />
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Stack gap={4}>
            <Heading
              level={1}
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                maxWidth: '12ch',
              }}
            >
              Minco
            </Heading>
            <Text style={{ maxWidth: '28rem', fontSize: 'var(--font-size-lg)' }}>
              Guesthouse design system — tokens and primitives extracted from the live site,
              not invented.
            </Text>
            <Stack direction="row" gap={3} style={{ marginTop: 'var(--space-2)' }}>
              <Button variant="secondary" onClick={() => document.getElementById('color')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore tokens
              </Button>
              <Button variant="primary" onClick={() => document.getElementById('buttons')?.scrollIntoView({ behavior: 'smooth' })}>
                View components
              </Button>
            </Stack>
            <Text tone="muted" size="sm" style={{ marginTop: 'var(--space-4)' }}>
              Source {meta.sourceUrl} · status {meta.status}
            </Text>
          </Stack>
        </Container>
      </header>

      <main>
        <Container>
          {/* Color */}
          <section id="color" style={sectionStyle}>
            <Stack gap={3}>
              <Heading level={3}>Color</Heading>
              <Heading level={2}>Sage canvas, green brand, taupe CTAs</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Roles mapped from Webador theme CSS. Focus (*) is a DS stand-in — the site uses
                browser default rings.
              </Text>
            </Stack>
            <Spacer size={8} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              {swatches.map((s) => (
                <figure key={s.name} style={{ margin: 0 }}>
                  <div
                    style={{
                      height: 96,
                      background: `var(${s.varName})`,
                      border: '1px solid color-mix(in srgb, var(--color-border) 25%, transparent)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  />
                  <figcaption style={{ marginTop: 'var(--space-2)' }}>
                    <Text as="div" size="sm">
                      {s.name}
                    </Text>
                    <Text as="div" size="xs" tone="muted">
                      {s.hex}
                    </Text>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Type */}
          <section id="type" style={sectionStyle}>
            <Stack gap={3}>
              <Heading level={3}>Typography</Heading>
              <Heading level={2}>Montserrat display · Roboto body</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Heading scale from site h1–h6. Body declared weight 200; we ship 400 (loaded face).
              </Text>
            </Stack>
            <Spacer size={8} />
            <Stack gap={6}>
              {typeScale.map((row) => (
                <div key={row.level}>
                  <Text size="xs" tone="muted" style={{ marginBottom: 'var(--space-2)' }}>
                    {row.label}
                  </Text>
                  <Heading level={row.level}>{row.sample}</Heading>
                </div>
              ))}
              <div>
                <Text size="xs" tone="muted" style={{ marginBottom: 'var(--space-2)' }}>
                  body · 16px / lh 1.5
                </Text>
                <Text>
                  Birchleigh North, Kempton Park — comfortable stays with calm sage surroundings.
                </Text>
              </div>
              <div>
                <Text size="xs" tone="muted" style={{ marginBottom: 'var(--space-2)' }}>
                  link
                </Text>
                <Link href="https://www.minco.co.za/" target="_blank" rel="noreferrer">
                  www.minco.co.za
                </Link>
              </div>
            </Stack>
          </section>

          {/* Buttons */}
          <section id="buttons" style={sectionStyle}>
            <Stack gap={3}>
              <Heading level={3}>Actions</Heading>
              <Heading level={2}>Buttons match live CTAs</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Default is secondary taupe (Send Enquiry). Primary is green .bg-primary. Outline
                exists in framework CSS but is unused on the marketing page.
              </Text>
            </Stack>
            <Spacer size={8} />
            <Stack gap={6}>
              <Stack direction="row" gap={3} align="center">
                <Button variant="secondary">Send Enquiry</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
              </Stack>
              <Stack direction="row" gap={3} align="center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </Stack>
            </Stack>
          </section>

          {/* Forms */}
          <section id="forms" style={sectionStyle}>
            <Stack gap={3}>
              <Heading level={3}>Forms</Heading>
              <Heading level={2}>Sharp inputs, brown border</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Contact form pattern: #FAFAFA fill, 8px 16px padding, focus-visible ring proposed
                for accessibility.
              </Text>
            </Stack>
            <Spacer size={8} />
            <Card tone="default" style={{ maxWidth: '32rem' }}>
              <Stack gap={5}>
                <FormField id="guest-name" label="Name" hint="As on your booking enquiry">
                  <Input id="guest-name" name="name" autoComplete="name" placeholder="Your name" />
                </FormField>
                <FormField id="guest-email" label="Email">
                  <Input
                    id="guest-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </FormField>
                <FormField id="guest-message" label="Message">
                  <Textarea id="guest-message" name="message" placeholder="How can we help?" />
                </FormField>
                <div>
                  <Button type="button" variant="secondary">
                    Send Enquiry
                  </Button>
                </div>
              </Stack>
            </Card>
          </section>

          {/* Surfaces */}
          <section id="surfaces" style={sectionStyle}>
            <Stack gap={3}>
              <Heading level={3}>Surfaces</Heading>
              <Heading level={2}>Flat panels, no elevation</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Hosts and feature blocks use flat fills — taupe secondary panels are first-class.
                Box shadows stay none.
              </Text>
            </Stack>
            <Spacer size={8} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              <Card tone="default">
                <Heading level={4} style={{ marginBottom: 'var(--space-3)' }}>
                  Light surface
                </Heading>
                <Text>bg-user-2 · #F0F2F1</Text>
              </Card>
              <Card tone="mid">
                <Heading level={4} style={{ marginBottom: 'var(--space-3)', color: 'var(--color-text)' }}>
                  Mid surface
                </Heading>
                <Text>bg-user-1 · #CACCCB</Text>
              </Card>
              <Card tone="secondary">
                <Heading level={4} style={{ marginBottom: 'var(--space-3)', color: 'inherit' }}>
                  Secondary panel
                </Heading>
                <Text style={{ color: 'inherit' }}>Hosts panel taupe · #C0BAA1</Text>
              </Card>
            </div>
          </section>

          {/* Spacing */}
          <section id="spacing" style={{ ...sectionStyle, marginBottom: 'var(--space-16)' }}>
            <Stack gap={3}>
              <Heading level={3}>Spacing</Heading>
              <Heading level={2}>Rem scale from paddings</Heading>
              <Text tone="muted" style={{ maxWidth: '36rem' }}>
                Button and section spacers mapped to --space-1…20. Section rhythm often ~50px
                (--space-20).
              </Text>
            </Stack>
            <Spacer size={8} />
            <Stack gap={3}>
              {spaceSteps.map((n) => (
                <div
                  key={n}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '4rem 1fr',
                    gap: 'var(--space-4)',
                    alignItems: 'center',
                  }}
                >
                  <Text size="sm" tone="muted">
                    {n}
                  </Text>
                  <div
                    style={{
                      height: 'var(--space-4)',
                      width: `var(--space-${n})`,
                      background: 'var(--color-brand)',
                    }}
                  />
                </div>
              ))}
            </Stack>
          </section>

          <footer
            style={{
              borderTop: '1px solid color-mix(in srgb, var(--color-border) 20%, transparent)',
              paddingBlock: 'var(--space-8) var(--space-16)',
            }}
          >
            <Text tone="muted" size="sm">
              Minco design system · observe-only extraction · see docs/DESIGN-SYSTEM.md
            </Text>
          </footer>
        </Container>
      </main>
    </div>
  );
}
