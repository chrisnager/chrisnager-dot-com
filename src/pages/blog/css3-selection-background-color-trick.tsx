/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

const BlogPostCss3SelectionBackgroundColorTrick: FC = () => {
  return (
    <Layout>
      <Box as="article" sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro
          date="September 9, 2011"
          title="CSS3 ::selection background color trick"
          description="Ever wanted your CSS ::selection background color to match your page background color?"
        />

        <p sx={{ fontFamily: `Georgia, serif` }}>
          To achieve this, simply set your <code>::selection</code> rgba background color alpha channel to .996
          (.99609375 to be exact). I figured this out through trial and error with the Chrome inspector.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          This method works for Webkit browsers. All other browsers seem to handle this effect just fine with the{' '}
          <code>::selection</code> alpha channel set to 1.
        </p>

        <h2 id="see-my-code-here" sx={{ fontSize: `1.2em`, mt: [4, 5] }}>
          See my code here:
        </h2>

        <pre>
          <code>
            {`.selection-example p {
    background-color: #ff3600;
}

.selection-example p:nth-child(2n) {
    background-color: #0cf;
}

.selection-example p::-moz-selection {
    background-color: rgba(0, 204, 255, 1);
}

.selection-example p::selection {
    background-color: rgba(0, 204, 255, `}
            <mark sx={{ bg: `tag` }}>0.99609375</mark>
            {`);
}`}
          </code>
        </pre>

        <h2 id="try-it-out-highlight-the-following-text" sx={{ fontSize: `1.2em`, mt: [4, 5] }}>
          Try it out. Highlight the following text:
        </h2>

        <p
          sx={{
            backgroundColor: `#0cf`,
            fontFamily: `Georgia, serif`,
            [`::-moz-selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 1)` },
            [`::selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 0.99609375)` },
          }}
        >
          Shoulder tenderloin salami ribeye. Kielbasa t-bone chuck shankle jerky pastrami. Fatback leberkäse pork
          shoulder. Beef salami brisket, short ribs shank chicken bresaola. Tenderloin ribeye strip steak pig, pork loin
          sirloin filet mignon. Meatball spare ribs pork belly short ribs pork chop bacon, fatback pork tenderloin rump
          beef chuck tongue filet mignon ribeye. T-bone chicken cow pork loin tenderloin.
        </p>

        <p
          sx={{
            backgroundColor: `#ff3600`,
            fontFamily: `Georgia, serif`,
            [`::-moz-selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 1)` },
            [`::selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 0.99609375)` },
          }}
        >
          Rump andouille pig pastrami, ground round venison salami. Sirloin pig shankle andouille beef ribs. Ribeye
          strip steak flank tri-tip, hamburger turkey chicken leberkäse tenderloin short loin biltong pig. Cow shankle
          venison, rump filet mignon ball tip beef. Pork loin beef ribs pork belly ground round flank short ribs ribeye
          meatball ham hock beef. Biltong ham ham hock bacon chuck. Pork chop bresaola tail sausage, chuck tongue swine
          drumstick biltong ground round ham t-bone capicola.
        </p>

        <p
          sx={{
            backgroundColor: `#0cf`,
            fontFamily: `Georgia, serif`,
            [`::-moz-selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 1)` },
            [`::selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 0.99609375)` },
          }}
        >
          Bacon meatloaf strip steak, capicola shank tongue andouille tenderloin hamburger pork loin corned beef.
          Bresaola ham hock ham leberkäse, shoulder tail tongue shankle pig salami meatball andouille ball tip rump.
          Jowl ham hock pork short loin hamburger. Tail ham hock short ribs sausage, rump brisket strip steak boudin
          leberkäse. Shankle shank hamburger ball tip, pork kielbasa strip steak chuck tenderloin bresaola drumstick
          turducken shoulder. Cow pastrami short ribs tri-tip tail, drumstick turkey boudin chicken pig meatball
          shoulder chuck tongue pork chop. Shank ribeye pork belly venison shankle.
        </p>

        <p
          sx={{
            backgroundColor: `#ff3600`,
            fontFamily: `Georgia, serif`,
            [`::-moz-selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 1)` },
            [`::selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 0.99609375)` },
          }}
        >
          Tenderloin strip steak ham prosciutto, turducken drumstick meatball tongue. Shankle ham swine, shank filet
          mignon leberkäse ribeye turkey. Salami venison jerky fatback jowl brisket, short ribs ball tip. Pork pork
          belly meatloaf, boudin shoulder tri-tip swine short ribs venison chuck ball tip pancetta. Ham hock brisket
          strip steak bacon jowl flank. Ribeye ham chicken, sausage beef venison jowl. Bresaola andouille turkey, bacon
          sausage ribeye spare ribs tri-tip
        </p>

        <p
          sx={{
            backgroundColor: `#0cf`,
            fontFamily: `Georgia, serif`,
            [`::-moz-selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 1)` },
            [`::selection`]: { color: `#444`, backgroundColor: `rgba(0, 204, 255, 0.99609375)` },
          }}
        >
          Hamburger pork chop drumstick beef. Pork loin ham hock shoulder brisket, corned beef ribeye swine ham pork
          chop ground round meatloaf. Spare ribs beef prosciutto, ribeye pork chop ham pancetta meatball hamburger
          capicola ham hock frankfurter chuck turducken meatloaf. Fatback tail meatball, venison beef brisket t-bone
          pancetta. Prosciutto short loin swine, tenderloin pork chop salami pancetta chuck pork short ribs. Ham hock
          pig fatback filet mignon. Turkey prosciutto strip steak, sausage filet mignon meatloaf short ribs spare ribs
          tenderloin andouille.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          <small>
            Dummy text flowed in from <a href="http://baconipsum.com">Bacon Ipsum</a>.
          </small>
        </p>
      </Box>
    </Layout>
  )
}

export default BlogPostCss3SelectionBackgroundColorTrick

export const Head = () => (
  <Halo
    title="CSS3 ::selection background color trick / Blog"
    url="https://chrisnager.com/blog/time-for-a-change"
    description="Ever wanted your CSS ::selection background color to match your page background color?"
  />
)
