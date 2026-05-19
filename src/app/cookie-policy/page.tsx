import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { buildPageMeta } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Cookie Policy | GDPR Consultants',
  description: 'Learn how GDPR Consultants uses cookies on its website, what types of cookies we set, and how you can control your cookie preferences.',
  canonicalPath: '/cookie-policy/',
});

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="py-5 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 50%, #00a8cc 100%)', paddingTop: '140px' }}
        >
          <div className="container">
            <h1 className="display-5 fw-bold">Cookie Policy</h1>
            <p className="lead opacity-75">Last Updated: January 2024</p>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="policy-content">
                  <h2>What Are Cookies?</h2>
                  <p>
                    Cookies are small text files placed on your device by websites you visit. They are widely used
                    to make websites work efficiently and provide information to website owners. This policy
                    explains how GDPR Consultants uses cookies on our website.
                  </p>

                  <h2>Types of Cookies We Use</h2>

                  <h3>Strictly Necessary Cookies</h3>
                  <p>
                    These cookies are essential for the website to function and cannot be switched off. They are
                    usually only set in response to actions you take such as setting your privacy preferences,
                    logging in, or filling in forms.
                  </p>

                  <h3>Analytical / Performance Cookies</h3>
                  <p>
                    These cookies allow us to count visits and traffic sources so we can measure and improve the
                    performance of our site. They help us to know which pages are the most and least popular and
                    see how visitors move around the site.
                  </p>

                  <h3>Functionality Cookies</h3>
                  <p>
                    These cookies enable the website to provide enhanced functionality and personalisation. They
                    may be set by us or by third-party providers whose services we have added to our pages.
                  </p>

                  <h3>Targeting / Advertising Cookies</h3>
                  <p>
                    These cookies may be set through our site by our advertising partners to build a profile of
                    your interests and show you relevant adverts on other sites. They do not store directly
                    personal information but are based on uniquely identifying your browser and internet device.
                  </p>

                  <h2>How to Control Cookies</h2>
                  <p>
                    You can set your browser to refuse all or some browser cookies, or to alert you when websites
                    set or access cookies. If you disable or refuse cookies, please note that some parts of this
                    website may become inaccessible or not function properly.
                  </p>
                  <p>
                    Most web browsers allow control of cookies through browser settings. To find out more about
                    cookies, including how to see what cookies have been set and how to manage and delete them,
                    visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
                  </p>

                  <h2>Changes to This Cookie Policy</h2>
                  <p>
                    We may update this Cookie Policy from time to time. Any changes will be posted on this page
                    with an updated revision date.
                  </p>

                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about our use of cookies, please contact us at{' '}
                    <a href="mailto:info@gdprconsultants.in">info@gdprconsultants.in</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
